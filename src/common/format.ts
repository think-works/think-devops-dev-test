import { isNumber } from "lodash-es";
import { human, tools } from "@think/components";

/**
 * 秒级精确度的格式化字符串
 */
export const secondFormatString = "YYYY-MM-DD HH:mm:ss";

/**
 * 毫秒级精确度的格式化字符串
 */
export const millisecondFormatString = "YYYY-MM-DD HH:mm:ss.SSS";

/**
 * 格式化毫秒时间(秒级精确度)
 */
export const formatSecond = (millisecond: number, placeholder: any = "-") => {
  if (!isNumber(millisecond)) {
    return placeholder;
  }

  return tools.msecToString(millisecond, secondFormatString);
};

/**
 * 格式化毫秒时间(毫秒级精确度)
 */
export const formatMillisecond = (
  millisecond: number,
  placeholder: any = "-",
) => {
  if (!isNumber(millisecond)) {
    return placeholder;
  }

  return tools.msecToString(millisecond, millisecondFormatString);
};

/**
 * 格式化微秒时间(毫秒级精确度)
 */
export const formatMicrosecond = (
  microsecond: number,
  placeholder: any = "-",
) => {
  if (!isNumber(microsecond)) {
    return placeholder;
  }

  return formatMillisecond(microsecond / 1000);
};

/**
 * 千分位分割毫秒时间间隔(自适应小数位精度)
 */
export const separatorMillisecond = (
  millisecond: number,
  placeholder: any = "-",
) => {
  if (!isNumber(millisecond)) {
    return placeholder;
  }

  let len = 0;
  if (millisecond === 0) {
    len = 0;
  } else if (millisecond < 1) {
    len = 3;
  } else if (millisecond < 10) {
    len = 2;
  } else if (millisecond < 100) {
    len = 1;
  }

  return human.separator(millisecond, len);
};

/**
 * 千分位分割微秒时间间隔(自适应小数位精度)
 */
export const separatorMicrosecond = (
  microsecond: number,
  placeholder: any = "-",
) => {
  if (!isNumber(microsecond)) {
    return placeholder;
  }

  return separatorMillisecond(microsecond / 1000);
};

/**
 * 千分位分割数值
 */
export const separatorNumber = (
  num: number,
  len: number = 0,
  placeholder: any = "-",
) => {
  if (!isNumber(num)) {
    return placeholder;
  }

  return human.separator(num, len);
};

/**
 * 格式化毫秒时间间隔(自适应最小单位位)
 */
export const formatTimespan = (millisecond: number) => {
  if (millisecond < 1000) {
    return human.timespan(millisecond);
  }

  return human.timespan(millisecond, { S: false });
};
