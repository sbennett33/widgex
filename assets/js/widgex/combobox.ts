import * as combobox from "@zag-js/combobox";
import {
  getAttributes,
  restoreAttributes,
  normalizeProps,
  spreadProps,
  getBooleanOption,
  getOption,
} from "./util";
import { Component, Part } from "./component";
import { Hook, makeHook } from "./hook";
import type { Machine } from "@zag-js/core";
import type { AttributeCache } from "./util";

type Item = { value: string; label: string };
type InputBehavior = "autocomplete" | "autohighlight" | "none" | undefined;
type SelectionBehavior = "clear" | "replace" | "preserve" | undefined;

class RootPart extends Part<combobox.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='combobox:${this.root.id}']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: combobox.Api): void {
    if (this.part) {
      spreadProps(this.part, api.getRootProps());
    }
  }
  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);
  };
}

class ControlPart extends Part<combobox.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='combobox:${this.root.id}:control']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: combobox.Api): void {
    if (this.part) {
      spreadProps(this.part, api.getControlProps());
    }
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);
  };
}

class InputPart extends Part<combobox.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='combobox:${this.root.id}:input']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: combobox.Api): void {
    if (this.part) {
      spreadProps(this.part, api.getInputProps());
    }
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);
  };
}

class TriggerPart extends Part<combobox.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='combobox:${this.root.id}:toggle-btn']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: combobox.Api): void {
    if (this.part) {
      spreadProps(this.part, api.getTriggerProps());
    }
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);
  };
}

class PositionerPart extends Part<combobox.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='combobox:${this.root.id}:popper']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: combobox.Api): void {
    if (this.part) {
      spreadProps(this.part, api.getPositionerProps());
    }
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);
  };
}

class ContentPart extends Part<combobox.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='combobox:${this.root.id}:content']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: combobox.Api): void {
    if (this.part) {
      spreadProps(this.part, api.getContentProps());
    }
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);
  };
}

class ItemParts extends Part<combobox.Api> {
  itemParts: ItemPart[];

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;

    this.itemParts = this.getItemParts();
  }

  getItemParts(): ItemPart[] {
    const itemParts: ItemPart[] = [];

    for (const el of this.getParts()) {
      itemParts.push(new ItemPart(this.root, el));
    }

    return itemParts;
  }

  getPart(parent: HTMLElement): HTMLElement {
    return parent;
  }

  refreshPart(_root: HTMLElement) {
    this.itemParts = this.getItemParts();
  }

  getParts(): NodeListOf<HTMLElement> {
    return this.parent.querySelectorAll<HTMLElement>(
      `[id^='combobox:${this.root.id}:option:']`,
    )!;
  }

  render(api: combobox.Api): void {
    for (const itemPart of this.itemParts) {
      itemPart.render(api);
    }
  }

  cacheAttributes() {
    for (const part of this.itemParts) {
      part.cacheAttributes();
    }
  }

  restoreAttributes = () => {
    for (const part of this.itemParts) {
      part.restoreAttributes();
    }
  };
}

class ItemPart extends Part<combobox.Api> {
  constructor(root: HTMLElement, part: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = part;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
  }

  render(api: combobox.Api): void {
    if (this.part) {
      const value = this.part.dataset.value!;
      const label = this.part.dataset.label!;
      spreadProps(this.part, api.getItemProps({ item: { value, label } }));
    }
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);
  };
}

class ComboboxComponent extends Component<combobox.Context, combobox.Api> {
  rootPart: RootPart;
  controlPart: ControlPart;
  inputPart: InputPart;
  triggerPart: TriggerPart;
  positionerPart: PositionerPart;
  contentPart: ContentPart;
  itemParts: ItemParts;

  initService(context: combobox.Context): Machine<any, any, any> {
    return combobox.machine(context);
  }

  initApi() {
    return combobox.connect(
      this.service.state,
      this.service.send,
      normalizeProps,
    );
  }

  initParts() {
    this.rootPart = new RootPart(this.el);
    this.controlPart = new ControlPart(this.el);
    this.inputPart = new InputPart(this.el);
    this.triggerPart = new TriggerPart(this.el);
    this.positionerPart = new PositionerPart(this.el);
    this.contentPart = new ContentPart(this.el);
    this.itemParts = new ItemParts(this.el);
  }

  render() {
    this.rootPart.render(this.api);
    this.controlPart.render(this.api);
    this.inputPart.render(this.api);
    this.triggerPart.render(this.api);
    this.positionerPart.render(this.api);
    this.contentPart.render(this.api);
    this.itemParts.render(this.api);
  }

  cacheAttributes(): void {
    this.rootPart.cacheAttributes();
    this.controlPart.cacheAttributes();
    this.inputPart.cacheAttributes();
    this.triggerPart.cacheAttributes();
    this.positionerPart.cacheAttributes();
    this.contentPart.cacheAttributes();
    this.itemParts.cacheAttributes();
  }

  restoreAttributes(): void {
    this.rootPart.restoreAttributes();
    this.controlPart.restoreAttributes();
    this.inputPart.restoreAttributes();
    this.triggerPart.restoreAttributes();
    this.positionerPart.restoreAttributes();
    this.contentPart.restoreAttributes();
    this.itemParts.restoreAttributes();
  }

  refreshParts() {
    this.rootPart.refreshPart(this.el);
    this.controlPart.refreshPart(this.el);
    this.inputPart.refreshPart(this.el);
    this.triggerPart.refreshPart(this.el);
    this.positionerPart.refreshPart(this.el);
    this.contentPart.refreshPart(this.el);
    this.itemParts.refreshPart(this.el);
  }
}

class WidgexCombobox extends Hook {
  component: ComboboxComponent;
  attributeCache: AttributeCache[];

  mounted() {
    this.component = new ComboboxComponent(this.el, this.context());
    this.component.init();

    this.handleEvent("wgx:update", () => {
      this.component.refreshParts();
      this.component.api.setCollection(this.collection());
      this.component.render();
    });
  }

  beforeUpdate() {
    this.component.cacheAttributes();
  }

  updated() {
    this.component.api.setCollection(this.collection());
    this.component.render();
    this.component.restoreAttributes();
  }

  beforeDestroy() {
    this.component.destroy();
  }

  items(): Item[] {
    return Array.from(
      this.el.querySelectorAll<HTMLElement>(
        `[id^='combobox:${this.el.id}:option']`,
      ),
    )
      .map((item: HTMLElement) => {
        // console.log(item);
        const value = item.dataset.value;
        const label = item.dataset.label;
        if (!value || !label) {
          console.error(
            "Missing `data-value` or `data-label` attribute on item.",
          );
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
      inputBehavior: getOption(this.el, "inputBehavior", [
        "autocomplete",
        "autohighlight",
        "none",
      ]) as InputBehavior,
      selectionBehavior: getOption(this.el, "selectionBehavior", [
        "clear",
        "replace",
        "preserve",
      ]) as SelectionBehavior,
      multiple: getBooleanOption(this.el, "multiple", false),
      disabled: getBooleanOption(this.el, "disabled", false),
      readOnly: getBooleanOption(this.el, "readOnly", false),
      loopFocus: getBooleanOption(this.el, "loopFocus", false),
      allowCustomValue: getBooleanOption(this.el, "allowCustomValue", false),
      onOpenChange: (details: combobox.OpenChangeDetails) => {
        if (this.el.dataset.onOpenChange) {
          this.pushEvent(this.el.dataset.onOpenChange, details);
        }
      },
      onInputValueChange: (details: combobox.InputValueChangeDetails) => {
        if (this.el.dataset.onInputValueChange) {
          this.pushEvent(this.el.dataset.onInputValueChange, details);
        }
      },
      onHighlightChange: (details: combobox.HighlightChangeDetails) => {
        if (this.el.dataset.onHighlightChange) {
          this.pushEvent(this.el.dataset.onHighlightChange, details);
        }
      },
      onValueChange: (details: combobox.ValueChangeDetails) => {
        if (this.el.dataset.onValueChange) {
          this.pushEvent(this.el.dataset.onValueChange, details);
        }
      },
    };
  }
}

export default makeHook(WidgexCombobox);
