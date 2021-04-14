"use strict";

var Favorite = function Favorite() {
  return /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "\u82F9\u679C: ", /*#__PURE__*/React.createElement("input", null)), /*#__PURE__*/React.createElement("li", null, "\u6817\u5B50: ", /*#__PURE__*/React.createElement("input", null)));
};

var App = function App() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Hello, do you like: "), /*#__PURE__*/React.createElement(Favorite, null));
};

React.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));
