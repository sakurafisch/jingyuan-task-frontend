# jingyuan-task-frontend

## 项目描述

这是静远实习任务的前端

选题情况：沈阳换热站供暖总览系统 B/S架构

## 开发日志

### 2020年9月24日

使用模板构建 `React` 环境，整理项目配置

### 2020年9月25日

开发 `login` 模块及其子模块

### 2020年10月8日

引入 `echarts` ，用于做柱状图和折线图

```bash
yarn
yarn add echarts --save
```

删除 `package-lock.json` 以避免使用 `npm`

做了一下首页的 `SideBar`

### 2020年10月9日早上

整理了一下首页的代码

登录功能勉强能用

### 2020年10月9日下午

引入 `ali-react-table` ，用于做表格

```bash
yarn add ali-react-table
```

清理 `echarts` ，因为有更好的候选方案。

```bash
yarn remove echarts
```

之后可能会用 [antd-chart](https://charts.ant.design/demos/column/#%E5%9F%BA%E7%A1%80%E6%9F%B1%E7%8A%B6%E5%9B%BE) 来绘制柱状图和折线图。

### 2020年10月9日晚上

表格已经可用。接下来准备做柱状图和折线图了。

## 模板

built by [DangoSky/react-scaffold-template](https://github.com/DangoSky/react-scaffold-template)