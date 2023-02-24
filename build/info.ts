// 打包时输出信息（大小、用时等）
import type { Plugin } from "vite";
import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import { green, blue, bold } from "picocolors";
import { getPackageSize } from "@pureadmin/utils";
dayjs.extend(duration);

export function viteBuildInfo(): Plugin {
  let config: { command: string };
  let startTime: Dayjs;
  let endTime: Dayjs;
  let outDir: string;
  return {
    name: "vite:buildInfo",
    // 解析配置（获取config和输出目录）
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      outDir = resolvedConfig.build?.outDir ?? "dist";
    },
    // 开始打包
    buildStart() {
      console.log(
        bold(
          green(
            `👏欢迎使用${blue(
              "[vue3-element-admin]"
            )}，如果您感觉不错，记得点击后面链接给个star哦💖 https://github.com/Shideshanxx/vue3-element-admin.git`
          )
        )
      );
      if (config.command === "build") {
        startTime = dayjs(new Date());
      }
    },
    // 打包结束
    closeBundle() {
      if (config.command === "build") {
        endTime = dayjs(new Date());
        getPackageSize({
          folder: outDir,
          callback: (size: string) => {
            console.log(
              bold(
                green(
                  `🎉恭喜打包完成（总用时${dayjs
                    .duration(endTime.diff(startTime))
                    .format("mm分ss秒")}，打包后的大小为${size}）`
                )
              )
            );
          }
        });
      }
    }
  };
}
