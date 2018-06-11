## Action
>action用来代替tab  
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