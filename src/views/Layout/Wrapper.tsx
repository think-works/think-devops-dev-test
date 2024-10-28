import { Layout } from "antd";
import { useCallback, useState } from "react";
import { appLayoutConfigKey, queryLocal, updateLocal } from "@/common/utils";
import { collapsedWidth, siderWidth } from "./config";
import Content from "./Content";
import Footer from "./Footer";
import GlobalInit from "./GlobalInit";
import Header from "./Header";
import { useSiderVisibility } from "./hooks";
import stl from "./index.module.less";
import Sider from "./Sider";

const storageVal = queryLocal(appLayoutConfigKey);
const defaultCollapsed = storageVal?.collapsed || false;

const LayoutWrapper = ({ children }: any) => {
  const showSider = useSiderVisibility();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const handleCollapse = useCallback((val: boolean) => {
    setCollapsed(val);

    updateLocal(appLayoutConfigKey, {
      collapsed: val,
    });
  }, []);

  return (
    <Layout className={stl.layout}>
      <GlobalInit />
      <Header className={stl.header} />
      <Layout
        className={stl.main}
        style={
          showSider
            ? {
                marginLeft: collapsed ? collapsedWidth : siderWidth,
              }
            : undefined
        }
      >
        {showSider ? (
          <Sider
            className={stl.sider}
            collapsed={collapsed}
            onCollapse={handleCollapse}
          />
        ) : undefined}
        <Content className={stl.content}>{children}</Content>
      </Layout>
      <Footer className={stl.footer} />
    </Layout>
  );
};

export default LayoutWrapper;
