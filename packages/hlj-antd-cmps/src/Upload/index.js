import React, { PureComponent } from 'react'
import { Progress, Icon, message } from 'antd'
import styles from './style.css'
import upload from './config'
import cls from 'classnames'
import SlideModal from '../SlideModal'
import ClipModal from '../ClipModal'
import * as util from '@util'
import { getRes, isNoProp } from '../common.util'

export default class extends PureComponent {
  uploader
  fileId
  file
  upbut = 'upbut_' + Math.random().toFixed(8)
  upbox = 'upbox_' + Math.random().toFixed(8)
  static isHljUpload = true
  static defaultProps = {
    multiple: false,
    width: 320,
    height: 180,
    // link: '',
    showDelete: true,
    disabled: false,
    //设置target='_blank'时点击预览会跳转到新页面显示点击的图片且onPreview失效
    target: '_self',
    autoSuffix: true,
    uptoken_url: 'image_upload_token'
  }
  state = {
    //上传进度是否显示
    progress: 'none',
    //上传进度
    percent: 0,
    opacity: 1,
    isActive: false,
    previewModal: false,
    _link: this.props.defaultLink
  }
  //上传进度条的显示和隐藏
  progressHandler = (isShow = false) => {
    this.setState({
      percent: 0,
      progress: isShow ? 'block' : 'none',
      opacity: this.state.opacity === 0 ? 1 : 0
    })
  }
  //取消上传
  cancelUpload = () => {
    if (this.fileId) {
      this.uploader.removeFile(this.fileId)
    }
    this.progressHandler(false)
  }
  //移除文件
  deleteFile = () => {
    const { onDelete, link } = this.props
    if (isNoProp(this, 'link')) {
      this.setState({
        _link: ''
      })
    }
    onDelete && onDelete(this.file, link)
  }
  preview = () => {
    if (this.props.onPreview) {
      this.props.onPreview(this.props.link)
    } else {
      this.setState({
        previewModal: !this.state.previewModal
      })
    }
  }
  hover = type => () => {
    const { children, disabled } = this.props
    const { isActive, percent } = this.state
    if (!children && !disabled) {
      if (type === 'out' && isActive) {
        this.setState({
          isActive: false
        })
      } else if (this.getResState() && !percent) {
        this.setState({
          isActive: true
        })
      }
    }
  }
  cliped = info => {
    if (isNoProp(this, 'link')) {
      this.setState({
        _link: info.clipUrl
      })
    }
    this.props.onCliped && this.props.onCliped(info)
  }

  componentDidMount() {
    const { onOk, onAdded, multiple, onBeforeUp, onError, uptoken_url, type, ...rest } = this.props
    this.uploader = upload({
      uptoken_url: '/p/wedding/home/APIUtils/' + uptoken_url,
      browse_button: this.upbut,
      container: this.upbox,
      multi_selection: multiple,
      drop_element: this.upbut,
      // domain: type === 'video' ? 'http://qnvideo.hunliji.com/' : 'http://qnm.hunliji.com/',
      filesAdded: (up, files) => {
        onAdded && onAdded(files, up, this.progressHandler)
      },
      //上传前
      beforeUpload: (up, file) => {
        this.file = null
        this.fileId = file.id
        this.progressHandler(true)
        onBeforeUp && onBeforeUp(file, up, this.progressHandler)
      },
      //上传中
      uploadProgress: (file, percent) => {
        this.setState({
          percent
        })
      },
      //上传后
      fileUploaded: (file, link, info, up) => {
        this.file = file
        this.progressHandler(false)
        if (isNoProp(this, 'link')) {
          this.setState({
            _link: link
          })
        }
        onOk && onOk(file, link, info, up)
      },
      //上传失败
      onError: (up, err, errTip) => {
        this.fileId && up.removeFile(this.fileId)
        this.progressHandler(false)
        if (onError) {
          return onError(up, err, errTip)
        }
        message.error('上传失败:' + errTip)
      },
      ...rest
    })
  }

  getResState = () => {
    return getRes(this, 'link')
  }

  render() {
    let { progress, percent, opacity, isActive, previewModal } = this.state
    const {
      width,
      height,
      style,
      showDelete,
      children,
      clipConfig,
      autoSuffix,
      disabled,
      target,
      description,
      clipabled,
      preSuffix,
      aspect,
      type,
    } = this.props
    let resLink = this.getResState()
    if (util.isObj(resLink)) {
      const { domain, image_path, video_path } = resLink
      resLink = domain + (type === 'video' ? video_path : image_path)
    }
    let warpStyle = {
      width: children ? 'auto' : width,
      height: children ? 'auto' : height,
      display: 'inline-block',
      padding: '0 15px 0 15px'
    }
    return (
      <div
        onMouseOver={this.hover('over')}
        onMouseOut={this.hover('out')}
        id={this.upbox}
        className={styles.upbox}
        style={{ ...warpStyle, ...style }}
      >
        <div id={this.upbut} className={styles.upbut}>
          {children ? (
            <div className={styles.up_text}>{children}</div>
          ) : !resLink ? (
            <span className={styles.upload_mark}>+</span>
          ) : type === 'video' ? (
            <video src={resLink} controls="controls">
            您的浏览器不支持 video 标签。
            </video>
          ) : (
            <img
              style={{ maxHeight: height, maxWidth: width, opacity: opacity }}
              className={styles.upimg}
              src={resLink}
            />
          )}
        </div>
        {disabled && <div className={styles.disabled} />}
        <div className={styles.progress} style={{ display: progress }}>
          <Progress showInfo={false} strokeWidth={5} percent={percent} />
        </div>
        <i
          onClick={this.cancelUpload}
          style={{ display: progress }}
          className={'anticon anticon-cross ' + styles.closeBtn}
        />
        {!children && (
          <span
            className={cls({
              [styles.delete]: true,
              [styles.active]: isActive
            })}
          >
            <span onClick={target === '_blank' ? undefined : this.preview}>
              {target === '_blank' ? (
                <a
                  style={{ color: '#fff' }}
                  rel="noreferrer"
                  target="_blank"
                  href={resLink}
                >
                  <Icon type="eye-o" />
                </a>
              ) : (
                <Icon type="eye-o" />
              )}
            </span>
            {showDelete && (
              <span onClick={this.deleteFile}>
                <Icon type="delete" />
              </span>
            )}
          </span>
        )}
        {!children &&
          description && (
            <div className={styles.description}>{description}</div>
          )}
        {previewModal &&
          !clipabled && (
            <SlideModal
              autoSuffix={autoSuffix}
              suffix={preSuffix}
              visible={previewModal}
              imgList={[resLink]}
              type={type}
              onCancel={this.preview}
            />
          )}
        {previewModal &&
          clipabled && (
            <ClipModal
              aspect={aspect}
              clipConfig={clipConfig}
              onCliped={this.cliped}
              visible={previewModal}
              img={resLink}
              type={type}
              onCancel={this.preview}
            />
          )}
      </div>
    )
  }
}
