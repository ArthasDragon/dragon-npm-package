import React, { PureComponent } from 'react'
import styles from './style.css'
import { getObjValue, getFuncVal, isNum, sliceArr,isFunc } from '@util'
import cls from 'classnames'
export default class extends PureComponent {
  static defaultProps = {
    labelWidth: 100,
    labelAlign: 'center',
    data: {},
    rows: [],
    //一列最多显示多少行
    maxRow: 20,
    //是否带边框
    bordered: true
    // rowHeight:null,
  }
  getContent = (row, i, j) => {
    const { labelWidth, data, labelAlign } = this.props
    const _labelAlign =
      { center: 'center', right: 'flex-start', left: 'flex-end' }[labelAlign] ||
      'center'
    const { title, dataIndex, ...rest } = row
    const _dataIndex = dataIndex || ''
    const value = getObjValue(data, _dataIndex)
    const _val = _dataIndex.trim() ? value : data
    const _labelWidth = getFuncVal(labelWidth, row, i, j)
    return {
      label: (
        <td style={{ width: _labelWidth, justifyContent: _labelAlign }}>
          {getFuncVal(title, _val, data, j)}
        </td>
      ),
      value: <td>{isFunc(rest.render) ? rest.render(_val, data, j) : value}</td>
    }
  }
  render() {
    const {
      rows,
      style,
      titleStyle,
      title,
      footer,
      footerStyle,
      bordered,
      className,
      maxRow,
      rowHeight,
      data
    } = this.props
    const res = sliceArr(
      rows.filter(({ hidden }) => !getFuncVal(hidden, data)),
      maxRow
    )
    return (
      <div style={style} className={cls(styles.container, className)}>
        {title && (
          <header style={titleStyle} className={styles.header}>
            {title}
          </header>
        )}
        <div className={styles.content}>
          {res.map((item, i) => (
            <div className={styles.item} key={i}>
              <table
                className={styles[bordered ? 'table' : 'table_no_border']}
                width="100%"
              >
                <tbody>
                  {item.map((row, j) => {
                    const { dataIndex, className, style, key } = row
                    const { label, value } = this.getContent(row, i, j)
                    const trStyle = {}
                    if (isNum(rowHeight)) {
                      trStyle.height = rowHeight
                    }
                    return (
                      <tr
                        key={key || dataIndex || 'COLUMN_KEY' + j}
                        style={{ ...trStyle, ...style }}
                        className={className}
                      >
                        {label}
                        {value}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        {footer && (
          <footer style={footerStyle} className={styles.footer}>
            {footer}
          </footer>
        )}
      </div>
    )
  }
}
