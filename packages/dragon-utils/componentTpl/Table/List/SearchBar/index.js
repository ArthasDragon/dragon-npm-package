import React, { Component } from 'react'
import AllCity from '@common/AllCity'
import SearchBar from '@common/SearchBar'
import store from '../store'

const Item = SearchBar.Item

export default class extends Component {
    render() {
        return (
            <SearchBar
                store={store}
                noNeed={['keyword']}
            >
                <Item name="city" label="城市">
                    <AllCity />
                </Item>
                <Item name="keyword" enterSearch>
                    <Input
                        addonBefore={(
                            <Item
                                name="keyword_type"
                                initialValue="title"
                            >
                                <Select>
                                    <Option value="title">通知标题</Option>
                                    <Option value="id">通知ID</Option>
                                    <Option value="creator">创建人</Option>
                                </Select>
                            </Item>
                        )}
                    />
                </Item>
            </SearchBar >
        )
    }
}
