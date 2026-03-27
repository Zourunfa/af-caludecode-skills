---
name: slides-generator
description: 使用 React + Tailwind CSS 生成交互式演示文稿幻灯片。触发关键词："slides", "presentation", "PPT", "ppt", "demo", "benchmark", "deck", "slideshow", "演讲稿", "演示文稿", "幻灯片"
---

# 生成演示文稿幻灯片

你是 slides-generator 技能。根据指定的参数生成完整的 React + Vite + Tailwind CSS 演示文稿项目。

## 输入参数

从用户请求中提取以下参数：
- `title`：演示文稿标题（必填）
- `slides`：要生成的幻灯片数量（默认：5）
- `theme`：主题选择 - modern（现代）、minimalist（简约）、dark（深色）、colorful（彩色）（默认：modern）
- `author`：作者姓名（可选）

## 主题定义

### 现代主题
- 背景：柔和渐变 (linear-gradient(135deg, #667eea 0%, #764ba2 100%))
- 文字：白色 (#ffffff)
- 强调色：浅紫色 (#a78bfa)
- 字体：Inter/system-ui
- 风格：现代风格，带柔和阴影和圆角

### 简约主题
- 背景：灰白色 (#fafafa)
- 文字：深灰色 (#1a202c)
- 强调色：浅蓝色 (#3182ce)
- 字体：简洁无衬线字体
- 风格：大量留白，最少元素

### 深色主题
- 背景：深灰/黑色 (#1a1a1a)
- 文字：浅灰色 (#e0e0e0)
- 强调色：青色 (#00d4ff)
- 字体：系统字体
- 风格：深色模式优化，高对比度

### 彩色主题
- 背景：鲜艳渐变 (linear-gradient(135deg, #f093fb 0%, #f5576c 100%))
- 文字：白色 (#ffffff)
- 强调色：亮黄色 (#fbbf24)
- 字体：粗体无衬线字体
- 风格：充满活力，创意布局

### 科技主题（新增 - 用于架构图）
- 背景：深科技渐变 (linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%))
- 文字：白色 (#ffffff)
- 强调色：霓虹青色 (#00f5ff) 和 电光紫色 (#b026ff)
- 字体：代码使用 JetBrains Mono / Consolas，文本使用 system-ui
- 风格：高科技感，发光效果、网格图案和动画连接
- 特殊功能：电路图案、粒子效果、全息元素

## 动画与图形增强

### 必需的动画库

生成包含架构图、数据可视化或复杂概念的幻灯片时，**必须**在 `package.json` 中包含这些库：

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.344.0",
    "react-flow-renderer": "^10.3.17",
    "recharts": "^2.12.0",
    "@react-three/fiber": "^8.16.0",
    "@react-three/drei": "^9.105.0",
    "three": "^0.163.0"
  }
}
```

### 动画优先级规则

**何时使用动画：**
1. **架构图**（始终使用动画）
   - 节点顺序出现动画
   - 连线逐步绘制
   - 悬停效果显示组件详情
   - 复杂图表的交互式平移/缩放
   - 使用 `framer-motion` 做布局动画 + `react-flow-renderer` 做节点图

2. **数据可视化**（始终使用动画）
   - 使用 `recharts` 的动画图表（柱状图、折线图、饼图）
   - 统计数字计数动画
   - 进入时填充的进度条
   - 交错列表项显示

3. **概念图解**（高优先级）
   - 使用 `framer-motion` 的 2D 流程动画
   - 使用 `@react-three/fiber` 的 3D 空间概念模型
   - 抽象概念的粒子效果
   - 转换概念的变形动画

4. **要点列表**（中等优先级）
   - 交错淡入（项目间延迟 100ms）
   - 从左/右滑入
   - 悬停缩放动画

### 架构图组件

**必须为架构幻灯片创建这些组件：**

1. **AnimatedFlowDiagram.jsx**
   - 使用 `react-flow-renderer` 创建基于节点的图表
   - 从源到目标的动画边线
   - 带悬停详情的交互节点
   - 缩放/平移控制
   - 分层定位的自动布局

2. **AnimatedArchitecture.jsx**
   - 逐层显示（基础设施 → 服务 → 应用）
   - 层间动画连接线
   - 活动组件的发光脉冲效果
   - 带组件详情的悬停提示
   - 动画进入的图例

3. **DataFlowAnimation.jsx**
   - 通过连接流动的动画粒子
   - 数据类型的颜色编码
   - 演示节奏的速度控制
   - 持续流可视化的循环模式

### 3D 可视化组件

**用于空间或结构概念，使用 3D：**

1. **3DModelViewer.jsx** - 使用 `@react-three/fiber`
   - 交互式 3D 模型（拖动旋转）
   - 空闲时自动旋转
   - 动画进入（缩放 + 淡入）
   - 深度光照效果

2. **3DArchitecture.jsx** - 用于系统拓扑
   - 带深度层的 3D 节点图
   - 动画连接
   - 鼠标交互探索
   - 内部视图的剖面展示

### 动画时间指南

- **快速过渡**：150-300ms（悬停状态、微交互）
- **中速过渡**：300-500ms（幻灯片元素、标准显示）
- **慢速过渡**：500-1000ms（复杂图表、顺序构建）
- **交错延迟**：列表项之间 50-150ms
- **进入动画**：从顶部/底部或中心向外交错

### 高级动画模式

**用于专业、教育演示的这些模式：**

1. **渐进式显示** - 逐步显示信息
   ```jsx
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay: index * 0.1 }}
   >
     {content}
   </motion.div>
   ```

2. **路径绘制** - 逐步绘制线条/形状
   ```jsx
   <motion.path
     d={pathData}
     initial={{ pathLength: 0 }}
     animate={{ pathLength: 1 }}
     transition={{ duration: 2, ease: "easeInOut" }}
   />
   ```

3. **缩放与淡入** - 优雅的元素显示
   ```jsx
   initial={{ scale: 0.8, opacity: 0 }}
   animate={{ scale: 1, opacity: 1 }}
   transition={{ type: "spring", stiffness: 200 }}
   ```

4. **交错网格** - 波浪模式显示的卡片
   ```jsx
   const container = {
     hidden: { opacity: 0 },
     show: {
       opacity: 1,
       transition: { staggerChildren: 0.1 }
     }
   };
   ```

### 特定内容的动画规则

**不同幻灯片类型：**

- **标题幻灯片**：文字显示 + 柔和背景动画
- **架构图**：顺序节点显示 + 动画连接
- **数据幻灯片**：动画图表 + 计数数字
- **流程幻灯片**：带路径动画的分步进度
- **对比幻灯片**：分屏进入 + 同步显示
- **时间线幻灯片**：动画线绘制 + 里程碑弹出
- **总结幻灯片**：交错要点 + 高光动画

## 输出结构

创建一个基于标题（slugified）的新目录并生成：

### 1. package.json
```json
{
  "name": "<slugified-title>-slides",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.11"
  }
}
```

### 2. vite.config.js
带有 React 插件的标准 Vite 配置

### 3. tailwind.config.js
基于所选主题的颜色配置

### 4. postcss.config.js
带有 Tailwind 和 Autoprefixer 的标准 PostCSS 配置

### 5. index.html
HTML 入口点，包含 root div 和适当的 meta 标签

### 6. tsconfig.json（可选）
如果偏好 TypeScript 的 TypeScript 配置

### 7. src/main.jsx
React 入口点，将 App 挂载到 root

### 8. src/App.jsx
主应用组件，包含：
- 当前幻灯片索引的状态
- 带有请求数量的幻灯片数据数组
- 键盘事件处理器（箭头、空格、home、end、f 全屏）
- 幻灯片组件渲染

### 9. src/styles.css
全局样式，包含：
- Tailwind 导入
- 幻灯片过渡的自定义动画
- 响应式工具

### 10. src/components/Slide.jsx
单个幻灯片组件，包含：
- 标题和内容显示
- 要点列表支持
- 淡入动画
- 响应式布局

### 11. src/components/Slideshow.jsx
主幻灯片组件，包含：
- 幻灯片导航
- 进度指示器
- 主题应用
- 过渡动画

### 12. src/components/themes/<theme-name>.js
主题配置对象，包含颜色、字体和样式

## 幻灯片内容生成

根据标题生成有意义的幻灯片内容：

- **幻灯片 1**：带演示文稿标题和作者的标题幻灯片
- **幻灯片 2**：介绍/概述
- **中间幻灯片**：带要点的内容幻灯片
- **倒数第二**：总结/要点
- **最后一张**：谢谢 / 问答

每张幻灯片应该有：
- `id`：唯一标识符
- `title`：幻灯片标题
- `content`：主要内容段落
- `bullets`：3-5 个要点的数组（可选）

### 模板特定规则（react-tailwind 模板）

对于 react-tailwind 模板，遵循这些规则以防止内容截断：

- **每张幻灯片最多 4 个要点** — 如果需要超过 4 个要点，拆分成多张幻灯片
- **使用 space-y-3 或 space-y-4** — 永远不要使用 space-y-8（会导致内容溢出）
- **将内容包裹在 slide-content div 中** — 确保内容超出视口时可滚动
- **保持文字简洁** — 每个要点最多 80 个字符
- **使用适当的间距** — 标题幻灯片的作者使用 `mt-8`（不是 `mt-12`）

### 生成前检查清单（必须在编写代码前完成）

生成任何幻灯片代码之前，验证以下内容：

□ **要点数量 ≤ 4** — 如果超过 4 个要点，拆分成多张幻灯片
□ **使用 space-y-3 或 space-y-4** — 不是 space-y-8
□ **使用 slide-content 类包裹内容区域** — `<div className="slide-content flex-1 space-y-4">`
□ **文字简洁** — 每个要点最多 80 个字符
□ **内容布局使用 flex** — `<div className="max-w-5xl w-full h-full flex flex-col">`

## 实现说明

1. 从用户请求解析输入参数
2. 创建带有 slugified 标题的目录
3. 生成所有项目文件
4. 确保所有依赖都列在 package.json 中
5. 包含键盘导航（←→ 箭头、空格、Home、End、F 全屏）
6. 在幻灯片之间添加平滑的 CSS 过渡
7. 使其响应式（移动友好）
8. 包含显示当前幻灯片的进度指示器
9. 添加幻灯片计数器（例如，"3 / 10"）

## 代码质量

- 使用现代 React（hooks、函数组件）
- 遵循 React 最佳实践
- 使用 Tailwind 工具类
- 包含有用的注释
- 确保可访问性（ARIA 标签、键盘支持）
- 优化性能（适当位置使用 React.memo）

## 生成后

通知用户：
1. 项目已成功创建
2. 导航到目录：`cd <project-name>`
3. 安装依赖：`npm install`
4. 启动开发服务器：`npm run dev`
5. 在浏览器中打开 http://localhost:5173
6. 提及键盘导航快捷键

## 图标验证

**关键**：当调度子代理生成幻灯片时，你必须：

1. 从 references 目录读取 `icon-reference.md`
2. 在每个子代理提示中包含图标参考内容
3. 明确指示子代理**仅使用提供列表中的图标**
4. 需要避免的常见图标错误：
   - ❌ `TestRocket` → ✅ `Rocket` 或 `Flask`
   - ❌ 创建不存在的图标名称
   - ❌ 使用不在参考列表中的图标

**子代理提示必须包含**：
```
## 图标参考（重要：仅使用此列表中的图标）
[从 icon-reference.md 复制图标列表]
```

这可以防止导入错误，如 "does not provide an export named 'TestRocket'"。

### 内容验证脚本（可选）

对于使用 react-tailwind 模板的生成项目，包含一个验证脚本来检查常见内容问题：

```bash
cd <project-name>
node scripts/validate-slides.js
```

脚本检查：
- 每张幻灯片的要点数量（最多 4 个）
- 间距使用（不应该使用 space-y-8）
- 要点长度（最多 80 个字符）

示例输出：
```
✓ Slide 01: bullets count OK (0)
⚠ Slide 02: bullets count exceeds limit (6 > 4)
  Suggestion: Split into two slides
```

## 示例输出消息

```
✅ Presentation project created successfully!

📁 Location: ./my-presentation-slides

Next steps:
  cd my-presentation-slides
  npm install
  npm run dev

Keyboard shortcuts:
  ←/→ : Previous/Next slide
  Space: Next slide
  Home/End: First/Last slide
  F: Toggle fullscreen
```

## 重要：图标验证

生成幻灯片后，在启动开发服务器之前始终运行验证脚本：

```bash
node ../scripts/validate-icons.js src/slides/
```

这可以防止导入错误，如 "does not provide an export named 'TestRocket'"。

提供参数后开始生成。
