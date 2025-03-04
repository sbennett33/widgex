import type { Machine } from "@zag-js/core";
import type { AttributeCache } from "./util";

interface ComponentInterface<Api> {
  el: HTMLElement;
  service: ReturnType<any>;
  api: Api;

  init(): void;
  destroy(): void;
  render(): void;
}

export abstract class Component<Context, Api>
  implements ComponentInterface<Api>
{
  el: HTMLElement;
  service: ReturnType<any>;
  api: Api;

  abstract initService(context: Context): Machine<any, any, any>;
  abstract initApi(): Api;
  abstract initParts(): void;
  abstract render(): void;
  abstract cacheAttributes(): void;
  abstract restoreAttributes(): void;
  abstract refreshParts(): void;

  constructor(el: HTMLElement, context: Context) {
    this.el = el;
    this.service = this.initService(context);
    this.api = this.initApi();
    this.initParts();
  }

  init = () => {
    this.render();
    this.service.subscribe(() => {
      this.api = this.initApi();
      this.api;
      this.render();
    });
    this.service.start();
  };

  destroy = () => {
    this.service.stop();
  };
}

export abstract class Part<Api> {
  root: HTMLElement;
  parent: HTMLElement;
  part: HTMLElement;
  attributeCache: AttributeCache;

  abstract render(api: Api): void;
  abstract cacheAttributes(): void;
  abstract restoreAttributes(): void;
  abstract refreshPart(
    root: HTMLElement,
    parent?: HTMLElement,
    value?: any,
  ): void;
}
