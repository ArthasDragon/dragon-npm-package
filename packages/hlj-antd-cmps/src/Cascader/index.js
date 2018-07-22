import React, { PureComponent, Fragment } from "react";
import { Cascader, Button, Popover, Tag } from "antd";
import styles from "./style.css";

export default class extends PureComponent {
  static defaultProps = {
    extraText: "热门城市",
    placement: "bottomRight",
    overlayStyle: { width: 250 },
    selectedColor: "#108ee9",
    showExtra: true,
    extraOptions: []
  };
  selectCity = (newValue, label) => () => {
    const { onChange, value = [] } = this.props;
    let flag = true;
    if (onChange) {
      if (newValue.length === value.length) {
        flag = newValue[0] !== value[0] || newValue[1] !== value[1];
      }
      flag && onChange(newValue, label);
    }
  };

  render() {
    const {
      extraOptions,
      extraText,
      showExtra,
      placement,
      overlayStyle,
      value,
      selectedColor,
      ...rest
    } = this.props;
    let extraContent = [];
    if (showExtra) {
      extraContent = extraOptions.map(item => {
        let _value = Array.isArray(value) ? value : [];
        let flag =
          _value.length === 2
            ? item.value[1] === _value[1]
            : item.value[0] === _value[0];
        return (
          <span
            key={item.key}
            onClick={this.selectCity(item.value, item.label)}
            style={{
              margin: "2px 2px 4px 2px",
              display: "inline-block"
            }}
          >
            <Tag color={flag ? selectedColor : ""}>{item.label}</Tag>
          </span>
        );
      });
    }
    const width = (rest.style || {}).width || 200;
    return (
      <Fragment>
        <Cascader
          value={value}
          style={{ width }}
          className={showExtra ? styles.cascader : undefined}
          {...rest}
        />
        {showExtra && (
          <span className={styles.popover}>
            <Popover
              overlayStyle={overlayStyle}
              placement={placement}
              content={extraContent}
              trigger="click"
            >
              <Button size={rest.size || "default"}>{extraText}</Button>
            </Popover>
          </span>
        )}
      </Fragment>
    );
  }
}
