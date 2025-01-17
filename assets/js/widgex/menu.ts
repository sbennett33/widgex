import * as menu from "@zag-js/menu";
import { normalizeProps, spreadProps, renderPart } from "./util";
import { Component } from "./component";
import type { ViewHook } from "phoenix_live_view";
import type { Machine } from "@zag-js/core";
import type { Part } from "./component";

class Menu extends Component<menu.Context, menu.Api> {
  initService(context: menu.Context): Machine<any, any, any> {
    return menu.machine(context);
  }

  initApi() {
    return menu.connect(this.service.state, this.service.send, normalizeProps);
  }

  render() {
    const parts: Part[] = [
      { name: "trigger", id: `menu:${this.el.id}:trigger` },
      { name: "context-trigger", id: `menu:${this.el.id}:ctx-trigger` },
      { name: "positioner", id: `menu:${this.el.id}:popper` },
      { name: "content", id: `menu:${this.el.id}:content` }
    ];

    for (const part of parts) renderPart(this.el, part, this.api);

    this.renderItems();
  }

  renderItems() {
    for (const item of this.el.querySelectorAll<HTMLElement>("[data-value]")) {
      const value = item.dataset.value!;
      spreadProps(item, this.api.getItemProps({ value }));
    }
  }
}

export interface MenuHook extends ViewHook {
  menu: Menu;
  context: { id: string };
}

export default {
  mounted() {
    this.context = { id: this.el.id };
    this.menu = new Menu(this.el, this.context);
    this.menu.init();
  },

  updated() {
    this.menu.render();
  },

  beforeDestroy() {
    this.menu.destroy();
  },
} as MenuHook;
