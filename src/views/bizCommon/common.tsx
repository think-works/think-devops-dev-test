import { useMemo } from "react";
import { DynamicImport, useDynamicImport } from "@think/components";

export const searchTabKey = "activeTab";

/**
 * 注册自定义菜单
 * 注意：
 * 由于菜单所在组件，渲染位置可能在“工作空间详情”或“项目详情”路由之外，无法直接从路由中获取所需必填参数。
 * 因此使用 `NamedLink` 注册菜单时，可能需要传入 `workspacePath` 或 `projectPath` 参数，以免渲染报错：
 * `Missing ":workspacePath" param` 或 `Missing ":projectPath" param`
 */
export const useRegisterCustomMenus = () => {
  // 异步加载避免循环依赖
  const importLayoutUtils = useMemo(() => import("@/views/Layout/utils"), []);
  const { module: layoutUtils } = useDynamicImport(importLayoutUtils);
  return layoutUtils?.registerCustomMenus;
};

/**
 * 基于路由生成面包屑
 */
export const useRouteBreadcrumb = () => {
  // 异步加载避免循环依赖
  const importLayoutCrumb = useMemo(
    () => import("@/views/Layout/Content/Crumb"),
    [],
  );
  return <DynamicImport dynamicImport={importLayoutCrumb} />;
};
