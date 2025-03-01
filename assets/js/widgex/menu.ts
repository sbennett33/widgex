import * as menu from "@zag-js/menu";
import {
  getAttributes,
  restoreAttributes,
  normalizeProps,
  spreadProps,
} from "./util";
import { Component, Part } from "./component";
import { Hook, makeHook } from "./hook";
import type { Machine } from "@zag-js/core";

class TriggerPart extends Part<menu.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='menu:${this.root.id}:trigger']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: menu.Api): void {
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

class ContextTriggerPart extends Part<menu.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='menu:${this.root.id}:ctx-trigger']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: menu.Api): void {
    if (this.part) {
      spreadProps(this.part, api.getContextTriggerProps());
    }
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);
  };
}

class PositionerPart extends Part<menu.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='menu:${this.root.id}:popper']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: menu.Api): void {
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

class ContentPart extends Part<menu.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='menu:${this.root.id}:content']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: menu.Api): void {
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

class ItemGroupParts extends Part<menu.Api> {
  itemGroupParts: ItemGroupPart[];
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.itemGroupParts = this.getItemGroupParts();
  }

  getItemGroupParts(): ItemGroupPart[] {
    const itemGroupParts: ItemGroupPart[] = [];
    for (const el of this.getParts()) {
      itemGroupParts.push(new ItemGroupPart(this.root, el));
    }
    return itemGroupParts;
  }

  getParts(): NodeListOf<HTMLElement> {
    return this.parent.querySelectorAll<HTMLElement>(
      `[id^='menu:${this.root.id}:group']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.itemGroupParts = this.getItemGroupParts();
  }

  render(api: menu.Api): void {
    for (const itemGroupPart of this.itemGroupParts) {
      itemGroupPart.render(api);
    }
  }

  cacheAttributes() {
    for (const itemGroupPart of this.itemGroupParts) {
      itemGroupPart.cacheAttributes();
    }
  }

  restoreAttributes() {
    for (const itemGroupPart of this.itemGroupParts) {
      itemGroupPart.restoreAttributes();
    }
  }
}

class ItemGroupPart extends Part<menu.Api> {
  constructor(root: HTMLElement, part: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = part;
  }

  getPart(): HTMLElement {
    return this.part;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
  }

  render(api: menu.Api): void {
    if (this.part) {
      spreadProps(
        this.part,
        api.getItemGroupProps({ id: this.part.dataset.value! }),
      );
    }
  }

  cacheAttributes() {
    this.attributeCache = getAttributes(this.part);
  }

  restoreAttributes() {
    restoreAttributes(this.part, this.attributeCache);
  }
}

class ItemParts extends Part<menu.Api> {
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
    return this.parent.querySelectorAll<HTMLElement>(`[data-part='item']`)!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.itemParts = this.getItemParts();
  }

  render(api: menu.Api): void {
    for (const itemPart of this.itemParts) {
      itemPart.render(api);
    }
  }

  cacheAttributes() {
    for (const itemPart of this.itemParts) {
      itemPart.cacheAttributes();
    }
  }

  restoreAttributes() {
    for (const itemPart of this.itemParts) {
      itemPart.restoreAttributes();
    }
  }
}

class ItemPart extends Part<menu.Api> {
  constructor(root: HTMLElement, part: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = part;
  }

  getPart(): HTMLElement {
    return this.part;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
  }

  render(api: menu.Api): void {
    if (this.part) {
      const value = this.part.dataset.value!;
      spreadProps(this.part, api.getItemProps({ value }));
    }
  }

  cacheAttributes() {
    this.attributeCache = getAttributes(this.part);
  }

  restoreAttributes() {
    restoreAttributes(this.part, this.attributeCache);
  }
}

class SeparatorParts extends Part<menu.Api> {
  separatorParts: SeparatorPart[];
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.separatorParts = this.getSeparatorParts();
  }

  getSeparatorParts(): SeparatorPart[] {
    const separatorParts: SeparatorPart[] = [];
    for (const el of this.getParts()) {
      separatorParts.push(new SeparatorPart(this.root, el));
    }
    return separatorParts;
  }

  getParts(): NodeListOf<HTMLElement> {
    return this.parent.querySelectorAll<HTMLElement>(
      `[data-part='separator']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.separatorParts = this.getSeparatorParts();
  }

  render(api: menu.Api): void {
    for (const separatorPart of this.separatorParts) {
      separatorPart.render(api);
    }
  }

  cacheAttributes() {
    for (const separatorPart of this.separatorParts) {
      separatorPart.cacheAttributes();
    }
  }

  restoreAttributes() {
    for (const separatorPart of this.separatorParts) {
      separatorPart.restoreAttributes();
    }
  }
}

class SeparatorPart extends Part<menu.Api> {
  constructor(root: HTMLElement, part: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = part;
  }

  getPart(): HTMLElement {
    return this.part;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
  }

  render(api: menu.Api): void {
    if (this.part) {
      spreadProps(this.part, api.getSeparatorProps());
    }
  }

  cacheAttributes() {
    this.attributeCache = getAttributes(this.part);
  }

  restoreAttributes() {
    restoreAttributes(this.part, this.attributeCache);
  }
}

class MenuComponent extends Component<menu.Context, menu.Api> {
  triggerPart: TriggerPart;
  contextTriggerPart: ContextTriggerPart;
  positionerPart: PositionerPart;
  contentPart: ContentPart;
  itemGroupParts: ItemGroupParts;
  itemParts: ItemParts;
  separatorParts: SeparatorParts;

  initService(context: menu.Context): Machine<any, any, any> {
    return menu.machine(context);
  }

  initApi() {
    return menu.connect(this.service.state, this.service.send, normalizeProps);
  }

  initParts() {
    this.triggerPart = new TriggerPart(this.el);
    this.contextTriggerPart = new ContextTriggerPart(this.el);
    this.positionerPart = new PositionerPart(this.el);
    this.contentPart = new ContentPart(this.el);
    this.itemGroupParts = new ItemGroupParts(this.el);
    this.itemParts = new ItemParts(this.el);
    this.separatorParts = new SeparatorParts(this.el);
  }

  render() {
    this.triggerPart.render(this.api);
    this.contextTriggerPart.render(this.api);
    this.positionerPart.render(this.api);
    this.contentPart.render(this.api);
    this.itemGroupParts.render(this.api);
    this.itemParts.render(this.api);
    this.separatorParts.render(this.api);
  }

  cacheAttributes() {
    this.triggerPart.cacheAttributes();
    this.contextTriggerPart.cacheAttributes();
    this.positionerPart.cacheAttributes();
    this.contentPart.cacheAttributes();
    this.itemGroupParts.cacheAttributes();
    this.itemParts.cacheAttributes();
    this.separatorParts.cacheAttributes();
  }

  restoreAttributes() {
    this.triggerPart.restoreAttributes();
    this.contextTriggerPart.restoreAttributes();
    this.positionerPart.restoreAttributes();
    this.contentPart.restoreAttributes();
    this.itemGroupParts.restoreAttributes();
    this.itemParts.restoreAttributes();
    this.separatorParts.restoreAttributes();
  }

  refreshParts() {
    this.triggerPart.refreshPart(this.el);
    this.contextTriggerPart.refreshPart(this.el);
    this.positionerPart.refreshPart(this.el);
    this.contentPart.refreshPart(this.el);
    this.itemGroupParts.refreshPart(this.el);
    this.itemParts.refreshPart(this.el);
    this.separatorParts.refreshPart(this.el);
  }
}

class Menu extends Hook {
  component: MenuComponent;

  mounted() {
    this.component = new MenuComponent(this.el, { id: this.el.id });
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
}

export default makeHook(Menu);
