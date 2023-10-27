// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod error;
mod util;

use error::Error;
use futures::future::try_join_all;
use specta::collect_types;
use std::path::Path;
use tauri_specta::ts;
use util::FolderStat;

#[tauri::command]
#[specta::specta]
async fn get_dir_data(pattern: &str) -> Result<Vec<FolderStat>, Error> {
    let dirs = util::get_dir_names(Path::new(pattern));

    let iter = dirs.into_iter().map(|path| async move {
        let size = u32::try_from(util::get_size(&path).await?)?;
        Ok(FolderStat { path, size }) as Result<FolderStat, Error>
    });

    let result = try_join_all(iter).await?;

    Ok(util::order_list(result))
}

fn main() {
    #[cfg(debug_assertions)]
    ts::export(collect_types![get_dir_data], "../src/lib/tauri-commands.ts").unwrap();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_dir_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
