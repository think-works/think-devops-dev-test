# think-devops-dev-test
123
脚手架-前端应用

请按需修改：

- `package.json` 中的 `name` 字段
- `.env` 中的 `VITE_PRODUCT_NAME` 配置

# 目录说明

```
├── mock # 接口模拟
├── public # 公共资源
├── src
│   ├── api # 接口定义
│   ├── assets # 静态资源
│   ├── common # 业务相关辅助函数
│   ├── components # 公共组件
│   ├── context # 状态配置
│   ├── i18n # 国际化配置
│   ├── router # 路由配置
│   ├── styles # 全局样式和辅助
│   ├── utils # 业务无关辅助函数
│   ├── views # 页面视图
│   │    └── bizCommon # 业务组件
│   ├── App.tsx # 应用初始化
│   ├── env.d.ts # 类型拓展
│   ├── global.ts # 全局定义
│   └── main.tsx # 编译入口
├── .browserslistrc # 兼容性配置
├── .env 环境配置
├── index.html # 页面模板
├── post-build.sh # 后置脚本
├── tsconfig.json # TS 配置
├── vite.config.js # Vite 配置
└── vite.proxy.js # Vite 代理
```

# 专有名词

`Platform` 平台 - 包含公司所有产品的集合
`Product` 产品 - 压测/自动化等具体的系统
`Workspace` 工作空间 - 跨产品的租户纬度隔离
`Project` 项目 - 跨产品的业务纬度隔离

# 路由结构

```
/productName/workspace/:workspacePath/project/:projectPath/*
^           ^^        ^              ^       ^            ^^
|           ||        |              |       |            ||- 项目详情下的业务路由
|           ||        |              |       |            |- 项目详情路由扩展点
|           ||        |              |       |- 项目路由扩展点
|           ||        |              |- 工作空间详情路由扩展点(单工作空间模式不可见)
|           ||        |- 工作空间路由扩展点(单工作空间模式不可见)
|           ||- 布局路由扩展点
|           |— 根路由扩展点
|- 产品部署路径(meta 不可见)
```

# 常用命令

开发服务

```
npm run serve
```

打包构建

```
npm run build
```

生成压缩包

```
sh -eux post-build.sh
```

# 环境配置

`.env` 通用配置
`.env.local` 本地配置(不纳入版本管理)
`.env.development` 开发配置
`.env.production` 打包配置
