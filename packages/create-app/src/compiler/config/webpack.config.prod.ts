import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
              },
            },
            {
              loader: 'less-loader',
            },
          ],
          fallback: 'style-loader',
        }),
      },
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [new ExtractTextPlugin('styles.css')],
}
