import React, { Component } from 'react'
import { observer, Provider } from 'mobx-react'
import Store from './store'
import List from './List'
import SearchBar from './SearchBar'

@observer
export default class extends Component {
  constructor() {
    super()
    this.store = new Store()
  }
  render() {
    return (
      <Provider mainStore={this.store}>
        <div>
          <SearchBar />
          <List />
        </div>
      </Provider>
    )
  }
}
