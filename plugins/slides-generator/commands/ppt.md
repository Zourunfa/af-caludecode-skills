# /ppt

Alias for /slides - Generate a complete React + Tailwind CSS presentation project.

## Usage

```
/ppt title="Presentation Title" slides=5 theme="modern" author="Author Name"
```

## Parameters

- `title` (required): The title of the presentation
- `slides` (optional): Number of slides to generate (default: 5)
- `theme` (optional): Theme - modern, minimalist, dark, colorful (default: modern)
- `author` (optional): Presenter/author name

## Examples

```bash
# Quick presentation
/ppt title="Team Standup" slides=3

# With custom theme
/ppt title="Design Demo" slides=7 theme="colorful"

# Dark theme presentation
/ppt title="Technical Deep Dive" slides=12 theme="dark" author="Dev Team"
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

## Keyboard Controls

- **← / →**: Previous/Next slide
- **Space**: Next slide
- **Home / End**: First/Last slide
- **F**: Toggle fullscreen
- **Esc**: Exit fullscreen
