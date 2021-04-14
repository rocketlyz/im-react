function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var NODE_TYPE;

(function (NODE_TYPE) {
  NODE_TYPE["TEXT"] = "text";
})(NODE_TYPE || (NODE_TYPE = {}));
var DOM_NODE_TYPE;

(function (DOM_NODE_TYPE) {
  DOM_NODE_TYPE[DOM_NODE_TYPE["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
  DOM_NODE_TYPE[DOM_NODE_TYPE["TEXT_NODE"] = 3] = "TEXT_NODE";
})(DOM_NODE_TYPE || (DOM_NODE_TYPE = {}));

var createElement = function createElement(tag, props) {
  var node;

  if (tag instanceof Function) {
    node = tag();
  } else {
    node = document.createElement(tag);
  }

  if (!node) return null;

  if (props && node.nodeType !== DOM_NODE_TYPE.TEXT_NODE) {
    setProps(node, props);
  }

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (children && children.length) {
    appendChild(node, children);
  }

  return node;
};

function appendChild(node, children) {
  node.innerHTML = "";
  children === null || children === void 0 ? void 0 : children.forEach(function (child) {
    if (typeof child === 'string' || typeof child === 'number') {
      node.appendChild(document.createTextNode("".concat(child)));
    } else {
      node.appendChild(child);
    }
  }); // TODO: 批量插入，避免反复reflow
}

function setProps(node, props) {
  if (!props || !(props instanceof Object)) return;
  Object.entries(props).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return setProp(node, key, value);
  });
}

function setProp(node, key, value) {
  if (value === undefined) value = true;

  if (key === 'className') {
    return node.setAttribute('class', value);
  } // TODO, onBlur等事件


  if (key === 'onClick' && value instanceof Function) {
    return node.addEventListener('click', value);
  }
}

var render = function render(node, el) {
  el.innerHTML = "";
  el.appendChild(node);
};

var React = {
  createElement: createElement,
  render: render
};

export default React;
export { createElement, render };
