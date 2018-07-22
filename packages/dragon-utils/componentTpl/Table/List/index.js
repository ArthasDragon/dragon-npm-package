import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'
import Table from '@common/Table'
import columns from './columns'
import store from './store'

@observer
export default class extends Component {
  render() {
    return <Table columns={columns} store={store} />
  }
}
