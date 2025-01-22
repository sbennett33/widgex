import * as combobox from "@zag-js/combobox";
// import { ListCollection } from "@zag-js/collection";
import { getAttributes, restoreAttributes, normalizeProps, renderPart, spreadProps, getBooleanOption, getOption } from "./util";
import { Component } from "./component";
import { Hook, makeHook } from "./hook";
import type { Machine } from "@zag-js/core";
import type { Part } from "./component";
import type { AttributeCache } from "./util";


type Item = { value: string; label: string };
type InputBehavior = "autocomplete" | "autohighlight" | "none" | undefined;
type SelectionBehavior = "clear" | "replace" | "preserve" | undefined;

class ComboboxComponent extends Component<combobox.Context, combobox.Api> {
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

class Combobox extends Hook {
  component: ComboboxComponent;
  attributeCache: AttributeCache[];

  mounted() {
    this.component = new ComboboxComponent(this.el, this.context());
    this.component.init();
  }

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
      return getAttributes(this.el, part);
    })
      .filter(cache => cache !== undefined);
  }

  updated() {
    this.component.api.setCollection(this.collection());
    this.component.render();
    restoreAttributes(this.el, this.attributeCache);
  }

  beforeDestroy() {
    this.component.destroy();
  }

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
  }

  collection() {
    const items = this.items();

    if (items.length == 0 && this.component) {
      this.component.api.setOpen(false);
    }

    return combobox.collection({
      items: items,
      itemToValue: (item: Item) => item.value,
      itemToString: (item: Item) => item.label,
    });
  }

  context(): combobox.Context {
    return {
      id: this.el.id,
      name: this.el.dataset.name,
      collection: this.collection(),
      inputBehavior: getOption(this.el, "inputBehavior", ["autocomplete", "autohighlight", "none"]) as InputBehavior,
      selectionBehavior: getOption(this.el, "selectionBehavior", ["clear", "replace", "preserve"]) as SelectionBehavior,
      multiple: getBooleanOption(this.el, "multiple", false),
      disabled: getBooleanOption(this.el, "disabled", false),
      readOnly: getBooleanOption(this.el, "readOnly", false),
      loopFocus: getBooleanOption(this.el, "loopFocus", false),
      allowCustomValue: getBooleanOption(this.el, "allowCustomValue", false),
      onOpenChange: (details: combobox.OpenChangeDetails) => {
        if (this.el.dataset.onOpenChange) {
          this.pushEventTo(`#${this.el.id}`, this.el.dataset.onOpenChange, details);
        }
      },
      onInputValueChange: (details: combobox.InputValueChangeDetails) => {
        console.log(this.el.dataset)
        if (this.el.dataset.onInputValueChange) {
          console.log(details);
          this.pushEvent(this.el.dataset.onInputValueChange, details);
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
  }
};

export default makeHook(Combobox);
