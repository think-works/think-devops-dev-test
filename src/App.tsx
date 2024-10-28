import { App as AntdApp, ConfigProvider } from "antd";
import dayjs from "dayjs";
import { StrictMode, useEffect, useState } from "react";
import { IntlProvider, useIntl } from "react-intl";
import { theme } from "@think/components";
import { AppRootProvider, ErrorBoundary } from "@think/meta-utils";
import { ProductProvider, useProductContext } from "@/context/product";
import { defaultLocale, getLocale, getMessage, loadMessage } from "@/i18n";
import {
  layoutRouteExtend,
  LayoutWrapper,
  rootRouteExtend,
} from "@/router/routes/basic";
import {
  getProjectDetailRouteExtend,
  ProjectDetailWrapper,
  projectRouteExtend,
} from "@/router/routes/project";
import {
  workspaceDetailRouteExtend,
  workspaceRouteExtend,
} from "@/router/routes/workspace";
import "@/styles/index.less";
import { productName, routeBase, routeMode } from "@/utils/config";

const AppConfigProvider = ({ children }: any) => {
  const { messages } = useIntl();
  const { antdLocale } = messages || {};

  return (
    <ConfigProvider
      {...theme.defaultConfigProviderProps}
      locale={antdLocale as any}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
};

const AppIntlProvider = ({ children }: any) => {
  const { configuration, setConfiguration } = useProductContext();
  const { i18nLanguage: locale } = configuration || {};
  const [message, setMessage] = useState(getMessage(locale));

  // 语言修正
  useEffect(() => {
    const lang = getLocale();
    // 状态与环境不一致
    if (locale !== lang) {
      // 修改状态
      setConfiguration?.((prevState) => ({
        ...prevState,
        i18nLanguage: lang,
      }));
    }
  }, [locale, setConfiguration]);

  // 语言资源
  useEffect(() => {
    const msg = getMessage(locale);
    // 资源与语言不一致
    if (!msg || message !== msg) {
      // 加载资源
      loadMessage(locale).then(setMessage);
    } else {
      // 时间格式
      dayjs.locale(locale);
    }
  }, [locale, message]);

  return (
    <IntlProvider
      key={locale}
      locale={locale || defaultLocale}
      defaultLocale={defaultLocale}
      messages={message}
    >
      {children}
    </IntlProvider>
  );
};

const RouterProviderWrapper = ({ children }: any) => {
  return (
    <ProductProvider>
      <AppIntlProvider>
        <AppConfigProvider>{children}</AppConfigProvider>
      </AppIntlProvider>
    </ProductProvider>
  );
};

const App = () => {
  /**
   * 严格模式下 useEffect 重复触发
   * https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-effects-in-development
   */
  return (
    <StrictMode>
      <ErrorBoundary>
        <AppRootProvider
          projectAutoJump
          productName={productName}
          routeBase={routeBase}
          routeMode={routeMode}
          RouterProviderWrapper={RouterProviderWrapper}
          LayoutWrapper={LayoutWrapper}
          ProjectDetailWrapper={ProjectDetailWrapper}
          rootExtend={rootRouteExtend}
          layoutExtend={layoutRouteExtend}
          workspaceExtend={workspaceRouteExtend}
          workspaceDetailExtend={workspaceDetailRouteExtend}
          projectExtend={projectRouteExtend}
          projectDetailExtend={getProjectDetailRouteExtend}
        />
      </ErrorBoundary>
    </StrictMode>
  );
};

export default App;
