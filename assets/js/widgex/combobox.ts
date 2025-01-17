import * as combobox from "@zag-js/combobox";
import type { Collection } from "@zag-js/collection";
import { getAttributes, restoreAttributes, normalizeProps, renderPart, spreadProps, getBooleanOption, getOption } from "./util";
import { Component } from "./component";
import type { ViewHook } from "phoenix_live_view";
import type { Machine } from "@zag-js/core";
import type { Part } from "./component";


type Item = { value: string; label: string };
type InputBehavior = "autocomplete" | "autohighlight" | "none" | undefined;
type SelectionBehavior = "clear" | "replace" | "preserve" | undefined;

class Combobox extends Component<combobox.Context, combobox.Api> {
  initService(context: combobox.Context): Machine<any, any, any> {
    return combobox.machine(context);
  }

  initApi() {
    return combobox.connect(this.service.state, this.service.send, normalizeProps);
  }

  render() {
    const parts: Part[] = [
      { name: "root", id: `combobox:${this.el.id}` },
      { name: "control", id: `combobox:${this.el.id}:control` },
      { name: "input", id: `combobox:${this.el.id}:input` },
      { name: "trigger", id: `combobox:${this.el.id}:toggle-btn` },
      { name: "positioner", id: `combobox:${this.el.id}:popper` },
      { name: "content", id: `combobox:${this.el.id}:content` }
    ];

    for (const part of parts) renderPart(this.el, part, this.api);

    this.renderItems(this.el.id);
  }

  renderItems(parentId: string) {
    for (const item of this.el.querySelectorAll<HTMLElement>(`[id^='combobox:${parentId}:option:']`)) {
      const value = item.dataset.value;
      const label = item.dataset.label;
      if (!value || !label) {
        console.error("Missing `data-value` or `data-label` attribute on item.");
        return;
      }

      spreadProps(item, this.api.getItemProps({ item: { value, label } }));
    }
  }
}

export interface ComboboxHook extends ViewHook {
  state: any;
  combobox: Combobox;
  attributeCache: any;
  items(): Item[];
  collection(): Collection<Item>;
  context(): combobox.Context;
}

export default {
  mounted() {
    this.combobox = new Combobox(this.el, this.context());
    this.combobox.init();
  },

  beforeUpdate() {
    const parts: Part[] = [
      { name: "root", id: `combobox:${this.el.id}` },
      { name: "control", id: `combobox:${this.el.id}:control` },
      { name: "input", id: `combobox:${this.el.id}:input` },
      { name: "trigger", id: `combobox:${this.el.id}:toggle-btn` },
      { name: "positioner", id: `combobox:${this.el.id}:popper` },
      { name: "content", id: `combobox:${this.el.id}:content` }
    ];

    this.attributeCache = parts.map((part) => {
      const attrs = getAttributes(this.el, part);
      return attrs
    })
      .filter(cache => cache !== undefined);
  },

  updated() {
    this.combobox.api.setCollection(this.collection());
    this.combobox.render();
    restoreAttributes(this.el, this.attributeCache);
  },

  beforeDestroy() {
    this.combobox.destroy();
  },

  items(): Item[] {
    return Array.from(this.el.querySelectorAll<HTMLElement>(`[id^='combobox:${this.el.id}:option']`))
      .map((item: HTMLElement) => {
        const value = item.dataset.value;
        const label = item.dataset.label;
        if (!value || !label) {
          console.error("Missing `data-value` or `data-label` attribute on item.");
          return;
        }

        return { value, label };
      })
      .filter((value) => value !== undefined) as Item[];
  },

  collection() {
    return combobox.collection({
      items: this.items(),
      itemToValue: (item: Item) => item.value,
      itemToString: (item: Item) => item.label,
    });
  },

  context(): combobox.Context {
    return {
      id: this.el.id,
      name: this.el.dataset.name,
      collection: this.collection(),
      inputBehavior: getOption(this.el, "inputBehavior", ["autocomplete", "autohighlight", "none"]) as InputBehavior,
      selectionBehavior: getOption(this.el, "selectionBehavior", ["clear", "replace", "preserve"]) as SelectionBehavior,
      multiple: getBooleanOption(this.el, "multiple"),
      disabled: getBooleanOption(this.el, "disabled"),
      readOnly: getBooleanOption(this.el, "readOnly"),
      loopFocus: getBooleanOption(this.el, "loopFocus"),
      allowCustomValue: getBooleanOption(this.el, "allowCustomValue"),
      onOpenChange: (details: combobox.OpenChangeDetails) => {
        if (this.el.dataset.onOpenChange) {
          this.pushEventTo(`#${this.el.id}`, this.el.dataset.onOpenChange, details);
        }
      },
      onInputValueChange: (details: combobox.InputValueChangeDetails) => {
        if (this.el.dataset.onInputValueChange) {
          this.pushEventTo(`#${this.el.id}`, this.el.dataset.onInputValueChange, details);
        }
      },
      onHighlightChange: (details: combobox.HighlightChangeDetails) => {
        if (this.el.dataset.onHighlightChange) {
          this.pushEventTo(`#${this.el.id}`, this.el.dataset.onHighlightChange, details);
        }
      },
      onValueChange: (details: combobox.ValueChangeDetails) => {
        if (this.el.dataset.onValueChange) {
          this.pushEventTo(`#${this.el.id}`, this.el.dataset.onValueChange, details);
        }
      },
    };
  },
} as ComboboxHook;
