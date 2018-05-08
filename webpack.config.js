const path = require("path");

const config = {
  context: __dirname,
  entry: ["./src/index.jsx"],
  devtool: "cheap-eval-source-map",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  devServer: {
    publicPath: "/public/"
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader"
      }
    ]
  }
};

if (process.env.NODE_ENV === "production") {
  config.entry = ["./src/index.jsx"];
  config.devtool = false;
  config.plugins = [];
  config.resolve.alias = {
    react: "inferno-compat",
    "react-dom": "inferno-compat"
  };
}

module.exports = config;
