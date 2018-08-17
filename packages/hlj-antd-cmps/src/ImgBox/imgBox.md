# ImgBox

## 用法

> 图片列表展示组件 可在轮播图中预览

```
    <ImgBox imgs={config.images || []} keyField={'path'} />
```

## 参数：（默认值）---（含义）

> 1.  imgs: [] \---图片列表[{url:'...png'}]
> 2.  imgW: 120 \---图片宽
> 3.  imgH:120 \---图片高
> 4.  keyField: 'url' \---列表中图片地址字段
> 5.  autoSuffix: true \---是否自动加七牛后缀
> 6.  target: 'self', \---点击图片预览方式

## 效果图

> ![效果图](/app\common\ImgBox\imgBox.png)
