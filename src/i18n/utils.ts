import { keyPrefix } from "@/utils/config";

/**
 * LocalStorage 前缀
 */
export const localStoragePrefix = `${keyPrefix}_i18n`;

/**
 * 加载语言资源
 */
export const loadI18nMessage = async (locale: string) => {
  // 异步加载
  const message = await import(`./locale/${locale}.ts`);
  return message.default;
};

/**
 * 设置环境语言
 */
export const setI18nLanguage = (locale: string) => {
  // 页面语言
  if (window.document) {
    document.querySelector("html")?.setAttribute("lang", locale);
  }

  // 持久化存储
  if (window.localStorage) {
    localStorage.setItem(localStoragePrefix, locale);
  }
};

/**
 * 侦测环境语言
 */
export const detectI18nLanguage = () => {
  let locale;

  // 持久化存储
  if (!locale && window.localStorage) {
    locale = localStorage.getItem(localStoragePrefix);
  }

  // 页面语言
  if (!locale && window.document) {
    locale = document.querySelector("html")?.getAttribute("lang");
  }

  // 浏览器语言
  if (!locale && window.navigator) {
    locale = navigator.language;
  }

  return locale;
};

/**
 * 修正语言格式
 */
export const normalizeI18nLanguage = (
  supportList: string[],
  locale: string,
) => {
  const supportLocale = supportList.find((item) => {
    const _item = item.toLowerCase();
    const _locale = locale.toLowerCase();

    // 完全匹配
    let exist = _item === _locale;

    if (!exist) {
      // 部分匹配
      const itemArr = _item.split("-");
      const localeArr = _locale.split("-");

      if (itemArr[0] === localeArr[0]) {
        // 第一位相同
        if (itemArr.length === 1 || localeArr.length === 1) {
          // 没有第二位
          exist = true;
        } else if (itemArr[1] === localeArr[1]) {
          // 第二位相同
          exist = true;
        }
      }
    }

    return exist;
  });

  return supportLocale;
};
