import React, { Component } from 'react'
import { Table } from '@common'
import columns from './columns'
import { inject, observer } from 'mobx-react'

@observer
@inject('mainStore')
export default class extends Component {
  render() {
    const store = this.props.mainStore
    return <Table store={store} columns={columns} />
  }
}
