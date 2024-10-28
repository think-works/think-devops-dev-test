import { Result } from "antd";
import cls from "classnames";
import stl from "./index.module.less";

const License = () => {
  return (
    <div className={cls(stl.license)}>
      <Result status="403" title="尚未导入许可证或许可证已过期" />
    </div>
  );
};

export default License;
