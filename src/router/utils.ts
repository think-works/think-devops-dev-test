import { RouteMeta } from "@think/router-utils";
import { deployBase, routeMode } from "@/utils/config";

export interface ExtendRouteMeta extends RouteMeta {
  /**
   * 页面标题
   */
  title?: false | string;
  /**
   * 路由面包屑
   */
  crumb?: false | string;
  /**
   * 所属菜单
   */
  menu?: false | string | string[];
  /**
   * 侧边栏可见性
   */
  sider?: boolean;
  /**
   * 面包屑栏可见性
   */
  breadcrumb?: boolean;
}

/**
 * 封装 window.location.href 和 window.open
 */
export const gotoUrl = (href?: string, open?: any) => {
  const url = href || deployBase;

  if (open) {
    const target = open?.target || "_blank";
    window.open(url, target);
  } else {
    window.location.href = url;

    // 重置单页应用状态
    if (routeMode === "hash") {
      setTimeout(() => {
        if (window.location.href === url) {
          window.location.reload();
        }
      }, 0);
    }
  }
};
