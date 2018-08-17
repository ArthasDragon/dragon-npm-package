var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 更换马甲的通用组件,属性有
 visible:更换马甲的显示和隐藏,
 onCancel:点击取消之后的操作
 fakeList:马甲的数据，如果提供了该属性，则下面的url属性将失效
 url:希望获取马甲数据的url地址,
 默认是/p/admin/index.php/Shopadmin/APIFakeUserGroup/MyCommunityFakerListOther
 onUse:点击使用马甲之后的操作,参数是该马甲的信息,
 question_id:问题id，如果提供该属性，那返回的马甲就是未回答过该问题的马甲
 web:外部传入url为MyCommunityFakerList时，传入1，会返回组件所需要的数据结构
 */
import React, { PureComponent } from 'react';
import { Modal, Collapse, Button, Card } from 'antd';
import "./style.css"
const styles = {"user_img":"_user_img_1wlcm_1","user_info":"_user_info_1wlcm_11"};
import http from '@http';
var Panel = Collapse.Panel;

var _default = (_temp2 = _class = function (_PureComponent) {
    _inherits(_default, _PureComponent);

    function _default() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, _default);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            _fakeList: []
        }, _this.cancelHandler = function () {
            var onCancel = _this.props.onCancel;

            onCancel && onCancel();
        }, _this.use = function (fake) {
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var onUse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return http.post('/p/admin/index.php/Shopadmin/APIFakeUserGroup/chooseFaker', {
                                    body: { id: fake.id }
                                });

                            case 2:
                                onUse = _this.props.onUse;

                                if (onUse) {
                                    onUse(fake);
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2);
            }));
        }, _this.getFakes = function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url, question_id, web) {
                var _ref4, _ref4$data, data;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (question_id) {
                                    url += '?question_id=' + question_id;
                                }
                                if (web) {
                                    url += '?web=' + web;
                                }
                                _context2.next = 4;
                                return http(url);

                            case 4:
                                _ref4 = _context2.sent;
                                _ref4$data = _ref4.data;
                                data = _ref4$data === undefined ? [] : _ref4$data;

                                _this.setState({
                                    _fakeList: data && Array.isArray(data) ? data : []
                                });

                            case 8:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2);
            }));

            return function (_x, _x2, _x3) {
                return _ref3.apply(this, arguments);
            };
        }(), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_default, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                fakeList = _props.fakeList,
                url = _props.url,
                question_id = _props.question_id,
                web = _props.web;

            if (!fakeList && url) {
                this.getFakes(url, question_id, web);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props2 = this.props,
                visible = _props2.visible,
                fakeList = _props2.fakeList;

            var width = 1000;
            var title = '取消';
            var _fakeList = this.state._fakeList;

            var list = fakeList ? fakeList : _fakeList;
            var userGroup = list.map(function (item, i) {
                return React.createElement(
                    Panel,
                    { header: item[0].group_name, key: i + '' },
                    item.map(function (user, i) {
                        user = user.fakers.user;
                        var _user = user,
                            _user$avatar = _user.avatar,
                            avatar = _user$avatar === undefined ? '' : _user$avatar,
                            _user$nick = _user.nick,
                            nick = _user$nick === undefined ? '' : _user$nick,
                            _user$hometown_name = _user.hometown_name,
                            hometown_name = _user$hometown_name === undefined ? '' : _user$hometown_name,
                            _user$weddingday = _user.weddingday,
                            weddingday = _user$weddingday === undefined ? '' : _user$weddingday;

                        return React.createElement(
                            Card,
                            { key: i,
                                bordered: false,
                                bodyStyle: { padding: 10 },
                                style: { width: 120, display: 'inline-block', marginRight: 24 } },
                            React.createElement(
                                'div',
                                { className: styles.user_img },
                                React.createElement('img', { src: avatar + '?imageView2/1/w/100/h/100' })
                            ),
                            React.createElement(
                                'div',
                                { className: styles.user_info },
                                React.createElement(
                                    'h5',
                                    null,
                                    nick
                                ),
                                React.createElement(
                                    'p',
                                    null,
                                    weddingday + ' | ' + hometown_name
                                ),
                                React.createElement(
                                    Button,
                                    {
                                        onClick: _this3.use(user),
                                        size: 'small',
                                        type: 'primary' },
                                    '\u4F7F\u7528'
                                )
                            )
                        );
                    })
                );
            });
            var content = React.createElement(
                Collapse,
                {
                    defaultActiveKey: ['0'] },
                userGroup
            );
            if (userGroup.length === 0) {
                content = '当前没有可用的马甲';
                width = 400;
                title = '知道了';
            }
            return React.createElement(
                Modal,
                {
                    title: '\u8BF7\u9009\u62E9\u4E00\u4E2A\u8EAB\u4EFD\u9A6C\u7532',
                    closable: false,
                    footer: [React.createElement(
                        Button,
                        { key: 'cancel', type: 'primary', onClick: this.cancelHandler },
                        title
                    )],
                    width: width,
                    onCancel: this.cancelHandler,
                    visible: visible },
                content
            );
        }
    }]);

    return _default;
}(PureComponent), _class.defaultProps = {
    url: '/p/admin/index.php/Shopadmin/APIFakeUserGroup/MyCommunityFakerListOther'
}, _temp2);

export { _default as default };