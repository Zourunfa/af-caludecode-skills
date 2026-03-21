# Lucide React Icon Reference

> 常用图标列表 - 生成幻灯片时**只使用这些图标**

## 🔧 Development & Code

- `Code` - 代码
- `Code2` - 代码（风格2）
- `FileJson` - JSON文件
- `FileCode` - 代码文件
- `Terminal` - 终端
- `GitBranch` - Git分支
- `GitCommit` - Git提交
- `GitMerge` - Git合并
- `GitPullRequest` - Git PR
- `Database` - 数据库
- `Server` - 服务器
- `Settings` - 设置
- `Config` - 配置

## 🎨 Design & Creative

- `Palette` - 调色板
- `Brush` - 画笔
- `PenTool` - 钢笔工具
- `Layers` - 图层
- `Image` - 图片
- `FileImage` - 图片文件
- `Sparkles` - 闪光/创意
- `Wand2` - 魔杖
- `Highlighter` - 荧光笔

## 📊 Data & Analytics

- `BarChart` - 柱状图
- `LineChart` - 折线图
- `PieChart` - 饼图
- `TrendingUp` - 上升趋势
- `TrendingDown` - 下降趋势
- `Activity` - 活动图
- `Analytics` - 分析

## 🚀 Actions & Operations

- `Rocket` - 火箭/启动
- `Play` - 播放
- `Pause` - 暂停
- `Stop` - 停止
- `RefreshCw` - 刷新
- `Download` - 下载
- `Upload` - 上传
- `Share` - 分享
- `Copy` - 复制
- `Scissors` - 剪切

## ✅ Status & Feedback

- `CheckCircle` - 成功/正确
- `XCircle` - 错误/失败
- `AlertTriangle` - 警告
- `AlertCircle` - 提醒
- `Info` - 信息
- `HelpCircle` - 帮助
- `Loader2` - 加载中
- `Zap` - 快速/能量

## 📁 Files & Folders

- `Folder` - 文件夹
- `FolderOpen` - 打开的文件夹
- `File` - 文件
- `FileText` - 文本文件
- `Package` - 包/模块

## 🔍 Search & Discovery

- `Search` - 搜索
- `Filter` - 筛选
- `Tag` - 标签
- `Hash` - 井号
- `Link` - 链接
- `ExternalLink` - 外部链接

## 👥 Users & Collaboration

- `Users` - 用户组
- `User` - 单个用户
- `UserPlus` - 添加用户
- `MessageSquare` - 消息
- `MessageCircle` - 评论
- `Mail` - 邮件
- `Send` - 发送

## 🎯 Navigation

- `ArrowRight` - 右箭头
- `ArrowLeft` - 左箭头
- `ArrowUp` - 上箭头
- `ArrowDown` - 下箭头
- `ChevronRight` - 右V形
- `ChevronLeft` - 左V形
- `ChevronDown` - 下V形
- `ChevronUp` - 上V形
- `Home` - 首页
- `Menu` - 菜单

## 🛠️ Tools

- `Wrench` - 扳手/工具
- `Hammer` - 锤子
- `Screwdriver` - 螺丝刀
- `Tool` - 工具
- `Clipboard` - 剪贴板
- `ClipboardCheck` - 剪贴板（已勾选）

## 💡 Ideas & Innovation

- `Lightbulb` - 灯泡/想法
- `LightbulbIcon` - 灯泡图标
- `Idea` - 创意
- `Brain` - 大脑
- `Puzzle` - 拼图
- `Globe` - 地球/全球

## 📝 Content & Documents

- `FileText` - 文本文件
- `FileEdit` - 编辑文件
- `Type` - 文字输入
- `Heading` - 标题
- `List` - 列表
- `ListChecks` - 检查列表

## 🔒 Security & Safety

- `Shield` - 盾牌/安全
- `Lock` - 锁定
- `Unlock` - 解锁
- `Key` - 密钥

## ⚙️ System & Settings

- `Settings` - 设置
- `Settings2` - 设置（风格2）
- `Cog` - 齿轮
- `Sliders` - 滑块
- `ToggleLeft` - 关闭切换
- `ToggleRight` - 开启切换

## 🎮 Media & Controls

- `Monitor` - 显示器
- `Laptop` - 笔记本
- `Smartphone` - 智能手机
- `Tablet` - 平板
- `Keyboard` - 键盘
- `Mouse` - 鼠标
- `Speaker` - 扬声器
- `Volume2` - 音量

## 🌐 Social & Platforms

- `Github` - GitHub
- `Gitlab` - GitLab
- `Twitter` - Twitter/X
- `Linkedin` - LinkedIn
- `Youtube` - YouTube

## 🏷️ Common Mistakes to Avoid

❌ **不存在的图标**（不要使用）:
- `TestRocket` → 应使用 `Rocket` 或 `Flask`
- `Icon` → 应使用具体图标名称
- `Logo` → 应使用具体平台图标

✅ **正确用法**:
- 对于测试相关：使用 `Flask`（实验瓶）或 `Beaker`（烧杯）
- 对于启动/发布：使用 `Rocket`（火箭）
- 对于成功/失败：使用 `CheckCircle` / `XCircle`

## 使用指南

**在生成代码时**：
1. 优先从上面的列表中选择图标
2. 图标名称使用 PascalCase（首字母大写）
3. 如果找不到合适的图标，选择语义最接近的
4. 避免创造不存在的图标名称（如 `TestRocket`）

**示例**：
```jsx
import {
  Rocket,     // ✅ 火箭/启动
  Flask,      // ✅ 实验/测试
  CheckCircle // ✅ 成功
} from 'lucide-react';
```
