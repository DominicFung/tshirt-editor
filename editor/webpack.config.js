const { resolve } = require("path")
const TerserWebpackPlugin = require("terser-webpack-plugin")

const config = {
  mode: "development",//"production",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    publicPath: '',
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  // externals: {
  //   react: 'React'
  // },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  }
};

config.optimization = {
  minimizer: [new TerserWebpackPlugin()],
};

module.exports = config;