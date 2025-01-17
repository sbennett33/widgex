import { createNormalizer } from "@zag-js/types";
import type { Part } from "./component";

type Attribute = {
  name: string;
  value: string;
};

type AttributeCache = {
  part: Part;
  cssText: string;
  hasFocus: boolean;
  attrs: Attribute[];
};

const propMap: Record<string, any> = {
  onFocus: "onFocusin",
  onBlur: "onFocusout",
  onChange: "onInput",
  onDoubleClick: "onDblclick",
  htmlFor: "for",
  className: "class",
  defaultValue: "value",
  defaultChecked: "checked",
};

const prevAttrsMap = new WeakMap<HTMLElement, Record<string, any>>();

const toStyleString = (style: any) => {
  return Object.entries(style).reduce((styleString, [key, value]) => {
    if (value === null || value === undefined) return styleString;
    const formattedKey = key.startsWith("--") ? key : key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

    return `${styleString}${formattedKey}:${value};`;
  }, "");
};

export const normalizeProps = createNormalizer((props: any) => {
  return Object.entries(props).reduce<any>((acc, [key, value]) => {
    if (value === undefined) return acc;
    key = propMap[key] || key;

    if (key === "style" && typeof value === "object") {
      acc.style = toStyleString(value);
    } else {
      acc[key.toLowerCase()] = value;
    }

    return acc;
  }, {});
});

export const spreadProps = (node: HTMLElement, attrs: Record<string, any>) => {
  const oldAttrs = prevAttrsMap.get(node) || {};
  const attrKeys = Object.keys(attrs);

  const addEvent = (event: string, callback: EventListener) => {
    node.addEventListener(event.toLowerCase(), callback);
  };

  const removeEvent = (event: string, callback: EventListener) => {
    node.removeEventListener(event.toLowerCase(), callback);
  };

  const onEvents = (attr: string) => attr.startsWith("on");
  const others = (attr: string) => !attr.startsWith("on");

  const setup = (attr: string) => addEvent(attr.substring(2), attrs[attr]);
  const teardown = (attr: string) => removeEvent(attr.substring(2), attrs[attr]);

  const apply = (attrName: string) => {
    let value = attrs[attrName];

    const oldValue = oldAttrs[attrName];
    if (value === oldValue) return;

    if (typeof value === "boolean") {
      value = value || undefined;
    }

    if (value != null) {
      if (["value", "checked", "htmlFor"].includes(attrName)) {
        (node as any)[attrName] = value;
      } else {
        node.setAttribute(attrName.toLowerCase(), value);
      }
      return;
    }

    node.removeAttribute(attrName.toLowerCase());
  };

  for (const key in oldAttrs) {
    if (attrs[key] == null) {
      node.removeAttribute(key.toLowerCase());
    }
  }

  const oldEvents = Object.keys(oldAttrs).filter(onEvents);
  for (const oldEvent of oldEvents) removeEvent(oldEvent.substring(2), oldAttrs[oldEvent]);

  attrKeys.filter(onEvents).forEach(setup);
  attrKeys.filter(others).forEach(apply);

  prevAttrsMap.set(node, attrs);

  return function cleanup() {
    attrKeys.filter(onEvents).forEach(teardown);
  };
};

export const renderPart = (root: HTMLElement, part: Part, api: any) => {
  const camelizedName = part.name.replace(/(^|-)([a-z])/g, (_match, _prefix, letter) => letter.toUpperCase());

  const node = root.querySelector<HTMLElement>(`[id='${part.id}']`);
  const getterName = `get${camelizedName}Props`;

  if (node) spreadProps(node, api[getterName]());
};

export const getOption = (el: HTMLElement, name: string, validOptions: string[]) => {
  const kebabName = name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  let initial: string | undefined = el.dataset[kebabName];

  if (validOptions && initial !== undefined && !validOptions.includes(initial as any)) {
    console.error(`Invalid '${name}' specified: '${initial}'. Expected one of '${validOptions.join("', '")}'.`);
    initial = undefined;
  }

  return initial;
};

export const getBooleanOption = (el: HTMLElement, name: string) => {
  const kebabName = name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  return el.dataset[kebabName] === "true" || el.dataset[kebabName] === "";
};

export const getAttributes = (root: HTMLElement, part: Part) => {
  const node = root.querySelector<HTMLElement>(`[id='${part.id}']`);
  if (!node) return;

  const attrs = [];
  for (const attr of node.attributes) {
    attrs.push({ name: attr.name, value: attr.value });
  }

  return {
    part: part,
    cssText: node.style.cssText,
    hasFocus: node === document.activeElement,
    attrs,
  };
};

export const restoreAttributes = (root: HTMLElement, attributeMaps: AttributeCache[]) => {
  for (const attributeMap of attributeMaps) {
    if (!attributeMap) return;

    const node = root.querySelector<HTMLElement>(`[id='${attributeMap.part.id}']`);
    if (!node) return;

    for (const attr of attributeMap.attrs) {
      node.setAttribute(attr.name, attr.value);
    }
    node.style.cssText = attributeMap.cssText;
    if (attributeMap.hasFocus) node.focus();
  }
};
