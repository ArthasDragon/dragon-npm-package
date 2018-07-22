import { observable, action, toJS } from 'mobx'
import BaseTableStore from '@store/table'
import { message, Modal } from 'antd'

export default new class extends BaseTableStore {}()
