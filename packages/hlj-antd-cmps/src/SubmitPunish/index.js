import React, { Component } from 'react'
import { Modal, Row, Col, Input, Select } from 'antd'
import { isStr } from 'hlj-utils'
const Option = Select.Option
export default class extends Component {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    warn_message: [
      '1.小主，多次违反版规去小黑屋呆3天吧',
      '2.小主，多次违反版规去小黑屋反思7天吧',
      '3.小主，多次违反版规被关小黑屋一个月嘤',
      '4.小主，违规情节严重，被永远留在了小黑屋'
    ],
    visible: false
  }
  state = {
    message: '',
    _visible: false,
    warn_time: '3'
  }
  handleOk = () => {
    const { onOk } = this.props
    this.clear()
    onOk && onOk()
  }
  handleCancel = () => {
    this.clear()
    const { onCancel } = this.props
    onCancel && onCancel()
  }
  changeWarnTime = value => {
    const { onChangeTime } = this.props
    this.setState({ warn_time: value })
    onChangeTime && onChangeTime(value)
  }
  clear = () => {
    this.setState({
      message: '',
      _visible: false,
      warn_time: '3'
    })
  }
  setFengjinMessage = message => e => {
    message = isStr(message) ? message : (e && e.target && e.target.value) || ''
    this.setState({ message })
    const { onSetMessage } = this.props
    onSetMessage && onSetMessage(message)
  }
  render() {
    const { visible, warn_message } = this.props
    const { message, _visible, warn_time } = this.state
    return (
      <Modal
        onCancel={this.handleCancel}
        width={800}
        onOk={this.handleOk}
        visible={visible}
      >
        <Row>
          <Col span={5}>封禁时长：</Col>
          <Col span={19}>
            <Select
              value={warn_time + ''}
              style={{ width: 200 }}
              onChange={this.changeWarnTime}
            >
              <Option value="3">3天</Option>
              <Option value="7">7天</Option>
              <Option value="30">一个月</Option>
              <Option value="36500">永久</Option>
            </Select>
          </Col>
        </Row>
        <p style={{ padding: '15px 0' }}>封禁原因：</p>
        <Row>
          <Col
            span={14}
            style={{
              border: '1px #666 solid',
              padding: '50px 0',
              height: '200px'
            }}
          >
            <ul>
              {warn_message.map((msg, index) => {
                return (
                  <li
                    style={{ cursor: 'pointer' }}
                    key={index}
                    onClick={this.setFengjinMessage(msg)}
                  >
                    {msg}
                  </li>
                )
              })}
            </ul>
          </Col>
          <Col span={10} style={{ height: '200px' }}>
            <Input.TextArea
              onChange={this.setFengjinMessage()}
              value={message}
              placeholder="选择或输入封禁原因"
              style={{ height: '100%', border: '1px #666 solid' }}
            />
          </Col>
        </Row>
      </Modal>
    )
  }
}
