const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.join(__dirname, 'src/client'),

	entry: {
		client: [
			'react-hot-loader/patch',
			'./index',
		]
	},

	output: {
		path: path.join(__dirname, "built"),
		filename: '[name].js',
	},

	resolve: {
		extensions: ['.js', '.jsx']
	},

	devServer: {
		historyApiFallback: true,
		hot: true,
		port: 4300
	},

	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: [
				'react-hot-loader/webpack',
				'babel-loader',
			],
		},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				]
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.SourceMapDevToolPlugin({
			filename: '[name].js.map',
			exclude: ['vendor.js']
		}),
		new HtmlWebpackPlugin({
			title: 'Test',
			hash: true,
			template: './index.html'
		}),
	],
};