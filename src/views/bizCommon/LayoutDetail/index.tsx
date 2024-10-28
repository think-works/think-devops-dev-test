import cls from "classnames";
import { LayoutDetail, LayoutDetailProps } from "@think/components";
import { useRouteBreadcrumb } from "../common";
import stl from "./index.module.less";

export type LayoutDetailWrapperProps = LayoutDetailProps;

/**
 * 布局详情包装
 */
const LayoutDetailWrapper = (props: LayoutDetailWrapperProps) => {
  const { className, crumb, ...rest } = props || {};

  const routeBreadcrumb = useRouteBreadcrumb();

  return (
    <LayoutDetail
      className={cls(stl.layoutDetailWrapper, className)}
      classNames={{ head: stl.head }}
      crumb={crumb || routeBreadcrumb}
      {...rest}
    />
  );
};

export default LayoutDetailWrapper;
