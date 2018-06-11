const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const generateCssLoader = function({ include, exclude, happyId, test }) {
	const hp = `happypack/loader?id=${happyId}`;
	test = test || /\.p?css$/;
	return {
		test,
		include,
		exclude,
		use: [MiniCssExtractPlugin.loader, hp]
	};
};
module.exports = generateCssLoader;
