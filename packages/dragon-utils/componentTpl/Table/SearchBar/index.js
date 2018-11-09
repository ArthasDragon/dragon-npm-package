import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { AllCity, SearchBar } from '@common'

const Item = SearchBar.Item

@observer
@inject('mainStore')
export default class extends Component {
  render() {
    const store = this.props.mainStore
    return (
      <SearchBar store={store}>
        <Item label="城市" name="city_code">
          <AllCity />
        </Item>
      </SearchBar>
    )
  }
}
