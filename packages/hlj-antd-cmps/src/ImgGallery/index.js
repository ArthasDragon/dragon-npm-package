import React, {PureComponent} from 'react'
import {isObj, handleImgSuffix, getObjValue} from '@util'
import styles from './style.css'
import Upload from '../Upload'
import SlideModal from '../SlideModal'
import ClipModal from '../ClipModal'
import {Icon, message, Checkbox} from 'antd'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'
import {getRes, injectInit, isNoProp} from '../common.util'

const SortableItem = SortableElement(({children}) => children)
const SortableList = SortableContainer(({children}) => (
  <div className={styles.sort_container}>
    {children}
  </div>
))
export default class extends PureComponent {
  static isHljImgGallery = true
  static defaultProps = {
    // imgList: undefined,
    defaultImgList: [],
    showUpload: true,
    multiple: false,
    showRemove: true,
    showPreview: true,
    keyField: 'url',
    //设置target='_blank'时点击预览会跳转到新页面显示点击的图片且onPreview失效
    target: '_self',
    checkable: false,
    clipabled: false,//是否可在预览图中剪裁target='_self'才有效
    sortabled: false,//能否拖动排序
    title: null,//每个item的额外的信息
    max: null,//最多上传几张
  }
  state = {
    prew: false,
    initialSlide: 0,
    _imgList: this.props.defaultImgList
  }
  preview = (initialSlide, item) => () => {
    if (this.props.onPreview) {
      this.props.onPreview(item, initialSlide)
    } else {
      this.setState({prew: !this.state.prew, initialSlide})
    }
  }
  deleteItem = (index, item) => () => {
    if (isNoProp(this, 'imgList')) {
      this.setState({
        _imgList: this.state._imgList.filter((item, i) => i !== index)
      })
    }
    this.props.onRemove && this.props.onRemove(index, item)
  }
  uploadOk = (file, link, info) => {
    const {onOk, checkable, keyField} = this.props
    if (isNoProp(this, 'imgList')) {
      this.setState({
        _imgList: this.state._imgList.concat([checkable ? {
          [keyField]: link
        } : link])
      })
    }
    onOk && onOk(link, info, file)
  }
  beforeUp = (files, up, progressHandler) => {
    const {max} = this.props
    const resList = this.getResState()
    const nowListLen = resList.length
    let flag = false
    files.forEach((file, i) => {
      if (max && (nowListLen + i) > max - 1) {
        flag = true
        up.removeFile(file.id)
        progressHandler(false)
      }
    })
    if (flag) {
      message.warning(`最多上传${max}张图片`)
    }
  }
  doCheck = (item, index) => e => {
    if (isNoProp(this, 'imgList')) {
      this.setState({
        _imgList: this.state._imgList.map((s, i) => {
          if (i === index && isObj(s)) {
            s.checked = e.target.checked
          }
          return s
        })
      })
    }
    this.props.onCheck && this.props.onCheck(e.target.checked, item, index)
  }

  sortEnd = ({oldIndex, newIndex}) => {
    if (isNoProp(this, 'imgList')) {
      this.setState({
        _imgList: arrayMove(this.state._imgList, oldIndex, newIndex)
      })
    }
    this.props.onSort && this.props.onSort(arrayMove(this.props.imgList, oldIndex, newIndex))
  }
  cliped = (info) => {
    if (this.noImgListProp()) {
      const f = this.props.keyField
      this.setState({
        _imgList: this.state._imgList.map((item, i) => {
          if (i === info.index) {
            return isObj(item) ? {
              ...item,
              [f]: info.clipUrl
            } : info.clipUrl
          }
          return item
        })
      })
    }
    this.props.onCliped && this.props.onCliped(info)
  }

  componentDidMount() {
    injectInit(this)
  }

  getResState = () => {
    return getRes(this, 'imgList') || []
  }

  render() {
    const {
      style, showUpload, multiple, checkable, preSuffix, showPreview, autoSuffix,
      showRemove, keyField, target, sortabled, clipabled, clipConfig, aspect, title
    } = this.props
    const {initialSlide, prew} = this.state
    const resImgList = this.getResState()
    return (
      <div className={styles.container} style={style}>
        <SortableList
          onSortEnd={this.sortEnd}
          axis="xy"
          hideSortableGhost={false}
        >
          {
            resImgList.map((item, index) => {
              let url
              let checked = false
              if (typeof item === 'string') {
                url = item
              } else {
                item = item || {}
                url = getObjValue(item, keyField)
                checked = item.checked
              }
              url = url || ''
              const src = url.indexOf('imageMogr2/crop') === -1 ?
                handleImgSuffix(url, 'imageView2/1/w/100/h/100') : url
              const _title = typeof title === 'function' ? title(item, index) : title
              return (
                <SortableItem
                  disabled={!sortabled}
                  key={index}
                  index={index}
                >
                  <div className={styles.item}>
                    {
                      checkable && (
                        <span
                          className={styles.select}
                        >
                          <Checkbox
                            checked={checked}
                            onChange={this.doCheck(item, index)}
                          />
                      </span>
                      )
                    }
                    <div className={styles.action}>
                      {
                        showPreview && (
                          <span
                            onClick={target === '_blank' ? undefined : this.preview(index, item)}
                          >
                            {
                              target === '_blank' ? (
                                <a
                                  style={{color: '#fff'}}
                                  rel="noreferrer"
                                  target="_blank"
                                  href={url}
                                >
                                  <Icon type="eye-o"/>
                                </a>
                              ) : <Icon type="eye-o"/>
                            }
                        </span>
                        )
                      }
                      {
                        showRemove && (
                          <span onClick={this.deleteItem(index, item)}
                          >
                              <Icon type="delete"/>
                          </span>
                        )
                      }
                    </div>
                    <img src={src} alt="img"/>
                    {
                      _title !== undefined && _title !== null && (
                        <div className={styles.title}>
                          {_title}
                        </div>
                      )
                    }
                  </div>
                </SortableItem>
              )
            })
          }
          <div className={styles.item} style={{display: showUpload ? 'block' : 'none'}}>
            <Upload
              multiple={multiple}
              onAdded={this.beforeUp}
              onOk={this.uploadOk}
              link=''
              width="100%"
              height="100%"/>
          </div>
        </SortableList>
        {
          prew && !clipabled && (
            <SlideModal
              aspect={aspect}
              autoSuffix={autoSuffix}
              suffix={preSuffix}
              visible={prew}
              keyField={keyField}
              imgList={resImgList}
              initialSlide={initialSlide}
              onCancel={this.preview(0)}
            />
          )
        }
        {
          prew && clipabled && (
            <ClipModal
              aspect={aspect}
              clipConfig={clipConfig}
              onCliped={this.cliped}
              visible={prew}
              keyField={keyField}
              img={resImgList[initialSlide]}
              index={initialSlide}
              onCancel={this.preview(0)}
            />
          )
        }
      </div>
    )
  }
}