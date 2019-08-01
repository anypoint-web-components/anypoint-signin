const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ mode }) => {
  return {
    mode,
    entry: './demo/index.js',
    plugins: [
      new HtmlWebpackPlugin({
        template: './demo/index.html'
      })
    ],
    output: {
      filename: 'dist.js',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: mode === 'development' ? 'source-map' : 'none'
  };
};
