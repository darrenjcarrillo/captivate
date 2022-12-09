const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const DEV = process.env.NODE_ENV === 'development';

module.exports = {
  context: __dirname,
  entry: {
    frontend: ['./js/src/global-script.js', './css/src/scss/theme.scss'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]-bundle.js'
  },
  mode: DEV ? 'development' : 'production',
  devtool: 'none',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        test: /\.jsx$/,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: 'svg-defs.svg'
        }
      },
      {
        test: /\.(jpe?g|png|gif)\$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              name: '[name].[ext]'
            }
          },
          'img-loader'
        ]
      }
    ]
  },
  plugins: [
    // new StyleLintPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new BrowserSyncPlugin({
      // wordpress dev
      // files: '**/*.php',
      // proxy: 'http://localhost:10055',
      // port: 10055,

      // static dev
      files: '**/*.php',
      host: 'localhost',
      port: 3234,
      server: { 
      }
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()]
  }
};