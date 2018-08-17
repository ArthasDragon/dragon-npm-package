var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { toJS } from "mobx";
import React, { Component } from "react";
import { isEmptyObj, isStr, loadScript } from "hlj-utils";
/*
 图表通用组件，提供的属性有:
 option:参考echart的配置option
 style:图表外层容器的样式
 afterInit:(当你想获取图表实例,可以提供此属性)当图表初始化完毕后会调用此方法，参数是初始化之后的chart实例
 header:图表头部工具栏,如果图表需要额外的操作，操作工具栏可以写在这,可以是react组件
 */
var Chart = (_temp2 = _class = function (_Component) {
  _inherits(Chart, _Component);

  function Chart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Chart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Chart.__proto__ || Object.getPrototypeOf(Chart)).call.apply(_ref, [this].concat(args))), _this), _this.resizeChart = function () {
      _this.chart.resize();
    }, _this.shouldComponentUpdate = function () {
      return false;
    }, _this.getChartEl = function (el) {
      _this.chartEl = el;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Chart, [{
    key: "drawChart",
    value: function drawChart(option) {
      var isEmpty = isEmptyObj(option);
      if (this.chart) {
        if (isEmpty) {
          return this.chart.showLoading();
        } else {
          this.chart.hideLoading();
        }
        this.chart.clear();
        var _props = this.props,
            toolbox = _props.toolbox,
            title = _props.title;

        if (title && !option.title) {
          option.title = isStr(title) ? {
            text: title
          } : title;
        }
        if (!option.toolbox && toolbox) {
          option.toolbox = toolbox === true ? {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: "none"
              },
              dataView: { readOnly: false },
              magicType: { type: ["line", "bar"] },
              restore: {},
              saveAsImage: {}
            }
          } : toolbox;
        }
        this.chart.setOption(toJS(option)); //true
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _props2 = this.props,
          afterInit = _props2.afterInit,
          option = _props2.option;

      this.chart = echarts.init(this.chartEl);
      afterInit && afterInit(this.chart);
      window.addEventListener("resize", this.resizeChart);
      this.drawChart(option);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (window.echarts) {
        this.init();
      } else {
        loadScript("https://cdn.bootcss.com/echarts/3.7.2/echarts.min.js", function () {
          _this2.init();
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.autoChart) {
        this.drawChart(nextProps.option);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.chart = null;
      window.removeEventListener("resize", this.resizeChart);
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props,
          style = _props3.style,
          header = _props3.header,
          headerHeight = _props3.headerHeight;

      var styles = _extends({
        margin: "20px 0 20px 0",
        height: 500
      }, style);
      var headerStyles = {
        position: "relative",
        height: headerHeight,
        marginBottom: 10,
        background: "#f5f5f5",
        borderRadius: 5,
        padding: 5,
        fontSize: 14
      };
      return React.createElement(
        "div",
        { style: styles },
        header && React.createElement(
          "header",
          { style: headerStyles },
          header
        ),
        React.createElement("div", {
          style: {
            height: header ? styles.height - headerHeight - 10 : "100%"
          },
          ref: this.getChartEl
        })
      );
    }
  }]);

  return Chart;
}(Component), _class.defaultProps = {
  headerHeight: 40,
  toolbox: true,
  option: {},
  /*
      是否自动绘图，如果为true，那每当属性改变时都会重新绘制，
      这样有可能导致不必要的重绘，当在复杂组件中使用的时候，可以关闭此项，
      然后用afterInit在外部去获取图形的实例，然后在必要时去调用实例的setOption(option)方法绘制
       */
  autoChart: true
}, _temp2);
export { Chart as default };