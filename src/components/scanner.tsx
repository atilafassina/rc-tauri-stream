import { Match, Switch, createSignal } from "solid-js";
import { ScanStoreSetter } from "../lib/store";
import { getDisplayPath } from "../lib/format";

type ScannerProps = {
  setScanData: ScanStoreSetter;
};

export function Scanner(props: ScannerProps) {
  async function scan(_scope: string) {
    const start = window.performance.now();
    /**
     * @todo
     * we need to invoke our custom command to get
     * directory information.
     */
    const list = [{ path: "this is a stub", size: 0 }];
    const end = window.performance.now();

    props.setScanData("elapsed", end - start);
    props.setScanData("fileList", list);
    props.setScanData("status", "idle");
  }

  async function getRootScope() {
    /**
     * @todo
     * user needs to select a root scope for our scan.
     * only directories are eligible.
     * can't select more than one.
     * let's not select subdirectories recursively
     */
    console.info("HINT: it would be cool to OPEN a finder dialog...");

    const selected = "nothing here...";

    if (Array.isArray(selected)) {
      return;
    }

    setRootScope(selected);
  }

  const [rootScope, setRootScope] = createSignal<string | null>(null);
  const hasScope = () => typeof rootScope() === "string";
  const rootScopeDisplay = () => getDisplayPath(rootScope());

  return (
    <form
      class="flex flex-[1_1] flex-wrap justify-end h-12 gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        console.info(`scanning: ${rootScope()}`);
        props.setScanData("status", "scanning");
        scan(rootScope()!);
      }}
    >
      <button
        type="button"
        class="text-lg bg-neutral-400 text-neutral-300 bg-opacity-40 h-fit self-center py-2 px-4 rounded-md shadow-sm shadow-neutral-700"
        onClick={getRootScope}
      >
        <Switch fallback="Select scope">
          <Match when={hasScope()}>
            <small>{rootScopeDisplay()}</small>
          </Match>
        </Switch>
      </button>
      <button
        type="submit"
        disabled={!hasScope()}
        class="ring-fuchsia-500 text-fuchsia-400 py-2 px-4 text-2xl rounded-full shadow-md shadow-fuchsia-600 ring-2 disabled:ring-neutral-800 disabled:text-neutral-400"
      >
        scan
      </button>
    </form>
  );
}
