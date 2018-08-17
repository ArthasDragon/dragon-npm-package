# Cascader

> 对 antd 的 Cascader 的封装

```
<Cascader
    showSearch
    showExtra
    extraOptions={getHotCitys(config)}
    expandTrigger="hover"
    placeholder="选择城市"
    style={{ width: 200 }}
    options={allCity}
    onChange={changeHandle}
/>
```

> 1.  showSearch 默认为 false
> 2.  showExtra 默认为 true
> 3.  options、extraOptions: 格式如下
>
> ```
> [
>    {
>       value: 'zhejiang',
>       label: 'Zhejiang',
>       children: [{value: 'hangzhou',label: 'Hanzhou'}]
>     },
>     {
>       value: 'jiangsu',
>       label: 'Jiangsu',
>     }
>
> ];
> ```
>
> 4.  onChange 接受选中的值为参数

## 效果图

> ![效果图](/app\common\Cascader\cascader.png)
