module.exports = {
  publicPath: '/',
  port: 3017,
  proxy: {
    '/p': 'http://admintest.hunliji.com',
    '/chat': 'http://test.hunliji.com',
    '/api': 'http://test.hunliji.com'
  }
}
