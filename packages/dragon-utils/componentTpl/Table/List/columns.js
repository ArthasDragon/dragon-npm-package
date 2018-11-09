import React from 'react'
import { Operation } from '@common'

const Item = Operation.Item

export default [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '商圈名称',
    dataIndex: 'circle_name'
  },
  {
    title: '所在地',
    dataIndex: 'address'
  },
  {
    title: '婚纱摄影商家',
    dataIndex: 'shoot_merchant'
  },
  {
    title: '婚纱礼服商家',
    dataIndex: 'dress_merchant'
  },
  {
    title: '婚礼策划商家',
    dataIndex: 'scheme_merchant'
  },
  {
    title: '操作',
    dataIndex: '',
    render: () => (
      <Operation>
        <Item>下架</Item>
        <Item>编辑</Item>
        <Item>查看商家</Item>
        <Item>新增商家</Item>
      </Operation>
    )
  }
]
