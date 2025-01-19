import * as progress from "@zag-js/progress";
import { normalizeProps, spreadProps, renderPart } from "./util";
import { Component } from "./component";
import { Hook, makeHook } from "./hook";
import type { Machine } from "@zag-js/core";
import type { Part } from "./component";

class ProgressComponent extends Component<progress.Context, progress.Api> {
  initService(context: progress.Context): Machine<any, any, any> {
    return progress.machine(context);
  }

  initApi() {
    return progress.connect(this.service.state, this.service.send, normalizeProps);
  }

  render() {
    const parts: Part[] = [
      { name: "root", id: `progress-${this.el.id}` },
      { name: "track", id: `progress-${this.el.id}-track` }
    ]

    for (const part of parts) renderPart(this.el, part, this.api);

    this.renderRange();
  }

  renderRange() {
    const track = this.el.querySelector<HTMLElement>(`[id='progress-${this.el.id}-track']`);
    if (!track) return;

    const range = track.querySelector<HTMLElement>(`[data-part='range']`);

    if (!range) return;

    spreadProps(range, this.api.getRangeProps());
  }
}

class Progress extends Hook {
  component: ProgressComponent;

  mounted() {
    this.component = new ProgressComponent(this.el, this.context());
    this.component.init();
  }

  updated() {
    this.component.api.setValue(this.el.dataset.value)
    this.component.render();
  }

  beforeDestroy() {
    this.component.destroy();
  }

  context(): progress.Context {
    return {
      id: this.el.id,
      value: Number(this.el.dataset.value) || 0,
      min: Number(this.el.dataset.min) || 0,
      max: Number(this.el.dataset.max) || 100,
    }
  }
};

export default makeHook(Progress);
