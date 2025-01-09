import * as popover from "@zag-js/popover";
import { normalizeProps, spreadProps, renderPart, getBooleanOption } from "./util";
import { Component } from "./component";
import type { ViewHook } from "phoenix_live_view";
import type { Machine } from "@zag-js/core";

class Popover extends Component<popover.Context, popover.Api> {
  initService(context: popover.Context): Machine<any, any, any> {
    return popover.machine(context);
  }

  initApi() {
    return popover.connect(this.service.state, this.service.send, normalizeProps);
  }

  render() {
    const parts = ["trigger", "arrow", "positioner", "content", "title", "description"];
    for (const part of parts) renderPart(this.el, part, this.api);
  }
}

export interface PopoverHook extends ViewHook {
  popover: Popover;
  context: { id: string };
}

export default {
  mounted() {
    this.popover = new Popover(this.el, this.context());
    this.popover.init();
  },

  updated() {
    this.popover.render();
  },

  beforeDestroy() {
    this.popover.destroy();
  },

  context(): popover.Context {
    return {
      id: this.el.id,
      closeOnBlur: getBooleanOption(this.el, "close-on-blur"),
      closeOnEsc: getBooleanOption(this.el, "close-on-esc"),
    }
  }
} as PopoverHook;
