var _class, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Children } from 'react';
import "./style.css"
const styles = {"container":"_container_a02h7_1","arrow":"_arrow_a02h7_7","right":"_right_a02h7_47","left":"_left_a02h7_53"};
import { Carousel, Icon } from 'antd';
import { omit } from 'hlj-utils';

var Arrow = function (_Component) {
  _inherits(Arrow, _Component);

  function Arrow() {
    _classCallCheck(this, Arrow);

    return _possibleConstructorReturn(this, (Arrow.__proto__ || Object.getPrototypeOf(Arrow)).apply(this, arguments));
  }

  _createClass(Arrow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          rest = _objectWithoutProperties(_props, ['type']);

      var arrowStyle = {
        width: 40,
        height: '100%',
        zIndex: 1,
        transform: 'translateY(-50%)',
        marginTop: 0
      };
      return React.createElement(
        'div',
        _extends({}, omit(rest, ['currentSlide', 'slideCount', 'onSlided']), {
          style: arrowStyle
        }),
        React.createElement(
          'p',
          { className: styles.arrow + ' ' + styles[type] },
          React.createElement(Icon, { type: type })
        )
      );
    }
  }]);

  return Arrow;
}(Component);

var _default = (_temp = _class = function (_Component2) {
  _inherits(_default, _Component2);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
  }

  _createClass(_default, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          arrows = _props2.arrows,
          width = _props2.width,
          onSlided = _props2.onSlided,
          settings = _objectWithoutProperties(_props2, ['children', 'arrows', 'width', 'onSlided']);

      var count = Children.count(children);
      return React.createElement(
        'div',
        { className: styles.container, style: { width: width } },
        count ? React.createElement(
          Carousel,
          _extends({
            ref: 'slider',
            dots: true,
            infinite: true,
            afterChange: onSlided,
            arrows: count === 1 ? false : arrows,
            nextArrow: React.createElement(Arrow, { type: 'right' }),
            prevArrow: React.createElement(Arrow, { type: 'left' }),
            effect: Children.count(children) === 1 ? 'fade' : 'scrollx'
          }, settings),
          children
        ) : null
      );
    }
  }]);

  return _default;
}(Component), _class.defaultProps = {
  arrows: true,
  initialSlide: 0
}, _temp);

export { _default as default };