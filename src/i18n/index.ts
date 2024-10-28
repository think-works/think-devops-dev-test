import logger from "@/utils/logger";
import defaultMessage from "./locale/zh-CN";
import {
  detectI18nLanguage,
  loadI18nMessage,
  normalizeI18nLanguage,
  setI18nLanguage,
} from "./utils";

export type Message = Record<string, any>;

/**
 * 支持语言
 */
export const supportLocales: Record<string, string> = {
  "zh-CN": "简体中文",
  "en-US": "English",
};

/**
 * 默认语言
 */
export const defaultLocale = Object.keys(supportLocales)[0];

/**
 * 语言资源映射
 */
const messages: Record<string, Message> = {
  [defaultLocale]: defaultMessage, // 避免初始化闪烁
};

/**
 * 修正语言格式
 */
const getNormalizeLocale = (locale: string) => {
  const supportList = Object.keys(supportLocales);
  const normalizeLocale = normalizeI18nLanguage(supportList, locale);

  if (!normalizeLocale) {
    logger.warn(`Unsupported language: ${locale}`);
  }

  return normalizeLocale;
};
/**
 * 当前资源
 */
export const getMessage = (locale?: string) => {
  const _locale = (locale && getNormalizeLocale(locale)) || defaultLocale;
  return messages[_locale];
};

/**
 * 加载资源
 */
export const loadMessage = async (locale?: string) => {
  const _locale = (locale && getNormalizeLocale(locale)) || defaultLocale;
  const message = await loadI18nMessage(_locale);
  messages[_locale] = message;
  return message;
};

/**
 * 当前语言
 */
export const getLocale = () => {
  const locale = detectI18nLanguage();
  const _locale = (locale && getNormalizeLocale(locale)) || defaultLocale;
  return _locale;
};

/**
 * 设置语言
 */
export const setLocale = (locale?: string) => {
  const _locale = (locale && getNormalizeLocale(locale)) || defaultLocale;
  setI18nLanguage(_locale);
};
