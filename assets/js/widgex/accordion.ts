import * as accordion from "@zag-js/accordion";
import { normalizeProps, spreadProps, renderPart, getBooleanOption } from "./util";
import { Component } from "./component";
import { Hook, makeHook } from "./hook";
import type { Machine } from "@zag-js/core";
import type { Part } from "./component";

class AccordionComponent extends Component<accordion.Context, accordion.Api> {
  initService(context: accordion.Context): Machine<any, any, any> {
    return accordion.machine(context);
  }

  initApi() {
    return accordion.connect(this.service.state, this.service.send, normalizeProps);
  }

  render() {
    const parts: Part[] = [{ name: "root", id: `accordion:${this.el.id}` }];
    for (const part of parts) renderPart(this.el, part, this.api);
    this.renderItems(this.el.id);
  }

  renderItems(parent_id: string) {
    for (const item of this.el.querySelectorAll<HTMLElement>(`[id^='accordion:${parent_id}:item']`)) {
      const value = item.dataset.value;
      if (!value) {
        console.error("Missing `data-value` attribute on item.");
        return;
      }
      spreadProps(item, this.api.getItemProps({ value }));

      this.renderItemTrigger(item, parent_id, value);
      this.renderItemContent(item, parent_id, value);
    }
  }

  renderItemTrigger(item: HTMLElement, parent_id: string, value: string) {
    const itemTrigger = item.querySelector<HTMLElement>(`[id='accordion:${parent_id}:trigger:${value}']`);
    if (!itemTrigger) return;
    spreadProps(itemTrigger, this.api.getItemTriggerProps({ value }));
  }

  renderItemContent(item: HTMLElement, parent_id: string, value: string) {
    const itemContent = item.querySelector<HTMLElement>(`[id='accordion:${parent_id}:content:${value}']`);
    if (!itemContent) return;
    spreadProps(itemContent, this.api.getItemContentProps({ value }));
  }
}

class Accordion extends Hook {
  component: AccordionComponent;

  mounted() {
    this.component = new AccordionComponent(this.el, this.context());
    this.component.init();
  }

  updated() {
    this.component.render();
  }

  beforeDestroy() {
    this.component.destroy();
  }

  context(): accordion.Context {
    return {
      id: this.el.id,
      value: [""],
      disabled: getBooleanOption(this.el, "disabled"),
      multiple: getBooleanOption(this.el, "multiple"),
      collapsible: getBooleanOption(this.el, "collapsible"),
      onValueChange: (details: accordion.ValueChangeDetails) => {
        if (this.el.dataset.onValueChange) {
          this.pushEvent(this.el.dataset.onValueChange, details);
        }
      },
    };
  }
};

export default makeHook(Accordion);
