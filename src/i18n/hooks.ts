import { useIntl } from "react-intl";

/**
 * 获取国际化文案
 */
export const useIntlMessage = () => {
  const intl = useIntl();
  return (id: string) => intl.formatMessage({ id });
};
