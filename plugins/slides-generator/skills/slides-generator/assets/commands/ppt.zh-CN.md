# /ppt

/slides 的别名 - 生成完整的 React + Tailwind CSS 演示文稿项目。

## 使用方法

```
/ppt title="演示文稿标题" slides=5 theme="modern" author="作者姓名"
```

## 参数说明

- `title`（必填）：演示文稿的标题
- `slides`（可选）：生成的幻灯片数量（默认：5）
- `theme`（可选）：主题 - modern、minimalist、dark、colorful（默认：modern）
- `author`（可选）：演示者/作者姓名

## 使用示例

```bash
# 快速演示文稿
/ppt title="团队站会" slides=3

# 自定义主题
/ppt title="设计演示" slides=7 theme="colorful"

# 深色主题演示文稿
/ppt title="技术深度解析" slides=12 theme="dark" author="开发团队"
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

## 键盘控制

- **← / →**：上一张/下一张幻灯片
- **空格**：下一张幻灯片
- **Home / End**：第一张/最后一张幻灯片
- **F**：切换全屏
- **Esc**：退出全屏
