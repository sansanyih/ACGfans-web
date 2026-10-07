# ACGfans · 动漫信息聚合与社区平台（前端）

基于 **Vue 3 + TypeScript + Vite** 的动漫（ACG）信息聚合与社区平台前端。把原本分散在多个站点的番剧信息、文章、视频、周报和角色资料聚合到一处，并提供评分、留言、协同编辑等内容生产与互动能力。

<!-- 部署后把在线地址填在这里，简历上直接用这个链接 -->
<!-- 🔗 在线预览：https://xxx.vercel.app -->

## <!-- ![首页](./docs/screenshot-home.png) -->

## 目录

- [功能模块](#功能模块)
- [技术栈](#技术栈)
- [目录结构](#目录结构)
- [快速开始](#快速开始)
- [核心实现](#核心实现)
- [开发脚本](#开发脚本)
- [待完善](#待完善)
- [说明](#说明)

---

## 功能模块

### 首页信息聚合

首页由 13 个内容分区组件组成，各分区独立请求、独立渲染，互不阻塞：
| 分区 | 说明 |
| --- | --- |
| `Carousel` | 顶部轮播 |
| `RandomRecommend` | 随机推荐番剧 |
| `LatestAnimation` | 最新番剧 |
| `UpcomingAnimation` | 即将开播 |
| `LatestFeed` | 最新动态 |
| `WeeklyReport` | 周报 |
| `LatesArticles` | 最新文章 |
| `LatestVideo` | 最新视频 |
| `CharacterBirthday` | 今日角色生日 |
| `AnnouncementSection` | 站点公告 |
| `RecentEdit` | 最近编辑（协同编辑动态） |
| `Link` / `CommunityLinks` | 友情链接与社区入口 |

### 番剧详情

- 封面 + 中/日文标题 + 标签 + 制作公司 + 简介的首屏信息区
- **六维雷达评分**：音乐、美术、剧本、演出、程序、配音（ECharts radar）
- 游玩记录 / 长评列表，含用户头像、总评与星级
- 留言板：未登录展示登录引导，登录后可发表评论
- 侧边栏基础信息卡（原作、监督、系列构成、人物设计、音乐、制作公司、集数、开播与更新日）与登场角色（含 CV）、官网外链

### 其他页面

- **番剧编辑**（`AnimeEdit`）：条目信息的在线编辑与提交
- **详情页**：文章详情、视频详情、周报详情
- **讨论区**（`Discuss`）、**分享页**（`Share`）、**登录**（`login`）
- **主题切换**：亮色 / 暗色，状态持久化
- **错误页**：403 / 404 / 500

---

## 技术栈

| 分类       | 选型                                                                                 |
| ---------- | ------------------------------------------------------------------------------------ |
| 核心框架   | Vue 3.5（`<script setup>` 组合式 API）、TypeScript 5.9                               |
| 构建工具   | Vite 7（`@vitejs/plugin-vue`、`@vitejs/plugin-vue-jsx`、`vite-plugin-vue-devtools`） |
| 路由与状态 | Vue Router 5（懒加载 + 模块化自动注册）、Pinia 3                                     |
| UI 与可视化| Element Plus 2.13 + `@element-plus/icons-vue`、ECharts 6                             |
| 请求与工具 | Axios 1.14（自定义封装）、qs、dayjs                                                  |
| 样式       | Sass（`variables.scss` 通过 Vite 自动注入）                                          |
| 代码质量   | ESLint 9 + oxlint + Prettier、`vue-tsc` 类型检查                                     |
| 测试       | Vitest（单元）、Playwright（E2E）                                                    |
| 运行时要求 | `node ^20.19.0 \|\| >=22.12.0`                                                       |

---

## 目录结构

```
src/
├─ api/
│  ├─ index.ts              # HttpClient 封装：拦截器、Token 注入、错误处理、重复请求取消
│  ├─ helper/
│  │  └─ axiosCancel.ts     # 基于 Map 的重复请求取消器
│  └─ modules/              # 按业务域拆分，每个域三个文件
│     └─ anime/
│        ├─ index.ts        # 请求方法
│        ├─ interface.ts    # 请求/响应类型
│        └─ urls.const.ts   # 接口地址常量
├─ routers/
│  ├─ router.ts             # 扫描 modules 自动收集路由
│  └─ modules/              # home / anime / video / discuss / share / login
├─ stores/                  # Pinia：user、theme、counter
├─ layout/                  # Layout 容器 + Header（含 Button/Icon/Tab）+ Footer
├─ view/                    # 页面级组件
│  ├─ Home/                 # 首页及其 13 个分区子组件
│  ├─ AnimeDetail/ AnimeEdit/
│  ├─ ArticleDetail/ VideoDetail/ WeeklyDetail/
│  ├─ Discuss/ Share/ login/ Search/ error/
├─ components/              # 通用组件：ComicCard、ContentCardSlider、DiscussCard…
├─ styles/                  # variables / reset / common
├─ utils/                   # getEnv（环境变量包装）、format、judge
└─ typings/                 # 全局类型声明
```

---

## 快速开始

### 1. 安装依赖

```sh
npm install
```

### 2. 配置环境变量

在根目录创建 `.env`：

```ini
# 前端请求前缀（走 Vite 代理）
VITE_API_BASE_URL=/api
# 本地后端服务地址
VITE_PROXY_TARGET=http://localhost:8080
```

开发环境下，`/api` 的请求会被 Vite 代理到 `VITE_PROXY_TARGET`（见 `vite.config.ts`），因此**需要先启动后端服务**（本项目仅包含前端，后端为独立服务）。

### 3. 启动开发服务器

```sh
npm run dev
```

### 4. 类型检查与构建

```sh
npm run build
```

---

## 核心实现

### 1. 请求层：`HttpClient` + 重复请求取消

`src/api/index.ts` 封装了一个 `HttpClient` 类并以单例导出，统一处理全部请求：

- **请求拦截**：注入 `Authorization: Bearer <token>`，并把请求登记到取消器
- **响应拦截**：直接返回 `response.data`，业务层无需再 `.data`
- **错误处理**：401 清除 Token 并跳转登录页；403 / 404 / 500 与网络异常分别处理
- **重复请求取消**：`AxiosCanceler` 以 `method + url + params + data` 序列化为 key，
  存入 `Map<string, Canceler>`；同一请求再次发起前会先取消上一次，**避免快速切换页面/重复点击时的竞态与响应覆盖**

### 2. 路由自动注册

`src/routers/router.ts` 用 `import.meta.glob('./modules/*.ts', { eager: true })` 扫描路由模块目录并自动收集，
新增一个业务模块只需在 `modules/` 下新建文件，无需改动入口文件；页面组件统一使用 `() => import()` 懒加载。

### 3. 六维雷达评分（ECharts）

番剧详情页把用户评分拆成 **音乐 / 美术 / 剧本 / 演出 / 程序 / 配音** 六个维度，
用 ECharts radar 绘制雷达图（`echarts.init` + `setOption`），配合下方的评分卡与星级展示。

### 4. 主题切换（Pinia + `data-theme`）

`src/stores/theme.ts` 用 Pinia 管理亮/暗主题：初始值从 `localStorage` 读取，
通过 `watch` 在 `<html>` 上增删 `data-theme="dark"` 属性并回写 `localStorage`，
样式侧只需基于该属性覆盖 CSS 变量即可。

### 5. API 模块化组织

每个业务域一个目录（`index.ts` / `interface.ts` / `urls.const.ts`），
接口地址集中为常量、类型与请求方法就近维护，避免 URL 和类型散落在页面里。

### 6. 首页分区组件化

首页把不同内容形态拆成 13 个独立分区组件并各自动请求，任一区块接口异常不会拖垮整页；
布局容器（`layout/`）与页面内容分离，Header/Footer 全局复用。

---

## 开发脚本

| 命令                 | 说明                                                     |
| -------------------- | -------------------------------------------------------- |
| `npm run dev`        | 启动开发服务器（热更新）                                 |
| `npm run build`      | 并行执行类型检查与生产构建                               |
| `npm run preview`    | 本地预览构建产物                                         |
| `npm run type-check` | `vue-tsc` 类型检查                                       |
| `npm run test:unit`  | Vitest 单元测试                                          |
| `npm run test:e2e`   | Playwright 端到端测试（首次需 `npx playwright install`） |
| `npm run lint`       | oxlint + ESLint 检查并自动修复                           |
| `npm run format`     | Prettier 格式化 `src/`                                   |

---

## 待完善

- **搜索页**：`src/view/Search/index.vue` 目前仍是占位页面，搜索能力待接入
- **部分通用组件**：`components/DiscussCard` 为空占位
- **测试覆盖**：目前仅保留脚手架自带的示例用例，待补充业务用例
- **统计图表**：`api/modules/statistics` 已就绪，运营数据看板待完善
- **工程化**：尚未接入 CI/CD 与自动化部署

---

## 说明

- 本仓库为**前端**部分，后端服务（提供 `/anime`、`/article`、`/video`、`/weekly`、`/character` 等接口）为独立仓库。
- 接口约定：统一响应结构 `{ code, message, data }`。

```sh
npm run lint
```
