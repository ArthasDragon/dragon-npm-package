import React, { PureComponent } from "react";
import styles from "./style.css";
export default class extends PureComponent {
  static defaultProps = {
    recordList: [],
    fieldKeys: {
      time: "created_at",
      name: "admin_name",
      status: "call_result",
      content: "note"
    },
    maxHeight: 600
  };
  render() {
    const {
      recordList,
      maxHeight,
      style,
      fieldKeys: { time, name, status, content }
    } = this.props;
    return (
      <div style={{ maxHeight, ...style }} className={styles.container}>
        {recordList.length ? (
          recordList.map(item => (
            <div key={item.id} className={styles.record}>
              <p className={styles.header}>
                <span>{item[time]}</span>
                <span>{item[name]}</span>
                <span>
                  {{
                    1: "呼叫成功",
                    2: "无应答",
                    3: "通话中",
                    4: "关机",
                    5: "停机",
                    6: "空号",
                    7: "无法接通",
                    8: "个人回拨",
                    9: "拒访"
                  }[+item[status]] || "无应答"}{" "}
                  :
                </span>
              </p>
              <p className={styles.content}>{item[content]}</p>
            </div>
          ))
        ) : (
          <p className={styles.empty_record}>暂无记录</p>
        )}
      </div>
    );
  }
}
