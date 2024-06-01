module.exports = {
  files: ['./dist/index.html'],
  server: {
    baseDir: './dist',
  },
  middleware: [
    function (_req, res, next) {
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      next();
    },
  ],
};
