import {
	stomp,
	formatMsg
} from './stomp.js'

stomp.WebSocketClass = StompWebSocket

const SOCKET_URL = 'ws://192.168.30.8:15674/ws' // 默认 rabbitmq socket 地址
const SOCKET_RABBITMQ_USERNAME = 'hannao'  // rabbit账号
const SOCKET_RABBITMQ_PASSWORD = 'hannao'  // rabbit密码
const SOCKET_RABBITMQ_QUEUES = ['/queue/1', '/queue/质检待办'] // 需要监听的rabbit队列列表

const noop = () => { }

/**
 * 方法 2
 * 用uni的websocket模拟window的websocket与stomp进行配合
 */
class StompWebSocket {
	// 静态方法  单例模式
	static getInstance(defaultParams, params) {
		if (!StompWebSocket.instance) {
			StompWebSocket.instance = new StompWebSocket()
			StompWebSocket.instance.init({
				...defaultParams,
				...params
			})
		}
		// 当传入params的时候才需要初始化  否则直接拿取实例
		params && StompWebSocket.instance.init({
			...defaultParams,
			...params
		})
		return StompWebSocket.instance
	}

	init({
		username,
		passcode,
		destinations = [],
		url
	}) {
		this.username = username // rabbitmq登录名
		this.passcode = passcode // rabbitmq登录密码
		this.destinations = destinations // rabbitmq需要监听的队列列表
		this.url = url // rabbitmq的websocket地址

		// 调用stomp客户端并存储
		this.client = stomp.client(this.url)
	}

	// 建立连接并登录
	connect(successCb, failCb) {
		this.client.connect({
			login: this.username,
			passcode: this.passcode,
		}, (res) => {
			successCb && successCb()
		}, (res) => {
			console.log(res);
		})
	}

	// 订阅
	subscribe(cb) {
		this.destinations.forEach(destination => {
			this.client.subscribe(destination, cb || noop)
		})
	}

	// 关闭连接
	close() {
		this.client.disconnect()
	}

}

const config = {
	url: SOCKET_URL,
	username: SOCKET_RABBITMQ_USERNAME,
	passcode: SOCKET_RABBITMQ_PASSWORD,
	destinations: SOCKET_RABBITMQ_QUEUES,
}

// export const stompWebSocket = StompWebSocket.getInstance({
// 	...config
// })

export const makeStompWebSocket = (params) => {
	return StompWebSocket.getInstance({
		url: SOCKET_URL,
		username: SOCKET_RABBITMQ_USERNAME,
		passcode: SOCKET_RABBITMQ_PASSWORD,
		destinations: SOCKET_RABBITMQ_QUEUES,
	}, params)
}

/**
 * 方法 1
 * 用websocket链接rabbitMq的类
 */
// class RabbitMqSocket {

// 	// 静态方法  单例模式
// 	static getInstance(params) {
// 		if (!RabbitMqSocket.instance) {
// 			RabbitMqSocket.instance = new RabbitMqSocket({
// 				...params
// 			})
// 		}
// 		return RabbitMqSocket.instance
// 	}
// 	/**
// 	 * 构造方法
// 	 * @param {Object} username   		账号
// 	 * @param {Object} passcode			密码
// 	 * @param {Object} destinations		监听队列名的集合
// 	 */
// 	constructor({
// 		username,
// 		passcode,
// 		destinations = [],
// 		url
// 	}) {
// 		this.username = username
// 		this.passcode = passcode
// 		this.destinations = destinations
// 		this.url = url
// 		this.closeQueue = [] // socket关闭时触发的函数队列
// 		this.msgQueue = [] // 接受到消息时触发的函数队列
// 		this.socketOpen = false // socket是否在链接
// 		this.connect() // 建立socket链接
// 	}

// 	// 建立socket链接
// 	connect() {
// 		uni.connectSocket({
// 			url: this.url,
// 			protocols: ['v10.stomp', 'v11.stomp'],
// 			method: 'GET'
// 		});
// 		this.login()
// 	}

// 	login() {
// 		// 监听socket打开并进行登录
// 		uni.onSocketOpen((res) => {
// 			this.socketOpen = true
// 			console.log('WebSocket连接已打开！');

// 			// 监听接收到服务端消息时触发
// 			uni.onSocketMessage((res) => {
// 				var data = formatMsg(res)
// 				let msg = stomp.Frame.unmarshall(data)[0].body
// 				// 消息触发队列中所有函数触发一遍
// 				this.msgQueue.forEach((cb) => {
// 					cb && cb(msg)
// 				})
// 			});

// 			// 登录操作
// 			uni.sendSocketMessage({
// 				data: stomp.Frame.marshall('CONNECT', {
// 					login: this.username,
// 					passcode: this.passcode,
// 					'accept-version': '1.1,1.0',
// 					'heart-beat': '10000,10000'
// 				})
// 			});

// 			// 根据传入的队列名列表逐个监听所有队列
// 			this.destinations.forEach(destination => {
// 				// 订阅指定队列的消息
// 				uni.sendSocketMessage({
// 					data: stomp.Frame.marshall('SUBSCRIBE', {
// 						destination: destination || ''
// 					})
// 				});
// 			})

// 			// 监听socket关闭时触发
// 			uni.onSocketClose((res) => {
// 				this.socketOpen = false
// 				// 关闭函数队列都触发一遍
// 				this.closeQueue.forEach((cb) => {
// 					cb && cb(res)
// 				})
// 				this.closeQueue = [] // 置空
// 				console.log('WebSocket 已关闭！');
// 			});
// 		});
// 	}

// 	// socket关闭时操作推入指定队列中
// 	onSocketClose(cb) {
// 		this.closeQueue.push(cb)
// 	}

// 	// socket接收到消息时回调推入到指定队列中
// 	onSocketMessage(cb) {
// 		this.msgQueue.push(cb)
// 	}

// 	// 移除接收消息队列中的某个回调
// 	removeOnSocketMessage(cb) {
// 		this.msgQueue = this.msgQueue.filter(item => item !== cb)
// 	}

// 	// 添加监听队列
// 	addSubscribeQueue(queueUrl) {
// 		this.destinations.push(queueUrl)
// 		if (this.socketOpen) {
// 			// 订阅指定队列的消息
// 			uni.sendSocketMessage({
// 				data: stomp.Frame.marshall('SUBSCRIBE', {
// 					destination: queueUrl || ''
// 				})
// 			});
// 		}
// 	}
// }
// export const rabbitMqSocket = RabbitMqSocket.getInstance({ 
// 	...config
// })
