import { useEffect } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { usePolymericState } from "@think/meta-utils";
import { NamedLink } from "@think/router-utils";
import { useRegisterCustomMenus } from "@/views/bizCommon/common";
import type { MenuItem } from "@/views/Layout/utils";

const ProjectDetailWrapper = ({ children }: any) => {
  const { workspacePath, projectPath } = usePolymericState();
  const registerCustomMenus = useRegisterCustomMenus();

  useEffect(() => {
    if (!(workspacePath && projectPath)) {
      return;
    }

    const menus: MenuItem[] = [
      {
        key: "example",
        icon: <AppstoreOutlined />,
        label: (
          <NamedLink name="example" params={{ workspacePath, projectPath }}>
            示例
          </NamedLink>
        ),
      },
    ];

    return registerCustomMenus?.(menus);
  }, [projectPath, registerCustomMenus, workspacePath]);

  return children;
};

export default ProjectDetailWrapper;
