import { Tooltip } from "antd";
import cls, { Argument } from "classnames";
import { QuestionCircleOutlined, SettingOutlined } from "@ant-design/icons";
import {
  GotoDocsLink,
  LayoutView,
  PRESET_CODE_WORKSPACE_ADMIN,
  useAuthMatched,
} from "@think/meta-utils";
import { NamedLink } from "@think/router-utils";
import { productName } from "@/utils/config";
import { headerExtendClass } from "../utils";
import stl from "./index.module.less";
import TopMenu from "./TopMenu";

const { HeaderWrapper, WorkspaceWrapper } = LayoutView;

export type HeaderProps = {
  className?: Argument;
};

const Header = (props: HeaderProps) => {
  const { className } = props;

  const presetCodeWorkspaceAdmin = useAuthMatched([
    PRESET_CODE_WORKSPACE_ADMIN,
  ]);

  return (
    <HeaderWrapper
      className={cls(stl.header, className)}
      extend={
        <div className={stl.maximize}>
          <TopMenu />
          <div className={cls(stl.maximize, headerExtendClass)} />
        </div>
      }
      actionItems={[
        <WorkspaceWrapper key="workspace" />,
        presetCodeWorkspaceAdmin ? (
          <Tooltip key="setting" title="产品设置">
            <NamedLink name="setting">
              <SettingOutlined />
            </NamedLink>
          </Tooltip>
        ) : null,
        <Tooltip key="docs" title="产品文档">
          <GotoDocsLink productName={productName} target="_blank">
            <QuestionCircleOutlined />
          </GotoDocsLink>
        </Tooltip>,
      ]}
    />
  );
};

export default Header;
