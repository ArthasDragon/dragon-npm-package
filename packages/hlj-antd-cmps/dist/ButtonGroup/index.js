var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

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

var _class, _temp2;

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

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

import React, { PureComponent, Children } from "react";
import { Button, Dropdown, Menu, Icon } from "antd";
import { getRes, isNoProp } from "../common.util";

var ButtonGroup = Button.Group;
var Item = function Item() {
  return null;
};

var HButtonGroup = ((_temp2 = _class = (function(_PureComponent) {
  _inherits(HButtonGroup, _PureComponent);

  function HButtonGroup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HButtonGroup);

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
          HButtonGroup.__proto__ ||
          Object.getPrototypeOf(HButtonGroup)).call.apply(
          _ref,
          [this].concat(args)
        )
      )),
      _this)),
      (_this.state = {
        _value: _this.props.defaultValue
      }),
      (_this.handle = function(key, item) {
        return function() {
          var onChange = _this.props.onChange;

          var resValue = _this.getResState();
          if (key !== resValue) {
            if (isNoProp(_this, "value")) {
              _this.setState({
                _value: key
              });
            }
            onChange && onChange(key, item);
          }
        };
      }),
      (_this.handleMenuClick = function(menu) {
        var _this$props = _this.props,
          onChange = _this$props.onChange,
          items = _this$props.items;

        var resValue = _this.getResState();
        var activeMenu = items.find(function(item) {
          return item.value === menu.key;
        });
        if (menu.key !== resValue) {
          if (isNoProp(_this, "value")) {
            _this.setState({
              _value: menu.key
            });
          }
          onChange && onChange(menu.key, activeMenu || {});
        }
      }),
      (_this.getItems = function() {
        var _this$props2 = _this.props,
          items = _this$props2.items,
          children = _this$props2.children;

        var res = [].concat(items);
        Children.forEach(children, function(item) {
          if (item && item.type === Item) {
            var _item$props = item.props,
              _children = _item$props.children,
              rest = _objectWithoutProperties(_item$props, ["children"]);

            res.push(_extends({ text: _children }, rest));
          }
        });
        return res;
      }),
      (_this.getResState = function() {
        return getRes(_this, "value");
      }),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    );
  }

  _createClass(HButtonGroup, [
    {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _props = this.props,
          size = _props.size,
          style = _props.style,
          overCount = _props.overCount,
          overTitle = _props.overTitle,
          activeType = _props.activeType;

        var resValue = this.getResState();
        var items = this.getItems();
        var _items = items.slice(0, overCount).map(function(item) {
          var text = item.text,
            icon = item.icon,
            _item$disabled = item.disabled,
            disabled = _item$disabled === undefined ? false : _item$disabled;

          var _value = item.value;
          return React.createElement(
            Button,
            {
              icon: icon,
              onClick: _this2.handle(_value, item),
              type: resValue === _value ? activeType : "default",
              key: _value,
              disabled: disabled
            },
            text
          );
        });
        var overItems = void 0;
        if (items.length > overCount) {
          var activeIndex = items.findIndex(function(item) {
            return item.value === resValue;
          });
          var activeMenu = items[activeIndex] || {};
          var menu = React.createElement(
            Menu,
            {
              selectedKeys: [activeMenu.value],
              onClick: this.handleMenuClick
            },
            items.slice(overCount).map(function(item) {
              var text = item.text,
                icon = item.icon,
                _item$disabled2 = item.disabled,
                disabled =
                  _item$disabled2 === undefined ? false : _item$disabled2;

              var _value = item.value;
              return React.createElement(
                Menu.Item,
                { key: _value, disabled: disabled },
                icon && React.createElement(Icon, { type: icon }),
                " ",
                text
              );
            })
          );
          overItems = React.createElement(
            Dropdown,
            { overlay: menu },
            React.createElement(
              Button,
              {
                icon: "down",
                type: activeIndex >= overCount ? "primary" : "default"
              },
              activeIndex >= overCount ? activeMenu.text : overTitle
            )
          );
        }
        return React.createElement(
          ButtonGroup,
          { size: size, style: style },
          _items,
          overItems
        );
      }
    }
  ]);

  return HButtonGroup;
})(PureComponent)),
(_class.defaultProps = {
  items: [],
  size: "default",
  overCount: 8,
  overTitle: "其他",
  activeType: "primary"
}),
_temp2);

HButtonGroup.Item = Item;
export default HButtonGroup;
