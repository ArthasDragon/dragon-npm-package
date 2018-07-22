import React, { Component } from 'react'
import { Menu } from 'antd'
import config from './config'
import { Link } from 'react-router'
import Consult from './Consult'

const SubMenu = Menu.SubMenu
const Item = Menu.Item

export default class extends Component {
  constructor(props) {
    super(props)

    const active = this.props.pathname.split('/')[2]
    this.openKeys = []
    this.menu = this.getMenu(config, active)

    this.state = {
      openKeys: active ? this.openKeys : []
    }
  }

  getMenu = (config, active) => {
    const menu = config.map(
      ({ key = '', id, title, icon, link, parentKey = '', sub }) => {
        if (key === active) {
          this.openKeys = [parentKey]
        }
        if (sub) {
          return (
            <SubMenu
              key={key}
              title={
                <span>
                  {icon && <i className={`iconfont ${icon}`} />}
                  {title}
                </span>
              }
            >
              {this.getMenu(sub, active)}
            </SubMenu>
          )
        } else {
          return (
            <Item key={key}>
              <Link to={link}>{title}</Link>
            </Item>
          )
        }
      }
    )

    return menu
  }

  openChange = openKeys => {
    const length = openKeys.length
    this.setState({
      openKeys: length > 1 ? [openKeys[length - 1]] : openKeys
    })
  }

  handleClick = obj => {
    // todo, when click a menu item with no sub , set openKeys to empty array
    if (obj.key == 'home') {
      this.setState({
        openKeys: []
      })
    }
  }

  render() {
    const active = this.props.pathname.split('/')[2]

    return (
      <div>
        {this.menu && (
          <Menu
            onClick={this.handleClick}
            openKeys={this.state.openKeys}
            selectedKeys={[active]}
            onOpenChange={this.openChange}
            mode="inline"
          >
            <Item key="home">
              <i className="iconfont icon-home" />
              <Link style={{ display: 'inline' }} to="/localMerchant">
                首页
              </Link>
            </Item>
            {this.menu}
          </Menu>
        )}

        <Consult />
      </div>
    )
  }
}
