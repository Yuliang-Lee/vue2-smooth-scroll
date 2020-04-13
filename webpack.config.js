const path = require('path');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: resolve('dist'),
    filename: 'vue-smooth-scroll.min.js',
    library: 'VueSmoothScroll',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          resolve('src')
        ],
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['js'],
  }
};
