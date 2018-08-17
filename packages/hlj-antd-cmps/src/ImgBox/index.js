import React, { PureComponent } from "react";
import {
  addSuffix,
  isEmptyArr,
  getObjValue,
  toArr,
  getFuncVal,
  isStr
} from "@util";
import styles from "./style.css";
import SlideModal from "../SlideModal";

export default class extends PureComponent {
  state = {
    prew: false,
    initialSlide: 0
  };
  static defaultProps = {
    imgs: [],
    imgW: 120,
    imgH: 120,
    keyField: "url",
    autoSuffix: true,
    target: "_self", //_blank
    title: null, //每个iteem的标题或者描述信息
    imgFilter: () => true
  };
  itemClick = (item, i, imgs) => () => {
    const { onPreview, keyField, target } = this.props;
    if (onPreview) {
      onPreview(item, i, imgs);
    } else {
      target === "_blank"
        ? window.open(getObjValue(item, keyField))
        : this.setState({ prew: true, initialSlide: i });
    }
  };
  closePrew = () => {
    this.setState({ prew: false, initialSlide: 0 });
  };

  render() {
    const { prew, initialSlide } = this.state;
    const {
      imgs,
      imgW,
      imgH,
      preSuffix,
      keyField,
      style,
      title,
      imgFilter,
      preWidth,
      preHeight,
      autoSuffix
    } = this.props;
    const _suffix = `imageView2/2/w/${imgW}/h/${imgH}`;
    const imgList = toArr(imgs);
    let imgArr = [];
    imgList.forEach((item, i) => {
      const src = isStr(item) ? item : getObjValue(item, keyField);
      const _title = getFuncVal(title, item, i);
      if (src && imgFilter(item)) {
        const style = {
          height: imgH,
          width: imgW,
          backgroundImage: `url(${
            autoSuffix ? addSuffix(src, _suffix, true) : src
          })`
        };
        imgArr.push(
          <li
            key={i}
            className={styles.item}
            style={style}
            onClick={this.itemClick(item, i, imgs)}
          >
            {_title}
          </li>
        );
      }
    });
    return !isEmptyArr(imgArr) ? (
      <ul className={styles.container} style={style}>
        {imgArr}
        {prew && (
          <SlideModal
            autoSuffix={autoSuffix}
            suffix={preSuffix}
            slideWidth={preWidth}
            slideHeight={preHeight}
            visible={prew}
            keyField={keyField}
            imgList={imgs}
            initialSlide={initialSlide}
            onCancel={this.closePrew}
          />
        )}
      </ul>
    ) : null;
  }
}
