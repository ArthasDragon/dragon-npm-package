var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import { isObj, handleImgSuffix, getObjValue } from '@util';
import "./style.css"
const styles = {"container":"_container_4jc5v_1","sort_container":"_sort_container_4jc5v_9","item":"_item_4jc5v_17","title":"_title_4jc5v_45","select":"_select_4jc5v_59","action":"_action_4jc5v_71"};
import Upload from '../Upload';
import SlideModal from '../SlideModal';
import ClipModal from '../ClipModal';
import { Icon, message, Checkbox } from 'antd';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { getRes, injectInit, isNoProp } from '../common.util';

var SortableItem = SortableElement(function (_ref) {
  var children = _ref.children;
  return children;
});
var SortableList = SortableContainer(function (_ref2) {
  var children = _ref2.children;
  return React.createElement(
    'div',
    { className: styles.sort_container },
    children
  );
});

var _default = (_temp2 = _class = function (_PureComponent) {
  _inherits(_default, _PureComponent);

  function _default() {
    var _ref3;

    var _temp, _this, _ret;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref3, [this].concat(args))), _this), _this.state = {
      prew: false,
      initialSlide: 0,
      _imgList: _this.props.defaultImgList
    }, _this.preview = function (initialSlide, item) {
      return function () {
        if (_this.props.onPreview) {
          _this.props.onPreview(item, initialSlide);
        } else {
          _this.setState({ prew: !_this.state.prew, initialSlide: initialSlide });
        }
      };
    }, _this.deleteItem = function (index, item) {
      return function () {
        if (isNoProp(_this, 'imgList')) {
          _this.setState({
            _imgList: _this.state._imgList.filter(function (item, i) {
              return i !== index;
            })
          });
        }
        _this.props.onRemove && _this.props.onRemove(index, item);
      };
    }, _this.uploadOk = function (file, link, info) {
      var _this$props = _this.props,
          onOk = _this$props.onOk,
          checkable = _this$props.checkable,
          keyField = _this$props.keyField;

      if (isNoProp(_this, 'imgList')) {
        _this.setState({
          _imgList: _this.state._imgList.concat([checkable ? _defineProperty({}, keyField, link) : link])
        });
      }
      onOk && onOk(link, info, file);
    }, _this.beforeUp = function (files, up, progressHandler) {
      var max = _this.props.max;

      var resList = _this.getResState();
      var nowListLen = resList.length;
      var flag = false;
      files.forEach(function (file, i) {
        if (max && nowListLen + i > max - 1) {
          flag = true;
          up.removeFile(file.id);
          progressHandler(false);
        }
      });
      if (flag) {
        message.warning('\u6700\u591A\u4E0A\u4F20' + max + '\u5F20\u56FE\u7247');
      }
    }, _this.doCheck = function (item, index) {
      return function (e) {
        if (isNoProp(_this, 'imgList')) {
          _this.setState({
            _imgList: _this.state._imgList.map(function (s, i) {
              if (i === index && isObj(s)) {
                s.checked = e.target.checked;
              }
              return s;
            })
          });
        }
        _this.props.onCheck && _this.props.onCheck(e.target.checked, item, index);
      };
    }, _this.sortEnd = function (_ref5) {
      var oldIndex = _ref5.oldIndex,
          newIndex = _ref5.newIndex;

      if (isNoProp(_this, 'imgList')) {
        _this.setState({
          _imgList: arrayMove(_this.state._imgList, oldIndex, newIndex)
        });
      }
      _this.props.onSort && _this.props.onSort(arrayMove(_this.props.imgList, oldIndex, newIndex));
    }, _this.cliped = function (info) {
      if (_this.noImgListProp()) {
        var f = _this.props.keyField;
        _this.setState({
          _imgList: _this.state._imgList.map(function (item, i) {
            if (i === info.index) {
              return isObj(item) ? _extends({}, item, _defineProperty({}, f, info.clipUrl)) : info.clipUrl;
            }
            return item;
          })
        });
      }
      _this.props.onCliped && _this.props.onCliped(info);
    }, _this.getResState = function () {
      return getRes(_this, 'imgList') || [];
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      injectInit(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          showUpload = _props.showUpload,
          multiple = _props.multiple,
          checkable = _props.checkable,
          preSuffix = _props.preSuffix,
          showPreview = _props.showPreview,
          autoSuffix = _props.autoSuffix,
          showRemove = _props.showRemove,
          keyField = _props.keyField,
          target = _props.target,
          sortabled = _props.sortabled,
          clipabled = _props.clipabled,
          clipConfig = _props.clipConfig,
          aspect = _props.aspect,
          title = _props.title;
      var _state = this.state,
          initialSlide = _state.initialSlide,
          prew = _state.prew;

      var resImgList = this.getResState();
      return React.createElement(
        'div',
        { className: styles.container, style: style },
        React.createElement(
          SortableList,
          {
            onSortEnd: this.sortEnd,
            axis: 'xy',
            hideSortableGhost: false
          },
          resImgList.map(function (item, index) {
            var url = void 0;
            var checked = false;
            if (typeof item === 'string') {
              url = item;
            } else {
              item = item || {};
              url = getObjValue(item, keyField);
              checked = item.checked;
            }
            url = url || '';
            var src = url.indexOf('imageMogr2/crop') === -1 ? handleImgSuffix(url, 'imageView2/1/w/100/h/100') : url;
            var _title = typeof title === 'function' ? title(item, index) : title;
            return React.createElement(
              SortableItem,
              {
                disabled: !sortabled,
                key: index,
                index: index
              },
              React.createElement(
                'div',
                { className: styles.item },
                checkable && React.createElement(
                  'span',
                  {
                    className: styles.select
                  },
                  React.createElement(Checkbox, {
                    checked: checked,
                    onChange: _this2.doCheck(item, index)
                  })
                ),
                React.createElement(
                  'div',
                  { className: styles.action },
                  showPreview && React.createElement(
                    'span',
                    {
                      onClick: target === '_blank' ? undefined : _this2.preview(index, item)
                    },
                    target === '_blank' ? React.createElement(
                      'a',
                      {
                        style: { color: '#fff' },
                        rel: 'noreferrer',
                        target: '_blank',
                        href: url
                      },
                      React.createElement(Icon, { type: 'eye-o' })
                    ) : React.createElement(Icon, { type: 'eye-o' })
                  ),
                  showRemove && React.createElement(
                    'span',
                    { onClick: _this2.deleteItem(index, item)
                    },
                    React.createElement(Icon, { type: 'delete' })
                  )
                ),
                React.createElement('img', { src: src, alt: 'img' }),
                _title !== undefined && _title !== null && React.createElement(
                  'div',
                  { className: styles.title },
                  _title
                )
              )
            );
          }),
          React.createElement(
            'div',
            { className: styles.item, style: { display: showUpload ? 'block' : 'none' } },
            React.createElement(Upload, {
              multiple: multiple,
              onAdded: this.beforeUp,
              onOk: this.uploadOk,
              link: '',
              width: '100%',
              height: '100%' })
          )
        ),
        prew && !clipabled && React.createElement(SlideModal, {
          aspect: aspect,
          autoSuffix: autoSuffix,
          suffix: preSuffix,
          visible: prew,
          keyField: keyField,
          imgList: resImgList,
          initialSlide: initialSlide,
          onCancel: this.preview(0)
        }),
        prew && clipabled && React.createElement(ClipModal, {
          aspect: aspect,
          clipConfig: clipConfig,
          onCliped: this.cliped,
          visible: prew,
          keyField: keyField,
          img: resImgList[initialSlide],
          index: initialSlide,
          onCancel: this.preview(0)
        })
      );
    }
  }]);

  return _default;
}(PureComponent), _class.isHljImgGallery = true, _class.defaultProps = {
  // imgList: undefined,
  defaultImgList: [],
  showUpload: true,
  multiple: false,
  showRemove: true,
  showPreview: true,
  keyField: 'url',
  //设置target='_blank'时点击预览会跳转到新页面显示点击的图片且onPreview失效
  target: '_self',
  checkable: false,
  clipabled: false, //是否可在预览图中剪裁target='_self'才有效
  sortabled: false, //能否拖动排序
  title: null, //每个item的额外的信息
  max: null //最多上传几张
}, _temp2);

export { _default as default };