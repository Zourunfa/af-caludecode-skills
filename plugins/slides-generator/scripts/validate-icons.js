#!/usr/bin/env node

/**
 * Icon Validation Script
 * 检查并修复 lucide-react 图标导入错误
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

// 常用的 lucide-react 图标白名单
const VALID_ICONS = new Set([
  // Development & Code
  'Code', 'Code2', 'FileJson', 'FileCode', 'Terminal', 'GitBranch',
  'GitCommit', 'GitMerge', 'GitPullRequest', 'Database', 'Server',
  'Settings', 'Settings2', 'Config', 'Cog',

  // Design & Creative
  'Palette', 'Brush', 'PenTool', 'Layers', 'Image', 'FileImage',
  'Sparkles', 'Wand2', 'Highlighter', 'Shapes',

  // Data & Analytics
  'BarChart', 'LineChart', 'PieChart', 'TrendingUp', 'TrendingDown',
  'Activity', 'Analytics',

  // Actions & Operations
  'Rocket', 'Play', 'Pause', 'Stop', 'RefreshCw', 'Download',
  'Upload', 'Share', 'Copy', 'Scissors', 'Cut',

  // Status & Feedback
  'CheckCircle', 'XCircle', 'AlertTriangle', 'AlertCircle', 'Info',
  'HelpCircle', 'Loader2', 'Zap', 'Check', 'X',

  // Files & Folders
  'Folder', 'FolderOpen', 'File', 'FileText', 'Package',

  // Search & Discovery
  'Search', 'Filter', 'Tag', 'Hash', 'Link', 'ExternalLink',

  // Users & Collaboration
  'Users', 'User', 'UserPlus', 'MessageSquare', 'MessageCircle',
  'Mail', 'Send',

  // Navigation
  'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown',
  'ChevronRight', 'ChevronLeft', 'ChevronDown', 'ChevronUp',
  'Home', 'Menu',

  // Tools
  'Wrench', 'Hammer', 'Screwdriver', 'Tool', 'Clipboard', 'ClipboardCheck',

  // Ideas & Innovation
  'Lightbulb', 'Brain', 'Puzzle', 'Globe', 'LightbulbIcon',

  // Content & Documents
  'FileEdit', 'Type', 'Heading', 'List', 'ListChecks',

  // Security & Safety
  'Shield', 'Lock', 'Unlock', 'Key', 'Eye', 'EyeOff',

  // System & Settings
  'Sliders', 'ToggleLeft', 'ToggleRight',

  // Media & Controls
  'Monitor', 'Laptop', 'Smartphone', 'Tablet', 'Keyboard', 'Mouse',
  'Speaker', 'Volume2',

  // Social & Platforms
  'Github', 'Gitlab', 'Twitter', 'Linkedin', 'Youtube',

  // Science & Testing
  'Flask', 'Beaker', 'Microscope', 'TestTubes',

  // Common additions
  'Plus', 'Minus', 'X', 'Check', 'Circle', 'Square',
  'Triangle', 'Star', 'Heart', 'Bookmark'
]);

// 常见的错误图标映射
const ICON_FIXES = {
  'TestRocket': 'Rocket',
  'TestTube': 'Flask',
  'Beaker': 'Flask',
  'TestTubes': 'Flask',
  'Verified': 'CheckCircle',
  'Success': 'CheckCircle',
  'Error': 'XCircle',
  'Warning': 'AlertTriangle',
  'Info': 'Info',
};

/**
 * 从 import 语句中提取图标名称
 */
function extractImportedIcons(content) {
  const iconRegex = /import\s*{([^}]+)}\s*from\s*['"]lucide-react['"]/g;
  const icons = [];
  let match;

  while ((match = iconRegex.exec(content)) !== null) {
    const imports = match[1]
      .split(',')
      .map(s => s.trim())
      .filter(s => s && !s.includes(' as ')); // 排除别名导入
    icons.push(...imports);
  }

  return icons;
}

/**
 * 验证图标是否有效
 */
function validateIcon(iconName) {
  return VALID_ICONS.has(iconName);
}

/**
 * 修复错误的图标名称
 */
function fixIconName(iconName) {
  if (ICON_FIXES[iconName]) {
    return ICON_FIXES[iconName];
  }
  return iconName;
}

/**
 * 检查并修复文件中的图标导入
 */
function validateFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const icons = extractImportedIcons(content);
  const invalidIcons = [];
  const fixes = [];

  for (const icon of icons) {
    if (!validateIcon(icon)) {
      invalidIcons.push(icon);
      const fixedIcon = fixIconName(icon);
      if (fixedIcon !== icon) {
        fixes.push({ from: icon, to: fixedIcon });
      }
    }
  }

  if (fixes.length > 0) {
    let newContent = content;
    for (const fix of fixes) {
      // 使用正则全局替换
      const regex = new RegExp(`\\b${fix.from}\\b`, 'g');
      newContent = newContent.replace(regex, fix.to);
    }
    writeFileSync(filePath, newContent, 'utf-8');
  }

  return {
    file: filePath,
    invalidIcons,
    fixes,
    fixed: fixes.length > 0
  };
}

/**
 * 递归查找所有 JSX 文件
 */
function findJsxFiles(dir, files = []) {
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      findJsxFiles(fullPath, files);
    } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.tsx'))) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * 主函数
 */
function main() {
  const slidesDir = process.argv[2] || './src/slides';

  console.log(`🔍 Validating icons in: ${slidesDir}\n`);

  const jsxFiles = findJsxFiles(slidesDir);
  const results = [];
  let fixedCount = 0;
  let errorCount = 0;

  for (const file of jsxFiles) {
    const result = validateFile(file);
    results.push(result);

    if (result.fixed) {
      fixedCount++;
      console.log(`✅ Fixed: ${file}`);
      for (const fix of result.fixes) {
        console.log(`   ${fix.from} → ${fix.to}`);
      }
    } else if (result.invalidIcons.length > 0) {
      errorCount++;
      console.log(`❌ Error: ${file}`);
      console.log(`   Invalid icons: ${result.invalidIcons.join(', ')}`);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Total files: ${jsxFiles.length}`);
  console.log(`   Fixed: ${fixedCount}`);
  console.log(`   Errors: ${errorCount}`);

  if (errorCount > 0) {
    console.log(`\n⚠️  Some files have invalid icons that couldn't be auto-fixed.`);
    console.log(`   Please check the icon reference: references/icon-reference.md`);
    process.exit(1);
  } else if (fixedCount > 0) {
    console.log(`\n✨ All icon issues have been fixed!`);
  } else {
    console.log(`\n✅ No icon issues found!`);
  }
}

// 运行脚本
main();
