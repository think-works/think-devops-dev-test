import { lazy } from "react";
import { RouteExtendFuncParams, RouteExtendParams } from "@think/meta-utils";
import { NamedNavigate } from "@think/router-utils";
import { ExtendRouteMeta } from "../utils";
import exampleRoute from "./example";

const ProjectOverview = lazy(
  () => import("@/views/Project/Overview?chunkName=project#"),
);

export const ProjectDetailWrapper = lazy(
  () => import("@/views/Project/Detail/Wrapper?chunkName=project#"),
);

/**
 * 项目路由扩展
 */
export const projectRouteExtend: RouteExtendParams<ExtendRouteMeta> = {};

/**
 * 项目详情路由扩展
 */
export const getProjectDetailRouteExtend = ({
  dictionaryTools,
}: RouteExtendFuncParams): RouteExtendParams<ExtendRouteMeta> => {
  const { projectWord } = dictionaryTools || {};
  return {
    children: [
      {
        index: true,
        element: <NamedNavigate replace name="example" />,
      },
      {
        path: "overview",
        element: <ProjectOverview />,
        handle: { name: "project-overview", title: `${projectWord}总览` },
      },
      exampleRoute,
    ],
  };
};
