# Claude Code Skills & Plugins Marketplace

A collection of plugins and skills for Claude Code CLI. This marketplace provides reusable skills, commands, and templates that extend Claude Code's capabilities.

## 📦 Available Plugins

### slides-generator

Generate interactive presentation slides using React + Tailwind CSS. Perfect for creating beautiful, responsive presentations quickly.

**Features:**
- React + Vite + Tailwind CSS project generation
- Multiple themes (modern, minimalist, dark, colorful)
- Responsive design with animations
- Keyboard navigation support
- Customizable slide count and content

## 🚀 Installation

### Add Marketplace

```bash
/plugin marketplace add <your-username>/af-claudecode-skill
```

### Install a Plugin

```bash
# Browse available plugins
/plugin menu

# Install slides-generator plugin
claude plugin install slides-generator
```

### Using the slides-generator Plugin

```bash
# Generate a presentation
/slides title="My Presentation" slides=5 theme="modern"

# Or use the /ppt alias
/ppt title="Demo" slides=3 theme="dark"
```

## 📁 Project Structure

```
af-claudecode-skill/
├── plugins/                    # Plugin directory
│   └── slides-generator/       # slides-generator plugin
│       ├── plugin.json         # Plugin configuration
│       ├── README.md           # Plugin documentation
│       ├── skills/             # Skills definitions
│       ├── commands/           # Slash command definitions
│       └── templates/          # Code templates
├── scripts/                    # Utility scripts
│   ├── validate.js             # Plugin validator
│   └── release.sh              # Release script
├── market.json                 # Marketplace index
└── package.json                # Root package.json
```

## 🔧 Development

### Prerequisites

- Node.js >= 18.0.0
- Git
- GitHub CLI (gh)

### Validate Plugin Configuration

```bash
# Validate a specific plugin
npm run validate plugins/slides-generator/plugin.json

# Validate all plugins
npm run validate:all
```

### Create a New Plugin

1. Create a new directory under `plugins/your-plugin-name/`
2. Create a `plugin.json` file with your plugin configuration
3. Add skills, commands, and templates as needed
4. Validate your plugin: `npm run validate plugins/your-plugin-name/plugin.json`
5. Update `market.json` to include your plugin

### Release a New Version

```bash
# Run the release script
npm run release
```

This will:
1. Validate all plugins
2. Create a git tag
3. Push to GitHub
4. Create a GitHub release

## 📝 Plugin Configuration

Each plugin must have a `plugin.json` file:

```json
{
  "name": "your-plugin-name",
  "version": "1.0.0",
  "description": "Plugin description",
  "components": {
    "skills": ["skills/*.md"],
    "commands": ["commands/*.md"]
  },
  "keywords": ["keyword1", "keyword2"]
}
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Validate your plugin
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Resources

- [Claude Code Documentation](https://code.claude.com/docs/en/plugins)
- [Plugin Development Guide](https://code.claude.com/docs/en/plugins/development)
- [GitHub Issues](https://github.com/<your-username>/af-claudecode-skill/issues)

## 📧 Contact

For questions or support, please open an issue on GitHub.
