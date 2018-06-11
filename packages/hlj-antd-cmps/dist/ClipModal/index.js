var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import { Modal, Button, message } from 'antd';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { getObjValue, removeSuffix, addSuffix } from 'hlj-utils';

var _default = (_temp2 = _class = function (_PureComponent) {
  _inherits(_default, _PureComponent);

  function _default() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.clipInfo = {}, _this.onComplete = function (data, url, index) {
      return function (crop, pixelCrop) {
        var width = pixelCrop.width,
            height = pixelCrop.height,
            x = pixelCrop.x,
            y = pixelCrop.y;

        _this.clipInfo = {
          data: data,
          index: index,
          url: url,
          crop: crop,
          clipUrl: removeSuffix(url) + ('?imageMogr2/crop/!' + width + 'x' + height + 'a' + x + 'a' + y),
          pixel: pixelCrop
        };
      };
    }, _this.saveClip = function () {
      var _this$props = _this.props,
          onCliped = _this$props.onCliped,
          onCancel = _this$props.onCancel;

      if (_this.clipInfo) {
        if (onCliped) {
          onCliped(_this.clipInfo);
        }
        if (onCancel) {
          onCancel();
        }
      } else {
        message.warning('还没有截图信息，请截图！');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          img = _props.img,
          slideWidth = _props.slideWidth,
          slideHeight = _props.slideHeight,
          keyField = _props.keyField,
          aspect = _props.aspect,
          visible = _props.visible,
          onCancel = _props.onCancel,
          clipConfig = _props.clipConfig,
          index = _props.index;

      var _aspect = typeof aspect === 'function' ? aspect(img, index) : aspect;
      var _clipConfig = typeof clipConfig === 'function' ? clipConfig(img, index) : clipConfig;
      var resConfig = _extends({ aspect: _aspect }, _clipConfig);
      var _modalWidth = slideWidth + 200;
      var slideStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
        height: slideHeight
      };
      var url = getObjValue(img, keyField);
      var _url = addSuffix(url, 'imageView2/2', true);
      return React.createElement(
        Modal,
        {
          closable: false,
          maskClosable: false,
          width: _modalWidth,
          footer: [React.createElement(
            Button,
            { key: 'c', type: 'dashed', onClick: onCancel },
            '\u53D6\u6D88'
          ), React.createElement(
            Button,
            { key: 's', type: 'primary', onClick: this.saveClip },
            '\u4FDD\u5B58'
          )],
          visible: visible,
          onCancel: onCancel
        },
        React.createElement('style', {
          dangerouslySetInnerHTML: {
            __html: '\n                            .ReactCrop>img{\n                                max-width:' + slideWidth + 'px;\n                                max-height:' + slideHeight + 'px;\n                            }\n                        '
          }
        }),
        React.createElement(
          'div',
          { style: slideStyle },
          React.createElement(ReactCrop, {
            keepSelection: true,
            onComplete: this.onComplete(img, url, index),
            src: _url,
            crop: resConfig
          })
        )
      );
    }
  }]);

  return _default;
}(PureComponent), _class.defaultProps = {
  // img:'',
  slideWidth: 530,
  slideHeight: 320,
  keyField: 'url',
  index: 0, //ImgGallery中需要传递这个表明当前截图的是哪一个以便回调使用
  clipConfig: {
    x: 0,
    y: 0,
    width: 30
  }
}, _temp2);

export { _default as default };