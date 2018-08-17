# Exhibition

## 用法

```
<FakeChange
    url="/p/admin/index.php/Shopadmin/APIFakeUserGroup/MyCommunityFakerListOther"
    visible={visible}
    onCancel={this.showFakeModal}
    onUse={this.changeFake}
/>
```

## 参数：（默认值）---（含义）

> 1.  url:'/p/admin/index.php/Shopadmin/APIFakeUserGroup/MyCommunityFakerListOther' \---希望获取马甲数据的 url 地址
> 2.  visible:undefined \---更换马甲的显示和隐藏
> 3.  onCancel:undefined \---点击取消之后的操作
> 4.  onUse:undefined \---点击使用马甲之后的操作,参数是该马甲的信息
> 5.  fakeList:[] \---马甲的数据，如果提供了该属性，则 url 属性将失效
> 6.  question_id:'' \---问题 id，如果提供该属性，那返回的马甲就是未回答过该问题的马甲
> 7.  web:'' \---外部传入 url 为 MyCommunityFakerList 时，传入 1，会返回组件所需要的数据结构

## 效果图

> ![效果图](/app\common\FakeChange\fakeChange.png)
