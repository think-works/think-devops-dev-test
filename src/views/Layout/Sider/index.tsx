import { Layout } from "antd";
import cls, { Argument } from "classnames";
import { LayoutView } from "@think/meta-utils";
import { collapsedWidth, siderWidth } from "../config";
import { siderExtendClass } from "../utils";
import stl from "./index.module.less";
import LeftMenu from "./LeftMenu";

const { ProjectWrapper } = LayoutView;

export type SiderProps = {
  className?: Argument;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
};

const Sider = (props: SiderProps) => {
  const { className, collapsed, onCollapse } = props;

  return (
    <Layout.Sider
      className={cls(stl.sider, className)}
      collapsible
      theme="light"
      width={siderWidth}
      collapsedWidth={collapsedWidth}
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <ProjectWrapper
        collapsed={collapsed}
        siderWidth={collapsed ? collapsedWidth : siderWidth}
      />
      <LeftMenu />
      <div className={cls(stl.extend, siderExtendClass)} />
    </Layout.Sider>
  );
};

export default Sider;
