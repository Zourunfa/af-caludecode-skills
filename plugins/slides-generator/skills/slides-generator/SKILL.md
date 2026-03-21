---
name: slides-generator
description: Generate interactive presentation slides using React + Tailwind CSS. Trigger keywords: "slides", "presentation", "PPT", "ppt", "demo", "benchmark", "deck", "slideshow", "演讲稿", "演示文稿", "幻灯片"
---

# Generate Presentation Slides

You are the slides-generator skill. Generate a complete React + Vite + Tailwind CSS presentation project with the specified parameters.

## Input Parameters

Extract the following parameters from the user request:
- `title`: Presentation title (required)
- `slides`: Number of slides to generate (default: 5)
- `theme`: Theme selection - modern, minimalist, dark, colorful (default: modern)
- `author`: Author name (optional)

## Theme Definitions

### Modern Theme
- Background: Subtle gradient (linear-gradient(135deg, #667eea 0%, #764ba2 100%))
- Text: White (#ffffff)
- Accent: Light purple (#a78bfa)
- Font: Inter/system-ui
- Style: Contemporary with soft shadows and rounded corners

### Minimalist Theme
- Background: Off-white (#fafafa)
- Text: Dark gray (#1a202c)
- Accent: Subtle blue (#3182ce)
- Font: Clean sans-serif
- Style: Lots of whitespace, minimal elements

### Dark Theme
- Background: Deep gray/black (#1a1a1a)
- Text: Light gray (#e0e0e0)
- Accent: Cyan accent (#00d4ff)
- Font: System fonts
- Style: Dark mode optimized with high contrast

### Colorful Theme
- Background: Vibrant gradient (linear-gradient(135deg, #f093fb 0%, #f5576c 100%))
- Text: White (#ffffff)
- Accent: Bright yellow (#fbbf24)
- Font: Bold sans-serif
- Style: Energetic with creative layouts

## Output Structure

Create a new directory named based on the title (slugified) and generate:

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
Standard Vite config with React plugin

### 3. tailwind.config.js
Config with theme colors based on selected theme

### 4. postcss.config.js
Standard PostCSS config with Tailwind and Autoprefixer

### 5. index.html
HTML entry point with root div and proper meta tags

### 6. tsconfig.json (optional)
TypeScript configuration if TypeScript is preferred

### 7. src/main.jsx
React entry point mounting App to root

### 8. src/App.jsx
Main app component with:
- State for current slide index
- Slide data array with the requested number of slides
- Keyboard event handlers (arrows, space, home, end, f for fullscreen)
- Slideshow component render

### 9. src/styles.css
Global styles with:
- Tailwind imports
- Custom animations for slide transitions
- Responsive utilities

### 10. src/components/Slide.jsx
Individual slide component with:
- Title and content display
- Bullet points support
- Fade-in animation
- Responsive layout

### 11. src/components/Slideshow.jsx
Main slideshow component with:
- Slide navigation
- Progress indicator
- Theme application
- Transition animations

### 12. src/components/themes/<theme-name>.js
Theme configuration object with colors, fonts, and styles

## Slide Content Generation

Generate meaningful slide content based on the title:

- **Slide 1**: Title slide with presentation title and author
- **Slide 2**: Introduction/Overview
- **Middle slides**: Content slides with bullet points
- **Second-to-last**: Summary/Key Takeaways
- **Last slide**: Thank you / Q&A

Each slide should have:
- `id`: Unique identifier
- `title`: Slide heading
- `content`: Main content paragraph
- `bullets`: Array of 3-5 bullet points (optional)

## Implementation Instructions

1. Parse input parameters from user request
2. Create directory with slugified title
3. Generate all project files
4. Ensure all dependencies are listed in package.json
5. Include keyboard navigation (←→ arrows, Space, Home, End, F for fullscreen)
6. Add smooth CSS transitions between slides
7. Make it responsive (mobile-friendly)
8. Include a progress indicator showing current slide
9. Add slide counter (e.g., "3 / 10")

## Code Quality

- Use modern React (hooks, functional components)
- Follow React best practices
- Use Tailwind utility classes
- Include helpful comments
- Ensure accessibility (ARIA labels, keyboard support)
- Optimize for performance (React.memo where appropriate)

## After Generation

Inform the user:
1. Project has been created successfully
2. Navigate to the directory: `cd <project-name>`
3. Install dependencies: `npm install`
4. Start dev server: `npm run dev`
5. Open browser to http://localhost:5173
6. Mention keyboard shortcuts for navigation

## Icon Validation

**CRITICAL**: When dispatching subagents to generate slides, you must:

1. Read `icon-reference.md` from the references directory
2. Include the icon reference content in each subagent prompt
3. Explicitly instruct subagents to **only use icons from the provided list**
4. Common icon mistakes to avoid:
   - ❌ `TestRocket` → ✅ `Rocket` or `Flask`
   - ❌ Creating non-existent icon names
   - ❌ Using icons not in the reference list

**Subagent prompt must include**:
```
## Icon Reference (IMPORTANT: Only use icons from this list)
[Copy icon list from icon-reference.md]
```

This prevents import errors like "does not provide an export named 'TestRocket'".

## Example Output Message

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

## Important: Icon Validation

After generating slides, ALWAYS run the validation script before starting the dev server:

```bash
node ../scripts/validate-icons.js src/slides/
```

This prevents import errors like "does not provide an export named 'TestRocket'".

Begin generation when parameters are provided.
