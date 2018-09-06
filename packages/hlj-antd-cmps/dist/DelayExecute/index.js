import 'antd/lib/button/style/css';
import _Button from 'antd/lib/button';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import "./style.css"
const styles = {"outer_box":"_outer_box_1jx9l_1","down_modal":"_down_modal_1jx9l_3","button":"_button_1jx9l_25","left_text":"_left_text_1jx9l_31"};


export default (function (store) {
  return function (Cmp) {
    var _class;

    return observer(_class = function (_Component) {
      _inherits(_class, _Component);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
      }

      _createClass(_class, [{
        key: 'render',
        value: function render() {
          var text = store.text,
              delay_time = store.delay_time,
              show_delay = store.show_delay;

          return React.createElement(
            'div',
            { className: styles.outer_box },
            React.createElement(Cmp, this.props),
            show_delay && React.createElement(
              'div',
              { className: styles.down_modal },
              React.createElement(
                'div',
                { className: styles.left_text },
                text.replace('$time', delay_time + '')
              ),
              React.createElement(
                _Button,
                { onClick: store.end(false), className: styles.button },
                '\u64A4\u9500\u64CD\u4F5C'
              ),
              React.createElement(
                _Button,
                { onClick: store.end(true), className: styles.button },
                '\u7ACB\u5373\u751F\u6548'
              )
            )
          );
        }
      }]);

      return _class;
    }(Component)) || _class;
  };
});