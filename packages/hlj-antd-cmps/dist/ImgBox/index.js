var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from "react";
import { addSuffix, isEmptyArr, getObjValue, toArr, getFuncVal, isStr } from "@util";
import "./style.css"
const styles = {"container":"_container_y8vy1_1","item":"_item_y8vy1_9"};
import SlideModal from "../SlideModal";

var _default = (_temp2 = _class = function (_PureComponent) {
  _inherits(_default, _PureComponent);

  function _default() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      prew: false,
      initialSlide: 0
    }, _this.itemClick = function (item, i, imgs) {
      return function () {
        var _this$props = _this.props,
            onPreview = _this$props.onPreview,
            keyField = _this$props.keyField,
            target = _this$props.target;

        if (onPreview) {
          onPreview(item, i, imgs);
        } else {
          target === "_blank" ? window.open(getObjValue(item, keyField)) : _this.setState({ prew: true, initialSlide: i });
        }
      };
    }, _this.closePrew = function () {
      _this.setState({ prew: false, initialSlide: 0 });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          prew = _state.prew,
          initialSlide = _state.initialSlide;
      var _props = this.props,
          imgs = _props.imgs,
          imgW = _props.imgW,
          imgH = _props.imgH,
          preSuffix = _props.preSuffix,
          keyField = _props.keyField,
          style = _props.style,
          title = _props.title,
          imgFilter = _props.imgFilter,
          preWidth = _props.preWidth,
          preHeight = _props.preHeight,
          autoSuffix = _props.autoSuffix;

      var _suffix = "imageView2/2/w/" + imgW + "/h/" + imgH;
      var imgList = toArr(imgs);
      var imgArr = [];
      imgList.forEach(function (item, i) {
        var src = isStr(item) ? item : getObjValue(item, keyField);
        var _title = getFuncVal(title, item, i);
        if (src && imgFilter(item)) {
          var _style = {
            height: imgH,
            width: imgW,
            backgroundImage: "url(" + (autoSuffix ? addSuffix(src, _suffix, true) : src) + ")"
          };
          imgArr.push(React.createElement(
            "li",
            {
              key: i,
              className: styles.item,
              style: _style,
              onClick: _this2.itemClick(item, i, imgs)
            },
            _title
          ));
        }
      });
      return !isEmptyArr(imgArr) ? React.createElement(
        "ul",
        { className: styles.container, style: style },
        imgArr,
        prew && React.createElement(SlideModal, {
          autoSuffix: autoSuffix,
          suffix: preSuffix,
          slideWidth: preWidth,
          slideHeight: preHeight,
          visible: prew,
          keyField: keyField,
          imgList: imgs,
          initialSlide: initialSlide,
          onCancel: this.closePrew
        })
      ) : null;
    }
  }]);

  return _default;
}(PureComponent), _class.defaultProps = {
  imgs: [],
  imgW: 120,
  imgH: 120,
  keyField: "url",
  autoSuffix: true,
  target: "_self", //_blank
  title: null, //每个iteem的标题或者描述信息
  imgFilter: function imgFilter() {
    return true;
  }
}, _temp2);

export { _default as default };