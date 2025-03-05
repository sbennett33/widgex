import * as tabs from "@zag-js/tabs";
import {
  getAttributes,
  restoreAttributes,
  normalizeProps,
  spreadProps,
  getOption,
  getBooleanOption,
  clearProps,
} from "./util";
import { Component, Part } from "./component";
import { Hook, makeHook } from "./hook";
import type { Machine } from "@zag-js/core";

type ActivationMode = "manual" | "automatic" | undefined;

class RootPart extends Part<tabs.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='tabs:${this.root.id}']`,
    )!;
  }

  refreshPart(root: HTMLElement): void {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: tabs.Api): void {
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

  clearProps = () => {
    clearProps(this.part);
  };
}

class TabList extends Part<tabs.Api> {
  triggers: Trigger[];

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;

    this.part = this.getPart();
    this.triggers = this.getTriggers();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='tabs:${this.root.id}:list']`,
    )!;
  }

  getTriggers(): Trigger[] {
    const triggers: Trigger[] = [];

    for (const el of this.getTriggerParts()) {
      triggers.push(new Trigger(this.root, el));
    }

    return triggers;
  }

  getTriggerParts(): NodeListOf<HTMLElement> {
    return this.parent.querySelectorAll<HTMLElement>(
      `[id^='tabs:${this.root.id}:trigger-']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
    this.triggers = this.getTriggers();
  }

  render(api: tabs.Api): void {
    if (this.part) {
      spreadProps(this.part, api.getListProps());
    }

    for (const trigger of this.triggers) {
      trigger.render(api);
    }
  }

  cacheAttributes() {
    this.attributeCache = getAttributes(this.part);

    for (const trigger of this.triggers) {
      trigger.cacheAttributes();
    }
  }

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);

    for (const trigger of this.triggers) {
      trigger.restoreAttributes();
    }
  };

  clearProps = () => {
    clearProps(this.part);

    for (const trigger of this.triggers) {
      trigger.clearProps();
    }
  };
}

class Trigger extends Part<tabs.Api> {
  constructor(root: HTMLElement, part: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = part;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
  }

  render(api: tabs.Api): void {
    if (this.part) {
      const value = this.part.dataset.value!;
      spreadProps(this.part, api.getTriggerProps({ value: value }));
    }
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);
  };

  clearProps = () => {
    clearProps(this.part);
  };
}

class Content extends Part<tabs.Api> {
  contentParts: ContentPart[];

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;

    this.contentParts = this.getContentParts();
  }

  getContentParts(): ContentPart[] {
    const contentParts: ContentPart[] = [];

    for (const el of this.getContent()) {
      contentParts.push(new ContentPart(this.root, el));
    }

    return contentParts;
  }

  getPart(parent: HTMLElement): HTMLElement {
    return parent;
  }

  refreshPart(_root: HTMLElement) {
    this.contentParts = this.getContentParts();
  }

  getContent(): NodeListOf<HTMLElement> {
    return this.parent.querySelectorAll<HTMLElement>(
      `[id^='tabs:${this.root.id}:content-']`,
    )!;
  }

  render(api: tabs.Api): void {
    for (const contentPart of this.contentParts) {
      contentPart.render(api);
    }
  }

  cacheAttributes() {
    for (const contentPart of this.contentParts) {
      contentPart.cacheAttributes();
    }
  }

  restoreAttributes = () => {
    for (const contentPart of this.contentParts) {
      contentPart.restoreAttributes();
    }
  };

  clearProps = () => {
    for (const contentPart of this.contentParts) {
      contentPart.clearProps();
    }
  };
}

class ContentPart extends Part<tabs.Api> {
  constructor(root: HTMLElement, part: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = part;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
  }

  render(api: tabs.Api): void {
    if (this.part) {
      const value = this.part.dataset.value!;
      spreadProps(this.part, api.getContentProps({ value: value }));
    }
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);
  };

  clearProps = () => {
    clearProps(this.part);
  };
}

class TabsComponent extends Component<tabs.Context, tabs.Api> {
  rootPart: RootPart;
  tabList: TabList;
  content: Content;

  constructor(el: HTMLElement, context: tabs.Context) {
    super(el, context);

    this.rootPart = new RootPart(this.el);
    this.tabList = new TabList(this.el);
    this.content = new Content(this.el);
  }

  initService(context: tabs.Context): Machine<any, any, any> {
    return tabs.machine(context);
  }

  initApi() {
    return tabs.connect(this.service.state, this.service.send, normalizeProps);
  }

  render() {
    this.rootPart.render(this.api);
    this.tabList.render(this.api);
    this.content.render(this.api);
  }

  cacheAttributes(): void {
    this.rootPart.cacheAttributes();
    this.tabList.cacheAttributes();
    this.content.cacheAttributes();
  }

  restoreAttributes(): void {
    this.rootPart.restoreAttributes();
    this.tabList.restoreAttributes();
    this.content.restoreAttributes();
  }

  refreshParts(): void {
    this.rootPart.refreshPart(this.el);
    this.tabList.refreshPart(this.el);
    this.content.refreshPart(this.el);
  }

  clearProps(): void {
    this.rootPart.clearProps();
    this.tabList.clearProps();
    this.content.clearProps();
  }
}

class Tabs extends Hook {
  component: TabsComponent;

  mounted() {
    this.component = new TabsComponent(this.el, this.context());
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

  disconnected(): void {
    this.component.clearProps();
  }

  context(): tabs.Context {
    return {
      id: this.el.id,
      value: this.el.dataset.value,
      loopFocus: getBooleanOption(this.el, "loop-focus", false),
      activationMode: getOption(this.el, "activation-mode", [
        "manual",
        "automatic",
      ]) as ActivationMode,
      onValueChange: (details: tabs.ValueChangeDetails) => {
        if (this.el.dataset.onValueChange) {
          this.pushEvent(this.el.dataset.onValueChange, details);
        }
      },
    };
  }
}

export default makeHook(Tabs);
