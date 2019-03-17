module.exports = {
	entry: './src/client.js',
	output: {
		filename: './fragments.js',
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env'],
					plugins: ['transform-custom-element-classes', 'transform-es2015-classes']

				},
			},
		}, ],
	},
};