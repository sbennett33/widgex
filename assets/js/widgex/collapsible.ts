import * as collapsible from "@zag-js/collapsible";
import { getAttributes, restoreAttributes, spreadProps, normalizeProps, renderPart } from "./util";
import { Component, Part } from "./component";
import { Hook, makeHook } from "./hook";
import type { Machine } from "@zag-js/core";

type Dir = "ltr" | "rtl" | undefined;

class RootPart extends Part<collapsible.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(`[id='collapsible:${this.root.id}']`)!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: collapsible.Api): void {
    spreadProps(this.part, api.getRootProps());
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  }

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache)
  }
};

class TriggerPart extends Part<collapsible.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(`[id='collapsible:${this.root.id}:trigger']`)!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: collapsible.Api): void {
    spreadProps(this.part, api.getTriggerProps());
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  }

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache)
  }
};

class ContentPart extends Part<collapsible.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(`[id='collapsible:${this.root.id}:content']`)!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: collapsible.Api): void {
    spreadProps(this.part, api.getContentProps());
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  }

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache)
  }
};

class CollapsibleComponent extends Component<collapsible.Context, collapsible.Api> {
  rootPart: RootPart;
  triggerPart: TriggerPart;
  contentPart: ContentPart;

  initService(context: collapsible.Context): Machine<any, any, any> {
    return collapsible.machine(context);
  }

  initApi() {
    return collapsible.connect(this.service.state, this.service.send, normalizeProps);
  }

  initParts() {
    this.rootPart = new RootPart(this.el);
    this.triggerPart = new TriggerPart(this.el);
    this.contentPart = new ContentPart(this.el);
  }

  render() {
    this.rootPart.render(this.api);
    this.triggerPart.render(this.api);
    this.contentPart.render(this.api);
  }

  cacheAttributes(): void {
    this.rootPart.cacheAttributes();
    this.triggerPart.cacheAttributes();
    this.contentPart.cacheAttributes();
  }

  restoreAttributes(): void {
    this.rootPart.restoreAttributes();
    this.triggerPart.restoreAttributes();
    this.contentPart.restoreAttributes();
  }

  refreshParts() {
    this.rootPart.refreshPart(this.el)
    this.triggerPart.refreshPart(this.el)
    this.contentPart.refreshPart(this.el)
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
