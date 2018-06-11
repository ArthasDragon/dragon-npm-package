import { toJS } from 'mobx'
import React, { Component } from 'react'
import { isEmptyObj, isStr, loadScript } from 'hlj-utils'
/*
 图表通用组件，提供的属性有:
 option:参考echart的配置option
 style:图表外层容器的样式
 afterInit:(当你想获取图表实例,可以提供此属性)当图表初始化完毕后会调用此方法，参数是初始化之后的chart实例
 header:图表头部工具栏,如果图表需要额外的操作，操作工具栏可以写在这,可以是react组件
 */
export default class Chart extends Component {
  chart
  static defaultProps = {
    headerHeight: 40,
    toolbox: true,
    option: {},
    /*
        是否自动绘图，如果为true，那每当属性改变时都会重新绘制，
        这样有可能导致不必要的重绘，当在复杂组件中使用的时候，可以关闭此项，
        然后用afterInit在外部去获取图形的实例，然后在必要时去调用实例的setOption(option)方法绘制
         */
    autoChart: true
  }
  resizeChart = () => {
    this.chart.resize()
  }
  drawChart(option) {
    let isEmpty = isEmptyObj(option)
    if (this.chart) {
      if (isEmpty) {
        return this.chart.showLoading()
      } else {
        this.chart.hideLoading()
      }
      this.chart.clear()
      const { toolbox, title } = this.props
      if (title && !option.title) {
        option.title = isStr(title)
          ? {
              text: title
            }
          : title
      }
      if (!option.toolbox && toolbox) {
        option.toolbox =
          toolbox === true
            ? {
                show: true,
                feature: {
                  dataZoom: {
                    yAxisIndex: 'none'
                  },
                  dataView: { readOnly: false },
                  magicType: { type: ['line', 'bar'] },
                  restore: {},
                  saveAsImage: {}
                }
              }
            : toolbox
      }
      this.chart.setOption(toJS(option)) //true
    }
  }

  init() {
    const { afterInit, option } = this.props
    this.chart = echarts.init(this.chartEl)
    afterInit && afterInit(this.chart)
    window.addEventListener('resize', this.resizeChart)
    this.drawChart(option)
  }

  componentDidMount() {
    if (window.echarts) {
      this.init()
    } else {
      loadScript('https://cdn.bootcss.com/echarts/3.7.2/echarts.min.js', () => {
        this.init()
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.autoChart) {
      this.drawChart(nextProps.option)
    }
  }

  shouldComponentUpdate = () => false

  componentWillUnmount() {
    this.chart = null
    window.removeEventListener('resize', this.resizeChart)
  }
  getChartEl = el => {
    this.chartEl = el
  }
  render() {
    const { style, header, headerHeight } = this.props
    let styles = {
      margin: '20px 0 20px 0',
      height: 500,
      ...style
    }
    let headerStyles = {
      position: 'relative',
      height: headerHeight,
      marginBottom: 10,
      background: '#f5f5f5',
      borderRadius: 5,
      padding: 5,
      fontSize: 14
    }
    return (
      <div style={styles}>
        {header && <header style={headerStyles}>{header}</header>}
        <div
          style={{
            height: header ? styles.height - headerHeight - 10 : '100%'
          }}
          ref={this.getChartEl}
        />
      </div>
    )
  }
}
