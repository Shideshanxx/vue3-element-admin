module.exports = {
  // 是否为根配置文件
  root: true,
  // env：指定脚本的运行环境
  env: {
    node: true
  },
  // globals：配置脚本在执行期间访问的全局变量，readonly表示只读，writable表示可写
  globals: {
    // Ref sugar (take 2)
    $: "readonly",
    $$: "readonly",
    $ref: "readonly",
    $shallowRef: "readonly",
    $computed: "readonly",

    // index.d.ts
    // global.d.ts
    Fn: "readonly",
    PromiseFn: "readonly",
    RefType: "readonly",
    LabelValueOptions: "readonly",
    EmitType: "readonly",
    TargetContext: "readonly",
    ComponentElRef: "readonly",
    ComponentRef: "readonly",
    ElRef: "readonly",
    global: "readonly",
    ForDataType: "readonly",
    ComponentRoutes: "readonly",

    // <script setup></script>
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly"
  },
  // extends：继承的其它配置
  extends: [
    "plugin:vue/vue3-essential", // eslint在vue3中的必需规则
    "eslint:recommended", // eslint推荐的核心规则
    "@vue/typescript/recommended",
    "@vue/eslint-config-prettier", // 解决prettier和eslint的冲突
    "@vue/eslint-config-typescript"
  ],
  // 设置解析器
  parser: "vue-eslint-parser", // 用来解析vue文件中的template
  // 自定义解析器配置
  parserOptions: {
    parser: "@typescript-eslint/parser", // 用来解析vue文件中<script>标签中的代码
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true
    }
  },
  // overrides：为特定类型的文件指定处理器
  overrides: [
    {
      files: ["*.ts", "*.vue"],
      rules: {
        "no-undef": "off"
      }
    },
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"],
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        "no-undef": "off"
      }
    }
  ],
  // rules：启用的规则及其各自的错误级别
  rules: {
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "off", // any
    "no-debugger": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off", // setup()
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always"
        },
        svg: "always",
        math: "always"
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }
    ],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ]
  }
};
