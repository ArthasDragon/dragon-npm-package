import React, { Component } from "react";
import { Modal, Menu } from "antd";
import { Link } from "react-router";
import { observer } from "mobx-react";
import store from "../store";
import style from "./style";

const SubMenu = Menu.SubMenu;

@observer
export default class extends Component {
  state = {
    visible: false
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
    store.logoutAction();
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  showWin = () => {
    this.setState({
      visible: true
    });
  };

  render() {
    const { merchantInfo } = store;
    const { logo_path } = merchantInfo;

    return (
      <div className={style.headBox}>
        <a className={style.headBox_logo}>
          <div className={style.logo} />
        </a>

        <div className={style.headBox_right}>
          <Menu mode="horizontal">
            <Menu.Item key="hlj">
              <Link href="https://www.hunliji.com/" target="_blank">
                婚礼纪
              </Link>
            </Menu.Item>

            <SubMenu title="下载">
              <Menu.Item key="download">
                <div className={style.qrCode}>
                  <img src="http://qnm.hunliji.com/o_1b39vqmlr1a79dha10aebgatu57.jpg" />
                  <p>扫一扫下载商家端APP</p>
                </div>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              title={
                <div>
                  <img
                    className={style.userHead}
                    src={
                      logo_path.indexOf("imageMogr2") > -1
                        ? logo_path
                        : logo_path + "?imageView2/1/w/32/h/32"
                    }
                    style={{ borderRadius: "50%", width: 32 }}
                  />
                  <i />
                </div>
              }
            >
              <Menu.Item key="logout">
                <span onClick={this.showWin}>退出</span>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>

        <Modal
          visible={this.state.visible}
          okText="确定"
          cancelText="取消"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p style={{ fontSize: 18, textAlign: "center", lineHeight: "68px" }}>
            确定退出？
          </p>
        </Modal>
      </div>
    );
  }
}
