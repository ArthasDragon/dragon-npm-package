import React, { PureComponent } from 'react'
import { Modal, Button, message } from 'antd'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { getObjValue, removeSuffix, addSuffix } from 'hlj-utils'

export default class extends PureComponent {
  clipInfo = {}
  static defaultProps = {
    // img:'',
    slideWidth: 530,
    slideHeight: 320,
    keyField: 'url',
    index: 0, //ImgGallery中需要传递这个表明当前截图的是哪一个以便回调使用
    clipConfig: {
      x: 0,
      y: 0,
      width: 30
    }
  }
  onComplete = (data, url, index) => (crop, pixelCrop) => {
    const { width, height, x, y } = pixelCrop
    this.clipInfo = {
      data,
      index,
      url,
      crop,
      clipUrl:
        removeSuffix(url) + `?imageMogr2/crop/!${width}x${height}a${x}a${y}`,
      pixel: pixelCrop
    }
  }

  saveClip = () => {
    const { onCliped, onCancel } = this.props
    if (this.clipInfo) {
      if (onCliped) {
        onCliped(this.clipInfo)
      }
      if (onCancel) {
        onCancel()
      }
    } else {
      message.warning('还没有截图信息，请截图！')
    }
  }
  render() {
    const {
      img,
      slideWidth,
      slideHeight,
      keyField,
      aspect,
      visible,
      onCancel,
      clipConfig,
      index
    } = this.props
    const _aspect = typeof aspect === 'function' ? aspect(img, index) : aspect
    const _clipConfig =
      typeof clipConfig === 'function' ? clipConfig(img, index) : clipConfig
    let resConfig = { aspect: _aspect, ..._clipConfig }
    let _modalWidth = slideWidth + 200
    let slideStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f5f5f5',
      height: slideHeight
    }
    const url = getObjValue(img, keyField)
    const _url = addSuffix(url, 'imageView2/2', true)
    return (
      <Modal
        closable={false}
        maskClosable={false}
        width={_modalWidth}
        footer={[
          <Button key="c" type="dashed" onClick={onCancel}>
            取消
          </Button>,
          <Button key="s" type="primary" onClick={this.saveClip}>
            保存
          </Button>
        ]}
        visible={visible}
        onCancel={onCancel}
      >
        {
          <style
            dangerouslySetInnerHTML={{
              __html: `
                            .ReactCrop>img{
                                max-width:${slideWidth}px;
                                max-height:${slideHeight}px;
                            }
                        `
            }}
          />
        }
        <div style={slideStyle}>
          <ReactCrop
            keepSelection
            onComplete={this.onComplete(img, url, index)}
            src={_url}
            crop={resConfig}
          />
        </div>
      </Modal>
    )
  }
}
