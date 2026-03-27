# 高端幻灯片动画指南

## 动画库概览

本项目使用以下动画库创建高端、科普性的演示文稿：

### 核心库

1. **Framer Motion** - 主要动画库
   - 平滑的过渡动画
   - 手势支持（拖拽、悬停、点击）
   - 布局动画
   - 视差滚动效果

2. **React Flow** - 架构图动画
   - 节点图可视化
   - 动画连接线
   - 交互式节点
   - 缩放和平移控制

3. **Recharts** - 数据图表动画
   - 动画柱状图
   - 流畅的折线图
   - 交互式饼图
   - 自定义工具提示

4. **Lucide React** - 图标库
   - 1000+ 精美图标
   - 支持自定义样式
   - 动画支持

## 架构演示图最佳实践

### 1. 分层显示原则

```
推荐顺序：
基础设施层 → 服务层 → 应用层 → 展示层

每层之间添加 200-300ms 延迟，创造渐进式揭示效果
```

### 2. 连接线动画

```jsx
// 动画流动的连接线
<edge
  animated={true}
  style={{
    stroke: '#00f5ff',
    strokeWidth: 2,
    animation: 'dash 1s linear infinite'
  }}
/>
```

### 3. 节点悬停效果

```jsx
// 悬停时放大并显示阴影
whileHover={{
  scale: 1.1,
  boxShadow: '0 0 30px rgba(0, 245, 255, 0.5)'
}}
```

## 数据可视化动画

### 1. 图表入场动画

```jsx
// 图表从 0 增长到实际值
<Bar
  dataKey="value"
  animationDuration={1500}
  animationBegin={300}
/>
```

### 2. 数字计数动画

```jsx
// 数字从 0 滚动到目标值
const count = useCount(value, {
  duration: 2000,
  delay: 500
});
```

### 3. 渐进式显示

```jsx
// 数据点按顺序显示
const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
```

## 流程动画

### 1. 步骤指示器

```jsx
// 当前步骤高亮，其他步骤半透明
<motion.div
  animate={{
    opacity: isCurrent ? 1 : 0.5,
    scale: isCurrent ? 1.1 : 1
  }}
/>
```

### 2. 进度条动画

```jsx
// 进度条从左到右填充
<motion.div
  className="h-full bg-cyan-400"
  initial={{ width: 0 }}
  animate={{ width: `${progress}%` }}
  transition={{ duration: 1, ease: 'easeInOut' }}
/>
```

### 3. 粒子效果

```jsx
// 添加粒子动画增强视觉效果
{[...Array(20)].map((_, i) => (
  <motion.div
    key={i}
    animate={{
      x: [0, Math.random() * 200 - 100],
      y: [0, Math.random() * 100 - 50],
      opacity: [0, 1, 0]
    }}
    transition={{
      duration: Math.random() * 3 + 2,
      repeat: Infinity
    }}
  />
))}
```

## 主题配色

### Tech 主题（推荐用于架构图）

```js
const techColors = {
  primary: '#00f5ff',      // 霓虹青
  secondary: '#b026ff',    // 电光紫
  accent: '#00ff88',       // 亮绿
  background: '#0f0c29',   // 深空蓝
  card: '#1a1a2e',         // 卡片背景
  text: '#ffffff'          // 白色文本
};
```

### Modern 主题

```js
const modernColors = {
  primary: '#667eea',      // 紫蓝
  secondary: '#764ba2',    // 深紫
  accent: '#a78bfa',       // 浅紫
  background: '#f7fafc',   // 浅灰
  text: '#1a202c'          // 深灰文本
};
```

## 动画时机指南

| 动画类型 | 快速 (150-300ms) | 中等 (300-500ms) | 慢速 (500-1000ms) |
|---------|------------------|------------------|-------------------|
| 悬停效果 | ✅ | | |
| 点击反馈 | ✅ | | |
| 元素进入 | | ✅ | |
| 复杂图表 | | | ✅ |
| 架构图 | | | ✅ |
| 过渡动画 | | ✅ | |

## 性能优化

### 1. 使用 GPU 加速

```jsx
// 使用 transform 而不是 position
animate={{
  x: 100,        // ✅ GPU 加速
  translateY: 100 // ✅ GPU 加速
}}
```

### 2. 减少重绘

```jsx
// 使用 will-change
style={{ willChange: 'transform, opacity' }}
```

### 3. 懒加载动画

```jsx
// 仅在可见时触发动画
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
```

## 可访问性

### 1. 尊重用户偏好

```jsx
// 检测用户是否减少动画
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
```

### 2. 提供键盘导航

```jsx
// 确保所有交互元素可键盘访问
tabIndex={0}
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    // 触发动作
  }
}}
```

## 示例代码

### 完整的架构图组件

```jsx
import ReactFlow, { Background, Controls } from 'reactflow';
import { motion } from 'framer-motion';

const MyArchitecture = () => {
  return (
    <div className="w-full h-full">
      <ReactFlow nodes={nodes} edges={edges}>
        <Background color="#00f5ff" gap={16} />
        <Controls className="bg-slate-800" />
      </ReactFlow>

      <motion.div
        className="absolute top-4 right-4"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {/* 详情面板 */}
      </motion.div>
    </div>
  );
};
```

### 流程动画组件

```jsx
const ProcessFlow = ({ steps }) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          {step.icon}
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </motion.div>
      ))}
    </div>
  );
};
```

## 最佳实践总结

1. **动画目的** - 每个动画都应该有明确的目的（引导、强调、反馈）
2. **时机恰当** - 不要过度使用动画，保持专业感
3. **一致性** - 整个演示文稿使用一致的动画风格
4. **性能** - 优先使用 CSS transform 和 opacity
5. **可访问性** - 尊重用户的动画偏好设置
6. **测试** - 在不同设备上测试动画性能
