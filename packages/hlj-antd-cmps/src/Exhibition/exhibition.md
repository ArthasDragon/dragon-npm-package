# Exhibition

## 用法

```
<Exhibition
    rows={rows}
    data={data}
    okText="发布新补丁"
/>
```

## 参数：（默认值）---（含义）

> 1.  labelWidth:100 \---label 宽度
> 2.  labelAlign: 'center' \---label 对齐方式
> 3.  maxRow: 20 \---一列最多显示多少行
> 4.  bordered: true \---是否带边框
> 5.  data:[] \---列表数据

```
[{
    name:'',
    age:''
},{
    name:'',
    age:''
}]
```

> 6.  rows:[] \---数据展示格式

```
[{
    title:'姓名',
    dataIndex:'name'
},{
    title:'年龄',
    dataIndex:'age',
    render: age => <div>{age}</div>
}]
```

## 效果图

> ![效果图](/app\common\Exhibition\exhibition.png)
