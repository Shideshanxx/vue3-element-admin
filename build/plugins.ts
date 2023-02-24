// vite 相关插件动态处理
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { cdn } from "./cdn";
import { configCompressPlugin } from "./compress";
import DefineOptions from "unplugin-vue-define-options/vite";
import removeConsole from "vite-plugin-remove-console";
import { viteBuildInfo } from "./info";
import themePreprocessorPlugin from "@pureadmin/theme";
import { genScssMultipleScopeVars } from "../src/layout/theme";
import svgLoader from "vite-svg-loader";
import { viteMockServe } from "vite-plugin-mock";
import { visualizer } from "rollup-plugin-visualizer";

export function getPluginsList(
  command: string,
  VITE_CDN: boolean,
  VITE_COMPRESSION: ViteCompression
) {
  const prodMock = true;
  // 当前正在运行的脚本名称
  const lifecycle = process.env.npm_lifecycle_event;
  return [
    vue(),
    vueJsx(), // jsx、tsx语法支持
    VITE_CDN ? cdn : null, // cdn加载包
    configCompressPlugin(VITE_COMPRESSION), // 压缩
    DefineOptions(), // 在setup中使用defineOptions
    removeConsole({ external: ["src/assets/iconfont/iconfont.js"] }), // 线上环境删除console（external排除部分文件）
    viteBuildInfo(), // 打包时输出打包时间、大小等信息
    // 自定义主题
    themePreprocessorPlugin({
      scss: {
        multipleScopeVars: genScssMultipleScopeVars(),
        extract: true
      }
    }),
    svgLoader(), // svg组件化支持
    // mock支持（https://github.com/vbenjs/vite-plugin-mock，还需要安装mockjs）
    viteMockServe({
      mockPath: "mock", // mock 接口所在文件夹
      localEnabled: command === "serve", // 是否启用本地mock接口
      prodEnabled: command !== "serve" && prodMock, // 打包时是否启用 mock 功能
      // 如果生产环境开启了 mock 功能（即prodEnabled=true），则该代码会被注入到injectFile对应的文件（默认为main.{ts,js}）的底部。
      // 这样做可以动态控制生产环境是否开启 mock，在没有开启的时候 mock.js 就不会被打包。
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      logger: false // 是否在控制台显示请求日志
    }),
    // 打包生成分析页面
    lifecycle === "report"
      ? visualizer({ open: true, brotliSize: true, filename: "report.html" })
      : null
  ];
}
