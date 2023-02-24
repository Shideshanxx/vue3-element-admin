import { resolve } from "path";
import pkg from "./package.json";
import dayjs from "dayjs";
import { warpperEnv } from "./build";
import { getPluginsList } from "./build/plugins";
import { include, exclude } from "./build/optimize";
import { UserConfigExport, ConfigEnv, loadEnv } from "vite";

/** 当前执行node命令时文件夹的地址（工作目录） */
const root: string = process.cwd();

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

/** 设置别名 */
const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build")
};

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
};

// 传入 command、mode，基于命令或者不同的模式来生成不同的配置
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // loadEnv 用来加载特定模式下的环境变量
  const { VITE_CDN, VITE_PORT, VITE_COMPRESSION, VITE_PUBLIC_PATH } =
    warpperEnv(loadEnv(mode, root));

  return {
    base: VITE_PUBLIC_PATH, // 开发或生产环境服务的公共基础路径
    root, // 项目根目录（index.html 文件所在的位置）
    resolve: {
      alias // 文件路径的别名
    },
    // 服务器
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: VITE_PORT,
      host: "0.0.0.0",
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {}
    },
    // 需要用到的插件数组
    plugins: getPluginsList(command, VITE_CDN, VITE_COMPRESSION),
    // https://cn.vitejs.dev/config/dep-optimization-options.html#dep-optimization-options
    optimizeDeps: {
      include,
      exclude
    },
    build: {
      sourcemap: false, // 构建后是否生成 source map 文件
      chunkSizeWarningLimit: 4000, // chunk 大小警告的限制（以 kbs 为单位）
      // rollup配置：https://rollupjs.org/configuration-options/
      rollupOptions: {
        input: {
          index: pathResolve("index.html")
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    },
    // 定义全局常量替换方式
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  };
};
