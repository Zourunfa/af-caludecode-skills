#!/usr/bin/env node

/**
 * Slides Validation Script
 *
 * This script scans generated slide files and validates:
 * - Bullets count per slide (max 4)
 * - Spacing usage (should use space-y-3 or space-y-4, NOT space-y-8)
 * - Content length per bullet (max 80 chars)
 *
 * Usage:
 *   node scripts/validate-slides.js [path-to-slides-dir]
 *
 * Default path: ./src/slides
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const MAX_BULLETS = 4;
const MAX_BULLET_LENGTH = 80;
const DEFAULT_SLIDES_PATH = './src/slides';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

function printSuccess(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function printWarning(message, details = '') {
  console.log(`${colors.yellow}⚠${colors.reset} ${message}`);
  if (details) {
    console.log(`  ${colors.gray}${details}${colors.reset}`);
  }
}

function printError(message, details = '') {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
  if (details) {
    console.log(`  ${colors.gray}${details}${colors.reset}`);
  }
}

function printHeader(message) {
  console.log(`\n${colors.blue}${message}${colors.reset}`);
}

function printInfo(message) {
  console.log(`${colors.gray}${message}${colors.reset}`);
}

/**
 * Extract slide data from JSX/JS files
 */
function extractSlideData(filePath, content) {
  const issues = [];

  // Check for space-y-8 usage (should be avoided)
  if (content.includes('space-y-8')) {
    issues.push({
      type: 'spacing',
      severity: 'warning',
      message: 'Uses large spacing (space-y-8)',
      suggestion: 'Replace with space-y-3 or space-y-4 for better content fit',
    });
  }

  // Extract bullets array from the file
  // This regex looks for bullets: [...] patterns
  const bulletsMatch = content.match(/bullets:\s*\[([\s\S]*?)\]/);

  if (bulletsMatch) {
    const bulletsContent = bulletsMatch[1];
    const bulletItems = bulletsContent.match(/'([^']+)'/g) || bulletsContent.match(/"([^"]+)"/g) || [];

    const bulletCount = bulletItems.length;

    if (bulletCount > MAX_BULLETS) {
      issues.push({
        type: 'bullets-count',
        severity: 'error',
        message: `Bullets count exceeds limit (${bulletCount} > ${MAX_BULLETS})`,
        suggestion: `Split into multiple slides with max ${MAX_BULLETS} bullets each`,
      });
    }

    // Check each bullet length
    bulletItems.forEach((bullet) => {
      const text = bullet.replace(/['"]/g, '');
      if (text.length > MAX_BULLET_LENGTH) {
        issues.push({
          type: 'bullet-length',
          severity: 'warning',
          message: `Bullet text too long (${text.length} > ${MAX_BULLET_LENGTH} chars)`,
          suggestion: `Shorten to "${text.substring(0, 40)}..."`,
        });
      }
    });
  }

  return issues;
}

/**
 * Validate a single slide file
 */
function validateSlideFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const fileName = filePath.split('/').pop();
    const issues = extractSlideData(filePath, content);

    return {
      file: fileName,
      path: filePath,
      issues,
      hasErrors: issues.some((i) => i.severity === 'error'),
      hasWarnings: issues.some((i) => i.severity === 'warning'),
    };
  } catch (error) {
    return {
      file: filePath.split('/').pop(),
      path: filePath,
      issues: [
        {
          type: 'file-error',
          severity: 'error',
          message: `Failed to read file: ${error.message}`,
        },
      ],
      hasErrors: true,
      hasWarnings: false,
    };
  }
}

/**
 * Recursively find all JS/JSX files in a directory
 */
function findSlideFiles(dirPath) {
  const files = [];

  try {
    const entries = readdirSync(dirPath);

    for (const entry of entries) {
      const fullPath = join(dirPath, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...findSlideFiles(fullPath));
      } else if (/\.(jsx?|tsx?)$/.test(entry)) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    printError(`Failed to read directory: ${dirPath}`, error.message);
  }

  return files;
}

/**
 * Main validation function
 */
function validateSlides(slidesPath = DEFAULT_SLIDES_PATH) {
  printHeader('📊 Slides Validation Report');
  printInfo(`Scanning: ${slidesPath}`);
  printInfo(`Rules: max ${MAX_BULLETS} bullets, max ${MAX_BULLET_LENGTH} chars/bullet\n`);

  const slideFiles = findSlideFiles(slidesPath);

  if (slideFiles.length === 0) {
    printWarning('No slide files found', `Check if path is correct: ${slidesPath}`);
    return;
  }

  printInfo(`Found ${slideFiles.length} file(s)\n`);

  const results = slideFiles.map(validateSlideFile);

  let totalErrors = 0;
  let totalWarnings = 0;

  results.forEach((result, index) => {
    const slideNum = String(index + 1).padStart(2, '0');

    if (result.issues.length === 0) {
      printSuccess(`${result.file}: OK`);
    } else {
      result.issues.forEach((issue) => {
        if (issue.severity === 'error') {
          printError(`${result.file}: ${issue.message}`, issue.suggestion);
          totalErrors++;
        } else {
          printWarning(`${result.file}: ${issue.message}`, issue.suggestion);
          totalWarnings++;
        }
      });
    }
  });

  // Print summary
  printHeader('\n📈 Summary');
  const totalFiles = results.length;
  const validFiles = results.filter((r) => !r.hasErrors).length;

  console.log(`Total files: ${totalFiles}`);
  console.log(`${colors.green}Valid files: ${validFiles}${colors.reset}`);
  if (totalErrors > 0) {
    console.log(`${colors.red}Errors: ${totalErrors}${colors.reset}`);
  }
  if (totalWarnings > 0) {
    console.log(`${colors.yellow}Warnings: ${totalWarnings}${colors.reset}`);
  }

  if (totalErrors === 0 && totalWarnings === 0) {
    console.log(`\n${colors.green}🎉 All slides passed validation!${colors.reset}`);
  } else if (totalErrors > 0) {
    console.log(`\n${colors.red}❌ Validation failed with errors${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${colors.yellow}⚠️  Validation passed with warnings${colors.reset}`);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const slidesPath = args[0] || DEFAULT_SLIDES_PATH;

validateSlides(slidesPath);
