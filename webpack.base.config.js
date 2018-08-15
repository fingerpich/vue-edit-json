const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  module: {
    rules: [
        {
            test: /\.vue$/,
            use: 'vue-loader'
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
            test: /\.less/,
            use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'less-loader',
                },
            ],
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          test: /\.(png|jpg|gif|webp)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
          },
        },
        {
          test: /\.svg/,
          loader: 'url-loader',
        }, {
          test: /\.(woff2?|woff|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
    ],
  },
    plugins: [
        new VueLoaderPlugin()
    ]
};
