import 'antd/lib/modal/style/css';
import _Modal from 'antd/lib/modal';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';

import Carousel from '../Carousel';
import { addSuffix, getObjValue, toArr } from '@util';

var _default = (_temp = _class = function (_PureComponent) {
  _inherits(_default, _PureComponent);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
  }

  _createClass(_default, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          imgList = _props.imgList,
          slideWidth = _props.slideWidth,
          slideHeight = _props.slideHeight,
          keyField = _props.keyField,
          suffix = _props.suffix,
          initialSlide = _props.initialSlide,
          visible = _props.visible,
          onCancel = _props.onCancel,
          autoSuffix = _props.autoSuffix,
          type = _props.type;

      var _modalWidth = slideWidth + 200;
      var list = toArr(imgList);
      var slideStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
        height: slideHeight
      };
      var _suffix = 'imageView2/2/w/' + slideWidth + '/h/' + slideHeight;
      if (suffix) {
        _suffix = suffix;
      }
      return React.createElement(
        _Modal,
        {
          width: _modalWidth,
          footer: null,
          visible: visible,
          onCancel: onCancel
        },
        list && list.length ? React.createElement(
          Carousel,
          {
            initialSlide: initialSlide,
            width: slideWidth
          },
          list.map(function (item, i) {
            var url = typeof item === 'string' ? item : getObjValue(item, keyField);
            var _url = autoSuffix ? addSuffix(url, _suffix, true) : url;
            console.log(url);
            return React.createElement(
              'div',
              { style: slideStyle, key: i },
              type === 'video' ? React.createElement(
                'video',
                { src: url, controls: 'controls', style: { maxWidth: '100%', maxHeight: '100%' } },
                '\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 video \u6807\u7B7E\u3002'
              ) : React.createElement('img', { src: _url, alt: '' })
            );
          })
        ) : null
      );
    }
  }]);

  return _default;
}(PureComponent), _class.defaultProps = {
  imgList: [],
  slideWidth: 530,
  slideHeight: 320,
  initialSlide: 0,
  keyField: 'url',
  autoSuffix: true,
  visible: false
}, _temp);

export { _default as default };