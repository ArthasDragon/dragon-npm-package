import React, { Component } from 'react'
import Menu from './Menu'
import style from './style'

export default class extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      location: { pathname }
    } = this.props
    return nextProps.location.pathname !== pathname
  }

  render() {
    const {
      location: { pathname },
      children
    } = this.props

    return (
      <div className={style.content}>
        <div className={style.content_menu}>
          <Menu pathname={pathname} />
        </div>

        <div className={style.content_main}>{children}</div>
      </div>
    )
  }
}
