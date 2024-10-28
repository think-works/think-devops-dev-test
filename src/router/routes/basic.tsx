import { lazy } from "react";
import { RouteExtendParams } from "@think/meta-utils";
import { ExtendRoute } from "@think/router-utils";
import { ExtendRouteMeta } from "../utils";

const License = lazy(() => import("@/views/Basic/License?chunkName=basic#"));
const Forbidden = lazy(
  () => import("@/views/Basic/Forbidden?chunkName=basic#"),
);
const NotFound = lazy(() => import("@/views/Basic/NotFound?chunkName=basic#"));

export const LayoutWrapper = lazy(
  () => import("@/views/Layout/Wrapper?chunkName=basic#"),
);

/**
 * 基础路由
 */
export const basicRoutes: ExtendRoute<ExtendRouteMeta>[] = [
  {
    path: "license",
    element: <License />,
    handle: { title: "无效许可证" },
  },
  {
    path: "forbidden",
    element: <Forbidden />,
    handle: { title: "无权限" },
  },
  {
    path: "*",
    element: <NotFound />,
    handle: { title: "页面不存在" },
  },
];

/**
 * 根路由扩展
 */
export const rootRouteExtend: RouteExtendParams<ExtendRouteMeta> = {};

/**
 * 布局路由扩展
 */
export const layoutRouteExtend: RouteExtendParams<ExtendRouteMeta> = {
  handle: { sider: true },
  children: [...basicRoutes],
};
