import React, { PureComponent, Children } from "react";
import styles from "./style.css";
import cls from "classnames";
import { Icon } from "antd";
import { getRes, isNoProp } from "../common.util";

const Item = () => null;

class Action extends PureComponent {
	static defaultProps = {
		bordered: true,
		options: []
	};
	state = {
		_active: this.props.defaultActive
	};
	change = item => () => {
		const { onChange } = this.props;
		const resActive = getRes(this, "active");
		if (!item.disabled && resActive !== item.value) {
			if (isNoProp(this, "active")) {
				this.setState({
					_active: item.value
				});
			}
			onChange && onChange(item.value, item);
		}
	};
	getOptions = () => {
		const { options, children } = this.props;
		const res = [].concat(options);
		Children.forEach(children, item => {
			if (item && item.type === Item) {
				const { children, ...rest } = item.props;
				res.push({ title: children, ...rest });
			}
		});
		return res;
	};

	render() {
		const { style, extra, bordered } = this.props;
		const resActive = getRes(this, "active");
		const options = this.getOptions();
		return (
			<div
				className={styles.container}
				style={{ ...style, borderBottom: bordered ? "1px solid #d9d9d9" : 0 }}
			>
				{options.map(item => {
					const { value, title, icon, disabled } = item || {};
					return (
						<div
							key={value}
							onClick={this.change(item)}
							className={cls(
								styles.item,
								{ [styles.disabled]: disabled },
								{ [styles.active_item]: value === resActive }
							)}
						>
							<span>
								{icon && <Icon style={{ marginRight: 4 }} type={icon} />}
								{title}
							</span>
						</div>
					);
				})}
				{extra && <div className={styles.extra}>{extra}</div>}
			</div>
		);
	}
}

Action.Item = Item;
export default Action;
