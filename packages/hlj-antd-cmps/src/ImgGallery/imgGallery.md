# ImgGallery

## 用法

> 多个图片或视频上传组件

```
    <ImgGallery
        style={{ marginLeft: '20px' }}
        keyField={`path`}
        max={3}
        imgList={toJS(img_list) || []}
        onRemove={store.removeImg}
        onOk={store.addImg}
        ...
    />
```

## 参数：（默认值）---（含义）

> 1.  style: {} \---整体 style
> 2.  imgList:[] \---图片列表
> 3.  onOk:undefined \---上传成功触发事件(link, info, file)
> 4.  onRemove:undefined \---删除触发事件(index, item)
> 5.  onCheck:undefined \---点击触发事件(checked, item, index)
> 6.  onCliped:undefined \---裁剪触发事件(info)
> 7.  multiple: false \---是否支持多选上传
> 8.  showRemove:true \---是否显示删除按钮
> 9.  showPreview: true \---是否显示预览按钮
> 10. keyField: 'url' \---图片地址字段
> 11. target: '\_self', \---点击图片预览方式
> 12. checkable: false,
> 13. clipabled: false,\---是否可在预览图中剪裁 target='\_self'才有效
> 14. sortabled: false,\---能否拖动排序
> 15. title: null,\---每个 item 的额外的信息
> 16. max: null \---最多上传几张

## 效果图

> ![效果图](/app\common\ImgGallery\imgGallery.png)
