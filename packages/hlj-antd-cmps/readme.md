## Action

> action 用来代替 tab

```
   <Action
       onChange={store.changeTab}
       active={activeTab}
       style={{marginBottom:20}}
       options={[
           {value:'0',title:'待审核'},
           {value:'1',title:'已审核'},
       ]}
       defaultActive='0'
   />
```

## SubmitPunish

> 封禁的公共弹窗组件

```
  <SubmitPunish
    visible={store.showFengjinModal}
    onChangeTime={store.setFengjinTime}
    onSetMessage={store.setFengjinMessage}
    onCancel={store.onCancel}
    onOk={store.feng}
/>
```
