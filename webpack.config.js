const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: path.join(__dirname, 'src/client'),

	entry: {
		client: [
			'react-hot-loader/patch',
			'./index',
		],
		styles: './styles/styles.less'
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
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader']
				})
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
			template: './index.html'
		}),
		new ExtractTextPlugin({
			filename: 'styles.css',
			allChunks: true
		})
	],
};