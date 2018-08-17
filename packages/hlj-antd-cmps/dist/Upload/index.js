var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import { Progress, Icon, message } from 'antd';
import styles from './style.css';
import upload from './config';
import cls from 'classnames';
import SlideModal from '../SlideModal';
import ClipModal from '../ClipModal';
import * as util from '@util';
import { getRes, isNoProp } from '../common.util';

var _default = (_temp2 = _class = function (_PureComponent) {
  _inherits(_default, _PureComponent);

  function _default() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.upbut = 'upbut_' + Math.random().toFixed(8), _this.upbox = 'upbox_' + Math.random().toFixed(8), _this.state = {
      //上传进度是否显示
      progress: 'none',
      //上传进度
      percent: 0,
      opacity: 1,
      isActive: false,
      previewModal: false,
      _link: _this.props.defaultLink
      //上传进度条的显示和隐藏
    }, _this.progressHandler = function () {
      var isShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      _this.setState({
        percent: 0,
        progress: isShow ? 'block' : 'none',
        opacity: _this.state.opacity === 0 ? 1 : 0
      });
    }, _this.cancelUpload = function () {
      if (_this.fileId) {
        _this.uploader.removeFile(_this.fileId);
      }
      _this.progressHandler(false);
    }, _this.deleteFile = function () {
      var _this$props = _this.props,
          onDelete = _this$props.onDelete,
          link = _this$props.link;

      if (isNoProp(_this, 'link')) {
        _this.setState({
          _link: ''
        });
      }
      onDelete && onDelete(_this.file, link);
    }, _this.preview = function () {
      if (_this.props.onPreview) {
        _this.props.onPreview(_this.props.link);
      } else {
        _this.setState({
          previewModal: !_this.state.previewModal
        });
      }
    }, _this.hover = function (type) {
      return function () {
        var _this$props2 = _this.props,
            children = _this$props2.children,
            disabled = _this$props2.disabled;
        var _this$state = _this.state,
            isActive = _this$state.isActive,
            percent = _this$state.percent;

        if (!children && !disabled) {
          if (type === 'out' && isActive) {
            _this.setState({
              isActive: false
            });
          } else if (_this.getResState() && !percent) {
            _this.setState({
              isActive: true
            });
          }
        }
      };
    }, _this.cliped = function (info) {
      if (isNoProp(_this, 'link')) {
        _this.setState({
          _link: info.clipUrl
        });
      }
      _this.props.onCliped && _this.props.onCliped(info);
    }, _this.getResState = function () {
      return getRes(_this, 'link');
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  //取消上传

  //移除文件


  _createClass(_default, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          onOk = _props.onOk,
          onAdded = _props.onAdded,
          multiple = _props.multiple,
          onBeforeUp = _props.onBeforeUp,
          _onError = _props.onError,
          uptoken_url = _props.uptoken_url,
          type = _props.type,
          rest = _objectWithoutProperties(_props, ['onOk', 'onAdded', 'multiple', 'onBeforeUp', 'onError', 'uptoken_url', 'type']);

      this.uploader = upload(_extends({
        uptoken_url: '/p/wedding/home/APIUtils/' + uptoken_url,
        browse_button: this.upbut,
        container: this.upbox,
        multi_selection: multiple,
        drop_element: this.upbut,
        // domain: type === 'video' ? 'http://qnvideo.hunliji.com/' : 'http://qnm.hunliji.com/',
        filesAdded: function filesAdded(up, files) {
          onAdded && onAdded(files, up, _this2.progressHandler);
        },
        //上传前
        beforeUpload: function beforeUpload(up, file) {
          _this2.file = null;
          _this2.fileId = file.id;
          _this2.progressHandler(true);
          onBeforeUp && onBeforeUp(file, up, _this2.progressHandler);
        },
        //上传中
        uploadProgress: function uploadProgress(file, percent) {
          _this2.setState({
            percent: percent
          });
        },
        //上传后
        fileUploaded: function fileUploaded(file, link, info, up) {
          _this2.file = file;
          _this2.progressHandler(false);
          if (isNoProp(_this2, 'link')) {
            _this2.setState({
              _link: link
            });
          }
          onOk && onOk(file, link, info, up);
        },
        //上传失败
        onError: function onError(up, err, errTip) {
          _this2.fileId && up.removeFile(_this2.fileId);
          _this2.progressHandler(false);
          if (_onError) {
            return _onError(up, err, errTip);
          }
          message.error('上传失败:' + errTip);
        }
      }, rest));
    }
  }, {
    key: 'render',
    value: function render() {
      var _cls;

      var _state = this.state,
          progress = _state.progress,
          percent = _state.percent,
          opacity = _state.opacity,
          isActive = _state.isActive,
          previewModal = _state.previewModal;
      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height,
          style = _props2.style,
          showDelete = _props2.showDelete,
          children = _props2.children,
          clipConfig = _props2.clipConfig,
          autoSuffix = _props2.autoSuffix,
          disabled = _props2.disabled,
          target = _props2.target,
          description = _props2.description,
          clipabled = _props2.clipabled,
          preSuffix = _props2.preSuffix,
          aspect = _props2.aspect,
          type = _props2.type;

      var resLink = this.getResState();
      if (util.isObj(resLink)) {
        var _resLink = resLink,
            domain = _resLink.domain,
            image_path = _resLink.image_path,
            video_path = _resLink.video_path;

        resLink = domain + (type === 'video' ? video_path : image_path);
      }
      var warpStyle = {
        width: children ? 'auto' : width,
        height: children ? 'auto' : height,
        display: 'inline-block',
        padding: '0 15px 0 15px'
      };
      return React.createElement(
        'div',
        {
          onMouseOver: this.hover('over'),
          onMouseOut: this.hover('out'),
          id: this.upbox,
          className: styles.upbox,
          style: _extends({}, warpStyle, style)
        },
        React.createElement(
          'div',
          { id: this.upbut, className: styles.upbut },
          children ? React.createElement(
            'div',
            { className: styles.up_text },
            children
          ) : !resLink ? React.createElement(
            'span',
            { className: styles.upload_mark },
            '+'
          ) : type === 'video' ? React.createElement(
            'video',
            { src: resLink, controls: 'controls' },
            '\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 video \u6807\u7B7E\u3002'
          ) : React.createElement('img', {
            style: { maxHeight: height, maxWidth: width, opacity: opacity },
            className: styles.upimg,
            src: resLink
          })
        ),
        disabled && React.createElement('div', { className: styles.disabled }),
        React.createElement(
          'div',
          { className: styles.progress, style: { display: progress } },
          React.createElement(Progress, { showInfo: false, strokeWidth: 5, percent: percent })
        ),
        React.createElement('i', {
          onClick: this.cancelUpload,
          style: { display: progress },
          className: 'anticon anticon-cross ' + styles.closeBtn
        }),
        !children && React.createElement(
          'span',
          {
            className: cls((_cls = {}, _defineProperty(_cls, styles.delete, true), _defineProperty(_cls, styles.active, isActive), _cls))
          },
          React.createElement(
            'span',
            { onClick: target === '_blank' ? undefined : this.preview },
            target === '_blank' ? React.createElement(
              'a',
              {
                style: { color: '#fff' },
                rel: 'noreferrer',
                target: '_blank',
                href: resLink
              },
              React.createElement(Icon, { type: 'eye-o' })
            ) : React.createElement(Icon, { type: 'eye-o' })
          ),
          showDelete && React.createElement(
            'span',
            { onClick: this.deleteFile },
            React.createElement(Icon, { type: 'delete' })
          )
        ),
        !children && description && React.createElement(
          'div',
          { className: styles.description },
          description
        ),
        previewModal && !clipabled && React.createElement(SlideModal, {
          autoSuffix: autoSuffix,
          suffix: preSuffix,
          visible: previewModal,
          imgList: [resLink],
          type: type,
          onCancel: this.preview
        }),
        previewModal && clipabled && React.createElement(ClipModal, {
          aspect: aspect,
          clipConfig: clipConfig,
          onCliped: this.cliped,
          visible: previewModal,
          img: resLink,
          type: type,
          onCancel: this.preview
        })
      );
    }
  }]);

  return _default;
}(PureComponent), _class.isHljUpload = true, _class.defaultProps = {
  multiple: false,
  width: 320,
  height: 180,
  // link: '',
  showDelete: true,
  disabled: false,
  //设置target='_blank'时点击预览会跳转到新页面显示点击的图片且onPreview失效
  target: '_self',
  autoSuffix: true,
  uptoken_url: 'image_upload_token'
}, _temp2);

export { _default as default };