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

### Tech Theme (NEW - For Architecture Diagrams)
- Background: Deep tech gradient (linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%))
- Text: White (#ffffff)
- Accent: Neon cyan (#00f5ff) and Electric purple (#b026ff)
- Font: JetBrains Mono / Consolas for code, system-ui for text
- Style: High-tech with glowing effects, grid patterns, and animated connections
- Special Features: Circuit patterns, particle effects, holographic elements

## Animation & Graphics Enhancement

### Mandatory Animation Libraries

When generating slides with architecture diagrams, data visualization, or complex concepts, **MUST** include these libraries in `package.json`:

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.344.0",
    "react-flow-renderer": "^10.3.17",
    "recharts": "^2.12.0",
    "@react-three/fiber": "^8.16.0",
    "@react-three/drei": "^9.105.0",
    "three": "^0.163.0"
  }
}
```

### Animation Priority Rules

**When to use animations:**
1. **Architecture Diagrams** (ALWAYS use animations)
   - Animated nodes appearing sequentially
   - Connection lines drawing progressively
   - Hover effects showing component details
   - Interactive pan/zoom for complex diagrams
   - Use `framer-motion` for layout animations + `react-flow-renderer` for node graphs

2. **Data Visualization** (ALWAYS use animations)
   - Animated charts (bars, lines, pies) with `recharts`
   - Counting numbers for statistics
   - Progress bars that fill on slide enter
   - Staggered list item reveals

3. **Concept Illustrations** (HIGH priority)
   - 2D animations for process flows using `framer-motion`
   - 3D models for spatial concepts using `@react-three/fiber`
   - Particle effects for abstract concepts
   - Morphing shapes for transformation concepts

4. **Bullet Points** (Medium priority)
   - Staggered fade-in (100ms delay between items)
   - Slide-in from left/right
   - Scale animation on hover

### Architecture Diagram Components

**MUST create these components for architecture slides:**

1. **AnimatedFlowDiagram.jsx**
   - Uses `react-flow-renderer` for node-based diagrams
   - Animated edges drawing from source to target
   - Interactive nodes with hover details
   - Zoom/pan controls
   - Auto-layout with hierarchical positioning

2. **AnimatedArchitecture.jsx**
   - Layer-by-layer reveal (infrastructure → services → application)
   - Animated connection lines between layers
   - Glowing pulse effects for active components
   - Hover tooltips with component details
   - Legend with animated entry

3. **DataFlowAnimation.jsx**
   - Animated particles flowing through connections
   - Color-coded data types
   - Speed controls for presentation pace
   - Loop mode for continuous flow visualization

### 3D Visualization Components

**For spatial or structural concepts, use 3D:**

1. **3DModelViewer.jsx** - Using `@react-three/fiber`
   - Interactive 3D models (drag to rotate)
   - Auto-rotate on idle
   - Animated entry (scale + fade)
   - Lighting effects for depth

2. **3DArchitecture.jsx** - For system topology
   - 3D node graph with depth layers
   - Animated connections
   - Mouse interaction for exploration
   - Section cutaways for internal views

### Animation Timing Guidelines

- **Fast transitions**: 150-300ms (hover states, micro-interactions)
- **Medium transitions**: 300-500ms (slide elements, standard reveals)
- **Slow transitions**: 500-1000ms (complex diagrams, sequential builds)
- **Stagger delays**: 50-150ms between list items
- **Entry animations**: Stagger from top/bottom or center outward

### High-End Animation Patterns

**Use these patterns for professional, educational presentations:**

1. **Progressive Disclosure** - Reveal information step-by-step
   ```jsx
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay: index * 0.1 }}
   >
     {content}
   </motion.div>
   ```

2. **Path Drawing** - Draw lines/shapes progressively
   ```jsx
   <motion.path
     d={pathData}
     initial={{ pathLength: 0 }}
     animate={{ pathLength: 1 }}
     transition={{ duration: 2, ease: "easeInOut" }}
   />
   ```

3. **Scale & Fade** - Elegant element reveals
   ```jsx
   initial={{ scale: 0.8, opacity: 0 }}
   animate={{ scale: 1, opacity: 1 }}
   transition={{ type: "spring", stiffness: 200 }}
   ```

4. **Staggered Grid** - Cards appearing in wave pattern
   ```jsx
   const container = {
     hidden: { opacity: 0 },
     show: {
       opacity: 1,
       transition: { staggerChildren: 0.1 }
     }
   };
   ```

### Content-Specific Animation Rules

**For different slide types:**

- **Title Slides**: Text reveal + subtle background motion
- **Architecture Diagrams**: Sequential node reveals + animated connections
- **Data Slides**: Animated charts + counting numbers
- **Process Slides**: Step-by-step progression with path animations
- **Comparison Slides**: Split-screen entry + synchronized reveals
- **Timeline Slides**: Animated line drawing + milestone pop-ups
- **Summary Slides**: Staggered bullet points + highlight animations

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

### Template-Specific Rules (react-tailwind template)

For the react-tailwind template, follow these rules to prevent content cutoff:

- **Maximum 4 bullets per slide** — If more than 4 bullets are needed, split into multiple slides
- **Use space-y-3 or space-y-4** — Never use space-y-8 (causes content overflow)
- **Wrap content in slide-content div** — Ensures scrollability when content exceeds viewport
- **Keep text concise** — Maximum 80 characters per bullet point
- **Use proper spacing** — `mt-8` for author on title slide (not `mt-12`)

### Pre-Generation Checklist (MUST complete before writing code)

Before generating any slide code, verify the following:

□ **Bullets count ≤ 4** — If more than 4 bullets, split into multiple slides
□ **Use space-y-3 or space-y-4** — NOT space-y-8
□ **Wrap content area with slide-content class** — `<div className="slide-content flex-1 space-y-4">`
□ **Text is concise** — Maximum 80 chars per bullet
□ **Content layout uses flex** — `<div className="max-w-5xl w-full h-full flex flex-col">`

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

### Content Validation Script (Optional)

For generated projects using the react-tailwind template, a validation script is included to check for common content issues:

```bash
cd <project-name>
node scripts/validate-slides.js
```

The script checks:
- Bullets count per slide (max 4)
- Spacing usage (should NOT use space-y-8)
- Bullet point length (max 80 chars)

Example output:
```
✓ Slide 01: bullets count OK (0)
⚠ Slide 02: bullets count exceeds limit (6 > 4)
  Suggestion: Split into two slides
```

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
