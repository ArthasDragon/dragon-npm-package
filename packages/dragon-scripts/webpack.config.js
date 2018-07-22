module.exports = {
	port: 3000,
	proxy: {
		'/p': 'http://admintest.hunliji.com',
	},
	env: {
		__fmt1: 'YYYY-MM-DD',
		__fmt2: 'YYYY-MM-DD HH:mm:ss',
	},
	publicPath: '/',
	extraVendor: [],
	eslint: true,
	bundleAnalyzer: false,
	autoOpen: true,
	autoOpenLocalhost: false,
};
