import cProcess from "child_process";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import checker from "vite-plugin-checker";
import mockDevServer from "vite-plugin-mock-dev-server";
import svgr from "@svgr/rollup";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { name, version } from "./package.json";
import proxy from "./vite.proxy.js";

const ignoreDir = "__ignore-dynamic-import";
const srcPath = fileURLToPath(new URL("src", import.meta.url));

const findChunk = (chunks, id) => {
  if (id.includes(ignoreDir)) {
    return;
  }

  for (const chunk in chunks) {
    const names = chunks[chunk];
    if (names.some((x) => id.includes(x))) {
      return chunk;
    }
  }
};

const getBizChunks = (chunks) => {
  const bizChunks = Object.keys(chunks).reduce((prev, key) => {
    const dirs = chunks[key];
    const bizDirs = dirs.map((dir) => path.join(srcPath, dir));
    prev[key] = bizDirs;
    return prev;
  }, {});
  return bizChunks;
};

const depChunks = {
  helper: [
    "vite/preload-helper",
    "vite/modulepreload-polyfill",
    "vite/dynamic-import-helper",
    "commonjsHelpers",
    "commonjs-dynamic-modules",
    "__vite-browser-external",
  ],
};

const bizChunks = getBizChunks({
  bizBasic: ["api", "common", "context", "router", "utils"],
  bizComponents: ["components"],
  viewCommon: ["views/bizCommon"],
});

export default defineConfig(({ mode }) => {
  const date = new Date().toISOString();
  const commit = cProcess
    .execSync("git rev-parse HEAD || echo UNKNOWN")
    .toString()
    .trim();

  process.env.VITE_APP_NAME = name;
  process.env.VITE_APP_VERSION = version;
  process.env.VITE_BUILD_DATE = date;
  process.env.VITE_BUILD_COMMIT = commit;

  const env = loadEnv(mode, process.cwd(), "");

  const proxyTarget = env.PROXY_TARGET;
  const mockEnable = env.MOCK_ENABLE === "true";
  const buildLegacy = env.BUILD_LEGACY === "true";
  const buildSourcemap = env.BUILD_SOURCEMAP === "true";
  const buildIgnoreMinify = env.BUILD_IGNORE_MINIFY === "true";
  const buildAssetsDir = env.BUILD_ASSETS_DIR || "assets";
  const chunkName = env.CHUNK_NAME || "chunkName";

  let deployBase = env.VITE_DEPLOY_BASE || "/";
  let apiBase = env.VITE_API_BASE || "/";
  deployBase = deployBase.endsWith("/") ? deployBase : `${deployBase}/`;
  apiBase = apiBase.endsWith("/") ? apiBase : `${apiBase}/`;

  const proxyCfg = proxy({
    apiBase,
    target: proxyTarget,
  });

  return {
    base: deployBase,
    clearScreen: false,
    resolve: {
      alias: {
        "@/": path.join(srcPath, "/"),
      },
    },
    server: {
      host: "0.0.0.0",
      proxy: proxyTarget ? proxyCfg : undefined,
    },
    build: {
      minify: !buildIgnoreMinify,
      sourcemap: buildSourcemap,
      assetsDir: buildAssetsDir,
      rollupOptions: {
        output: {
          sourcemapExcludeSources: true,
          manualChunks: (id) => {
            /**
             * 为静态和动态导入块指定名称
             * https://github.com/vitejs/vite/issues/5189#issuecomment-1687622602
             */
            const url = new URL(id, import.meta.url);
            const name = url.searchParams.get(chunkName);
            if (name) {
              return name;
            }

            const depChunk = findChunk(depChunks, id);
            if (depChunk) {
              return depChunk;
            }

            const bizChunk = findChunk(bizChunks, id);
            if (bizChunk) {
              return bizChunk;
            }
          },
        },
      },
    },
    plugins: [
      react(),
      splitVendorChunkPlugin(),
      legacy({
        modernPolyfills: true,
        renderLegacyChunks: buildLegacy,
      }),
      mockEnable
        ? mockDevServer({
            prefix: proxyTarget ? [] : Object.keys(proxyCfg),
          })
        : undefined,
      checker({
        typescript: true,
        eslint: {
          useFlatConfig: true,
          lintCommand: "eslint './src/**/*.{ts,tsx,js,jsx}'",
        },
        overlay: {
          initialIsOpen: false,
        },
      }),
      svgr({
        /**
         * 指定为命名导入方式以避免不确定性
         * https://react-svgr.com/docs/rollup/
         */
        exportType: "named",
        ref: true,
        icon: true,
        svgProps: {
          fill: "currentColor",
          focusable: false,
          "aria-hidden": true,
        },
      }),
    ],
  };
});
