import * as accordion from "@zag-js/accordion";
import {
  getAttributes,
  restoreAttributes,
  normalizeProps,
  spreadProps,
  getBooleanOption,
} from "./util";
import { Component, Part } from "./component";
import { Hook, makeHook } from "./hook";
import type { Machine } from "@zag-js/core";
import type { AttributeCache } from "./util";

class RootPart extends Part<accordion.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='accordion:${this.root.id}']`,
    )!;
  }

  render(api: accordion.Api): void {
    spreadProps(this.part, api.getRootProps());
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);
  };
}

class ItemParts extends Part<accordion.Api> {
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

  getParts(): NodeListOf<HTMLElement> {
    return this.parent.querySelectorAll<HTMLElement>(
      `[id^='accordion:${this.root.id}:item']`,
    )!;
  }

  render(api: accordion.Api): void {
    for (const itemPart of this.itemParts) {
      itemPart.render(api);
    }
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.itemParts = this.getItemParts();
  }

  cacheAttributes = () => {
    for (const part of this.itemParts) {
      part.cacheAttributes();
    }
  };

  restoreAttributes = () => {
    for (const part of this.itemParts) {
      part.restoreAttributes();
    }
  };
}

class ItemPart extends Part<accordion.Api> {
  attributeCaches: AttributeCache[];
  triggerPart: TriggerPart;
  contentPart: ContentPart;

  constructor(root: HTMLElement, part: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = part;

    this.triggerPart = new TriggerPart(root, part, part.dataset.value!);
    this.contentPart = new ContentPart(root, part, part.dataset.value!);
  }

  getPart(_parent: HTMLElement): HTMLElement {
    return this.part;
  }

  render(api: accordion.Api): void {
    this.triggerPart.render(api);
    this.contentPart.render(api);
  }

  refreshPart(root: HTMLElement): void {
    this.root = root;
    this.parent = root;

    this.triggerPart.refreshPart(root, this.part, this.part.dataset.value!);
    this.triggerPart.refreshPart(root, this.part, this.part.dataset.value!);
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);

    this.triggerPart.cacheAttributes();
    this.contentPart.cacheAttributes();
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);

    this.triggerPart.restoreAttributes();
    this.contentPart.restoreAttributes();
  };
}

class TriggerPart extends Part<accordion.Api> {
  value: string;

  constructor(root: HTMLElement, parent: HTMLElement, value: string) {
    super();
    this.root = root;
    this.parent = parent;
    this.value = value;
    this.part = this.getPart();
  }

  refreshPart(root: HTMLElement, parent: HTMLElement, value: string) {
    this.root = root;
    this.parent = parent;
    this.value = value;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='accordion:${this.root.id}:trigger:${this.value}']`,
    )!;
  }

  render(api: accordion.Api): void {
    const value = this.value;
    spreadProps(this.part, api.getItemTriggerProps({ value }));
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);
  };
}

class ContentPart extends Part<accordion.Api> {
  value: string;

  constructor(root: HTMLElement, parent: HTMLElement, value: string) {
    super();
    this.root = root;
    this.parent = parent;
    this.value = value;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='accordion:${this.root.id}:content:${this.value}']`,
    )!;
  }

  refreshPart(root: HTMLElement, parent: HTMLElement, value: string) {
    this.root = root;
    this.parent = parent;
    this.value = value;
    this.part = this.getPart();
  }

  render(api: accordion.Api): void {
    const value = this.value;
    spreadProps(this.part, api.getItemContentProps({ value }));
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);
  };
}

class AccordionComponent extends Component<accordion.Context, accordion.Api> {
  rootPart: RootPart;
  itemParts: ItemParts;

  initService(context: accordion.Context): Machine<any, any, any> {
    return accordion.machine(context);
  }

  initApi() {
    return accordion.connect(
      this.service.state,
      this.service.send,
      normalizeProps,
    );
  }

  initParts(): void {
    this.rootPart = new RootPart(this.el);
    this.itemParts = new ItemParts(this.el);
  }

  render(): void {
    this.rootPart.render(this.api);
    this.itemParts.render(this.api);
  }

  refreshParts(): void {
    this.rootPart.refreshPart(this.el);
    this.itemParts.refreshPart(this.el);
  }

  cacheAttributes() {
    this.rootPart.cacheAttributes();
    this.itemParts.cacheAttributes();
  }

  restoreAttributes() {
    this.rootPart.restoreAttributes();
    this.itemParts.restoreAttributes();
  }
}

class Accordion extends Hook {
  component: AccordionComponent;

  mounted() {
    this.component = new AccordionComponent(this.el, this.context());
    this.component.init();

    this.handleEvent("wgx:update", () => {
      this.component.refreshParts();
      this.component.render();
    });
  }

  beforeUpdate() {
    this.component.cacheAttributes();
  }

  updated() {
    this.component.render();
    this.component.restoreAttributes();
  }

  beforeDestroy() {
    this.component.destroy();
  }

  context(): accordion.Context {
    return {
      id: this.el.id,
      value: [""],
      disabled: getBooleanOption(this.el, "disabled", false),
      multiple: getBooleanOption(this.el, "multiple", false),
      collapsible: getBooleanOption(this.el, "collapsible", false),
      onValueChange: (details: accordion.ValueChangeDetails) => {
        if (this.el.dataset.onValueChange) {
          this.pushEvent(this.el.dataset.onValueChange, details);
        }
      },
    };
  }
}

export default makeHook(Accordion);
