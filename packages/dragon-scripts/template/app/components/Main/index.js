import React, { Component } from "react";
import Header from "./Header";
import style from "./style";

export default class extends Component {
  render() {
    const { pathname } = this.props.location;

    return (
      <div className={style.container_main}>
        <Header pathname={pathname} />
        {this.props.children}
      </div>
    );
  }
}
