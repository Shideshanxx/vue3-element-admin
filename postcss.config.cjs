module.exports = {
  plugins: {
    "postcss-import": {}, // 整合其他css代码，实现css模块化；（即通过@import引入的样式可以整合到新的css文件中）
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}) // cssnano用来压缩css代码
  }
};
