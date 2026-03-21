# /slides

Generate a complete React + Tailwind CSS presentation project.

## Usage

```
/slides title="Presentation Title" slides=5 theme="modern" author="Author Name"
```

## Parameters

- `title` (required): The title of the presentation
- `slides` (optional): Number of slides to generate (default: 5)
- `theme` (optional): Theme - modern, minimalist, dark, colorful (default: modern)
- `author` (optional): Presenter/author name

## Examples

```bash
# Basic presentation
/slides title="Project Overview" slides=5

# With theme and author
/slides title="Q4 Review" slides=8 theme="dark" author="Jane Smith"

# Colorful theme presentation
/slides title="Product Launch" slides=10 theme="colorful" author="Marketing Team"
```

## What It Creates

A complete React + Vite + Tailwind project with:
- Responsive slide layouts
- Keyboard navigation
- Smooth animations
- Multiple theme options
- Progress indicators
- Fullscreen support

## After Generation

```bash
cd <generated-project>
npm install
npm run dev
```

Open http://localhost:5173 to view your presentation.
