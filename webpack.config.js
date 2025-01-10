const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

const commonConfig = {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};

const webConfig = {
  ...commonConfig,
  target: "web",
  entry: {
    popup: path.resolve("./src/popup/index.tsx"),
    options: path.resolve("./src/options/index.tsx"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new HtmlPlugin({
      title: "ReactJs Boilerplate",
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new HtmlPlugin({
      title: "ReactJs Boilerplate",
      filename: "options.html",
      chunks: ["options"],
    }),
  ],
};

const workerConfig = {
  ...commonConfig,
  target: "webworker",
  entry: {
    background: path.resolve("./src/background/background.ts"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    // If you need a separate HTML file for background, add it here
  ],
};

module.exports = [webConfig, workerConfig];
