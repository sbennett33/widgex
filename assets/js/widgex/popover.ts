import * as popover from "@zag-js/popover";
import { normalizeProps, renderPart, getBooleanOption } from "./util";
import { Component } from "./component";
import { Hook, makeHook } from "./hook";
import type { Machine } from "@zag-js/core";
import type { Part } from "./component";

class PopoverComponent extends Component<popover.Context, popover.Api> {
  initService(context: popover.Context): Machine<any, any, any> {
    return popover.machine(context);
  }

  initApi() {
    return popover.connect(this.service.state, this.service.send, normalizeProps);
  }

  render() {
    const parts: Part[] = [
      { name: "trigger", id: `popover:${this.el.id}:trigger` },
      { name: "arrow", id: `popover:${this.el.id}:arrow` },
      { name: "positioner", id: `popover:${this.el.id}:popper` },
      { name: "content", id: `popover:${this.el.id}:content` },
      { name: "title", id: `popover:${this.el.id}:title` },
      { name: "description", id: `popover:${this.el.id}:desc` }
    ];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}

class Popover extends Hook {
  component: PopoverComponent;

  mounted() {
    this.component = new PopoverComponent(this.el, this.context());
    this.component.init();
  }

  updated() {
    this.component.render();
  }

  beforeDestroy() {
    this.component.destroy();
  }

  context(): popover.Context {
    return {
      id: this.el.id,
      closeOnInteractOutside: getBooleanOption(this.el, "close-on-interact-outside", true),
      closeOnEscape: getBooleanOption(this.el, "close-on-escape", true),
    }
  }
};

export default makeHook(Popover);
