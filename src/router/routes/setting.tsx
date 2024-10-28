import { lazy } from "react";
import { PRESET_CODE_WORKSPACE_ADMIN } from "@think/meta-utils";
import { ExtendRoute } from "@think/router-utils";
import { ExtendRouteMeta } from "../utils";

const Setting = lazy(() => import("@/views/Setting?chunkName=setting#"));

const settingRoute: ExtendRoute<ExtendRouteMeta> = {
  path: "setting",
  element: <Setting />,
  handle: {
    name: "setting",
    title: "产品设置",
    auth: [PRESET_CODE_WORKSPACE_ADMIN],
  },
};

export default settingRoute;
