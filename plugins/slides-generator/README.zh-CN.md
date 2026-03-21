# slides-generator 插件

使用 React + Tailwind CSS 生成交互式演示文稿幻灯片。此插件创建完整的、可用于生产的演示文稿项目，具有动画、响应式设计和键盘导航功能。

## 功能特性

- 🎨 **多种主题**：现代风格、简约、深色、彩色
- 📱 **响应式设计**：适配所有屏幕尺寸
- ⌨️ **键盘导航**：方向键、空格键和数字快捷键
- 🎭 **流畅动画**：幻灯片过渡和动画效果
- 🚀 **快速开发**：使用 Vite 热模块替换
- 🎯 **支持 TypeScript**：完整的 TypeScript 支持
- 📦 **零配置**：使用 Vite 构建优化

## 安装

通过 Claude Code 市场安装：

```bash
claude plugin install slides-generator
```

## 使用方法

### 斜杠命令

```bash
# 生成演示文稿
/slides title="我的演示文稿" slides=5 theme="modern"

# 使用 /ppt 别名
/ppt title="演示" slides=3 theme="dark"

# 带作者信息
/slides title="项目概览" slides=7 theme="colorful author="张三"
```

### 参数说明

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|-----------|------|----------|---------|-------------|
| `title` | string | 是 | - | 演示文稿标题 |
| `slides` | number | 否 | 5 | 生成的幻灯片数量 |
| `theme` | string | 否 | modern | 主题：modern、minimalist、dark、colorful |
| `author` | string | 否 | - | 演示文稿作者姓名 |

### 主题介绍

#### 现代风格 (Modern)
简洁、现代的设计，带有微妙的渐变和流畅的动画。

#### 简约风格 (Minimalist)
简单、优雅的设计，大量留白，最少干扰元素。

#### 深色模式 (Dark)
深色背景配浅色文字，适合弱光环境。

#### 彩色风格 (Colorful)
鲜艳的色彩和创意布局，打造引人入胜的演示。

## 生成项目结构

```
generated-slides/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── tsconfig.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    └── components/
        ├── Slide.jsx
        ├── Slideshow.jsx
        └── themes/
            ├── modern.js
            ├── minimalist.js
            ├── dark.js
            └── colorful.js
```

## 开发

生成后，导航到项目目录：

```bash
cd generated-slides

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 键盘控制

运行后，使用以下键盘快捷键：

- **← / →**：上一张/下一张幻灯片
- **↑ / ↓**：跳转到第一张/最后一张幻灯片
- **空格**：下一张幻灯片
- **Home**：第一张幻灯片
- **End**：最后一张幻灯片
- **F**：全屏模式
- **Esc**：退出全屏

## 自定义

### 添加新幻灯片

编辑 `src/App.jsx` 并添加到 `slides` 数组：

```jsx
const slides = [
  // ... 现有幻灯片
  {
    id: 6,
    title: "新幻灯片",
    content: "您的内容在这里",
    bullets: ["要点 1", "要点 2"]
  }
];
```

### 创建自定义主题

在 `src/components/themes/` 中添加新主题文件：

```js
export const customTheme = {
  background: "linear-gradient(135deg, #your-colors)",
  text: "#your-text-color",
  accent: "#your-accent-color",
  // ... 更多样式
};
```

### 修改动画

编辑 `src/components/Slideshow.jsx` 或 `src/styles.css` 中的过渡样式。

## 使用示例

### 技术演示

```bash
/slides title="架构概览" slides=8 theme="dark" author="技术团队"
```

### 设计展示

```bash
/slides title="作品集 2026" slides=10 theme="modern" author="设计师"
```

### 快速状态更新

```bash
/ppt title="每周站会" slides=3 theme="minimalist"
```

## 故障排除

### 端口被占用

如果端口 5173 被占用，Vite 将自动尝试下一个可用端口。

### 模块未找到

确保在生成项目后运行 `npm install`。

### 样式问题

清除浏览器缓存或尝试隐身模式以确保 CSS 加载最新。

## 许可证

MIT 许可证 - 详见根仓库中的 LICENSE 文件。

## 贡献

欢迎贡献！请在主仓库提交 issue 或 PR。

## 链接

- [主仓库](https://github.com/<your-username>/af-claudecode-skill)
- [插件文档](https://github.com/<your-username>/af-claudecode-skill/tree/main/plugins/slides-generator)
- [问题反馈](https://github.com/<your-username>/af-claudecode-skill/issues)
