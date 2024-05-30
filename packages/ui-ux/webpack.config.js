module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // <-- Agrega |svg aquí
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
