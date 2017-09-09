var webpack = require('webpack');
const path = require('path');
var fs = require('fs');
var nodeModules = {};

// note the path.resolve(__dirname, ...) part
// without it, eslint-import-resolver-webpack fails
// since eslint might be invoked with different cwd
fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

module.exports = {
	name: 'server',
	target: 'node',
	context: path.resolve(__dirname, 'src'),
	entry: './server/server',
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
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: ["transform-react-jsx"],
						presets: ['env']
					}
				}
			}
		]
	},
	node: {
		fs: 'empty',
		net: 'empty',
		http: 'empty'
	}
};