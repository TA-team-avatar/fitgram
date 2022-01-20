const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: "./client/index.js",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /node_modules/,
        use: [
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Needed for tailwind
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: "Development",
      template: "index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/forum/**": "http://localhost:3000/",
      "/user/**": "http://localhost:3000",
      "/session/**": "http://localhost:3000",
      "/routine/**": "http://localhost:3000",
      "/workout/**": "http://localhost:3000",
    },
  },
};
