import * as tabs from "@zag-js/tabs";
import { normalizeProps, spreadProps, renderPart, getOption, getBooleanOption } from "./util";
import { Component } from "./component";
import type { ViewHook } from "phoenix_live_view";
import type { Machine } from "@zag-js/core";
import type { Part } from "./component";

class Tabs extends Component<tabs.Context, tabs.Api> {
  initService(context: tabs.Context): Machine<any, any, any> {
    return tabs.machine(context);
  }

  initApi() {
    return tabs.connect(this.service.state, this.service.send, normalizeProps);
  }

  render() {
    const parts: Part[] = [{ name: "root", id: `tabs:${this.el.id}` }];

    for (const part of parts) renderPart(this.el, part, this.api);

    this.renderTabList(this.el.id);
    this.renderTabContent(this.el.id);
  }

  renderTabList(parentId: string) {
    const tabList = this.el.querySelector<HTMLElement>(`[id='tabs:${parentId}:list']`);

    if (!tabList) return;

    spreadProps(tabList, this.api.getListProps());
    this.renderTriggers(parentId);
  }

  renderTabContent(parentId: string) {
    for (const content of this.el.querySelectorAll<HTMLElement>(`[id^='tabs:${parentId}:content-']`)) {
      const value = content.dataset.value;
      if (!value) {
        console.error("Missing `data-value` attribute on content.");
        return;
      }
      spreadProps(content, this.api.getContentProps({ value }));
    }
  }

  renderTriggers(parentId: string) {
    for (const trigger of this.el.querySelectorAll<HTMLElement>(`[id^="tabs:${parentId}:trigger-"]`)) {
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
  tabs: Tabs;
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
      value: getOption(this.el, "value"),
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
