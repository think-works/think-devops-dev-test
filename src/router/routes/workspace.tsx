import { RouteExtendParams } from "@think/meta-utils";
import { ExtendRouteMeta } from "../utils";
import settingRoute from "./setting";

/**
 * 工作空间路由扩展
 */
export const workspaceRouteExtend: RouteExtendParams<ExtendRouteMeta> = {};

/**
 * 工作空间详情路由扩展
 */
export const workspaceDetailRouteExtend: RouteExtendParams<ExtendRouteMeta> = {
  children: [settingRoute],
};
