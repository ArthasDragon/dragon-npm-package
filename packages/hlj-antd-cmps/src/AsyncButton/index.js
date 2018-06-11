import React, { Component } from 'react'
import { Button } from 'antd'
import { isPromise } from 'hlj-utils'

export default class extends Component {
  state = {
    loading: false
  }
  click = async e => {
    const { onClick } = this.props
    if (isPromise(onClick)) {
      this.setState({ loading: true })
      await onClick(e)
      this.setState({ loading: false })
    } else {
      onClick && onClick(e)
    }
  }
  render() {
    return (
      <Button
        loading={this.state.loading}
        {...this.props}
        onClick={this.click}
      />
    )
  }
}
