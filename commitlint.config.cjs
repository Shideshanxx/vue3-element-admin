module.exports = {
  ignores: [commit => commit.includes("init")],
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 108],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新特性
        "fix", // 修改问题
        "perf",
        "style", // 代码格式修改
        "docs", // 文档修改
        "test", // 测试用例修改
        "refactor", // 代码重构
        "build",
        "ci",
        "chore", // 其他修改, 比如构建流程, 依赖管理
        "revert",
        "wip",
        "workflow",
        "types",
        "release"
      ]
    ]
  }
};
