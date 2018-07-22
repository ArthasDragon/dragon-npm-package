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

var _class, _temp;

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

import React, { PureComponent } from "react";
import "./style.css";
const styles = {
  container: "_container_zg6fh_1",
  record: "_record_zg6fh_9",
  header: "_header_zg6fh_13",
  content: "_content_zg6fh_25",
  empty_record: "_empty_record_zg6fh_35"
};

var _default = ((_temp = _class = (function(_PureComponent) {
  _inherits(_default, _PureComponent);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(
      this,
      (_default.__proto__ || Object.getPrototypeOf(_default)).apply(
        this,
        arguments
      )
    );
  }

  _createClass(_default, [
    {
      key: "render",
      value: function render() {
        var _props = this.props,
          recordList = _props.recordList,
          maxHeight = _props.maxHeight,
          style = _props.style,
          _props$fieldKeys = _props.fieldKeys,
          time = _props$fieldKeys.time,
          name = _props$fieldKeys.name,
          status = _props$fieldKeys.status,
          content = _props$fieldKeys.content;

        return React.createElement(
          "div",
          {
            style: _extends({ maxHeight: maxHeight }, style),
            className: styles.container
          },
          recordList.length
            ? recordList.map(function(item) {
                return React.createElement(
                  "div",
                  { key: item.id, className: styles.record },
                  React.createElement(
                    "p",
                    { className: styles.header },
                    React.createElement("span", null, item[time]),
                    React.createElement("span", null, item[name]),
                    React.createElement(
                      "span",
                      null,
                      {
                        1: "呼叫成功",
                        2: "无应答",
                        3: "通话中",
                        4: "关机",
                        5: "停机",
                        6: "空号",
                        7: "无法接通",
                        8: "个人回拨",
                        9: "拒访"
                      }[+item[status]] || "无应答",
                      " :"
                    )
                  ),
                  React.createElement(
                    "p",
                    { className: styles.content },
                    item[content]
                  )
                );
              })
            : React.createElement(
                "p",
                { className: styles.empty_record },
                "\u6682\u65E0\u8BB0\u5F55"
              )
        );
      }
    }
  ]);

  return _default;
})(PureComponent)),
(_class.defaultProps = {
  recordList: [],
  fieldKeys: {
    time: "created_at",
    name: "admin_name",
    status: "call_result",
    content: "note"
  },
  maxHeight: 600
}),
_temp);

export { _default as default };
