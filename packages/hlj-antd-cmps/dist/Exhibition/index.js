var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import "./style.css"
const styles = {"container":"_container_lxe1n_3","header":"_header_lxe1n_11","footer":"_footer_lxe1n_27","content":"_content_lxe1n_35","item":"_item_lxe1n_39","table":"_table_lxe1n_55","table_no_border":"_table_no_border_lxe1n_121"};
import { getObjValue, getFuncVal, isNum, sliceArr, isFunc } from '@util';
import cls from 'classnames';

var _default = (_temp2 = _class = function (_PureComponent) {
  _inherits(_default, _PureComponent);

  function _default() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.getContent = function (row, i, j) {
      var _this$props = _this.props,
          labelWidth = _this$props.labelWidth,
          data = _this$props.data,
          labelAlign = _this$props.labelAlign;

      var _labelAlign = { center: 'center', right: 'flex-start', left: 'flex-end' }[labelAlign] || 'center';

      var title = row.title,
          dataIndex = row.dataIndex,
          rest = _objectWithoutProperties(row, ['title', 'dataIndex']);

      var _dataIndex = dataIndex || '';
      var value = getObjValue(data, _dataIndex);
      var _val = _dataIndex.trim() ? value : data;
      var _labelWidth = getFuncVal(labelWidth, row, i, j);
      return {
        label: React.createElement(
          'td',
          { style: { width: _labelWidth, justifyContent: _labelAlign } },
          getFuncVal(title, _val, data, j)
        ),
        value: React.createElement(
          'td',
          null,
          isFunc(rest.render) ? rest.render(_val, data, j) : value
        )
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          rows = _props.rows,
          style = _props.style,
          titleStyle = _props.titleStyle,
          title = _props.title,
          footer = _props.footer,
          footerStyle = _props.footerStyle,
          bordered = _props.bordered,
          className = _props.className,
          maxRow = _props.maxRow,
          rowHeight = _props.rowHeight,
          data = _props.data;

      var res = sliceArr(rows.filter(function (_ref2) {
        var hidden = _ref2.hidden;
        return !getFuncVal(hidden, data);
      }), maxRow);
      return React.createElement(
        'div',
        { style: style, className: cls(styles.container, className) },
        title && React.createElement(
          'header',
          { style: titleStyle, className: styles.header },
          title
        ),
        React.createElement(
          'div',
          { className: styles.content },
          res.map(function (item, i) {
            return React.createElement(
              'div',
              { className: styles.item, key: i },
              React.createElement(
                'table',
                {
                  className: styles[bordered ? 'table' : 'table_no_border'],
                  width: '100%'
                },
                React.createElement(
                  'tbody',
                  null,
                  item.map(function (row, j) {
                    var dataIndex = row.dataIndex,
                        className = row.className,
                        style = row.style,
                        key = row.key;

                    var _getContent = _this2.getContent(row, i, j),
                        label = _getContent.label,
                        value = _getContent.value;

                    var trStyle = {};
                    if (isNum(rowHeight)) {
                      trStyle.height = rowHeight;
                    }
                    return React.createElement(
                      'tr',
                      {
                        key: key || dataIndex || 'COLUMN_KEY' + j,
                        style: _extends({}, trStyle, style),
                        className: className
                      },
                      label,
                      value
                    );
                  })
                )
              )
            );
          })
        ),
        footer && React.createElement(
          'footer',
          { style: footerStyle, className: styles.footer },
          footer
        )
      );
    }
  }]);

  return _default;
}(PureComponent), _class.defaultProps = {
  labelWidth: 100,
  labelAlign: 'center',
  data: {},
  rows: [],
  //一列最多显示多少行
  maxRow: 20,
  //是否带边框
  bordered: true
  // rowHeight:null,
}, _temp2);

export { _default as default };