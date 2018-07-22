var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

import React, { Component } from "react";

export default (function(loadComponent) {
  return (function(_Component) {
    _inherits(_class2, _Component);

    function _class2() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, _class2);

      for (
        var _len = arguments.length, args = Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      return (
        (_ret = ((_temp = ((_this = _possibleConstructorReturn(
          this,
          (_ref =
            _class2.__proto__ || Object.getPrototypeOf(_class2)).call.apply(
            _ref,
            [this].concat(args)
          )
        )),
        _this)),
        (_this.state = {
          Cmp: null
        }),
        _temp)),
        _possibleConstructorReturn(_this, _ret)
      );
    }

    _createClass(_class2, [
      {
        key: "componentWillMount",
        value: function componentWillMount() {
          var _this2 = this;

          if (this.hasLoadedComponent()) {
            return;
          }

          loadComponent()
            .then(function(module) {
              return module.default;
            })
            .then(function(Cmp) {
              _this2.setState({ Cmp: Cmp });
            })
            .catch(function(err) {
              console.error("Cannot load component in <AsyncCmp />");
              throw err;
            });
        }
      },
      {
        key: "hasLoadedComponent",
        value: function hasLoadedComponent() {
          return this.state.Cmp !== null;
        }
      },
      {
        key: "render",
        value: function render() {
          var Cmp = this.state.Cmp;

          return Cmp && React.createElement(Cmp, this.props);
        }
      }
    ]);

    return _class2;
  })(Component);
});
