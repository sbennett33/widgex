import * as menu from "@zag-js/menu";
import { normalizeProps, spreadProps, renderPart } from "./util";
import { Component } from "./component";
import { Hook, makeHook } from "./hook";
import type { Machine } from "@zag-js/core";
import type { Part } from "./component";

class MenuComponent extends Component<menu.Context, menu.Api> {
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

    this.renderItemGroups();
    this.renderItems();
    this.renderSeparators();
  }

  renderItemGroups() {
    for (const itemGroup of this.el.querySelectorAll<HTMLElement>(`[id^='menu:${this.el.id}:group']`)) {
      const value = itemGroup.dataset.value;
      if (!value) {
        console.error("Missing `data-value` attribute on item group.");
        return;
      }
      spreadProps(itemGroup, this.api.getItemGroupProps({ id: value }));
    }
  }

  renderItems() {
    for (const item of this.el.querySelectorAll<HTMLElement>("[data-part='item']")) {
      const value = item.dataset.value;
      if (!value) {
        console.error("Missing `data-value` attribute on item.");
        return;
      }
      spreadProps(item, this.api.getItemProps({ value }));
    }
  }

  renderSeparators() {
    for (const separator of this.el.querySelectorAll<HTMLElement>("[data-part='separator']"))
      spreadProps(separator, this.api.getSeparatorProps());
  }
}

class Menu extends Hook {
  component: MenuComponent;

  mounted() {
    this.component = new MenuComponent(this.el, { id: this.el.id });
    this.component.init();
  }

  updated() {
    this.component.render();
  }

  beforeDestroy() {
    this.component.destroy();
  }
};

export default makeHook(Menu);
