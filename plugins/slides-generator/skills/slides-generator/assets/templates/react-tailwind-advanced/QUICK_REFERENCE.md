# 🎬 动画幻灯片快速参考

## 快速开始

### 使用高级模板生成幻灯片

```bash
# 生成带动画的幻灯片项目
cd your-project
npm install
npm run dev
```

## 核心组件使用

### 1. 动画幻灯片（AnimatedSlide）

```jsx
import AnimatedSlide from './components/AnimatedSlide';

<AnimatedSlide
  slide={{
    id: 1,
    title: 'My Presentation',
    content: 'Welcome to this talk',
    bullets: [
      'First point',
      'Second point',
      'Third point'
    ]
  }}
  theme="tech"
  isActive={true}
/>
```

### 2. 架构图（AnimatedArchitecture）

```jsx
import AnimatedArchitecture from './components/AnimatedArchitecture';
import { generateArchitecture } from './utils/architectureGenerator';

<AnimatedArchitecture
  architecture={generateArchitecture('fullstack')}
  theme="tech"
/>
```

**支持的架构类型：**
- `fullstack` - 全栈架构
- `microservices` - 微服务架构
- `serverless` - Serverless 架构

### 3. 数据图表（AnimatedChart）

```jsx
import AnimatedChart from './components/AnimatedChart';
import { generateChartData } from './utils/architectureGenerator';

<AnimatedChart
  data={generateChartData('performance')}
  type="bar"
  title="Performance Metrics"
  theme="tech"
/>
```

**支持的图表类型：**
- `bar` - 柱状图
- `line` - 折线图
- `pie` - 饼图

### 4. 流程动画（AnimatedProcessFlow）

```jsx
import AnimatedProcessFlow from './components/AnimatedProcessFlow';
import { generateProcessSteps } from './utils/architectureGenerator';

<AnimatedProcessFlow
  steps={generateProcessSteps('deployment')}
  theme="tech"
/>
```

**支持的流程类型：**
- `deployment` - 部署流程
- `development` - 开发流程

## 主题配置

### Modern（现代）
```jsx
theme="modern"
// 渐变紫蓝、白色文字、现代风格
```

### Tech（科技）
```jsx
theme="tech"
// 深空背景、霓虹青/电光紫、科技感
// ⭐ 推荐用于架构演示
```

### Dark（暗色）
```jsx
theme="dark"
// 深灰背景、浅灰文字、高对比度
```

### Colorful（多彩）
```jsx
theme="colorful"
// 粉橙渐变、白色文字、活力风格
```

## 常用动画模式

### Stagger 列表（渐进式显示）

```jsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.text}
    </motion.li>
  ))}
</motion.ul>
```

### 悬停效果

```jsx
<motion.div
  whileHover={{
    scale: 1.05,
    boxShadow: '0 0 30px rgba(0, 245, 255, 0.5)'
  }}
>
  Content
</motion.div>
```

### 路径动画

```jsx
<motion.path
  d={pathData}
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 2 }}
/>
```

## 动画时机速查

| 场景 | 时长 | 延迟 |
|-----|------|------|
| 悬停反馈 | 150ms | 0 |
| 按钮点击 | 200ms | 0 |
| 列表项 | 300ms | 50ms × index |
| 段落 | 400ms | 100ms |
| 标题 | 600ms | 0 |
| 架构图 | 1000ms | 200ms |
| 图表 | 1500ms | 300ms |

## 性能优化技巧

### ✅ 推荐

```jsx
// 使用 GPU 加速
animate={{ x: 100, scale: 1 }}

// 懒加载
whileInView={{ opacity: 1 }}
viewport={{ once: true }}

// 减少重绘
layoutId="shared-element"
```

### ❌ 避免

```jsx
// 不使用 layout 属性
animate={{ width: '100%' }}

// 不使用 CSS 动画
animation: 'myAnimation 1s'
```

## 架构图快速模板

### 全栈架构

```javascript
const nodes = [
  { id: 'client', position: { x: 0, y: 0 }, data: { label: 'Client' } },
  { id: 'api', position: { x: 200, y: 0 }, data: { label: 'API' } },
  { id: 'db', position: { x: 400, y: 0 }, data: { label: 'Database' } }
];

const edges = [
  { id: 'e1', source: 'client', target: 'api', animated: true },
  { id: 'e2', source: 'api', target: 'db', animated: true }
];
```

### 微服务架构

```javascript
const nodes = [
  { id: 'gateway', position: { x: 0, y: 100 }, data: { label: 'Gateway' } },
  { id: 'service1', position: { x: 200, y: 0 }, data: { label: 'Service 1' } },
  { id: 'service2', position: { x: 200, y: 200 }, data: { label: 'Service 2' } }
];

const edges = [
  { id: 'e1', source: 'gateway', target: 'service1', animated: true },
  { id: 'e2', source: 'gateway', target: 'service2', animated: true }
];
```

## 常用代码片段

### 数字滚动动画

```jsx
const CountUp = ({ value }) => {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;
    const controls = animate(0, value, {
      duration: 2,
      onUpdate: (latest) => {
        node.textContent = Math.round(latest);
      }
    });
    return () => controls.stop();
  }, [value]);

  return <span ref={nodeRef} />;
};
```

### 进度条动画

```jsx
<motion.div
  className="h-2 bg-cyan-400"
  initial={{ width: 0 }}
  animate={{ width: `${progress}%` }}
  transition={{ duration: 1, ease: 'easeInOut' }}
/>
```

### 卡片翻转

```jsx
const [isFlipped, setIsFlipped] = useState(false);

<motion.div
  animate={{ rotateY: isFlipped ? 180 : 0 }}
  transition={{ duration: 0.6 }}
  onClick={() => setIsFlipped(!isFlipped)}
  style={{ transformStyle: 'preserve-3d' }}
>
  {/* Front */}
  <div>Front Content</div>
  {/* Back */}
  <div style={{ backfaceVisibility: 'hidden', rotateY: 180 }}>
    Back Content
  </div>
</motion.div>
```

## 故障排查

### 动画不流畅
1. 检查是否使用了 GPU 加速属性
2. 减少同时动画的元素数量
3. 使用 `will-change` 提示浏览器

### 架构图不显示
1. 检查节点位置是否在可见区域
2. 确保 `fitView` prop 已设置
3. 检查节点和边的 ID 是否正确

### 性能问题
1. 使用 React.memo 优化组件
2. 减少 state 更新频率
3. 使用 `viewport={{ once: true }}` 避免重复动画

## 键盘快捷键

- `←/→` - 上一张/下一张
- `Space` - 下一张
- `Home/End` - 第一张/最后一张
- `F` - 全屏模式

## 更多资源

- 📖 [完整动画指南](./ANIMATION_GUIDE.md)
- 🏗️ [架构动画模式](../../ARCHITECTURE_ANIMATION_PATTERNS.md)
- 📝 [增强说明](../../ENHANCEMENT_SUMMARY.md)
- 🎨 [Framer Motion 文档](https://www.framer.com/motion/)
- 🔷 [React Flow 文档](https://reactflow.dev/)
