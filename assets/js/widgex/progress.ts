import * as progress from "@zag-js/progress";
import {
  getAttributes,
  restoreAttributes,
  normalizeProps,
  spreadProps,
  clearProps,
} from "./util";
import { Component, Part } from "./component";
import { Hook, makeHook } from "./hook";
import type { Machine } from "@zag-js/core";

class RootPart extends Part<progress.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='progress-${this.root.id}']`,
    )!;
  }

  render(api: progress.Api): void {
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

class TrackPart extends Part<progress.Api> {
  rangePart: RangePart;

  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();

    this.rangePart = new RangePart(this.part);
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(
      `[id='progress-${this.root.id}-track']`,
    )!;
  }

  render(api: progress.Api): void {
    spreadProps(this.part, api.getTrackProps());

    this.rangePart.render(api);
  }

  refreshPart(root: HTMLElement) {
    this.root = root;
    this.parent = root;
    this.part = this.getPart();

    this.rangePart.refreshPart(this.part);
  }

  cacheAttributes = () => {
    this.attributeCache = getAttributes(this.part);

    this.rangePart.cacheAttributes();
  };

  restoreAttributes = () => {
    restoreAttributes(this.part, this.attributeCache);

    this.rangePart.restoreAttributes();
  };
}

class RangePart extends Part<progress.Api> {
  constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.parent = root;
    this.part = this.getPart();
  }

  getPart(): HTMLElement {
    return this.parent.querySelector<HTMLElement>(`[data-part='range']`)!;
  }

  render(api: progress.Api): void {
    spreadProps(this.part, api.getRangeProps());
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

class ProgressComponent extends Component<progress.Context, progress.Api> {
  rootPart: RootPart;
  trackPart: TrackPart;

  constructor(el: HTMLElement, context: progress.Context) {
    super(el, context);
    this.rootPart = new RootPart(el);
    this.trackPart = new TrackPart(el);
  }

  initService(context: progress.Context): Machine<any, any, any> {
    return progress.machine(context);
  }

  initApi() {
    return progress.connect(
      this.service.state,
      this.service.send,
      normalizeProps,
    );
  }

  render() {
    this.rootPart.render(this.api);
    this.trackPart.render(this.api);
  }

  refreshParts(): void {
    this.rootPart.refreshPart(this.el);
    this.trackPart.refreshPart(this.el);
  }

  cacheAttributes(): void {
    this.rootPart.cacheAttributes();
    this.trackPart.cacheAttributes();
  }

  restoreAttributes(): void {
    this.rootPart.restoreAttributes();
    this.trackPart.restoreAttributes();
  }
}

class Progress extends Hook {
  component: ProgressComponent;

  mounted() {
    this.component = new ProgressComponent(this.el, this.context());
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
    this.component.api.setValue(this.el.dataset.value);
    this.component.render();
    this.component.restoreAttributes();
  }

  beforeDestroy() {
    this.component.destroy();
  }

  disconnected(): void {
    const root = this.el.querySelector<HTMLElement>(
      `[id='progress-${this.el.id}']`,
    )!;
    const track = this.el.querySelector<HTMLElement>(
      `[id='progress-${this.el.id}-track']`,
    )!;
    const range = track.querySelector<HTMLElement>(`[data-part='range']`)!;

    clearProps(root);
    clearProps(track);
    clearProps(range);
  }

  context(): progress.Context {
    return {
      id: this.el.id,
      value: Number(this.el.dataset.value) || 0,
      min: Number(this.el.dataset.min) || 0,
      max: Number(this.el.dataset.max) || 100,
    };
  }
}

export default makeHook(Progress);
