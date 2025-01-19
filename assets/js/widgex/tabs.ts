import * as tabs from "@zag-js/tabs";

import { normalizeProps, spreadProps, renderPart, getOption, getBooleanOption } from "./util";
import { Component } from "./component";
import { Hook, makeHook } from "./hook";
import type { Machine } from "@zag-js/core";
import type { Part } from "./component";

type ActivationMode = "manual" | "automatic" | undefined;

class TabsComponent extends Component<tabs.Context, tabs.Api> {
  initService(context: tabs.Context): Machine<any, any, any> {
    return tabs.machine(context);
  }

  initApi() {
    return tabs.connect(this.service.state, this.service.send, normalizeProps);
  }

  render() {
    const parts: Part[] = [{ name: "root", id: `tabs:${this.el.id}` }];

    for (const part of parts) renderPart(this.el, part, this.api);

    this.renderTabList();
    this.renderTabContent();
  }

  renderTabList() {
    const tabList = this.el.querySelector<HTMLElement>(`[id='tabs:${this.el.id}:list']`);

    if (!tabList) return;

    spreadProps(tabList, this.api.getListProps());
    this.renderTriggers(tabList);
  }

  renderTabContent() {
    for (const content of this.el.querySelectorAll<HTMLElement>(`[id^='tabs:${this.el.id}:content-']`)) {
      const value = content.dataset.value;
      if (!value) {
        console.error("Missing `data-value` attribute on content.");
        return;
      }
      spreadProps(content, this.api.getContentProps({ value }));
    }
  }

  renderTriggers(tabList: HTMLElement) {
    for (const trigger of tabList.querySelectorAll<HTMLElement>(`[id^="tabs:${this.el.id}:trigger-"]`)) {
      const value = trigger.dataset.value;
      if (!value) {
        console.error("Missing `data-value` attribute on trigger.");
        return;
      }
      spreadProps(trigger, this.api.getTriggerProps({ value }));
    }
  }
}

class Tabs extends Hook {
  component: TabsComponent;

  mounted() {
    this.component = new TabsComponent(this.el, this.context());
    this.component.init();
  }

  updated() {
    this.component.render();
  }

  beforeDestroy() {
    this.component.destroy();
  }

  context(): tabs.Context {
    return {
      id: this.el.id,
      value: this.el.dataset.value,
      loopFocus: getBooleanOption(this.el, "loop-focus"),
      activationMode: getOption(this.el, "activation-mode", ["manual", "automatic"]) as ActivationMode,
      onValueChange: (details: tabs.ValueChangeDetails) => {
        if (this.el.dataset.onValueChange) {
          this.pushEvent(this.el.dataset.onValueChange, details);
        }
      },
    };
  }
}

export default makeHook(Tabs);
