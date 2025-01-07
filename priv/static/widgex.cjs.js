var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// js/widgex/index.ts
var widgex_exports = {};
__export(widgex_exports, {
  Accordion: () => accordion_default,
  Collapsible: () => collapsible_default,
  Dialog: () => dialog_default,
  Hooks: () => Hooks,
  Menu: () => menu_default,
  Tabs: () => tabs_default
});
module.exports = __toCommonJS(widgex_exports);

// node_modules/@zag-js/anatomy/dist/index.mjs
var createAnatomy = (name, parts6 = []) => ({
  parts: (...values) => {
    if (isEmpty(parts6)) {
      return createAnatomy(name, values);
    }
    throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
  },
  extendWith: (...values) => createAnatomy(name, [...parts6, ...values]),
  rename: (newName) => createAnatomy(newName, parts6),
  keys: () => parts6,
  build: () => [...new Set(parts6)].reduce(
    (prev, part) => Object.assign(prev, {
      [part]: {
        selector: [
          `&[data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`,
          `& [data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`
        ].join(", "),
        attrs: { "data-scope": toKebabCase(name), "data-part": toKebabCase(part) }
      }
    }),
    {}
  )
});
var toKebabCase = (value) => value.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
var isEmpty = (v) => v.length === 0;

// node_modules/@zag-js/dom-query/dist/index.mjs
var dataAttr = (guard) => guard ? "" : void 0;
var DOCUMENT_NODE = 9;
var isObject = (v) => typeof v === "object" && v !== null;
var isDocument = (el) => isObject(el) && el.nodeType === DOCUMENT_NODE;
var isWindow = (el) => isObject(el) && el === el.window;
function getDocument(el) {
  if (isDocument(el))
    return el;
  if (isWindow(el))
    return el.document;
  return el?.ownerDocument ?? document;
}
function getActiveElement(rootNode) {
  let activeElement = rootNode.activeElement;
  while (activeElement?.shadowRoot) {
    const el = activeElement.shadowRoot.activeElement;
    if (el === activeElement)
      break;
    else
      activeElement = el;
  }
  return activeElement;
}
var isDom = () => typeof document !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
var pt = (v) => isDom() && v.test(getPlatform());
var vn = (v) => isDom() && v.test(navigator.vendor);
var isSafari = () => isApple() && vn(/apple/i);
var isApple = () => pt(/mac|iphone|ipad|ipod/i);
var defaultItemToId = (v) => v.id;
function itemById(v, id, itemToId = defaultItemToId) {
  return v.find((item) => itemToId(item) === id);
}
function indexOfId(v, id, itemToId = defaultItemToId) {
  const item = itemById(v, id, itemToId);
  return item ? v.indexOf(item) : -1;
}
function nextById(v, id, loop = true) {
  let idx = indexOfId(v, id);
  idx = loop ? (idx + 1) % v.length : Math.min(idx + 1, v.length - 1);
  return v[idx];
}
function prevById(v, id, loop = true) {
  let idx = indexOfId(v, id);
  if (idx === -1)
    return loop ? v[v.length - 1] : null;
  idx = loop ? (idx - 1 + v.length) % v.length : Math.max(0, idx - 1);
  return v[idx];
}
function queryAll(root, selector) {
  return Array.from(root?.querySelectorAll(selector) ?? []);
}
function createScope(methods) {
  const dom6 = {
    getRootNode: (ctx) => ctx.getRootNode?.() ?? document,
    getDoc: (ctx) => getDocument(dom6.getRootNode(ctx)),
    getWin: (ctx) => dom6.getDoc(ctx).defaultView ?? window,
    getActiveElement: (ctx) => getActiveElement(dom6.getRootNode(ctx)),
    isActiveElement: (ctx, elem) => elem === dom6.getActiveElement(ctx),
    getById: (ctx, id) => dom6.getRootNode(ctx).getElementById(id),
    setValue: (elem, value) => {
      if (elem == null || value == null)
        return;
      const valueAsString = value.toString();
      if (elem.value === valueAsString)
        return;
      elem.value = value.toString();
    }
  };
  return { ...dom6, ...methods };
}
var fps = 1e3 / 60;

// node_modules/@zag-js/dom-event/dist/index.mjs
var keyMap = {
  Up: "ArrowUp",
  Down: "ArrowDown",
  Esc: "Escape",
  " ": "Space",
  ",": "Comma",
  Left: "ArrowLeft",
  Right: "ArrowRight"
};
var rtlKeyMap = {
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft"
};
function getEventKey(event, options = {}) {
  const { dir = "ltr", orientation = "horizontal" } = options;
  let { key } = event;
  key = keyMap[key] ?? key;
  const isRtl = dir === "rtl" && orientation === "horizontal";
  if (isRtl && key in rtlKeyMap) {
    key = rtlKeyMap[key];
  }
  return key;
}

// node_modules/@zag-js/utils/dist/index.mjs
var first = (v) => v[0];
var last = (v) => v[v.length - 1];
var add = (v, ...items) => v.concat(items);
var remove = (v, ...items) => v.filter((t) => !items.includes(t));
function clear(v) {
  while (v.length > 0)
    v.pop();
  return v;
}
var isArrayLike = (value) => value?.constructor.name === "Array";
var isArrayEqual = (a, b) => {
  if (a.length !== b.length)
    return false;
  for (let i = 0; i < a.length; i++) {
    if (!isEqual(a[i], b[i]))
      return false;
  }
  return true;
};
var isEqual = (a, b) => {
  if (Object.is(a, b))
    return true;
  if (a == null && b != null || a != null && b == null)
    return false;
  if (typeof a?.isEqual === "function" && typeof b?.isEqual === "function") {
    return a.isEqual(b);
  }
  if (typeof a === "function" && typeof b === "function") {
    return a.toString() === b.toString();
  }
  if (isArrayLike(a) && isArrayLike(b)) {
    return isArrayEqual(Array.from(a), Array.from(b));
  }
  if (!(typeof a === "object") || !(typeof b === "object"))
    return false;
  const keys = Object.keys(b ?? /* @__PURE__ */ Object.create(null));
  const length = keys.length;
  for (let i = 0; i < length; i++) {
    const hasKey = Reflect.has(a, keys[i]);
    if (!hasKey)
      return false;
  }
  for (let i = 0; i < length; i++) {
    const key = keys[i];
    if (!isEqual(a[key], b[key]))
      return false;
  }
  return true;
};
var runIfFn = (v, ...a) => {
  const res = typeof v === "function" ? v(...a) : v;
  return res ?? void 0;
};
var cast = (v) => v;
var noop = () => {
};
var uuid = /* @__PURE__ */ (() => {
  let id = 0;
  return () => {
    id++;
    return id.toString(36);
  };
})();
var isDev = () => true;
var isArray = (v) => Array.isArray(v);
var isObjectLike = (v) => v != null && typeof v === "object";
var isObject2 = (v) => isObjectLike(v) && !isArray(v);
var isNumber = (v) => typeof v === "number" && !Number.isNaN(v);
var isString = (v) => typeof v === "string";
var isFunction = (v) => typeof v === "function";
var hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
var baseGetTag = (v) => Object.prototype.toString.call(v);
var fnToString = Function.prototype.toString;
var objectCtorString = fnToString.call(Object);
var isPlainObject = (v) => {
  if (!isObjectLike(v) || baseGetTag(v) != "[object Object]")
    return false;
  const proto = Object.getPrototypeOf(v);
  if (proto === null)
    return true;
  const Ctor = hasProp(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && fnToString.call(Ctor) == objectCtorString;
};
function splitProps(props6, keys) {
  const rest = {};
  const result = {};
  const keySet = new Set(keys);
  for (const key in props6) {
    if (keySet.has(key)) {
      result[key] = props6[key];
    } else {
      rest[key] = props6[key];
    }
  }
  return [result, rest];
}
var createSplitProps = (keys) => {
  return function split(props6) {
    return splitProps(props6, keys);
  };
};
function compact(obj) {
  if (!isPlainObject2(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact(value);
    }
  }
  return filtered;
}
var isPlainObject2 = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};
function warn(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && true) {
    console.warn(m);
  }
}
function invariant(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && true) {
    throw new Error(m);
  }
}

// node_modules/proxy-compare/dist/index.js
var TRACK_MEMO_SYMBOL = Symbol();
var GET_ORIGINAL_SYMBOL = Symbol();
var getProto = Object.getPrototypeOf;
var objectsToTrack = /* @__PURE__ */ new WeakMap();
var isObjectToTrack = (obj) => obj && (objectsToTrack.has(obj) ? objectsToTrack.get(obj) : getProto(obj) === Object.prototype || getProto(obj) === Array.prototype);
var getUntracked = (obj) => {
  if (isObjectToTrack(obj)) {
    return obj[GET_ORIGINAL_SYMBOL] || null;
  }
  return null;
};
var markToTrack = (obj, mark = true) => {
  objectsToTrack.set(obj, mark);
};

// node_modules/@zag-js/store/dist/index.mjs
function glob() {
  if (typeof globalThis !== "undefined")
    return globalThis;
  if (typeof self !== "undefined")
    return self;
  if (typeof window !== "undefined")
    return window;
  if (typeof global !== "undefined")
    return global;
}
function globalRef(key, value) {
  const g = glob();
  if (!g)
    return value();
  g[key] || (g[key] = value());
  return g[key];
}
var refSet = globalRef("__zag__refSet", () => /* @__PURE__ */ new WeakSet());
var isReactElement = (x) => typeof x === "object" && x !== null && "$$typeof" in x && "props" in x;
var isVueElement = (x) => typeof x === "object" && x !== null && "__v_isVNode" in x;
var isDOMElement = (x) => typeof x === "object" && x !== null && "nodeType" in x && typeof x.nodeName === "string";
var isElement = (x) => isReactElement(x) || isVueElement(x) || isDOMElement(x);
var isObject3 = (x) => x !== null && typeof x === "object";
var canProxy = (x) => isObject3(x) && !refSet.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !isElement(x) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer) && !(x instanceof Promise);
var isDev2 = () => true;
function set(obj, key, val) {
  if (typeof val.value === "object" && !canProxy(val.value))
    val.value = clone(val.value);
  if (!val.enumerable || val.get || val.set || !val.configurable || !val.writable || key === "__proto__") {
    Object.defineProperty(obj, key, val);
  } else
    obj[key] = val.value;
}
function clone(x) {
  if (typeof x !== "object")
    return x;
  var i = 0, k, list, tmp, str = Object.prototype.toString.call(x);
  if (str === "[object Object]") {
    tmp = Object.create(Object.getPrototypeOf(x) || null);
  } else if (str === "[object Array]") {
    tmp = Array(x.length);
  } else if (str === "[object Set]") {
    tmp = /* @__PURE__ */ new Set();
    x.forEach(function(val) {
      tmp.add(clone(val));
    });
  } else if (str === "[object Map]") {
    tmp = /* @__PURE__ */ new Map();
    x.forEach(function(val, key) {
      tmp.set(clone(key), clone(val));
    });
  } else if (str === "[object Date]") {
    tmp = /* @__PURE__ */ new Date(+x);
  } else if (str === "[object RegExp]") {
    tmp = new RegExp(x.source, x.flags);
  } else if (str === "[object DataView]") {
    tmp = new x.constructor(clone(x.buffer));
  } else if (str === "[object ArrayBuffer]") {
    tmp = x.slice(0);
  } else if (str === "[object Blob]") {
    tmp = x.slice();
  } else if (str.slice(-6) === "Array]") {
    tmp = new x.constructor(x);
  }
  if (tmp) {
    for (list = Object.getOwnPropertySymbols(x); i < list.length; i++) {
      set(tmp, list[i], Object.getOwnPropertyDescriptor(x, list[i]));
    }
    for (i = 0, list = Object.getOwnPropertyNames(x); i < list.length; i++) {
      if (Object.hasOwnProperty.call(tmp, k = list[i]) && tmp[k] === x[k])
        continue;
      set(tmp, k, Object.getOwnPropertyDescriptor(x, k));
    }
  }
  return tmp || x;
}
var proxyStateMap = globalRef("__zag__proxyStateMap", () => /* @__PURE__ */ new WeakMap());
var buildProxyFunction = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version) => {
  const cache = snapCache.get(target);
  if (cache?.[0] === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  markToTrack(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    const value = Reflect.get(target, key);
    if (refSet.has(value)) {
      markToTrack(value, false);
      snap[key] = value;
    } else if (proxyStateMap.has(value)) {
      snap[key] = snapshot(value);
    } else {
      snap[key] = value;
    }
  });
  return Object.freeze(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction22 = (initialObject) => {
  if (!isObject3(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if (isDev2() && propProxyStates.has(prop)) {
      throw new Error("prop listener already exists");
    }
    if (listeners.size) {
      const remove2 = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove2]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      entry[1]?.();
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if (isDev2() && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove2 = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove2]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove2], prop) => {
          if (remove2) {
            remove2();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject3(value)) {
        value = getUntracked(value) || value;
      }
      let nextValue = value;
      if (Object.getOwnPropertyDescriptor(target, prop)?.set)
        ;
      else {
        if (!proxyStateMap.has(value) && canProxy(value)) {
          nextValue = proxy(value);
        }
        const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [baseObject, ensureVersion, createSnapshot, addListener];
  proxyStateMap.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(initialObject, key);
    if (desc.get || desc.set) {
      Object.defineProperty(baseObject, key, desc);
    } else {
      proxyObject[key] = initialObject[key];
    }
  });
  return proxyObject;
}) => [
  // public functions
  proxyFunction22,
  // shared state
  proxyStateMap,
  refSet,
  // internal things
  objectIs,
  newProxy,
  canProxy,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
var [proxyFunction] = buildProxyFunction();
function proxy(initialObject = {}) {
  return proxyFunction(initialObject);
}
function subscribe(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap.get(proxyObject);
  if (isDev2() && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot(proxyObject) {
  const proxyState = proxyStateMap.get(proxyObject);
  if (isDev2() && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion());
}
function ref(obj) {
  refSet.add(obj);
  return obj;
}
function proxyWithComputed(initialObject, computedFns) {
  const keys = Object.keys(computedFns);
  keys.forEach((key) => {
    if (Object.getOwnPropertyDescriptor(initialObject, key)) {
      throw new Error("object property already defined");
    }
    const computedFn = computedFns[key];
    const { get, set: set22 } = typeof computedFn === "function" ? { get: computedFn } : computedFn;
    const desc = {};
    desc.get = () => get(snapshot(proxyObject));
    if (set22) {
      desc.set = (newValue) => set22(proxyObject, newValue);
    }
    Object.defineProperty(initialObject, key, desc);
  });
  const proxyObject = proxy(initialObject);
  return proxyObject;
}

// node_modules/@zag-js/core/dist/index.mjs
var __defProp2 = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
function deepMerge(source, ...objects) {
  for (const obj of objects) {
    const target = compact(obj);
    for (const key in target) {
      if (isPlainObject(obj[key])) {
        if (!source[key]) {
          source[key] = {};
        }
        deepMerge(source[key], obj[key]);
      } else {
        source[key] = obj[key];
      }
    }
  }
  return source;
}
function toEvent(event) {
  const obj = isString(event) ? { type: event } : event;
  return obj;
}
function toArray(value) {
  if (!value)
    return [];
  return isArray(value) ? value.slice() : [value];
}
function isGuardHelper(value) {
  return isObject2(value) && value.predicate != null;
}
var Truthy = () => true;
function exec(guardMap, ctx, event, meta) {
  return (guard) => {
    if (isString(guard)) {
      return !!guardMap[guard]?.(ctx, event, meta);
    }
    if (isFunction(guard)) {
      return guard(ctx, event, meta);
    }
    return guard.predicate(guardMap)(ctx, event, meta);
  };
}
function or(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).some(Boolean)
  };
}
function and(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).every(Boolean)
  };
}
function not(condition) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => {
      return !exec(guardMap, ctx, event, meta)(condition);
    }
  };
}
function stateIn(...values) {
  return (_ctx, _evt, meta) => meta.state.matches(...values);
}
var guards = { or, and, not, stateIn };
function determineGuardFn(guard, guardMap) {
  guard = guard ?? Truthy;
  return (context, event, meta) => {
    if (isString(guard)) {
      const value = guardMap[guard];
      return isFunction(value) ? value(context, event, meta) : value;
    }
    if (isGuardHelper(guard)) {
      return guard.predicate(guardMap)(context, event, meta);
    }
    return guard?.(context, event, meta);
  };
}
function determineActionsFn(values, guardMap) {
  return (context, event, meta) => {
    if (isGuardHelper(values)) {
      return values.predicate(guardMap)(context, event, meta);
    }
    return values;
  };
}
function createProxy(config) {
  const computedContext = config.computed ?? cast({});
  const initialContext = config.context ?? cast({});
  const initialTags = config.initial ? config.states?.[config.initial]?.tags : [];
  const state = proxy({
    value: config.initial ?? "",
    previousValue: "",
    event: cast({}),
    previousEvent: cast({}),
    context: proxyWithComputed(initialContext, computedContext),
    done: false,
    tags: initialTags ?? [],
    hasTag(tag) {
      return this.tags.includes(tag);
    },
    matches(...value) {
      return value.includes(this.value);
    },
    can(event) {
      return cast(this).nextEvents.includes(event);
    },
    get nextEvents() {
      const stateEvents = config.states?.[this.value]?.["on"] ?? {};
      const globalEvents = config?.on ?? {};
      return Object.keys({ ...stateEvents, ...globalEvents });
    },
    get changed() {
      if (this.event.value === "machine.init" || !this.previousValue)
        return false;
      return this.value !== this.previousValue;
    }
  });
  return cast(state);
}
function determineDelayFn(delay2, delaysMap) {
  return (context, event) => {
    if (isNumber(delay2))
      return delay2;
    if (isFunction(delay2)) {
      return delay2(context, event);
    }
    if (isString(delay2)) {
      const value = Number.parseFloat(delay2);
      if (!Number.isNaN(value)) {
        return value;
      }
      if (delaysMap) {
        const valueOrFn = delaysMap?.[delay2];
        invariant(
          valueOrFn == null,
          `[@zag-js/core > determine-delay] Cannot determine delay for \`${delay2}\`. It doesn't exist in \`options.delays\``
        );
        return isFunction(valueOrFn) ? valueOrFn(context, event) : valueOrFn;
      }
    }
  };
}
function toTarget(target) {
  return isString(target) ? { target } : target;
}
function determineTransitionFn(transitions, guardMap) {
  return (context, event, meta) => {
    return toArray(transitions).map(toTarget).find((transition) => {
      const determineGuard = determineGuardFn(transition.guard, guardMap);
      const guard = determineGuard(context, event, meta);
      return guard ?? transition.target ?? transition.actions;
    });
  };
}
var Machine = class {
  // Let's get started!
  constructor(config, options) {
    __publicField(
      this,
      "status",
      "Not Started"
      /* NotStarted */
    );
    __publicField(this, "state");
    __publicField(this, "initialState");
    __publicField(this, "initialContext");
    __publicField(this, "id");
    __publicField(
      this,
      "type",
      "machine"
      /* Machine */
    );
    __publicField(this, "activityEvents", /* @__PURE__ */ new Map());
    __publicField(this, "delayedEvents", /* @__PURE__ */ new Map());
    __publicField(this, "stateListeners", /* @__PURE__ */ new Set());
    __publicField(this, "doneListeners", /* @__PURE__ */ new Set());
    __publicField(this, "contextWatchers", /* @__PURE__ */ new Set());
    __publicField(this, "removeStateListener", noop);
    __publicField(this, "parent");
    __publicField(this, "children", /* @__PURE__ */ new Map());
    __publicField(this, "guardMap");
    __publicField(this, "actionMap");
    __publicField(this, "delayMap");
    __publicField(this, "activityMap");
    __publicField(this, "sync");
    __publicField(this, "options");
    __publicField(this, "config");
    __publicField(this, "_created", () => {
      if (!this.config.created)
        return;
      const event = toEvent(
        "machine.created"
        /* Created */
      );
      this.executeActions(this.config.created, event);
    });
    __publicField(this, "start", (init) => {
      this.state.value = "";
      this.state.tags = [];
      if (this.status === "Running") {
        return this;
      }
      this.status = "Running";
      this.removeStateListener = subscribe(
        this.state,
        () => {
          this.stateListeners.forEach((listener) => {
            listener(this.stateSnapshot);
          });
        },
        this.sync
      );
      this.setupContextWatchers();
      this.executeActivities(
        toEvent(
          "machine.start"
          /* Start */
        ),
        toArray(this.config.activities),
        "machine.start"
        /* Start */
      );
      this.executeActions(this.config.entry, toEvent(
        "machine.start"
        /* Start */
      ));
      const event = toEvent(
        "machine.init"
        /* Init */
      );
      const target = isObject2(init) ? init.value : init;
      const context = isObject2(init) ? init.context : void 0;
      if (context) {
        this.setContext(context);
      }
      const transition = {
        target: target ?? this.config.initial
      };
      const next = this.getNextStateInfo(transition, event);
      this.initialState = next;
      this.performStateChangeEffects(this.state.value, next, event);
      return this;
    });
    __publicField(this, "setupContextWatchers", () => {
      const { watch } = this.config;
      if (!watch)
        return;
      let prev = snapshot(this.state.context);
      const cleanup = subscribe(this.state.context, () => {
        const next = snapshot(this.state.context);
        for (const [key, fn] of Object.entries(watch)) {
          const isEqual4 = this.options.compareFns?.[key] ?? Object.is;
          if (isEqual4(prev[key], next[key]))
            continue;
          this.executeActions(fn, this.state.event);
        }
        prev = next;
      });
      this.contextWatchers.add(cleanup);
    });
    __publicField(this, "stop", () => {
      if (this.status === "Stopped")
        return;
      this.performExitEffects(this.state.value, toEvent(
        "machine.stop"
        /* Stop */
      ));
      this.executeActions(this.config.exit, toEvent(
        "machine.stop"
        /* Stop */
      ));
      this.setState("");
      this.setEvent(
        "machine.stop"
        /* Stop */
      );
      this.stopStateListeners();
      this.stopChildren();
      this.stopActivities();
      this.stopDelayedEvents();
      this.stopContextWatchers();
      this.status = "Stopped";
      return this;
    });
    __publicField(this, "stopStateListeners", () => {
      this.removeStateListener();
      this.stateListeners.clear();
    });
    __publicField(this, "stopContextWatchers", () => {
      this.contextWatchers.forEach((fn) => fn());
      this.contextWatchers.clear();
    });
    __publicField(this, "stopDelayedEvents", () => {
      this.delayedEvents.forEach((state) => {
        state.forEach((stop) => stop());
      });
      this.delayedEvents.clear();
    });
    __publicField(this, "stopActivities", (state) => {
      if (state) {
        this.activityEvents.get(state)?.forEach((stop) => stop());
        this.activityEvents.get(state)?.clear();
        this.activityEvents.delete(state);
      } else {
        this.activityEvents.forEach((state2) => {
          state2.forEach((stop) => stop());
          state2.clear();
        });
        this.activityEvents.clear();
      }
    });
    __publicField(this, "sendChild", (evt, to) => {
      const event = toEvent(evt);
      const id = runIfFn(to, this.contextSnapshot);
      const child = this.children.get(id);
      if (!child) {
        invariant(`[@zag-js/core] Cannot send '${event.type}' event to unknown child`);
      }
      child.send(event);
    });
    __publicField(this, "stopChild", (id) => {
      if (!this.children.has(id)) {
        invariant(`[@zag-js/core > stop-child] Cannot stop unknown child ${id}`);
      }
      this.children.get(id).stop();
      this.children.delete(id);
    });
    __publicField(this, "removeChild", (id) => {
      this.children.delete(id);
    });
    __publicField(this, "stopChildren", () => {
      this.children.forEach((child) => child.stop());
      this.children.clear();
    });
    __publicField(this, "setParent", (parent) => {
      this.parent = parent;
    });
    __publicField(this, "spawn", (src, id) => {
      const actor = runIfFn(src);
      if (id)
        actor.id = id;
      actor.type = "machine.actor";
      actor.setParent(this);
      this.children.set(actor.id, cast(actor));
      actor.onDone(() => {
        this.removeChild(actor.id);
      }).start();
      return cast(ref(actor));
    });
    __publicField(this, "stopActivity", (key) => {
      if (!this.state.value)
        return;
      const cleanups3 = this.activityEvents.get(this.state.value);
      cleanups3?.get(key)?.();
      cleanups3?.delete(key);
    });
    __publicField(this, "addActivityCleanup", (state, key, cleanup) => {
      if (!state)
        return;
      if (!this.activityEvents.has(state)) {
        this.activityEvents.set(state, /* @__PURE__ */ new Map([[key, cleanup]]));
      } else {
        this.activityEvents.get(state)?.set(key, cleanup);
      }
    });
    __publicField(this, "setState", (target) => {
      this.state.previousValue = this.state.value;
      this.state.value = target;
      const stateNode = this.getStateNode(target);
      if (target == null) {
        clear(this.state.tags);
      } else {
        this.state.tags = toArray(stateNode?.tags);
      }
    });
    __publicField(this, "setContext", (context) => {
      if (!context)
        return;
      deepMerge(this.state.context, compact(context));
    });
    __publicField(this, "setOptions", (options2) => {
      const opts = compact(options2);
      this.actionMap = { ...this.actionMap, ...opts.actions };
      this.delayMap = { ...this.delayMap, ...opts.delays };
      this.activityMap = { ...this.activityMap, ...opts.activities };
      this.guardMap = { ...this.guardMap, ...opts.guards };
    });
    __publicField(this, "getStateNode", (state) => {
      if (!state)
        return;
      return this.config.states?.[state];
    });
    __publicField(this, "getNextStateInfo", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      const isTargetless = !transition?.target;
      const target = transition?.target ?? this.state.value;
      const changed = this.state.value !== target;
      const stateNode = this.getStateNode(target);
      const reenter = !isTargetless && !changed && !transition?.internal;
      const info = {
        reenter,
        transition,
        stateNode,
        target,
        changed
      };
      this.log("NextState:", `[${event.type}]`, this.state.value, "---->", info.target);
      return info;
    });
    __publicField(this, "getAfterActions", (transition, delay2) => {
      let id;
      const current = this.state.value;
      return {
        entry: () => {
          id = globalThis.setTimeout(() => {
            const next = this.getNextStateInfo(transition, this.state.event);
            this.performStateChangeEffects(current, next, this.state.event);
          }, delay2);
        },
        exit: () => {
          globalThis.clearTimeout(id);
        }
      };
    });
    __publicField(this, "getDelayedEventActions", (state) => {
      const stateNode = this.getStateNode(state);
      const event = this.state.event;
      if (!stateNode || !stateNode.after)
        return;
      const entries = [];
      const exits = [];
      if (isArray(stateNode.after)) {
        const transition = this.determineTransition(stateNode.after, event);
        if (!transition)
          return;
        if (!hasProp(transition, "delay")) {
          throw new Error(`[@zag-js/core > after] Delay is required for after transition: ${JSON.stringify(transition)}`);
        }
        const determineDelay = determineDelayFn(transition.delay, this.delayMap);
        const __delay = determineDelay(this.contextSnapshot, event);
        const actions = this.getAfterActions(transition, __delay);
        entries.push(actions.entry);
        exits.push(actions.exit);
        return { entries, exits };
      }
      if (isObject2(stateNode.after)) {
        for (const delay2 in stateNode.after) {
          const transition = stateNode.after[delay2];
          const determineDelay = determineDelayFn(delay2, this.delayMap);
          const __delay = determineDelay(this.contextSnapshot, event);
          const actions = this.getAfterActions(transition, __delay);
          entries.push(actions.entry);
          exits.push(actions.exit);
        }
      }
      return { entries, exits };
    });
    __publicField(this, "executeActions", (actions, event) => {
      const pickedActions = determineActionsFn(actions, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      for (const action of toArray(pickedActions)) {
        const fn = isString(action) ? this.actionMap?.[action] : action;
        warn(
          isString(action) && !fn,
          `[@zag-js/core > execute-actions] No implementation found for action: \`${action}\``
        );
        fn?.(this.state.context, event, this.meta);
      }
    });
    __publicField(this, "executeActivities", (event, activities, state) => {
      for (const activity of activities) {
        const fn = isString(activity) ? this.activityMap?.[activity] : activity;
        if (!fn) {
          warn(`[@zag-js/core > execute-activity] No implementation found for activity: \`${activity}\``);
          continue;
        }
        const cleanup = fn(this.state.context, event, this.meta);
        if (cleanup) {
          const key = isString(activity) ? activity : activity.name || uuid();
          this.addActivityCleanup(state ?? this.state.value, key, cleanup);
        }
      }
    });
    __publicField(this, "createEveryActivities", (every, callbackfn) => {
      if (!every)
        return;
      if (isArray(every)) {
        const picked = toArray(every).find((transition) => {
          const delayOrFn = transition.delay;
          const determineDelay2 = determineDelayFn(delayOrFn, this.delayMap);
          const delay22 = determineDelay2(this.contextSnapshot, this.state.event);
          const determineGuard = determineGuardFn(transition.guard, this.guardMap);
          const guard = determineGuard(this.contextSnapshot, this.state.event, this.guardMeta);
          return guard ?? delay22 != null;
        });
        if (!picked)
          return;
        const determineDelay = determineDelayFn(picked.delay, this.delayMap);
        const delay2 = determineDelay(this.contextSnapshot, this.state.event);
        const activity = () => {
          const id = globalThis.setInterval(() => {
            this.executeActions(picked.actions, this.state.event);
          }, delay2);
          return () => {
            globalThis.clearInterval(id);
          };
        };
        callbackfn(activity);
      } else {
        for (const interval in every) {
          const actions = every?.[interval];
          const determineDelay = determineDelayFn(interval, this.delayMap);
          const delay2 = determineDelay(this.contextSnapshot, this.state.event);
          const activity = () => {
            const id = globalThis.setInterval(() => {
              this.executeActions(actions, this.state.event);
            }, delay2);
            return () => {
              globalThis.clearInterval(id);
            };
          };
          callbackfn(activity);
        }
      }
    });
    __publicField(this, "setEvent", (event) => {
      this.state.previousEvent = this.state.event;
      this.state.event = ref(toEvent(event));
    });
    __publicField(this, "performExitEffects", (current, event) => {
      const currentState = this.state.value;
      if (currentState === "")
        return;
      const stateNode = current ? this.getStateNode(current) : void 0;
      this.stopActivities(currentState);
      const _exit = determineActionsFn(stateNode?.exit, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      const exitActions = toArray(_exit);
      const afterExitActions = this.delayedEvents.get(currentState);
      if (afterExitActions) {
        exitActions.push(...afterExitActions);
      }
      this.executeActions(exitActions, event);
      this.delayedEvents.delete(currentState);
    });
    __publicField(this, "performEntryEffects", (next, event) => {
      const stateNode = this.getStateNode(next);
      const activities = toArray(stateNode?.activities);
      this.createEveryActivities(stateNode?.every, (activity) => {
        activities.unshift(activity);
      });
      if (activities.length > 0) {
        this.executeActivities(event, activities);
      }
      const pickedActions = determineActionsFn(stateNode?.entry, this.guardMap)(
        this.contextSnapshot,
        event,
        this.guardMeta
      );
      const entryActions = toArray(pickedActions);
      const afterActions = this.getDelayedEventActions(next);
      if (stateNode?.after && afterActions) {
        this.delayedEvents.set(next, afterActions?.exits);
        entryActions.push(...afterActions.entries);
      }
      this.executeActions(entryActions, event);
      if (stateNode?.type === "final") {
        this.state.done = true;
        this.doneListeners.forEach((listener) => {
          listener(this.stateSnapshot);
        });
        this.stop();
      }
    });
    __publicField(this, "performTransitionEffects", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      this.executeActions(transition?.actions, event);
    });
    __publicField(this, "performStateChangeEffects", (current, next, event) => {
      this.setEvent(event);
      const changed = next.changed || next.reenter;
      if (changed) {
        this.performExitEffects(current, event);
      }
      this.performTransitionEffects(next.transition, event);
      this.setState(next.target);
      if (changed) {
        this.performEntryEffects(next.target, event);
      }
    });
    __publicField(this, "determineTransition", (transition, event) => {
      const fn = determineTransitionFn(transition, this.guardMap);
      return fn?.(this.contextSnapshot, event, this.guardMeta);
    });
    __publicField(this, "sendParent", (evt) => {
      if (!this.parent) {
        invariant("[@zag-js/core > send-parent] Cannot send event to an unknown parent");
      }
      const event = toEvent(evt);
      this.parent?.send(event);
    });
    __publicField(this, "log", (...args) => {
      if (isDev() && this.options.debug) {
        console.log(...args);
      }
    });
    __publicField(this, "send", (evt) => {
      const event = toEvent(evt);
      this.transition(this.state.value, event);
    });
    __publicField(this, "transition", (state, evt) => {
      const stateNode = isString(state) ? this.getStateNode(state) : state?.stateNode;
      const event = toEvent(evt);
      if (!stateNode && !this.config.on) {
        const msg = this.status === "Stopped" ? "[@zag-js/core > transition] Cannot transition a stopped machine" : `[@zag-js/core > transition] State does not have a definition for \`state\`: ${state}, \`event\`: ${event.type}`;
        warn(msg);
        return;
      }
      const transitions = (
        // @ts-expect-error - Fix this
        stateNode?.on?.[event.type] ?? this.config.on?.[event.type]
      );
      const next = this.getNextStateInfo(transitions, event);
      this.performStateChangeEffects(this.state.value, next, event);
      return next.stateNode;
    });
    __publicField(this, "subscribe", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return () => {
        this.stateListeners.delete(listener);
      };
    });
    __publicField(this, "onDone", (listener) => {
      this.doneListeners.add(listener);
      return this;
    });
    __publicField(this, "onTransition", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return this;
    });
    this.config = clone(config);
    this.options = clone(options ?? {});
    this.id = this.config.id ?? `machine-${uuid()}`;
    this.guardMap = this.options?.guards ?? {};
    this.actionMap = this.options?.actions ?? {};
    this.delayMap = this.options?.delays ?? {};
    this.activityMap = this.options?.activities ?? {};
    this.sync = this.options?.sync ?? false;
    this.state = createProxy(this.config);
    this.initialContext = snapshot(this.state.context);
  }
  // immutable state value
  get stateSnapshot() {
    return cast(snapshot(this.state));
  }
  getState() {
    return this.stateSnapshot;
  }
  // immutable context value
  get contextSnapshot() {
    return this.stateSnapshot.context;
  }
  /**
   * A reference to the instance methods of the machine.
   * Useful when spawning child machines and managing the communication between them.
   */
  get self() {
    const self2 = this;
    return {
      id: this.id,
      send: this.send.bind(this),
      sendParent: this.sendParent.bind(this),
      sendChild: this.sendChild.bind(this),
      stop: this.stop.bind(this),
      stopChild: this.stopChild.bind(this),
      spawn: this.spawn.bind(this),
      stopActivity: this.stopActivity.bind(this),
      get state() {
        return self2.stateSnapshot;
      },
      get initialContext() {
        return self2.initialContext;
      },
      get initialState() {
        return self2.initialState?.target ?? "";
      }
    };
  }
  get meta() {
    return {
      state: this.stateSnapshot,
      guards: this.guardMap,
      send: this.send.bind(this),
      self: this.self,
      initialContext: this.initialContext,
      initialState: this.initialState?.target ?? "",
      getState: () => this.stateSnapshot,
      getAction: (key) => this.actionMap[key],
      getGuard: (key) => this.guardMap[key]
    };
  }
  get guardMeta() {
    return {
      state: this.stateSnapshot
    };
  }
  get [Symbol.toStringTag]() {
    return "Machine";
  }
  getHydrationState() {
    const state = this.getState();
    return {
      value: state.value,
      tags: state.tags
    };
  }
};
var createMachine = (config, options) => new Machine(config, options);

// node_modules/@zag-js/types/dist/index.mjs
function createNormalizer(fn) {
  return new Proxy({}, {
    get() {
      return fn;
    }
  });
}
var createProps = () => (props6) => Array.from(new Set(props6));

// node_modules/@zag-js/accordion/dist/index.mjs
var anatomy = createAnatomy("accordion").parts("root", "item", "itemTrigger", "itemContent", "itemIndicator");
var parts = anatomy.build();
var dom = createScope({
  getRootId: (ctx) => ctx.ids?.root ?? `accordion:${ctx.id}`,
  getItemId: (ctx, value) => ctx.ids?.item?.(value) ?? `accordion:${ctx.id}:item:${value}`,
  getItemContentId: (ctx, value) => ctx.ids?.itemContent?.(value) ?? `accordion:${ctx.id}:content:${value}`,
  getItemTriggerId: (ctx, value) => ctx.ids?.itemTrigger?.(value) ?? `accordion:${ctx.id}:trigger:${value}`,
  getRootEl: (ctx) => dom.getById(ctx, dom.getRootId(ctx)),
  getTriggerEls: (ctx) => {
    const ownerId = CSS.escape(dom.getRootId(ctx));
    const selector = `[aria-controls][data-ownedby='${ownerId}']:not([disabled])`;
    return queryAll(dom.getRootEl(ctx), selector);
  },
  getFirstTriggerEl: (ctx) => first(dom.getTriggerEls(ctx)),
  getLastTriggerEl: (ctx) => last(dom.getTriggerEls(ctx)),
  getNextTriggerEl: (ctx, id) => nextById(dom.getTriggerEls(ctx), dom.getItemTriggerId(ctx, id)),
  getPrevTriggerEl: (ctx, id) => prevById(dom.getTriggerEls(ctx), dom.getItemTriggerId(ctx, id))
});
function connect(state, send, normalize) {
  const focusedValue = state.context.focusedValue;
  const value = state.context.value;
  const multiple = state.context.multiple;
  function setValue(value2) {
    let nextValue = value2;
    if (multiple && nextValue.length > 1) {
      nextValue = [nextValue[0]];
    }
    send({ type: "VALUE.SET", value: nextValue });
  }
  function getItemState(props22) {
    return {
      expanded: value.includes(props22.value),
      focused: focusedValue === props22.value,
      disabled: Boolean(props22.disabled ?? state.context.disabled)
    };
  }
  return {
    focusedValue,
    value,
    setValue,
    getItemState,
    getRootProps() {
      return normalize.element({
        ...parts.root.attrs,
        dir: state.context.dir,
        id: dom.getRootId(state.context),
        "data-orientation": state.context.orientation
      });
    },
    getItemProps(props22) {
      const itemState = getItemState(props22);
      return normalize.element({
        ...parts.item.attrs,
        dir: state.context.dir,
        id: dom.getItemId(state.context, props22.value),
        "data-state": itemState.expanded ? "open" : "closed",
        "data-focus": dataAttr(itemState.focused),
        "data-disabled": dataAttr(itemState.disabled),
        "data-orientation": state.context.orientation
      });
    },
    getItemContentProps(props22) {
      const itemState = getItemState(props22);
      return normalize.element({
        ...parts.itemContent.attrs,
        dir: state.context.dir,
        role: "region",
        id: dom.getItemContentId(state.context, props22.value),
        "aria-labelledby": dom.getItemTriggerId(state.context, props22.value),
        hidden: !itemState.expanded,
        "data-state": itemState.expanded ? "open" : "closed",
        "data-disabled": dataAttr(itemState.disabled),
        "data-focus": dataAttr(itemState.focused),
        "data-orientation": state.context.orientation
      });
    },
    getItemIndicatorProps(props22) {
      const itemState = getItemState(props22);
      return normalize.element({
        ...parts.itemIndicator.attrs,
        dir: state.context.dir,
        "aria-hidden": true,
        "data-state": itemState.expanded ? "open" : "closed",
        "data-disabled": dataAttr(itemState.disabled),
        "data-focus": dataAttr(itemState.focused),
        "data-orientation": state.context.orientation
      });
    },
    getItemTriggerProps(props22) {
      const { value: value2 } = props22;
      const itemState = getItemState(props22);
      return normalize.button({
        ...parts.itemTrigger.attrs,
        type: "button",
        dir: state.context.dir,
        id: dom.getItemTriggerId(state.context, value2),
        "aria-controls": dom.getItemContentId(state.context, value2),
        "aria-expanded": itemState.expanded,
        disabled: itemState.disabled,
        "data-orientation": state.context.orientation,
        "aria-disabled": itemState.disabled,
        "data-state": itemState.expanded ? "open" : "closed",
        "data-ownedby": dom.getRootId(state.context),
        onFocus() {
          if (itemState.disabled)
            return;
          send({ type: "TRIGGER.FOCUS", value: value2 });
        },
        onBlur() {
          if (itemState.disabled)
            return;
          send("TRIGGER.BLUR");
        },
        onClick(event) {
          if (itemState.disabled)
            return;
          if (isSafari()) {
            event.currentTarget.focus();
          }
          send({ type: "TRIGGER.CLICK", value: value2 });
        },
        onKeyDown(event) {
          if (event.defaultPrevented)
            return;
          if (itemState.disabled)
            return;
          const keyMap4 = {
            ArrowDown() {
              if (state.context.isHorizontal)
                return;
              send({ type: "GOTO.NEXT", value: value2 });
            },
            ArrowUp() {
              if (state.context.isHorizontal)
                return;
              send({ type: "GOTO.PREV", value: value2 });
            },
            ArrowRight() {
              if (!state.context.isHorizontal)
                return;
              send({ type: "GOTO.NEXT", value: value2 });
            },
            ArrowLeft() {
              if (!state.context.isHorizontal)
                return;
              send({ type: "GOTO.PREV", value: value2 });
            },
            Home() {
              send({ type: "GOTO.FIRST", value: value2 });
            },
            End() {
              send({ type: "GOTO.LAST", value: value2 });
            }
          };
          const key = getEventKey(event, {
            dir: state.context.dir,
            orientation: state.context.orientation
          });
          const exec4 = keyMap4[key];
          if (exec4) {
            exec4(event);
            event.preventDefault();
          }
        }
      });
    }
  };
}
var { and: and2, not: not2 } = guards;
function machine(userContext) {
  const ctx = compact(userContext);
  return createMachine(
    {
      id: "accordion",
      initial: "idle",
      context: {
        focusedValue: null,
        value: [],
        collapsible: false,
        multiple: false,
        orientation: "vertical",
        ...ctx
      },
      watch: {
        value: "coarseValue",
        multiple: "coarseValue"
      },
      created: "coarseValue",
      computed: {
        isHorizontal: (ctx2) => ctx2.orientation === "horizontal"
      },
      on: {
        "VALUE.SET": {
          actions: ["setValue"]
        }
      },
      states: {
        idle: {
          on: {
            "TRIGGER.FOCUS": {
              target: "focused",
              actions: "setFocusedValue"
            }
          }
        },
        focused: {
          on: {
            "GOTO.NEXT": {
              actions: "focusNextTrigger"
            },
            "GOTO.PREV": {
              actions: "focusPrevTrigger"
            },
            "TRIGGER.CLICK": [
              {
                guard: and2("isExpanded", "canToggle"),
                actions: ["collapse"]
              },
              {
                guard: not2("isExpanded"),
                actions: ["expand"]
              }
            ],
            "GOTO.FIRST": {
              actions: "focusFirstTrigger"
            },
            "GOTO.LAST": {
              actions: "focusLastTrigger"
            },
            "TRIGGER.BLUR": {
              target: "idle",
              actions: "clearFocusedValue"
            }
          }
        }
      }
    },
    {
      guards: {
        canToggle: (ctx2) => !!ctx2.collapsible || !!ctx2.multiple,
        isExpanded: (ctx2, evt) => ctx2.value.includes(evt.value)
      },
      actions: {
        collapse(ctx2, evt) {
          const next = ctx2.multiple ? remove(ctx2.value, evt.value) : [];
          set2.value(ctx2, ctx2.multiple ? next : []);
        },
        expand(ctx2, evt) {
          const next = ctx2.multiple ? add(ctx2.value, evt.value) : [evt.value];
          set2.value(ctx2, next);
        },
        focusFirstTrigger(ctx2) {
          dom.getFirstTriggerEl(ctx2)?.focus();
        },
        focusLastTrigger(ctx2) {
          dom.getLastTriggerEl(ctx2)?.focus();
        },
        focusNextTrigger(ctx2) {
          if (!ctx2.focusedValue)
            return;
          const triggerEl = dom.getNextTriggerEl(ctx2, ctx2.focusedValue);
          triggerEl?.focus();
        },
        focusPrevTrigger(ctx2) {
          if (!ctx2.focusedValue)
            return;
          const triggerEl = dom.getPrevTriggerEl(ctx2, ctx2.focusedValue);
          triggerEl?.focus();
        },
        setFocusedValue(ctx2, evt) {
          set2.focusedValue(ctx2, evt.value);
        },
        clearFocusedValue(ctx2) {
          set2.focusedValue(ctx2, null);
        },
        setValue(ctx2, evt) {
          set2.value(ctx2, evt.value);
        },
        coarseValue(ctx2) {
          if (!ctx2.multiple && ctx2.value.length > 1) {
            warn(`The value of accordion should be a single value when multiple is false.`);
            ctx2.value = [ctx2.value[0]];
          }
        }
      }
    }
  );
}
var invoke = {
  change(ctx) {
    ctx.onValueChange?.({ value: Array.from(ctx.value) });
  },
  focusChange(ctx) {
    ctx.onFocusChange?.({ value: ctx.focusedValue });
  }
};
var set2 = {
  value(ctx, value) {
    if (isEqual(ctx.value, value))
      return;
    ctx.value = value;
    invoke.change(ctx);
  },
  focusedValue(ctx, value) {
    if (isEqual(ctx.focusedValue, value))
      return;
    ctx.focusedValue = value;
    invoke.focusChange(ctx);
  }
};
var props = createProps()([
  "collapsible",
  "dir",
  "disabled",
  "getRootNode",
  "id",
  "ids",
  "multiple",
  "onFocusChange",
  "onValueChange",
  "orientation",
  "value"
]);
var splitProps2 = createSplitProps(props);
var itemProps = createProps()(["value", "disabled"]);
var splitItemProps = createSplitProps(itemProps);

// js/widgex/util.ts
var propMap = {
  onFocus: "onFocusin",
  onBlur: "onFocusout",
  onChange: "onInput",
  onDoubleClick: "onDblclick",
  htmlFor: "for",
  className: "class",
  defaultValue: "value",
  defaultChecked: "checked"
};
var prevAttrsMap = /* @__PURE__ */ new WeakMap();
var toStyleString = (style) => {
  return Object.entries(style).reduce((styleString, [key, value]) => {
    if (value === null || value === void 0)
      return styleString;
    const formattedKey = key.startsWith("--") ? key : key.replace(/[A-Z]/g, (match2) => `-${match2.toLowerCase()}`);
    return `${styleString}${formattedKey}:${value};`;
  }, "");
};
var normalizeProps = createNormalizer((props6) => {
  return Object.entries(props6).reduce((acc, [key, value]) => {
    if (value === void 0)
      return acc;
    key = propMap[key] || key;
    if (key === "style" && typeof value === "object") {
      acc.style = toStyleString(value);
    } else {
      acc[key.toLowerCase()] = value;
    }
    return acc;
  }, {});
});
var spreadProps = (node, attrs) => {
  const oldAttrs = prevAttrsMap.get(node) || {};
  const attrKeys = Object.keys(attrs);
  const addEvent = (event, callback) => {
    node.addEventListener(event.toLowerCase(), callback);
  };
  const removeEvent = (event, callback) => {
    node.removeEventListener(event.toLowerCase(), callback);
  };
  const onEvents = (attr) => attr.startsWith("on");
  const others = (attr) => !attr.startsWith("on");
  const setup = (attr) => addEvent(attr.substring(2), attrs[attr]);
  const teardown = (attr) => removeEvent(attr.substring(2), attrs[attr]);
  const apply = (attrName) => {
    let value = attrs[attrName];
    const oldValue = oldAttrs[attrName];
    if (value === oldValue)
      return;
    if (typeof value === "boolean") {
      value = value || void 0;
    }
    if (value != null) {
      if (["value", "checked", "htmlFor"].includes(attrName)) {
        node[attrName] = value;
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
  for (const oldEvent of oldEvents)
    removeEvent(oldEvent.substring(2), oldAttrs[oldEvent]);
  attrKeys.filter(onEvents).forEach(setup);
  attrKeys.filter(others).forEach(apply);
  prevAttrsMap.set(node, attrs);
  return function cleanup() {
    attrKeys.filter(onEvents).forEach(teardown);
  };
};
var renderPart = (root, name, api) => {
  const camelizedName = name.replace(/(^|-)([a-z])/g, (_match, _prefix, letter) => letter.toUpperCase());
  const part = root.querySelector(`[data-part='${name}']`);
  const getterName = `get${camelizedName}Props`;
  if (part)
    spreadProps(part, api[getterName]());
};
var getBooleanOption = (el, name) => {
  const kebabName = name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  return el.dataset[kebabName] === "true" || el.dataset[kebabName] === "";
};

// js/widgex/component.ts
var Component = class {
  el;
  service;
  api;
  constructor(el, context) {
    this.el = el;
    this.service = this.initService(context);
    this.api = this.initApi();
  }
  init = () => {
    this.render();
    this.service.subscribe(() => {
      this.api = this.initApi();
      this.render();
    });
    this.service.start();
  };
  destroy = () => {
    this.service.stop();
  };
};

// js/widgex/accordion.ts
var Accordion = class extends Component {
  initService(context) {
    return machine(context);
  }
  initApi() {
    return connect(this.service.state, this.service.send, normalizeProps);
  }
  render() {
    const parts6 = ["root"];
    for (const part of parts6)
      renderPart(this.el, part, this.api);
    this.renderItems();
  }
  renderItems() {
    for (const item of this.el.querySelectorAll("[data-part='item']")) {
      const value = item.dataset.value;
      if (!value) {
        console.error("Missing `data-value` attribute on item.");
        return;
      }
      spreadProps(item, this.api.getItemProps({ value }));
      this.renderItemTrigger(item, value);
      this.renderItemIndicator(item, value);
      this.renderItemContent(item, value);
    }
  }
  renderItemTrigger(item, value) {
    const itemTrigger = item.querySelector("[data-part='item-trigger']");
    if (!itemTrigger)
      return;
    spreadProps(itemTrigger, this.api.getItemTriggerProps({ value }));
  }
  renderItemIndicator(item, value) {
    const itemIndicator = item.querySelector("[data-part='item-indicator']");
    if (!itemIndicator)
      return;
    spreadProps(itemIndicator, this.api.getItemIndicatorProps({ value }));
  }
  renderItemContent(item, value) {
    const itemContent = item.querySelector("[data-part='item-content']");
    if (!itemContent)
      return;
    spreadProps(itemContent, this.api.getItemContentProps({ value }));
  }
};
var accordion_default = {
  mounted() {
    this.accordion = new Accordion(this.el, this.context());
    this.accordion.init();
  },
  updated() {
    this.accordion.render();
  },
  beforeDestroy() {
    this.accordion.destroy();
  },
  context() {
    return {
      id: this.el.id,
      value: [""],
      disabled: getBooleanOption(this.el, "disabled"),
      multiple: getBooleanOption(this.el, "multiple"),
      collapsible: getBooleanOption(this.el, "collapsible"),
      onValueChange: (details) => {
        if (this.el.dataset.onValueChange) {
          this.pushEvent(this.el.dataset.onValueChange, details);
        }
      }
    };
  }
};

// node_modules/@zag-js/collapsible/node_modules/@zag-js/anatomy/dist/index.mjs
var createAnatomy2 = (name, parts6 = []) => ({
  parts: (...values) => {
    if (isEmpty2(parts6)) {
      return createAnatomy2(name, values);
    }
    throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
  },
  extendWith: (...values) => createAnatomy2(name, [...parts6, ...values]),
  rename: (newName) => createAnatomy2(newName, parts6),
  keys: () => parts6,
  build: () => [...new Set(parts6)].reduce(
    (prev, part) => Object.assign(prev, {
      [part]: {
        selector: [
          `&[data-scope="${toKebabCase2(name)}"][data-part="${toKebabCase2(part)}"]`,
          `& [data-scope="${toKebabCase2(name)}"][data-part="${toKebabCase2(part)}"]`
        ].join(", "),
        attrs: { "data-scope": toKebabCase2(name), "data-part": toKebabCase2(part) }
      }
    }),
    {}
  )
});
var toKebabCase2 = (value) => value.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
var isEmpty2 = (v) => v.length === 0;

// node_modules/@zag-js/collapsible/node_modules/@zag-js/dom-query/dist/index.mjs
var dataAttr2 = (guard) => guard ? "" : void 0;
var ELEMENT_NODE = 1;
var DOCUMENT_NODE2 = 9;
var DOCUMENT_FRAGMENT_NODE = 11;
var isObject4 = (v) => typeof v === "object" && v !== null;
var isHTMLElement = (el) => isObject4(el) && el.nodeType === ELEMENT_NODE && typeof el.nodeName === "string";
var isDocument2 = (el) => isObject4(el) && el.nodeType === DOCUMENT_NODE2;
var isWindow2 = (el) => isObject4(el) && el === el.window;
var isNode = (el) => isObject4(el) && el.nodeType !== void 0;
var isShadowRoot = (el) => isNode(el) && el.nodeType === DOCUMENT_FRAGMENT_NODE && "host" in el;
function getDocument2(el) {
  if (isDocument2(el))
    return el;
  if (isWindow2(el))
    return el.document;
  return el?.ownerDocument ?? document;
}
function getWindow(el) {
  if (isShadowRoot(el))
    return getWindow(el.host);
  if (isDocument2(el))
    return el.defaultView ?? window;
  if (isHTMLElement(el))
    return el.ownerDocument?.defaultView ?? window;
  return window;
}
function getActiveElement2(rootNode) {
  let activeElement = rootNode.activeElement;
  while (activeElement?.shadowRoot) {
    const el = activeElement.shadowRoot.activeElement;
    if (el === activeElement)
      break;
    else
      activeElement = el;
  }
  return activeElement;
}
function getComposedPath(event) {
  return event.composedPath?.() ?? event.nativeEvent?.composedPath?.();
}
function getEventTarget(event) {
  const composedPath = getComposedPath(event);
  return composedPath?.[0] ?? event.target;
}
var styleCache = /* @__PURE__ */ new WeakMap();
function getComputedStyle(el) {
  if (!styleCache.has(el)) {
    styleCache.set(el, getWindow(el).getComputedStyle(el));
  }
  return styleCache.get(el);
}
function raf(fn) {
  const id = globalThis.requestAnimationFrame(fn);
  return () => {
    globalThis.cancelAnimationFrame(id);
  };
}
function createScope2(methods) {
  const dom6 = {
    getRootNode: (ctx) => ctx.getRootNode?.() ?? document,
    getDoc: (ctx) => getDocument2(dom6.getRootNode(ctx)),
    getWin: (ctx) => dom6.getDoc(ctx).defaultView ?? window,
    getActiveElement: (ctx) => getActiveElement2(dom6.getRootNode(ctx)),
    isActiveElement: (ctx, elem) => elem === dom6.getActiveElement(ctx),
    getById: (ctx, id) => dom6.getRootNode(ctx).getElementById(id),
    setValue: (elem, value) => {
      if (elem == null || value == null)
        return;
      const valueAsString = value.toString();
      if (elem.value === valueAsString)
        return;
      elem.value = value.toString();
    }
  };
  return { ...dom6, ...methods };
}
var fps2 = 1e3 / 60;

// node_modules/@zag-js/collapsible/node_modules/@zag-js/store/dist/index.mjs
function glob2() {
  if (typeof globalThis !== "undefined")
    return globalThis;
  if (typeof self !== "undefined")
    return self;
  if (typeof window !== "undefined")
    return window;
  if (typeof global !== "undefined")
    return global;
}
function globalRef2(key, value) {
  const g = glob2();
  if (!g)
    return value();
  g[key] || (g[key] = value());
  return g[key];
}
var refSet2 = globalRef2("__zag__refSet", () => /* @__PURE__ */ new WeakSet());
var isReactElement2 = (x) => typeof x === "object" && x !== null && "$$typeof" in x && "props" in x;
var isVueElement2 = (x) => typeof x === "object" && x !== null && "__v_isVNode" in x;
var isDOMElement2 = (x) => typeof x === "object" && x !== null && "nodeType" in x && typeof x.nodeName === "string";
var isElement2 = (x) => isReactElement2(x) || isVueElement2(x) || isDOMElement2(x);
var isObject5 = (x) => x !== null && typeof x === "object";
var canProxy2 = (x) => isObject5(x) && !refSet2.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !isElement2(x) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer) && !(x instanceof Promise);
var isDev3 = () => true;
function set3(obj, key, val) {
  if (typeof val.value === "object" && !canProxy2(val.value))
    val.value = clone2(val.value);
  if (!val.enumerable || val.get || val.set || !val.configurable || !val.writable || key === "__proto__") {
    Object.defineProperty(obj, key, val);
  } else
    obj[key] = val.value;
}
function clone2(x) {
  if (typeof x !== "object")
    return x;
  var i = 0, k, list, tmp, str = Object.prototype.toString.call(x);
  if (str === "[object Object]") {
    tmp = Object.create(Object.getPrototypeOf(x) || null);
  } else if (str === "[object Array]") {
    tmp = Array(x.length);
  } else if (str === "[object Set]") {
    tmp = /* @__PURE__ */ new Set();
    x.forEach(function(val) {
      tmp.add(clone2(val));
    });
  } else if (str === "[object Map]") {
    tmp = /* @__PURE__ */ new Map();
    x.forEach(function(val, key) {
      tmp.set(clone2(key), clone2(val));
    });
  } else if (str === "[object Date]") {
    tmp = /* @__PURE__ */ new Date(+x);
  } else if (str === "[object RegExp]") {
    tmp = new RegExp(x.source, x.flags);
  } else if (str === "[object DataView]") {
    tmp = new x.constructor(clone2(x.buffer));
  } else if (str === "[object ArrayBuffer]") {
    tmp = x.slice(0);
  } else if (str === "[object Blob]") {
    tmp = x.slice();
  } else if (str.slice(-6) === "Array]") {
    tmp = new x.constructor(x);
  }
  if (tmp) {
    for (list = Object.getOwnPropertySymbols(x); i < list.length; i++) {
      set3(tmp, list[i], Object.getOwnPropertyDescriptor(x, list[i]));
    }
    for (i = 0, list = Object.getOwnPropertyNames(x); i < list.length; i++) {
      if (Object.hasOwnProperty.call(tmp, k = list[i]) && tmp[k] === x[k])
        continue;
      set3(tmp, k, Object.getOwnPropertyDescriptor(x, k));
    }
  }
  return tmp || x;
}
var proxyStateMap2 = globalRef2("__zag__proxyStateMap", () => /* @__PURE__ */ new WeakMap());
var buildProxyFunction2 = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version) => {
  const cache = snapCache.get(target);
  if (cache?.[0] === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  markToTrack(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    const value = Reflect.get(target, key);
    if (refSet2.has(value)) {
      markToTrack(value, false);
      snap[key] = value;
    } else if (proxyStateMap2.has(value)) {
      snap[key] = snapshot2(value);
    } else {
      snap[key] = value;
    }
  });
  return Object.freeze(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction22 = (initialObject) => {
  if (!isObject5(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if (isDev3() && propProxyStates.has(prop)) {
      throw new Error("prop listener already exists");
    }
    if (listeners.size) {
      const remove2 = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove2]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      entry[1]?.();
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if (isDev3() && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove2 = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove2]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove2], prop) => {
          if (remove2) {
            remove2();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject5(value)) {
        value = getUntracked(value) || value;
      }
      let nextValue = value;
      if (Object.getOwnPropertyDescriptor(target, prop)?.set)
        ;
      else {
        if (!proxyStateMap2.has(value) && canProxy2(value)) {
          nextValue = proxy2(value);
        }
        const childProxyState = !refSet2.has(nextValue) && proxyStateMap2.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [baseObject, ensureVersion, createSnapshot, addListener];
  proxyStateMap2.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(initialObject, key);
    if (desc.get || desc.set) {
      Object.defineProperty(baseObject, key, desc);
    } else {
      proxyObject[key] = initialObject[key];
    }
  });
  return proxyObject;
}) => [
  // public functions
  proxyFunction22,
  // shared state
  proxyStateMap2,
  refSet2,
  // internal things
  objectIs,
  newProxy,
  canProxy2,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
var [proxyFunction2] = buildProxyFunction2();
function proxy2(initialObject = {}) {
  return proxyFunction2(initialObject);
}
function subscribe2(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap2.get(proxyObject);
  if (isDev3() && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot2(proxyObject) {
  const proxyState = proxyStateMap2.get(proxyObject);
  if (isDev3() && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion());
}
function ref2(obj) {
  refSet2.add(obj);
  return obj;
}
function proxyWithComputed2(initialObject, computedFns) {
  const keys = Object.keys(computedFns);
  keys.forEach((key) => {
    if (Object.getOwnPropertyDescriptor(initialObject, key)) {
      throw new Error("object property already defined");
    }
    const computedFn = computedFns[key];
    const { get, set: set22 } = typeof computedFn === "function" ? { get: computedFn } : computedFn;
    const desc = {};
    desc.get = () => get(snapshot2(proxyObject));
    if (set22) {
      desc.set = (newValue) => set22(proxyObject, newValue);
    }
    Object.defineProperty(initialObject, key, desc);
  });
  const proxyObject = proxy2(initialObject);
  return proxyObject;
}

// node_modules/@zag-js/collapsible/node_modules/@zag-js/utils/dist/index.mjs
function clear2(v) {
  while (v.length > 0)
    v.pop();
  return v;
}
var runIfFn2 = (v, ...a) => {
  const res = typeof v === "function" ? v(...a) : v;
  return res ?? void 0;
};
var cast2 = (v) => v;
var noop2 = () => {
};
var uuid2 = /* @__PURE__ */ (() => {
  let id = 0;
  return () => {
    id++;
    return id.toString(36);
  };
})();
var isDev4 = () => true;
var isArray2 = (v) => Array.isArray(v);
var isObjectLike2 = (v) => v != null && typeof v === "object";
var isObject6 = (v) => isObjectLike2(v) && !isArray2(v);
var isNumber2 = (v) => typeof v === "number" && !Number.isNaN(v);
var isString2 = (v) => typeof v === "string";
var isFunction2 = (v) => typeof v === "function";
var hasProp2 = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
var baseGetTag2 = (v) => Object.prototype.toString.call(v);
var fnToString2 = Function.prototype.toString;
var objectCtorString2 = fnToString2.call(Object);
var isPlainObject3 = (v) => {
  if (!isObjectLike2(v) || baseGetTag2(v) != "[object Object]")
    return false;
  const proto = Object.getPrototypeOf(v);
  if (proto === null)
    return true;
  const Ctor = hasProp2(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && fnToString2.call(Ctor) == objectCtorString2;
};
function splitProps3(props6, keys) {
  const rest = {};
  const result = {};
  const keySet = new Set(keys);
  for (const key in props6) {
    if (keySet.has(key)) {
      result[key] = props6[key];
    } else {
      rest[key] = props6[key];
    }
  }
  return [result, rest];
}
var createSplitProps2 = (keys) => {
  return function split(props6) {
    return splitProps3(props6, keys);
  };
};
function compact2(obj) {
  if (!isPlainObject22(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact2(value);
    }
  }
  return filtered;
}
var isPlainObject22 = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};
function warn2(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && true) {
    console.warn(m);
  }
}
function invariant2(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && true) {
    throw new Error(m);
  }
}

// node_modules/@zag-js/collapsible/node_modules/@zag-js/core/dist/index.mjs
var __defProp3 = Object.defineProperty;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField2 = (obj, key, value) => __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
function deepMerge2(source, ...objects) {
  for (const obj of objects) {
    const target = compact2(obj);
    for (const key in target) {
      if (isPlainObject3(obj[key])) {
        if (!source[key]) {
          source[key] = {};
        }
        deepMerge2(source[key], obj[key]);
      } else {
        source[key] = obj[key];
      }
    }
  }
  return source;
}
function toEvent2(event) {
  const obj = isString2(event) ? { type: event } : event;
  return obj;
}
function toArray2(value) {
  if (!value)
    return [];
  return isArray2(value) ? value.slice() : [value];
}
function isGuardHelper2(value) {
  return isObject6(value) && value.predicate != null;
}
var Truthy2 = () => true;
function determineGuardFn2(guard, guardMap) {
  guard = guard ?? Truthy2;
  return (context, event, meta) => {
    if (isString2(guard)) {
      const value = guardMap[guard];
      return isFunction2(value) ? value(context, event, meta) : value;
    }
    if (isGuardHelper2(guard)) {
      return guard.predicate(guardMap)(context, event, meta);
    }
    return guard?.(context, event, meta);
  };
}
function determineActionsFn2(values, guardMap) {
  return (context, event, meta) => {
    if (isGuardHelper2(values)) {
      return values.predicate(guardMap)(context, event, meta);
    }
    return values;
  };
}
function createProxy2(config) {
  const computedContext = config.computed ?? cast2({});
  const initialContext = config.context ?? cast2({});
  const initialTags = config.initial ? config.states?.[config.initial]?.tags : [];
  const state = proxy2({
    value: config.initial ?? "",
    previousValue: "",
    event: cast2({}),
    previousEvent: cast2({}),
    context: proxyWithComputed2(initialContext, computedContext),
    done: false,
    tags: initialTags ?? [],
    hasTag(tag) {
      return this.tags.includes(tag);
    },
    matches(...value) {
      return value.includes(this.value);
    },
    can(event) {
      return cast2(this).nextEvents.includes(event);
    },
    get nextEvents() {
      const stateEvents = config.states?.[this.value]?.["on"] ?? {};
      const globalEvents = config?.on ?? {};
      return Object.keys({ ...stateEvents, ...globalEvents });
    },
    get changed() {
      if (this.event.value === "machine.init" || !this.previousValue)
        return false;
      return this.value !== this.previousValue;
    }
  });
  return cast2(state);
}
function determineDelayFn2(delay2, delaysMap) {
  return (context, event) => {
    if (isNumber2(delay2))
      return delay2;
    if (isFunction2(delay2)) {
      return delay2(context, event);
    }
    if (isString2(delay2)) {
      const value = Number.parseFloat(delay2);
      if (!Number.isNaN(value)) {
        return value;
      }
      if (delaysMap) {
        const valueOrFn = delaysMap?.[delay2];
        invariant2(
          valueOrFn == null,
          `[@zag-js/core > determine-delay] Cannot determine delay for \`${delay2}\`. It doesn't exist in \`options.delays\``
        );
        return isFunction2(valueOrFn) ? valueOrFn(context, event) : valueOrFn;
      }
    }
  };
}
function toTarget2(target) {
  return isString2(target) ? { target } : target;
}
function determineTransitionFn2(transitions, guardMap) {
  return (context, event, meta) => {
    return toArray2(transitions).map(toTarget2).find((transition) => {
      const determineGuard = determineGuardFn2(transition.guard, guardMap);
      const guard = determineGuard(context, event, meta);
      return guard ?? transition.target ?? transition.actions;
    });
  };
}
var Machine2 = class {
  // Let's get started!
  constructor(config, options) {
    __publicField2(
      this,
      "status",
      "Not Started"
      /* NotStarted */
    );
    __publicField2(this, "state");
    __publicField2(this, "initialState");
    __publicField2(this, "initialContext");
    __publicField2(this, "id");
    __publicField2(
      this,
      "type",
      "machine"
      /* Machine */
    );
    __publicField2(this, "activityEvents", /* @__PURE__ */ new Map());
    __publicField2(this, "delayedEvents", /* @__PURE__ */ new Map());
    __publicField2(this, "stateListeners", /* @__PURE__ */ new Set());
    __publicField2(this, "doneListeners", /* @__PURE__ */ new Set());
    __publicField2(this, "contextWatchers", /* @__PURE__ */ new Set());
    __publicField2(this, "removeStateListener", noop2);
    __publicField2(this, "parent");
    __publicField2(this, "children", /* @__PURE__ */ new Map());
    __publicField2(this, "guardMap");
    __publicField2(this, "actionMap");
    __publicField2(this, "delayMap");
    __publicField2(this, "activityMap");
    __publicField2(this, "sync");
    __publicField2(this, "options");
    __publicField2(this, "config");
    __publicField2(this, "_created", () => {
      if (!this.config.created)
        return;
      const event = toEvent2(
        "machine.created"
        /* Created */
      );
      this.executeActions(this.config.created, event);
    });
    __publicField2(this, "start", (init) => {
      this.state.value = "";
      this.state.tags = [];
      if (this.status === "Running") {
        return this;
      }
      this.status = "Running";
      this.removeStateListener = subscribe2(
        this.state,
        () => {
          this.stateListeners.forEach((listener) => {
            listener(this.stateSnapshot);
          });
        },
        this.sync
      );
      this.setupContextWatchers();
      this.executeActivities(
        toEvent2(
          "machine.start"
          /* Start */
        ),
        toArray2(this.config.activities),
        "machine.start"
        /* Start */
      );
      this.executeActions(this.config.entry, toEvent2(
        "machine.start"
        /* Start */
      ));
      const event = toEvent2(
        "machine.init"
        /* Init */
      );
      const target = isObject6(init) ? init.value : init;
      const context = isObject6(init) ? init.context : void 0;
      if (context) {
        this.setContext(context);
      }
      const transition = {
        target: target ?? this.config.initial
      };
      const next = this.getNextStateInfo(transition, event);
      this.initialState = next;
      this.performStateChangeEffects(this.state.value, next, event);
      return this;
    });
    __publicField2(this, "setupContextWatchers", () => {
      const { watch } = this.config;
      if (!watch)
        return;
      let prev = snapshot2(this.state.context);
      const cleanup = subscribe2(this.state.context, () => {
        const next = snapshot2(this.state.context);
        for (const [key, fn] of Object.entries(watch)) {
          const isEqual4 = this.options.compareFns?.[key] ?? Object.is;
          if (isEqual4(prev[key], next[key]))
            continue;
          this.executeActions(fn, this.state.event);
        }
        prev = next;
      });
      this.contextWatchers.add(cleanup);
    });
    __publicField2(this, "stop", () => {
      if (this.status === "Stopped")
        return;
      this.performExitEffects(this.state.value, toEvent2(
        "machine.stop"
        /* Stop */
      ));
      this.executeActions(this.config.exit, toEvent2(
        "machine.stop"
        /* Stop */
      ));
      this.setState("");
      this.setEvent(
        "machine.stop"
        /* Stop */
      );
      this.stopStateListeners();
      this.stopChildren();
      this.stopActivities();
      this.stopDelayedEvents();
      this.stopContextWatchers();
      this.status = "Stopped";
      return this;
    });
    __publicField2(this, "stopStateListeners", () => {
      this.removeStateListener();
      this.stateListeners.clear();
    });
    __publicField2(this, "stopContextWatchers", () => {
      this.contextWatchers.forEach((fn) => fn());
      this.contextWatchers.clear();
    });
    __publicField2(this, "stopDelayedEvents", () => {
      this.delayedEvents.forEach((state) => {
        state.forEach((stop) => stop());
      });
      this.delayedEvents.clear();
    });
    __publicField2(this, "stopActivities", (state) => {
      if (state) {
        this.activityEvents.get(state)?.forEach((stop) => stop());
        this.activityEvents.get(state)?.clear();
        this.activityEvents.delete(state);
      } else {
        this.activityEvents.forEach((state2) => {
          state2.forEach((stop) => stop());
          state2.clear();
        });
        this.activityEvents.clear();
      }
    });
    __publicField2(this, "sendChild", (evt, to) => {
      const event = toEvent2(evt);
      const id = runIfFn2(to, this.contextSnapshot);
      const child = this.children.get(id);
      if (!child) {
        invariant2(`[@zag-js/core] Cannot send '${event.type}' event to unknown child`);
      }
      child.send(event);
    });
    __publicField2(this, "stopChild", (id) => {
      if (!this.children.has(id)) {
        invariant2(`[@zag-js/core > stop-child] Cannot stop unknown child ${id}`);
      }
      this.children.get(id).stop();
      this.children.delete(id);
    });
    __publicField2(this, "removeChild", (id) => {
      this.children.delete(id);
    });
    __publicField2(this, "stopChildren", () => {
      this.children.forEach((child) => child.stop());
      this.children.clear();
    });
    __publicField2(this, "setParent", (parent) => {
      this.parent = parent;
    });
    __publicField2(this, "spawn", (src, id) => {
      const actor = runIfFn2(src);
      if (id)
        actor.id = id;
      actor.type = "machine.actor";
      actor.setParent(this);
      this.children.set(actor.id, cast2(actor));
      actor.onDone(() => {
        this.removeChild(actor.id);
      }).start();
      return cast2(ref2(actor));
    });
    __publicField2(this, "stopActivity", (key) => {
      if (!this.state.value)
        return;
      const cleanups3 = this.activityEvents.get(this.state.value);
      cleanups3?.get(key)?.();
      cleanups3?.delete(key);
    });
    __publicField2(this, "addActivityCleanup", (state, key, cleanup) => {
      if (!state)
        return;
      if (!this.activityEvents.has(state)) {
        this.activityEvents.set(state, /* @__PURE__ */ new Map([[key, cleanup]]));
      } else {
        this.activityEvents.get(state)?.set(key, cleanup);
      }
    });
    __publicField2(this, "setState", (target) => {
      this.state.previousValue = this.state.value;
      this.state.value = target;
      const stateNode = this.getStateNode(target);
      if (target == null) {
        clear2(this.state.tags);
      } else {
        this.state.tags = toArray2(stateNode?.tags);
      }
    });
    __publicField2(this, "setContext", (context) => {
      if (!context)
        return;
      deepMerge2(this.state.context, compact2(context));
    });
    __publicField2(this, "setOptions", (options2) => {
      const opts = compact2(options2);
      this.actionMap = { ...this.actionMap, ...opts.actions };
      this.delayMap = { ...this.delayMap, ...opts.delays };
      this.activityMap = { ...this.activityMap, ...opts.activities };
      this.guardMap = { ...this.guardMap, ...opts.guards };
    });
    __publicField2(this, "getStateNode", (state) => {
      if (!state)
        return;
      return this.config.states?.[state];
    });
    __publicField2(this, "getNextStateInfo", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      const isTargetless = !transition?.target;
      const target = transition?.target ?? this.state.value;
      const changed = this.state.value !== target;
      const stateNode = this.getStateNode(target);
      const reenter = !isTargetless && !changed && !transition?.internal;
      const info = {
        reenter,
        transition,
        stateNode,
        target,
        changed
      };
      this.log("NextState:", `[${event.type}]`, this.state.value, "---->", info.target);
      return info;
    });
    __publicField2(this, "getAfterActions", (transition, delay2) => {
      let id;
      const current = this.state.value;
      return {
        entry: () => {
          id = globalThis.setTimeout(() => {
            const next = this.getNextStateInfo(transition, this.state.event);
            this.performStateChangeEffects(current, next, this.state.event);
          }, delay2);
        },
        exit: () => {
          globalThis.clearTimeout(id);
        }
      };
    });
    __publicField2(this, "getDelayedEventActions", (state) => {
      const stateNode = this.getStateNode(state);
      const event = this.state.event;
      if (!stateNode || !stateNode.after)
        return;
      const entries = [];
      const exits = [];
      if (isArray2(stateNode.after)) {
        const transition = this.determineTransition(stateNode.after, event);
        if (!transition)
          return;
        if (!hasProp2(transition, "delay")) {
          throw new Error(`[@zag-js/core > after] Delay is required for after transition: ${JSON.stringify(transition)}`);
        }
        const determineDelay = determineDelayFn2(transition.delay, this.delayMap);
        const __delay = determineDelay(this.contextSnapshot, event);
        const actions = this.getAfterActions(transition, __delay);
        entries.push(actions.entry);
        exits.push(actions.exit);
        return { entries, exits };
      }
      if (isObject6(stateNode.after)) {
        for (const delay2 in stateNode.after) {
          const transition = stateNode.after[delay2];
          const determineDelay = determineDelayFn2(delay2, this.delayMap);
          const __delay = determineDelay(this.contextSnapshot, event);
          const actions = this.getAfterActions(transition, __delay);
          entries.push(actions.entry);
          exits.push(actions.exit);
        }
      }
      return { entries, exits };
    });
    __publicField2(this, "executeActions", (actions, event) => {
      const pickedActions = determineActionsFn2(actions, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      for (const action of toArray2(pickedActions)) {
        const fn = isString2(action) ? this.actionMap?.[action] : action;
        warn2(
          isString2(action) && !fn,
          `[@zag-js/core > execute-actions] No implementation found for action: \`${action}\``
        );
        fn?.(this.state.context, event, this.meta);
      }
    });
    __publicField2(this, "executeActivities", (event, activities, state) => {
      for (const activity of activities) {
        const fn = isString2(activity) ? this.activityMap?.[activity] : activity;
        if (!fn) {
          warn2(`[@zag-js/core > execute-activity] No implementation found for activity: \`${activity}\``);
          continue;
        }
        const cleanup = fn(this.state.context, event, this.meta);
        if (cleanup) {
          const key = isString2(activity) ? activity : activity.name || uuid2();
          this.addActivityCleanup(state ?? this.state.value, key, cleanup);
        }
      }
    });
    __publicField2(this, "createEveryActivities", (every, callbackfn) => {
      if (!every)
        return;
      if (isArray2(every)) {
        const picked = toArray2(every).find((transition) => {
          const delayOrFn = transition.delay;
          const determineDelay2 = determineDelayFn2(delayOrFn, this.delayMap);
          const delay22 = determineDelay2(this.contextSnapshot, this.state.event);
          const determineGuard = determineGuardFn2(transition.guard, this.guardMap);
          const guard = determineGuard(this.contextSnapshot, this.state.event, this.guardMeta);
          return guard ?? delay22 != null;
        });
        if (!picked)
          return;
        const determineDelay = determineDelayFn2(picked.delay, this.delayMap);
        const delay2 = determineDelay(this.contextSnapshot, this.state.event);
        const activity = () => {
          const id = globalThis.setInterval(() => {
            this.executeActions(picked.actions, this.state.event);
          }, delay2);
          return () => {
            globalThis.clearInterval(id);
          };
        };
        callbackfn(activity);
      } else {
        for (const interval in every) {
          const actions = every?.[interval];
          const determineDelay = determineDelayFn2(interval, this.delayMap);
          const delay2 = determineDelay(this.contextSnapshot, this.state.event);
          const activity = () => {
            const id = globalThis.setInterval(() => {
              this.executeActions(actions, this.state.event);
            }, delay2);
            return () => {
              globalThis.clearInterval(id);
            };
          };
          callbackfn(activity);
        }
      }
    });
    __publicField2(this, "setEvent", (event) => {
      this.state.previousEvent = this.state.event;
      this.state.event = ref2(toEvent2(event));
    });
    __publicField2(this, "performExitEffects", (current, event) => {
      const currentState = this.state.value;
      if (currentState === "")
        return;
      const stateNode = current ? this.getStateNode(current) : void 0;
      this.stopActivities(currentState);
      const _exit = determineActionsFn2(stateNode?.exit, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      const exitActions = toArray2(_exit);
      const afterExitActions = this.delayedEvents.get(currentState);
      if (afterExitActions) {
        exitActions.push(...afterExitActions);
      }
      this.executeActions(exitActions, event);
      this.delayedEvents.delete(currentState);
    });
    __publicField2(this, "performEntryEffects", (next, event) => {
      const stateNode = this.getStateNode(next);
      const activities = toArray2(stateNode?.activities);
      this.createEveryActivities(stateNode?.every, (activity) => {
        activities.unshift(activity);
      });
      if (activities.length > 0) {
        this.executeActivities(event, activities);
      }
      const pickedActions = determineActionsFn2(stateNode?.entry, this.guardMap)(
        this.contextSnapshot,
        event,
        this.guardMeta
      );
      const entryActions = toArray2(pickedActions);
      const afterActions = this.getDelayedEventActions(next);
      if (stateNode?.after && afterActions) {
        this.delayedEvents.set(next, afterActions?.exits);
        entryActions.push(...afterActions.entries);
      }
      this.executeActions(entryActions, event);
      if (stateNode?.type === "final") {
        this.state.done = true;
        this.doneListeners.forEach((listener) => {
          listener(this.stateSnapshot);
        });
        this.stop();
      }
    });
    __publicField2(this, "performTransitionEffects", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      this.executeActions(transition?.actions, event);
    });
    __publicField2(this, "performStateChangeEffects", (current, next, event) => {
      this.setEvent(event);
      const changed = next.changed || next.reenter;
      if (changed) {
        this.performExitEffects(current, event);
      }
      this.performTransitionEffects(next.transition, event);
      this.setState(next.target);
      if (changed) {
        this.performEntryEffects(next.target, event);
      }
    });
    __publicField2(this, "determineTransition", (transition, event) => {
      const fn = determineTransitionFn2(transition, this.guardMap);
      return fn?.(this.contextSnapshot, event, this.guardMeta);
    });
    __publicField2(this, "sendParent", (evt) => {
      if (!this.parent) {
        invariant2("[@zag-js/core > send-parent] Cannot send event to an unknown parent");
      }
      const event = toEvent2(evt);
      this.parent?.send(event);
    });
    __publicField2(this, "log", (...args) => {
      if (isDev4() && this.options.debug) {
        console.log(...args);
      }
    });
    __publicField2(this, "send", (evt) => {
      const event = toEvent2(evt);
      this.transition(this.state.value, event);
    });
    __publicField2(this, "transition", (state, evt) => {
      const stateNode = isString2(state) ? this.getStateNode(state) : state?.stateNode;
      const event = toEvent2(evt);
      if (!stateNode && !this.config.on) {
        const msg = this.status === "Stopped" ? "[@zag-js/core > transition] Cannot transition a stopped machine" : `[@zag-js/core > transition] State does not have a definition for \`state\`: ${state}, \`event\`: ${event.type}`;
        warn2(msg);
        return;
      }
      const transitions = (
        // @ts-expect-error - Fix this
        stateNode?.on?.[event.type] ?? this.config.on?.[event.type]
      );
      const next = this.getNextStateInfo(transitions, event);
      this.performStateChangeEffects(this.state.value, next, event);
      return next.stateNode;
    });
    __publicField2(this, "subscribe", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return () => {
        this.stateListeners.delete(listener);
      };
    });
    __publicField2(this, "onDone", (listener) => {
      this.doneListeners.add(listener);
      return this;
    });
    __publicField2(this, "onTransition", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return this;
    });
    this.config = clone2(config);
    this.options = clone2(options ?? {});
    this.id = this.config.id ?? `machine-${uuid2()}`;
    this.guardMap = this.options?.guards ?? {};
    this.actionMap = this.options?.actions ?? {};
    this.delayMap = this.options?.delays ?? {};
    this.activityMap = this.options?.activities ?? {};
    this.sync = this.options?.sync ?? false;
    this.state = createProxy2(this.config);
    this.initialContext = snapshot2(this.state.context);
  }
  // immutable state value
  get stateSnapshot() {
    return cast2(snapshot2(this.state));
  }
  getState() {
    return this.stateSnapshot;
  }
  // immutable context value
  get contextSnapshot() {
    return this.stateSnapshot.context;
  }
  /**
   * A reference to the instance methods of the machine.
   * Useful when spawning child machines and managing the communication between them.
   */
  get self() {
    const self2 = this;
    return {
      id: this.id,
      send: this.send.bind(this),
      sendParent: this.sendParent.bind(this),
      sendChild: this.sendChild.bind(this),
      stop: this.stop.bind(this),
      stopChild: this.stopChild.bind(this),
      spawn: this.spawn.bind(this),
      stopActivity: this.stopActivity.bind(this),
      get state() {
        return self2.stateSnapshot;
      },
      get initialContext() {
        return self2.initialContext;
      },
      get initialState() {
        return self2.initialState?.target ?? "";
      }
    };
  }
  get meta() {
    return {
      state: this.stateSnapshot,
      guards: this.guardMap,
      send: this.send.bind(this),
      self: this.self,
      initialContext: this.initialContext,
      initialState: this.initialState?.target ?? "",
      getState: () => this.stateSnapshot,
      getAction: (key) => this.actionMap[key],
      getGuard: (key) => this.guardMap[key]
    };
  }
  get guardMeta() {
    return {
      state: this.stateSnapshot
    };
  }
  get [Symbol.toStringTag]() {
    return "Machine";
  }
  getHydrationState() {
    const state = this.getState();
    return {
      value: state.value,
      tags: state.tags
    };
  }
};
var createMachine2 = (config, options) => new Machine2(config, options);

// node_modules/@zag-js/collapsible/node_modules/@zag-js/types/dist/index.mjs
var createProps2 = () => (props6) => Array.from(new Set(props6));

// node_modules/@zag-js/collapsible/dist/index.mjs
var anatomy2 = createAnatomy2("collapsible").parts("root", "trigger", "content");
var parts2 = anatomy2.build();
var dom2 = createScope2({
  getRootId: (ctx) => ctx.ids?.root ?? `collapsible:${ctx.id}`,
  getContentId: (ctx) => ctx.ids?.content ?? `collapsible:${ctx.id}:content`,
  getTriggerId: (ctx) => ctx.ids?.trigger ?? `collapsible:${ctx.id}:trigger`,
  getRootEl: (ctx) => dom2.getById(ctx, dom2.getRootId(ctx)),
  getContentEl: (ctx) => dom2.getById(ctx, dom2.getContentId(ctx)),
  getTriggerEl: (ctx) => dom2.getById(ctx, dom2.getTriggerId(ctx))
});
function connect2(state, send, normalize) {
  const visible = state.matches("open", "closing");
  const open = state.matches("open");
  const height = state.context.height;
  const width = state.context.width;
  const disabled = !!state.context.disabled;
  const skip = !state.context.initial && open;
  return {
    disabled,
    visible,
    open,
    measureSize() {
      send("SIZE.MEASURE");
    },
    setOpen(nextOpen) {
      if (nextOpen === open)
        return;
      send(nextOpen ? "OPEN" : "CLOSE");
    },
    getRootProps() {
      return normalize.element({
        ...parts2.root.attrs,
        "data-state": open ? "open" : "closed",
        dir: state.context.dir,
        id: dom2.getRootId(state.context)
      });
    },
    getContentProps() {
      return normalize.element({
        ...parts2.content.attrs,
        "data-collapsible": "",
        "data-state": skip ? void 0 : open ? "open" : "closed",
        id: dom2.getContentId(state.context),
        "data-disabled": dataAttr2(disabled),
        hidden: !visible,
        style: {
          "--height": height != null ? `${height}px` : void 0,
          "--width": width != null ? `${width}px` : void 0
        }
      });
    },
    getTriggerProps() {
      return normalize.element({
        ...parts2.trigger.attrs,
        id: dom2.getTriggerId(state.context),
        dir: state.context.dir,
        type: "button",
        "data-state": open ? "open" : "closed",
        "data-disabled": dataAttr2(disabled),
        "aria-controls": dom2.getContentId(state.context),
        "aria-expanded": visible || false,
        onClick(event) {
          if (event.defaultPrevented)
            return;
          if (disabled)
            return;
          send({ type: open ? "CLOSE" : "OPEN", src: "trigger.click" });
        }
      });
    }
  };
}
function machine2(userContext) {
  const ctx = compact2(userContext);
  return createMachine2(
    {
      id: "collapsible",
      initial: ctx.open ? "open" : "closed",
      context: {
        ...ctx,
        height: 0,
        width: 0,
        initial: false,
        stylesRef: null,
        unmountAnimationName: null
      },
      watch: {
        open: ["setInitial", "computeSize", "toggleVisibility"]
      },
      exit: ["clearInitial", "cleanupNode"],
      states: {
        closed: {
          tags: ["closed"],
          on: {
            "CONTROLLED.OPEN": "open",
            OPEN: [
              {
                guard: "isOpenControlled",
                actions: ["invokeOnOpen"]
              },
              {
                target: "open",
                actions: ["setInitial", "computeSize", "invokeOnOpen"]
              }
            ]
          }
        },
        closing: {
          tags: ["open"],
          activities: ["trackExitAnimation"],
          on: {
            "CONTROLLED.CLOSE": "closed",
            "CONTROLLED.OPEN": "open",
            OPEN: [
              {
                guard: "isOpenControlled",
                actions: ["invokeOnOpen"]
              },
              {
                target: "open",
                actions: ["setInitial", "invokeOnOpen"]
              }
            ],
            CLOSE: [
              {
                guard: "isOpenControlled",
                actions: ["invokeOnExitComplete"]
              },
              {
                target: "closed",
                actions: ["setInitial", "computeSize", "invokeOnExitComplete"]
              }
            ],
            "ANIMATION.END": {
              target: "closed",
              actions: ["invokeOnExitComplete", "clearInitial"]
            }
          }
        },
        open: {
          tags: ["open"],
          activities: ["trackEnterAnimation"],
          on: {
            "CONTROLLED.CLOSE": "closing",
            CLOSE: [
              {
                guard: "isOpenControlled",
                actions: ["invokeOnClose"]
              },
              {
                target: "closing",
                actions: ["setInitial", "computeSize", "invokeOnClose"]
              }
            ],
            "SIZE.MEASURE": {
              actions: ["measureSize"]
            },
            "ANIMATION.END": {
              actions: ["clearInitial"]
            }
          }
        }
      }
    },
    {
      guards: {
        isOpenControlled: (ctx2) => !!ctx2["open.controlled"]
      },
      activities: {
        trackEnterAnimation(ctx2, _evt, { send }) {
          let cleanup;
          const rafCleanup = raf(() => {
            const contentEl = dom2.getContentEl(ctx2);
            if (!contentEl)
              return;
            const animationName = getComputedStyle(contentEl).animationName;
            const hasNoAnimation = !animationName || animationName === "none";
            if (hasNoAnimation) {
              send({ type: "ANIMATION.END" });
              return;
            }
            const onEnd = (event) => {
              const target = getEventTarget(event);
              if (target === contentEl) {
                send({ type: "ANIMATION.END" });
              }
            };
            contentEl.addEventListener("animationend", onEnd);
            cleanup = () => {
              contentEl.removeEventListener("animationend", onEnd);
            };
          });
          return () => {
            rafCleanup();
            cleanup?.();
          };
        },
        trackExitAnimation(ctx2, _evt, { send }) {
          let cleanup;
          const rafCleanup = raf(() => {
            const contentEl = dom2.getContentEl(ctx2);
            if (!contentEl)
              return;
            const animationName = getComputedStyle(contentEl).animationName;
            const hasNoAnimation = !animationName || animationName === "none";
            if (hasNoAnimation) {
              send({ type: "ANIMATION.END" });
              return;
            }
            const onEnd = (event) => {
              const win = contentEl.ownerDocument.defaultView || window;
              const animationName2 = win.getComputedStyle(contentEl).animationName;
              const target = getEventTarget(event);
              if (target === contentEl && animationName2 === ctx2.unmountAnimationName) {
                send({ type: "ANIMATION.END" });
              }
            };
            contentEl.addEventListener("animationend", onEnd);
            cleanup = () => {
              contentEl.removeEventListener("animationend", onEnd);
            };
          });
          return () => {
            rafCleanup();
            cleanup?.();
          };
        }
      },
      actions: {
        setInitial(ctx2) {
          ctx2.initial = true;
        },
        clearInitial(ctx2) {
          raf(() => {
            ctx2.initial = false;
          });
        },
        cleanupNode(ctx2) {
          ctx2.stylesRef = null;
        },
        measureSize(ctx2) {
          const contentEl = dom2.getContentEl(ctx2);
          if (!contentEl)
            return;
          const { height, width } = contentEl.getBoundingClientRect();
          ctx2.height = height;
          ctx2.width = width;
        },
        computeSize(ctx2, evt) {
          ctx2._rafCleanup?.();
          ctx2._rafCleanup = raf(() => {
            const contentEl = dom2.getContentEl(ctx2);
            if (!contentEl)
              return;
            ctx2.stylesRef || (ctx2.stylesRef = ref2({
              animationName: contentEl.style.animationName,
              animationDuration: contentEl.style.animationDuration
            }));
            if (evt.type === "CLOSE" || !ctx2.open) {
              const win = contentEl.ownerDocument.defaultView || window;
              ctx2.unmountAnimationName = win.getComputedStyle(contentEl).animationName;
            }
            const hidden = contentEl.hidden;
            contentEl.style.animationName = "none";
            contentEl.style.animationDuration = "0s";
            contentEl.hidden = false;
            const rect = contentEl.getBoundingClientRect();
            ctx2.height = rect.height;
            ctx2.width = rect.width;
            if (ctx2.initial) {
              contentEl.style.animationName = ctx2.stylesRef.animationName;
              contentEl.style.animationDuration = ctx2.stylesRef.animationDuration;
            }
            contentEl.hidden = hidden;
          });
        },
        invokeOnOpen: (ctx2) => {
          ctx2.onOpenChange?.({ open: true });
        },
        invokeOnClose: (ctx2) => {
          ctx2.onOpenChange?.({ open: false });
        },
        invokeOnExitComplete(ctx2) {
          ctx2.onExitComplete?.();
        },
        toggleVisibility: (ctx2, _evt, { send }) => {
          send({ type: ctx2.open ? "CONTROLLED.OPEN" : "CONTROLLED.CLOSE" });
        }
      }
    }
  );
}
var props2 = createProps2()([
  "dir",
  "disabled",
  "getRootNode",
  "id",
  "ids",
  "onExitComplete",
  "onOpenChange",
  "open.controlled",
  "open"
]);
var splitProps4 = createSplitProps2(props2);

// js/widgex/collapsible.ts
var Collapsible = class extends Component {
  initService(context) {
    return machine2(context);
  }
  initApi() {
    return connect2(this.service.state, this.service.send, normalizeProps);
  }
  render() {
    const parts6 = ["root", "trigger", "content"];
    for (const part of parts6)
      renderPart(this.el, part, this.api);
  }
};
var collapsible_default = {
  mounted() {
    this.collapsible = new Collapsible(this.el, this.context());
    this.collapsible.init();
  },
  updated() {
    this.collapsible.render();
  },
  beforeDestroy() {
    this.collapsible.destroy();
  },
  context() {
    let dir = this.el.dataset.dir;
    const validDirs = ["ltr", "rtl"];
    if (dir !== void 0 && !validDirs.includes(dir)) {
      console.error(`Invalid 'dir' specified: '${dir}'. Expected 'ltr' or 'rtl'.`);
      dir = void 0;
    }
    return {
      id: this.el.id,
      dir,
      disabled: this.el.dataset.disabled === "true" || this.el.dataset.disabled === "",
      open: this.el.hasAttribute("open"),
      onOpenChange: (details) => {
        if (this.el.dataset.onOpenChange) {
          this.pushEvent(this.el.dataset.onOpenChange, details);
        }
      }
    };
  }
};

// node_modules/@zag-js/dialog/node_modules/@zag-js/anatomy/dist/index.mjs
var createAnatomy3 = (name, parts6 = []) => ({
  parts: (...values) => {
    if (isEmpty3(parts6)) {
      return createAnatomy3(name, values);
    }
    throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
  },
  extendWith: (...values) => createAnatomy3(name, [...parts6, ...values]),
  rename: (newName) => createAnatomy3(newName, parts6),
  keys: () => parts6,
  build: () => [...new Set(parts6)].reduce(
    (prev, part) => Object.assign(prev, {
      [part]: {
        selector: [
          `&[data-scope="${toKebabCase3(name)}"][data-part="${toKebabCase3(part)}"]`,
          `& [data-scope="${toKebabCase3(name)}"][data-part="${toKebabCase3(part)}"]`
        ].join(", "),
        attrs: { "data-scope": toKebabCase3(name), "data-part": toKebabCase3(part) }
      }
    }),
    {}
  )
});
var toKebabCase3 = (value) => value.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
var isEmpty3 = (v) => v.length === 0;

// node_modules/@zag-js/dialog/node_modules/@zag-js/dom-query/dist/index.mjs
var ELEMENT_NODE2 = 1;
var DOCUMENT_NODE3 = 9;
var DOCUMENT_FRAGMENT_NODE2 = 11;
var isObject7 = (v) => typeof v === "object" && v !== null;
var isHTMLElement2 = (el) => isObject7(el) && el.nodeType === ELEMENT_NODE2 && typeof el.nodeName === "string";
var isDocument3 = (el) => isObject7(el) && el.nodeType === DOCUMENT_NODE3;
var isWindow3 = (el) => isObject7(el) && el === el.window;
var getNodeName = (node) => {
  if (isHTMLElement2(node))
    return node.localName || "";
  return "#document";
};
function isRootElement(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
var isNode2 = (el) => isObject7(el) && el.nodeType !== void 0;
var isShadowRoot2 = (el) => isNode2(el) && el.nodeType === DOCUMENT_FRAGMENT_NODE2 && "host" in el;
function contains(parent, child) {
  if (!parent || !child)
    return false;
  if (!isHTMLElement2(parent) || !isHTMLElement2(child))
    return false;
  return parent === child || parent.contains(child);
}
function getDocument3(el) {
  if (isDocument3(el))
    return el;
  if (isWindow3(el))
    return el.document;
  return el?.ownerDocument ?? document;
}
function getDocumentElement(el) {
  return getDocument3(el).documentElement;
}
function getWindow2(el) {
  if (isShadowRoot2(el))
    return getWindow2(el.host);
  if (isDocument3(el))
    return el.defaultView ?? window;
  if (isHTMLElement2(el))
    return el.ownerDocument?.defaultView ?? window;
  return window;
}
function getActiveElement3(rootNode) {
  let activeElement = rootNode.activeElement;
  while (activeElement?.shadowRoot) {
    const el = activeElement.shadowRoot.activeElement;
    if (el === activeElement)
      break;
    else
      activeElement = el;
  }
  return activeElement;
}
var isDom2 = () => typeof document !== "undefined";
function getPlatform2() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
var pt2 = (v) => isDom2() && v.test(getPlatform2());
var isMac = () => pt2(/^Mac/);
function getComposedPath2(event) {
  return event.composedPath?.() ?? event.nativeEvent?.composedPath?.();
}
function getEventTarget2(event) {
  const composedPath = getComposedPath2(event);
  return composedPath?.[0] ?? event.target;
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot2(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot2(result) ? result.host : result;
}
var isHTMLElement22 = (element) => typeof element === "object" && element !== null && element.nodeType === 1;
function isVisible(el) {
  if (!isHTMLElement22(el))
    return false;
  return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
}
var focusableSelector = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type";
function isFocusable(element) {
  if (!element || element.closest("[inert]"))
    return false;
  return element.matches(focusableSelector) && isVisible(element);
}
var OVERFLOW_RE = /auto|scroll|overlay|hidden|clip/;
function isOverflowElement(el) {
  const win = getWindow2(el);
  const { overflow, overflowX, overflowY, display } = win.getComputedStyle(el);
  return OVERFLOW_RE.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function raf2(fn) {
  const id = globalThis.requestAnimationFrame(fn);
  return () => {
    globalThis.cancelAnimationFrame(id);
  };
}
function getNearestOverflowAncestor(el) {
  const parentNode = getParentNode(el);
  if (isRootElement(parentNode)) {
    return getDocument3(parentNode).body;
  }
  if (isHTMLElement2(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function createScope3(methods) {
  const dom6 = {
    getRootNode: (ctx) => ctx.getRootNode?.() ?? document,
    getDoc: (ctx) => getDocument3(dom6.getRootNode(ctx)),
    getWin: (ctx) => dom6.getDoc(ctx).defaultView ?? window,
    getActiveElement: (ctx) => getActiveElement3(dom6.getRootNode(ctx)),
    isActiveElement: (ctx, elem) => elem === dom6.getActiveElement(ctx),
    getById: (ctx, id) => dom6.getRootNode(ctx).getElementById(id),
    setValue: (elem, value) => {
      if (elem == null || value == null)
        return;
      const valueAsString = value.toString();
      if (elem.value === valueAsString)
        return;
      elem.value = value.toString();
    }
  };
  return { ...dom6, ...methods };
}
var cleanups = /* @__PURE__ */ new WeakMap();
function set4(element, key, setup) {
  if (!cleanups.has(element)) {
    cleanups.set(element, /* @__PURE__ */ new Map());
  }
  const elementCleanups = cleanups.get(element);
  const prevCleanup = elementCleanups.get(key);
  if (!prevCleanup) {
    elementCleanups.set(key, setup());
    return () => {
      elementCleanups.get(key)?.();
      elementCleanups.delete(key);
    };
  }
  const cleanup = setup();
  const nextCleanup = () => {
    cleanup();
    prevCleanup();
    elementCleanups.delete(key);
  };
  elementCleanups.set(key, nextCleanup);
  return () => {
    const isCurrent = elementCleanups.get(key) === nextCleanup;
    if (!isCurrent)
      return;
    cleanup();
    elementCleanups.set(key, prevCleanup);
  };
}
function setStyle(element, style) {
  if (!element)
    return () => {
    };
  const setup = () => {
    const prevStyle = element.style.cssText;
    Object.assign(element.style, style);
    return () => {
      element.style.cssText = prevStyle;
    };
  };
  return set4(element, "style", setup);
}
var fps3 = 1e3 / 60;
function waitForElement(query2, cb) {
  const el = query2();
  if (isHTMLElement2(el) && el.isConnected) {
    cb(el);
    return () => void 0;
  } else {
    const timerId = setInterval(() => {
      const el2 = query2();
      if (isHTMLElement2(el2) && el2.isConnected) {
        cb(el2);
        clearInterval(timerId);
      }
    }, fps3);
    return () => clearInterval(timerId);
  }
}
function waitForElements(queries, cb) {
  const cleanups22 = [];
  queries?.forEach((query2) => {
    const clean = waitForElement(query2, cb);
    cleanups22.push(clean);
  });
  return () => {
    cleanups22.forEach((fn) => fn());
  };
}

// node_modules/@zag-js/aria-hidden/dist/index.mjs
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = (node) => node && (node.host || unwrapHost(node.parentNode));
var correctTargets = (parent, targets) => targets.map((target) => {
  if (parent.contains(target))
    return target;
  const correctedTarget = unwrapHost(target);
  if (correctedTarget && parent.contains(correctedTarget)) {
    return correctedTarget;
  }
  console.error("[zag-js > ariaHidden] target", target, "in not contained inside", parent, ". Doing nothing");
  return null;
}).filter((x) => Boolean(x));
var isIgnoredNode = (node) => {
  if (node.localName === "next-route-announcer")
    return true;
  if (node.localName === "script")
    return true;
  if (node.hasAttribute("aria-live"))
    return true;
  return node.matches("[data-live-announcer]");
};
var walkTreeOutside = (originalTarget, props6) => {
  const { parentNode, markerName, controlAttribute } = props6;
  const targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  markerMap[markerName] || (markerMap[markerName] = /* @__PURE__ */ new WeakMap());
  const markerCounter = markerMap[markerName];
  const hiddenNodes = [];
  const elementsToKeep = /* @__PURE__ */ new Set();
  const elementsToStop = new Set(targets);
  const keep = (el) => {
    if (!el || elementsToKeep.has(el))
      return;
    elementsToKeep.add(el);
    keep(el.parentNode);
  };
  targets.forEach(keep);
  const deep = (parent) => {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    Array.prototype.forEach.call(parent.children, (node) => {
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        try {
          if (isIgnoredNode(node))
            return;
          const attr = node.getAttribute(controlAttribute);
          const alreadyHidden = attr !== null && attr !== "false";
          const counterValue = (counterMap.get(node) || 0) + 1;
          const markerValue = (markerCounter.get(node) || 0) + 1;
          counterMap.set(node, counterValue);
          markerCounter.set(node, markerValue);
          hiddenNodes.push(node);
          if (counterValue === 1 && alreadyHidden) {
            uncontrolledNodes.set(node, true);
          }
          if (markerValue === 1) {
            node.setAttribute(markerName, "");
          }
          if (!alreadyHidden) {
            node.setAttribute(controlAttribute, "");
          }
        } catch (e) {
          console.error("[zag-js > ariaHidden] cannot operate on ", node, e);
        }
      }
    });
  };
  deep(parentNode);
  elementsToKeep.clear();
  lockCount++;
  return () => {
    hiddenNodes.forEach((node) => {
      const counterValue = counterMap.get(node) - 1;
      const markerValue = markerCounter.get(node) - 1;
      counterMap.set(node, counterValue);
      markerCounter.set(node, markerValue);
      if (!counterValue) {
        if (!uncontrolledNodes.has(node)) {
          node.removeAttribute(controlAttribute);
        }
        uncontrolledNodes.delete(node);
      }
      if (!markerValue) {
        node.removeAttribute(markerName);
      }
    });
    lockCount--;
    if (!lockCount) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledNodes = /* @__PURE__ */ new WeakMap();
      markerMap = {};
    }
  };
};
var getParentNode2 = (originalTarget) => {
  const target = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
  return target.ownerDocument.body;
};
var hideOthers = (originalTarget, parentNode = getParentNode2(originalTarget), markerName = "data-aria-hidden") => {
  if (!parentNode)
    return;
  return walkTreeOutside(originalTarget, {
    parentNode,
    markerName,
    controlAttribute: "aria-hidden"
  });
};
var raf3 = (fn) => {
  const frameId = requestAnimationFrame(() => fn());
  return () => cancelAnimationFrame(frameId);
};
function ariaHidden(targetsOrFn, options = {}) {
  const { defer = true } = options;
  const func = defer ? raf3 : (v) => v();
  const cleanups3 = [];
  cleanups3.push(
    func(() => {
      const targets = typeof targetsOrFn === "function" ? targetsOrFn() : targetsOrFn;
      const elements = targets.filter(Boolean);
      if (elements.length === 0)
        return;
      cleanups3.push(hideOthers(elements));
    })
  );
  return () => {
    cleanups3.forEach((fn) => fn?.());
  };
}

// node_modules/@zag-js/dialog/node_modules/@zag-js/store/dist/index.mjs
function glob3() {
  if (typeof globalThis !== "undefined")
    return globalThis;
  if (typeof self !== "undefined")
    return self;
  if (typeof window !== "undefined")
    return window;
  if (typeof global !== "undefined")
    return global;
}
function globalRef3(key, value) {
  const g = glob3();
  if (!g)
    return value();
  g[key] || (g[key] = value());
  return g[key];
}
var refSet3 = globalRef3("__zag__refSet", () => /* @__PURE__ */ new WeakSet());
var isReactElement3 = (x) => typeof x === "object" && x !== null && "$$typeof" in x && "props" in x;
var isVueElement3 = (x) => typeof x === "object" && x !== null && "__v_isVNode" in x;
var isDOMElement3 = (x) => typeof x === "object" && x !== null && "nodeType" in x && typeof x.nodeName === "string";
var isElement3 = (x) => isReactElement3(x) || isVueElement3(x) || isDOMElement3(x);
var isObject8 = (x) => x !== null && typeof x === "object";
var canProxy3 = (x) => isObject8(x) && !refSet3.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !isElement3(x) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer) && !(x instanceof Promise);
var isDev5 = () => true;
function set5(obj, key, val) {
  if (typeof val.value === "object" && !canProxy3(val.value))
    val.value = clone3(val.value);
  if (!val.enumerable || val.get || val.set || !val.configurable || !val.writable || key === "__proto__") {
    Object.defineProperty(obj, key, val);
  } else
    obj[key] = val.value;
}
function clone3(x) {
  if (typeof x !== "object")
    return x;
  var i = 0, k, list, tmp, str = Object.prototype.toString.call(x);
  if (str === "[object Object]") {
    tmp = Object.create(Object.getPrototypeOf(x) || null);
  } else if (str === "[object Array]") {
    tmp = Array(x.length);
  } else if (str === "[object Set]") {
    tmp = /* @__PURE__ */ new Set();
    x.forEach(function(val) {
      tmp.add(clone3(val));
    });
  } else if (str === "[object Map]") {
    tmp = /* @__PURE__ */ new Map();
    x.forEach(function(val, key) {
      tmp.set(clone3(key), clone3(val));
    });
  } else if (str === "[object Date]") {
    tmp = /* @__PURE__ */ new Date(+x);
  } else if (str === "[object RegExp]") {
    tmp = new RegExp(x.source, x.flags);
  } else if (str === "[object DataView]") {
    tmp = new x.constructor(clone3(x.buffer));
  } else if (str === "[object ArrayBuffer]") {
    tmp = x.slice(0);
  } else if (str === "[object Blob]") {
    tmp = x.slice();
  } else if (str.slice(-6) === "Array]") {
    tmp = new x.constructor(x);
  }
  if (tmp) {
    for (list = Object.getOwnPropertySymbols(x); i < list.length; i++) {
      set5(tmp, list[i], Object.getOwnPropertyDescriptor(x, list[i]));
    }
    for (i = 0, list = Object.getOwnPropertyNames(x); i < list.length; i++) {
      if (Object.hasOwnProperty.call(tmp, k = list[i]) && tmp[k] === x[k])
        continue;
      set5(tmp, k, Object.getOwnPropertyDescriptor(x, k));
    }
  }
  return tmp || x;
}
var proxyStateMap3 = globalRef3("__zag__proxyStateMap", () => /* @__PURE__ */ new WeakMap());
var buildProxyFunction3 = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version) => {
  const cache = snapCache.get(target);
  if (cache?.[0] === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  markToTrack(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    const value = Reflect.get(target, key);
    if (refSet3.has(value)) {
      markToTrack(value, false);
      snap[key] = value;
    } else if (proxyStateMap3.has(value)) {
      snap[key] = snapshot3(value);
    } else {
      snap[key] = value;
    }
  });
  return Object.freeze(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction22 = (initialObject) => {
  if (!isObject8(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if (isDev5() && propProxyStates.has(prop)) {
      throw new Error("prop listener already exists");
    }
    if (listeners.size) {
      const remove2 = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove2]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      entry[1]?.();
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if (isDev5() && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove2 = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove2]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove2], prop) => {
          if (remove2) {
            remove2();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject8(value)) {
        value = getUntracked(value) || value;
      }
      let nextValue = value;
      if (Object.getOwnPropertyDescriptor(target, prop)?.set)
        ;
      else {
        if (!proxyStateMap3.has(value) && canProxy3(value)) {
          nextValue = proxy3(value);
        }
        const childProxyState = !refSet3.has(nextValue) && proxyStateMap3.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [baseObject, ensureVersion, createSnapshot, addListener];
  proxyStateMap3.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(initialObject, key);
    if (desc.get || desc.set) {
      Object.defineProperty(baseObject, key, desc);
    } else {
      proxyObject[key] = initialObject[key];
    }
  });
  return proxyObject;
}) => [
  // public functions
  proxyFunction22,
  // shared state
  proxyStateMap3,
  refSet3,
  // internal things
  objectIs,
  newProxy,
  canProxy3,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
var [proxyFunction3] = buildProxyFunction3();
function proxy3(initialObject = {}) {
  return proxyFunction3(initialObject);
}
function subscribe3(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap3.get(proxyObject);
  if (isDev5() && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot3(proxyObject) {
  const proxyState = proxyStateMap3.get(proxyObject);
  if (isDev5() && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion());
}
function ref3(obj) {
  refSet3.add(obj);
  return obj;
}
function proxyWithComputed3(initialObject, computedFns) {
  const keys = Object.keys(computedFns);
  keys.forEach((key) => {
    if (Object.getOwnPropertyDescriptor(initialObject, key)) {
      throw new Error("object property already defined");
    }
    const computedFn = computedFns[key];
    const { get, set: set22 } = typeof computedFn === "function" ? { get: computedFn } : computedFn;
    const desc = {};
    desc.get = () => get(snapshot3(proxyObject));
    if (set22) {
      desc.set = (newValue) => set22(proxyObject, newValue);
    }
    Object.defineProperty(initialObject, key, desc);
  });
  const proxyObject = proxy3(initialObject);
  return proxyObject;
}

// node_modules/@zag-js/dialog/node_modules/@zag-js/utils/dist/index.mjs
function clear3(v) {
  while (v.length > 0)
    v.pop();
  return v;
}
var runIfFn3 = (v, ...a) => {
  const res = typeof v === "function" ? v(...a) : v;
  return res ?? void 0;
};
var cast3 = (v) => v;
var noop3 = () => {
};
var callAll3 = (...fns) => (...a) => {
  fns.forEach(function(fn) {
    fn?.(...a);
  });
};
var uuid3 = /* @__PURE__ */ (() => {
  let id = 0;
  return () => {
    id++;
    return id.toString(36);
  };
})();
var isDev6 = () => true;
var isArray3 = (v) => Array.isArray(v);
var isObjectLike3 = (v) => v != null && typeof v === "object";
var isObject9 = (v) => isObjectLike3(v) && !isArray3(v);
var isNumber3 = (v) => typeof v === "number" && !Number.isNaN(v);
var isString3 = (v) => typeof v === "string";
var isFunction3 = (v) => typeof v === "function";
var hasProp3 = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
var baseGetTag3 = (v) => Object.prototype.toString.call(v);
var fnToString3 = Function.prototype.toString;
var objectCtorString3 = fnToString3.call(Object);
var isPlainObject4 = (v) => {
  if (!isObjectLike3(v) || baseGetTag3(v) != "[object Object]")
    return false;
  const proto = Object.getPrototypeOf(v);
  if (proto === null)
    return true;
  const Ctor = hasProp3(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && fnToString3.call(Ctor) == objectCtorString3;
};
function splitProps5(props6, keys) {
  const rest = {};
  const result = {};
  const keySet = new Set(keys);
  for (const key in props6) {
    if (keySet.has(key)) {
      result[key] = props6[key];
    } else {
      rest[key] = props6[key];
    }
  }
  return [result, rest];
}
var createSplitProps3 = (keys) => {
  return function split(props6) {
    return splitProps5(props6, keys);
  };
};
function compact3(obj) {
  if (!isPlainObject23(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact3(value);
    }
  }
  return filtered;
}
var isPlainObject23 = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};
function warn3(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && true) {
    console.warn(m);
  }
}
function invariant3(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && true) {
    throw new Error(m);
  }
}

// node_modules/@zag-js/dialog/node_modules/@zag-js/core/dist/index.mjs
var __defProp4 = Object.defineProperty;
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField3 = (obj, key, value) => __defNormalProp3(obj, typeof key !== "symbol" ? key + "" : key, value);
function deepMerge3(source, ...objects) {
  for (const obj of objects) {
    const target = compact3(obj);
    for (const key in target) {
      if (isPlainObject4(obj[key])) {
        if (!source[key]) {
          source[key] = {};
        }
        deepMerge3(source[key], obj[key]);
      } else {
        source[key] = obj[key];
      }
    }
  }
  return source;
}
function toEvent3(event) {
  const obj = isString3(event) ? { type: event } : event;
  return obj;
}
function toArray3(value) {
  if (!value)
    return [];
  return isArray3(value) ? value.slice() : [value];
}
function isGuardHelper3(value) {
  return isObject9(value) && value.predicate != null;
}
var Truthy3 = () => true;
function determineGuardFn3(guard, guardMap) {
  guard = guard ?? Truthy3;
  return (context, event, meta) => {
    if (isString3(guard)) {
      const value = guardMap[guard];
      return isFunction3(value) ? value(context, event, meta) : value;
    }
    if (isGuardHelper3(guard)) {
      return guard.predicate(guardMap)(context, event, meta);
    }
    return guard?.(context, event, meta);
  };
}
function determineActionsFn3(values, guardMap) {
  return (context, event, meta) => {
    if (isGuardHelper3(values)) {
      return values.predicate(guardMap)(context, event, meta);
    }
    return values;
  };
}
function createProxy3(config) {
  const computedContext = config.computed ?? cast3({});
  const initialContext = config.context ?? cast3({});
  const initialTags = config.initial ? config.states?.[config.initial]?.tags : [];
  const state = proxy3({
    value: config.initial ?? "",
    previousValue: "",
    event: cast3({}),
    previousEvent: cast3({}),
    context: proxyWithComputed3(initialContext, computedContext),
    done: false,
    tags: initialTags ?? [],
    hasTag(tag) {
      return this.tags.includes(tag);
    },
    matches(...value) {
      return value.includes(this.value);
    },
    can(event) {
      return cast3(this).nextEvents.includes(event);
    },
    get nextEvents() {
      const stateEvents = config.states?.[this.value]?.["on"] ?? {};
      const globalEvents = config?.on ?? {};
      return Object.keys({ ...stateEvents, ...globalEvents });
    },
    get changed() {
      if (this.event.value === "machine.init" || !this.previousValue)
        return false;
      return this.value !== this.previousValue;
    }
  });
  return cast3(state);
}
function determineDelayFn3(delay2, delaysMap) {
  return (context, event) => {
    if (isNumber3(delay2))
      return delay2;
    if (isFunction3(delay2)) {
      return delay2(context, event);
    }
    if (isString3(delay2)) {
      const value = Number.parseFloat(delay2);
      if (!Number.isNaN(value)) {
        return value;
      }
      if (delaysMap) {
        const valueOrFn = delaysMap?.[delay2];
        invariant3(
          valueOrFn == null,
          `[@zag-js/core > determine-delay] Cannot determine delay for \`${delay2}\`. It doesn't exist in \`options.delays\``
        );
        return isFunction3(valueOrFn) ? valueOrFn(context, event) : valueOrFn;
      }
    }
  };
}
function toTarget3(target) {
  return isString3(target) ? { target } : target;
}
function determineTransitionFn3(transitions, guardMap) {
  return (context, event, meta) => {
    return toArray3(transitions).map(toTarget3).find((transition) => {
      const determineGuard = determineGuardFn3(transition.guard, guardMap);
      const guard = determineGuard(context, event, meta);
      return guard ?? transition.target ?? transition.actions;
    });
  };
}
var Machine3 = class {
  // Let's get started!
  constructor(config, options) {
    __publicField3(
      this,
      "status",
      "Not Started"
      /* NotStarted */
    );
    __publicField3(this, "state");
    __publicField3(this, "initialState");
    __publicField3(this, "initialContext");
    __publicField3(this, "id");
    __publicField3(
      this,
      "type",
      "machine"
      /* Machine */
    );
    __publicField3(this, "activityEvents", /* @__PURE__ */ new Map());
    __publicField3(this, "delayedEvents", /* @__PURE__ */ new Map());
    __publicField3(this, "stateListeners", /* @__PURE__ */ new Set());
    __publicField3(this, "doneListeners", /* @__PURE__ */ new Set());
    __publicField3(this, "contextWatchers", /* @__PURE__ */ new Set());
    __publicField3(this, "removeStateListener", noop3);
    __publicField3(this, "parent");
    __publicField3(this, "children", /* @__PURE__ */ new Map());
    __publicField3(this, "guardMap");
    __publicField3(this, "actionMap");
    __publicField3(this, "delayMap");
    __publicField3(this, "activityMap");
    __publicField3(this, "sync");
    __publicField3(this, "options");
    __publicField3(this, "config");
    __publicField3(this, "_created", () => {
      if (!this.config.created)
        return;
      const event = toEvent3(
        "machine.created"
        /* Created */
      );
      this.executeActions(this.config.created, event);
    });
    __publicField3(this, "start", (init) => {
      this.state.value = "";
      this.state.tags = [];
      if (this.status === "Running") {
        return this;
      }
      this.status = "Running";
      this.removeStateListener = subscribe3(
        this.state,
        () => {
          this.stateListeners.forEach((listener) => {
            listener(this.stateSnapshot);
          });
        },
        this.sync
      );
      this.setupContextWatchers();
      this.executeActivities(
        toEvent3(
          "machine.start"
          /* Start */
        ),
        toArray3(this.config.activities),
        "machine.start"
        /* Start */
      );
      this.executeActions(this.config.entry, toEvent3(
        "machine.start"
        /* Start */
      ));
      const event = toEvent3(
        "machine.init"
        /* Init */
      );
      const target = isObject9(init) ? init.value : init;
      const context = isObject9(init) ? init.context : void 0;
      if (context) {
        this.setContext(context);
      }
      const transition = {
        target: target ?? this.config.initial
      };
      const next = this.getNextStateInfo(transition, event);
      this.initialState = next;
      this.performStateChangeEffects(this.state.value, next, event);
      return this;
    });
    __publicField3(this, "setupContextWatchers", () => {
      const { watch } = this.config;
      if (!watch)
        return;
      let prev = snapshot3(this.state.context);
      const cleanup = subscribe3(this.state.context, () => {
        const next = snapshot3(this.state.context);
        for (const [key, fn] of Object.entries(watch)) {
          const isEqual4 = this.options.compareFns?.[key] ?? Object.is;
          if (isEqual4(prev[key], next[key]))
            continue;
          this.executeActions(fn, this.state.event);
        }
        prev = next;
      });
      this.contextWatchers.add(cleanup);
    });
    __publicField3(this, "stop", () => {
      if (this.status === "Stopped")
        return;
      this.performExitEffects(this.state.value, toEvent3(
        "machine.stop"
        /* Stop */
      ));
      this.executeActions(this.config.exit, toEvent3(
        "machine.stop"
        /* Stop */
      ));
      this.setState("");
      this.setEvent(
        "machine.stop"
        /* Stop */
      );
      this.stopStateListeners();
      this.stopChildren();
      this.stopActivities();
      this.stopDelayedEvents();
      this.stopContextWatchers();
      this.status = "Stopped";
      return this;
    });
    __publicField3(this, "stopStateListeners", () => {
      this.removeStateListener();
      this.stateListeners.clear();
    });
    __publicField3(this, "stopContextWatchers", () => {
      this.contextWatchers.forEach((fn) => fn());
      this.contextWatchers.clear();
    });
    __publicField3(this, "stopDelayedEvents", () => {
      this.delayedEvents.forEach((state) => {
        state.forEach((stop) => stop());
      });
      this.delayedEvents.clear();
    });
    __publicField3(this, "stopActivities", (state) => {
      if (state) {
        this.activityEvents.get(state)?.forEach((stop) => stop());
        this.activityEvents.get(state)?.clear();
        this.activityEvents.delete(state);
      } else {
        this.activityEvents.forEach((state2) => {
          state2.forEach((stop) => stop());
          state2.clear();
        });
        this.activityEvents.clear();
      }
    });
    __publicField3(this, "sendChild", (evt, to) => {
      const event = toEvent3(evt);
      const id = runIfFn3(to, this.contextSnapshot);
      const child = this.children.get(id);
      if (!child) {
        invariant3(`[@zag-js/core] Cannot send '${event.type}' event to unknown child`);
      }
      child.send(event);
    });
    __publicField3(this, "stopChild", (id) => {
      if (!this.children.has(id)) {
        invariant3(`[@zag-js/core > stop-child] Cannot stop unknown child ${id}`);
      }
      this.children.get(id).stop();
      this.children.delete(id);
    });
    __publicField3(this, "removeChild", (id) => {
      this.children.delete(id);
    });
    __publicField3(this, "stopChildren", () => {
      this.children.forEach((child) => child.stop());
      this.children.clear();
    });
    __publicField3(this, "setParent", (parent) => {
      this.parent = parent;
    });
    __publicField3(this, "spawn", (src, id) => {
      const actor = runIfFn3(src);
      if (id)
        actor.id = id;
      actor.type = "machine.actor";
      actor.setParent(this);
      this.children.set(actor.id, cast3(actor));
      actor.onDone(() => {
        this.removeChild(actor.id);
      }).start();
      return cast3(ref3(actor));
    });
    __publicField3(this, "stopActivity", (key) => {
      if (!this.state.value)
        return;
      const cleanups3 = this.activityEvents.get(this.state.value);
      cleanups3?.get(key)?.();
      cleanups3?.delete(key);
    });
    __publicField3(this, "addActivityCleanup", (state, key, cleanup) => {
      if (!state)
        return;
      if (!this.activityEvents.has(state)) {
        this.activityEvents.set(state, /* @__PURE__ */ new Map([[key, cleanup]]));
      } else {
        this.activityEvents.get(state)?.set(key, cleanup);
      }
    });
    __publicField3(this, "setState", (target) => {
      this.state.previousValue = this.state.value;
      this.state.value = target;
      const stateNode = this.getStateNode(target);
      if (target == null) {
        clear3(this.state.tags);
      } else {
        this.state.tags = toArray3(stateNode?.tags);
      }
    });
    __publicField3(this, "setContext", (context) => {
      if (!context)
        return;
      deepMerge3(this.state.context, compact3(context));
    });
    __publicField3(this, "setOptions", (options2) => {
      const opts = compact3(options2);
      this.actionMap = { ...this.actionMap, ...opts.actions };
      this.delayMap = { ...this.delayMap, ...opts.delays };
      this.activityMap = { ...this.activityMap, ...opts.activities };
      this.guardMap = { ...this.guardMap, ...opts.guards };
    });
    __publicField3(this, "getStateNode", (state) => {
      if (!state)
        return;
      return this.config.states?.[state];
    });
    __publicField3(this, "getNextStateInfo", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      const isTargetless = !transition?.target;
      const target = transition?.target ?? this.state.value;
      const changed = this.state.value !== target;
      const stateNode = this.getStateNode(target);
      const reenter = !isTargetless && !changed && !transition?.internal;
      const info = {
        reenter,
        transition,
        stateNode,
        target,
        changed
      };
      this.log("NextState:", `[${event.type}]`, this.state.value, "---->", info.target);
      return info;
    });
    __publicField3(this, "getAfterActions", (transition, delay2) => {
      let id;
      const current = this.state.value;
      return {
        entry: () => {
          id = globalThis.setTimeout(() => {
            const next = this.getNextStateInfo(transition, this.state.event);
            this.performStateChangeEffects(current, next, this.state.event);
          }, delay2);
        },
        exit: () => {
          globalThis.clearTimeout(id);
        }
      };
    });
    __publicField3(this, "getDelayedEventActions", (state) => {
      const stateNode = this.getStateNode(state);
      const event = this.state.event;
      if (!stateNode || !stateNode.after)
        return;
      const entries = [];
      const exits = [];
      if (isArray3(stateNode.after)) {
        const transition = this.determineTransition(stateNode.after, event);
        if (!transition)
          return;
        if (!hasProp3(transition, "delay")) {
          throw new Error(`[@zag-js/core > after] Delay is required for after transition: ${JSON.stringify(transition)}`);
        }
        const determineDelay = determineDelayFn3(transition.delay, this.delayMap);
        const __delay = determineDelay(this.contextSnapshot, event);
        const actions = this.getAfterActions(transition, __delay);
        entries.push(actions.entry);
        exits.push(actions.exit);
        return { entries, exits };
      }
      if (isObject9(stateNode.after)) {
        for (const delay2 in stateNode.after) {
          const transition = stateNode.after[delay2];
          const determineDelay = determineDelayFn3(delay2, this.delayMap);
          const __delay = determineDelay(this.contextSnapshot, event);
          const actions = this.getAfterActions(transition, __delay);
          entries.push(actions.entry);
          exits.push(actions.exit);
        }
      }
      return { entries, exits };
    });
    __publicField3(this, "executeActions", (actions, event) => {
      const pickedActions = determineActionsFn3(actions, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      for (const action of toArray3(pickedActions)) {
        const fn = isString3(action) ? this.actionMap?.[action] : action;
        warn3(
          isString3(action) && !fn,
          `[@zag-js/core > execute-actions] No implementation found for action: \`${action}\``
        );
        fn?.(this.state.context, event, this.meta);
      }
    });
    __publicField3(this, "executeActivities", (event, activities, state) => {
      for (const activity of activities) {
        const fn = isString3(activity) ? this.activityMap?.[activity] : activity;
        if (!fn) {
          warn3(`[@zag-js/core > execute-activity] No implementation found for activity: \`${activity}\``);
          continue;
        }
        const cleanup = fn(this.state.context, event, this.meta);
        if (cleanup) {
          const key = isString3(activity) ? activity : activity.name || uuid3();
          this.addActivityCleanup(state ?? this.state.value, key, cleanup);
        }
      }
    });
    __publicField3(this, "createEveryActivities", (every, callbackfn) => {
      if (!every)
        return;
      if (isArray3(every)) {
        const picked = toArray3(every).find((transition) => {
          const delayOrFn = transition.delay;
          const determineDelay2 = determineDelayFn3(delayOrFn, this.delayMap);
          const delay22 = determineDelay2(this.contextSnapshot, this.state.event);
          const determineGuard = determineGuardFn3(transition.guard, this.guardMap);
          const guard = determineGuard(this.contextSnapshot, this.state.event, this.guardMeta);
          return guard ?? delay22 != null;
        });
        if (!picked)
          return;
        const determineDelay = determineDelayFn3(picked.delay, this.delayMap);
        const delay2 = determineDelay(this.contextSnapshot, this.state.event);
        const activity = () => {
          const id = globalThis.setInterval(() => {
            this.executeActions(picked.actions, this.state.event);
          }, delay2);
          return () => {
            globalThis.clearInterval(id);
          };
        };
        callbackfn(activity);
      } else {
        for (const interval in every) {
          const actions = every?.[interval];
          const determineDelay = determineDelayFn3(interval, this.delayMap);
          const delay2 = determineDelay(this.contextSnapshot, this.state.event);
          const activity = () => {
            const id = globalThis.setInterval(() => {
              this.executeActions(actions, this.state.event);
            }, delay2);
            return () => {
              globalThis.clearInterval(id);
            };
          };
          callbackfn(activity);
        }
      }
    });
    __publicField3(this, "setEvent", (event) => {
      this.state.previousEvent = this.state.event;
      this.state.event = ref3(toEvent3(event));
    });
    __publicField3(this, "performExitEffects", (current, event) => {
      const currentState = this.state.value;
      if (currentState === "")
        return;
      const stateNode = current ? this.getStateNode(current) : void 0;
      this.stopActivities(currentState);
      const _exit = determineActionsFn3(stateNode?.exit, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      const exitActions = toArray3(_exit);
      const afterExitActions = this.delayedEvents.get(currentState);
      if (afterExitActions) {
        exitActions.push(...afterExitActions);
      }
      this.executeActions(exitActions, event);
      this.delayedEvents.delete(currentState);
    });
    __publicField3(this, "performEntryEffects", (next, event) => {
      const stateNode = this.getStateNode(next);
      const activities = toArray3(stateNode?.activities);
      this.createEveryActivities(stateNode?.every, (activity) => {
        activities.unshift(activity);
      });
      if (activities.length > 0) {
        this.executeActivities(event, activities);
      }
      const pickedActions = determineActionsFn3(stateNode?.entry, this.guardMap)(
        this.contextSnapshot,
        event,
        this.guardMeta
      );
      const entryActions = toArray3(pickedActions);
      const afterActions = this.getDelayedEventActions(next);
      if (stateNode?.after && afterActions) {
        this.delayedEvents.set(next, afterActions?.exits);
        entryActions.push(...afterActions.entries);
      }
      this.executeActions(entryActions, event);
      if (stateNode?.type === "final") {
        this.state.done = true;
        this.doneListeners.forEach((listener) => {
          listener(this.stateSnapshot);
        });
        this.stop();
      }
    });
    __publicField3(this, "performTransitionEffects", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      this.executeActions(transition?.actions, event);
    });
    __publicField3(this, "performStateChangeEffects", (current, next, event) => {
      this.setEvent(event);
      const changed = next.changed || next.reenter;
      if (changed) {
        this.performExitEffects(current, event);
      }
      this.performTransitionEffects(next.transition, event);
      this.setState(next.target);
      if (changed) {
        this.performEntryEffects(next.target, event);
      }
    });
    __publicField3(this, "determineTransition", (transition, event) => {
      const fn = determineTransitionFn3(transition, this.guardMap);
      return fn?.(this.contextSnapshot, event, this.guardMeta);
    });
    __publicField3(this, "sendParent", (evt) => {
      if (!this.parent) {
        invariant3("[@zag-js/core > send-parent] Cannot send event to an unknown parent");
      }
      const event = toEvent3(evt);
      this.parent?.send(event);
    });
    __publicField3(this, "log", (...args) => {
      if (isDev6() && this.options.debug) {
        console.log(...args);
      }
    });
    __publicField3(this, "send", (evt) => {
      const event = toEvent3(evt);
      this.transition(this.state.value, event);
    });
    __publicField3(this, "transition", (state, evt) => {
      const stateNode = isString3(state) ? this.getStateNode(state) : state?.stateNode;
      const event = toEvent3(evt);
      if (!stateNode && !this.config.on) {
        const msg = this.status === "Stopped" ? "[@zag-js/core > transition] Cannot transition a stopped machine" : `[@zag-js/core > transition] State does not have a definition for \`state\`: ${state}, \`event\`: ${event.type}`;
        warn3(msg);
        return;
      }
      const transitions = (
        // @ts-expect-error - Fix this
        stateNode?.on?.[event.type] ?? this.config.on?.[event.type]
      );
      const next = this.getNextStateInfo(transitions, event);
      this.performStateChangeEffects(this.state.value, next, event);
      return next.stateNode;
    });
    __publicField3(this, "subscribe", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return () => {
        this.stateListeners.delete(listener);
      };
    });
    __publicField3(this, "onDone", (listener) => {
      this.doneListeners.add(listener);
      return this;
    });
    __publicField3(this, "onTransition", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return this;
    });
    this.config = clone3(config);
    this.options = clone3(options ?? {});
    this.id = this.config.id ?? `machine-${uuid3()}`;
    this.guardMap = this.options?.guards ?? {};
    this.actionMap = this.options?.actions ?? {};
    this.delayMap = this.options?.delays ?? {};
    this.activityMap = this.options?.activities ?? {};
    this.sync = this.options?.sync ?? false;
    this.state = createProxy3(this.config);
    this.initialContext = snapshot3(this.state.context);
  }
  // immutable state value
  get stateSnapshot() {
    return cast3(snapshot3(this.state));
  }
  getState() {
    return this.stateSnapshot;
  }
  // immutable context value
  get contextSnapshot() {
    return this.stateSnapshot.context;
  }
  /**
   * A reference to the instance methods of the machine.
   * Useful when spawning child machines and managing the communication between them.
   */
  get self() {
    const self2 = this;
    return {
      id: this.id,
      send: this.send.bind(this),
      sendParent: this.sendParent.bind(this),
      sendChild: this.sendChild.bind(this),
      stop: this.stop.bind(this),
      stopChild: this.stopChild.bind(this),
      spawn: this.spawn.bind(this),
      stopActivity: this.stopActivity.bind(this),
      get state() {
        return self2.stateSnapshot;
      },
      get initialContext() {
        return self2.initialContext;
      },
      get initialState() {
        return self2.initialState?.target ?? "";
      }
    };
  }
  get meta() {
    return {
      state: this.stateSnapshot,
      guards: this.guardMap,
      send: this.send.bind(this),
      self: this.self,
      initialContext: this.initialContext,
      initialState: this.initialState?.target ?? "",
      getState: () => this.stateSnapshot,
      getAction: (key) => this.actionMap[key],
      getGuard: (key) => this.guardMap[key]
    };
  }
  get guardMeta() {
    return {
      state: this.stateSnapshot
    };
  }
  get [Symbol.toStringTag]() {
    return "Machine";
  }
  getHydrationState() {
    const state = this.getState();
    return {
      value: state.value,
      tags: state.tags
    };
  }
};
var createMachine3 = (config, options) => new Machine3(config, options);

// node_modules/@zag-js/dialog/node_modules/@zag-js/dom-event/dist/index.mjs
var addDomEvent = (target, eventName, handler, options) => {
  const node = typeof target === "function" ? target() : target;
  node?.addEventListener(eventName, handler, options);
  return () => {
    node?.removeEventListener(eventName, handler, options);
  };
};
var isContextMenuEvent = (e) => {
  return e.button === 2 || isMac() && e.ctrlKey && e.button === 0;
};
function fireCustomEvent(el, type, init) {
  if (!el)
    return;
  const win = el.ownerDocument.defaultView || window;
  const event = new win.CustomEvent(type, init);
  return el.dispatchEvent(event);
}

// node_modules/@zag-js/dialog/node_modules/@zag-js/interact-outside/dist/index.mjs
function getWindowFrames(win) {
  const frames = {
    each(cb) {
      for (let i = 0; i < win.frames?.length; i += 1) {
        const frame = win.frames[i];
        if (frame)
          cb(frame);
      }
    },
    addEventListener(event, listener, options) {
      frames.each((frame) => {
        try {
          frame.document.addEventListener(event, listener, options);
        } catch {
        }
      });
      return () => {
        try {
          frames.removeEventListener(event, listener, options);
        } catch {
        }
      };
    },
    removeEventListener(event, listener, options) {
      frames.each((frame) => {
        try {
          frame.document.removeEventListener(event, listener, options);
        } catch {
        }
      });
    }
  };
  return frames;
}
function getParentWindow(win) {
  const parent = win.frameElement != null ? win.parent : null;
  return {
    addEventListener: (event, listener, options) => {
      try {
        parent?.addEventListener(event, listener, options);
      } catch {
      }
      return () => {
        try {
          parent?.removeEventListener(event, listener, options);
        } catch {
        }
      };
    },
    removeEventListener: (event, listener, options) => {
      try {
        parent?.removeEventListener(event, listener, options);
      } catch {
      }
    }
  };
}
var POINTER_OUTSIDE_EVENT = "pointerdown.outside";
var FOCUS_OUTSIDE_EVENT = "focus.outside";
function isComposedPathFocusable(composedPath) {
  for (const node of composedPath) {
    if (isHTMLElement2(node) && isFocusable(node))
      return true;
  }
  return false;
}
var isPointerEvent = (event) => "clientY" in event;
function isEventPointWithin(node, event) {
  if (!isPointerEvent(event) || !node)
    return false;
  const rect = node.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0)
    return false;
  return rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
}
function isPointInRect(rect, point) {
  return rect.y <= point.y && point.y <= rect.y + rect.height && rect.x <= point.x && point.x <= rect.x + rect.width;
}
function isEventWithinScrollbar(event, ancestor) {
  if (!ancestor || !isPointerEvent(event))
    return false;
  const isScrollableY = ancestor.scrollHeight > ancestor.clientHeight;
  const onScrollbarY = isScrollableY && event.clientX > ancestor.offsetLeft + ancestor.clientWidth;
  const isScrollableX = ancestor.scrollWidth > ancestor.clientWidth;
  const onScrollbarX = isScrollableX && event.clientY > ancestor.offsetTop + ancestor.clientHeight;
  const rect = {
    x: ancestor.offsetLeft,
    y: ancestor.offsetTop,
    width: ancestor.clientWidth + (isScrollableY ? 16 : 0),
    height: ancestor.clientHeight + (isScrollableX ? 16 : 0)
  };
  const point = {
    x: event.clientX,
    y: event.clientY
  };
  if (!isPointInRect(rect, point))
    return false;
  return onScrollbarY || onScrollbarX;
}
function trackInteractOutsideImpl(node, options) {
  const { exclude, onFocusOutside, onPointerDownOutside, onInteractOutside, defer } = options;
  if (!node)
    return;
  const doc = getDocument3(node);
  const win = getWindow2(node);
  const frames = getWindowFrames(win);
  const parentWin = getParentWindow(win);
  function isEventOutside(event) {
    const target = getEventTarget2(event);
    if (!isHTMLElement2(target))
      return false;
    if (!target.isConnected)
      return false;
    if (contains(node, target))
      return false;
    if (isEventPointWithin(node, event))
      return false;
    const triggerEl = doc.querySelector(`[aria-controls="${node.id}"]`);
    if (triggerEl) {
      const triggerAncestor = getNearestOverflowAncestor(triggerEl);
      if (isEventWithinScrollbar(event, triggerAncestor))
        return false;
    }
    const nodeAncestor = getNearestOverflowAncestor(node);
    if (isEventWithinScrollbar(event, nodeAncestor))
      return false;
    return !exclude?.(target);
  }
  const pointerdownCleanups = /* @__PURE__ */ new Set();
  function onPointerDown(event) {
    function handler() {
      const func = defer ? raf2 : (v) => v();
      const composedPath = event.composedPath?.() ?? [event.target];
      func(() => {
        if (!node || !isEventOutside(event))
          return;
        if (onPointerDownOutside || onInteractOutside) {
          const handler2 = callAll3(onPointerDownOutside, onInteractOutside);
          node.addEventListener(POINTER_OUTSIDE_EVENT, handler2, { once: true });
        }
        fireCustomEvent(node, POINTER_OUTSIDE_EVENT, {
          bubbles: false,
          cancelable: true,
          detail: {
            originalEvent: event,
            contextmenu: isContextMenuEvent(event),
            focusable: isComposedPathFocusable(composedPath)
          }
        });
      });
    }
    if (event.pointerType === "touch") {
      pointerdownCleanups.forEach((fn) => fn());
      pointerdownCleanups.add(addDomEvent(doc, "click", handler, { once: true }));
      pointerdownCleanups.add(parentWin.addEventListener("click", handler, { once: true }));
      pointerdownCleanups.add(frames.addEventListener("click", handler, { once: true }));
    } else {
      handler();
    }
  }
  const cleanups3 = /* @__PURE__ */ new Set();
  const timer = setTimeout(() => {
    cleanups3.add(addDomEvent(doc, "pointerdown", onPointerDown, true));
    cleanups3.add(parentWin.addEventListener("pointerdown", onPointerDown, true));
    cleanups3.add(frames.addEventListener("pointerdown", onPointerDown, true));
  }, 0);
  function onFocusin(event) {
    const func = defer ? raf2 : (v) => v();
    func(() => {
      if (!node || !isEventOutside(event))
        return;
      if (onFocusOutside || onInteractOutside) {
        const handler = callAll3(onFocusOutside, onInteractOutside);
        node.addEventListener(FOCUS_OUTSIDE_EVENT, handler, { once: true });
      }
      fireCustomEvent(node, FOCUS_OUTSIDE_EVENT, {
        bubbles: false,
        cancelable: true,
        detail: {
          originalEvent: event,
          contextmenu: false,
          focusable: isFocusable(getEventTarget2(event))
        }
      });
    });
  }
  cleanups3.add(addDomEvent(doc, "focusin", onFocusin, true));
  cleanups3.add(parentWin.addEventListener("focusin", onFocusin, true));
  cleanups3.add(frames.addEventListener("focusin", onFocusin, true));
  return () => {
    clearTimeout(timer);
    pointerdownCleanups.forEach((fn) => fn());
    cleanups3.forEach((fn) => fn());
  };
}
function trackInteractOutside(nodeOrFn, options) {
  const { defer } = options;
  const func = defer ? raf2 : (v) => v();
  const cleanups3 = [];
  cleanups3.push(
    func(() => {
      const node = typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn;
      cleanups3.push(trackInteractOutsideImpl(node, options));
    })
  );
  return () => {
    cleanups3.forEach((fn) => fn?.());
  };
}

// node_modules/@zag-js/dialog/node_modules/@zag-js/dismissable/dist/index.mjs
function trackEscapeKeydown(node, fn) {
  const handleKeyDown = (event) => {
    if (event.key !== "Escape")
      return;
    if (event.isComposing)
      return;
    fn?.(event);
  };
  return addDomEvent(getDocument3(node), "keydown", handleKeyDown, { capture: true });
}
var layerStack = {
  layers: [],
  branches: [],
  count() {
    return this.layers.length;
  },
  pointerBlockingLayers() {
    return this.layers.filter((layer) => layer.pointerBlocking);
  },
  topMostPointerBlockingLayer() {
    return [...this.pointerBlockingLayers()].slice(-1)[0];
  },
  hasPointerBlockingLayer() {
    return this.pointerBlockingLayers().length > 0;
  },
  isBelowPointerBlockingLayer(node) {
    const index = this.indexOf(node);
    const highestBlockingIndex = this.topMostPointerBlockingLayer() ? this.indexOf(this.topMostPointerBlockingLayer()?.node) : -1;
    return index < highestBlockingIndex;
  },
  isTopMost(node) {
    const layer = this.layers[this.count() - 1];
    return layer?.node === node;
  },
  getNestedLayers(node) {
    return Array.from(this.layers).slice(this.indexOf(node) + 1);
  },
  isInNestedLayer(node, target) {
    return this.getNestedLayers(node).some((layer) => contains(layer.node, target));
  },
  isInBranch(target) {
    return Array.from(this.branches).some((branch) => contains(branch, target));
  },
  add(layer) {
    const num = this.layers.push(layer);
    layer.node.style.setProperty("--layer-index", `${num}`);
  },
  addBranch(node) {
    this.branches.push(node);
  },
  remove(node) {
    const index = this.indexOf(node);
    if (index < 0)
      return;
    if (index < this.count() - 1) {
      const _layers = this.getNestedLayers(node);
      _layers.forEach((layer) => layer.dismiss());
    }
    this.layers.splice(index, 1);
    node.style.removeProperty("--layer-index");
  },
  removeBranch(node) {
    const index = this.branches.indexOf(node);
    if (index >= 0)
      this.branches.splice(index, 1);
  },
  indexOf(node) {
    return this.layers.findIndex((layer) => layer.node === node);
  },
  dismiss(node) {
    this.layers[this.indexOf(node)]?.dismiss();
  },
  clear() {
    this.remove(this.layers[0].node);
  }
};
var originalBodyPointerEvents;
function assignPointerEventToLayers() {
  layerStack.layers.forEach(({ node }) => {
    node.style.pointerEvents = layerStack.isBelowPointerBlockingLayer(node) ? "none" : "auto";
  });
}
function clearPointerEvent(node) {
  node.style.pointerEvents = "";
}
function disablePointerEventsOutside(node, persistentElements) {
  const doc = getDocument3(node);
  const cleanups3 = [];
  if (layerStack.hasPointerBlockingLayer() && !doc.body.hasAttribute("data-inert")) {
    originalBodyPointerEvents = document.body.style.pointerEvents;
    queueMicrotask(() => {
      doc.body.style.pointerEvents = "none";
      doc.body.setAttribute("data-inert", "");
    });
  }
  if (persistentElements) {
    const persistedCleanup = waitForElements(persistentElements, (el) => {
      cleanups3.push(setStyle(el, { pointerEvents: "auto" }));
    });
    cleanups3.push(persistedCleanup);
  }
  return () => {
    if (layerStack.hasPointerBlockingLayer())
      return;
    queueMicrotask(() => {
      doc.body.style.pointerEvents = originalBodyPointerEvents;
      doc.body.removeAttribute("data-inert");
      if (doc.body.style.length === 0)
        doc.body.removeAttribute("style");
    });
    cleanups3.forEach((fn) => fn());
  };
}
function trackDismissableElementImpl(node, options) {
  if (!node) {
    warn3("[@zag-js/dismissable] node is `null` or `undefined`");
    return;
  }
  const { onDismiss, pointerBlocking, exclude: excludeContainers, debug } = options;
  const layer = { dismiss: onDismiss, node, pointerBlocking };
  layerStack.add(layer);
  assignPointerEventToLayers();
  function onPointerDownOutside(event) {
    const target = getEventTarget2(event.detail.originalEvent);
    if (layerStack.isBelowPointerBlockingLayer(node) || layerStack.isInBranch(target))
      return;
    options.onPointerDownOutside?.(event);
    options.onInteractOutside?.(event);
    if (event.defaultPrevented)
      return;
    if (debug) {
      console.log("onPointerDownOutside:", event.detail.originalEvent);
    }
    onDismiss?.();
  }
  function onFocusOutside(event) {
    const target = getEventTarget2(event.detail.originalEvent);
    if (layerStack.isInBranch(target))
      return;
    options.onFocusOutside?.(event);
    options.onInteractOutside?.(event);
    if (event.defaultPrevented)
      return;
    if (debug) {
      console.log("onFocusOutside:", event.detail.originalEvent);
    }
    onDismiss?.();
  }
  function onEscapeKeyDown(event) {
    if (!layerStack.isTopMost(node))
      return;
    options.onEscapeKeyDown?.(event);
    if (!event.defaultPrevented && onDismiss) {
      event.preventDefault();
      onDismiss();
    }
  }
  function exclude(target) {
    if (!node)
      return false;
    const containers = typeof excludeContainers === "function" ? excludeContainers() : excludeContainers;
    const _containers = Array.isArray(containers) ? containers : [containers];
    const persistentElements = options.persistentElements?.map((fn) => fn()).filter(isHTMLElement2);
    if (persistentElements)
      _containers.push(...persistentElements);
    return _containers.some((node2) => contains(node2, target)) || layerStack.isInNestedLayer(node, target);
  }
  const cleanups3 = [
    pointerBlocking ? disablePointerEventsOutside(node, options.persistentElements) : void 0,
    trackEscapeKeydown(node, onEscapeKeyDown),
    trackInteractOutside(node, { exclude, onFocusOutside, onPointerDownOutside, defer: options.defer })
  ];
  return () => {
    layerStack.remove(node);
    assignPointerEventToLayers();
    clearPointerEvent(node);
    cleanups3.forEach((fn) => fn?.());
  };
}
function trackDismissableElement(nodeOrFn, options) {
  const { defer } = options;
  const func = defer ? raf2 : (v) => v();
  const cleanups3 = [];
  cleanups3.push(
    func(() => {
      const node = isFunction3(nodeOrFn) ? nodeOrFn() : nodeOrFn;
      cleanups3.push(trackDismissableElementImpl(node, options));
    })
  );
  return () => {
    func(() => {
      cleanups3.forEach((fn) => fn?.());
    });
  };
}

// node_modules/@zag-js/focus-trap/node_modules/@zag-js/dom-query/dist/index.mjs
var addDomEvent2 = (target, eventName, handler, options) => {
  const node = typeof target === "function" ? target() : target;
  node?.addEventListener(eventName, handler, options);
  return () => {
    node?.removeEventListener(eventName, handler, options);
  };
};
var DOCUMENT_NODE4 = 9;
var isObject10 = (v) => typeof v === "object" && v !== null;
var isDocument4 = (el) => isObject10(el) && el.nodeType === DOCUMENT_NODE4;
var isWindow4 = (el) => isObject10(el) && el === el.window;
function getDocument4(el) {
  if (isDocument4(el))
    return el;
  if (isWindow4(el))
    return el.document;
  return el?.ownerDocument ?? document;
}
function getActiveElement4(rootNode) {
  let activeElement = rootNode.activeElement;
  while (activeElement?.shadowRoot) {
    const el = activeElement.shadowRoot.activeElement;
    if (el === activeElement)
      break;
    else
      activeElement = el;
  }
  return activeElement;
}
function getComposedPath3(event) {
  return event.composedPath?.() ?? event.nativeEvent?.composedPath?.();
}
function getEventTarget3(event) {
  const composedPath = getComposedPath3(event);
  return composedPath?.[0] ?? event.target;
}
var isHTMLElement23 = (element) => typeof element === "object" && element !== null && element.nodeType === 1;
var isFrame = (element) => isHTMLElement23(element) && element.tagName === "IFRAME";
function isVisible2(el) {
  if (!isHTMLElement23(el))
    return false;
  return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
}
function hasNegativeTabIndex(element) {
  const tabIndex = parseInt(element.getAttribute("tabindex") || "0", 10);
  return tabIndex < 0;
}
var focusableSelector2 = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type";
var getFocusables = (container, includeContainer = false) => {
  if (!container)
    return [];
  const elements = Array.from(container.querySelectorAll(focusableSelector2));
  const include = includeContainer == true || includeContainer == "if-empty" && elements.length === 0;
  if (include && isHTMLElement23(container) && isFocusable2(container)) {
    elements.unshift(container);
  }
  const focusableElements = elements.filter(isFocusable2);
  focusableElements.forEach((element, i) => {
    if (isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      focusableElements.splice(i, 1, ...getFocusables(frameBody));
    }
  });
  return focusableElements;
};
function isFocusable2(element) {
  if (!element || element.closest("[inert]"))
    return false;
  return element.matches(focusableSelector2) && isVisible2(element);
}
function getTabbables(container, includeContainer) {
  if (!container)
    return [];
  const elements = Array.from(container.querySelectorAll(focusableSelector2));
  const tabbableElements = elements.filter(isTabbable);
  if (includeContainer && isTabbable(container)) {
    tabbableElements.unshift(container);
  }
  tabbableElements.forEach((element, i) => {
    if (isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      const allFrameTabbable = getTabbables(frameBody);
      tabbableElements.splice(i, 1, ...allFrameTabbable);
    }
  });
  if (!tabbableElements.length && includeContainer) {
    return elements;
  }
  return tabbableElements;
}
function isTabbable(el) {
  if (el != null && el.tabIndex > 0)
    return true;
  return isFocusable2(el) && !hasNegativeTabIndex(el);
}
var hasTabIndex = (node) => !Number.isNaN(parseInt(node.getAttribute("tabindex") || "0", 10));
var isContentEditable = (node) => (
  // @ts-ignore
  node.isContentEditable || node.getAttribute("contenteditable") === "true" || node.getAttribute("contenteditable") === ""
);
function getTabIndex(node) {
  if (node.tabIndex < 0) {
    if ((/^(audio|video|details)$/.test(node.localName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
}
function raf4(fn) {
  const id = globalThis.requestAnimationFrame(fn);
  return () => {
    globalThis.cancelAnimationFrame(id);
  };
}
var fps4 = 1e3 / 60;

// node_modules/@zag-js/focus-trap/dist/index.mjs
var __defProp5 = Object.defineProperty;
var __defNormalProp4 = (obj, key, value) => key in obj ? __defProp5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField4 = (obj, key, value) => __defNormalProp4(obj, typeof key !== "symbol" ? key + "" : key, value);
var activeFocusTraps = {
  activateTrap(trapStack, trap) {
    if (trapStack.length > 0) {
      const activeTrap = trapStack[trapStack.length - 1];
      if (activeTrap !== trap) {
        activeTrap.pause();
      }
    }
    const trapIndex = trapStack.indexOf(trap);
    if (trapIndex === -1) {
      trapStack.push(trap);
    } else {
      trapStack.splice(trapIndex, 1);
      trapStack.push(trap);
    }
  },
  deactivateTrap(trapStack, trap) {
    const trapIndex = trapStack.indexOf(trap);
    if (trapIndex !== -1) {
      trapStack.splice(trapIndex, 1);
    }
    if (trapStack.length > 0) {
      trapStack[trapStack.length - 1].unpause();
    }
  }
};
var sharedTrapStack = [];
var FocusTrap = class {
  constructor(elements, options) {
    __publicField4(this, "trapStack");
    __publicField4(this, "config");
    __publicField4(this, "doc");
    __publicField4(this, "state", {
      containers: [],
      containerGroups: [],
      tabbableGroups: [],
      nodeFocusedBeforeActivation: null,
      mostRecentlyFocusedNode: null,
      active: false,
      paused: false,
      delayInitialFocusTimer: void 0,
      recentNavEvent: void 0
    });
    __publicField4(this, "listenerCleanups", []);
    __publicField4(this, "handleFocus", (event) => {
      const target = getEventTarget3(event);
      const targetContained = this.findContainerIndex(target, event) >= 0;
      if (targetContained || isDocument4(target)) {
        if (targetContained) {
          this.state.mostRecentlyFocusedNode = target;
        }
      } else {
        event.stopImmediatePropagation();
        let nextNode;
        let navAcrossContainers = true;
        if (this.state.mostRecentlyFocusedNode) {
          if (getTabIndex(this.state.mostRecentlyFocusedNode) > 0) {
            const mruContainerIdx = this.findContainerIndex(this.state.mostRecentlyFocusedNode);
            const { tabbableNodes } = this.state.containerGroups[mruContainerIdx];
            if (tabbableNodes.length > 0) {
              const mruTabIdx = tabbableNodes.findIndex((node) => node === this.state.mostRecentlyFocusedNode);
              if (mruTabIdx >= 0) {
                if (this.config.isKeyForward(this.state.recentNavEvent)) {
                  if (mruTabIdx + 1 < tabbableNodes.length) {
                    nextNode = tabbableNodes[mruTabIdx + 1];
                    navAcrossContainers = false;
                  }
                } else {
                  if (mruTabIdx - 1 >= 0) {
                    nextNode = tabbableNodes[mruTabIdx - 1];
                    navAcrossContainers = false;
                  }
                }
              }
            }
          } else {
            if (!this.state.containerGroups.some((g) => g.tabbableNodes.some((n) => getTabIndex(n) > 0))) {
              navAcrossContainers = false;
            }
          }
        } else {
          navAcrossContainers = false;
        }
        if (navAcrossContainers) {
          nextNode = this.findNextNavNode({
            // move FROM the MRU node, not event-related node (which will be the node that is
            //  outside the trap causing the focus escape we're trying to fix)
            target: this.state.mostRecentlyFocusedNode,
            isBackward: this.config.isKeyBackward(this.state.recentNavEvent)
          });
        }
        if (nextNode) {
          this.tryFocus(nextNode);
        } else {
          this.tryFocus(this.state.mostRecentlyFocusedNode || this.getInitialFocusNode());
        }
      }
      this.state.recentNavEvent = void 0;
    });
    __publicField4(this, "handlePointerDown", (event) => {
      const target = getEventTarget3(event);
      if (this.findContainerIndex(target, event) >= 0) {
        return;
      }
      if (valueOrHandler(this.config.clickOutsideDeactivates, event)) {
        this.deactivate({ returnFocus: this.config.returnFocusOnDeactivate });
        return;
      }
      if (valueOrHandler(this.config.allowOutsideClick, event)) {
        return;
      }
      event.preventDefault();
    });
    __publicField4(this, "handleClick", (event) => {
      const target = getEventTarget3(event);
      if (this.findContainerIndex(target, event) >= 0) {
        return;
      }
      if (valueOrHandler(this.config.clickOutsideDeactivates, event)) {
        return;
      }
      if (valueOrHandler(this.config.allowOutsideClick, event)) {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
    });
    __publicField4(this, "handleTabKey", (event) => {
      if (this.config.isKeyForward(event) || this.config.isKeyBackward(event)) {
        this.state.recentNavEvent = event;
        const isBackward = this.config.isKeyBackward(event);
        const destinationNode = this.findNextNavNode({ event, isBackward });
        if (!destinationNode)
          return;
        if (isTabEvent(event)) {
          event.preventDefault();
        }
        this.tryFocus(destinationNode);
      }
    });
    __publicField4(this, "handleEscapeKey", (event) => {
      if (isEscapeEvent(event) && valueOrHandler(this.config.escapeDeactivates, event) !== false) {
        event.preventDefault();
        this.deactivate();
      }
    });
    __publicField4(this, "_mutationObserver");
    __publicField4(this, "setupMutationObserver", () => {
      const win = this.doc.defaultView || window;
      this._mutationObserver = new win.MutationObserver((mutations) => {
        const isFocusedNodeRemoved = mutations.some((mutation) => {
          const removedNodes = Array.from(mutation.removedNodes);
          return removedNodes.some((node) => node === this.state.mostRecentlyFocusedNode);
        });
        if (isFocusedNodeRemoved) {
          this.tryFocus(this.getInitialFocusNode());
        }
      });
    });
    __publicField4(this, "updateObservedNodes", () => {
      this._mutationObserver?.disconnect();
      if (this.state.active && !this.state.paused) {
        this.state.containers.map((container) => {
          this._mutationObserver?.observe(container, { subtree: true, childList: true });
        });
      }
    });
    __publicField4(this, "getInitialFocusNode", () => {
      let node = this.getNodeForOption("initialFocus", { hasFallback: true });
      if (node === false) {
        return false;
      }
      if (node === void 0 || node && !isFocusable2(node)) {
        if (this.findContainerIndex(this.doc.activeElement) >= 0) {
          node = this.doc.activeElement;
        } else {
          const firstTabbableGroup = this.state.tabbableGroups[0];
          const firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
          node = firstTabbableNode || this.getNodeForOption("fallbackFocus");
        }
      } else if (node === null) {
        node = this.getNodeForOption("fallbackFocus");
      }
      if (!node) {
        throw new Error("Your focus-trap needs to have at least one focusable element");
      }
      if (!node.isConnected) {
        node = this.getNodeForOption("fallbackFocus");
      }
      return node;
    });
    __publicField4(this, "tryFocus", (node) => {
      if (node === false)
        return;
      if (node === getActiveElement4(this.doc))
        return;
      if (!node || !node.focus) {
        this.tryFocus(this.getInitialFocusNode());
        return;
      }
      node.focus({ preventScroll: !!this.config.preventScroll });
      this.state.mostRecentlyFocusedNode = node;
      if (isSelectableInput(node)) {
        node.select();
      }
    });
    __publicField4(this, "deactivate", (deactivateOptions) => {
      if (!this.state.active)
        return this;
      const options2 = {
        onDeactivate: this.config.onDeactivate,
        onPostDeactivate: this.config.onPostDeactivate,
        checkCanReturnFocus: this.config.checkCanReturnFocus,
        ...deactivateOptions
      };
      clearTimeout(this.state.delayInitialFocusTimer);
      this.state.delayInitialFocusTimer = void 0;
      this.removeListeners();
      this.state.active = false;
      this.state.paused = false;
      this.updateObservedNodes();
      activeFocusTraps.deactivateTrap(this.trapStack, this);
      const onDeactivate = this.getOption(options2, "onDeactivate");
      const onPostDeactivate = this.getOption(options2, "onPostDeactivate");
      const checkCanReturnFocus = this.getOption(options2, "checkCanReturnFocus");
      const returnFocus = this.getOption(options2, "returnFocus", "returnFocusOnDeactivate");
      onDeactivate?.();
      const finishDeactivation = () => {
        delay(() => {
          if (returnFocus) {
            const returnFocusNode = this.getReturnFocusNode(this.state.nodeFocusedBeforeActivation);
            this.tryFocus(returnFocusNode);
          }
          onPostDeactivate?.();
        });
      };
      if (returnFocus && checkCanReturnFocus) {
        const returnFocusNode = this.getReturnFocusNode(this.state.nodeFocusedBeforeActivation);
        checkCanReturnFocus(returnFocusNode).then(finishDeactivation, finishDeactivation);
        return this;
      }
      finishDeactivation();
      return this;
    });
    __publicField4(this, "pause", (pauseOptions) => {
      if (this.state.paused || !this.state.active) {
        return this;
      }
      const onPause = this.getOption(pauseOptions, "onPause");
      const onPostPause = this.getOption(pauseOptions, "onPostPause");
      this.state.paused = true;
      onPause?.();
      this.removeListeners();
      this.updateObservedNodes();
      onPostPause?.();
      return this;
    });
    __publicField4(this, "unpause", (unpauseOptions) => {
      if (!this.state.paused || !this.state.active) {
        return this;
      }
      const onUnpause = this.getOption(unpauseOptions, "onUnpause");
      const onPostUnpause = this.getOption(unpauseOptions, "onPostUnpause");
      this.state.paused = false;
      onUnpause?.();
      this.updateTabbableNodes();
      this.addListeners();
      this.updateObservedNodes();
      onPostUnpause?.();
      return this;
    });
    __publicField4(this, "updateContainerElements", (containerElements) => {
      this.state.containers = Array.isArray(containerElements) ? containerElements.filter(Boolean) : [containerElements].filter(Boolean);
      if (this.state.active) {
        this.updateTabbableNodes();
      }
      this.updateObservedNodes();
      return this;
    });
    __publicField4(this, "getReturnFocusNode", (previousActiveElement) => {
      const node = this.getNodeForOption("setReturnFocus", {
        params: [previousActiveElement]
      });
      return node ? node : node === false ? false : previousActiveElement;
    });
    __publicField4(this, "getOption", (configOverrideOptions, optionName, configOptionName) => {
      return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : (
        // @ts-expect-error
        this.config[configOptionName || optionName]
      );
    });
    __publicField4(this, "getNodeForOption", (optionName, { hasFallback = false, params = [] } = {}) => {
      let optionValue = this.config[optionName];
      if (typeof optionValue === "function")
        optionValue = optionValue(...params);
      if (optionValue === true)
        optionValue = void 0;
      if (!optionValue) {
        if (optionValue === void 0 || optionValue === false) {
          return optionValue;
        }
        throw new Error(`\`${optionName}\` was specified but was not a node, or did not return a node`);
      }
      let node = optionValue;
      if (typeof optionValue === "string") {
        try {
          node = this.doc.querySelector(optionValue);
        } catch (err) {
          throw new Error(`\`${optionName}\` appears to be an invalid selector; error="${err.message}"`);
        }
        if (!node) {
          if (!hasFallback) {
            throw new Error(`\`${optionName}\` as selector refers to no known node`);
          }
        }
      }
      return node;
    });
    __publicField4(this, "findNextNavNode", (opts) => {
      const { event, isBackward = false } = opts;
      const target = opts.target || getEventTarget3(event);
      this.updateTabbableNodes();
      let destinationNode = null;
      if (this.state.tabbableGroups.length > 0) {
        const containerIndex = this.findContainerIndex(target, event);
        const containerGroup = containerIndex >= 0 ? this.state.containerGroups[containerIndex] : void 0;
        if (containerIndex < 0) {
          if (isBackward) {
            destinationNode = this.state.tabbableGroups[this.state.tabbableGroups.length - 1].lastTabbableNode;
          } else {
            destinationNode = this.state.tabbableGroups[0].firstTabbableNode;
          }
        } else if (isBackward) {
          let startOfGroupIndex = this.state.tabbableGroups.findIndex(
            ({ firstTabbableNode }) => target === firstTabbableNode
          );
          if (startOfGroupIndex < 0 && (containerGroup?.container === target || isFocusable2(target) && !isTabbable(target) && !containerGroup?.nextTabbableNode(target, false))) {
            startOfGroupIndex = containerIndex;
          }
          if (startOfGroupIndex >= 0) {
            const destinationGroupIndex = startOfGroupIndex === 0 ? this.state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
            const destinationGroup = this.state.tabbableGroups[destinationGroupIndex];
            destinationNode = getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode;
          } else if (!isTabEvent(event)) {
            destinationNode = containerGroup?.nextTabbableNode(target, false);
          }
        } else {
          let lastOfGroupIndex = this.state.tabbableGroups.findIndex(
            ({ lastTabbableNode }) => target === lastTabbableNode
          );
          if (lastOfGroupIndex < 0 && (containerGroup?.container === target || isFocusable2(target) && !isTabbable(target) && !containerGroup?.nextTabbableNode(target))) {
            lastOfGroupIndex = containerIndex;
          }
          if (lastOfGroupIndex >= 0) {
            const destinationGroupIndex = lastOfGroupIndex === this.state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
            const destinationGroup = this.state.tabbableGroups[destinationGroupIndex];
            destinationNode = getTabIndex(target) >= 0 ? destinationGroup.firstTabbableNode : destinationGroup.firstDomTabbableNode;
          } else if (!isTabEvent(event)) {
            destinationNode = containerGroup?.nextTabbableNode(target);
          }
        }
      } else {
        destinationNode = this.getNodeForOption("fallbackFocus");
      }
      return destinationNode;
    });
    this.trapStack = options.trapStack || sharedTrapStack;
    const config = {
      returnFocusOnDeactivate: true,
      escapeDeactivates: true,
      delayInitialFocus: true,
      isKeyForward(e) {
        return isTabEvent(e) && !e.shiftKey;
      },
      isKeyBackward(e) {
        return isTabEvent(e) && e.shiftKey;
      },
      ...options
    };
    this.doc = config.document || getDocument4(Array.isArray(elements) ? elements[0] : elements);
    this.config = config;
    this.updateContainerElements(elements);
    this.setupMutationObserver();
  }
  get active() {
    return this.state.active;
  }
  get paused() {
    return this.state.paused;
  }
  findContainerIndex(element, event) {
    const composedPath = typeof event?.composedPath === "function" ? event.composedPath() : void 0;
    return this.state.containerGroups.findIndex(
      ({ container, tabbableNodes }) => container.contains(element) || composedPath?.includes(container) || tabbableNodes.find((node) => node === element)
    );
  }
  updateTabbableNodes() {
    this.state.containerGroups = this.state.containers.map((container) => {
      const tabbableNodes = getTabbables(container);
      const focusableNodes = getFocusables(container);
      const firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : void 0;
      const lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : void 0;
      const firstDomTabbableNode = focusableNodes.find((node) => isTabbable(node));
      const lastDomTabbableNode = focusableNodes.slice().reverse().find((node) => isTabbable(node));
      const posTabIndexesFound = !!tabbableNodes.find((node) => getTabIndex(node) > 0);
      function nextTabbableNode(node, forward = true) {
        const nodeIdx = tabbableNodes.indexOf(node);
        if (nodeIdx < 0) {
          if (forward) {
            return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find((el) => isTabbable(el));
          }
          return focusableNodes.slice(0, focusableNodes.indexOf(node)).reverse().find((el) => isTabbable(el));
        }
        return tabbableNodes[nodeIdx + (forward ? 1 : -1)];
      }
      return {
        container,
        tabbableNodes,
        focusableNodes,
        posTabIndexesFound,
        firstTabbableNode,
        lastTabbableNode,
        firstDomTabbableNode,
        lastDomTabbableNode,
        nextTabbableNode
      };
    });
    this.state.tabbableGroups = this.state.containerGroups.filter((group) => group.tabbableNodes.length > 0);
    if (this.state.tabbableGroups.length <= 0 && !this.getNodeForOption("fallbackFocus")) {
      throw new Error(
        "Your focus-trap must have at least one container with at least one tabbable node in it at all times"
      );
    }
    if (this.state.containerGroups.find((g) => g.posTabIndexesFound) && this.state.containerGroups.length > 1) {
      throw new Error(
        "At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps."
      );
    }
  }
  addListeners() {
    if (!this.state.active)
      return;
    activeFocusTraps.activateTrap(this.trapStack, this);
    this.state.delayInitialFocusTimer = this.config.delayInitialFocus ? delay(() => {
      this.tryFocus(this.getInitialFocusNode());
    }) : this.tryFocus(this.getInitialFocusNode());
    this.listenerCleanups.push(
      addDomEvent2(this.doc, "focusin", this.handleFocus, true),
      addDomEvent2(this.doc, "mousedown", this.handlePointerDown, { capture: true, passive: false }),
      addDomEvent2(this.doc, "touchstart", this.handlePointerDown, { capture: true, passive: false }),
      addDomEvent2(this.doc, "click", this.handleClick, { capture: true, passive: false }),
      addDomEvent2(this.doc, "keydown", this.handleTabKey, { capture: true, passive: false }),
      addDomEvent2(this.doc, "keydown", this.handleEscapeKey)
    );
    return this;
  }
  removeListeners() {
    if (!this.state.active)
      return;
    this.listenerCleanups.forEach((cleanup) => cleanup());
    this.listenerCleanups = [];
    return this;
  }
  activate(activateOptions) {
    if (this.state.active) {
      return this;
    }
    const onActivate = this.getOption(activateOptions, "onActivate");
    const onPostActivate = this.getOption(activateOptions, "onPostActivate");
    const checkCanFocusTrap = this.getOption(activateOptions, "checkCanFocusTrap");
    if (!checkCanFocusTrap) {
      this.updateTabbableNodes();
    }
    this.state.active = true;
    this.state.paused = false;
    this.state.nodeFocusedBeforeActivation = this.doc.activeElement || null;
    onActivate?.();
    const finishActivation = () => {
      if (checkCanFocusTrap) {
        this.updateTabbableNodes();
      }
      this.addListeners();
      this.updateObservedNodes();
      onPostActivate?.();
    };
    if (checkCanFocusTrap) {
      checkCanFocusTrap(this.state.containers.concat()).then(finishActivation, finishActivation);
      return this;
    }
    finishActivation();
    return this;
  }
};
var isTabEvent = (event) => event.key === "Tab";
var valueOrHandler = (value, ...params) => typeof value === "function" ? value(...params) : value;
var isEscapeEvent = (event) => !event.isComposing && event.key === "Escape";
var delay = (fn) => setTimeout(fn, 0);
var isSelectableInput = (node) => node.localName === "input" && "select" in node && typeof node.select === "function";
function trapFocus(el, options = {}) {
  let trap;
  const cleanup = raf4(() => {
    const contentEl = typeof el === "function" ? el() : el;
    if (!contentEl)
      return;
    trap = new FocusTrap(contentEl, {
      escapeDeactivates: false,
      allowOutsideClick: true,
      preventScroll: true,
      returnFocusOnDeactivate: true,
      delayInitialFocus: false,
      fallbackFocus: contentEl,
      ...options,
      document: getDocument4(contentEl)
    });
    try {
      trap.activate();
    } catch {
    }
  });
  return function destroy() {
    trap?.deactivate();
    cleanup();
  };
}

// node_modules/@zag-js/remove-scroll/node_modules/@zag-js/dom-query/dist/index.mjs
var isDom3 = () => typeof document !== "undefined";
function getPlatform3() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
var pt3 = (v) => isDom3() && v.test(getPlatform3());
var isIos = () => pt3(/iP(hone|ad|od)|iOS/);
var fps5 = 1e3 / 60;

// node_modules/@zag-js/remove-scroll/dist/index.mjs
var LOCK_CLASSNAME = "data-scroll-lock";
function assignStyle(el, style) {
  if (!el)
    return;
  const previousStyle = Object.keys(style).reduce(
    (acc, key) => {
      acc[key] = el.style.getPropertyValue(key);
      return acc;
    },
    {}
  );
  Object.assign(el.style, style);
  return () => {
    Object.assign(el.style, previousStyle);
  };
}
function setCSSProperty(el, property, value) {
  if (!el)
    return;
  const previousValue = el.style.getPropertyValue(property);
  el.style.setProperty(property, value);
  return () => {
    if (previousValue) {
      el.style.setProperty(property, previousValue);
    } else {
      el.style.removeProperty(property);
    }
  };
}
function getPaddingProperty(documentElement) {
  const documentLeft = documentElement.getBoundingClientRect().left;
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
  return scrollbarX ? "paddingLeft" : "paddingRight";
}
function preventBodyScroll(_document) {
  const doc = _document ?? document;
  const win = doc.defaultView ?? window;
  const { documentElement, body } = doc;
  const locked = body.hasAttribute(LOCK_CLASSNAME);
  if (locked)
    return;
  body.setAttribute(LOCK_CLASSNAME, "");
  const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
  const setScrollbarWidthProperty = () => setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);
  const paddingProperty = getPaddingProperty(documentElement);
  const setStyle3 = () => assignStyle(body, {
    overflow: "hidden",
    [paddingProperty]: `${scrollbarWidth}px`
  });
  const setIOSStyle = () => {
    const { scrollX, scrollY, visualViewport } = win;
    const offsetLeft = visualViewport?.offsetLeft ?? 0;
    const offsetTop = visualViewport?.offsetTop ?? 0;
    const restoreStyle = assignStyle(body, {
      position: "fixed",
      overflow: "hidden",
      top: `${-(scrollY - Math.floor(offsetTop))}px`,
      left: `${-(scrollX - Math.floor(offsetLeft))}px`,
      right: "0",
      [paddingProperty]: `${scrollbarWidth}px`
    });
    return () => {
      restoreStyle?.();
      win.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
    };
  };
  const cleanups3 = [setScrollbarWidthProperty(), isIos() ? setIOSStyle() : setStyle3()];
  return () => {
    cleanups3.forEach((fn) => fn?.());
    body.removeAttribute(LOCK_CLASSNAME);
  };
}

// node_modules/@zag-js/dialog/node_modules/@zag-js/types/dist/index.mjs
var createProps3 = () => (props6) => Array.from(new Set(props6));

// node_modules/@zag-js/dialog/dist/index.mjs
var anatomy3 = createAnatomy3("dialog").parts(
  "trigger",
  "backdrop",
  "positioner",
  "content",
  "title",
  "description",
  "closeTrigger"
);
var parts3 = anatomy3.build();
var dom3 = createScope3({
  getPositionerId: (ctx) => ctx.ids?.positioner ?? `dialog:${ctx.id}:positioner`,
  getBackdropId: (ctx) => ctx.ids?.backdrop ?? `dialog:${ctx.id}:backdrop`,
  getContentId: (ctx) => ctx.ids?.content ?? `dialog:${ctx.id}:content`,
  getTriggerId: (ctx) => ctx.ids?.trigger ?? `dialog:${ctx.id}:trigger`,
  getTitleId: (ctx) => ctx.ids?.title ?? `dialog:${ctx.id}:title`,
  getDescriptionId: (ctx) => ctx.ids?.description ?? `dialog:${ctx.id}:description`,
  getCloseTriggerId: (ctx) => ctx.ids?.closeTrigger ?? `dialog:${ctx.id}:close`,
  getContentEl: (ctx) => dom3.getById(ctx, dom3.getContentId(ctx)),
  getPositionerEl: (ctx) => dom3.getById(ctx, dom3.getPositionerId(ctx)),
  getBackdropEl: (ctx) => dom3.getById(ctx, dom3.getBackdropId(ctx)),
  getTriggerEl: (ctx) => dom3.getById(ctx, dom3.getTriggerId(ctx)),
  getTitleEl: (ctx) => dom3.getById(ctx, dom3.getTitleId(ctx)),
  getDescriptionEl: (ctx) => dom3.getById(ctx, dom3.getDescriptionId(ctx)),
  getCloseTriggerEl: (ctx) => dom3.getById(ctx, dom3.getCloseTriggerId(ctx))
});
function connect3(state, send, normalize) {
  const ariaLabel = state.context["aria-label"];
  const open = state.matches("open");
  const rendered = state.context.renderedElements;
  return {
    open,
    setOpen(nextOpen) {
      if (nextOpen === open)
        return;
      send(nextOpen ? "OPEN" : "CLOSE");
    },
    getTriggerProps() {
      return normalize.button({
        ...parts3.trigger.attrs,
        dir: state.context.dir,
        id: dom3.getTriggerId(state.context),
        "aria-haspopup": "dialog",
        type: "button",
        "aria-expanded": open,
        "data-state": open ? "open" : "closed",
        "aria-controls": dom3.getContentId(state.context),
        onClick(event) {
          if (event.defaultPrevented)
            return;
          send("TOGGLE");
        }
      });
    },
    getBackdropProps() {
      return normalize.element({
        ...parts3.backdrop.attrs,
        dir: state.context.dir,
        hidden: !open,
        id: dom3.getBackdropId(state.context),
        "data-state": open ? "open" : "closed"
      });
    },
    getPositionerProps() {
      return normalize.element({
        ...parts3.positioner.attrs,
        dir: state.context.dir,
        id: dom3.getPositionerId(state.context),
        style: {
          pointerEvents: open ? void 0 : "none"
        }
      });
    },
    getContentProps() {
      return normalize.element({
        ...parts3.content.attrs,
        dir: state.context.dir,
        role: state.context.role,
        hidden: !open,
        id: dom3.getContentId(state.context),
        tabIndex: -1,
        "data-state": open ? "open" : "closed",
        "aria-modal": true,
        "aria-label": ariaLabel || void 0,
        "aria-labelledby": ariaLabel || !rendered.title ? void 0 : dom3.getTitleId(state.context),
        "aria-describedby": rendered.description ? dom3.getDescriptionId(state.context) : void 0
      });
    },
    getTitleProps() {
      return normalize.element({
        ...parts3.title.attrs,
        dir: state.context.dir,
        id: dom3.getTitleId(state.context)
      });
    },
    getDescriptionProps() {
      return normalize.element({
        ...parts3.description.attrs,
        dir: state.context.dir,
        id: dom3.getDescriptionId(state.context)
      });
    },
    getCloseTriggerProps() {
      return normalize.button({
        ...parts3.closeTrigger.attrs,
        dir: state.context.dir,
        id: dom3.getCloseTriggerId(state.context),
        type: "button",
        onClick(event) {
          if (event.defaultPrevented)
            return;
          event.stopPropagation();
          send("CLOSE");
        }
      });
    }
  };
}
function machine3(userContext) {
  const ctx = compact3(userContext);
  return createMachine3(
    {
      id: "dialog",
      initial: ctx.open ? "open" : "closed",
      context: {
        role: "dialog",
        renderedElements: {
          title: true,
          description: true
        },
        modal: true,
        trapFocus: true,
        preventScroll: true,
        closeOnInteractOutside: true,
        closeOnEscape: true,
        restoreFocus: true,
        ...ctx
      },
      created: ["setAlertDialogProps"],
      watch: {
        open: ["toggleVisibility"]
      },
      states: {
        open: {
          entry: ["checkRenderedElements", "syncZIndex"],
          activities: ["trackDismissableElement", "trapFocus", "preventScroll", "hideContentBelow"],
          on: {
            "CONTROLLED.CLOSE": {
              target: "closed"
            },
            CLOSE: [
              {
                guard: "isOpenControlled",
                actions: ["invokeOnClose"]
              },
              {
                target: "closed",
                actions: ["invokeOnClose"]
              }
            ],
            TOGGLE: [
              {
                guard: "isOpenControlled",
                actions: ["invokeOnClose"]
              },
              {
                target: "closed",
                actions: ["invokeOnClose"]
              }
            ]
          }
        },
        closed: {
          on: {
            "CONTROLLED.OPEN": {
              target: "open"
            },
            OPEN: [
              {
                guard: "isOpenControlled",
                actions: ["invokeOnOpen"]
              },
              {
                target: "open",
                actions: ["invokeOnOpen"]
              }
            ],
            TOGGLE: [
              {
                guard: "isOpenControlled",
                actions: ["invokeOnOpen"]
              },
              {
                target: "open",
                actions: ["invokeOnOpen"]
              }
            ]
          }
        }
      }
    },
    {
      guards: {
        isOpenControlled: (ctx2) => !!ctx2["open.controlled"]
      },
      activities: {
        trackDismissableElement(ctx2, _evt, { send }) {
          const getContentEl = () => dom3.getContentEl(ctx2);
          return trackDismissableElement(getContentEl, {
            defer: true,
            pointerBlocking: ctx2.modal,
            exclude: [dom3.getTriggerEl(ctx2)],
            onInteractOutside(event) {
              ctx2.onInteractOutside?.(event);
              if (!ctx2.closeOnInteractOutside) {
                event.preventDefault();
              }
            },
            persistentElements: ctx2.persistentElements,
            onFocusOutside: ctx2.onFocusOutside,
            onPointerDownOutside: ctx2.onPointerDownOutside,
            onEscapeKeyDown(event) {
              ctx2.onEscapeKeyDown?.(event);
              if (!ctx2.closeOnEscape) {
                event.preventDefault();
              }
            },
            onDismiss() {
              send({ type: "CLOSE", src: "interact-outside" });
            }
          });
        },
        preventScroll(ctx2) {
          if (!ctx2.preventScroll)
            return;
          return preventBodyScroll(dom3.getDoc(ctx2));
        },
        trapFocus(ctx2) {
          if (!ctx2.trapFocus || !ctx2.modal)
            return;
          const contentEl = () => dom3.getContentEl(ctx2);
          return trapFocus(contentEl, {
            preventScroll: true,
            returnFocusOnDeactivate: !!ctx2.restoreFocus,
            initialFocus: ctx2.initialFocusEl,
            setReturnFocus: (el) => ctx2.finalFocusEl?.() ?? el
          });
        },
        hideContentBelow(ctx2) {
          if (!ctx2.modal)
            return;
          const getElements = () => [dom3.getContentEl(ctx2)];
          return ariaHidden(getElements, { defer: true });
        }
      },
      actions: {
        setAlertDialogProps(ctx2) {
          if (ctx2.role !== "alertdialog")
            return;
          ctx2.initialFocusEl || (ctx2.initialFocusEl = () => dom3.getCloseTriggerEl(ctx2));
          ctx2.closeOnInteractOutside = false;
        },
        checkRenderedElements(ctx2) {
          raf2(() => {
            ctx2.renderedElements.title = !!dom3.getTitleEl(ctx2);
            ctx2.renderedElements.description = !!dom3.getDescriptionEl(ctx2);
          });
        },
        syncZIndex(ctx2) {
          raf2(() => {
            const contentEl = dom3.getContentEl(ctx2);
            if (!contentEl)
              return;
            const win = dom3.getWin(ctx2);
            const styles = win.getComputedStyle(contentEl);
            const elems = [dom3.getPositionerEl(ctx2), dom3.getBackdropEl(ctx2)];
            elems.forEach((node) => {
              node?.style.setProperty("--z-index", styles.zIndex);
            });
          });
        },
        invokeOnClose(ctx2) {
          ctx2.onOpenChange?.({ open: false });
        },
        invokeOnOpen(ctx2) {
          ctx2.onOpenChange?.({ open: true });
        },
        toggleVisibility(ctx2, evt, { send }) {
          send({ type: ctx2.open ? "CONTROLLED.OPEN" : "CONTROLLED.CLOSE", previousEvent: evt });
        }
      }
    }
  );
}
var props3 = createProps3()([
  "aria-label",
  "closeOnEscape",
  "closeOnInteractOutside",
  "dir",
  "finalFocusEl",
  "getRootNode",
  "getRootNode",
  "id",
  "id",
  "ids",
  "initialFocusEl",
  "modal",
  "onEscapeKeyDown",
  "onFocusOutside",
  "onInteractOutside",
  "onOpenChange",
  "onPointerDownOutside",
  "open.controlled",
  "open",
  "persistentElements",
  "preventScroll",
  "restoreFocus",
  "role",
  "trapFocus"
]);
var splitProps6 = createSplitProps3(props3);

// js/widgex/dialog.ts
var Dialog = class extends Component {
  initService(context) {
    return machine3(context);
  }
  initApi() {
    return connect3(this.service.state, this.service.send, normalizeProps);
  }
  render() {
    const parts6 = ["trigger", "backdrop", "positioner", "content", "title", "description", "close-trigger"];
    for (const part of parts6)
      renderPart(this.el, part, this.api);
  }
};
var dialog_default = {
  mounted() {
    this.dialog = new Dialog(this.el, this.context());
    this.dialog.init();
  },
  updated() {
    this.dialog.render();
  },
  beforeDestroy() {
    this.dialog.destroy();
  },
  context() {
    let role = this.el.dataset.role;
    const validRoles = ["dialog", "alertdialog"];
    if (role !== void 0 && !validRoles.includes(role)) {
      console.error(`Invalid 'role' specified: '${role}'. Expected 'dialog' or 'alertdialog'.`);
      role = void 0;
    }
    return {
      id: this.el.id,
      role,
      preventScroll: this.el.dataset.preventScroll === "true" || this.el.dataset.preventScroll === "",
      closeOnInteractOutside: this.el.dataset.closeOnInteractOutside === "true" || this.el.dataset.closeOnInteractOutside === "",
      closeOnEscape: this.el.dataset.closeOnEscape === "true" || this.el.dataset.closeOnEscape === "",
      onOpenChange: (details) => {
        if (this.el.dataset.onOpenChange) {
          this.pushEvent(this.el.dataset.onOpenChange, details);
        }
      }
    };
  }
};

// node_modules/@zag-js/menu/node_modules/@zag-js/anatomy/dist/index.mjs
var createAnatomy4 = (name, parts6 = []) => ({
  parts: (...values) => {
    if (isEmpty4(parts6)) {
      return createAnatomy4(name, values);
    }
    throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
  },
  extendWith: (...values) => createAnatomy4(name, [...parts6, ...values]),
  rename: (newName) => createAnatomy4(newName, parts6),
  keys: () => parts6,
  build: () => [...new Set(parts6)].reduce(
    (prev, part) => Object.assign(prev, {
      [part]: {
        selector: [
          `&[data-scope="${toKebabCase4(name)}"][data-part="${toKebabCase4(part)}"]`,
          `& [data-scope="${toKebabCase4(name)}"][data-part="${toKebabCase4(part)}"]`
        ].join(", "),
        attrs: { "data-scope": toKebabCase4(name), "data-part": toKebabCase4(part) }
      }
    }),
    {}
  )
});
var toKebabCase4 = (value) => value.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
var isEmpty4 = (v) => v.length === 0;

// node_modules/@zag-js/menu/node_modules/@zag-js/store/dist/index.mjs
function glob4() {
  if (typeof globalThis !== "undefined")
    return globalThis;
  if (typeof self !== "undefined")
    return self;
  if (typeof window !== "undefined")
    return window;
  if (typeof global !== "undefined")
    return global;
}
function globalRef4(key, value) {
  const g = glob4();
  if (!g)
    return value();
  g[key] || (g[key] = value());
  return g[key];
}
var refSet4 = globalRef4("__zag__refSet", () => /* @__PURE__ */ new WeakSet());
var isReactElement4 = (x) => typeof x === "object" && x !== null && "$$typeof" in x && "props" in x;
var isVueElement4 = (x) => typeof x === "object" && x !== null && "__v_isVNode" in x;
var isDOMElement4 = (x) => typeof x === "object" && x !== null && "nodeType" in x && typeof x.nodeName === "string";
var isElement4 = (x) => isReactElement4(x) || isVueElement4(x) || isDOMElement4(x);
var isObject11 = (x) => x !== null && typeof x === "object";
var canProxy4 = (x) => isObject11(x) && !refSet4.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !isElement4(x) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer) && !(x instanceof Promise);
var isDev7 = () => true;
function set6(obj, key, val) {
  if (typeof val.value === "object" && !canProxy4(val.value))
    val.value = clone4(val.value);
  if (!val.enumerable || val.get || val.set || !val.configurable || !val.writable || key === "__proto__") {
    Object.defineProperty(obj, key, val);
  } else
    obj[key] = val.value;
}
function clone4(x) {
  if (typeof x !== "object")
    return x;
  var i = 0, k, list, tmp, str = Object.prototype.toString.call(x);
  if (str === "[object Object]") {
    tmp = Object.create(Object.getPrototypeOf(x) || null);
  } else if (str === "[object Array]") {
    tmp = Array(x.length);
  } else if (str === "[object Set]") {
    tmp = /* @__PURE__ */ new Set();
    x.forEach(function(val) {
      tmp.add(clone4(val));
    });
  } else if (str === "[object Map]") {
    tmp = /* @__PURE__ */ new Map();
    x.forEach(function(val, key) {
      tmp.set(clone4(key), clone4(val));
    });
  } else if (str === "[object Date]") {
    tmp = /* @__PURE__ */ new Date(+x);
  } else if (str === "[object RegExp]") {
    tmp = new RegExp(x.source, x.flags);
  } else if (str === "[object DataView]") {
    tmp = new x.constructor(clone4(x.buffer));
  } else if (str === "[object ArrayBuffer]") {
    tmp = x.slice(0);
  } else if (str === "[object Blob]") {
    tmp = x.slice();
  } else if (str.slice(-6) === "Array]") {
    tmp = new x.constructor(x);
  }
  if (tmp) {
    for (list = Object.getOwnPropertySymbols(x); i < list.length; i++) {
      set6(tmp, list[i], Object.getOwnPropertyDescriptor(x, list[i]));
    }
    for (i = 0, list = Object.getOwnPropertyNames(x); i < list.length; i++) {
      if (Object.hasOwnProperty.call(tmp, k = list[i]) && tmp[k] === x[k])
        continue;
      set6(tmp, k, Object.getOwnPropertyDescriptor(x, k));
    }
  }
  return tmp || x;
}
var proxyStateMap4 = globalRef4("__zag__proxyStateMap", () => /* @__PURE__ */ new WeakMap());
var buildProxyFunction4 = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version) => {
  const cache = snapCache.get(target);
  if (cache?.[0] === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  markToTrack(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    const value = Reflect.get(target, key);
    if (refSet4.has(value)) {
      markToTrack(value, false);
      snap[key] = value;
    } else if (proxyStateMap4.has(value)) {
      snap[key] = snapshot4(value);
    } else {
      snap[key] = value;
    }
  });
  return Object.freeze(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction22 = (initialObject) => {
  if (!isObject11(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if (isDev7() && propProxyStates.has(prop)) {
      throw new Error("prop listener already exists");
    }
    if (listeners.size) {
      const remove2 = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove2]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      entry[1]?.();
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if (isDev7() && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove2 = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove2]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove2], prop) => {
          if (remove2) {
            remove2();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject11(value)) {
        value = getUntracked(value) || value;
      }
      let nextValue = value;
      if (Object.getOwnPropertyDescriptor(target, prop)?.set)
        ;
      else {
        if (!proxyStateMap4.has(value) && canProxy4(value)) {
          nextValue = proxy4(value);
        }
        const childProxyState = !refSet4.has(nextValue) && proxyStateMap4.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [baseObject, ensureVersion, createSnapshot, addListener];
  proxyStateMap4.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(initialObject, key);
    if (desc.get || desc.set) {
      Object.defineProperty(baseObject, key, desc);
    } else {
      proxyObject[key] = initialObject[key];
    }
  });
  return proxyObject;
}) => [
  // public functions
  proxyFunction22,
  // shared state
  proxyStateMap4,
  refSet4,
  // internal things
  objectIs,
  newProxy,
  canProxy4,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
var [proxyFunction4] = buildProxyFunction4();
function proxy4(initialObject = {}) {
  return proxyFunction4(initialObject);
}
function subscribe4(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap4.get(proxyObject);
  if (isDev7() && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot4(proxyObject) {
  const proxyState = proxyStateMap4.get(proxyObject);
  if (isDev7() && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion());
}
function ref4(obj) {
  refSet4.add(obj);
  return obj;
}
function proxyWithComputed4(initialObject, computedFns) {
  const keys = Object.keys(computedFns);
  keys.forEach((key) => {
    if (Object.getOwnPropertyDescriptor(initialObject, key)) {
      throw new Error("object property already defined");
    }
    const computedFn = computedFns[key];
    const { get, set: set22 } = typeof computedFn === "function" ? { get: computedFn } : computedFn;
    const desc = {};
    desc.get = () => get(snapshot4(proxyObject));
    if (set22) {
      desc.set = (newValue) => set22(proxyObject, newValue);
    }
    Object.defineProperty(initialObject, key, desc);
  });
  const proxyObject = proxy4(initialObject);
  return proxyObject;
}

// node_modules/@zag-js/menu/node_modules/@zag-js/utils/dist/index.mjs
var first2 = (v) => v[0];
var last2 = (v) => v[v.length - 1];
function clear4(v) {
  while (v.length > 0)
    v.pop();
  return v;
}
var isArrayLike2 = (value) => value?.constructor.name === "Array";
var isArrayEqual2 = (a, b) => {
  if (a.length !== b.length)
    return false;
  for (let i = 0; i < a.length; i++) {
    if (!isEqual2(a[i], b[i]))
      return false;
  }
  return true;
};
var isEqual2 = (a, b) => {
  if (Object.is(a, b))
    return true;
  if (a == null && b != null || a != null && b == null)
    return false;
  if (typeof a?.isEqual === "function" && typeof b?.isEqual === "function") {
    return a.isEqual(b);
  }
  if (typeof a === "function" && typeof b === "function") {
    return a.toString() === b.toString();
  }
  if (isArrayLike2(a) && isArrayLike2(b)) {
    return isArrayEqual2(Array.from(a), Array.from(b));
  }
  if (!(typeof a === "object") || !(typeof b === "object"))
    return false;
  const keys = Object.keys(b ?? /* @__PURE__ */ Object.create(null));
  const length = keys.length;
  for (let i = 0; i < length; i++) {
    const hasKey = Reflect.has(a, keys[i]);
    if (!hasKey)
      return false;
  }
  for (let i = 0; i < length; i++) {
    const key = keys[i];
    if (!isEqual2(a[key], b[key]))
      return false;
  }
  return true;
};
var runIfFn4 = (v, ...a) => {
  const res = typeof v === "function" ? v(...a) : v;
  return res ?? void 0;
};
var cast4 = (v) => v;
var noop4 = () => {
};
var callAll4 = (...fns) => (...a) => {
  fns.forEach(function(fn) {
    fn?.(...a);
  });
};
var uuid4 = /* @__PURE__ */ (() => {
  let id = 0;
  return () => {
    id++;
    return id.toString(36);
  };
})();
var isDev8 = () => true;
var isArray4 = (v) => Array.isArray(v);
var isObjectLike4 = (v) => v != null && typeof v === "object";
var isObject12 = (v) => isObjectLike4(v) && !isArray4(v);
var isNumber4 = (v) => typeof v === "number" && !Number.isNaN(v);
var isString4 = (v) => typeof v === "string";
var isFunction4 = (v) => typeof v === "function";
var hasProp4 = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
var baseGetTag4 = (v) => Object.prototype.toString.call(v);
var fnToString4 = Function.prototype.toString;
var objectCtorString4 = fnToString4.call(Object);
var isPlainObject5 = (v) => {
  if (!isObjectLike4(v) || baseGetTag4(v) != "[object Object]")
    return false;
  const proto = Object.getPrototypeOf(v);
  if (proto === null)
    return true;
  const Ctor = hasProp4(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && fnToString4.call(Ctor) == objectCtorString4;
};
function splitProps7(props6, keys) {
  const rest = {};
  const result = {};
  const keySet = new Set(keys);
  for (const key in props6) {
    if (keySet.has(key)) {
      result[key] = props6[key];
    } else {
      rest[key] = props6[key];
    }
  }
  return [result, rest];
}
var createSplitProps4 = (keys) => {
  return function split(props6) {
    return splitProps7(props6, keys);
  };
};
function compact4(obj) {
  if (!isPlainObject24(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact4(value);
    }
  }
  return filtered;
}
var isPlainObject24 = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};
function warn4(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && true) {
    console.warn(m);
  }
}
function invariant4(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && true) {
    throw new Error(m);
  }
}

// node_modules/@zag-js/menu/node_modules/@zag-js/core/dist/index.mjs
var __defProp6 = Object.defineProperty;
var __defNormalProp5 = (obj, key, value) => key in obj ? __defProp6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField5 = (obj, key, value) => __defNormalProp5(obj, typeof key !== "symbol" ? key + "" : key, value);
function deepMerge4(source, ...objects) {
  for (const obj of objects) {
    const target = compact4(obj);
    for (const key in target) {
      if (isPlainObject5(obj[key])) {
        if (!source[key]) {
          source[key] = {};
        }
        deepMerge4(source[key], obj[key]);
      } else {
        source[key] = obj[key];
      }
    }
  }
  return source;
}
function toEvent4(event) {
  const obj = isString4(event) ? { type: event } : event;
  return obj;
}
function toArray4(value) {
  if (!value)
    return [];
  return isArray4(value) ? value.slice() : [value];
}
function isGuardHelper4(value) {
  return isObject12(value) && value.predicate != null;
}
var Truthy4 = () => true;
function exec2(guardMap, ctx, event, meta) {
  return (guard) => {
    if (isString4(guard)) {
      return !!guardMap[guard]?.(ctx, event, meta);
    }
    if (isFunction4(guard)) {
      return guard(ctx, event, meta);
    }
    return guard.predicate(guardMap)(ctx, event, meta);
  };
}
function or2(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec2(guardMap, ctx, event, meta)).some(Boolean)
  };
}
function and3(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec2(guardMap, ctx, event, meta)).every(Boolean)
  };
}
function not3(condition) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => {
      return !exec2(guardMap, ctx, event, meta)(condition);
    }
  };
}
function stateIn2(...values) {
  return (_ctx, _evt, meta) => meta.state.matches(...values);
}
var guards2 = { or: or2, and: and3, not: not3, stateIn: stateIn2 };
function determineGuardFn4(guard, guardMap) {
  guard = guard ?? Truthy4;
  return (context, event, meta) => {
    if (isString4(guard)) {
      const value = guardMap[guard];
      return isFunction4(value) ? value(context, event, meta) : value;
    }
    if (isGuardHelper4(guard)) {
      return guard.predicate(guardMap)(context, event, meta);
    }
    return guard?.(context, event, meta);
  };
}
function determineActionsFn4(values, guardMap) {
  return (context, event, meta) => {
    if (isGuardHelper4(values)) {
      return values.predicate(guardMap)(context, event, meta);
    }
    return values;
  };
}
function createProxy4(config) {
  const computedContext = config.computed ?? cast4({});
  const initialContext = config.context ?? cast4({});
  const initialTags = config.initial ? config.states?.[config.initial]?.tags : [];
  const state = proxy4({
    value: config.initial ?? "",
    previousValue: "",
    event: cast4({}),
    previousEvent: cast4({}),
    context: proxyWithComputed4(initialContext, computedContext),
    done: false,
    tags: initialTags ?? [],
    hasTag(tag) {
      return this.tags.includes(tag);
    },
    matches(...value) {
      return value.includes(this.value);
    },
    can(event) {
      return cast4(this).nextEvents.includes(event);
    },
    get nextEvents() {
      const stateEvents = config.states?.[this.value]?.["on"] ?? {};
      const globalEvents = config?.on ?? {};
      return Object.keys({ ...stateEvents, ...globalEvents });
    },
    get changed() {
      if (this.event.value === "machine.init" || !this.previousValue)
        return false;
      return this.value !== this.previousValue;
    }
  });
  return cast4(state);
}
function determineDelayFn4(delay2, delaysMap) {
  return (context, event) => {
    if (isNumber4(delay2))
      return delay2;
    if (isFunction4(delay2)) {
      return delay2(context, event);
    }
    if (isString4(delay2)) {
      const value = Number.parseFloat(delay2);
      if (!Number.isNaN(value)) {
        return value;
      }
      if (delaysMap) {
        const valueOrFn = delaysMap?.[delay2];
        invariant4(
          valueOrFn == null,
          `[@zag-js/core > determine-delay] Cannot determine delay for \`${delay2}\`. It doesn't exist in \`options.delays\``
        );
        return isFunction4(valueOrFn) ? valueOrFn(context, event) : valueOrFn;
      }
    }
  };
}
function toTarget4(target) {
  return isString4(target) ? { target } : target;
}
function determineTransitionFn4(transitions, guardMap) {
  return (context, event, meta) => {
    return toArray4(transitions).map(toTarget4).find((transition) => {
      const determineGuard = determineGuardFn4(transition.guard, guardMap);
      const guard = determineGuard(context, event, meta);
      return guard ?? transition.target ?? transition.actions;
    });
  };
}
var Machine4 = class {
  // Let's get started!
  constructor(config, options) {
    __publicField5(
      this,
      "status",
      "Not Started"
      /* NotStarted */
    );
    __publicField5(this, "state");
    __publicField5(this, "initialState");
    __publicField5(this, "initialContext");
    __publicField5(this, "id");
    __publicField5(
      this,
      "type",
      "machine"
      /* Machine */
    );
    __publicField5(this, "activityEvents", /* @__PURE__ */ new Map());
    __publicField5(this, "delayedEvents", /* @__PURE__ */ new Map());
    __publicField5(this, "stateListeners", /* @__PURE__ */ new Set());
    __publicField5(this, "doneListeners", /* @__PURE__ */ new Set());
    __publicField5(this, "contextWatchers", /* @__PURE__ */ new Set());
    __publicField5(this, "removeStateListener", noop4);
    __publicField5(this, "parent");
    __publicField5(this, "children", /* @__PURE__ */ new Map());
    __publicField5(this, "guardMap");
    __publicField5(this, "actionMap");
    __publicField5(this, "delayMap");
    __publicField5(this, "activityMap");
    __publicField5(this, "sync");
    __publicField5(this, "options");
    __publicField5(this, "config");
    __publicField5(this, "_created", () => {
      if (!this.config.created)
        return;
      const event = toEvent4(
        "machine.created"
        /* Created */
      );
      this.executeActions(this.config.created, event);
    });
    __publicField5(this, "start", (init) => {
      this.state.value = "";
      this.state.tags = [];
      if (this.status === "Running") {
        return this;
      }
      this.status = "Running";
      this.removeStateListener = subscribe4(
        this.state,
        () => {
          this.stateListeners.forEach((listener) => {
            listener(this.stateSnapshot);
          });
        },
        this.sync
      );
      this.setupContextWatchers();
      this.executeActivities(
        toEvent4(
          "machine.start"
          /* Start */
        ),
        toArray4(this.config.activities),
        "machine.start"
        /* Start */
      );
      this.executeActions(this.config.entry, toEvent4(
        "machine.start"
        /* Start */
      ));
      const event = toEvent4(
        "machine.init"
        /* Init */
      );
      const target = isObject12(init) ? init.value : init;
      const context = isObject12(init) ? init.context : void 0;
      if (context) {
        this.setContext(context);
      }
      const transition = {
        target: target ?? this.config.initial
      };
      const next = this.getNextStateInfo(transition, event);
      this.initialState = next;
      this.performStateChangeEffects(this.state.value, next, event);
      return this;
    });
    __publicField5(this, "setupContextWatchers", () => {
      const { watch } = this.config;
      if (!watch)
        return;
      let prev = snapshot4(this.state.context);
      const cleanup = subscribe4(this.state.context, () => {
        const next = snapshot4(this.state.context);
        for (const [key, fn] of Object.entries(watch)) {
          const isEqual4 = this.options.compareFns?.[key] ?? Object.is;
          if (isEqual4(prev[key], next[key]))
            continue;
          this.executeActions(fn, this.state.event);
        }
        prev = next;
      });
      this.contextWatchers.add(cleanup);
    });
    __publicField5(this, "stop", () => {
      if (this.status === "Stopped")
        return;
      this.performExitEffects(this.state.value, toEvent4(
        "machine.stop"
        /* Stop */
      ));
      this.executeActions(this.config.exit, toEvent4(
        "machine.stop"
        /* Stop */
      ));
      this.setState("");
      this.setEvent(
        "machine.stop"
        /* Stop */
      );
      this.stopStateListeners();
      this.stopChildren();
      this.stopActivities();
      this.stopDelayedEvents();
      this.stopContextWatchers();
      this.status = "Stopped";
      return this;
    });
    __publicField5(this, "stopStateListeners", () => {
      this.removeStateListener();
      this.stateListeners.clear();
    });
    __publicField5(this, "stopContextWatchers", () => {
      this.contextWatchers.forEach((fn) => fn());
      this.contextWatchers.clear();
    });
    __publicField5(this, "stopDelayedEvents", () => {
      this.delayedEvents.forEach((state) => {
        state.forEach((stop) => stop());
      });
      this.delayedEvents.clear();
    });
    __publicField5(this, "stopActivities", (state) => {
      if (state) {
        this.activityEvents.get(state)?.forEach((stop) => stop());
        this.activityEvents.get(state)?.clear();
        this.activityEvents.delete(state);
      } else {
        this.activityEvents.forEach((state2) => {
          state2.forEach((stop) => stop());
          state2.clear();
        });
        this.activityEvents.clear();
      }
    });
    __publicField5(this, "sendChild", (evt, to) => {
      const event = toEvent4(evt);
      const id = runIfFn4(to, this.contextSnapshot);
      const child = this.children.get(id);
      if (!child) {
        invariant4(`[@zag-js/core] Cannot send '${event.type}' event to unknown child`);
      }
      child.send(event);
    });
    __publicField5(this, "stopChild", (id) => {
      if (!this.children.has(id)) {
        invariant4(`[@zag-js/core > stop-child] Cannot stop unknown child ${id}`);
      }
      this.children.get(id).stop();
      this.children.delete(id);
    });
    __publicField5(this, "removeChild", (id) => {
      this.children.delete(id);
    });
    __publicField5(this, "stopChildren", () => {
      this.children.forEach((child) => child.stop());
      this.children.clear();
    });
    __publicField5(this, "setParent", (parent) => {
      this.parent = parent;
    });
    __publicField5(this, "spawn", (src, id) => {
      const actor = runIfFn4(src);
      if (id)
        actor.id = id;
      actor.type = "machine.actor";
      actor.setParent(this);
      this.children.set(actor.id, cast4(actor));
      actor.onDone(() => {
        this.removeChild(actor.id);
      }).start();
      return cast4(ref4(actor));
    });
    __publicField5(this, "stopActivity", (key) => {
      if (!this.state.value)
        return;
      const cleanups3 = this.activityEvents.get(this.state.value);
      cleanups3?.get(key)?.();
      cleanups3?.delete(key);
    });
    __publicField5(this, "addActivityCleanup", (state, key, cleanup) => {
      if (!state)
        return;
      if (!this.activityEvents.has(state)) {
        this.activityEvents.set(state, /* @__PURE__ */ new Map([[key, cleanup]]));
      } else {
        this.activityEvents.get(state)?.set(key, cleanup);
      }
    });
    __publicField5(this, "setState", (target) => {
      this.state.previousValue = this.state.value;
      this.state.value = target;
      const stateNode = this.getStateNode(target);
      if (target == null) {
        clear4(this.state.tags);
      } else {
        this.state.tags = toArray4(stateNode?.tags);
      }
    });
    __publicField5(this, "setContext", (context) => {
      if (!context)
        return;
      deepMerge4(this.state.context, compact4(context));
    });
    __publicField5(this, "setOptions", (options2) => {
      const opts = compact4(options2);
      this.actionMap = { ...this.actionMap, ...opts.actions };
      this.delayMap = { ...this.delayMap, ...opts.delays };
      this.activityMap = { ...this.activityMap, ...opts.activities };
      this.guardMap = { ...this.guardMap, ...opts.guards };
    });
    __publicField5(this, "getStateNode", (state) => {
      if (!state)
        return;
      return this.config.states?.[state];
    });
    __publicField5(this, "getNextStateInfo", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      const isTargetless = !transition?.target;
      const target = transition?.target ?? this.state.value;
      const changed = this.state.value !== target;
      const stateNode = this.getStateNode(target);
      const reenter = !isTargetless && !changed && !transition?.internal;
      const info = {
        reenter,
        transition,
        stateNode,
        target,
        changed
      };
      this.log("NextState:", `[${event.type}]`, this.state.value, "---->", info.target);
      return info;
    });
    __publicField5(this, "getAfterActions", (transition, delay2) => {
      let id;
      const current = this.state.value;
      return {
        entry: () => {
          id = globalThis.setTimeout(() => {
            const next = this.getNextStateInfo(transition, this.state.event);
            this.performStateChangeEffects(current, next, this.state.event);
          }, delay2);
        },
        exit: () => {
          globalThis.clearTimeout(id);
        }
      };
    });
    __publicField5(this, "getDelayedEventActions", (state) => {
      const stateNode = this.getStateNode(state);
      const event = this.state.event;
      if (!stateNode || !stateNode.after)
        return;
      const entries = [];
      const exits = [];
      if (isArray4(stateNode.after)) {
        const transition = this.determineTransition(stateNode.after, event);
        if (!transition)
          return;
        if (!hasProp4(transition, "delay")) {
          throw new Error(`[@zag-js/core > after] Delay is required for after transition: ${JSON.stringify(transition)}`);
        }
        const determineDelay = determineDelayFn4(transition.delay, this.delayMap);
        const __delay = determineDelay(this.contextSnapshot, event);
        const actions = this.getAfterActions(transition, __delay);
        entries.push(actions.entry);
        exits.push(actions.exit);
        return { entries, exits };
      }
      if (isObject12(stateNode.after)) {
        for (const delay2 in stateNode.after) {
          const transition = stateNode.after[delay2];
          const determineDelay = determineDelayFn4(delay2, this.delayMap);
          const __delay = determineDelay(this.contextSnapshot, event);
          const actions = this.getAfterActions(transition, __delay);
          entries.push(actions.entry);
          exits.push(actions.exit);
        }
      }
      return { entries, exits };
    });
    __publicField5(this, "executeActions", (actions, event) => {
      const pickedActions = determineActionsFn4(actions, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      for (const action of toArray4(pickedActions)) {
        const fn = isString4(action) ? this.actionMap?.[action] : action;
        warn4(
          isString4(action) && !fn,
          `[@zag-js/core > execute-actions] No implementation found for action: \`${action}\``
        );
        fn?.(this.state.context, event, this.meta);
      }
    });
    __publicField5(this, "executeActivities", (event, activities, state) => {
      for (const activity of activities) {
        const fn = isString4(activity) ? this.activityMap?.[activity] : activity;
        if (!fn) {
          warn4(`[@zag-js/core > execute-activity] No implementation found for activity: \`${activity}\``);
          continue;
        }
        const cleanup = fn(this.state.context, event, this.meta);
        if (cleanup) {
          const key = isString4(activity) ? activity : activity.name || uuid4();
          this.addActivityCleanup(state ?? this.state.value, key, cleanup);
        }
      }
    });
    __publicField5(this, "createEveryActivities", (every, callbackfn) => {
      if (!every)
        return;
      if (isArray4(every)) {
        const picked = toArray4(every).find((transition) => {
          const delayOrFn = transition.delay;
          const determineDelay2 = determineDelayFn4(delayOrFn, this.delayMap);
          const delay22 = determineDelay2(this.contextSnapshot, this.state.event);
          const determineGuard = determineGuardFn4(transition.guard, this.guardMap);
          const guard = determineGuard(this.contextSnapshot, this.state.event, this.guardMeta);
          return guard ?? delay22 != null;
        });
        if (!picked)
          return;
        const determineDelay = determineDelayFn4(picked.delay, this.delayMap);
        const delay2 = determineDelay(this.contextSnapshot, this.state.event);
        const activity = () => {
          const id = globalThis.setInterval(() => {
            this.executeActions(picked.actions, this.state.event);
          }, delay2);
          return () => {
            globalThis.clearInterval(id);
          };
        };
        callbackfn(activity);
      } else {
        for (const interval in every) {
          const actions = every?.[interval];
          const determineDelay = determineDelayFn4(interval, this.delayMap);
          const delay2 = determineDelay(this.contextSnapshot, this.state.event);
          const activity = () => {
            const id = globalThis.setInterval(() => {
              this.executeActions(actions, this.state.event);
            }, delay2);
            return () => {
              globalThis.clearInterval(id);
            };
          };
          callbackfn(activity);
        }
      }
    });
    __publicField5(this, "setEvent", (event) => {
      this.state.previousEvent = this.state.event;
      this.state.event = ref4(toEvent4(event));
    });
    __publicField5(this, "performExitEffects", (current, event) => {
      const currentState = this.state.value;
      if (currentState === "")
        return;
      const stateNode = current ? this.getStateNode(current) : void 0;
      this.stopActivities(currentState);
      const _exit = determineActionsFn4(stateNode?.exit, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      const exitActions = toArray4(_exit);
      const afterExitActions = this.delayedEvents.get(currentState);
      if (afterExitActions) {
        exitActions.push(...afterExitActions);
      }
      this.executeActions(exitActions, event);
      this.delayedEvents.delete(currentState);
    });
    __publicField5(this, "performEntryEffects", (next, event) => {
      const stateNode = this.getStateNode(next);
      const activities = toArray4(stateNode?.activities);
      this.createEveryActivities(stateNode?.every, (activity) => {
        activities.unshift(activity);
      });
      if (activities.length > 0) {
        this.executeActivities(event, activities);
      }
      const pickedActions = determineActionsFn4(stateNode?.entry, this.guardMap)(
        this.contextSnapshot,
        event,
        this.guardMeta
      );
      const entryActions = toArray4(pickedActions);
      const afterActions = this.getDelayedEventActions(next);
      if (stateNode?.after && afterActions) {
        this.delayedEvents.set(next, afterActions?.exits);
        entryActions.push(...afterActions.entries);
      }
      this.executeActions(entryActions, event);
      if (stateNode?.type === "final") {
        this.state.done = true;
        this.doneListeners.forEach((listener) => {
          listener(this.stateSnapshot);
        });
        this.stop();
      }
    });
    __publicField5(this, "performTransitionEffects", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      this.executeActions(transition?.actions, event);
    });
    __publicField5(this, "performStateChangeEffects", (current, next, event) => {
      this.setEvent(event);
      const changed = next.changed || next.reenter;
      if (changed) {
        this.performExitEffects(current, event);
      }
      this.performTransitionEffects(next.transition, event);
      this.setState(next.target);
      if (changed) {
        this.performEntryEffects(next.target, event);
      }
    });
    __publicField5(this, "determineTransition", (transition, event) => {
      const fn = determineTransitionFn4(transition, this.guardMap);
      return fn?.(this.contextSnapshot, event, this.guardMeta);
    });
    __publicField5(this, "sendParent", (evt) => {
      if (!this.parent) {
        invariant4("[@zag-js/core > send-parent] Cannot send event to an unknown parent");
      }
      const event = toEvent4(evt);
      this.parent?.send(event);
    });
    __publicField5(this, "log", (...args) => {
      if (isDev8() && this.options.debug) {
        console.log(...args);
      }
    });
    __publicField5(this, "send", (evt) => {
      const event = toEvent4(evt);
      this.transition(this.state.value, event);
    });
    __publicField5(this, "transition", (state, evt) => {
      const stateNode = isString4(state) ? this.getStateNode(state) : state?.stateNode;
      const event = toEvent4(evt);
      if (!stateNode && !this.config.on) {
        const msg = this.status === "Stopped" ? "[@zag-js/core > transition] Cannot transition a stopped machine" : `[@zag-js/core > transition] State does not have a definition for \`state\`: ${state}, \`event\`: ${event.type}`;
        warn4(msg);
        return;
      }
      const transitions = (
        // @ts-expect-error - Fix this
        stateNode?.on?.[event.type] ?? this.config.on?.[event.type]
      );
      const next = this.getNextStateInfo(transitions, event);
      this.performStateChangeEffects(this.state.value, next, event);
      return next.stateNode;
    });
    __publicField5(this, "subscribe", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return () => {
        this.stateListeners.delete(listener);
      };
    });
    __publicField5(this, "onDone", (listener) => {
      this.doneListeners.add(listener);
      return this;
    });
    __publicField5(this, "onTransition", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return this;
    });
    this.config = clone4(config);
    this.options = clone4(options ?? {});
    this.id = this.config.id ?? `machine-${uuid4()}`;
    this.guardMap = this.options?.guards ?? {};
    this.actionMap = this.options?.actions ?? {};
    this.delayMap = this.options?.delays ?? {};
    this.activityMap = this.options?.activities ?? {};
    this.sync = this.options?.sync ?? false;
    this.state = createProxy4(this.config);
    this.initialContext = snapshot4(this.state.context);
  }
  // immutable state value
  get stateSnapshot() {
    return cast4(snapshot4(this.state));
  }
  getState() {
    return this.stateSnapshot;
  }
  // immutable context value
  get contextSnapshot() {
    return this.stateSnapshot.context;
  }
  /**
   * A reference to the instance methods of the machine.
   * Useful when spawning child machines and managing the communication between them.
   */
  get self() {
    const self2 = this;
    return {
      id: this.id,
      send: this.send.bind(this),
      sendParent: this.sendParent.bind(this),
      sendChild: this.sendChild.bind(this),
      stop: this.stop.bind(this),
      stopChild: this.stopChild.bind(this),
      spawn: this.spawn.bind(this),
      stopActivity: this.stopActivity.bind(this),
      get state() {
        return self2.stateSnapshot;
      },
      get initialContext() {
        return self2.initialContext;
      },
      get initialState() {
        return self2.initialState?.target ?? "";
      }
    };
  }
  get meta() {
    return {
      state: this.stateSnapshot,
      guards: this.guardMap,
      send: this.send.bind(this),
      self: this.self,
      initialContext: this.initialContext,
      initialState: this.initialState?.target ?? "",
      getState: () => this.stateSnapshot,
      getAction: (key) => this.actionMap[key],
      getGuard: (key) => this.guardMap[key]
    };
  }
  get guardMeta() {
    return {
      state: this.stateSnapshot
    };
  }
  get [Symbol.toStringTag]() {
    return "Machine";
  }
  getHydrationState() {
    const state = this.getState();
    return {
      value: state.value,
      tags: state.tags
    };
  }
};
var createMachine4 = (config, options) => new Machine4(config, options);
var clsx = (...args) => args.map((str) => str?.trim?.()).filter(Boolean).join(" ");
var CSS_REGEX = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
var serialize = (style) => {
  const res = {};
  let match2;
  while (match2 = CSS_REGEX.exec(style)) {
    res[match2[1]] = match2[2];
  }
  return res;
};
var css = (a, b) => {
  if (isString4(a)) {
    if (isString4(b))
      return `${a};${b}`;
    a = serialize(a);
  } else if (isString4(b)) {
    b = serialize(b);
  }
  return Object.assign({}, a ?? {}, b ?? {});
};
function mergeProps(...args) {
  let result = {};
  for (let props6 of args) {
    for (let key in result) {
      if (key.startsWith("on") && typeof result[key] === "function" && typeof props6[key] === "function") {
        result[key] = callAll4(props6[key], result[key]);
        continue;
      }
      if (key === "className" || key === "class") {
        result[key] = clsx(result[key], props6[key]);
        continue;
      }
      if (key === "style") {
        result[key] = css(result[key], props6[key]);
        continue;
      }
      result[key] = props6[key] !== void 0 ? props6[key] : result[key];
    }
    for (let key in props6) {
      if (result[key] === void 0) {
        result[key] = props6[key];
      }
    }
  }
  return result;
}

// node_modules/@zag-js/menu/node_modules/@zag-js/dom-query/dist/index.mjs
var dataAttr3 = (guard) => guard ? "" : void 0;
var ELEMENT_NODE3 = 1;
var DOCUMENT_NODE5 = 9;
var DOCUMENT_FRAGMENT_NODE3 = 11;
var isObject13 = (v) => typeof v === "object" && v !== null;
var isHTMLElement3 = (el) => isObject13(el) && el.nodeType === ELEMENT_NODE3 && typeof el.nodeName === "string";
var isDocument5 = (el) => isObject13(el) && el.nodeType === DOCUMENT_NODE5;
var isWindow5 = (el) => isObject13(el) && el === el.window;
var isNode3 = (el) => isObject13(el) && el.nodeType !== void 0;
var isShadowRoot3 = (el) => isNode3(el) && el.nodeType === DOCUMENT_FRAGMENT_NODE3 && "host" in el;
function contains2(parent, child) {
  if (!parent || !child)
    return false;
  if (!isHTMLElement3(parent) || !isHTMLElement3(child))
    return false;
  return parent === child || parent.contains(child);
}
function getDocument5(el) {
  if (isDocument5(el))
    return el;
  if (isWindow5(el))
    return el.document;
  return el?.ownerDocument ?? document;
}
function getWindow3(el) {
  if (isShadowRoot3(el))
    return getWindow3(el.host);
  if (isDocument5(el))
    return el.defaultView ?? window;
  if (isHTMLElement3(el))
    return el.ownerDocument?.defaultView ?? window;
  return window;
}
function getActiveElement5(rootNode) {
  let activeElement = rootNode.activeElement;
  while (activeElement?.shadowRoot) {
    const el = activeElement.shadowRoot.activeElement;
    if (el === activeElement)
      break;
    else
      activeElement = el;
  }
  return activeElement;
}
var isDom4 = () => typeof document !== "undefined";
function getPlatform4() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
var pt4 = (v) => isDom4() && v.test(getPlatform4());
var ua = (v) => isDom4() && v.test(navigator.userAgent);
var isMac2 = () => pt4(/^Mac/);
var isFirefox2 = () => ua(/firefox\//i);
var isApple2 = () => pt4(/mac|iphone|ipad|ipod/i);
function getComposedPath4(event) {
  return event.composedPath?.() ?? event.nativeEvent?.composedPath?.();
}
function getEventTarget4(event) {
  const composedPath = getComposedPath4(event);
  return composedPath?.[0] ?? event.target;
}
var isSelfTarget = (event) => {
  return contains2(event.currentTarget, getEventTarget4(event));
};
function isOpeningInNewTab(event) {
  const element = event.currentTarget;
  if (!element)
    return false;
  const isAppleDevice = isApple2();
  if (isAppleDevice && !event.metaKey)
    return false;
  if (!isAppleDevice && !event.ctrlKey)
    return false;
  const localName = element.localName;
  if (localName === "a")
    return true;
  if (localName === "button" && element.type === "submit")
    return true;
  if (localName === "input" && element.type === "submit")
    return true;
  return false;
}
function isDownloadingEvent(event) {
  const element = event.currentTarget;
  if (!element)
    return false;
  const localName = element.localName;
  if (!event.altKey)
    return false;
  if (localName === "a")
    return true;
  if (localName === "button" && element.type === "submit")
    return true;
  if (localName === "input" && element.type === "submit")
    return true;
  return false;
}
var defaultItemToId2 = (v) => v.id;
function itemById2(v, id, itemToId = defaultItemToId2) {
  return v.find((item) => itemToId(item) === id);
}
function indexOfId2(v, id, itemToId = defaultItemToId2) {
  const item = itemById2(v, id, itemToId);
  return item ? v.indexOf(item) : -1;
}
function nextById2(v, id, loop = true) {
  let idx = indexOfId2(v, id);
  idx = loop ? (idx + 1) % v.length : Math.min(idx + 1, v.length - 1);
  return v[idx];
}
function prevById2(v, id, loop = true) {
  let idx = indexOfId2(v, id);
  if (idx === -1)
    return loop ? v[v.length - 1] : null;
  idx = loop ? (idx - 1 + v.length) % v.length : Math.max(0, idx - 1);
  return v[idx];
}
var sanitize = (str) => str.split("").map((char) => {
  const code = char.charCodeAt(0);
  if (code > 0 && code < 128)
    return char;
  if (code >= 128 && code <= 255)
    return `/x${code.toString(16)}`.replace("/", "\\");
  return "";
}).join("").trim();
var getValueText = (item) => sanitize(item.dataset?.valuetext ?? item.textContent ?? "");
var match = (valueText, query2) => valueText.trim().toLowerCase().startsWith(query2.toLowerCase());
var wrap = (v, idx) => {
  return v.map((_, index) => v[(Math.max(idx, 0) + index) % v.length]);
};
function getByText(v, text, currentId, itemToId = defaultItemToId2) {
  const index = currentId ? indexOfId2(v, currentId, itemToId) : -1;
  let items = currentId ? wrap(v, index) : v;
  const isSingleKey = text.length === 1;
  if (isSingleKey) {
    items = items.filter((item) => itemToId(item) !== currentId);
  }
  return items.find((item) => match(getValueText(item), text));
}
function getByTypeaheadImpl(_items, options) {
  const { state, activeId, key, timeout = 350, itemToId } = options;
  const search = state.keysSoFar + key;
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const query2 = isRepeated ? search[0] : search;
  let items = _items.slice();
  const next = getByText(items, query2, activeId, itemToId);
  function cleanup() {
    clearTimeout(state.timer);
    state.timer = -1;
  }
  function update(value) {
    state.keysSoFar = value;
    cleanup();
    if (value !== "") {
      state.timer = +setTimeout(() => {
        update("");
        cleanup();
      }, timeout);
    }
  }
  update(search);
  return next;
}
var getByTypeahead = /* @__PURE__ */ Object.assign(getByTypeaheadImpl, {
  defaultOptions: { keysSoFar: "", timer: -1 },
  isValidEvent: isValidTypeaheadEvent
});
function isValidTypeaheadEvent(event) {
  return event.key.length === 1 && !event.ctrlKey && !event.metaKey;
}
var isHTMLElement24 = (element) => typeof element === "object" && element !== null && element.nodeType === 1;
var isFrame2 = (element) => isHTMLElement24(element) && element.tagName === "IFRAME";
function isVisible3(el) {
  if (!isHTMLElement24(el))
    return false;
  return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
}
function hasNegativeTabIndex2(element) {
  const tabIndex = parseInt(element.getAttribute("tabindex") || "0", 10);
  return tabIndex < 0;
}
var focusableSelector3 = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type";
function isFocusable3(element) {
  if (!element || element.closest("[inert]"))
    return false;
  return element.matches(focusableSelector3) && isVisible3(element);
}
function getTabbables2(container, includeContainer) {
  if (!container)
    return [];
  const elements = Array.from(container.querySelectorAll(focusableSelector3));
  const tabbableElements = elements.filter(isTabbable2);
  if (includeContainer && isTabbable2(container)) {
    tabbableElements.unshift(container);
  }
  tabbableElements.forEach((element, i) => {
    if (isFrame2(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      const allFrameTabbable = getTabbables2(frameBody);
      tabbableElements.splice(i, 1, ...allFrameTabbable);
    }
  });
  if (!tabbableElements.length && includeContainer) {
    return elements;
  }
  return tabbableElements;
}
function isTabbable2(el) {
  if (el != null && el.tabIndex > 0)
    return true;
  return isFocusable3(el) && !hasNegativeTabIndex2(el);
}
function getTabbableEdges(container, includeContainer) {
  const elements = getTabbables2(container, includeContainer);
  const first4 = elements[0] || null;
  const last4 = elements[elements.length - 1] || null;
  return [first4, last4];
}
function getInitialFocus(options) {
  const { root, getInitialEl, filter, enabled = true } = options;
  if (!enabled)
    return;
  let node = null;
  node || (node = typeof getInitialEl === "function" ? getInitialEl() : getInitialEl);
  node || (node = root?.querySelector("[data-autofocus],[autofocus]"));
  if (!node) {
    const tabbables = getTabbables2(root);
    node = filter ? tabbables.filter(filter)[0] : tabbables[0];
  }
  return node || root || void 0;
}
function isValidTabEvent(event) {
  const container = event.currentTarget;
  if (!container)
    return false;
  const [firstTabbable, lastTabbable] = getTabbableEdges(container);
  const doc = container.ownerDocument || document;
  if (doc.activeElement === firstTabbable && event.shiftKey)
    return false;
  if (doc.activeElement === lastTabbable && !event.shiftKey)
    return false;
  if (!firstTabbable && !lastTabbable)
    return false;
  return true;
}
function isEditableElement(el) {
  if (el == null || !isHTMLElement3(el)) {
    return false;
  }
  try {
    const win = getWindow3(el);
    return el instanceof win.HTMLInputElement && el.selectionStart != null || /(textarea|select)/.test(el.localName) || el.isContentEditable;
  } catch {
    return false;
  }
}
var OVERFLOW_RE2 = /auto|scroll|overlay|hidden|clip/;
function isOverflowElement2(el) {
  const win = getWindow3(el);
  const { overflow, overflowX, overflowY, display } = win.getComputedStyle(el);
  return OVERFLOW_RE2.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function raf5(fn) {
  const id = globalThis.requestAnimationFrame(fn);
  return () => {
    globalThis.cancelAnimationFrame(id);
  };
}
function observeAttributesImpl(node, options) {
  if (!node)
    return;
  const { attributes, callback: fn } = options;
  const win = node.ownerDocument.defaultView || window;
  const obs = new win.MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type === "attributes" && change.attributeName && attributes.includes(change.attributeName)) {
        fn(change);
      }
    }
  });
  obs.observe(node, { attributes: true, attributeFilter: attributes });
  return () => obs.disconnect();
}
function observeAttributes(nodeOrFn, options) {
  const { defer } = options;
  const func = defer ? raf5 : (v) => v();
  const cleanups22 = [];
  cleanups22.push(
    func(() => {
      const node = typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn;
      cleanups22.push(observeAttributesImpl(node, options));
    })
  );
  return () => {
    cleanups22.forEach((fn) => fn?.());
  };
}
function queryAll2(root, selector) {
  return Array.from(root?.querySelectorAll(selector) ?? []);
}
function createScope4(methods) {
  const dom6 = {
    getRootNode: (ctx) => ctx.getRootNode?.() ?? document,
    getDoc: (ctx) => getDocument5(dom6.getRootNode(ctx)),
    getWin: (ctx) => dom6.getDoc(ctx).defaultView ?? window,
    getActiveElement: (ctx) => getActiveElement5(dom6.getRootNode(ctx)),
    isActiveElement: (ctx, elem) => elem === dom6.getActiveElement(ctx),
    getById: (ctx, id) => dom6.getRootNode(ctx).getElementById(id),
    setValue: (elem, value) => {
      if (elem == null || value == null)
        return;
      const valueAsString = value.toString();
      if (elem.value === valueAsString)
        return;
      elem.value = value.toString();
    }
  };
  return { ...dom6, ...methods };
}
function isScrollable(el) {
  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
}
function scrollIntoView(el, options) {
  const { rootEl, ...scrollOptions } = options || {};
  if (!el || !rootEl) {
    return;
  }
  if (!isOverflowElement2(rootEl) || !isScrollable(rootEl)) {
    return;
  }
  el.scrollIntoView(scrollOptions);
}
var fps6 = 1e3 / 60;

// node_modules/@zag-js/menu/node_modules/@zag-js/dom-event/dist/index.mjs
var addDomEvent3 = (target, eventName, handler, options) => {
  const node = typeof target === "function" ? target() : target;
  node?.addEventListener(eventName, handler, options);
  return () => {
    node?.removeEventListener(eventName, handler, options);
  };
};
function isPrintableKey(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
var isContextMenuEvent2 = (e) => {
  return e.button === 2 || isMac2() && e.ctrlKey && e.button === 0;
};
var isModifierKey = (e) => e.ctrlKey || e.altKey || e.metaKey;
function queueBeforeEvent(element, type, cb) {
  const createTimer = (callback) => {
    const timerId = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(timerId);
  };
  const cancelTimer = createTimer(() => {
    element.removeEventListener(type, callSync, true);
    cb();
  });
  const callSync = () => {
    cancelTimer();
    cb();
  };
  element.addEventListener(type, callSync, { once: true, capture: true });
  return cancelTimer;
}
function isLinkElement(element) {
  return element?.matches("a[href]") ?? false;
}
function clickIfLink(element) {
  if (!isLinkElement(element))
    return;
  const click = () => element.click();
  if (isFirefox2()) {
    queueBeforeEvent(element, "keyup", click);
  } else {
    queueMicrotask(click);
  }
}
var keyMap2 = {
  Up: "ArrowUp",
  Down: "ArrowDown",
  Esc: "Escape",
  " ": "Space",
  ",": "Comma",
  Left: "ArrowLeft",
  Right: "ArrowRight"
};
var rtlKeyMap2 = {
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft"
};
function getEventKey2(event, options = {}) {
  const { dir = "ltr", orientation = "horizontal" } = options;
  let { key } = event;
  key = keyMap2[key] ?? key;
  const isRtl = dir === "rtl" && orientation === "horizontal";
  if (isRtl && key in rtlKeyMap2) {
    key = rtlKeyMap2[key];
  }
  return key;
}
function pointFromTouch(e, type = "client") {
  const point = e.touches[0] || e.changedTouches[0];
  return { x: point[`${type}X`], y: point[`${type}Y`] };
}
function pointFromMouse(point, type = "client") {
  return { x: point[`${type}X`], y: point[`${type}Y`] };
}
var isTouchEvent = (event) => "touches" in event && event.touches.length > 0;
function getEventPoint(event, type = "client") {
  return isTouchEvent(event) ? pointFromTouch(event, type) : pointFromMouse(event, type);
}

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max3 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset3 = clamp(min$1, center, max3);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max3 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset3,
        centerOffset: center - offset3 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
var hide = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min3 = mainAxisCoord + overflow[minSide];
        const max3 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min3, mainAxisCoord, max3);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min3 = crossAxisCoord + overflow[minSide];
        const max3 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min3, crossAxisCoord, max3);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
var limitShift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset: offset3 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset3, state);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = ["top", "left"].includes(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName2(node) {
  if (isNode4(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow4(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement2(node) {
  var _ref;
  return (_ref = (isNode4(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode4(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow4(value).Node;
}
function isElement5(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow4(value).Element;
}
function isHTMLElement4(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow4(value).HTMLElement;
}
function isShadowRoot4(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow4(value).ShadowRoot;
}
function isOverflowElement3(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName2(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css2 = isElement5(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return css2.transform !== "none" || css2.perspective !== "none" || (css2.containerType ? css2.containerType !== "normal" : false) || !webkit && (css2.backdropFilter ? css2.backdropFilter !== "none" : false) || !webkit && (css2.filter ? css2.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css2.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css2.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode3(element);
  while (isHTMLElement4(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode3(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName2(node));
}
function getComputedStyle2(element) {
  return getWindow4(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement5(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode3(node) {
  if (getNodeName2(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot4(node) && node.host || // Fallback.
    getDocumentElement2(node)
  );
  return isShadowRoot4(result) ? result.host : result;
}
function getNearestOverflowAncestor2(node) {
  const parentNode = getParentNode3(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement4(parentNode) && isOverflowElement3(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor2(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor2(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow4(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement3(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css2 = getComputedStyle2(element);
  let width = parseFloat(css2.width) || 0;
  let height = parseFloat(css2.height) || 0;
  const hasOffset = isHTMLElement4(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement5(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement4(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow4(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow4(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement5(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow4(domElement);
    const offsetWin = offsetParent && isElement5(offsetParent) ? getWindow4(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css2 = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css2.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css2.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow4(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement2(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect)
  ));
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement2(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement4(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName2(offsetParent) !== "body" || isOverflowElement3(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement4(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement2(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow4(element);
  const html = getDocumentElement2(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement4(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement2(element));
  } else if (isElement5(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode3(element);
  if (parentNode === stopNode || !isElement5(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement5(el) && getNodeName2(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode3(element) : element;
  while (isElement5(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement3(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode3(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement4(offsetParent);
  const documentElement = getDocumentElement2(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName2(offsetParent) !== "body" || isOverflowElement3(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement4(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement2(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow4(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement4(element)) {
    let svgOffsetParent = getParentNode3(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement5(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode3(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement: getDocumentElement2,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement: isElement5,
  isRTL
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement2(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var hide2 = hide;
var arrow2 = arrow;
var limitShift2 = limitShift;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/@zag-js/popper/node_modules/@zag-js/dom-query/dist/index.mjs
var ELEMENT_NODE4 = 1;
var DOCUMENT_NODE6 = 9;
var DOCUMENT_FRAGMENT_NODE4 = 11;
var isObject14 = (v) => typeof v === "object" && v !== null;
var isHTMLElement5 = (el) => isObject14(el) && el.nodeType === ELEMENT_NODE4 && typeof el.nodeName === "string";
var isDocument6 = (el) => isObject14(el) && el.nodeType === DOCUMENT_NODE6;
var isNode5 = (el) => isObject14(el) && el.nodeType !== void 0;
var isShadowRoot5 = (el) => isNode5(el) && el.nodeType === DOCUMENT_FRAGMENT_NODE4 && "host" in el;
function getWindow5(el) {
  if (isShadowRoot5(el))
    return getWindow5(el.host);
  if (isDocument6(el))
    return el.defaultView ?? window;
  if (isHTMLElement5(el))
    return el.ownerDocument?.defaultView ?? window;
  return window;
}
var styleCache2 = /* @__PURE__ */ new WeakMap();
function getComputedStyle3(el) {
  if (!styleCache2.has(el)) {
    styleCache2.set(el, getWindow5(el).getComputedStyle(el));
  }
  return styleCache2.get(el);
}
function raf6(fn) {
  const id = globalThis.requestAnimationFrame(fn);
  return () => {
    globalThis.cancelAnimationFrame(id);
  };
}
var fps7 = 1e3 / 60;

// node_modules/@zag-js/popper/node_modules/@zag-js/utils/dist/index.mjs
var runIfFn5 = (v, ...a) => {
  const res = typeof v === "function" ? v(...a) : v;
  return res ?? void 0;
};
var noop5 = () => {
};
var isNull = (v) => v == null;
var fnToString5 = Function.prototype.toString;
var objectCtorString5 = fnToString5.call(Object);
function compact5(obj) {
  if (!isPlainObject25(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact5(value);
    }
  }
  return filtered;
}
var isPlainObject25 = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};

// node_modules/@zag-js/popper/dist/index.mjs
function createDOMRect(x = 0, y = 0, width = 0, height = 0) {
  if (typeof DOMRect === "function") {
    return new DOMRect(x, y, width, height);
  }
  const rect = {
    x,
    y,
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x
  };
  return { ...rect, toJSON: () => rect };
}
function getDOMRect(anchorRect) {
  if (!anchorRect)
    return createDOMRect();
  const { x, y, width, height } = anchorRect;
  return createDOMRect(x, y, width, height);
}
function getAnchorElement(anchorElement, getAnchorRect) {
  return {
    contextElement: isHTMLElement5(anchorElement) ? anchorElement : void 0,
    getBoundingClientRect: () => {
      const anchor = anchorElement;
      const anchorRect = getAnchorRect?.(anchor);
      if (anchorRect || !anchor) {
        return getDOMRect(anchorRect);
      }
      return anchor.getBoundingClientRect();
    }
  };
}
var toVar = (value) => ({ variable: value, reference: `var(${value})` });
var cssVars = {
  arrowSize: toVar("--arrow-size"),
  arrowSizeHalf: toVar("--arrow-size-half"),
  arrowBg: toVar("--arrow-background"),
  transformOrigin: toVar("--transform-origin"),
  arrowOffset: toVar("--arrow-offset")
};
var getTransformOrigin = (arrow22) => ({
  top: "bottom center",
  "top-start": arrow22 ? `${arrow22.x}px bottom` : "left bottom",
  "top-end": arrow22 ? `${arrow22.x}px bottom` : "right bottom",
  bottom: "top center",
  "bottom-start": arrow22 ? `${arrow22.x}px top` : "top left",
  "bottom-end": arrow22 ? `${arrow22.x}px top` : "top right",
  left: "right center",
  "left-start": arrow22 ? `right ${arrow22.y}px` : "right top",
  "left-end": arrow22 ? `right ${arrow22.y}px` : "right bottom",
  right: "left center",
  "right-start": arrow22 ? `left ${arrow22.y}px` : "left top",
  "right-end": arrow22 ? `left ${arrow22.y}px` : "left bottom"
});
var transformOriginMiddleware = {
  name: "transformOrigin",
  fn({ placement, elements, middlewareData }) {
    const { arrow: arrow22 } = middlewareData;
    const transformOrigin = getTransformOrigin(arrow22)[placement];
    const { floating } = elements;
    floating.style.setProperty(cssVars.transformOrigin.variable, transformOrigin);
    return {
      data: { transformOrigin }
    };
  }
};
var rectMiddleware = {
  name: "rects",
  fn({ rects }) {
    return {
      data: rects
    };
  }
};
var shiftArrowMiddleware = (arrowEl) => {
  if (!arrowEl)
    return;
  return {
    name: "shiftArrow",
    fn({ placement, middlewareData }) {
      if (!middlewareData.arrow)
        return {};
      const { x, y } = middlewareData.arrow;
      const dir = placement.split("-")[0];
      Object.assign(arrowEl.style, {
        left: x != null ? `${x}px` : "",
        top: y != null ? `${y}px` : "",
        [dir]: `calc(100% + ${cssVars.arrowOffset.reference})`
      });
      return {};
    }
  };
};
function getPlacementDetails(placement) {
  const [side, align] = placement.split("-");
  return { side, align, hasAlign: align != null };
}
function getPlacementSide(placement) {
  return placement.split("-")[0];
}
var defaultOptions = {
  strategy: "absolute",
  placement: "bottom",
  listeners: true,
  gutter: 8,
  flip: true,
  slide: true,
  overlap: false,
  sameWidth: false,
  fitViewport: false,
  overflowPadding: 8,
  arrowPadding: 4
};
function roundByDpr(win, value) {
  const dpr = win.devicePixelRatio || 1;
  return Math.round(value * dpr) / dpr;
}
function getBoundaryMiddleware(opts) {
  return runIfFn5(opts.boundary);
}
function getArrowMiddleware(arrowElement, opts) {
  if (!arrowElement)
    return;
  return arrow2({
    element: arrowElement,
    padding: opts.arrowPadding
  });
}
function getOffsetMiddleware(arrowElement, opts) {
  if (isNull(opts.offset ?? opts.gutter))
    return;
  return offset2(({ placement }) => {
    const arrowOffset = (arrowElement?.clientHeight || 0) / 2;
    const gutter = opts.offset?.mainAxis ?? opts.gutter;
    const mainAxis = typeof gutter === "number" ? gutter + arrowOffset : gutter ?? arrowOffset;
    const { hasAlign } = getPlacementDetails(placement);
    const shift22 = !hasAlign ? opts.shift : void 0;
    const crossAxis = opts.offset?.crossAxis ?? shift22;
    return compact5({
      crossAxis,
      mainAxis,
      alignmentAxis: opts.shift
    });
  });
}
function getFlipMiddleware(opts) {
  if (!opts.flip)
    return;
  return flip2({
    boundary: getBoundaryMiddleware(opts),
    padding: opts.overflowPadding,
    fallbackPlacements: opts.flip === true ? void 0 : opts.flip
  });
}
function getShiftMiddleware(opts) {
  if (!opts.slide && !opts.overlap)
    return;
  return shift2({
    boundary: getBoundaryMiddleware(opts),
    mainAxis: opts.slide,
    crossAxis: opts.overlap,
    padding: opts.overflowPadding,
    limiter: limitShift2()
  });
}
function getSizeMiddleware(opts) {
  return size2({
    padding: opts.overflowPadding,
    apply({ elements, rects, availableHeight, availableWidth }) {
      const floating = elements.floating;
      const referenceWidth = Math.round(rects.reference.width);
      availableWidth = Math.floor(availableWidth);
      availableHeight = Math.floor(availableHeight);
      floating.style.setProperty("--reference-width", `${referenceWidth}px`);
      floating.style.setProperty("--available-width", `${availableWidth}px`);
      floating.style.setProperty("--available-height", `${availableHeight}px`);
    }
  });
}
function hideWhenDetachedMiddleware(opts) {
  if (!opts.hideWhenDetached)
    return;
  return hide2({ strategy: "referenceHidden", boundary: opts.boundary?.() ?? "clippingAncestors" });
}
function getAutoUpdateOptions(opts) {
  if (!opts)
    return {};
  if (opts === true) {
    return { ancestorResize: true, ancestorScroll: true, elementResize: true, layoutShift: true };
  }
  return opts;
}
function getPlacementImpl(referenceOrVirtual, floating, opts = {}) {
  const reference = getAnchorElement(referenceOrVirtual, opts.getAnchorRect);
  if (!floating || !reference)
    return;
  const options = Object.assign({}, defaultOptions, opts);
  const arrowEl = floating.querySelector("[data-part=arrow]");
  const middleware = [
    getOffsetMiddleware(arrowEl, options),
    getFlipMiddleware(options),
    getShiftMiddleware(options),
    getArrowMiddleware(arrowEl, options),
    shiftArrowMiddleware(arrowEl),
    transformOriginMiddleware,
    getSizeMiddleware(options),
    hideWhenDetachedMiddleware(options),
    rectMiddleware
  ];
  const { placement, strategy, onComplete, onPositioned } = options;
  const updatePosition = async () => {
    if (!reference || !floating)
      return;
    const pos = await computePosition2(reference, floating, {
      placement,
      middleware,
      strategy
    });
    onComplete?.(pos);
    onPositioned?.({ placed: true });
    const win = getWindow5(floating);
    const x = roundByDpr(win, pos.x);
    const y = roundByDpr(win, pos.y);
    floating.style.setProperty("--x", `${x}px`);
    floating.style.setProperty("--y", `${y}px`);
    if (options.hideWhenDetached) {
      const isHidden = pos.middlewareData.hide?.referenceHidden;
      if (isHidden) {
        floating.style.setProperty("visibility", "hidden");
        floating.style.setProperty("pointer-events", "none");
      } else {
        floating.style.removeProperty("visibility");
        floating.style.removeProperty("pointer-events");
      }
    }
    const contentEl = floating.firstElementChild;
    if (contentEl) {
      const styles = getComputedStyle3(contentEl);
      floating.style.setProperty("--z-index", styles.zIndex);
    }
  };
  const update = async () => {
    if (opts.updatePosition) {
      await opts.updatePosition({ updatePosition });
      onPositioned?.({ placed: true });
    } else {
      await updatePosition();
    }
  };
  const autoUpdateOptions = getAutoUpdateOptions(options.listeners);
  const cancelAutoUpdate = options.listeners ? autoUpdate(reference, floating, update, autoUpdateOptions) : noop5;
  update();
  return () => {
    cancelAutoUpdate?.();
    onPositioned?.({ placed: false });
  };
}
function getPlacement(referenceOrFn, floatingOrFn, opts = {}) {
  const { defer, ...options } = opts;
  const func = defer ? raf6 : (v) => v();
  const cleanups3 = [];
  cleanups3.push(
    func(() => {
      const reference = typeof referenceOrFn === "function" ? referenceOrFn() : referenceOrFn;
      const floating = typeof floatingOrFn === "function" ? floatingOrFn() : floatingOrFn;
      cleanups3.push(getPlacementImpl(reference, floating, options));
    })
  );
  return () => {
    cleanups3.forEach((fn) => fn?.());
  };
}
var ARROW_FLOATING_STYLE = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)"
};
function getPlacementStyles(options = {}) {
  const { placement, sameWidth, fitViewport, strategy = "absolute" } = options;
  return {
    arrow: {
      position: "absolute",
      width: cssVars.arrowSize.reference,
      height: cssVars.arrowSize.reference,
      [cssVars.arrowSizeHalf.variable]: `calc(${cssVars.arrowSize.reference} / 2)`,
      [cssVars.arrowOffset.variable]: `calc(${cssVars.arrowSizeHalf.reference} * -1)`
    },
    arrowTip: {
      // @ts-expect-error - Fix this
      transform: placement ? ARROW_FLOATING_STYLE[placement.split("-")[0]] : void 0,
      background: cssVars.arrowBg.reference,
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: "inherit"
    },
    floating: {
      position: strategy,
      isolation: "isolate",
      minWidth: sameWidth ? void 0 : "max-content",
      width: sameWidth ? "var(--reference-width)" : void 0,
      maxWidth: fitViewport ? "var(--available-width)" : void 0,
      maxHeight: fitViewport ? "var(--available-height)" : void 0,
      top: "0px",
      left: "0px",
      // move off-screen if placement is not defined
      transform: placement ? "translate3d(var(--x), var(--y), 0)" : "translate3d(0, -100vh, 0)",
      zIndex: "var(--z-index)"
    }
  };
}

// node_modules/@zag-js/dismissable/node_modules/@zag-js/dom-query/dist/index.mjs
var ELEMENT_NODE5 = 1;
var DOCUMENT_NODE7 = 9;
var isObject15 = (v) => typeof v === "object" && v !== null;
var isHTMLElement6 = (el) => isObject15(el) && el.nodeType === ELEMENT_NODE5 && typeof el.nodeName === "string";
var isDocument7 = (el) => isObject15(el) && el.nodeType === DOCUMENT_NODE7;
var isWindow6 = (el) => isObject15(el) && el === el.window;
function contains3(parent, child) {
  if (!parent || !child)
    return false;
  if (!isHTMLElement6(parent) || !isHTMLElement6(child))
    return false;
  return parent === child || parent.contains(child);
}
function getDocument6(el) {
  if (isDocument7(el))
    return el;
  if (isWindow6(el))
    return el.document;
  return el?.ownerDocument ?? document;
}
function getComposedPath5(event) {
  return event.composedPath?.() ?? event.nativeEvent?.composedPath?.();
}
function getEventTarget5(event) {
  const composedPath = getComposedPath5(event);
  return composedPath?.[0] ?? event.target;
}
function raf7(fn) {
  const id = globalThis.requestAnimationFrame(fn);
  return () => {
    globalThis.cancelAnimationFrame(id);
  };
}
var cleanups2 = /* @__PURE__ */ new WeakMap();
function set7(element, key, setup) {
  if (!cleanups2.has(element)) {
    cleanups2.set(element, /* @__PURE__ */ new Map());
  }
  const elementCleanups = cleanups2.get(element);
  const prevCleanup = elementCleanups.get(key);
  if (!prevCleanup) {
    elementCleanups.set(key, setup());
    return () => {
      elementCleanups.get(key)?.();
      elementCleanups.delete(key);
    };
  }
  const cleanup = setup();
  const nextCleanup = () => {
    cleanup();
    prevCleanup();
    elementCleanups.delete(key);
  };
  elementCleanups.set(key, nextCleanup);
  return () => {
    const isCurrent = elementCleanups.get(key) === nextCleanup;
    if (!isCurrent)
      return;
    cleanup();
    elementCleanups.set(key, prevCleanup);
  };
}
function setStyle2(element, style) {
  if (!element)
    return () => {
    };
  const setup = () => {
    const prevStyle = element.style.cssText;
    Object.assign(element.style, style);
    return () => {
      element.style.cssText = prevStyle;
    };
  };
  return set7(element, "style", setup);
}
var fps8 = 1e3 / 60;
function waitForElement2(query2, cb) {
  const el = query2();
  if (isHTMLElement6(el) && el.isConnected) {
    cb(el);
    return () => void 0;
  } else {
    const timerId = setInterval(() => {
      const el2 = query2();
      if (isHTMLElement6(el2) && el2.isConnected) {
        cb(el2);
        clearInterval(timerId);
      }
    }, fps8);
    return () => clearInterval(timerId);
  }
}
function waitForElements2(queries, cb) {
  const cleanups22 = [];
  queries?.forEach((query2) => {
    const clean = waitForElement2(query2, cb);
    cleanups22.push(clean);
  });
  return () => {
    cleanups22.forEach((fn) => fn());
  };
}

// node_modules/@zag-js/interact-outside/node_modules/@zag-js/dom-query/dist/index.mjs
var ELEMENT_NODE6 = 1;
var DOCUMENT_NODE8 = 9;
var DOCUMENT_FRAGMENT_NODE5 = 11;
var isObject16 = (v) => typeof v === "object" && v !== null;
var isHTMLElement7 = (el) => isObject16(el) && el.nodeType === ELEMENT_NODE6 && typeof el.nodeName === "string";
var isDocument8 = (el) => isObject16(el) && el.nodeType === DOCUMENT_NODE8;
var isWindow7 = (el) => isObject16(el) && el === el.window;
var getNodeName3 = (node) => {
  if (isHTMLElement7(node))
    return node.localName || "";
  return "#document";
};
function isRootElement2(node) {
  return ["html", "body", "#document"].includes(getNodeName3(node));
}
var isNode6 = (el) => isObject16(el) && el.nodeType !== void 0;
var isShadowRoot6 = (el) => isNode6(el) && el.nodeType === DOCUMENT_FRAGMENT_NODE5 && "host" in el;
function contains4(parent, child) {
  if (!parent || !child)
    return false;
  if (!isHTMLElement7(parent) || !isHTMLElement7(child))
    return false;
  return parent === child || parent.contains(child);
}
function getDocument7(el) {
  if (isDocument8(el))
    return el;
  if (isWindow7(el))
    return el.document;
  return el?.ownerDocument ?? document;
}
function getDocumentElement3(el) {
  return getDocument7(el).documentElement;
}
function getWindow6(el) {
  if (isShadowRoot6(el))
    return getWindow6(el.host);
  if (isDocument8(el))
    return el.defaultView ?? window;
  if (isHTMLElement7(el))
    return el.ownerDocument?.defaultView ?? window;
  return window;
}
var isDom5 = () => typeof document !== "undefined";
function getPlatform5() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
var pt5 = (v) => isDom5() && v.test(getPlatform5());
var isMac3 = () => pt5(/^Mac/);
function getComposedPath6(event) {
  return event.composedPath?.() ?? event.nativeEvent?.composedPath?.();
}
function getEventTarget6(event) {
  const composedPath = getComposedPath6(event);
  return composedPath?.[0] ?? event.target;
}
function getParentNode4(node) {
  if (getNodeName3(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot6(node) && node.host || // Fallback.
    getDocumentElement3(node)
  );
  return isShadowRoot6(result) ? result.host : result;
}
var isHTMLElement25 = (element) => typeof element === "object" && element !== null && element.nodeType === 1;
function isVisible4(el) {
  if (!isHTMLElement25(el))
    return false;
  return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
}
var focusableSelector4 = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type";
function isFocusable4(element) {
  if (!element || element.closest("[inert]"))
    return false;
  return element.matches(focusableSelector4) && isVisible4(element);
}
var OVERFLOW_RE3 = /auto|scroll|overlay|hidden|clip/;
function isOverflowElement4(el) {
  const win = getWindow6(el);
  const { overflow, overflowX, overflowY, display } = win.getComputedStyle(el);
  return OVERFLOW_RE3.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function raf8(fn) {
  const id = globalThis.requestAnimationFrame(fn);
  return () => {
    globalThis.cancelAnimationFrame(id);
  };
}
function getNearestOverflowAncestor3(el) {
  const parentNode = getParentNode4(el);
  if (isRootElement2(parentNode)) {
    return getDocument7(parentNode).body;
  }
  if (isHTMLElement7(parentNode) && isOverflowElement4(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor3(parentNode);
}
var fps9 = 1e3 / 60;

// node_modules/@zag-js/interact-outside/node_modules/@zag-js/dom-event/dist/index.mjs
var addDomEvent4 = (target, eventName, handler, options) => {
  const node = typeof target === "function" ? target() : target;
  node?.addEventListener(eventName, handler, options);
  return () => {
    node?.removeEventListener(eventName, handler, options);
  };
};
var isContextMenuEvent3 = (e) => {
  return e.button === 2 || isMac3() && e.ctrlKey && e.button === 0;
};
function fireCustomEvent2(el, type, init) {
  if (!el)
    return;
  const win = el.ownerDocument.defaultView || window;
  const event = new win.CustomEvent(type, init);
  return el.dispatchEvent(event);
}

// node_modules/@zag-js/interact-outside/node_modules/@zag-js/utils/dist/index.mjs
var callAll5 = (...fns) => (...a) => {
  fns.forEach(function(fn) {
    fn?.(...a);
  });
};
var fnToString6 = Function.prototype.toString;
var objectCtorString6 = fnToString6.call(Object);

// node_modules/@zag-js/interact-outside/dist/index.mjs
function getWindowFrames2(win) {
  const frames = {
    each(cb) {
      for (let i = 0; i < win.frames?.length; i += 1) {
        const frame = win.frames[i];
        if (frame)
          cb(frame);
      }
    },
    addEventListener(event, listener, options) {
      frames.each((frame) => {
        try {
          frame.document.addEventListener(event, listener, options);
        } catch {
        }
      });
      return () => {
        try {
          frames.removeEventListener(event, listener, options);
        } catch {
        }
      };
    },
    removeEventListener(event, listener, options) {
      frames.each((frame) => {
        try {
          frame.document.removeEventListener(event, listener, options);
        } catch {
        }
      });
    }
  };
  return frames;
}
function getParentWindow2(win) {
  const parent = win.frameElement != null ? win.parent : null;
  return {
    addEventListener: (event, listener, options) => {
      try {
        parent?.addEventListener(event, listener, options);
      } catch {
      }
      return () => {
        try {
          parent?.removeEventListener(event, listener, options);
        } catch {
        }
      };
    },
    removeEventListener: (event, listener, options) => {
      try {
        parent?.removeEventListener(event, listener, options);
      } catch {
      }
    }
  };
}
var POINTER_OUTSIDE_EVENT2 = "pointerdown.outside";
var FOCUS_OUTSIDE_EVENT2 = "focus.outside";
function isComposedPathFocusable2(composedPath) {
  for (const node of composedPath) {
    if (isHTMLElement7(node) && isFocusable4(node))
      return true;
  }
  return false;
}
var isPointerEvent2 = (event) => "clientY" in event;
function isEventPointWithin2(node, event) {
  if (!isPointerEvent2(event) || !node)
    return false;
  const rect = node.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0)
    return false;
  return rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
}
function isPointInRect2(rect, point) {
  return rect.y <= point.y && point.y <= rect.y + rect.height && rect.x <= point.x && point.x <= rect.x + rect.width;
}
function isEventWithinScrollbar2(event, ancestor) {
  if (!ancestor || !isPointerEvent2(event))
    return false;
  const isScrollableY = ancestor.scrollHeight > ancestor.clientHeight;
  const onScrollbarY = isScrollableY && event.clientX > ancestor.offsetLeft + ancestor.clientWidth;
  const isScrollableX = ancestor.scrollWidth > ancestor.clientWidth;
  const onScrollbarX = isScrollableX && event.clientY > ancestor.offsetTop + ancestor.clientHeight;
  const rect = {
    x: ancestor.offsetLeft,
    y: ancestor.offsetTop,
    width: ancestor.clientWidth + (isScrollableY ? 16 : 0),
    height: ancestor.clientHeight + (isScrollableX ? 16 : 0)
  };
  const point = {
    x: event.clientX,
    y: event.clientY
  };
  if (!isPointInRect2(rect, point))
    return false;
  return onScrollbarY || onScrollbarX;
}
function trackInteractOutsideImpl2(node, options) {
  const { exclude, onFocusOutside, onPointerDownOutside, onInteractOutside, defer } = options;
  if (!node)
    return;
  const doc = getDocument7(node);
  const win = getWindow6(node);
  const frames = getWindowFrames2(win);
  const parentWin = getParentWindow2(win);
  function isEventOutside(event) {
    const target = getEventTarget6(event);
    if (!isHTMLElement7(target))
      return false;
    if (!target.isConnected)
      return false;
    if (contains4(node, target))
      return false;
    if (isEventPointWithin2(node, event))
      return false;
    const triggerEl = doc.querySelector(`[aria-controls="${node.id}"]`);
    if (triggerEl) {
      const triggerAncestor = getNearestOverflowAncestor3(triggerEl);
      if (isEventWithinScrollbar2(event, triggerAncestor))
        return false;
    }
    const nodeAncestor = getNearestOverflowAncestor3(node);
    if (isEventWithinScrollbar2(event, nodeAncestor))
      return false;
    return !exclude?.(target);
  }
  const pointerdownCleanups = /* @__PURE__ */ new Set();
  function onPointerDown(event) {
    function handler() {
      const func = defer ? raf8 : (v) => v();
      const composedPath = event.composedPath?.() ?? [event.target];
      func(() => {
        if (!node || !isEventOutside(event))
          return;
        if (onPointerDownOutside || onInteractOutside) {
          const handler2 = callAll5(onPointerDownOutside, onInteractOutside);
          node.addEventListener(POINTER_OUTSIDE_EVENT2, handler2, { once: true });
        }
        fireCustomEvent2(node, POINTER_OUTSIDE_EVENT2, {
          bubbles: false,
          cancelable: true,
          detail: {
            originalEvent: event,
            contextmenu: isContextMenuEvent3(event),
            focusable: isComposedPathFocusable2(composedPath)
          }
        });
      });
    }
    if (event.pointerType === "touch") {
      pointerdownCleanups.forEach((fn) => fn());
      pointerdownCleanups.add(addDomEvent4(doc, "click", handler, { once: true }));
      pointerdownCleanups.add(parentWin.addEventListener("click", handler, { once: true }));
      pointerdownCleanups.add(frames.addEventListener("click", handler, { once: true }));
    } else {
      handler();
    }
  }
  const cleanups3 = /* @__PURE__ */ new Set();
  const timer = setTimeout(() => {
    cleanups3.add(addDomEvent4(doc, "pointerdown", onPointerDown, true));
    cleanups3.add(parentWin.addEventListener("pointerdown", onPointerDown, true));
    cleanups3.add(frames.addEventListener("pointerdown", onPointerDown, true));
  }, 0);
  function onFocusin(event) {
    const func = defer ? raf8 : (v) => v();
    func(() => {
      if (!node || !isEventOutside(event))
        return;
      if (onFocusOutside || onInteractOutside) {
        const handler = callAll5(onFocusOutside, onInteractOutside);
        node.addEventListener(FOCUS_OUTSIDE_EVENT2, handler, { once: true });
      }
      fireCustomEvent2(node, FOCUS_OUTSIDE_EVENT2, {
        bubbles: false,
        cancelable: true,
        detail: {
          originalEvent: event,
          contextmenu: false,
          focusable: isFocusable4(getEventTarget6(event))
        }
      });
    });
  }
  cleanups3.add(addDomEvent4(doc, "focusin", onFocusin, true));
  cleanups3.add(parentWin.addEventListener("focusin", onFocusin, true));
  cleanups3.add(frames.addEventListener("focusin", onFocusin, true));
  return () => {
    clearTimeout(timer);
    pointerdownCleanups.forEach((fn) => fn());
    cleanups3.forEach((fn) => fn());
  };
}
function trackInteractOutside2(nodeOrFn, options) {
  const { defer } = options;
  const func = defer ? raf8 : (v) => v();
  const cleanups3 = [];
  cleanups3.push(
    func(() => {
      const node = typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn;
      cleanups3.push(trackInteractOutsideImpl2(node, options));
    })
  );
  return () => {
    cleanups3.forEach((fn) => fn?.());
  };
}

// node_modules/@zag-js/dismissable/node_modules/@zag-js/utils/dist/index.mjs
var isFunction5 = (v) => typeof v === "function";
var fnToString7 = Function.prototype.toString;
var objectCtorString7 = fnToString7.call(Object);
function warn5(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && true) {
    console.warn(m);
  }
}

// node_modules/@zag-js/dismissable/node_modules/@zag-js/dom-event/dist/index.mjs
var addDomEvent5 = (target, eventName, handler, options) => {
  const node = typeof target === "function" ? target() : target;
  node?.addEventListener(eventName, handler, options);
  return () => {
    node?.removeEventListener(eventName, handler, options);
  };
};

// node_modules/@zag-js/dismissable/dist/index.mjs
function trackEscapeKeydown2(node, fn) {
  const handleKeyDown = (event) => {
    if (event.key !== "Escape")
      return;
    if (event.isComposing)
      return;
    fn?.(event);
  };
  return addDomEvent5(getDocument6(node), "keydown", handleKeyDown, { capture: true });
}
var layerStack2 = {
  layers: [],
  branches: [],
  count() {
    return this.layers.length;
  },
  pointerBlockingLayers() {
    return this.layers.filter((layer) => layer.pointerBlocking);
  },
  topMostPointerBlockingLayer() {
    return [...this.pointerBlockingLayers()].slice(-1)[0];
  },
  hasPointerBlockingLayer() {
    return this.pointerBlockingLayers().length > 0;
  },
  isBelowPointerBlockingLayer(node) {
    const index = this.indexOf(node);
    const highestBlockingIndex = this.topMostPointerBlockingLayer() ? this.indexOf(this.topMostPointerBlockingLayer()?.node) : -1;
    return index < highestBlockingIndex;
  },
  isTopMost(node) {
    const layer = this.layers[this.count() - 1];
    return layer?.node === node;
  },
  getNestedLayers(node) {
    return Array.from(this.layers).slice(this.indexOf(node) + 1);
  },
  isInNestedLayer(node, target) {
    return this.getNestedLayers(node).some((layer) => contains3(layer.node, target));
  },
  isInBranch(target) {
    return Array.from(this.branches).some((branch) => contains3(branch, target));
  },
  add(layer) {
    const num = this.layers.push(layer);
    layer.node.style.setProperty("--layer-index", `${num}`);
  },
  addBranch(node) {
    this.branches.push(node);
  },
  remove(node) {
    const index = this.indexOf(node);
    if (index < 0)
      return;
    if (index < this.count() - 1) {
      const _layers = this.getNestedLayers(node);
      _layers.forEach((layer) => layer.dismiss());
    }
    this.layers.splice(index, 1);
    node.style.removeProperty("--layer-index");
  },
  removeBranch(node) {
    const index = this.branches.indexOf(node);
    if (index >= 0)
      this.branches.splice(index, 1);
  },
  indexOf(node) {
    return this.layers.findIndex((layer) => layer.node === node);
  },
  dismiss(node) {
    this.layers[this.indexOf(node)]?.dismiss();
  },
  clear() {
    this.remove(this.layers[0].node);
  }
};
var originalBodyPointerEvents2;
function assignPointerEventToLayers2() {
  layerStack2.layers.forEach(({ node }) => {
    node.style.pointerEvents = layerStack2.isBelowPointerBlockingLayer(node) ? "none" : "auto";
  });
}
function clearPointerEvent2(node) {
  node.style.pointerEvents = "";
}
function disablePointerEventsOutside2(node, persistentElements) {
  const doc = getDocument6(node);
  const cleanups3 = [];
  if (layerStack2.hasPointerBlockingLayer() && !doc.body.hasAttribute("data-inert")) {
    originalBodyPointerEvents2 = document.body.style.pointerEvents;
    queueMicrotask(() => {
      doc.body.style.pointerEvents = "none";
      doc.body.setAttribute("data-inert", "");
    });
  }
  if (persistentElements) {
    const persistedCleanup = waitForElements2(persistentElements, (el) => {
      cleanups3.push(setStyle2(el, { pointerEvents: "auto" }));
    });
    cleanups3.push(persistedCleanup);
  }
  return () => {
    if (layerStack2.hasPointerBlockingLayer())
      return;
    queueMicrotask(() => {
      doc.body.style.pointerEvents = originalBodyPointerEvents2;
      doc.body.removeAttribute("data-inert");
      if (doc.body.style.length === 0)
        doc.body.removeAttribute("style");
    });
    cleanups3.forEach((fn) => fn());
  };
}
function trackDismissableElementImpl2(node, options) {
  if (!node) {
    warn5("[@zag-js/dismissable] node is `null` or `undefined`");
    return;
  }
  const { onDismiss, pointerBlocking, exclude: excludeContainers, debug } = options;
  const layer = { dismiss: onDismiss, node, pointerBlocking };
  layerStack2.add(layer);
  assignPointerEventToLayers2();
  function onPointerDownOutside(event) {
    const target = getEventTarget5(event.detail.originalEvent);
    if (layerStack2.isBelowPointerBlockingLayer(node) || layerStack2.isInBranch(target))
      return;
    options.onPointerDownOutside?.(event);
    options.onInteractOutside?.(event);
    if (event.defaultPrevented)
      return;
    if (debug) {
      console.log("onPointerDownOutside:", event.detail.originalEvent);
    }
    onDismiss?.();
  }
  function onFocusOutside(event) {
    const target = getEventTarget5(event.detail.originalEvent);
    if (layerStack2.isInBranch(target))
      return;
    options.onFocusOutside?.(event);
    options.onInteractOutside?.(event);
    if (event.defaultPrevented)
      return;
    if (debug) {
      console.log("onFocusOutside:", event.detail.originalEvent);
    }
    onDismiss?.();
  }
  function onEscapeKeyDown(event) {
    if (!layerStack2.isTopMost(node))
      return;
    options.onEscapeKeyDown?.(event);
    if (!event.defaultPrevented && onDismiss) {
      event.preventDefault();
      onDismiss();
    }
  }
  function exclude(target) {
    if (!node)
      return false;
    const containers = typeof excludeContainers === "function" ? excludeContainers() : excludeContainers;
    const _containers = Array.isArray(containers) ? containers : [containers];
    const persistentElements = options.persistentElements?.map((fn) => fn()).filter(isHTMLElement6);
    if (persistentElements)
      _containers.push(...persistentElements);
    return _containers.some((node2) => contains3(node2, target)) || layerStack2.isInNestedLayer(node, target);
  }
  const cleanups3 = [
    pointerBlocking ? disablePointerEventsOutside2(node, options.persistentElements) : void 0,
    trackEscapeKeydown2(node, onEscapeKeyDown),
    trackInteractOutside2(node, { exclude, onFocusOutside, onPointerDownOutside, defer: options.defer })
  ];
  return () => {
    layerStack2.remove(node);
    assignPointerEventToLayers2();
    clearPointerEvent2(node);
    cleanups3.forEach((fn) => fn?.());
  };
}
function trackDismissableElement2(nodeOrFn, options) {
  const { defer } = options;
  const func = defer ? raf7 : (v) => v();
  const cleanups3 = [];
  cleanups3.push(
    func(() => {
      const node = isFunction5(nodeOrFn) ? nodeOrFn() : nodeOrFn;
      cleanups3.push(trackDismissableElementImpl2(node, options));
    })
  );
  return () => {
    func(() => {
      cleanups3.forEach((fn) => fn?.());
    });
  };
}

// node_modules/@zag-js/rect-utils/dist/index.mjs
var createPoint = (x, y) => ({ x, y });
function createRect(r) {
  const { x, y, width, height } = r;
  const midX = x + width / 2;
  const midY = y + height / 2;
  return {
    x,
    y,
    width,
    height,
    minX: x,
    minY: y,
    maxX: x + width,
    maxY: y + height,
    midX,
    midY,
    center: createPoint(midX, midY)
  };
}
function getRectCorners(v) {
  const top = createPoint(v.minX, v.minY);
  const right = createPoint(v.maxX, v.minY);
  const bottom = createPoint(v.maxX, v.maxY);
  const left = createPoint(v.minX, v.maxY);
  return { top, right, bottom, left };
}
var { min: min2, max: max2 } = Math;
function getElementPolygon(rectValue, placement) {
  const rect = createRect(rectValue);
  const { top, right, left, bottom } = getRectCorners(rect);
  const [base] = placement.split("-");
  return {
    top: [left, top, right, bottom],
    right: [top, right, bottom, left],
    bottom: [top, left, bottom, right],
    left: [right, top, left, bottom]
  }[base];
}
function isPointInPolygon(polygon, point) {
  const { x, y } = point;
  let c = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) {
      c = !c;
    }
  }
  return c;
}
var { sign, abs, min: min22 } = Math;

// node_modules/@zag-js/menu/node_modules/@zag-js/types/dist/index.mjs
var createProps4 = () => (props6) => Array.from(new Set(props6));

// node_modules/@zag-js/menu/dist/index.mjs
var anatomy4 = createAnatomy4("menu").parts(
  "arrow",
  "arrowTip",
  "content",
  "contextTrigger",
  "indicator",
  "item",
  "itemGroup",
  "itemGroupLabel",
  "itemIndicator",
  "itemText",
  "positioner",
  "separator",
  "trigger",
  "triggerItem"
);
var parts4 = anatomy4.build();
var dom4 = createScope4({
  getTriggerId: (ctx) => ctx.ids?.trigger ?? `menu:${ctx.id}:trigger`,
  getContextTriggerId: (ctx) => ctx.ids?.contextTrigger ?? `menu:${ctx.id}:ctx-trigger`,
  getContentId: (ctx) => ctx.ids?.content ?? `menu:${ctx.id}:content`,
  getArrowId: (ctx) => ctx.ids?.arrow ?? `menu:${ctx.id}:arrow`,
  getPositionerId: (ctx) => ctx.ids?.positioner ?? `menu:${ctx.id}:popper`,
  getGroupId: (ctx, id) => ctx.ids?.group?.(id) ?? `menu:${ctx.id}:group:${id}`,
  getGroupLabelId: (ctx, id) => ctx.ids?.groupLabel?.(id) ?? `menu:${ctx.id}:group-label:${id}`,
  getContentEl: (ctx) => dom4.getById(ctx, dom4.getContentId(ctx)),
  getPositionerEl: (ctx) => dom4.getById(ctx, dom4.getPositionerId(ctx)),
  getTriggerEl: (ctx) => dom4.getById(ctx, dom4.getTriggerId(ctx)),
  getHighlightedItemEl: (ctx) => ctx.highlightedValue ? dom4.getById(ctx, ctx.highlightedValue) : null,
  getArrowEl: (ctx) => dom4.getById(ctx, dom4.getArrowId(ctx)),
  getElements: (ctx) => {
    const ownerId = CSS.escape(dom4.getContentId(ctx));
    const selector = `[role^="menuitem"][data-ownedby=${ownerId}]:not([data-disabled])`;
    return queryAll2(dom4.getContentEl(ctx), selector);
  },
  getFirstEl: (ctx) => first2(dom4.getElements(ctx)),
  getLastEl: (ctx) => last2(dom4.getElements(ctx)),
  getNextEl: (ctx, loop) => nextById2(dom4.getElements(ctx), ctx.highlightedValue, loop ?? ctx.loopFocus),
  getPrevEl: (ctx, loop) => prevById2(dom4.getElements(ctx), ctx.highlightedValue, loop ?? ctx.loopFocus),
  getElemByKey: (ctx, key) => getByTypeahead(dom4.getElements(ctx), { state: ctx.typeaheadState, key, activeId: ctx.highlightedValue }),
  isTargetDisabled: (v) => {
    return isHTMLElement3(v) && (v.dataset.disabled === "" || v.hasAttribute("disabled"));
  },
  isTriggerItem: (el) => {
    return !!el?.getAttribute("role")?.startsWith("menuitem") && !!el?.hasAttribute("aria-controls");
  },
  getOptionFromItemEl(el) {
    return {
      id: el.id,
      name: el.dataset.name,
      value: el.dataset.value,
      valueText: el.dataset.valueText,
      type: el.dataset.type
    };
  }
});
function connect4(state, send, normalize) {
  const isSubmenu = state.context.isSubmenu;
  const isTypingAhead = state.context.isTypingAhead;
  const composite = state.context.composite;
  const open = state.hasTag("open");
  const popperStyles = getPlacementStyles({
    ...state.context.positioning,
    placement: state.context.anchorPoint ? "bottom" : state.context.currentPlacement
  });
  function getItemState(props22) {
    return {
      disabled: !!props22.disabled,
      highlighted: state.context.highlightedValue === props22.value
    };
  }
  function getOptionItemProps(props22) {
    const valueText = props22.valueText ?? props22.value;
    return { ...props22, id: props22.value, valueText };
  }
  function getOptionItemState(props22) {
    const itemState = getItemState(getOptionItemProps(props22));
    return {
      ...itemState,
      checked: !!props22.checked
    };
  }
  function getItemProps(props22) {
    const { value: id, closeOnSelect, valueText } = props22;
    const itemState = getItemState(props22);
    return normalize.element({
      ...parts4.item.attrs,
      id,
      role: "menuitem",
      "aria-disabled": itemState.disabled,
      "data-disabled": dataAttr3(itemState.disabled),
      "data-ownedby": dom4.getContentId(state.context),
      "data-highlighted": dataAttr3(itemState.highlighted),
      "data-valuetext": valueText,
      onDragStart(event) {
        const isLink = event.currentTarget.matches("a[href]");
        if (isLink)
          event.preventDefault();
      },
      onPointerMove(event) {
        if (itemState.disabled)
          return;
        if (event.pointerType !== "mouse")
          return;
        const target = event.currentTarget;
        if (itemState.highlighted)
          return;
        send({ type: "ITEM_POINTERMOVE", id, target, closeOnSelect });
      },
      onPointerLeave(event) {
        if (itemState.disabled)
          return;
        if (event.pointerType !== "mouse")
          return;
        const pointerMoved = state.previousEvent.type.includes("POINTER");
        if (!pointerMoved)
          return;
        const target = event.currentTarget;
        send({ type: "ITEM_POINTERLEAVE", id, target, closeOnSelect });
      },
      onPointerDown(event) {
        if (itemState.disabled)
          return;
        const target = event.currentTarget;
        send({ type: "ITEM_POINTERDOWN", target, id, closeOnSelect });
      },
      onClick(event) {
        if (isDownloadingEvent(event))
          return;
        if (isOpeningInNewTab(event))
          return;
        if (itemState.disabled)
          return;
        const target = event.currentTarget;
        send({ type: "ITEM_CLICK", target, id, closeOnSelect });
      }
    });
  }
  return {
    highlightedValue: state.context.highlightedValue,
    open,
    setOpen(nextOpen) {
      if (nextOpen === open)
        return;
      send(nextOpen ? "OPEN" : "CLOSE");
    },
    setHighlightedValue(value) {
      send({ type: "HIGHLIGHTED.SET", id: value });
    },
    setParent(parent) {
      send({ type: "PARENT.SET", value: parent, id: parent.state.context.id });
    },
    setChild(child) {
      send({ type: "CHILD.SET", value: child, id: child.state.context.id });
    },
    reposition(options = {}) {
      send({ type: "POSITIONING.SET", options });
    },
    getContextTriggerProps() {
      return normalize.element({
        ...parts4.contextTrigger.attrs,
        dir: state.context.dir,
        id: dom4.getContextTriggerId(state.context),
        onPointerDown(event) {
          if (event.pointerType === "mouse")
            return;
          const point = getEventPoint(event);
          send({ type: "CONTEXT_MENU_START", point });
        },
        onPointerCancel(event) {
          if (event.pointerType === "mouse")
            return;
          send("CONTEXT_MENU_CANCEL");
        },
        onPointerMove(event) {
          if (event.pointerType === "mouse")
            return;
          send("CONTEXT_MENU_CANCEL");
        },
        onPointerUp(event) {
          if (event.pointerType === "mouse")
            return;
          send("CONTEXT_MENU_CANCEL");
        },
        onContextMenu(event) {
          const point = getEventPoint(event);
          send({ type: "CONTEXT_MENU", point });
          event.preventDefault();
        },
        style: {
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          userSelect: "none"
        }
      });
    },
    getTriggerItemProps(childApi) {
      return mergeProps(
        getItemProps({ value: childApi.getTriggerProps().id }),
        childApi.getTriggerProps()
      );
    },
    getTriggerProps() {
      return normalize.button({
        ...isSubmenu ? parts4.triggerItem.attrs : parts4.trigger.attrs,
        "data-placement": state.context.currentPlacement,
        type: "button",
        dir: state.context.dir,
        id: dom4.getTriggerId(state.context),
        "data-uid": state.context.id,
        "aria-haspopup": composite ? "menu" : "dialog",
        "aria-controls": dom4.getContentId(state.context),
        "aria-expanded": open || void 0,
        "data-state": open ? "open" : "closed",
        onPointerMove(event) {
          if (event.pointerType !== "mouse")
            return;
          const disabled = dom4.isTargetDisabled(event.currentTarget);
          if (disabled || !isSubmenu)
            return;
          send({ type: "TRIGGER_POINTERMOVE", target: event.currentTarget });
        },
        onPointerLeave(event) {
          if (dom4.isTargetDisabled(event.currentTarget))
            return;
          if (event.pointerType !== "mouse")
            return;
          if (!isSubmenu)
            return;
          const point = getEventPoint(event);
          send({ type: "TRIGGER_POINTERLEAVE", target: event.currentTarget, point });
        },
        onPointerDown(event) {
          if (dom4.isTargetDisabled(event.currentTarget))
            return;
          if (isContextMenuEvent2(event))
            return;
          event.preventDefault();
        },
        onClick(event) {
          if (event.defaultPrevented)
            return;
          if (dom4.isTargetDisabled(event.currentTarget))
            return;
          send({ type: "TRIGGER_CLICK", target: event.currentTarget });
        },
        onBlur() {
          send("TRIGGER_BLUR");
        },
        onFocus() {
          send("TRIGGER_FOCUS");
        },
        onKeyDown(event) {
          if (event.defaultPrevented)
            return;
          const keyMap4 = {
            ArrowDown() {
              send("ARROW_DOWN");
            },
            ArrowUp() {
              send("ARROW_UP");
            },
            Enter() {
              send({ type: "ARROW_DOWN", src: "enter" });
            },
            Space() {
              send({ type: "ARROW_DOWN", src: "space" });
            }
          };
          const key = getEventKey2(event, state.context);
          const exec4 = keyMap4[key];
          if (exec4) {
            event.preventDefault();
            exec4(event);
          }
        }
      });
    },
    getIndicatorProps() {
      return normalize.element({
        ...parts4.indicator.attrs,
        dir: state.context.dir,
        "data-state": open ? "open" : "closed"
      });
    },
    getPositionerProps() {
      return normalize.element({
        ...parts4.positioner.attrs,
        dir: state.context.dir,
        id: dom4.getPositionerId(state.context),
        style: popperStyles.floating
      });
    },
    getArrowProps() {
      return normalize.element({
        id: dom4.getArrowId(state.context),
        ...parts4.arrow.attrs,
        dir: state.context.dir,
        style: popperStyles.arrow
      });
    },
    getArrowTipProps() {
      return normalize.element({
        ...parts4.arrowTip.attrs,
        dir: state.context.dir,
        style: popperStyles.arrowTip
      });
    },
    getContentProps() {
      return normalize.element({
        ...parts4.content.attrs,
        id: dom4.getContentId(state.context),
        "aria-label": state.context["aria-label"],
        hidden: !open,
        "data-state": open ? "open" : "closed",
        role: composite ? "menu" : "dialog",
        tabIndex: 0,
        dir: state.context.dir,
        "aria-activedescendant": state.context.highlightedValue ?? void 0,
        "aria-labelledby": dom4.getTriggerId(state.context),
        "data-placement": state.context.currentPlacement,
        onPointerEnter(event) {
          if (event.pointerType !== "mouse")
            return;
          send("MENU_POINTERENTER");
        },
        onKeyDown(event) {
          if (event.defaultPrevented)
            return;
          if (!isSelfTarget(event))
            return;
          const target = getEventTarget4(event);
          const sameMenu = target?.closest("[role=menu]") === event.currentTarget || target === event.currentTarget;
          if (!sameMenu)
            return;
          if (event.key === "Tab") {
            const valid = isValidTabEvent(event);
            if (!valid) {
              event.preventDefault();
              return;
            }
          }
          const item = dom4.getHighlightedItemEl(state.context);
          const keyMap4 = {
            ArrowDown() {
              send("ARROW_DOWN");
            },
            ArrowUp() {
              send("ARROW_UP");
            },
            ArrowLeft() {
              send("ARROW_LEFT");
            },
            ArrowRight() {
              send("ARROW_RIGHT");
            },
            Enter() {
              send("ENTER");
              clickIfLink(item);
            },
            Space(event2) {
              if (isTypingAhead) {
                send({ type: "TYPEAHEAD", key: event2.key });
              } else {
                keyMap4.Enter?.(event2);
              }
            },
            Home() {
              send("HOME");
            },
            End() {
              send("END");
            }
          };
          const key = getEventKey2(event, { dir: state.context.dir });
          const exec4 = keyMap4[key];
          if (exec4) {
            exec4(event);
            event.stopPropagation();
            event.preventDefault();
            return;
          }
          if (!state.context.typeahead)
            return;
          if (!isPrintableKey(event))
            return;
          if (isModifierKey(event))
            return;
          if (isEditableElement(target))
            return;
          send({ type: "TYPEAHEAD", key: event.key });
          event.preventDefault();
        }
      });
    },
    getSeparatorProps() {
      return normalize.element({
        ...parts4.separator.attrs,
        role: "separator",
        dir: state.context.dir,
        "aria-orientation": "horizontal"
      });
    },
    getItemState,
    getItemProps,
    getOptionItemState,
    getOptionItemProps(props22) {
      const { type, disabled, onCheckedChange, closeOnSelect } = props22;
      const option = getOptionItemProps(props22);
      const itemState = getOptionItemState(props22);
      return {
        ...getItemProps(option),
        ...normalize.element({
          "data-type": type,
          ...parts4.item.attrs,
          dir: state.context.dir,
          "data-value": option.value,
          role: `menuitem${type}`,
          "aria-checked": !!itemState.checked,
          "data-state": itemState.checked ? "checked" : "unchecked",
          onClick(event) {
            if (disabled)
              return;
            if (isDownloadingEvent(event))
              return;
            if (isOpeningInNewTab(event))
              return;
            const target = event.currentTarget;
            send({ type: "ITEM_CLICK", target, option, closeOnSelect });
            onCheckedChange?.(!itemState.checked);
          }
        })
      };
    },
    getItemIndicatorProps(props22) {
      const itemState = getOptionItemState(props22);
      return normalize.element({
        ...parts4.itemIndicator.attrs,
        dir: state.context.dir,
        "data-disabled": dataAttr3(itemState.disabled),
        "data-highlighted": dataAttr3(itemState.highlighted),
        "data-state": itemState.checked ? "checked" : "unchecked",
        hidden: !itemState.checked
      });
    },
    getItemTextProps(props22) {
      const itemState = getOptionItemState(props22);
      return normalize.element({
        ...parts4.itemText.attrs,
        dir: state.context.dir,
        "data-disabled": dataAttr3(itemState.disabled),
        "data-highlighted": dataAttr3(itemState.highlighted),
        "data-state": itemState.checked ? "checked" : "unchecked"
      });
    },
    getItemGroupLabelProps(props22) {
      return normalize.element({
        id: dom4.getGroupLabelId(state.context, props22.htmlFor),
        dir: state.context.dir,
        ...parts4.itemGroupLabel.attrs
      });
    },
    getItemGroupProps(props22) {
      return normalize.element({
        id: dom4.getGroupId(state.context, props22.id),
        ...parts4.itemGroup.attrs,
        dir: state.context.dir,
        "aria-labelledby": dom4.getGroupLabelId(state.context, props22.id),
        role: "group"
      });
    }
  };
}
var { not: not4, and: and4, or: or3 } = guards2;
function machine4(userContext) {
  const ctx = compact4(userContext);
  return createMachine4(
    {
      id: "menu",
      initial: ctx.open ? "open" : "idle",
      context: {
        highlightedValue: null,
        loopFocus: false,
        anchorPoint: null,
        closeOnSelect: true,
        typeahead: true,
        composite: true,
        ...ctx,
        positioning: {
          placement: "bottom-start",
          gutter: 8,
          ...ctx.positioning
        },
        intentPolygon: null,
        parent: null,
        lastHighlightedValue: null,
        children: cast4(ref4({})),
        suspendPointer: false,
        typeaheadState: getByTypeahead.defaultOptions
      },
      computed: {
        isSubmenu: (ctx2) => ctx2.parent !== null,
        isRtl: (ctx2) => ctx2.dir === "rtl",
        isTypingAhead: (ctx2) => ctx2.typeaheadState.keysSoFar !== ""
      },
      watch: {
        isSubmenu: "setSubmenuPlacement",
        anchorPoint: "reposition",
        open: "toggleVisibility"
      },
      on: {
        "PARENT.SET": {
          actions: "setParentMenu"
        },
        "CHILD.SET": {
          actions: "setChildMenu"
        },
        OPEN: [
          {
            guard: "isOpenControlled",
            actions: "invokeOnOpen"
          },
          {
            target: "open",
            actions: "invokeOnOpen"
          }
        ],
        OPEN_AUTOFOCUS: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            internal: true,
            target: "open",
            actions: ["highlightFirstItem", "invokeOnOpen"]
          }
        ],
        CLOSE: [
          {
            guard: "isOpenControlled",
            actions: "invokeOnClose"
          },
          {
            target: "closed",
            actions: "invokeOnClose"
          }
        ],
        "HIGHLIGHTED.RESTORE": {
          actions: "restoreHighlightedItem"
        },
        "HIGHLIGHTED.SET": {
          actions: "setHighlightedItem"
        }
      },
      states: {
        idle: {
          tags: ["closed"],
          on: {
            "CONTROLLED.OPEN": "open",
            "CONTROLLED.CLOSE": "closed",
            CONTEXT_MENU_START: {
              target: "opening:contextmenu",
              actions: "setAnchorPoint"
            },
            CONTEXT_MENU: [
              {
                guard: "isOpenControlled",
                actions: ["setAnchorPoint", "invokeOnOpen"]
              },
              {
                target: "open",
                actions: ["setAnchorPoint", "invokeOnOpen"]
              }
            ],
            TRIGGER_CLICK: [
              {
                guard: "isOpenControlled",
                actions: "invokeOnOpen"
              },
              {
                target: "open",
                actions: "invokeOnOpen"
              }
            ],
            TRIGGER_FOCUS: {
              guard: not4("isSubmenu"),
              target: "closed"
            },
            TRIGGER_POINTERMOVE: {
              guard: "isSubmenu",
              target: "opening"
            }
          }
        },
        "opening:contextmenu": {
          tags: ["closed"],
          after: {
            LONG_PRESS_DELAY: [
              {
                guard: "isOpenControlled",
                actions: "invokeOnOpen"
              },
              {
                target: "open",
                actions: "invokeOnOpen"
              }
            ]
          },
          on: {
            "CONTROLLED.OPEN": "open",
            "CONTROLLED.CLOSE": "closed",
            CONTEXT_MENU_CANCEL: [
              {
                guard: "isOpenControlled",
                actions: "invokeOnClose"
              },
              {
                target: "closed",
                actions: "invokeOnClose"
              }
            ]
          }
        },
        opening: {
          tags: ["closed"],
          after: {
            SUBMENU_OPEN_DELAY: [
              {
                guard: "isOpenControlled",
                actions: "invokeOnOpen"
              },
              {
                target: "open",
                actions: "invokeOnOpen"
              }
            ]
          },
          on: {
            "CONTROLLED.OPEN": "open",
            "CONTROLLED.CLOSE": "closed",
            BLUR: [
              {
                guard: "isOpenControlled",
                actions: "invokeOnClose"
              },
              {
                target: "closed",
                actions: "invokeOnClose"
              }
            ],
            TRIGGER_POINTERLEAVE: [
              {
                guard: "isOpenControlled",
                actions: "invokeOnClose"
              },
              {
                target: "closed",
                actions: "invokeOnClose"
              }
            ]
          }
        },
        closing: {
          tags: ["open"],
          activities: ["trackPointerMove", "trackInteractOutside"],
          after: {
            SUBMENU_CLOSE_DELAY: [
              {
                guard: "isOpenControlled",
                actions: ["invokeOnClose"]
              },
              {
                target: "closed",
                actions: ["focusParentMenu", "restoreParentHighlightedItem", "invokeOnClose"]
              }
            ]
          },
          on: {
            "CONTROLLED.OPEN": "open",
            "CONTROLLED.CLOSE": {
              target: "closed",
              actions: ["focusParentMenu", "restoreParentHighlightedItem"]
            },
            // don't invoke on open here since the menu is still open (we're only keeping it open)
            MENU_POINTERENTER: {
              target: "open",
              actions: "clearIntentPolygon"
            },
            POINTER_MOVED_AWAY_FROM_SUBMENU: [
              {
                guard: "isOpenControlled",
                actions: "invokeOnClose"
              },
              {
                target: "closed",
                actions: ["focusParentMenu", "restoreParentHighlightedItem"]
              }
            ]
          }
        },
        closed: {
          tags: ["closed"],
          entry: ["clearHighlightedItem", "focusTrigger", "resumePointer"],
          on: {
            "CONTROLLED.OPEN": [
              {
                guard: or3("isOpenAutoFocusEvent", "isArrowDownEvent"),
                target: "open",
                actions: "highlightFirstItem"
              },
              {
                guard: "isArrowUpEvent",
                target: "open",
                actions: "highlightLastItem"
              },
              {
                target: "open"
              }
            ],
            CONTEXT_MENU_START: {
              target: "opening:contextmenu",
              actions: "setAnchorPoint"
            },
            CONTEXT_MENU: [
              {
                guard: "isOpenControlled",
                actions: ["setAnchorPoint", "invokeOnOpen"]
              },
              {
                target: "open",
                actions: ["setAnchorPoint", "invokeOnOpen"]
              }
            ],
            TRIGGER_CLICK: [
              {
                guard: "isOpenControlled",
                actions: "invokeOnOpen"
              },
              {
                target: "open",
                actions: "invokeOnOpen"
              }
            ],
            TRIGGER_POINTERMOVE: {
              guard: "isTriggerItem",
              target: "opening"
            },
            TRIGGER_BLUR: "idle",
            ARROW_DOWN: [
              {
                guard: "isOpenControlled",
                actions: "invokeOnOpen"
              },
              {
                target: "open",
                actions: ["highlightFirstItem", "invokeOnOpen"]
              }
            ],
            ARROW_UP: [
              {
                guard: "isOpenControlled",
                actions: "invokeOnOpen"
              },
              {
                target: "open",
                actions: ["highlightLastItem", "invokeOnOpen"]
              }
            ]
          }
        },
        open: {
          tags: ["open"],
          activities: ["trackInteractOutside", "trackPositioning", "scrollToHighlightedItem"],
          entry: ["focusMenu", "resumePointer"],
          on: {
            "CONTROLLED.CLOSE": [
              {
                target: "closed",
                guard: "isArrowLeftEvent",
                actions: ["focusParentMenu"]
              },
              {
                target: "closed"
              }
            ],
            TRIGGER_CLICK: [
              {
                guard: and4(not4("isTriggerItem"), "isOpenControlled"),
                actions: "invokeOnClose"
              },
              {
                guard: not4("isTriggerItem"),
                target: "closed",
                actions: "invokeOnClose"
              }
            ],
            ARROW_UP: {
              actions: ["highlightPrevItem", "focusMenu"]
            },
            ARROW_DOWN: {
              actions: ["highlightNextItem", "focusMenu"]
            },
            ARROW_LEFT: [
              {
                guard: and4("isSubmenu", "isOpenControlled"),
                actions: "invokeOnClose"
              },
              {
                guard: "isSubmenu",
                target: "closed",
                actions: ["focusParentMenu", "invokeOnClose"]
              }
            ],
            HOME: {
              actions: ["highlightFirstItem", "focusMenu"]
            },
            END: {
              actions: ["highlightLastItem", "focusMenu"]
            },
            ARROW_RIGHT: {
              guard: "isTriggerItemHighlighted",
              actions: "openSubmenu"
            },
            ENTER: [
              {
                guard: "isTriggerItemHighlighted",
                actions: "openSubmenu"
              },
              {
                actions: "clickHighlightedItem"
              }
            ],
            ITEM_POINTERMOVE: [
              {
                guard: not4("suspendPointer"),
                actions: ["setHighlightedItem", "focusMenu"]
              },
              {
                actions: "setLastHighlightedItem"
              }
            ],
            ITEM_POINTERLEAVE: {
              guard: and4(not4("suspendPointer"), not4("isTriggerItem")),
              actions: "clearHighlightedItem"
            },
            ITEM_CLICK: [
              // == grouped ==
              {
                guard: and4(
                  not4("isTriggerItemHighlighted"),
                  not4("isHighlightedItemEditable"),
                  "closeOnSelect",
                  "isOpenControlled"
                ),
                actions: ["invokeOnSelect", "setOptionState", "closeRootMenu", "invokeOnClose"]
              },
              {
                guard: and4(not4("isTriggerItemHighlighted"), not4("isHighlightedItemEditable"), "closeOnSelect"),
                target: "closed",
                actions: ["invokeOnSelect", "setOptionState", "closeRootMenu", "invokeOnClose"]
              },
              //
              {
                guard: and4(not4("isTriggerItemHighlighted"), not4("isHighlightedItemEditable")),
                actions: ["invokeOnSelect", "setOptionState"]
              },
              { actions: "setHighlightedItem" }
            ],
            TRIGGER_POINTERLEAVE: {
              target: "closing",
              actions: "setIntentPolygon"
            },
            ITEM_POINTERDOWN: {
              actions: "setHighlightedItem"
            },
            TYPEAHEAD: {
              actions: "highlightMatchedItem"
            },
            FOCUS_MENU: {
              actions: "focusMenu"
            },
            "POSITIONING.SET": {
              actions: "reposition"
            }
          }
        }
      }
    },
    {
      delays: {
        LONG_PRESS_DELAY: 700,
        SUBMENU_OPEN_DELAY: 100,
        SUBMENU_CLOSE_DELAY: 100
      },
      guards: {
        closeOnSelect: (ctx2, evt) => !!(evt?.closeOnSelect ?? ctx2.closeOnSelect),
        // whether the trigger is also a menu item
        isTriggerItem: (_ctx, evt) => dom4.isTriggerItem(evt.target),
        // whether the trigger item is the active item
        isTriggerItemHighlighted: (ctx2, evt) => {
          const target = evt.target ?? dom4.getHighlightedItemEl(ctx2);
          return !!target?.hasAttribute("aria-controls");
        },
        isSubmenu: (ctx2) => ctx2.isSubmenu,
        suspendPointer: (ctx2) => ctx2.suspendPointer,
        isHighlightedItemEditable: (ctx2) => isEditableElement(dom4.getHighlightedItemEl(ctx2)),
        isWithinPolygon: (ctx2, evt) => {
          if (!ctx2.intentPolygon)
            return false;
          return isPointInPolygon(ctx2.intentPolygon, evt.point);
        },
        // guard assertions (for controlled mode)
        isOpenControlled: (ctx2) => !!ctx2["open.controlled"],
        isArrowLeftEvent: (_ctx, evt) => evt.previousEvent?.type === "ARROW_LEFT",
        isArrowUpEvent: (_ctx, evt) => evt.previousEvent?.type === "ARROW_UP",
        isArrowDownEvent: (_ctx, evt) => evt.previousEvent?.type === "ARROW_DOWN",
        isOpenAutoFocusEvent: (_ctx, evt) => evt.previousEvent?.type === "OPEN_AUTOFOCUS"
      },
      activities: {
        trackPositioning(ctx2) {
          if (ctx2.anchorPoint)
            return;
          ctx2.currentPlacement = ctx2.positioning.placement;
          const getPositionerEl = () => dom4.getPositionerEl(ctx2);
          return getPlacement(dom4.getTriggerEl(ctx2), getPositionerEl, {
            ...ctx2.positioning,
            defer: true,
            onComplete(data) {
              ctx2.currentPlacement = data.placement;
            }
          });
        },
        trackInteractOutside(ctx2, _evt, { send }) {
          const getContentEl = () => dom4.getContentEl(ctx2);
          let restoreFocus = true;
          return trackDismissableElement2(getContentEl, {
            defer: true,
            exclude: [dom4.getTriggerEl(ctx2)],
            onInteractOutside: ctx2.onInteractOutside,
            onFocusOutside: ctx2.onFocusOutside,
            onEscapeKeyDown(event) {
              ctx2.onEscapeKeyDown?.(event);
              if (ctx2.isSubmenu)
                event.preventDefault();
              closeRootMenu(ctx2);
            },
            onPointerDownOutside(event) {
              restoreFocus = !event.detail.focusable;
              ctx2.onPointerDownOutside?.(event);
            },
            onDismiss() {
              send({ type: "CLOSE", src: "interact-outside", restoreFocus });
            }
          });
        },
        trackPointerMove(ctx2, _evt, { guards: guards22, send }) {
          const { isWithinPolygon } = guards22;
          ctx2.parent.state.context.suspendPointer = true;
          const doc = dom4.getDoc(ctx2);
          return addDomEvent3(doc, "pointermove", (e) => {
            const point = { x: e.clientX, y: e.clientY };
            const isMovingToSubmenu = isWithinPolygon(ctx2, { point });
            if (!isMovingToSubmenu) {
              send("POINTER_MOVED_AWAY_FROM_SUBMENU");
              ctx2.parent.state.context.suspendPointer = false;
            }
          });
        },
        scrollToHighlightedItem(ctx2, _evt, { getState }) {
          const exec4 = () => {
            const state = getState();
            if (state.event.type.startsWith("ITEM_POINTER"))
              return;
            const itemEl = dom4.getHighlightedItemEl(ctx2);
            const contentEl2 = dom4.getContentEl(ctx2);
            scrollIntoView(itemEl, { rootEl: contentEl2, block: "nearest" });
          };
          raf5(() => exec4());
          const contentEl = () => dom4.getContentEl(ctx2);
          return observeAttributes(contentEl, {
            defer: true,
            attributes: ["aria-activedescendant"],
            callback: exec4
          });
        }
      },
      actions: {
        setAnchorPoint(ctx2, evt) {
          ctx2.anchorPoint = evt.point;
        },
        setSubmenuPlacement(ctx2) {
          if (!ctx2.isSubmenu)
            return;
          ctx2.positioning.placement = ctx2.isRtl ? "left-start" : "right-start";
          ctx2.positioning.gutter = 0;
        },
        reposition(ctx2, evt) {
          const getPositionerEl = () => dom4.getPositionerEl(ctx2);
          const getAnchorRect = ctx2.anchorPoint ? () => ({ width: 0, height: 0, ...ctx2.anchorPoint }) : void 0;
          getPlacement(dom4.getTriggerEl(ctx2), getPositionerEl, {
            ...ctx2.positioning,
            defer: true,
            getAnchorRect,
            ...evt.options ?? {},
            listeners: false,
            onComplete(data) {
              ctx2.currentPlacement = data.placement;
            }
          });
        },
        setOptionState(_ctx, evt) {
          if (!evt.option)
            return;
          const { checked, onCheckedChange, type } = evt.option;
          if (type === "radio") {
            onCheckedChange?.(true);
          } else if (type === "checkbox") {
            onCheckedChange?.(!checked);
          }
        },
        clickHighlightedItem(ctx2, _evt) {
          const itemEl = dom4.getHighlightedItemEl(ctx2);
          if (!itemEl || itemEl.dataset.disabled)
            return;
          queueMicrotask(() => itemEl.click());
        },
        setIntentPolygon(ctx2, evt) {
          const menu = dom4.getContentEl(ctx2);
          const placement = ctx2.currentPlacement;
          if (!menu || !placement)
            return;
          const rect = menu.getBoundingClientRect();
          const polygon = getElementPolygon(rect, placement);
          if (!polygon)
            return;
          const rightSide = getPlacementSide(placement) === "right";
          const bleed = rightSide ? -5 : 5;
          ctx2.intentPolygon = [{ ...evt.point, x: evt.point.x + bleed }, ...polygon];
        },
        clearIntentPolygon(ctx2) {
          ctx2.intentPolygon = null;
        },
        resumePointer(ctx2) {
          if (!ctx2.parent)
            return;
          ctx2.parent.state.context.suspendPointer = false;
        },
        setHighlightedItem(ctx2, evt) {
          set8.highlighted(ctx2, evt.id);
        },
        clearHighlightedItem(ctx2) {
          set8.highlighted(ctx2, null);
        },
        focusMenu(ctx2) {
          raf5(() => {
            const contentEl = dom4.getContentEl(ctx2);
            const initialFocusEl = getInitialFocus({
              root: contentEl,
              enabled: !contains2(contentEl, dom4.getActiveElement(ctx2)),
              filter(node) {
                return !node.role?.startsWith("menuitem");
              }
            });
            initialFocusEl?.focus({ preventScroll: true });
          });
        },
        highlightFirstItem(ctx2) {
          const fn = !!dom4.getContentEl(ctx2) ? queueMicrotask : raf5;
          fn(() => {
            const first22 = dom4.getFirstEl(ctx2);
            if (!first22)
              return;
            set8.highlighted(ctx2, first22.id);
          });
        },
        highlightLastItem(ctx2) {
          const fn = !!dom4.getContentEl(ctx2) ? queueMicrotask : raf5;
          fn(() => {
            const last22 = dom4.getLastEl(ctx2);
            if (!last22)
              return;
            set8.highlighted(ctx2, last22.id);
          });
        },
        highlightNextItem(ctx2, evt) {
          const next = dom4.getNextEl(ctx2, evt.loop);
          set8.highlighted(ctx2, next?.id ?? null);
        },
        highlightPrevItem(ctx2, evt) {
          const prev = dom4.getPrevEl(ctx2, evt.loop);
          set8.highlighted(ctx2, prev?.id ?? null);
        },
        invokeOnSelect(ctx2) {
          if (!ctx2.highlightedValue)
            return;
          ctx2.onSelect?.({ value: ctx2.highlightedValue });
        },
        focusTrigger(ctx2, evt) {
          if (ctx2.isSubmenu || ctx2.anchorPoint || evt.restoreFocus === false)
            return;
          queueMicrotask(() => dom4.getTriggerEl(ctx2)?.focus({ preventScroll: true }));
        },
        highlightMatchedItem(ctx2, evt) {
          const node = dom4.getElemByKey(ctx2, evt.key);
          if (!node)
            return;
          set8.highlighted(ctx2, node.id);
        },
        setParentMenu(ctx2, evt) {
          ctx2.parent = ref4(evt.value);
        },
        setChildMenu(ctx2, evt) {
          ctx2.children[evt.id] = ref4(evt.value);
        },
        closeRootMenu(ctx2) {
          closeRootMenu(ctx2);
        },
        openSubmenu(ctx2) {
          const item = dom4.getHighlightedItemEl(ctx2);
          const id = item?.getAttribute("data-uid");
          const child = id ? ctx2.children[id] : null;
          child?.send("OPEN_AUTOFOCUS");
        },
        focusParentMenu(ctx2) {
          ctx2.parent?.send("FOCUS_MENU");
        },
        setLastHighlightedItem(ctx2, evt) {
          ctx2.lastHighlightedValue = evt.id;
        },
        restoreHighlightedItem(ctx2) {
          if (!ctx2.lastHighlightedValue)
            return;
          set8.highlighted(ctx2, ctx2.lastHighlightedValue);
          ctx2.lastHighlightedValue = null;
        },
        restoreParentHighlightedItem(ctx2) {
          ctx2.parent?.send("HIGHLIGHTED.RESTORE");
        },
        invokeOnOpen(ctx2) {
          ctx2.onOpenChange?.({ open: true });
        },
        invokeOnClose(ctx2) {
          ctx2.onOpenChange?.({ open: false });
        },
        toggleVisibility(ctx2, evt, { send }) {
          send({ type: ctx2.open ? "CONTROLLED.OPEN" : "CONTROLLED.CLOSE", previousEvent: evt });
        }
      }
    }
  );
}
function closeRootMenu(ctx) {
  let parent = ctx.parent;
  while (parent && parent.state.context.isSubmenu) {
    parent = parent.state.context.parent;
  }
  parent?.send("CLOSE");
}
var set8 = {
  highlighted(ctx, value) {
    if (isEqual2(ctx.highlightedValue, value))
      return;
    ctx.highlightedValue = value;
    ctx.onHighlightChange?.({ highlightedValue: value });
  }
};
var props4 = createProps4()([
  "anchorPoint",
  "aria-label",
  "closeOnSelect",
  "dir",
  "getRootNode",
  "highlightedValue",
  "id",
  "ids",
  "loopFocus",
  "onFocusOutside",
  "onInteractOutside",
  "onOpenChange",
  "onPointerDownOutside",
  "onEscapeKeyDown",
  "onSelect",
  "onHighlightChange",
  "open",
  "open.controlled",
  "positioning",
  "typeahead",
  "composite"
]);
var splitProps8 = createSplitProps4(props4);
var itemProps2 = createProps4()(["closeOnSelect", "disabled", "value", "valueText"]);
var splitItemProps2 = createSplitProps4(itemProps2);
var itemGroupLabelProps = createProps4()(["htmlFor"]);
var splitItemGroupLabelProps = createSplitProps4(itemGroupLabelProps);
var itemGroupProps = createProps4()(["id"]);
var splitItemGroupProps = createSplitProps4(itemGroupProps);
var optionItemProps = createProps4()([
  "disabled",
  "valueText",
  "closeOnSelect",
  "type",
  "value",
  "checked",
  "onCheckedChange"
]);
var splitOptionItemProps = createSplitProps4(optionItemProps);

// js/widgex/menu.ts
var Menu = class extends Component {
  initService(context) {
    return machine4(context);
  }
  initApi() {
    return connect4(this.service.state, this.service.send, normalizeProps);
  }
  render() {
    const parts6 = ["trigger", "positioner", "content"];
    for (const part of parts6)
      renderPart(this.el, part, this.api);
    this.renderItemGroupLabels();
    this.renderItemGroups();
    this.renderItems();
    this.renderSeparators();
  }
  renderItemGroupLabels() {
    for (const itemGroupLabel of this.el.querySelectorAll("[data-part='item-group-label']")) {
      const htmlFor = itemGroupLabel.getAttribute("for");
      if (!htmlFor) {
        console.error("Missing `for` attribute on item group label.");
        return;
      }
      spreadProps(itemGroupLabel, this.api.getItemGroupLabelProps({ htmlFor }));
    }
  }
  renderItemGroups() {
    for (const itemGroup of this.el.querySelectorAll("[data-part='item-group']")) {
      const value = itemGroup.dataset.value;
      if (!value) {
        console.error("Missing `data-value` attribute on item group.");
        return;
      }
      spreadProps(itemGroup, this.api.getItemGroupProps({ id: value }));
    }
  }
  renderItems() {
    for (const item of this.el.querySelectorAll("[data-part='item']")) {
      const value = item.dataset.value;
      if (!value) {
        console.error("Missing `data-value` attribute on item.");
        return;
      }
      spreadProps(item, this.api.getItemProps({ value }));
    }
  }
  renderSeparators() {
    for (const separator of this.el.querySelectorAll("[data-part='separator']"))
      spreadProps(separator, this.api.getSeparatorProps());
  }
};
var menu_default = {
  mounted() {
    this.context = { id: this.el.id };
    this.menu = new Menu(this.el, this.context);
    this.menu.init();
  },
  updated() {
    this.menu.render();
  },
  beforeDestroy() {
    this.menu.destroy();
  }
};

// node_modules/@zag-js/tabs/node_modules/@zag-js/anatomy/dist/index.mjs
var createAnatomy5 = (name, parts6 = []) => ({
  parts: (...values) => {
    if (isEmpty5(parts6)) {
      return createAnatomy5(name, values);
    }
    throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
  },
  extendWith: (...values) => createAnatomy5(name, [...parts6, ...values]),
  rename: (newName) => createAnatomy5(newName, parts6),
  keys: () => parts6,
  build: () => [...new Set(parts6)].reduce(
    (prev, part) => Object.assign(prev, {
      [part]: {
        selector: [
          `&[data-scope="${toKebabCase5(name)}"][data-part="${toKebabCase5(part)}"]`,
          `& [data-scope="${toKebabCase5(name)}"][data-part="${toKebabCase5(part)}"]`
        ].join(", "),
        attrs: { "data-scope": toKebabCase5(name), "data-part": toKebabCase5(part) }
      }
    }),
    {}
  )
});
var toKebabCase5 = (value) => value.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
var isEmpty5 = (v) => v.length === 0;

// node_modules/@zag-js/tabs/node_modules/@zag-js/dom-query/dist/index.mjs
var dataAttr4 = (guard) => guard ? "" : void 0;
var ELEMENT_NODE7 = 1;
var DOCUMENT_NODE9 = 9;
var isObject17 = (v) => typeof v === "object" && v !== null;
var isHTMLElement8 = (el) => isObject17(el) && el.nodeType === ELEMENT_NODE7 && typeof el.nodeName === "string";
var isDocument9 = (el) => isObject17(el) && el.nodeType === DOCUMENT_NODE9;
var isWindow8 = (el) => isObject17(el) && el === el.window;
function contains5(parent, child) {
  if (!parent || !child)
    return false;
  if (!isHTMLElement8(parent) || !isHTMLElement8(child))
    return false;
  return parent === child || parent.contains(child);
}
function getDocument8(el) {
  if (isDocument9(el))
    return el;
  if (isWindow8(el))
    return el.document;
  return el?.ownerDocument ?? document;
}
function getActiveElement6(rootNode) {
  let activeElement = rootNode.activeElement;
  while (activeElement?.shadowRoot) {
    const el = activeElement.shadowRoot.activeElement;
    if (el === activeElement)
      break;
    else
      activeElement = el;
  }
  return activeElement;
}
var isDom6 = () => typeof document !== "undefined";
function getPlatform6() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
var pt6 = (v) => isDom6() && v.test(getPlatform6());
var ua2 = (v) => isDom6() && v.test(navigator.userAgent);
var vn2 = (v) => isDom6() && v.test(navigator.vendor);
var isSafari2 = () => isApple3() && vn2(/apple/i);
var isFirefox4 = () => ua2(/firefox\//i);
var isApple3 = () => pt6(/mac|iphone|ipad|ipod/i);
function getComposedPath7(event) {
  return event.composedPath?.() ?? event.nativeEvent?.composedPath?.();
}
function getEventTarget7(event) {
  const composedPath = getComposedPath7(event);
  return composedPath?.[0] ?? event.target;
}
var isSelfTarget2 = (event) => {
  return contains5(event.currentTarget, getEventTarget7(event));
};
function isComposingEvent(event) {
  return event.nativeEvent?.isComposing ?? event.isComposing;
}
var defaultItemToId3 = (v) => v.id;
function itemById3(v, id, itemToId = defaultItemToId3) {
  return v.find((item) => itemToId(item) === id);
}
function indexOfId3(v, id, itemToId = defaultItemToId3) {
  const item = itemById3(v, id, itemToId);
  return item ? v.indexOf(item) : -1;
}
function nextById3(v, id, loop = true) {
  let idx = indexOfId3(v, id);
  idx = loop ? (idx + 1) % v.length : Math.min(idx + 1, v.length - 1);
  return v[idx];
}
function prevById3(v, id, loop = true) {
  let idx = indexOfId3(v, id);
  if (idx === -1)
    return loop ? v[v.length - 1] : null;
  idx = loop ? (idx - 1 + v.length) % v.length : Math.max(0, idx - 1);
  return v[idx];
}
var isHTMLElement26 = (element) => typeof element === "object" && element !== null && element.nodeType === 1;
var isFrame3 = (element) => isHTMLElement26(element) && element.tagName === "IFRAME";
function isVisible5(el) {
  if (!isHTMLElement26(el))
    return false;
  return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
}
var focusableSelector5 = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type";
var getFocusables2 = (container, includeContainer = false) => {
  if (!container)
    return [];
  const elements = Array.from(container.querySelectorAll(focusableSelector5));
  const include = includeContainer == true || includeContainer == "if-empty" && elements.length === 0;
  if (include && isHTMLElement26(container) && isFocusable5(container)) {
    elements.unshift(container);
  }
  const focusableElements = elements.filter(isFocusable5);
  focusableElements.forEach((element, i) => {
    if (isFrame3(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      focusableElements.splice(i, 1, ...getFocusables2(frameBody));
    }
  });
  return focusableElements;
};
function isFocusable5(element) {
  if (!element || element.closest("[inert]"))
    return false;
  return element.matches(focusableSelector5) && isVisible5(element);
}
function nextTick(fn) {
  const set22 = /* @__PURE__ */ new Set();
  function raf22(fn2) {
    const id = globalThis.requestAnimationFrame(fn2);
    set22.add(() => globalThis.cancelAnimationFrame(id));
  }
  raf22(() => raf22(fn));
  return function cleanup() {
    set22.forEach((fn2) => fn2());
  };
}
function raf9(fn) {
  const id = globalThis.requestAnimationFrame(fn);
  return () => {
    globalThis.cancelAnimationFrame(id);
  };
}
function queryAll3(root, selector) {
  return Array.from(root?.querySelectorAll(selector) ?? []);
}
function createScope5(methods) {
  const dom6 = {
    getRootNode: (ctx) => ctx.getRootNode?.() ?? document,
    getDoc: (ctx) => getDocument8(dom6.getRootNode(ctx)),
    getWin: (ctx) => dom6.getDoc(ctx).defaultView ?? window,
    getActiveElement: (ctx) => getActiveElement6(dom6.getRootNode(ctx)),
    isActiveElement: (ctx, elem) => elem === dom6.getActiveElement(ctx),
    getById: (ctx, id) => dom6.getRootNode(ctx).getElementById(id),
    setValue: (elem, value) => {
      if (elem == null || value == null)
        return;
      const valueAsString = value.toString();
      if (elem.value === valueAsString)
        return;
      elem.value = value.toString();
    }
  };
  return { ...dom6, ...methods };
}
var fps10 = 1e3 / 60;

// node_modules/@zag-js/tabs/node_modules/@zag-js/dom-event/dist/index.mjs
function queueBeforeEvent2(element, type, cb) {
  const createTimer = (callback) => {
    const timerId = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(timerId);
  };
  const cancelTimer = createTimer(() => {
    element.removeEventListener(type, callSync, true);
    cb();
  });
  const callSync = () => {
    cancelTimer();
    cb();
  };
  element.addEventListener(type, callSync, { once: true, capture: true });
  return cancelTimer;
}
function isLinkElement2(element) {
  return element?.matches("a[href]") ?? false;
}
function clickIfLink2(element) {
  if (!isLinkElement2(element))
    return;
  const click = () => element.click();
  if (isFirefox4()) {
    queueBeforeEvent2(element, "keyup", click);
  } else {
    queueMicrotask(click);
  }
}
var keyMap3 = {
  Up: "ArrowUp",
  Down: "ArrowDown",
  Esc: "Escape",
  " ": "Space",
  ",": "Comma",
  Left: "ArrowLeft",
  Right: "ArrowRight"
};
var rtlKeyMap3 = {
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft"
};
function getEventKey3(event, options = {}) {
  const { dir = "ltr", orientation = "horizontal" } = options;
  let { key } = event;
  key = keyMap3[key] ?? key;
  const isRtl = dir === "rtl" && orientation === "horizontal";
  if (isRtl && key in rtlKeyMap3) {
    key = rtlKeyMap3[key];
  }
  return key;
}

// node_modules/@zag-js/tabs/node_modules/@zag-js/utils/dist/index.mjs
var first3 = (v) => v[0];
var last3 = (v) => v[v.length - 1];
function clear5(v) {
  while (v.length > 0)
    v.pop();
  return v;
}
var isArrayLike3 = (value) => value?.constructor.name === "Array";
var isArrayEqual3 = (a, b) => {
  if (a.length !== b.length)
    return false;
  for (let i = 0; i < a.length; i++) {
    if (!isEqual3(a[i], b[i]))
      return false;
  }
  return true;
};
var isEqual3 = (a, b) => {
  if (Object.is(a, b))
    return true;
  if (a == null && b != null || a != null && b == null)
    return false;
  if (typeof a?.isEqual === "function" && typeof b?.isEqual === "function") {
    return a.isEqual(b);
  }
  if (typeof a === "function" && typeof b === "function") {
    return a.toString() === b.toString();
  }
  if (isArrayLike3(a) && isArrayLike3(b)) {
    return isArrayEqual3(Array.from(a), Array.from(b));
  }
  if (!(typeof a === "object") || !(typeof b === "object"))
    return false;
  const keys = Object.keys(b ?? /* @__PURE__ */ Object.create(null));
  const length = keys.length;
  for (let i = 0; i < length; i++) {
    const hasKey = Reflect.has(a, keys[i]);
    if (!hasKey)
      return false;
  }
  for (let i = 0; i < length; i++) {
    const key = keys[i];
    if (!isEqual3(a[key], b[key]))
      return false;
  }
  return true;
};
var runIfFn6 = (v, ...a) => {
  const res = typeof v === "function" ? v(...a) : v;
  return res ?? void 0;
};
var cast5 = (v) => v;
var noop6 = () => {
};
var uuid5 = /* @__PURE__ */ (() => {
  let id = 0;
  return () => {
    id++;
    return id.toString(36);
  };
})();
var isDev9 = () => true;
var isArray5 = (v) => Array.isArray(v);
var isObjectLike5 = (v) => v != null && typeof v === "object";
var isObject18 = (v) => isObjectLike5(v) && !isArray5(v);
var isNumber5 = (v) => typeof v === "number" && !Number.isNaN(v);
var isString5 = (v) => typeof v === "string";
var isFunction6 = (v) => typeof v === "function";
var hasProp5 = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
var baseGetTag5 = (v) => Object.prototype.toString.call(v);
var fnToString8 = Function.prototype.toString;
var objectCtorString8 = fnToString8.call(Object);
var isPlainObject6 = (v) => {
  if (!isObjectLike5(v) || baseGetTag5(v) != "[object Object]")
    return false;
  const proto = Object.getPrototypeOf(v);
  if (proto === null)
    return true;
  const Ctor = hasProp5(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && fnToString8.call(Ctor) == objectCtorString8;
};
function splitProps9(props6, keys) {
  const rest = {};
  const result = {};
  const keySet = new Set(keys);
  for (const key in props6) {
    if (keySet.has(key)) {
      result[key] = props6[key];
    } else {
      rest[key] = props6[key];
    }
  }
  return [result, rest];
}
var createSplitProps5 = (keys) => {
  return function split(props6) {
    return splitProps9(props6, keys);
  };
};
function compact6(obj) {
  if (!isPlainObject26(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact6(value);
    }
  }
  return filtered;
}
var isPlainObject26 = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};
function warn6(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && true) {
    console.warn(m);
  }
}
function invariant5(...a) {
  const m = a.length === 1 ? a[0] : a[1];
  const c = a.length === 2 ? a[0] : true;
  if (c && true) {
    throw new Error(m);
  }
}

// node_modules/@zag-js/tabs/node_modules/@zag-js/store/dist/index.mjs
function glob5() {
  if (typeof globalThis !== "undefined")
    return globalThis;
  if (typeof self !== "undefined")
    return self;
  if (typeof window !== "undefined")
    return window;
  if (typeof global !== "undefined")
    return global;
}
function globalRef5(key, value) {
  const g = glob5();
  if (!g)
    return value();
  g[key] || (g[key] = value());
  return g[key];
}
var refSet5 = globalRef5("__zag__refSet", () => /* @__PURE__ */ new WeakSet());
var isReactElement5 = (x) => typeof x === "object" && x !== null && "$$typeof" in x && "props" in x;
var isVueElement5 = (x) => typeof x === "object" && x !== null && "__v_isVNode" in x;
var isDOMElement5 = (x) => typeof x === "object" && x !== null && "nodeType" in x && typeof x.nodeName === "string";
var isElement6 = (x) => isReactElement5(x) || isVueElement5(x) || isDOMElement5(x);
var isObject19 = (x) => x !== null && typeof x === "object";
var canProxy5 = (x) => isObject19(x) && !refSet5.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !isElement6(x) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer) && !(x instanceof Promise);
var isDev10 = () => true;
function set9(obj, key, val) {
  if (typeof val.value === "object" && !canProxy5(val.value))
    val.value = clone5(val.value);
  if (!val.enumerable || val.get || val.set || !val.configurable || !val.writable || key === "__proto__") {
    Object.defineProperty(obj, key, val);
  } else
    obj[key] = val.value;
}
function clone5(x) {
  if (typeof x !== "object")
    return x;
  var i = 0, k, list, tmp, str = Object.prototype.toString.call(x);
  if (str === "[object Object]") {
    tmp = Object.create(Object.getPrototypeOf(x) || null);
  } else if (str === "[object Array]") {
    tmp = Array(x.length);
  } else if (str === "[object Set]") {
    tmp = /* @__PURE__ */ new Set();
    x.forEach(function(val) {
      tmp.add(clone5(val));
    });
  } else if (str === "[object Map]") {
    tmp = /* @__PURE__ */ new Map();
    x.forEach(function(val, key) {
      tmp.set(clone5(key), clone5(val));
    });
  } else if (str === "[object Date]") {
    tmp = /* @__PURE__ */ new Date(+x);
  } else if (str === "[object RegExp]") {
    tmp = new RegExp(x.source, x.flags);
  } else if (str === "[object DataView]") {
    tmp = new x.constructor(clone5(x.buffer));
  } else if (str === "[object ArrayBuffer]") {
    tmp = x.slice(0);
  } else if (str === "[object Blob]") {
    tmp = x.slice();
  } else if (str.slice(-6) === "Array]") {
    tmp = new x.constructor(x);
  }
  if (tmp) {
    for (list = Object.getOwnPropertySymbols(x); i < list.length; i++) {
      set9(tmp, list[i], Object.getOwnPropertyDescriptor(x, list[i]));
    }
    for (i = 0, list = Object.getOwnPropertyNames(x); i < list.length; i++) {
      if (Object.hasOwnProperty.call(tmp, k = list[i]) && tmp[k] === x[k])
        continue;
      set9(tmp, k, Object.getOwnPropertyDescriptor(x, k));
    }
  }
  return tmp || x;
}
var proxyStateMap5 = globalRef5("__zag__proxyStateMap", () => /* @__PURE__ */ new WeakMap());
var buildProxyFunction5 = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version) => {
  const cache = snapCache.get(target);
  if (cache?.[0] === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  markToTrack(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    const value = Reflect.get(target, key);
    if (refSet5.has(value)) {
      markToTrack(value, false);
      snap[key] = value;
    } else if (proxyStateMap5.has(value)) {
      snap[key] = snapshot5(value);
    } else {
      snap[key] = value;
    }
  });
  return Object.freeze(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction22 = (initialObject) => {
  if (!isObject19(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if (isDev10() && propProxyStates.has(prop)) {
      throw new Error("prop listener already exists");
    }
    if (listeners.size) {
      const remove2 = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove2]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      entry[1]?.();
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if (isDev10() && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove2 = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove2]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove2], prop) => {
          if (remove2) {
            remove2();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject19(value)) {
        value = getUntracked(value) || value;
      }
      let nextValue = value;
      if (Object.getOwnPropertyDescriptor(target, prop)?.set)
        ;
      else {
        if (!proxyStateMap5.has(value) && canProxy5(value)) {
          nextValue = proxy5(value);
        }
        const childProxyState = !refSet5.has(nextValue) && proxyStateMap5.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [baseObject, ensureVersion, createSnapshot, addListener];
  proxyStateMap5.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(initialObject, key);
    if (desc.get || desc.set) {
      Object.defineProperty(baseObject, key, desc);
    } else {
      proxyObject[key] = initialObject[key];
    }
  });
  return proxyObject;
}) => [
  // public functions
  proxyFunction22,
  // shared state
  proxyStateMap5,
  refSet5,
  // internal things
  objectIs,
  newProxy,
  canProxy5,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
var [proxyFunction5] = buildProxyFunction5();
function proxy5(initialObject = {}) {
  return proxyFunction5(initialObject);
}
function subscribe5(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap5.get(proxyObject);
  if (isDev10() && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot5(proxyObject) {
  const proxyState = proxyStateMap5.get(proxyObject);
  if (isDev10() && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion());
}
function ref5(obj) {
  refSet5.add(obj);
  return obj;
}
function proxyWithComputed5(initialObject, computedFns) {
  const keys = Object.keys(computedFns);
  keys.forEach((key) => {
    if (Object.getOwnPropertyDescriptor(initialObject, key)) {
      throw new Error("object property already defined");
    }
    const computedFn = computedFns[key];
    const { get, set: set22 } = typeof computedFn === "function" ? { get: computedFn } : computedFn;
    const desc = {};
    desc.get = () => get(snapshot5(proxyObject));
    if (set22) {
      desc.set = (newValue) => set22(proxyObject, newValue);
    }
    Object.defineProperty(initialObject, key, desc);
  });
  const proxyObject = proxy5(initialObject);
  return proxyObject;
}

// node_modules/@zag-js/tabs/node_modules/@zag-js/core/dist/index.mjs
var __defProp7 = Object.defineProperty;
var __defNormalProp6 = (obj, key, value) => key in obj ? __defProp7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField6 = (obj, key, value) => __defNormalProp6(obj, typeof key !== "symbol" ? key + "" : key, value);
function deepMerge5(source, ...objects) {
  for (const obj of objects) {
    const target = compact6(obj);
    for (const key in target) {
      if (isPlainObject6(obj[key])) {
        if (!source[key]) {
          source[key] = {};
        }
        deepMerge5(source[key], obj[key]);
      } else {
        source[key] = obj[key];
      }
    }
  }
  return source;
}
function toEvent5(event) {
  const obj = isString5(event) ? { type: event } : event;
  return obj;
}
function toArray5(value) {
  if (!value)
    return [];
  return isArray5(value) ? value.slice() : [value];
}
function isGuardHelper5(value) {
  return isObject18(value) && value.predicate != null;
}
var Truthy5 = () => true;
function exec3(guardMap, ctx, event, meta) {
  return (guard) => {
    if (isString5(guard)) {
      return !!guardMap[guard]?.(ctx, event, meta);
    }
    if (isFunction6(guard)) {
      return guard(ctx, event, meta);
    }
    return guard.predicate(guardMap)(ctx, event, meta);
  };
}
function or4(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec3(guardMap, ctx, event, meta)).some(Boolean)
  };
}
function and5(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec3(guardMap, ctx, event, meta)).every(Boolean)
  };
}
function not5(condition) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => {
      return !exec3(guardMap, ctx, event, meta)(condition);
    }
  };
}
function stateIn3(...values) {
  return (_ctx, _evt, meta) => meta.state.matches(...values);
}
var guards3 = { or: or4, and: and5, not: not5, stateIn: stateIn3 };
function determineGuardFn5(guard, guardMap) {
  guard = guard ?? Truthy5;
  return (context, event, meta) => {
    if (isString5(guard)) {
      const value = guardMap[guard];
      return isFunction6(value) ? value(context, event, meta) : value;
    }
    if (isGuardHelper5(guard)) {
      return guard.predicate(guardMap)(context, event, meta);
    }
    return guard?.(context, event, meta);
  };
}
function determineActionsFn5(values, guardMap) {
  return (context, event, meta) => {
    if (isGuardHelper5(values)) {
      return values.predicate(guardMap)(context, event, meta);
    }
    return values;
  };
}
function createProxy5(config) {
  const computedContext = config.computed ?? cast5({});
  const initialContext = config.context ?? cast5({});
  const initialTags = config.initial ? config.states?.[config.initial]?.tags : [];
  const state = proxy5({
    value: config.initial ?? "",
    previousValue: "",
    event: cast5({}),
    previousEvent: cast5({}),
    context: proxyWithComputed5(initialContext, computedContext),
    done: false,
    tags: initialTags ?? [],
    hasTag(tag) {
      return this.tags.includes(tag);
    },
    matches(...value) {
      return value.includes(this.value);
    },
    can(event) {
      return cast5(this).nextEvents.includes(event);
    },
    get nextEvents() {
      const stateEvents = config.states?.[this.value]?.["on"] ?? {};
      const globalEvents = config?.on ?? {};
      return Object.keys({ ...stateEvents, ...globalEvents });
    },
    get changed() {
      if (this.event.value === "machine.init" || !this.previousValue)
        return false;
      return this.value !== this.previousValue;
    }
  });
  return cast5(state);
}
function determineDelayFn5(delay2, delaysMap) {
  return (context, event) => {
    if (isNumber5(delay2))
      return delay2;
    if (isFunction6(delay2)) {
      return delay2(context, event);
    }
    if (isString5(delay2)) {
      const value = Number.parseFloat(delay2);
      if (!Number.isNaN(value)) {
        return value;
      }
      if (delaysMap) {
        const valueOrFn = delaysMap?.[delay2];
        invariant5(
          valueOrFn == null,
          `[@zag-js/core > determine-delay] Cannot determine delay for \`${delay2}\`. It doesn't exist in \`options.delays\``
        );
        return isFunction6(valueOrFn) ? valueOrFn(context, event) : valueOrFn;
      }
    }
  };
}
function toTarget5(target) {
  return isString5(target) ? { target } : target;
}
function determineTransitionFn5(transitions, guardMap) {
  return (context, event, meta) => {
    return toArray5(transitions).map(toTarget5).find((transition) => {
      const determineGuard = determineGuardFn5(transition.guard, guardMap);
      const guard = determineGuard(context, event, meta);
      return guard ?? transition.target ?? transition.actions;
    });
  };
}
var Machine5 = class {
  // Let's get started!
  constructor(config, options) {
    __publicField6(
      this,
      "status",
      "Not Started"
      /* NotStarted */
    );
    __publicField6(this, "state");
    __publicField6(this, "initialState");
    __publicField6(this, "initialContext");
    __publicField6(this, "id");
    __publicField6(
      this,
      "type",
      "machine"
      /* Machine */
    );
    __publicField6(this, "activityEvents", /* @__PURE__ */ new Map());
    __publicField6(this, "delayedEvents", /* @__PURE__ */ new Map());
    __publicField6(this, "stateListeners", /* @__PURE__ */ new Set());
    __publicField6(this, "doneListeners", /* @__PURE__ */ new Set());
    __publicField6(this, "contextWatchers", /* @__PURE__ */ new Set());
    __publicField6(this, "removeStateListener", noop6);
    __publicField6(this, "parent");
    __publicField6(this, "children", /* @__PURE__ */ new Map());
    __publicField6(this, "guardMap");
    __publicField6(this, "actionMap");
    __publicField6(this, "delayMap");
    __publicField6(this, "activityMap");
    __publicField6(this, "sync");
    __publicField6(this, "options");
    __publicField6(this, "config");
    __publicField6(this, "_created", () => {
      if (!this.config.created)
        return;
      const event = toEvent5(
        "machine.created"
        /* Created */
      );
      this.executeActions(this.config.created, event);
    });
    __publicField6(this, "start", (init) => {
      this.state.value = "";
      this.state.tags = [];
      if (this.status === "Running") {
        return this;
      }
      this.status = "Running";
      this.removeStateListener = subscribe5(
        this.state,
        () => {
          this.stateListeners.forEach((listener) => {
            listener(this.stateSnapshot);
          });
        },
        this.sync
      );
      this.setupContextWatchers();
      this.executeActivities(
        toEvent5(
          "machine.start"
          /* Start */
        ),
        toArray5(this.config.activities),
        "machine.start"
        /* Start */
      );
      this.executeActions(this.config.entry, toEvent5(
        "machine.start"
        /* Start */
      ));
      const event = toEvent5(
        "machine.init"
        /* Init */
      );
      const target = isObject18(init) ? init.value : init;
      const context = isObject18(init) ? init.context : void 0;
      if (context) {
        this.setContext(context);
      }
      const transition = {
        target: target ?? this.config.initial
      };
      const next = this.getNextStateInfo(transition, event);
      this.initialState = next;
      this.performStateChangeEffects(this.state.value, next, event);
      return this;
    });
    __publicField6(this, "setupContextWatchers", () => {
      const { watch } = this.config;
      if (!watch)
        return;
      let prev = snapshot5(this.state.context);
      const cleanup = subscribe5(this.state.context, () => {
        const next = snapshot5(this.state.context);
        for (const [key, fn] of Object.entries(watch)) {
          const isEqual4 = this.options.compareFns?.[key] ?? Object.is;
          if (isEqual4(prev[key], next[key]))
            continue;
          this.executeActions(fn, this.state.event);
        }
        prev = next;
      });
      this.contextWatchers.add(cleanup);
    });
    __publicField6(this, "stop", () => {
      if (this.status === "Stopped")
        return;
      this.performExitEffects(this.state.value, toEvent5(
        "machine.stop"
        /* Stop */
      ));
      this.executeActions(this.config.exit, toEvent5(
        "machine.stop"
        /* Stop */
      ));
      this.setState("");
      this.setEvent(
        "machine.stop"
        /* Stop */
      );
      this.stopStateListeners();
      this.stopChildren();
      this.stopActivities();
      this.stopDelayedEvents();
      this.stopContextWatchers();
      this.status = "Stopped";
      return this;
    });
    __publicField6(this, "stopStateListeners", () => {
      this.removeStateListener();
      this.stateListeners.clear();
    });
    __publicField6(this, "stopContextWatchers", () => {
      this.contextWatchers.forEach((fn) => fn());
      this.contextWatchers.clear();
    });
    __publicField6(this, "stopDelayedEvents", () => {
      this.delayedEvents.forEach((state) => {
        state.forEach((stop) => stop());
      });
      this.delayedEvents.clear();
    });
    __publicField6(this, "stopActivities", (state) => {
      if (state) {
        this.activityEvents.get(state)?.forEach((stop) => stop());
        this.activityEvents.get(state)?.clear();
        this.activityEvents.delete(state);
      } else {
        this.activityEvents.forEach((state2) => {
          state2.forEach((stop) => stop());
          state2.clear();
        });
        this.activityEvents.clear();
      }
    });
    __publicField6(this, "sendChild", (evt, to) => {
      const event = toEvent5(evt);
      const id = runIfFn6(to, this.contextSnapshot);
      const child = this.children.get(id);
      if (!child) {
        invariant5(`[@zag-js/core] Cannot send '${event.type}' event to unknown child`);
      }
      child.send(event);
    });
    __publicField6(this, "stopChild", (id) => {
      if (!this.children.has(id)) {
        invariant5(`[@zag-js/core > stop-child] Cannot stop unknown child ${id}`);
      }
      this.children.get(id).stop();
      this.children.delete(id);
    });
    __publicField6(this, "removeChild", (id) => {
      this.children.delete(id);
    });
    __publicField6(this, "stopChildren", () => {
      this.children.forEach((child) => child.stop());
      this.children.clear();
    });
    __publicField6(this, "setParent", (parent) => {
      this.parent = parent;
    });
    __publicField6(this, "spawn", (src, id) => {
      const actor = runIfFn6(src);
      if (id)
        actor.id = id;
      actor.type = "machine.actor";
      actor.setParent(this);
      this.children.set(actor.id, cast5(actor));
      actor.onDone(() => {
        this.removeChild(actor.id);
      }).start();
      return cast5(ref5(actor));
    });
    __publicField6(this, "stopActivity", (key) => {
      if (!this.state.value)
        return;
      const cleanups3 = this.activityEvents.get(this.state.value);
      cleanups3?.get(key)?.();
      cleanups3?.delete(key);
    });
    __publicField6(this, "addActivityCleanup", (state, key, cleanup) => {
      if (!state)
        return;
      if (!this.activityEvents.has(state)) {
        this.activityEvents.set(state, /* @__PURE__ */ new Map([[key, cleanup]]));
      } else {
        this.activityEvents.get(state)?.set(key, cleanup);
      }
    });
    __publicField6(this, "setState", (target) => {
      this.state.previousValue = this.state.value;
      this.state.value = target;
      const stateNode = this.getStateNode(target);
      if (target == null) {
        clear5(this.state.tags);
      } else {
        this.state.tags = toArray5(stateNode?.tags);
      }
    });
    __publicField6(this, "setContext", (context) => {
      if (!context)
        return;
      deepMerge5(this.state.context, compact6(context));
    });
    __publicField6(this, "setOptions", (options2) => {
      const opts = compact6(options2);
      this.actionMap = { ...this.actionMap, ...opts.actions };
      this.delayMap = { ...this.delayMap, ...opts.delays };
      this.activityMap = { ...this.activityMap, ...opts.activities };
      this.guardMap = { ...this.guardMap, ...opts.guards };
    });
    __publicField6(this, "getStateNode", (state) => {
      if (!state)
        return;
      return this.config.states?.[state];
    });
    __publicField6(this, "getNextStateInfo", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      const isTargetless = !transition?.target;
      const target = transition?.target ?? this.state.value;
      const changed = this.state.value !== target;
      const stateNode = this.getStateNode(target);
      const reenter = !isTargetless && !changed && !transition?.internal;
      const info = {
        reenter,
        transition,
        stateNode,
        target,
        changed
      };
      this.log("NextState:", `[${event.type}]`, this.state.value, "---->", info.target);
      return info;
    });
    __publicField6(this, "getAfterActions", (transition, delay2) => {
      let id;
      const current = this.state.value;
      return {
        entry: () => {
          id = globalThis.setTimeout(() => {
            const next = this.getNextStateInfo(transition, this.state.event);
            this.performStateChangeEffects(current, next, this.state.event);
          }, delay2);
        },
        exit: () => {
          globalThis.clearTimeout(id);
        }
      };
    });
    __publicField6(this, "getDelayedEventActions", (state) => {
      const stateNode = this.getStateNode(state);
      const event = this.state.event;
      if (!stateNode || !stateNode.after)
        return;
      const entries = [];
      const exits = [];
      if (isArray5(stateNode.after)) {
        const transition = this.determineTransition(stateNode.after, event);
        if (!transition)
          return;
        if (!hasProp5(transition, "delay")) {
          throw new Error(`[@zag-js/core > after] Delay is required for after transition: ${JSON.stringify(transition)}`);
        }
        const determineDelay = determineDelayFn5(transition.delay, this.delayMap);
        const __delay = determineDelay(this.contextSnapshot, event);
        const actions = this.getAfterActions(transition, __delay);
        entries.push(actions.entry);
        exits.push(actions.exit);
        return { entries, exits };
      }
      if (isObject18(stateNode.after)) {
        for (const delay2 in stateNode.after) {
          const transition = stateNode.after[delay2];
          const determineDelay = determineDelayFn5(delay2, this.delayMap);
          const __delay = determineDelay(this.contextSnapshot, event);
          const actions = this.getAfterActions(transition, __delay);
          entries.push(actions.entry);
          exits.push(actions.exit);
        }
      }
      return { entries, exits };
    });
    __publicField6(this, "executeActions", (actions, event) => {
      const pickedActions = determineActionsFn5(actions, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      for (const action of toArray5(pickedActions)) {
        const fn = isString5(action) ? this.actionMap?.[action] : action;
        warn6(
          isString5(action) && !fn,
          `[@zag-js/core > execute-actions] No implementation found for action: \`${action}\``
        );
        fn?.(this.state.context, event, this.meta);
      }
    });
    __publicField6(this, "executeActivities", (event, activities, state) => {
      for (const activity of activities) {
        const fn = isString5(activity) ? this.activityMap?.[activity] : activity;
        if (!fn) {
          warn6(`[@zag-js/core > execute-activity] No implementation found for activity: \`${activity}\``);
          continue;
        }
        const cleanup = fn(this.state.context, event, this.meta);
        if (cleanup) {
          const key = isString5(activity) ? activity : activity.name || uuid5();
          this.addActivityCleanup(state ?? this.state.value, key, cleanup);
        }
      }
    });
    __publicField6(this, "createEveryActivities", (every, callbackfn) => {
      if (!every)
        return;
      if (isArray5(every)) {
        const picked = toArray5(every).find((transition) => {
          const delayOrFn = transition.delay;
          const determineDelay2 = determineDelayFn5(delayOrFn, this.delayMap);
          const delay22 = determineDelay2(this.contextSnapshot, this.state.event);
          const determineGuard = determineGuardFn5(transition.guard, this.guardMap);
          const guard = determineGuard(this.contextSnapshot, this.state.event, this.guardMeta);
          return guard ?? delay22 != null;
        });
        if (!picked)
          return;
        const determineDelay = determineDelayFn5(picked.delay, this.delayMap);
        const delay2 = determineDelay(this.contextSnapshot, this.state.event);
        const activity = () => {
          const id = globalThis.setInterval(() => {
            this.executeActions(picked.actions, this.state.event);
          }, delay2);
          return () => {
            globalThis.clearInterval(id);
          };
        };
        callbackfn(activity);
      } else {
        for (const interval in every) {
          const actions = every?.[interval];
          const determineDelay = determineDelayFn5(interval, this.delayMap);
          const delay2 = determineDelay(this.contextSnapshot, this.state.event);
          const activity = () => {
            const id = globalThis.setInterval(() => {
              this.executeActions(actions, this.state.event);
            }, delay2);
            return () => {
              globalThis.clearInterval(id);
            };
          };
          callbackfn(activity);
        }
      }
    });
    __publicField6(this, "setEvent", (event) => {
      this.state.previousEvent = this.state.event;
      this.state.event = ref5(toEvent5(event));
    });
    __publicField6(this, "performExitEffects", (current, event) => {
      const currentState = this.state.value;
      if (currentState === "")
        return;
      const stateNode = current ? this.getStateNode(current) : void 0;
      this.stopActivities(currentState);
      const _exit = determineActionsFn5(stateNode?.exit, this.guardMap)(this.contextSnapshot, event, this.guardMeta);
      const exitActions = toArray5(_exit);
      const afterExitActions = this.delayedEvents.get(currentState);
      if (afterExitActions) {
        exitActions.push(...afterExitActions);
      }
      this.executeActions(exitActions, event);
      this.delayedEvents.delete(currentState);
    });
    __publicField6(this, "performEntryEffects", (next, event) => {
      const stateNode = this.getStateNode(next);
      const activities = toArray5(stateNode?.activities);
      this.createEveryActivities(stateNode?.every, (activity) => {
        activities.unshift(activity);
      });
      if (activities.length > 0) {
        this.executeActivities(event, activities);
      }
      const pickedActions = determineActionsFn5(stateNode?.entry, this.guardMap)(
        this.contextSnapshot,
        event,
        this.guardMeta
      );
      const entryActions = toArray5(pickedActions);
      const afterActions = this.getDelayedEventActions(next);
      if (stateNode?.after && afterActions) {
        this.delayedEvents.set(next, afterActions?.exits);
        entryActions.push(...afterActions.entries);
      }
      this.executeActions(entryActions, event);
      if (stateNode?.type === "final") {
        this.state.done = true;
        this.doneListeners.forEach((listener) => {
          listener(this.stateSnapshot);
        });
        this.stop();
      }
    });
    __publicField6(this, "performTransitionEffects", (transitions, event) => {
      const transition = this.determineTransition(transitions, event);
      this.executeActions(transition?.actions, event);
    });
    __publicField6(this, "performStateChangeEffects", (current, next, event) => {
      this.setEvent(event);
      const changed = next.changed || next.reenter;
      if (changed) {
        this.performExitEffects(current, event);
      }
      this.performTransitionEffects(next.transition, event);
      this.setState(next.target);
      if (changed) {
        this.performEntryEffects(next.target, event);
      }
    });
    __publicField6(this, "determineTransition", (transition, event) => {
      const fn = determineTransitionFn5(transition, this.guardMap);
      return fn?.(this.contextSnapshot, event, this.guardMeta);
    });
    __publicField6(this, "sendParent", (evt) => {
      if (!this.parent) {
        invariant5("[@zag-js/core > send-parent] Cannot send event to an unknown parent");
      }
      const event = toEvent5(evt);
      this.parent?.send(event);
    });
    __publicField6(this, "log", (...args) => {
      if (isDev9() && this.options.debug) {
        console.log(...args);
      }
    });
    __publicField6(this, "send", (evt) => {
      const event = toEvent5(evt);
      this.transition(this.state.value, event);
    });
    __publicField6(this, "transition", (state, evt) => {
      const stateNode = isString5(state) ? this.getStateNode(state) : state?.stateNode;
      const event = toEvent5(evt);
      if (!stateNode && !this.config.on) {
        const msg = this.status === "Stopped" ? "[@zag-js/core > transition] Cannot transition a stopped machine" : `[@zag-js/core > transition] State does not have a definition for \`state\`: ${state}, \`event\`: ${event.type}`;
        warn6(msg);
        return;
      }
      const transitions = (
        // @ts-expect-error - Fix this
        stateNode?.on?.[event.type] ?? this.config.on?.[event.type]
      );
      const next = this.getNextStateInfo(transitions, event);
      this.performStateChangeEffects(this.state.value, next, event);
      return next.stateNode;
    });
    __publicField6(this, "subscribe", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return () => {
        this.stateListeners.delete(listener);
      };
    });
    __publicField6(this, "onDone", (listener) => {
      this.doneListeners.add(listener);
      return this;
    });
    __publicField6(this, "onTransition", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return this;
    });
    this.config = clone5(config);
    this.options = clone5(options ?? {});
    this.id = this.config.id ?? `machine-${uuid5()}`;
    this.guardMap = this.options?.guards ?? {};
    this.actionMap = this.options?.actions ?? {};
    this.delayMap = this.options?.delays ?? {};
    this.activityMap = this.options?.activities ?? {};
    this.sync = this.options?.sync ?? false;
    this.state = createProxy5(this.config);
    this.initialContext = snapshot5(this.state.context);
  }
  // immutable state value
  get stateSnapshot() {
    return cast5(snapshot5(this.state));
  }
  getState() {
    return this.stateSnapshot;
  }
  // immutable context value
  get contextSnapshot() {
    return this.stateSnapshot.context;
  }
  /**
   * A reference to the instance methods of the machine.
   * Useful when spawning child machines and managing the communication between them.
   */
  get self() {
    const self2 = this;
    return {
      id: this.id,
      send: this.send.bind(this),
      sendParent: this.sendParent.bind(this),
      sendChild: this.sendChild.bind(this),
      stop: this.stop.bind(this),
      stopChild: this.stopChild.bind(this),
      spawn: this.spawn.bind(this),
      stopActivity: this.stopActivity.bind(this),
      get state() {
        return self2.stateSnapshot;
      },
      get initialContext() {
        return self2.initialContext;
      },
      get initialState() {
        return self2.initialState?.target ?? "";
      }
    };
  }
  get meta() {
    return {
      state: this.stateSnapshot,
      guards: this.guardMap,
      send: this.send.bind(this),
      self: this.self,
      initialContext: this.initialContext,
      initialState: this.initialState?.target ?? "",
      getState: () => this.stateSnapshot,
      getAction: (key) => this.actionMap[key],
      getGuard: (key) => this.guardMap[key]
    };
  }
  get guardMeta() {
    return {
      state: this.stateSnapshot
    };
  }
  get [Symbol.toStringTag]() {
    return "Machine";
  }
  getHydrationState() {
    const state = this.getState();
    return {
      value: state.value,
      tags: state.tags
    };
  }
};
var createMachine5 = (config, options) => new Machine5(config, options);

// node_modules/@zag-js/element-rect/dist/index.mjs
var rafId;
var observedElements = /* @__PURE__ */ new Map();
var getRectFn = (el) => el.getBoundingClientRect();
function trackElementRect(el, options) {
  const { scope = "rect", getRect = getRectFn, onChange } = options;
  const loop = getLoopFn({ scope, getRect });
  const data = observedElements.get(el);
  if (!data) {
    observedElements.set(el, {
      rect: {},
      callbacks: [onChange]
    });
    if (observedElements.size === 1) {
      rafId = requestAnimationFrame(loop);
    }
  } else {
    data.callbacks.push(onChange);
    onChange(getRect(el));
  }
  return function unobserve() {
    const data2 = observedElements.get(el);
    if (!data2)
      return;
    const index = data2.callbacks.indexOf(onChange);
    if (index > -1) {
      data2.callbacks.splice(index, 1);
    }
    if (data2.callbacks.length === 0) {
      observedElements.delete(el);
      if (observedElements.size === 0) {
        cancelAnimationFrame(rafId);
      }
    }
  };
}
function getLoopFn(options) {
  const { scope, getRect } = options;
  const isEqual4 = getEqualityFn(scope);
  return function loop() {
    const changedRectsData = [];
    observedElements.forEach((data, element) => {
      const newRect = getRect(element);
      if (!isEqual4(data.rect, newRect)) {
        data.rect = newRect;
        changedRectsData.push(data);
      }
    });
    changedRectsData.forEach((data) => {
      data.callbacks.forEach((callback) => callback(data.rect));
    });
    rafId = requestAnimationFrame(loop);
  };
}
var isEqualSize = (a, b) => a.width === b.width && a.height === b.height;
var isEqualPosition = (a, b) => a.top === b.top && a.left === b.left;
var isEqualRect = (a, b) => isEqualSize(a, b) && isEqualPosition(a, b);
function getEqualityFn(scope) {
  if (scope === "size")
    return isEqualSize;
  if (scope === "position")
    return isEqualPosition;
  return isEqualRect;
}

// node_modules/@zag-js/tabs/node_modules/@zag-js/types/dist/index.mjs
var createProps5 = () => (props6) => Array.from(new Set(props6));

// node_modules/@zag-js/tabs/dist/index.mjs
var anatomy5 = createAnatomy5("tabs").parts("root", "list", "trigger", "content", "indicator");
var parts5 = anatomy5.build();
var dom5 = createScope5({
  getRootId: (ctx) => ctx.ids?.root ?? `tabs:${ctx.id}`,
  getListId: (ctx) => ctx.ids?.list ?? `tabs:${ctx.id}:list`,
  getContentId: (ctx, id) => ctx.ids?.content ?? `tabs:${ctx.id}:content-${id}`,
  getTriggerId: (ctx, id) => ctx.ids?.trigger ?? `tabs:${ctx.id}:trigger-${id}`,
  getIndicatorId: (ctx) => ctx.ids?.indicator ?? `tabs:${ctx.id}:indicator`,
  getListEl: (ctx) => dom5.getById(ctx, dom5.getListId(ctx)),
  getContentEl: (ctx, id) => dom5.getById(ctx, dom5.getContentId(ctx, id)),
  getTriggerEl: (ctx, id) => dom5.getById(ctx, dom5.getTriggerId(ctx, id)),
  getIndicatorEl: (ctx) => dom5.getById(ctx, dom5.getIndicatorId(ctx)),
  getElements: (ctx) => {
    const ownerId = CSS.escape(dom5.getListId(ctx));
    const selector = `[role=tab][data-ownedby='${ownerId}']:not([disabled])`;
    return queryAll3(dom5.getListEl(ctx), selector);
  },
  getFirstTriggerEl: (ctx) => first3(dom5.getElements(ctx)),
  getLastTriggerEl: (ctx) => last3(dom5.getElements(ctx)),
  getNextTriggerEl: (ctx, id) => nextById3(dom5.getElements(ctx), dom5.getTriggerId(ctx, id), ctx.loopFocus),
  getPrevTriggerEl: (ctx, id) => prevById3(dom5.getElements(ctx), dom5.getTriggerId(ctx, id), ctx.loopFocus),
  getSelectedContentEl: (ctx) => {
    if (!ctx.value)
      return;
    return dom5.getContentEl(ctx, ctx.value);
  },
  getSelectedTriggerEl: (ctx) => {
    if (!ctx.value)
      return;
    return dom5.getTriggerEl(ctx, ctx.value);
  },
  getOffsetRect: (el) => {
    return {
      left: el?.offsetLeft ?? 0,
      top: el?.offsetTop ?? 0,
      width: el?.offsetWidth ?? 0,
      height: el?.offsetHeight ?? 0
    };
  },
  getRectById: (ctx, id) => {
    const tab = itemById3(dom5.getElements(ctx), dom5.getTriggerId(ctx, id));
    return dom5.resolveRect(dom5.getOffsetRect(tab));
  },
  resolveRect: (rect) => ({
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    left: `${rect.left}px`,
    top: `${rect.top}px`
  })
});
function connect5(state, send, normalize) {
  const translations = state.context.translations;
  const focused = state.matches("focused");
  const isVertical = state.context.orientation === "vertical";
  const isHorizontal = state.context.orientation === "horizontal";
  const composite = state.context.composite;
  const indicator = state.context.indicatorState;
  function getTriggerState(props22) {
    return {
      selected: state.context.value === props22.value,
      focused: state.context.focusedValue === props22.value,
      disabled: !!props22.disabled
    };
  }
  return {
    value: state.context.value,
    focusedValue: state.context.focusedValue,
    setValue(value) {
      send({ type: "SET_VALUE", value });
    },
    clearValue() {
      send({ type: "CLEAR_VALUE" });
    },
    setIndicatorRect(value) {
      const id = dom5.getTriggerId(state.context, value);
      send({ type: "SET_INDICATOR_RECT", id });
    },
    syncTabIndex() {
      send("SYNC_TAB_INDEX");
    },
    selectNext(fromValue) {
      send({ type: "TAB_FOCUS", value: fromValue, src: "selectNext" });
      send({ type: "ARROW_NEXT", src: "selectNext" });
    },
    selectPrev(fromValue) {
      send({ type: "TAB_FOCUS", value: fromValue, src: "selectPrev" });
      send({ type: "ARROW_PREV", src: "selectPrev" });
    },
    focus() {
      dom5.getSelectedTriggerEl(state.context)?.focus();
    },
    getRootProps() {
      return normalize.element({
        ...parts5.root.attrs,
        id: dom5.getRootId(state.context),
        "data-orientation": state.context.orientation,
        "data-focus": dataAttr4(focused),
        dir: state.context.dir
      });
    },
    getListProps() {
      return normalize.element({
        ...parts5.list.attrs,
        id: dom5.getListId(state.context),
        role: "tablist",
        dir: state.context.dir,
        "data-focus": dataAttr4(focused),
        "aria-orientation": state.context.orientation,
        "data-orientation": state.context.orientation,
        "aria-label": translations?.listLabel,
        onKeyDown(event) {
          if (event.defaultPrevented)
            return;
          if (!isSelfTarget2(event))
            return;
          if (isComposingEvent(event))
            return;
          const keyMap4 = {
            ArrowDown() {
              if (isHorizontal)
                return;
              send({ type: "ARROW_NEXT", key: "ArrowDown" });
            },
            ArrowUp() {
              if (isHorizontal)
                return;
              send({ type: "ARROW_PREV", key: "ArrowUp" });
            },
            ArrowLeft() {
              if (isVertical)
                return;
              send({ type: "ARROW_PREV", key: "ArrowLeft" });
            },
            ArrowRight() {
              if (isVertical)
                return;
              send({ type: "ARROW_NEXT", key: "ArrowRight" });
            },
            Home() {
              send("HOME");
            },
            End() {
              send("END");
            },
            Enter() {
              send({ type: "ENTER" });
            }
          };
          let key = getEventKey3(event, state.context);
          const exec4 = keyMap4[key];
          if (exec4) {
            event.preventDefault();
            exec4(event);
          }
        }
      });
    },
    getTriggerState,
    getTriggerProps(props22) {
      const { value, disabled } = props22;
      const triggerState = getTriggerState(props22);
      return normalize.button({
        ...parts5.trigger.attrs,
        role: "tab",
        type: "button",
        disabled,
        dir: state.context.dir,
        "data-orientation": state.context.orientation,
        "data-disabled": dataAttr4(disabled),
        "aria-disabled": disabled,
        "data-value": value,
        "aria-selected": triggerState.selected,
        "data-selected": dataAttr4(triggerState.selected),
        "data-focus": dataAttr4(triggerState.focused),
        "aria-controls": triggerState.selected ? dom5.getContentId(state.context, value) : void 0,
        "data-ownedby": dom5.getListId(state.context),
        "data-ssr": dataAttr4(state.context.ssr),
        id: dom5.getTriggerId(state.context, value),
        tabIndex: triggerState.selected && composite ? 0 : -1,
        onFocus() {
          send({ type: "TAB_FOCUS", value });
        },
        onBlur(event) {
          const target = event.relatedTarget;
          if (target?.getAttribute("role") !== "tab") {
            send({ type: "TAB_BLUR" });
          }
        },
        onClick(event) {
          if (event.defaultPrevented)
            return;
          if (disabled)
            return;
          if (isSafari2()) {
            event.currentTarget.focus();
          }
          send({ type: "TAB_CLICK", value });
        }
      });
    },
    getContentProps(props22) {
      const { value } = props22;
      const selected = state.context.value === value;
      return normalize.element({
        ...parts5.content.attrs,
        dir: state.context.dir,
        id: dom5.getContentId(state.context, value),
        tabIndex: composite ? 0 : -1,
        "aria-labelledby": dom5.getTriggerId(state.context, value),
        role: "tabpanel",
        "data-ownedby": dom5.getListId(state.context),
        "data-selected": dataAttr4(selected),
        "data-orientation": state.context.orientation,
        hidden: !selected
      });
    },
    getIndicatorProps() {
      return normalize.element({
        id: dom5.getIndicatorId(state.context),
        ...parts5.indicator.attrs,
        dir: state.context.dir,
        "data-orientation": state.context.orientation,
        style: {
          "--transition-property": "left, right, top, bottom, width, height",
          "--left": indicator.rect?.left,
          "--top": indicator.rect?.top,
          "--width": indicator.rect?.width,
          "--height": indicator.rect?.height,
          position: "absolute",
          willChange: "var(--transition-property)",
          transitionProperty: "var(--transition-property)",
          transitionDuration: indicator.transition ? "var(--transition-duration, 150ms)" : "0ms",
          transitionTimingFunction: "var(--transition-timing-function)",
          [isHorizontal ? "left" : "top"]: isHorizontal ? "var(--left)" : "var(--top)"
        }
      });
    }
  };
}
var { not: not6 } = guards3;
function machine5(userContext) {
  const ctx = compact6(userContext);
  return createMachine5(
    {
      initial: "idle",
      context: {
        dir: "ltr",
        orientation: "horizontal",
        activationMode: "automatic",
        value: null,
        loopFocus: true,
        composite: true,
        ...ctx,
        focusedValue: ctx.value ?? null,
        ssr: true,
        indicatorState: {
          rendered: false,
          transition: false,
          rect: { left: "0px", top: "0px", width: "0px", height: "0px" }
        }
      },
      watch: {
        value: ["allowIndicatorTransition", "syncIndicatorRect", "syncTabIndex", "clickIfLink"],
        dir: ["syncIndicatorRect"],
        orientation: ["syncIndicatorRect"]
      },
      on: {
        SET_VALUE: {
          actions: "setValue"
        },
        CLEAR_VALUE: {
          actions: "clearValue"
        },
        SET_INDICATOR_RECT: {
          actions: "setIndicatorRect"
        },
        SYNC_TAB_INDEX: {
          actions: "syncTabIndex"
        }
      },
      created: ["syncFocusedValue"],
      entry: ["checkRenderedElements", "syncIndicatorRect", "syncTabIndex", "syncSsr"],
      exit: ["cleanupObserver"],
      states: {
        idle: {
          on: {
            TAB_FOCUS: {
              target: "focused",
              actions: "setFocusedValue"
            },
            TAB_CLICK: {
              target: "focused",
              actions: ["setFocusedValue", "setValue"]
            }
          }
        },
        focused: {
          on: {
            TAB_CLICK: {
              target: "focused",
              actions: ["setFocusedValue", "setValue"]
            },
            ARROW_PREV: [
              {
                guard: "selectOnFocus",
                actions: ["focusPrevTab", "selectFocusedTab"]
              },
              {
                actions: "focusPrevTab"
              }
            ],
            ARROW_NEXT: [
              {
                guard: "selectOnFocus",
                actions: ["focusNextTab", "selectFocusedTab"]
              },
              {
                actions: "focusNextTab"
              }
            ],
            HOME: [
              {
                guard: "selectOnFocus",
                actions: ["focusFirstTab", "selectFocusedTab"]
              },
              {
                actions: "focusFirstTab"
              }
            ],
            END: [
              {
                guard: "selectOnFocus",
                actions: ["focusLastTab", "selectFocusedTab"]
              },
              {
                actions: "focusLastTab"
              }
            ],
            ENTER: {
              guard: not6("selectOnFocus"),
              actions: "selectFocusedTab"
            },
            TAB_FOCUS: {
              actions: ["setFocusedValue"]
            },
            TAB_BLUR: {
              target: "idle",
              actions: "clearFocusedValue"
            }
          }
        }
      }
    },
    {
      guards: {
        selectOnFocus: (ctx2) => ctx2.activationMode === "automatic"
      },
      actions: {
        syncFocusedValue(ctx2) {
          if (ctx2.value != null && ctx2.focusedValue == null) {
            ctx2.focusedValue = ctx2.value;
          }
        },
        selectFocusedTab(ctx2) {
          raf9(() => {
            const nullable = ctx2.deselectable && ctx2.value === ctx2.focusedValue;
            const value = nullable ? null : ctx2.focusedValue;
            set10.value(ctx2, value);
          });
        },
        setFocusedValue(ctx2, evt) {
          if (evt.value == null)
            return;
          set10.focusedValue(ctx2, evt.value);
        },
        clearFocusedValue(ctx2) {
          set10.focusedValue(ctx2, null);
        },
        setValue(ctx2, evt) {
          const nullable = ctx2.deselectable && ctx2.value === ctx2.focusedValue;
          const value = nullable ? null : evt.value;
          set10.value(ctx2, value);
        },
        clearValue(ctx2) {
          set10.value(ctx2, null);
        },
        focusFirstTab(ctx2) {
          raf9(() => {
            dom5.getFirstTriggerEl(ctx2)?.focus();
          });
        },
        focusLastTab(ctx2) {
          raf9(() => {
            dom5.getLastTriggerEl(ctx2)?.focus();
          });
        },
        focusNextTab(ctx2) {
          if (!ctx2.focusedValue)
            return;
          const triggerEl = dom5.getNextTriggerEl(ctx2, ctx2.focusedValue);
          raf9(() => {
            if (ctx2.composite) {
              triggerEl?.focus();
            } else if (triggerEl?.dataset.value != null) {
              set10.focusedValue(ctx2, triggerEl.dataset.value);
            }
          });
        },
        focusPrevTab(ctx2) {
          if (!ctx2.focusedValue)
            return;
          const triggerEl = dom5.getPrevTriggerEl(ctx2, ctx2.focusedValue);
          raf9(() => {
            if (ctx2.composite) {
              triggerEl?.focus();
            } else if (triggerEl?.dataset.value != null) {
              set10.focusedValue(ctx2, triggerEl.dataset.value);
            }
          });
        },
        checkRenderedElements(ctx2) {
          ctx2.indicatorState.rendered = !!dom5.getIndicatorEl(ctx2);
        },
        syncTabIndex(ctx2) {
          raf9(() => {
            const contentEl = dom5.getSelectedContentEl(ctx2);
            if (!contentEl)
              return;
            const focusables = getFocusables2(contentEl);
            if (focusables.length > 0) {
              contentEl.removeAttribute("tabindex");
            } else {
              contentEl.setAttribute("tabindex", "0");
            }
          });
        },
        cleanupObserver(ctx2) {
          ctx2.indicatorCleanup?.();
        },
        allowIndicatorTransition(ctx2) {
          ctx2.indicatorState.transition = true;
        },
        setIndicatorRect(ctx2, evt) {
          const value = evt.id ?? ctx2.value;
          if (!ctx2.indicatorState.rendered || !value)
            return;
          const triggerEl = dom5.getTriggerEl(ctx2, value);
          if (!triggerEl)
            return;
          ctx2.indicatorState.rect = dom5.getRectById(ctx2, value);
          nextTick(() => {
            ctx2.indicatorState.transition = false;
          });
        },
        syncSsr(ctx2) {
          ctx2.ssr = false;
        },
        syncIndicatorRect(ctx2) {
          ctx2.indicatorCleanup?.();
          const value = ctx2.value;
          if (!ctx2.indicatorState.rendered || !value)
            return;
          const triggerEl = dom5.getSelectedTriggerEl(ctx2);
          if (!triggerEl)
            return;
          ctx2.indicatorCleanup = trackElementRect(triggerEl, {
            getRect(el) {
              return dom5.getOffsetRect(el);
            },
            onChange(rect) {
              ctx2.indicatorState.rect = dom5.resolveRect(rect);
              nextTick(() => {
                ctx2.indicatorState.transition = false;
              });
            }
          });
        },
        clickIfLink(ctx2) {
          clickIfLink2(dom5.getSelectedTriggerEl(ctx2));
        }
      }
    }
  );
}
var invoke2 = {
  change: (ctx) => {
    if (ctx.value == null)
      return;
    ctx.onValueChange?.({ value: ctx.value });
  },
  focusChange: (ctx) => {
    if (ctx.focusedValue == null)
      return;
    ctx.onFocusChange?.({ focusedValue: ctx.focusedValue });
  }
};
var set10 = {
  value: (ctx, value) => {
    if (isEqual3(value, ctx.value))
      return;
    ctx.value = value;
    invoke2.change(ctx);
  },
  focusedValue: (ctx, value) => {
    if (isEqual3(value, ctx.focusedValue))
      return;
    ctx.focusedValue = value;
    invoke2.focusChange(ctx);
  }
};
var props5 = createProps5()([
  "activationMode",
  "composite",
  "dir",
  "getRootNode",
  "id",
  "ids",
  "loopFocus",
  "onFocusChange",
  "onValueChange",
  "orientation",
  "translations",
  "deselectable",
  "value"
]);
var splitProps10 = createSplitProps5(props5);
var triggerProps = createProps5()(["disabled", "value"]);
var splitTriggerProps = createSplitProps5(triggerProps);
var contentProps = createProps5()(["value"]);
var splitContentProps = createSplitProps5(contentProps);

// js/widgex/tabs.ts
var Tabs = class extends Component {
  initService(context) {
    return machine5(context);
  }
  initApi() {
    return connect5(this.service.state, this.service.send, normalizeProps);
  }
  render() {
    const parts6 = ["root"];
    for (const part of parts6)
      renderPart(this.el, part, this.api);
    this.renderTabList();
    this.renderTabContent();
  }
  renderTabList() {
    const tabList = this.el.querySelector("[data-part='list']");
    if (!tabList)
      return;
    spreadProps(tabList, this.api.getListProps());
    this.renderTriggers();
  }
  renderTabContent() {
    for (const content of this.el.querySelectorAll("[data-part='content']")) {
      const value = content.dataset.value;
      if (!value) {
        console.error("Missing `data-value` attribute on content.");
        return;
      }
      spreadProps(content, this.api.getContentProps({ value }));
    }
  }
  renderTriggers() {
    for (const trigger of this.el.querySelectorAll("[data-part='trigger']")) {
      const value = trigger.dataset.value;
      if (!value) {
        console.error("Missing `data-value` attribute on trigger.");
        return;
      }
      spreadProps(trigger, this.api.getTriggerProps({ value }));
    }
  }
};
var tabs_default = {
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
  context() {
    return {
      id: this.el.id,
      value: [""],
      loopFocus: getBooleanOption(this.el, "loop-focus"),
      activationMode: getBooleanOption(this.el, "activation-mode"),
      onValueChange: (details) => {
        if (this.el.dataset.onValueChange) {
          this.pushEvent(this.el.dataset.onValueChange, details);
        }
      }
    };
  }
};

// js/widgex/index.ts
var Hooks = {
  Accordion: accordion_default,
  Collapsible: collapsible_default,
  Dialog: dialog_default,
  Menu: menu_default,
  Tabs: tabs_default
};
//# sourceMappingURL=widgex.cjs.js.map
