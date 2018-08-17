var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent, Fragment } from "react";
import { Cascader, Button, Popover, Tag } from "antd";
import "./style.css"
const styles = {"cascader":"_cascader_1iyxn_1","ant-input":"_ant-input_1iyxn_5","popover":"_popover_1iyxn_21","ant-btn":"_ant-btn_1iyxn_25"};

var _default = (_temp2 = _class = function (_PureComponent) {
  _inherits(_default, _PureComponent);

  function _default() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.selectCity = function (newValue, label) {
      return function () {
        var _this$props = _this.props,
            onChange = _this$props.onChange,
            _this$props$value = _this$props.value,
            value = _this$props$value === undefined ? [] : _this$props$value;

        var flag = true;
        if (onChange) {
          if (newValue.length === value.length) {
            flag = newValue[0] !== value[0] || newValue[1] !== value[1];
          }
          flag && onChange(newValue, label);
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          extraOptions = _props.extraOptions,
          extraText = _props.extraText,
          showExtra = _props.showExtra,
          placement = _props.placement,
          overlayStyle = _props.overlayStyle,
          value = _props.value,
          selectedColor = _props.selectedColor,
          rest = _objectWithoutProperties(_props, ["extraOptions", "extraText", "showExtra", "placement", "overlayStyle", "value", "selectedColor"]);

      var extraContent = [];
      if (showExtra) {
        extraContent = extraOptions.map(function (item) {
          var _value = Array.isArray(value) ? value : [];
          var flag = _value.length === 2 ? item.value[1] === _value[1] : item.value[0] === _value[0];
          return React.createElement(
            "span",
            {
              key: item.key,
              onClick: _this2.selectCity(item.value, item.label),
              style: {
                margin: "2px 2px 4px 2px",
                display: "inline-block"
              }
            },
            React.createElement(
              Tag,
              { color: flag ? selectedColor : "" },
              item.label
            )
          );
        });
      }
      var width = (rest.style || {}).width || 200;
      return React.createElement(
        Fragment,
        null,
        React.createElement(Cascader, _extends({
          value: value,
          style: { width: width },
          className: showExtra ? styles.cascader : undefined
        }, rest)),
        showExtra && React.createElement(
          "span",
          { className: styles.popover },
          React.createElement(
            Popover,
            {
              overlayStyle: overlayStyle,
              placement: placement,
              content: extraContent,
              trigger: "click"
            },
            React.createElement(
              Button,
              { size: rest.size || "default" },
              extraText
            )
          )
        )
      );
    }
  }]);

  return _default;
}(PureComponent), _class.defaultProps = {
  extraText: "热门城市",
  placement: "bottomRight",
  overlayStyle: { width: 250 },
  selectedColor: "#108ee9",
  showExtra: true,
  extraOptions: []
}, _temp2);

export { _default as default };