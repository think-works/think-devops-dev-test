import { useEffect } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { usePolymericState } from "@think/meta-utils";
import { NamedLink } from "@think/router-utils";
import { useRegisterCustomMenus } from "@/views/bizCommon/common";
import type { MenuItem } from "@/views/Layout/utils";
import stl from "./index.module.less";

const Setting = () => {
  const { workspacePath } = usePolymericState();
  const registerCustomMenus = useRegisterCustomMenus();

  useEffect(() => {
    if (!workspacePath) {
      return;
    }

    const menus: MenuItem[] = [
      {
        key: "setting",
        icon: <SettingOutlined />,
        label: (
          <NamedLink name="setting" params={{ workspacePath }}>
            产品设置
          </NamedLink>
        ),
      },
    ];

    return registerCustomMenus?.(menus);
  }, [registerCustomMenus, workspacePath]);

  return <div className={stl.setting}>Setting</div>;
};

export default Setting;
