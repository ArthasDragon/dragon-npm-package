import React, { PureComponent } from 'react'
import { Breadcrumb } from 'antd'
import cls from 'classnames'
import styles from './style.css'

const Item = Breadcrumb.Item

export default class extends PureComponent {
  static defaultProps = {
    header: '',
    title: null,
    extra: null
  }

  render() {
    const {
      header,
      headerStyle,
      contentStyle,
      bodyStyle,
      children,
      title,
      extra
    } = this.props
    const _header = Array.isArray(header) ? (
      <Breadcrumb separator=">">
        {header.map((item, i) => <Item key={i}>{item}</Item>)}
      </Breadcrumb>
    ) : (
      header
    )
    return (
      <div
        className={styles.view}
        style={{ minHeight: document.body.clientHeight - 80 }}
      >
        {_header != '' && (
          <header style={headerStyle} className={styles.header}>
            {_header}
          </header>
        )}

        <div
          style={contentStyle}
          className={cls(styles.content, {
            [styles.no_header]: _header === ''
          })}
        >
          {title && (
            <div className={styles.content_header}>
              <div className={styles.header_left}>{title}</div>
              <div className={styles.header_right}>{extra}</div>
            </div>
          )}
          <div style={bodyStyle} className={styles.content_body}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}
