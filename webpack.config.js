const path = require('path');
const outputDir = path.resolve(__dirname, 'public/dist');

module.exports = {
	mode: "development",
	entry: path.resolve(__dirname, 'public/src/js'),
	output: {
		path: outputDir,
		filename: 'bundle.js'
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.js$/,
				use: ["source-map-loader"],
				enforce: "pre"
			}
		]
	}
};
