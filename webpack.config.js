const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * This webpack.config.js is for generating the assets for the demo page used by `npm run deploy`.
 * The demo page is hosted at http://anypoint-signin-test.surge.sh/ but could be hosted on Github Pages instead.
 * @return {Object} webpack config
 */
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
      path: path.resolve(__dirname)
    }
  };
};
