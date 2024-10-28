import { enums } from "@think/components";

export const UserLevel = enums.defEnumMap([
  {
    key: "root",
    value: 1,
    label: "超级管理员",
  },
  {
    key: "admin",
    value: 2,
    label: "管理员",
  },
  {
    key: "normal",
    value: 3,
    label: "用户",
  },
] as const);

export const UserStatus = enums.defEnumMap([
  {
    key: "disabled",
    value: 0,
    label: "禁用",
    color: "#00000040",
  },
  {
    key: "enabled",
    value: 1,
    label: "启用",
    color: "#52c41a",
  },
] as const);
