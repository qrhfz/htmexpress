const path = require("path")
const glob = require('glob')

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript', '@babel/preset-env'],
            plugins: [
              ["@babel/plugin-transform-react-jsx", {
                "runtime": "automatic",
                "importSource": "preact/compat",
              }]
            ]
          }
        }
      }
    ],
  },
  entry: glob.sync('./src/static/*.tsx').reduce((acc, p) => {
    const entry = p.replace('.tsx', '').replace('./src/static/', '')

    acc[entry] = {
      import: p,
      dependOn: "preact",
    }
    return acc
  }, { preact: { import: 'preact/compat' } }),

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib/static'),
  },
};