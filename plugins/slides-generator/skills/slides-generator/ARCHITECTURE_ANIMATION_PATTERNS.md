# 架构演示动画模式

## 推荐的动画库

对于 React 幻灯片项目，推荐使用以下动画库组合：

### 1. Framer Motion（主要动画库）
```bash
npm install framer-motion
```
- 用途：通用动画、过渡效果、手势交互
- 特点：声明式 API、性能优异、易用性高

### 2. React Flow（架构图）
```bash
npm install reactflow
```
- 用途：节点图、流程图、架构可视化
- 特点：内置动画、交互性强、可自定义

### 3. Recharts（数据图表）
```bash
npm install recharts
```
- 用途：统计图表、数据可视化
- 特点：动画图表、响应式、可定制

### 4. Lucide React（图标）
```bash
npm install lucide-react
```
- 用途：精美图标、动画图标
- 特点：1000+ 图标、Tree-shakeable

### 5. Three.js + React Three Fiber（3D 可视化，可选）
```bash
npm install three @react-three/fiber @react-three/drei
```
- 用途：3D 模型、空间可视化
- 特点：WebGL 加速、交互式 3D

## 架构演示动画模式

### 模式 1: 分层揭示（Layer Reveal）

适用于：多层架构演示

```jsx
import { motion } from 'framer-motion';

const LayerReveal = ({ layers }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          variants={item}
          className="layer"
        >
          {layer.content}
        </motion.div>
      ))}
    </motion.div>
  );
};
```

### 模式 2: 连接流动（Connection Flow）

适用于：数据流、服务调用链

```jsx
import ReactFlow, { MarkerType } from 'reactflow';

const ConnectionFlow = () => {
  const edges = [
    {
      id: '1-2',
      source: '1',
      target: '2',
      animated: true,
      style: { stroke: '#00f5ff' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#00f5ff'
      }
    }
  ];

  return <ReactFlow nodes={nodes} edges={edges} />;
};
```

### 模式 3: 节点展开（Node Expansion）

适用于：微服务、组件详情

```jsx
const NodeExpansion = ({ node }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setExpanded(!expanded)}
      className="node-card"
    >
      <h3>{node.title}</h3>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <p>{node.details}</p>
          <ul>
            {node.services.map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};
```

### 模式 4: 数据流动（Data Stream）

适用于：实时数据、API 调用

```jsx
const DataStream = () => {
  const particles = [...Array(10)];

  return (
    <div className="relative">
      <svg className="connection-line">
        <path d={pathData} />
      </svg>

      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'linear'
          }}
          style={{
            offsetPath: `path('${pathData}')`
          }}
        />
      ))}
    </div>
  );
};
```

## 常见架构模式的动画配置

### 1. 三层架构（3-Tier）

```jsx
const threeTierArchitecture = {
  nodes: [
    {
      id: 'presentation',
      position: { x: 100, y: 100 },
      data: { label: 'Presentation Layer' }
    },
    {
      id: 'business',
      position: { x: 100, y: 300 },
      data: { label: 'Business Logic Layer' }
    },
    {
      id: 'data',
      position: { x: 100, y: 500 },
      data: { label: 'Data Layer' }
    }
  ],
  edges: [
    { id: 'e1', source: 'presentation', target: 'business', animated: true },
    { id: 'e2', source: 'business', target: 'data', animated: true }
  ]
};
```

### 2. 微服务架构（Microservices）

```jsx
const microservicesArchitecture = {
  nodes: [
    { id: 'gateway', position: { x: 100, y: 200 }, data: { label: 'API Gateway' } },
    { id: 'service1', position: { x: 400, y: 100 }, data: { label: 'User Service' } },
    { id: 'service2', position: { x: 400, y: 200 }, data: { label: 'Order Service' } },
    { id: 'service3', position: { x: 400, y: 300 }, data: { label: 'Payment Service' } },
    { id: 'db', position: { x: 700, y: 200 }, data: { label: 'Database Cluster' } }
  ],
  edges: [
    { id: 'e1', source: 'gateway', target: 'service1', animated: true },
    { id: 'e2', source: 'gateway', target: 'service2', animated: true },
    { id: 'e3', source: 'gateway', target: 'service3', animated: true },
    { id: 'e4', source: 'service1', target: 'db', animated: true },
    { id: 'e5', source: 'service2', target: 'db', animated: true },
    { id: 'e6', source: 'service3', target: 'db', animated: true }
  ]
};
```

### 3. 事件驱动架构（Event-Driven）

```jsx
const eventDrivenArchitecture = {
  nodes: [
    { id: 'producer', position: { x: 100, y: 200 }, data: { label: 'Event Producer' } },
    { id: 'broker', position: { x: 400, y: 200 }, data: { label: 'Message Broker' } },
    { id: 'consumer1', position: { x: 700, y: 100 }, data: { label: 'Consumer 1' } },
    { id: 'consumer2', position: { x: 700, y: 200 }, data: { label: 'Consumer 2' } },
    { id: 'consumer3', position: { x: 700, y: 300 }, data: { label: 'Consumer 3' } }
  ],
  edges: [
    { id: 'e1', source: 'producer', target: 'broker', animated: true, style: { strokeDasharray: '5 5' } },
    { id: 'e2', source: 'broker', target: 'consumer1', animated: true },
    { id: 'e3', source: 'broker', target: 'consumer2', animated: true },
    { id: 'e4', source: 'broker', target: 'consumer3', animated: true }
  ]
};
```

## 动画时机配置

### 推荐的动画时长

| 元素类型 | 入场动画 | 交互反馈 | 持续动画 |
|---------|---------|---------|---------|
| 标题 | 600ms | - | - |
| 段落 | 400ms | - | - |
| 列表项 | 300ms | 150ms | - |
| 节点 | 500ms | 200ms | - |
| 连接线 | 1000ms | - | 2s loop |
| 图表 | 1500ms | - | - |
| 粒子 | - | - | 3s loop |

### Stagger 延迟配置

```jsx
// 快速序列（列表项）
staggerChildren: 0.05

// 标准序列（段落）
staggerChildren: 0.1

// 慢速序列（复杂元素）
staggerChildren: 0.2
```

## 性能优化技巧

### 1. 使用 CSS Transform

```jsx
// ✅ 好 - GPU 加速
animate={{ x: 100, scale: 1.1 }}

// ❌ 差 - CPU 渲染
animate={{ left: '100px', width: '110%' }}
```

### 2. 减少重绘

```jsx
// 使用 layoutId 进行平滑布局动画
<motion.div layoutId="card" />
```

### 3. 懒加载

```jsx
// 仅在元素可见时触发动画
whileInView={{ opacity: 1 }}
viewport={{ once: true, margin: '-100px' }}
```

### 4. 使用 will-change

```css
.element {
  will-change: transform, opacity;
}
```

## 可访问性

### 尊重用户偏好

```jsx
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  animate={{
    opacity: prefersReducedMotion ? 1 : [0, 1],
    y: prefersReducedMotion ? 0 : [20, 0]
  }}
  transition={
    prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }
  }
/>
```

## 完整示例

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';

const AnimatedArchitecture = () => {
  return (
    <motion.div
      className="architecture-slide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        System Architecture
      </motion.h1>

      <ReactFlow nodes={nodes} edges={edges} fitView />

      <motion.div
        className="legend"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {/* Legend content */}
      </motion.div>
    </motion.div>
  );
};
```
