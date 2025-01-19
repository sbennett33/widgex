import * as collapsible from "@zag-js/collapsible";
import { normalizeProps, renderPart } from "./util";
import { Component } from "./component";
import { Hook, makeHook } from "./hook";
import type { Machine } from "@zag-js/core";
import type { Part } from "./component";

type Dir = "ltr" | "rtl" | undefined;

class CollapsibleComponent extends Component<collapsible.Context, collapsible.Api> {
  initService(context: collapsible.Context): Machine<any, any, any> {
    return collapsible.machine(context);
  }

  initApi() {
    return collapsible.connect(this.service.state, this.service.send, normalizeProps);
  }

  render() {
    const parts: Part[] = [
      { name: "root", id: `collapsible:${this.el.id}` },
      { name: "trigger", id: `collapsible:${this.el.id}:trigger` },
      { name: "content", id: `collapsible:${this.el.id}:content` }
    ];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}

class Collapsible extends Hook {
  component: CollapsibleComponent;

  mounted() {
    this.component = new CollapsibleComponent(this.el, this.context());
    this.component.init();
  }

  updated() {
    this.component.render();
  }

  beforeDestroy() {
    this.component.destroy();
  }

  context(): collapsible.Context {
    let dir: string | undefined = this.el.dataset.dir;
    const validDirs = ["ltr", "rtl"] as const;

    if (dir !== undefined && !validDirs.includes(dir as any)) {
      console.error(`Invalid 'dir' specified: '${dir}'. Expected 'ltr' or 'rtl'.`);
      dir = undefined;
    }

    return {
      id: this.el.id,
      dir: dir as Dir,
      disabled: this.el.dataset.disabled === "true" || this.el.dataset.disabled === "",
      open: this.el.hasAttribute("open"),
      onOpenChange: (details: collapsible.OpenChangeDetails) => {
        if (this.el.dataset.onOpenChange) {
          this.pushEvent(this.el.dataset.onOpenChange, details);
        }
      },
    };
  }
};

export default makeHook(Collapsible);
