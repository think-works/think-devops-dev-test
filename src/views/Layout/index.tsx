import { Outlet } from "react-router";
import LayoutWrapper from "./Wrapper";

const AppLayout = () => {
  return (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  );
};

export default AppLayout;
