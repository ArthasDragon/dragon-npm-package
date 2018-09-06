import "antd/lib/modal/style/css";
import _Modal from "antd/lib/modal";
import "antd/lib/input/style/css";
import _Input from "antd/lib/input";
import "antd/lib/row/style/css";
import _Row from "antd/lib/row";
import "antd/lib/col/style/css";
import _Col from "antd/lib/col";
import "antd/lib/select/style/css";
import _Select from "antd/lib/select";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";

import { isStr } from "hlj-utils";
var Option = _Select.Option;

var _default = (_temp = _class = function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

    _this.state = {
      message: "",
      _visible: false,
      warn_time: "3"
    };

    _this.handleOk = function () {
      var onOk = _this.props.onOk;

      _this.clear();
      onOk && onOk();
    };

    _this.handleCancel = function () {
      _this.clear();
      var onCancel = _this.props.onCancel;

      onCancel && onCancel();
    };

    _this.changeWarnTime = function (value) {
      var onChangeTime = _this.props.onChangeTime;

      _this.setState({ warn_time: value });
      onChangeTime && onChangeTime(value);
    };

    _this.clear = function () {
      _this.setState({
        message: "",
        _visible: false,
        warn_time: "3"
      });
    };

    _this.setFengjinMessage = function (message) {
      return function (e) {
        message = isStr(message) ? message : e && e.target && e.target.value || "";
        _this.setState({ message: message });
        var onSetMessage = _this.props.onSetMessage;

        onSetMessage && onSetMessage(message);
      };
    };

    return _this;
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          visible = _props.visible,
          warn_message = _props.warn_message;
      var _state = this.state,
          message = _state.message,
          _visible = _state._visible,
          warn_time = _state.warn_time;

      return React.createElement(
        _Modal,
        {
          onCancel: this.handleCancel,
          width: 800,
          onOk: this.handleOk,
          visible: visible
        },
        React.createElement(
          _Row,
          null,
          React.createElement(
            _Col,
            { span: 5 },
            "\u5C01\u7981\u65F6\u957F\uFF1A"
          ),
          React.createElement(
            _Col,
            { span: 19 },
            React.createElement(
              _Select,
              {
                value: warn_time + "",
                style: { width: 200 },
                onChange: this.changeWarnTime
              },
              React.createElement(
                Option,
                { value: "3" },
                "3\u5929"
              ),
              React.createElement(
                Option,
                { value: "7" },
                "7\u5929"
              ),
              React.createElement(
                Option,
                { value: "30" },
                "\u4E00\u4E2A\u6708"
              ),
              React.createElement(
                Option,
                { value: "36500" },
                "\u6C38\u4E45"
              )
            )
          )
        ),
        React.createElement(
          "p",
          { style: { padding: "15px 0" } },
          "\u5C01\u7981\u539F\u56E0\uFF1A"
        ),
        React.createElement(
          _Row,
          null,
          React.createElement(
            _Col,
            {
              span: 14,
              style: {
                border: "1px #666 solid",
                padding: "50px 0",
                height: "200px"
              }
            },
            React.createElement(
              "ul",
              null,
              warn_message.map(function (msg, index) {
                return React.createElement(
                  "li",
                  {
                    style: { cursor: "pointer" },
                    key: index,
                    onClick: _this2.setFengjinMessage(msg)
                  },
                  msg
                );
              })
            )
          ),
          React.createElement(
            _Col,
            { span: 10, style: { height: "200px" } },
            React.createElement(_Input.TextArea, {
              onChange: this.setFengjinMessage(),
              value: message,
              placeholder: "\u9009\u62E9\u6216\u8F93\u5165\u5C01\u7981\u539F\u56E0",
              style: { height: "100%", border: "1px #666 solid" }
            })
          )
        )
      );
    }
  }]);

  return _default;
}(Component), _class.defaultProps = {
  warn_message: ["1.小主，多次违反版规去小黑屋呆3天吧", "2.小主，多次违反版规去小黑屋反思7天吧", "3.小主，多次违反版规被关小黑屋一个月嘤", "4.小主，违规情节严重，被永远留在了小黑屋"],
  visible: false
}, _temp);

export { _default as default };