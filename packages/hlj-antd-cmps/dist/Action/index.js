import "antd/lib/icon/style/css";
import _Icon from "antd/lib/icon";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent, Children } from "react";
import "./style.css"
const styles = {"container":"_container_1h2zv_1","extra":"_extra_1h2zv_7","item":"_item_1h2zv_19","active_item":"_active_item_1h2zv_67","disabled":"_disabled_1h2zv_79"};
import cls from "classnames";

import { getRes, isNoProp } from "../common.util";

var Item = function Item() {
  return null;
};

var Action = (_temp2 = _class = function (_PureComponent) {
  _inherits(Action, _PureComponent);

  function Action() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Action);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Action.__proto__ || Object.getPrototypeOf(Action)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      _active: _this.props.defaultActive
    }, _this.change = function (item) {
      return function () {
        var onChange = _this.props.onChange;

        var resActive = getRes(_this, "active");
        if (!item.disabled && resActive !== item.value) {
          if (isNoProp(_this, "active")) {
            _this.setState({
              _active: item.value
            });
          }
          onChange && onChange(item.value, item);
        }
      };
    }, _this.getOptions = function () {
      var _this$props = _this.props,
          options = _this$props.options,
          children = _this$props.children;

      var res = [].concat(options);
      Children.forEach(children, function (item) {
        if (item && item.type === Item) {
          var _item$props = item.props,
              _children = _item$props.children,
              rest = _objectWithoutProperties(_item$props, ["children"]);

          res.push(_extends({ title: _children }, rest));
        }
      });
      return res;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Action, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          extra = _props.extra,
          bordered = _props.bordered;

      var resActive = getRes(this, "active");
      var options = this.getOptions();
      return React.createElement(
        "div",
        {
          className: styles.container,
          style: _extends({}, style, {
            borderBottom: bordered ? "1px solid #d9d9d9" : 0
          })
        },
        options.map(function (item) {
          var _ref2 = item || {},
              value = _ref2.value,
              title = _ref2.title,
              icon = _ref2.icon,
              disabled = _ref2.disabled;

          return React.createElement(
            "div",
            {
              key: value,
              onClick: _this2.change(item),
              className: cls(styles.item, _defineProperty({}, styles.disabled, disabled), _defineProperty({}, styles.active_item, value === resActive))
            },
            React.createElement(
              "span",
              null,
              icon && React.createElement(_Icon, { style: { marginRight: 4 }, type: icon }),
              title
            )
          );
        }),
        extra && React.createElement(
          "div",
          { className: styles.extra },
          extra
        )
      );
    }
  }]);

  return Action;
}(PureComponent), _class.defaultProps = {
  bordered: true,
  options: []
}, _temp2);


Action.Item = Item;
export default Action;