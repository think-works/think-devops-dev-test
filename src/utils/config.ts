const NODE_ENV = process.env.NODE_ENV;
const APP_NAME = String(import.meta.env.VITE_APP_NAME || "APP");
const APP_VERSION = String(import.meta.env.VITE_APP_VERSION || "0.0.0");
const PRODUCT_NAME = String(import.meta.env.VITE_PRODUCT_NAME || "");
const DEPLOY_BASE = String(import.meta.env.VITE_DEPLOY_BASE || "/");
const API_BASE = String(import.meta.env.VITE_API_BASE || "/");
const ROUTE_BASE = String(import.meta.env.VITE_ROUTE_BASE || "/");
const ROUTE_MODE = String(import.meta.env.VITE_ROUTE_MODE || "history");

/**
 * 生产模式
 */
export const isProd = NODE_ENV === "production";

/**
 * 应用名称
 */
export const appName = APP_NAME;

/**
 * 应用版本
 */
export const appVersion = APP_VERSION;

/**
 * KEY 前缀
 */
export const keyPrefix = APP_NAME.replaceAll("@", "").replaceAll("/", "_");

/**
 * 产品名称
 */
export const productName = PRODUCT_NAME;

/**
 * 部署路径
 */
export const deployBase = DEPLOY_BASE.endsWith("/")
  ? DEPLOY_BASE
  : `${DEPLOY_BASE}/`;

/**
 * API 基础路径
 */
export const apiBase = API_BASE.endsWith("/") ? API_BASE : `${API_BASE}/`;

/**
 * 路由基础路径
 */
export const routeBase = ROUTE_BASE;

/**
 * 路由模式
 */
export const routeMode: "history" | "hash" = ["history", "hash"].includes(
  ROUTE_MODE,
)
  ? ROUTE_MODE
  : ("history" as any);
