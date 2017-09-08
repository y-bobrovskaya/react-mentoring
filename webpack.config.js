const path = require('path');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		client: './client/app',
		server: './server/server'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'built'),
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: [/node_modules/],
				loader: 'babel-loader'
			}
		]
	},
	node: {
		fs: 'empty',
		net: 'empty',
		http: 'empty'
	}
};