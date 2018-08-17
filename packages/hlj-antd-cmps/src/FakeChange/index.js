/*
 更换马甲的通用组件,属性有
 visible:更换马甲的显示和隐藏,
 onCancel:点击取消之后的操作
 fakeList:马甲的数据，如果提供了该属性，则下面的url属性将失效
 url:希望获取马甲数据的url地址,
 默认是/p/admin/index.php/Shopadmin/APIFakeUserGroup/MyCommunityFakerListOther
 onUse:点击使用马甲之后的操作,参数是该马甲的信息,
 question_id:问题id，如果提供该属性，那返回的马甲就是未回答过该问题的马甲
 web:外部传入url为MyCommunityFakerList时，传入1，会返回组件所需要的数据结构
 */
import React, {PureComponent} from 'react'
import {Modal, Collapse, Button, Card} from 'antd'
import styles from './style.css'
import http from '@http'
const Panel = Collapse.Panel
export default class extends PureComponent {
    static defaultProps = {
        url:'/p/admin/index.php/Shopadmin/APIFakeUserGroup/MyCommunityFakerListOther',
    }
    state = {
        _fakeList: []
    }
    cancelHandler = ()=> {
        const {onCancel}=this.props
        onCancel && onCancel()
    }
    use = fake=>async()=> {
        //保存到后台
        await http.post('/p/admin/index.php/Shopadmin/APIFakeUserGroup/chooseFaker', {
            body: {id: fake.id}
        })
        const {onUse}=this.props
        if (onUse) {
            onUse(fake)
        }
    }
    getFakes = async(url, question_id,web)=> {
        if (question_id) {
            url += '?question_id=' + question_id
        }
        if (web){
            url += '?web=' + web
        }
        let {data=[]}=await http(url)
        this.setState({
            _fakeList: data && Array.isArray(data) ? data : []
        })
    }

    componentDidMount() {
        const {fakeList, url, question_id,web}=this.props
        if (!fakeList && url) {
            this.getFakes(url, question_id,web)
        }
    }

    render() {
        const {visible, fakeList}=this.props
        let width = 1000
        let title = '取消'
        let {_fakeList}=this.state
        let list = fakeList ? fakeList : _fakeList
        let userGroup = list.map((item, i)=> {
            return (
                <Panel header={item[0].group_name} key={i+''}>
                    {
                        item.map((user, i)=> {
                            user = user.fakers.user
                            let {avatar='', nick='', hometown_name='', weddingday=''}=user
                            return (
                                <Card key={i}
                                      bordered={false}
                                      bodyStyle={{ padding: 10 }}
                                      style={{width:120,display:'inline-block',marginRight:24}}>
                                    <div className={styles.user_img}>
                                        <img src={avatar+'?imageView2/1/w/100/h/100'}/>
                                    </div>
                                    <div className={styles.user_info}>
                                        <h5>{nick}</h5>
                                        <p>{weddingday + ' | ' + hometown_name}</p>
                                        <Button
                                            onClick={this.use(user)}
                                            size="small"
                                            type="primary">
                                            使用
                                        </Button>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </Panel>
            )
        })
        let content = (
            <Collapse
                defaultActiveKey={['0']}>
                {userGroup}
            </Collapse>
        )
        if (userGroup.length === 0) {
            content = '当前没有可用的马甲'
            width = 400
            title = '知道了'
        }
        return (
            <Modal
                title="请选择一个身份马甲"
                closable={false}
                footer={[
                    <Button key="cancel" type="primary" onClick={this.cancelHandler}>{title}</Button>
                  ]}
                width={width}
                onCancel={this.cancelHandler}
                visible={visible}>
                {content}
            </Modal>
        )
    }
}