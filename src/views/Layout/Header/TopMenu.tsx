import { Menu } from "antd";
import cls, { Argument } from "classnames";
import { useEffect, useState } from "react";
import { types, useForceUpdate } from "@think/components";
import { headerHeight } from "../config";
import { useCustomMenus, useMatchMenuKeys } from "../hooks";
import { defaultTopMenus } from "../menus";
import { MenuItem } from "../utils";
import stl from "./index.module.less";

export type TopMenuProps = {
  className?: Argument;
};

const TopMenu = (props: TopMenuProps) => {
  const { className } = props;
  const [forceKey, forceUpdate] = useForceUpdate();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>(defaultTopMenus);

  const matchMenuKeys = useMatchMenuKeys();
  const customMenus = useCustomMenus("top");

  // 从路由推导菜单 key
  useEffect(() => {
    setSelectedKeys(matchMenuKeys);
  }, [matchMenuKeys]);

  // 自定义路由菜单
  useEffect(() => {
    let list = customMenus.length ? customMenus : defaultTopMenus;
    list = list.filter(types.truthy);

    setMenus(list);
    forceUpdate();
  }, [customMenus, forceUpdate]);

  if (!menus.length) {
    return null;
  }

  return (
    <Menu
      key={forceKey}
      className={cls(stl.topMenu, className)}
      style={{
        lineHeight: `${headerHeight}px`,
      }}
      theme="dark"
      mode="horizontal"
      selectedKeys={selectedKeys}
      onClick={(keys: any) => {
        setSelectedKeys(keys);
      }}
      items={menus}
    />
  );
};

export default TopMenu;
