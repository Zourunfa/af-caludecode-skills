# /slides

生成完整的 React + Tailwind CSS 演示文稿项目。

## 使用方法

```
/slides title="演示文稿标题" slides=5 theme="modern" author="作者姓名"
```

## 参数说明

- `title`（必填）：演示文稿的标题
- `slides`（可选）：生成的幻灯片数量（默认：5）
- `theme`（可选）：主题 - modern、minimalist、dark、colorful（默认：modern）
- `author`（可选）：演示者/作者姓名

## 使用示例

```bash
# 基础演示文稿
/slides title="项目概览" slides=5

# 带主题和作者
/slides title="第四季度回顾" slides=8 theme="dark" author="王小明"

# 彩色主题演示文稿
/slides title="产品发布" slides=10 theme="colorful" author="营销团队"
```

## 生成内容

一个完整的 React + Vite + Tailwind 项目，包含：
- 响应式幻灯片布局
- 键盘导航
- 流畅动画
- 多种主题选项
- 进度指示器
- 全屏支持

## 生成后操作

```bash
cd <生成的项目>
npm install
npm run dev
```

打开 http://localhost:5173 查看您的演示文稿。
