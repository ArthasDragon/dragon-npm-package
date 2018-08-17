import React, {PureComponent} from 'react'
import {Modal} from 'antd'
import Carousel from '../Carousel'
import {addSuffix, getObjValue, toArr} from '@util'

export default class extends PureComponent {
  static defaultProps = {
    imgList: [],
    slideWidth: 530,
    slideHeight: 320,
    initialSlide: 0,
    keyField: 'url',
    autoSuffix: true,
    visible: false,
  }

  render() {
    const {
      imgList, slideWidth, slideHeight, keyField, suffix,
      initialSlide, visible, onCancel, autoSuffix, type
    } = this.props
    let _modalWidth = slideWidth + 200
    let list = toArr(imgList)
    let slideStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f5f5f5',
      height: slideHeight
    }
    let _suffix = `imageView2/2/w/${slideWidth}/h/${slideHeight}`
    if (suffix) {
      _suffix = suffix
    }
    return (
      <Modal
        width={_modalWidth}
        footer={null}
        visible={visible}
        onCancel={onCancel}
      >
        {
          list && list.length ? (
            <Carousel
              initialSlide={initialSlide}
              width={slideWidth}
            >
              {
                list.map((item, i) => {
                  const url = typeof item === 'string' ? item : getObjValue(item, keyField)
                  const _url = autoSuffix ? addSuffix(url, _suffix, true) : url
                  console.log(url)
                  return (
                    <div style={slideStyle} key={i}>
                      {type === 'video' ? 
                        <video src={url} controls="controls" style={{maxWidth: '100%', maxHeight: '100%'}}>
                        您的浏览器不支持 video 标签。
                        </video> :
                        <img src={_url} alt=""/>
                      }
                    </div>
                  )
                })
              }
            </Carousel>
          ) : null
        }
      </Modal>
    )
  }
}