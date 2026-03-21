# slides-generator Plugin

Generate interactive presentation slides using React + Tailwind CSS. This plugin creates a complete, production-ready presentation project with animations, responsive design, and keyboard navigation.

## Features

- 🎨 **Multiple Themes**: modern, minimalist, dark, colorful
- 📱 **Responsive Design**: Works on all screen sizes
- ⌨️ **Keyboard Navigation**: Arrow keys, space bar, and number shortcuts
- 🎭 **Smooth Animations**: Slide transitions and animations
- 🚀 **Fast Development**: Hot module replacement with Vite
- 🎯 **TypeScript Ready**: Full TypeScript support
- 📦 **Zero Configuration**: Build-optimized with Vite

## Installation

Install via Claude Code marketplace:

```bash
claude plugin install slides-generator
```

## Usage

### Slash Commands

```bash
# Generate a presentation
/slides title="My Presentation" slides=5 theme="modern"

# Using the /ppt alias
/ppt title="Demo" slides=3 theme="dark"

# With author information
/slides title="Project Overview" slides=7 theme="colorful" author="John Doe"
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `title` | string | Yes | - | Presentation title |
| `slides` | number | No | 5 | Number of slides to generate |
| `theme` | string | No | modern | Theme: modern, minimalist, dark, colorful |
| `author` | string | No | - | Author name for the presentation |

### Themes

#### Modern
Clean, contemporary design with subtle gradients and smooth animations.

#### Minimalist
Simple, elegant design with lots of white space and minimal distractions.

#### Dark
Dark background with light text, perfect for low-light environments.

#### Colorful
Vibrant colors and creative layouts for engaging presentations.

## Generated Project Structure

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

## Development

After generation, navigate to the project directory:

```bash
cd generated-slides

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Keyboard Controls

Once running, use these keyboard shortcuts:

- **← / →**: Navigate to previous/next slide
- **↑ / ↓**: Jump to first/last slide
- **Space**: Next slide
- **Home**: First slide
- **End**: Last slide
- **F**: Fullscreen mode
- **Esc**: Exit fullscreen

## Customization

### Adding New Slides

Edit `src/App.jsx` and add to the `slides` array:

```jsx
const slides = [
  // ... existing slides
  {
    id: 6,
    title: "New Slide",
    content: "Your content here",
    bullets: ["Point 1", "Point 2"]
  }
];
```

### Creating Custom Themes

Add a new theme file in `src/components/themes/`:

```js
export const customTheme = {
  background: "linear-gradient(135deg, #your-colors)",
  text: "#your-text-color",
  accent: "#your-accent-color",
  // ... more styles
};
```

### Modifying Animations

Edit the transition styles in `src/components/Slideshow.jsx` or `src/styles.css`.

## Examples

### Technical Presentation

```bash
/slides title="Architecture Overview" slides=8 theme="dark" author="Tech Team"
```

### Design Showcase

```bash
/slides title="Portfolio 2026" slides=10 theme="modern" author="Designer"
```

### Quick Status Update

```bash
/ppt title="Weekly Standup" slides=3 theme="minimalist"
```

## Troubleshooting

### Port Already in Use

If port 5173 is in use, Vite will automatically try the next available port.

### Module Not Found

Make sure to run `npm install` after generating the project.

### Styling Issues

Clear your browser cache or try incognito mode to ensure fresh CSS loading.

## License

MIT License - see LICENSE file in the root repository.

## Contributing

Contributions welcome! Please open issues or PRs at the main repository.

## Links

- [Main Repository](https://github.com/<your-username>/af-claudecode-skill)
- [Plugin Documentation](https://github.com/<your-username>/af-claudecode-skill/tree/main/plugins/slides-generator)
- [Issues](https://github.com/<your-username>/af-claudecode-skill/issues)
