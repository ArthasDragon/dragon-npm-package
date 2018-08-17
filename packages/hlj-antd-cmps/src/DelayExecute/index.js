import React, { Component } from 'react'
import { observer } from 'mobx-react'
import styles from './style.css'
import { Button } from 'antd'

export default store => Cmp =>
  @observer
  class extends Component {
    render() {
      const { text, delay_time, show_delay } = store
      return (
        <div className={styles.outer_box}>
          <Cmp {...this.props} />
          {show_delay && (
            <div className={styles.down_modal}>
              <div className={styles.left_text}>
                {text.replace('$time', delay_time + '')}
              </div>
              <Button onClick={store.end(false)} className={styles.button}>
                撤销操作
              </Button>
              <Button onClick={store.end(true)} className={styles.button}>
                立即生效
              </Button>
            </div>
          )}
        </div>
      )
    }
  }
