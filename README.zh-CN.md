# Claude Code 技能与插件市场

Claude Code CLI 的插件和技能集合。此市场提供可复用的技能、命令和模板，用于扩展 Claude Code 的功能。

## 📦 可用插件

### slides-generator

使用 React + Tailwind CSS 生成交互式演示文稿幻灯片。非常适合快速创建精美、响应式的演示文稿。

**功能特性：**
- React + Vite + Tailwind CSS 项目生成
- 多种主题（现代风格、简约、深色、彩色）
- 带动画的响应式设计
- 键盘导航支持
- 可自定义幻灯片数量和内容

## 🚀 安装

### 添加市场

```bash
/plugin marketplace add <your-username>/af-claudecode-skill
```

### 安装插件

```bash
# 浏览可用插件
/plugin menu

# 安装 slides-generator 插件
claude plugin install slides-generator
```

### 使用 slides-generator 插件

```bash
# 生成演示文稿
/slides title="我的演示文稿" slides=5 theme="modern"

# 或使用 /ppt 别名
/ppt title="演示" slides=3 theme="dark"
```

## 📁 项目结构

```
af-claudecode-skill/
├── plugins/                    # 插件目录
│   └── slides-generator/       # slides-generator 插件
│       ├── plugin.json         # 插件配置
│       ├── README.md           # 插件文档
│       ├── skills/             # 技能定义
│       ├── commands/           # 斜杠命令定义
│       └── templates/          # 代码模板
├── scripts/                    # 工具脚本
│   ├── validate.js             # 插件验证器
│   └── release.sh              # 发布脚本
├── market.json                 # 市场索引
└── package.json                # 根 package.json
```

## 🔧 开发

### 前置要求

- Node.js >= 18.0.0
- Git
- GitHub CLI (gh)

### 验证插件配置

```bash
# 验证特定插件
npm run validate plugins/slides-generator/plugin.json

# 验证所有插件
npm run validate:all
```

### 创建新插件

1. 在 `plugins/your-plugin-name/` 下创建新目录
2. 创建包含插件配置的 `plugin.json` 文件
3. 根据需要添加技能、命令和模板
4. 验证插件：`npm run validate plugins/your-plugin-name/plugin.json`
5. 更新 `market.json` 以包含您的插件

### 发布新版本

```bash
# 运行发布脚本
npm run release
```

这将：
1. 验证所有插件
2. 创建 git 标签
3. 推送到 GitHub
4. 创建 GitHub 发布

## 📝 插件配置

每个插件必须有一个 `plugin.json` 文件：

```json
{
  "name": "your-plugin-name",
  "version": "1.0.0",
  "description": "插件描述",
  "components": {
    "skills": ["skills/*.md"],
    "commands": ["commands/*.md"]
  },
  "keywords": ["关键词1", "关键词2"]
}
```

## 🤝 贡献

欢迎贡献！请：

1. Fork 仓库
2. 创建功能分支
3. 进行更改
4. 验证您的插件
5. 提交 Pull Request

## 📄 许可证

MIT 许可证 - 详见 LICENSE 文件

## 🔗 资源

- [Claude Code 文档](https://code.claude.com/docs/en/plugins)
- [插件开发指南](https://code.claude.com/docs/en/plugins/development)
- [GitHub Issues](https://github.com/<your-username>/af-claudecode-skill/issues)

## 📧 联系方式

如有问题或需要支持，请在 GitHub 上提交 issue。
