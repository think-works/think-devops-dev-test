import { Breadcrumb } from "antd";
import cls, { Argument } from "classnames";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { types } from "@think/components";
import { crumbMode } from "../config";
import { useMatchCrumbs } from "../hooks";
import { breadcrumbExtendClass } from "../utils";
import stl from "./index.module.less";

export type CrumbProps = {
  className?: Argument;
};

const Crumb = (props: CrumbProps) => {
  const { className } = props;
  const matchCrumbs = useMatchCrumbs();

  const crumbItems = useMemo(
    () =>
      matchCrumbs
        .map(({ title, pathname, to, element }, idx) => {
          const last = idx === matchCrumbs.length - 1;
          const key = `${title}-${pathname}-${idx}`;

          // 优先使用自定义组件
          if (element) {
            return {
              key,
              title: element,
            };
          }

          // 没有标题就忽略
          if (!title) {
            return;
          }

          // 不是最后一个允许点击
          if (!last && (to || pathname)) {
            return {
              key,
              title: <Link to={to || pathname || ""}>{title}</Link>,
            };
          }

          return {
            key,
            title,
          };
        })
        .filter(types.truthy),
    [matchCrumbs],
  );

  if (!crumbItems.length) {
    return null;
  }

  return (
    <div className={cls(stl.crumb, className)}>
      <div className={stl.text}>
        {crumbMode === "title" ? (
          <div className={stl.title}>
            {crumbItems[crumbItems.length - 1]?.title}
          </div>
        ) : (
          <Breadcrumb items={crumbItems} />
        )}
      </div>
      <div className={cls(stl.extend, breadcrumbExtendClass)} />
    </div>
  );
};

export default Crumb;
