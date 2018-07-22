import React, { PureComponent, Children } from "react";
import { Button, Dropdown, Menu, Icon } from "antd";
import { getRes, isNoProp } from "../common.util";

const ButtonGroup = Button.Group;
const Item = () => null;

class HButtonGroup extends PureComponent {
  static defaultProps = {
    items: [],
    size: "default",
    overCount: 8,
    overTitle: "其他",
    activeType: "primary"
  };
  state = {
    _value: this.props.defaultValue
  };
  handle = (key, item) => () => {
    const { onChange } = this.props;
    const resValue = this.getResState();
    if (key !== resValue) {
      if (isNoProp(this, "value")) {
        this.setState({
          _value: key
        });
      }
      onChange && onChange(key, item);
    }
  };
  handleMenuClick = menu => {
    const { onChange, items } = this.props;
    const resValue = this.getResState();
    const activeMenu = items.find(item => item.value === menu.key);
    if (menu.key !== resValue) {
      if (isNoProp(this, "value")) {
        this.setState({
          _value: menu.key
        });
      }
      onChange && onChange(menu.key, activeMenu || {});
    }
  };
  getItems = () => {
    const { items, children } = this.props;
    const res = [].concat(items);
    Children.forEach(children, item => {
      if (item && item.type === Item) {
        const { children, ...rest } = item.props;
        res.push({ text: children, ...rest });
      }
    });
    return res;
  };
  getResState = () => {
    return getRes(this, "value");
  };

  render() {
    const { size, style, overCount, overTitle, activeType } = this.props;
    const resValue = this.getResState();
    const items = this.getItems();
    const _items = items.slice(0, overCount).map(item => {
      const { text, icon, disabled = false } = item;
      const _value = item.value;
      return (
        <Button
          icon={icon}
          onClick={this.handle(_value, item)}
          type={resValue === _value ? activeType : "default"}
          key={_value}
          disabled={disabled}
        >
          {text}
        </Button>
      );
    });
    let overItems;
    if (items.length > overCount) {
      const activeIndex = items.findIndex(item => item.value === resValue);
      const activeMenu = items[activeIndex] || {};
      const menu = (
        <Menu selectedKeys={[activeMenu.value]} onClick={this.handleMenuClick}>
          {items.slice(overCount).map(item => {
            const { text, icon, disabled = false } = item;
            const _value = item.value;
            return (
              <Menu.Item key={_value} disabled={disabled}>
                {icon && <Icon type={icon} />} {text}
              </Menu.Item>
            );
          })}
        </Menu>
      );
      overItems = (
        <Dropdown overlay={menu}>
          <Button
            icon="down"
            type={activeIndex >= overCount ? "primary" : "default"}
          >
            {activeIndex >= overCount ? activeMenu.text : overTitle}
          </Button>
        </Dropdown>
      );
    }
    return (
      <ButtonGroup size={size} style={style}>
        {_items}
        {overItems}
      </ButtonGroup>
    );
  }
}

HButtonGroup.Item = Item;
export default HButtonGroup;
