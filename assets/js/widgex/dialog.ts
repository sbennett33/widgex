import * as dialog from "@zag-js/dialog";
import {
  spreadProps,
  getAttributes,
  restoreAttributes,
  getBooleanOption,
  normalizeProps,
} from "./util";
import { Component, Part } from "./component";
import { Hook, makeHook } from "./hook";
import type { Machine } from "@zag-js/core";

type Role = "dialog" | "alertdialog" | undefined;

class TriggerPart extends Part<dialog.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='dialog:${this.root.id}:trigger']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: dialog.Api): void {
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

class BackdropPart extends Part<dialog.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='dialog:${this.root.id}:backdrop']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: dialog.Api): void {
    if (this.part) {
      spreadProps(this.part, api.getBackdropProps());
    }
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);
  };
}

class PositionerPart extends Part<dialog.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='dialog:${this.root.id}:positioner']`,
    )!;
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: dialog.Api): void {
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

class ContentPart extends Part<dialog.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='dialog:${this.root.id}:content']`,
    )!;
  }

  refreshPart(root: HTMLElement): void {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: dialog.Api): void {
    if (this.part) {
      spreadProps(this.part, api.getContentProps());
    }
  }

  cacheAttributes(): void {
    this.attributeCache = getAttributes(this.part);
  }

  restoreAttributes(): void {
    restoreAttributes(this.part, this.attributeCache);
  }
}

class TitlePart extends Part<dialog.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='dialog:${this.root.id}:title']`,
    )!;
  }

  refreshPart(root: HTMLElement): void {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: dialog.Api): void {
    if (this.part) {
      spreadProps(this.part, api.getTitleProps());
    }
  }

  cacheAttributes(): void {
    this.attributeCache = getAttributes(this.part);
  }

  restoreAttributes(): void {
    restoreAttributes(this.part, this.attributeCache);
  }
}

class DescriptionPart extends Part<dialog.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='dialog:${this.root.id}:description']`,
    )!;
  }

  refreshPart(root: HTMLElement): void {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: dialog.Api): void {
    if (this.part) {
      spreadProps(this.part, api.getDescriptionProps());
    }
  }

  cacheAttributes(): void {
    this.attributeCache = getAttributes(this.part);
  }

  restoreAttributes(): void {
    restoreAttributes(this.part, this.attributeCache);
  }
}

class CloseTriggerPart extends Part<dialog.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='dialog:${this.root.id}:close']`,
    )!;
  }

  refreshPart(root: HTMLElement): void {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  render(api: dialog.Api): void {
    if (this.part) {
      spreadProps(this.part, api.getCloseTriggerProps());
    }
  }

  cacheAttributes(): void {
    this.attributeCache = getAttributes(this.part);
  }

  restoreAttributes(): void {
    restoreAttributes(this.part, this.attributeCache);
  }
}

class DialogComponent extends Component<dialog.Context, dialog.Api> {
  triggerPart: TriggerPart;
  backdropPart: BackdropPart;
  positionerPart: PositionerPart;
  contentPart: ContentPart;
  titlePart: TitlePart;
  descriptionPart: DescriptionPart;
  closeTriggerPart: CloseTriggerPart;

  initService(context: dialog.Context): Machine<any, any, any> {
    return dialog.machine(context);
  }

  initApi() {
    return dialog.connect(
      this.service.state,
      this.service.send,
      normalizeProps,
    );
  }

  initParts() {
    this.triggerPart = new TriggerPart(this.el);
    this.backdropPart = new BackdropPart(this.el);
    this.positionerPart = new PositionerPart(this.el);
    this.contentPart = new ContentPart(this.el);
    this.titlePart = new TitlePart(this.el);
    this.descriptionPart = new DescriptionPart(this.el);
    this.closeTriggerPart = new CloseTriggerPart(this.el);
  }

  render() {
    this.triggerPart.render(this.api);
    this.backdropPart.render(this.api);
    this.positionerPart.render(this.api);
    this.contentPart.render(this.api);
    this.titlePart.render(this.api);
    this.descriptionPart.render(this.api);
    this.closeTriggerPart.render(this.api);
  }

  cacheAttributes() {
    this.triggerPart.cacheAttributes();
    this.backdropPart.cacheAttributes();
    this.positionerPart.cacheAttributes();
    this.contentPart.cacheAttributes();
    this.titlePart.cacheAttributes();
    this.descriptionPart.cacheAttributes();
    this.closeTriggerPart.cacheAttributes();
  }

  restoreAttributes() {
    this.triggerPart.restoreAttributes();
    this.backdropPart.restoreAttributes();
    this.positionerPart.restoreAttributes();
    this.contentPart.restoreAttributes();
    this.titlePart.restoreAttributes();
    this.descriptionPart.restoreAttributes();
    this.closeTriggerPart.restoreAttributes();
  }

  refreshParts() {
    this.triggerPart.refreshPart(this.el);
    this.backdropPart.refreshPart(this.el);
    this.positionerPart.refreshPart(this.el);
    this.contentPart.refreshPart(this.el);
    this.titlePart.refreshPart(this.el);
    this.descriptionPart.refreshPart(this.el);
    this.closeTriggerPart.refreshPart(this.el);
  }
}

class Dialog extends Hook {
  component: DialogComponent;

  mounted() {
    this.component = new DialogComponent(this.el, this.context());
    this.component.init();

    this.handleEvent("wgx:update", () => {
      this.component.refreshParts();
      this.component.render();
    });

    window.addEventListener(`wgx:close-${this.el.id}`, () => {
      this.component.api.setOpen(false);
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

  context(): dialog.Context {
    let role: string | undefined = this.el.dataset.role;
    const validRoles = ["dialog", "alertdialog"] as const;

    if (role !== undefined && !validRoles.includes(role as any)) {
      console.error(
        `Invalid 'role' specified: '${role}'. Expected 'dialog' or 'alertdialog'.`,
      );
      role = undefined;
    }

    return {
      id: this.el.id,
      role: role as Role,
      preventScroll: getBooleanOption(this.el, "preventScroll", true),
      closeOnInteractOutside: getBooleanOption(
        this.el,
        "closeOnInteractOutside",
        true,
      ),
      closeOnEscape: getBooleanOption(this.el, "closeOnEscape", true),
      onOpenChange: (details: dialog.OpenChangeDetails) => {
        if (this.el.dataset.onOpenChange) {
          this.pushEvent(this.el.dataset.onOpenChange, details);
        }
      },
    };
  }
}

export default makeHook(Dialog);
