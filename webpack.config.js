var path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    overlay: {
      errors: true,
      warnings: true
    }
  },
  module: {
    rules: [
      { test: /\.ts$/, use: ['ts-loader'], exclude: /node_modules/ },
    ]
  }
};