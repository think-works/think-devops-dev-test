import { lazy } from "react";
import { ExtendRoute } from "@think/router-utils";
import { ExtendRouteMeta } from "../utils";

const Example = lazy(() => import("@/views/Example?chunkName=example#"));
const ExampleList = lazy(
  () => import("@/views/Example/List?chunkName=example#"),
);
const ExampleDetail = lazy(
  () => import("@/views/Example/Detail?chunkName=example#"),
);

const exampleRoute: ExtendRoute<ExtendRouteMeta> = {
  path: "example",
  element: <Example />,
  handle: { name: "example", title: "示例" },
  children: [
    {
      index: true,
      element: <ExampleList />,
    },
    {
      path: ":exampleId",
      element: <ExampleDetail />,
      handle: { name: "example-detail", title: "详情" },
    },
  ],
};

export default exampleRoute;
