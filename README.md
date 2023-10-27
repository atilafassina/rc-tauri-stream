# Solid - Tauri Livestream w/ Ryan Carniato

We're working on a `node_modules` scanner app.

<div align="center">
    <a href="https://www.youtube.com/watch?v=yLjqh6dKdBc" target="_blank">
        <img width="800" src="/docs/tauri-solid-rc-livestream.jpeg" alt="cover image for livestream with Ryan Carniato"/>
    </a>
</div>

## Stream Participants

- [Ryan Carniato](https://x.com/RyanCarniato)
- [Atila Fassina](https://atila.io/x)

## Run Locally 🦀

You need [Rust](https://www.rust-lang.org/tools/install) and [PNPM](https://pnpm.io) to run this project. Once the system is setup, you can clone this repository:

```sh
git clone --depth 1 https://github.com/atilafassina/rc-tauri-stream
```

Change directory inside the project, install dependencies, and run development server.

```sh
cd rc-tauri-stream && pnpm install && pnpm tauri dev
```

> 💡 Tauri will run the Vite dev server and then trigger the Rust build. First Rust build takes a little longer, but should still be less than a minute.

## What's in the Box 🎁

There's already a Rust command that you may find in `/src-tauri/src/main.rs`. So no Rust coding will be neccessary during the stream, this command will be invoked via the Tauri APIs.

Additionally, TypeScript types are generated for best interop between Rust and TS, we use [tauri-specta](https://github.com/oscartbeaumont/tauri-specta) for typegen every time our Rust code recompiles.

Some other dependencies for Solid are already there and some additional setup for the web side, most of them already baked in the [template](https://github.com/atilafassina/create-solidjs-tailwind-tauri) we created this project from.

## Work With Us 🫵

We will address every `@todo` existing in the code. So you can use search in your IDE to locate where things are and go from there.

## Workspace Extensions 🧰

- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Build Your Own App 🔥

If you like this SolidJS + Tauri + TailwindCSS setup, this project is built upon my template: [create-solidjs-tailwind-tauri](https://github.com/atilafassina/create-solidjs-tailwind-tauri).
