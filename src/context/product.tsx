import { isEqual } from "lodash-es";
import { createContext, useContext, useEffect, useState } from "react";
import { types } from "@think/components";
import {
  productContextConfigKey,
  queryLocal,
  updateLocal,
} from "@/common/utils";

// 优先使用本地缓存的产品配置
const localConfig = queryLocal<Configuration>(productContextConfigKey);
const updateConfig = (cfg: Configuration) =>
  updateLocal(productContextConfigKey, cfg);

const dftConfig = {
  i18nLanguage: localConfig?.i18nLanguage || "zh-CN",
};

export type Configuration = {
  /** 国际化语言 */
  i18nLanguage?: string;
};

export type ProductContextType = {
  /** 产品配置 */
  configuration?: Configuration;
  setConfiguration?: types.SetState<Configuration>;
};

/**
 * 产品上下文
 */
export const ProductContext = createContext<ProductContextType>({});

/**
 * 产品上下文 hook
 */
export const useProductContext = () => {
  const context = useContext(ProductContext);
  return context;
};

export type ProductProviderProps = {
  children?: React.ReactNode;
};

/**
 * 产品上下文 Provider
 */
export const ProductProvider = (props: ProductProviderProps) => {
  const { children } = props;

  const [configuration, setConfiguration] = useState<Configuration | undefined>(
    dftConfig,
  );
  const [context, setContext] = useState<ProductContextType>({});

  useEffect(() => {
    setContext({
      configuration,
      setConfiguration,
    });
  }, [configuration]);

  useEffect(() => {
    if (!isEqual(configuration, dftConfig)) {
      updateConfig(configuration || {});
    }
  }, [configuration]);

  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  );
};
