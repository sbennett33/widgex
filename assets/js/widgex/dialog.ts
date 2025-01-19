import * as dialog from "@zag-js/dialog";
import { getBooleanOption, normalizeProps, renderPart } from "./util";
import { Component } from "./component";
import { Hook, makeHook } from "./hook";
import type { Machine } from "@zag-js/core";
import type { Part } from "./component";

type Role = "dialog" | "alertdialog" | undefined;

class DialogComponent extends Component<dialog.Context, dialog.Api> {
  initService(context: dialog.Context): Machine<any, any, any> {
    return dialog.machine(context);
  }

  initApi() {
    return dialog.connect(this.service.state, this.service.send, normalizeProps);
  }

  render() {
    const parts: Part[] = [
      { name: "trigger", id: `dialog:${this.el.id}:trigger` },
      { name: "backdrop", id: `dialog:${this.el.id}:backdrop` },
      { name: "positioner", id: `dialog:${this.el.id}:positioner` },
      { name: "content", id: `dialog:${this.el.id}:content` },
      { name: "title", id: `dialog:${this.el.id}:title` },
      { name: "description", id: `dialog:${this.el.id}:description` },
      { name: "close-trigger", id: `dialog:${this.el.id}:close` }
    ];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}

class Dialog extends Hook {
  component: DialogComponent;

  mounted() {
    this.component = new DialogComponent(this.el, this.context());
    this.component.init();
  }

  updated() {
    this.component.render();
  }

  beforeDestroy() {
    this.component.destroy();
  }

  context(): dialog.Context {
    let role: string | undefined = this.el.dataset.role;
    const validRoles = ["dialog", "alertdialog"] as const;

    if (role !== undefined && !validRoles.includes(role as any)) {
      console.error(`Invalid 'role' specified: '${role}'. Expected 'dialog' or 'alertdialog'.`);
      role = undefined;
    }

    return {
      id: this.el.id,
      role: role as Role,
      preventScroll: getBooleanOption(this.el, "preventScroll", true),
      closeOnInteractOutside: getBooleanOption(this.el, "closeOnInteractOutside", true),
      closeOnEscape: getBooleanOption(this.el, "closeOnEscape", true),
      onOpenChange: (details: dialog.OpenChangeDetails) => {
        if (this.el.dataset.onOpenChange) {
          this.pushEvent(this.el.dataset.onOpenChange, details);
        }
      },
    };
  }
};

export default makeHook(Dialog);
