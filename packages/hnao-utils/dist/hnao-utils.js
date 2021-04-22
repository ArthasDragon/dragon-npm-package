'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var debounce = function debounce(fn, delay) {
  var timer = null;
  return function () {
    for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }

    var aaa = function aaa() {
      fn.apply(undefined, rest);
    };
    if (timer) {
      clearTimeout(timer);
    }
    // timer && clearTimeout(timer)
    timer = setTimeout(aaa, delay || 1000);
  };
};

var getUrlParams = function getUrlParams(name, def) {
  var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.location.href;

  var reg = new RegExp('(^|&)' + name + '=([^&]*?)(&|$|#)', 'g');
  var reg1 = new RegExp('(^|&)' + name + '=([^&]*?)(&|$|#)');
  var searchArr = url.split('?');

  var result = null;
  searchArr.forEach(function (item) {
    if (item.match(reg)) {
      item.match(reg).forEach(function (mat) {
        result = mat.match(reg1) || result;
      });
    }
  });
  if (result) {
    return unescape(result[2]);
  }
  return def || '';
};

var isPhone = function isPhone(phone) {
  return (/^1[0-9]{10}$/.test(phone + '')
  );
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var isPlainObj = function isPlainObj(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
var isFunc = function isFunc(obj) {
  return typeof obj === 'function';
};
var isNum = function isNum(value, isStrict) {
  if (!isStrict) {
    value = +value;
  }
  return typeof value === 'number' && !Number.isNaN(value);
};
var isStr = function isStr(obj) {
  return typeof obj === 'string';
};
var isBool = function isBool(obj) {
  return typeof obj === 'boolean';
};
var isArr = function isArr(obj) {
  return Array.isArray(obj);
};
var isUNN = function isUNN(obj) {
  return obj === null || obj === undefined || Number.isNaN(obj);
};
var isSymbol = function isSymbol(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'symbol';
};
var isHljKey = function isHljKey(key) {
  return isSymbol(key) && key.toString() === 'Symbol(__hljKey__)';
};
var isEmptyObj = function isEmptyObj(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
};
var isEmptyArr = function isEmptyArr(obj) {
  return isArr(obj) && obj.length === 0;
};
var isPromise = function isPromise(obj) {
  return isFunc(obj) && obj.then;
};

// Generated by CoffeeScript 1.7.1

var MyWebSocket = function () {
	function MyWebSocket(url) {
		classCallCheck(this, MyWebSocket);

		this.url = url;
	}

	/**
  * @param {String} message   发送的消息
  */


	createClass(MyWebSocket, [{
		key: 'send',
		value: function send(message) {
			uni.sendSocketMessage({
				data: message
			});
		}

		/**
   * 连接socket
   */

	}, {
		key: 'connect',
		value: function connect() {
			uni.connectSocket({
				url: this.url,
				protocols: ['v10.stomp', 'v11.stomp'],
				method: 'GET'
			});
		}

		/**
   * 关闭socket连接
   */

	}, {
		key: 'close',
		value: function close() {
			uni.closeSocket({
				// 关闭成功的回调
				success: function success() {}
			});
		}
	}]);
	return MyWebSocket;
}();

var Byte,
    Client,
    Frame,
    Stomp,
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice;

Byte = {
	LF: '\x0A',
	NULL: '\x00'
};

Frame = function () {
	var unmarshallSingle;

	function Frame(command, headers, body) {
		this.command = command;
		this.headers = headers != null ? headers : {};
		this.body = body != null ? body : '';
	}

	Frame.prototype.toString = function () {
		var lines, name, skipContentLength, value, _ref;
		lines = [this.command];
		skipContentLength = this.headers['content-length'] === false ? true : false;
		if (skipContentLength) {
			delete this.headers['content-length'];
		}
		_ref = this.headers;
		for (name in _ref) {
			if (!__hasProp.call(_ref, name)) continue;
			value = _ref[name];
			lines.push("" + name + ":" + value);
		}
		if (this.body && !skipContentLength) {
			lines.push("content-length:" + Frame.sizeOfUTF8(this.body));
		}
		lines.push(Byte.LF + this.body);
		return lines.join(Byte.LF);
	};

	Frame.sizeOfUTF8 = function (s) {
		if (s) {
			return encodeURI(s).match(/%..|./g).length;
		} else {
			return 0;
		}
	};

	unmarshallSingle = function unmarshallSingle(data) {
		var body, chr, command, divider, headerLines, headers, i, idx, len, line, start, trim, _i, _j, _len, _ref, _ref1;
		divider = data.search(RegExp("" + Byte.LF + Byte.LF));
		headerLines = data.substring(0, divider).split(Byte.LF);
		command = headerLines.shift();
		headers = {};
		trim = function trim(str) {
			return str.replace(/^\s+|\s+$/g, '');
		};
		_ref = headerLines.reverse();
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			line = _ref[_i];
			idx = line.indexOf(':');
			headers[trim(line.substring(0, idx))] = trim(line.substring(idx + 1));
		}
		body = '';
		start = divider + 2;
		if (headers['content-length']) {
			len = parseInt(headers['content-length']);
			body = ('' + data).substring(start, start + len);
		} else {
			chr = null;
			for (i = _j = start, _ref1 = data.length; start <= _ref1 ? _j < _ref1 : _j > _ref1; i = start <= _ref1 ? ++_j : --_j) {
				chr = data.charAt(i);
				if (chr === Byte.NULL) {
					break;
				}
				body += chr;
			}
		}
		return new Frame(command, headers, body);
	};

	Frame.unmarshall = function (datas) {
		var data;
		return function () {
			var _i, _len, _ref, _results;
			_ref = datas.split(RegExp("" + Byte.NULL + Byte.LF + "*"));
			_results = [];
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				data = _ref[_i];
				if ((data != null ? data.length : void 0) > 0) {
					_results.push(unmarshallSingle(data));
				}
			}
			return _results;
		}();
	};

	Frame.marshall = function (command, headers, body) {
		var frame;
		frame = new Frame(command, headers, body);
		return frame.toString() + Byte.NULL;
	};

	return Frame;
}();

Client = function () {
	var now;

	function Client(ws) {
		this.ws = ws;
		this.ws.binaryType = "arraybuffer";
		this.counter = 0;
		this.connected = false;
		this.heartbeat = {
			outgoing: 10000,
			incoming: 10000
		};
		this.maxWebSocketFrameSize = 16 * 1024;
		this.subscriptions = {};
	}

	Client.prototype.debug = function (message) {
		var _ref;
		return typeof window !== "undefined" && window !== null ? (_ref = window.console) != null ? _ref.log(message) : void 0 : void 0;
	};

	now = function now() {
		if (Date.now) {
			return Date.now();
		} else {
			return new Date().valueOf;
		}
	};

	Client.prototype._transmit = function (command, headers, body) {
		var out;
		out = Frame.marshall(command, headers, body);
		if (typeof this.debug === "function") {
			this.debug(">>> " + out);
		}
		while (true) {
			if (out.length > this.maxWebSocketFrameSize) {
				this.ws.send(out.substring(0, this.maxWebSocketFrameSize));
				out = out.substring(this.maxWebSocketFrameSize);
				if (typeof this.debug === "function") {
					this.debug("remaining = " + out.length);
				}
			} else {
				return this.ws.send(out);
			}
		}
	};

	Client.prototype._setupHeartbeat = function (headers) {
		var serverIncoming, serverOutgoing, ttl, v, _ref, _ref1;
		if ((_ref = headers.version) !== Stomp.VERSIONS.V1_1 && _ref !== Stomp.VERSIONS.V1_2) {
			return;
		}
		_ref1 = function () {
			var _i, _len, _ref1, _results;
			_ref1 = headers['heart-beat'].split(",");
			_results = [];
			for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
				v = _ref1[_i];
				_results.push(parseInt(v));
			}
			return _results;
		}(), serverOutgoing = _ref1[0], serverIncoming = _ref1[1];
		if (!(this.heartbeat.outgoing === 0 || serverIncoming === 0)) {
			ttl = Math.max(this.heartbeat.outgoing, serverIncoming);
			if (typeof this.debug === "function") {
				this.debug("send PING every " + ttl + "ms");
			}

			this.pinger = setInterval(function (_this) {
				return function () {
					_this.ws.send(Byte.LF);
					return typeof _this.debug === "function" ? _this.debug(">>> PING") : void 0;
				};
			}(this), ttl);
		}
		if (!(this.heartbeat.incoming === 0 || serverOutgoing === 0)) {
			ttl = Math.max(this.heartbeat.incoming, serverOutgoing);
			if (typeof this.debug === "function") {
				this.debug("check PONG every " + ttl + "ms");
			}
			return this.ponger = setInterval(function (_this) {
				return function () {
					var delta;
					delta = now() - _this.serverActivity;
					if (delta > ttl * 2) {
						if (typeof _this.debug === "function") {
							_this.debug("did not receive server activity for the last " + delta + "ms");
						}
						return _this.ws.close();
					}
				};
			}(this), ttl);
		}
	};

	Client.prototype._parseConnect = function () {
		var args, connectCallback, errorCallback, headers;
		args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
		headers = {};
		switch (args.length) {
			case 2:
				headers = args[0], connectCallback = args[1];
				break;
			case 3:
				if (args[1] instanceof Function) {
					headers = args[0], connectCallback = args[1], errorCallback = args[2];
				} else {
					headers.login = args[0], headers.passcode = args[1], connectCallback = args[2];
				}
				break;
			case 4:
				headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3];
				break;
			default:
				headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3], headers.host = args[4];
		}
		return [headers, connectCallback, errorCallback];
	};

	Client.prototype.connect = function () {
		var args, errorCallback, headers, out;
		args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
		out = this._parseConnect.apply(this, args);
		headers = out[0], this.connectCallback = out[1], errorCallback = out[2];
		if (typeof this.debug === "function") {
			this.debug("Opening Web Socket...");
		}
		// 改为uniapp的形式才行  ！！！！！
		uni.onSocketMessage(function (_this) {
			return function (evt) {
				var arr, c, client, data, frame, messageID, onreceive, subscription, _i, _len, _ref, _results;
				data = typeof ArrayBuffer !== 'undefined' && evt.data instanceof ArrayBuffer ? (arr = new Uint8Array(evt.data), typeof _this.debug === "function" ? _this.debug("--- got data length: " + arr.length) : void 0, function () {
					var _i, _len, _results;
					_results = [];
					for (_i = 0, _len = arr.length; _i < _len; _i++) {
						c = arr[_i];
						_results.push(String.fromCharCode(c));
					}
					return _results;
				}().join('')) : evt.data;
				_this.serverActivity = now();
				if (data === Byte.LF) {
					if (typeof _this.debug === "function") {
						_this.debug("<<< PONG");
					}
					return;
				}
				if (typeof _this.debug === "function") {
					_this.debug("<<< " + data);
				}
				_ref = Frame.unmarshall(data);
				_results = [];
				for (_i = 0, _len = _ref.length; _i < _len; _i++) {
					frame = _ref[_i];
					switch (frame.command) {
						case "CONNECTED":
							if (typeof _this.debug === "function") {
								_this.debug("connected to server " + frame.headers.server);
							}
							_this.connected = true;
							_this._setupHeartbeat(frame.headers);
							_results.push(typeof _this.connectCallback === "function" ? _this.connectCallback(frame) : void 0);
							break;
						case "MESSAGE":
							subscription = frame.headers.subscription;
							onreceive = _this.subscriptions[subscription] || _this.onreceive;
							if (onreceive) {
								client = _this;
								messageID = frame.headers["message-id"];
								frame.ack = function (headers) {
									if (headers == null) {
										headers = {};
									}
									return client.ack(messageID, subscription, headers);
								};
								frame.nack = function (headers) {
									if (headers == null) {
										headers = {};
									}
									return client.nack(messageID, subscription, headers);
								};
								_results.push(onreceive(frame));
							} else {
								_results.push(typeof _this.debug === "function" ? _this.debug("Unhandled received MESSAGE: " + frame) : void 0);
							}
							break;
						case "RECEIPT":
							_results.push(typeof _this.onreceipt === "function" ? _this.onreceipt(frame) : void 0);
							break;
						case "ERROR":
							_results.push(typeof errorCallback === "function" ? errorCallback(frame) : void 0);
							break;
						default:
							_results.push(typeof _this.debug === "function" ? _this.debug("Unhandled frame: " + frame) : void 0);
					}
				}
				return _results;
			};
		}(this));
		// 改为uniapp的形式才行  ！！！！！
		uni.onSocketClose(function (_this) {
			return function () {
				var msg;
				msg = "Whoops! Lost connection to " + _this.ws.url;
				if (typeof _this.debug === "function") {
					_this.debug(msg);
				}
				_this._cleanUp();
				return typeof errorCallback === "function" ? errorCallback(msg) : void 0;
			};
		}(this));
		// 改为uniapp的形式才行  ！！！！！
		uni.onSocketOpen(function (_this) {
			return function () {
				if (typeof _this.debug === "function") {
					_this.debug('Web Socket Opened...');
				}
				headers["accept-version"] = Stomp.VERSIONS.supportedVersions();
				headers["heart-beat"] = [_this.heartbeat.outgoing, _this.heartbeat.incoming].join(',');
				return _this._transmit("CONNECT", headers);
			};
		}(this));
		//  需要手动进行连接
		this.ws.connect();
		return;
	};

	Client.prototype.disconnect = function (disconnectCallback, headers) {
		if (headers == null) {
			headers = {};
		}
		this._transmit("DISCONNECT", headers);
		this.ws.onclose = null;
		this.ws.close();
		this._cleanUp();
		return typeof disconnectCallback === "function" ? disconnectCallback() : void 0;
	};

	Client.prototype._cleanUp = function () {
		this.connected = false;
		if (this.pinger) {
			clearInterval(this.pinger);
		}
		if (this.ponger) {
			return clearInterval(this.ponger);
		}
	};

	Client.prototype.send = function (destination, headers, body) {
		if (headers == null) {
			headers = {};
		}
		if (body == null) {
			body = '';
		}
		headers.destination = destination;
		return this._transmit("SEND", headers, body);
	};

	Client.prototype.subscribe = function (destination, callback, headers) {
		var client;
		if (headers == null) {
			headers = {};
		}
		if (!headers.id) {
			headers.id = "sub-" + this.counter++;
		}
		headers.destination = destination;
		this.subscriptions[headers.id] = callback;
		this._transmit("SUBSCRIBE", headers);
		client = this;
		return {
			id: headers.id,
			unsubscribe: function unsubscribe() {
				return client.unsubscribe(headers.id);
			}
		};
	};

	Client.prototype.unsubscribe = function (id) {
		delete this.subscriptions[id];
		return this._transmit("UNSUBSCRIBE", {
			id: id
		});
	};

	Client.prototype.begin = function (transaction) {
		var client, txid;
		txid = transaction || "tx-" + this.counter++;
		this._transmit("BEGIN", {
			transaction: txid
		});
		client = this;
		return {
			id: txid,
			commit: function commit() {
				return client.commit(txid);
			},
			abort: function abort() {
				return client.abort(txid);
			}
		};
	};

	Client.prototype.commit = function (transaction) {
		return this._transmit("COMMIT", {
			transaction: transaction
		});
	};

	Client.prototype.abort = function (transaction) {
		return this._transmit("ABORT", {
			transaction: transaction
		});
	};

	Client.prototype.ack = function (messageID, subscription, headers) {
		if (headers == null) {
			headers = {};
		}
		headers["message-id"] = messageID;
		headers.subscription = subscription;
		return this._transmit("ACK", headers);
	};

	Client.prototype.nack = function (messageID, subscription, headers) {
		if (headers == null) {
			headers = {};
		}
		headers["message-id"] = messageID;
		headers.subscription = subscription;
		return this._transmit("NACK", headers);
	};

	return Client;
}();

Stomp = {
	VERSIONS: {
		V1_0: '1.0',
		V1_1: '1.1',
		V1_2: '1.2',
		supportedVersions: function supportedVersions() {
			return '1.1,1.0';
		}
	},
	client: function client(url, protocols) {
		var klass, ws;
		if (protocols == null) {
			protocols = ['v10.stomp', 'v11.stomp'];
		}
		klass = Stomp.WebSocketClass || WebSocket;
		klass = WebSocket || MyWebSocket;
		ws = new klass(url, protocols);
		return new Client(ws);
	},
	over: function over(ws) {
		return new Client(ws);
	},
	Frame: Frame
};

if (typeof exports !== "undefined" && exports !== null) {
	exports.Stomp = Stomp;
}

if (typeof window !== "undefined" && window !== null) {
	Stomp.setInterval = function (interval, f) {
		return window.setInterval(f, interval);
	};
	Stomp.clearInterval = function (id) {
		return window.clearInterval(id);
	};
	window.Stomp = Stomp;
} else if (!exports) {
	self.Stomp = Stomp;
}

var stomp = Stomp;

stomp.WebSocketClass = StompWebSocket;

var SOCKET_URL = 'ws://192.168.30.8:15674/ws'; // 默认 rabbitmq socket 地址
var SOCKET_RABBITMQ_USERNAME = 'hannao'; // rabbit账号
var SOCKET_RABBITMQ_PASSWORD = 'hannao'; // rabbit密码
var SOCKET_RABBITMQ_QUEUES = ['/queue/1', '/queue/质检待办']; // 需要监听的rabbit队列列表

var noop$1 = function noop() {};

/**
 * 方法 2
 * 用uni的websocket模拟window的websocket与stomp进行配合
 */

var StompWebSocket = function () {
	createClass(StompWebSocket, null, [{
		key: 'getInstance',

		// 静态方法  单例模式
		value: function getInstance(defaultParams, params) {
			if (!StompWebSocket.instance) {
				StompWebSocket.instance = new StompWebSocket();
				StompWebSocket.instance.init(_extends({}, defaultParams, params));
			}
			// 当传入params的时候才需要初始化  否则直接拿取实例
			params && StompWebSocket.instance.init(_extends({}, defaultParams, params));
			return StompWebSocket.instance;
		}
	}]);

	function StompWebSocket() {
		classCallCheck(this, StompWebSocket);

		this.isConnecting = false;
	}

	createClass(StompWebSocket, [{
		key: 'init',
		value: function init(_ref) {
			var username = _ref.username,
			    passcode = _ref.passcode,
			    _ref$destinations = _ref.destinations,
			    destinations = _ref$destinations === undefined ? [] : _ref$destinations,
			    url = _ref.url;

			this.username = username; // rabbitmq登录名
			this.passcode = passcode; // rabbitmq登录密码
			this.destinations = destinations; // rabbitmq需要监听的队列列表
			this.url = url; // rabbitmq的websocket地址

			// 调用stomp客户端并存储
			this.client = stomp.client(this.url);
		}

		// 建立连接并登录

	}, {
		key: 'connect',
		value: function connect(successCb, failCb) {
			var _this = this;

			// 如果正在连接中  则直接退出
			if (this.isConnecting) {
				return;
			}
			// 没有正在连接中则先关闭以前的连接再重新进行连接
			this.close();
			this.isConnecting = true;
			// 进行连接  成功  失败均有回调
			setTimeout(function () {
				_this.client.connect({
					login: _this.username,
					passcode: _this.passcode
				}, function (res) {
					_this.isConnecting = false;
					successCb && successCb();
				}, function (res) {
					_this.isConnecting = false;
					console.log(res);
				});
			}, 1000);
		}

		// 订阅

	}, {
		key: 'subscribe',
		value: function subscribe(cb) {
			var _this2 = this;

			this.destinations.forEach(function (destination) {
				_this2.client.subscribe(destination, cb || noop$1);
			});
		}

		// 关闭连接

	}, {
		key: 'close',
		value: function close() {
			this.client.disconnect();
		}
	}]);
	return StompWebSocket;
}();
var makeStompWebSocket = function makeStompWebSocket(params) {
	return StompWebSocket.getInstance({
		url: SOCKET_URL,
		username: SOCKET_RABBITMQ_USERNAME,
		passcode: SOCKET_RABBITMQ_PASSWORD,
		destinations: SOCKET_RABBITMQ_QUEUES
	}, params);
};

exports.debounce = debounce;
exports.getUrlParams = getUrlParams;
exports.isPlainObj = isPlainObj;
exports.isFunc = isFunc;
exports.isNum = isNum;
exports.isStr = isStr;
exports.isBool = isBool;
exports.isArr = isArr;
exports.isUNN = isUNN;
exports.isSymbol = isSymbol;
exports.isHljKey = isHljKey;
exports.isEmptyObj = isEmptyObj;
exports.isEmptyArr = isEmptyArr;
exports.isPromise = isPromise;
exports.isPhone = isPhone;
exports.makeStompWebSocket = makeStompWebSocket;
