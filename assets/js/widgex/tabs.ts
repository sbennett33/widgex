import * as tabs from "@zag-js/tabs";
import { normalizeProps, spreadProps, renderPart, getBooleanOption } from "./util";
import { Component } from "./component";
import type { ViewHook } from "phoenix_live_view";
import type { Machine } from "@zag-js/core";

class Tabs extends Component<tabs.Context, tabs.Api> {
  initService(context: tabs.Context): Machine<any, any, any> {
    return tabs.machine(context);
  }

  initApi() {
    return tabs.connect(this.service.state, this.service.send, normalizeProps);
  }

  render() {
    const parts = ["root"];
    for (const part of parts) renderPart(this.el, part, this.api);
    this.renderTabList();
    this.renderTabContent();
  }

  renderTabList() {
    const tabList = this.el.querySelector<HTMLElement>("[data-part='list']");
    if (!tabList) return;
    spreadProps(tabList, this.api.getListProps());
    this.renderTriggers();
  }

  renderTabContent() {
    for (const content of this.el.querySelectorAll<HTMLElement>("[data-part='content']")) {
      const value = content.dataset.value;
      if (!value) {
        console.error("Missing `data-value` attribute on content.");
        return;
      }
      spreadProps(content, this.api.getContentProps({ value }));
    }
  }

  renderTriggers() {
    for (const trigger of this.el.querySelectorAll<HTMLElement>("[data-part='trigger']")) {
      const value = trigger.dataset.value;
      if (!value) {
        console.error("Missing `data-value` attribute on trigger.");
        return;
      }
      spreadProps(trigger, this.api.getTriggerProps({ value }));
    }
  }
}

export interface TabsHook extends ViewHook {
  accordion: Tabs;
  context(): tabs.Context;
}

export default {
  mounted() {
    this.tabs = new Tabs(this.el, this.context());
    this.tabs.init();
  },

  updated() {
    this.tabs.render();
  },

  beforeDestroy() {
    this.tabs.destroy();
  },

  context(): tabs.Context {
    return {
      id: this.el.id,
      value: [""],
      loopFocus: getBooleanOption(this.el, "loop-focus"),
      activationMode: getBooleanOption(this.el, "activation-mode"),
      onValueChange: (details: tabs.ValueChangeDetails) => {
        if (this.el.dataset.onValueChange) {
          this.pushEvent(this.el.dataset.onValueChange, details);
        }
      },
    };
  },
} as TabsHook;
