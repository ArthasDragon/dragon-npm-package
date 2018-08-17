## Chart

> 用法 （除 option 均可不传）

```
    <Chart
        option={option}
        afterInit={afterInit}
        style={style}
        header={header}
        headerHeight={20}
        toolbox={true}
    />
```

> 1.  option 同 baidu 的 echarts http://echarts.baidu.com/examples/index.html
> 2.  afterInit 当你想获取图表实例,可以提供此属性)当图表初始化完毕后会调用此方法，参数是初始化之后的 chart 实例
> 3.  style:图表外层容器的样式
> 4.  header:图表头部工具栏,如果图表需要额外的操作，操作工具栏可以写在这,可以是 react 组件
> 5.  headerHeight: 头部工具栏高度
> 6.  toolbox: true（默认为 true 使用默认工具栏 可自定义 见 echarts）

# 效果图见 echarts

> ![效果图](/app\common\Chart\chart.png)
