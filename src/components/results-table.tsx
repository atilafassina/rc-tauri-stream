import { For, Show, createResource, createSignal } from "solid-js";
import { TransitionGroup } from "solid-transition-group";
import { formatSizeUnit } from "../lib/format";
import { getDirName } from "../lib/get-dir-name";
import { Trashbin } from "./trashbin";
import { type FolderStat } from "../lib/tauri-commands";

type ListProps = {
  folderList: FolderStat[];
};

type TRprops = {
  directory: string;
  directoryPrefix: string;
  modulesSize: string;
};

function deleteNodeModules(path: string) {
  return async (_shouldDelete: boolean) => {
    /**
     * @todo
     * before doing any work, maybe it's best to check if
     * the path actually EXISTS
     */
    console.info("HINT: need a FS check...");
    const fileExists = false;

    if (fileExists) {
      /**
       * @todo
       * we have the file path.
       * But this is a non-reversible action.
       * Let's ask the user to confirm that's what they want.
       */
      console.info(
        "HINT: there's probably a native API for CONFIRMation dialog..."
      );
      let shouldDelete = false;

      if (shouldDelete) {
        console.warn(":: deleting ::");
        try {
          /**
           * @todo
           * command Tauri to remove `node_modules` directory
           */
          console.warn("this is doing nothing, missing command invocation!");
          return true;
        } catch (e) {
          console.error("failed to remove node_modules::\n", e);

          return false;
        }
      }
    }

    return false;
  };
}

function TableRow(props: TRprops) {
  const [shouldDelete, setDelete] = createSignal(false);

  const [data, { mutate }] = createResource(
    shouldDelete,
    deleteNodeModules(props.directoryPrefix + props.directory)
  );
  return (
    <Show when={!data()}>
      <tr
        class={`even:bg-black even:bg-opacity-60 transition-transform ease-in-out duration-300 hover:scale-x-105 group`}
      >
        <td class="text-left py-6">
          <strong class="text-neutral-50 text-2xl block pl-6 group-hover:scale-110 group-hover:scale-x-105 transition-transform duration-300 ease-in-out">
            {props.directory}
          </strong>
          <small class="text-neutral-300 pl-6">
            {props.directoryPrefix}
            {props.directory}/node_modules
          </small>
        </td>
        <td class="py-6">{props.modulesSize}</td>
        <td class="py-6">
          <button
            type="button"
            onClick={() => {
              /**
               * @todo
               * trigger module deletion here.
               */

              console.warn(
                "this is doing nothing, missing signal and maybe something else..."
              );
            }}
          >
            <Trashbin />
          </button>
        </td>
      </tr>
    </Show>
  );
}

export default function ResultsTable(props: ListProps) {
  return (
    <table class="w-full text-center">
      <thead class="sticky top-0 backdrop-blur-xl">
        <tr class="text-2xl font-mono">
          <th class="w-3/5 text-left pl-6 py-3 ">Name</th>
          <th class="w-1/5 py-3 ">Size</th>
          <th class="w-1/5 py-3 ">Action</th>
        </tr>
      </thead>
      <tbody>
        <TransitionGroup
          name="fade"
          exitActiveClass="fade-exit-active"
          exitToClass="fade-exit-to"
        >
          <For each={props.folderList}>
            {({ path, size }) => {
              if (!Boolean(path)) {
                return null;
              }
              const dirName = getDirName(path);
              if (dirName === null) {
                return null;
              }
              const modulesSize = formatSizeUnit(size);

              return (
                <TableRow
                  modulesSize={modulesSize}
                  directory={dirName.dir}
                  directoryPrefix={dirName.prefix}
                />
              );
            }}
          </For>
        </TransitionGroup>
      </tbody>
    </table>
  );
}
