import React, { Component, Children } from "react";
import styles from "./style.css";
import { Carousel, Icon } from "antd";
import { omit } from "hlj-utils";

class Arrow extends Component {
  render() {
    const { type, ...rest } = this.props;
    const arrowStyle = {
      width: 40,
      height: "100%",
      zIndex: 1,
      transform: "translateY(-50%)",
      marginTop: 0
    };
    return (
      <div
        {...omit(rest, ["currentSlide", "slideCount", "onSlided"])}
        style={arrowStyle}
      >
        <p className={`${styles.arrow} ${styles[type]}`}>
          <Icon type={type} />
        </p>
      </div>
    );
  }
}

export default class extends Component {
  static defaultProps = {
    arrows: true,
    initialSlide: 0
  };

  render() {
    const { children, arrows, width, onSlided, ...settings } = this.props;
    const count = Children.count(children);
    return (
      <div className={styles.container} style={{ width }}>
        {count ? (
          <Carousel
            ref="slider"
            dots
            infinite
            afterChange={onSlided}
            arrows={count === 1 ? false : arrows}
            nextArrow={<Arrow type="right" />}
            prevArrow={<Arrow type="left" />}
            effect={Children.count(children) === 1 ? "fade" : "scrollx"}
            {...settings}
          >
            {children}
          </Carousel>
        ) : null}
      </div>
    );
  }
}
