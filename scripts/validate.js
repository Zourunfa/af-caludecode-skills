#!/usr/bin/env node

/**
 * Plugin Configuration Validator
 * Validates plugin.json files against the required schema
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Required fields in plugin.json
const REQUIRED_FIELDS = ['name', 'version', 'description', 'components'];
const ALLOWED_COMPONENT_TYPES = ['skills', 'commands', 'templates'];

class ValidationError extends Error {
  constructor(message, file) {
    super(message);
    this.name = 'ValidationError';
    this.file = file;
  }
}

function validatePlugin(pluginPath) {
  const fullPath = path.resolve(pluginPath);

  if (!fs.existsSync(fullPath)) {
    throw new ValidationError(`Plugin file not found: ${pluginPath}`, pluginPath);
  }

  let pluginJson;
  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    pluginJson = JSON.parse(content);
  } catch (error) {
    throw new ValidationError(
      `Failed to parse JSON: ${error.message}`,
      pluginPath
    );
  }

  // Validate required fields
  const missingFields = REQUIRED_FIELDS.filter(
    field => !pluginJson[field]
  );

  if (missingFields.length > 0) {
    throw new ValidationError(
      `Missing required fields: ${missingFields.join(', ')}`,
      pluginPath
    );
  }

  // Validate components
  if (!pluginJson.components || typeof pluginJson.components !== 'object') {
    throw new ValidationError(
      'components must be an object',
      pluginPath
    );
  }

  for (const [key, value] of Object.entries(pluginJson.components)) {
    if (!ALLOWED_COMPONENT_TYPES.includes(key)) {
      throw new ValidationError(
        `Unknown component type: ${key}. Allowed: ${ALLOWED_COMPONENT_TYPES.join(', ')}`,
        pluginPath
      );
    }

    if (!Array.isArray(value)) {
      throw new ValidationError(
        `components.${key} must be an array`,
        pluginPath
      );
    }
  }

  // Validate version format (semver)
  const versionRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?(\+[a-zA-Z0-9.]+)?$/;
  if (!versionRegex.test(pluginJson.version)) {
    throw new ValidationError(
      `Invalid version format: ${pluginJson.version}. Expected semver (e.g., 1.0.0)`,
      pluginPath
    );
  }

  // Validate name format
  if (!/^[a-z0-9-]+$/.test(pluginJson.name)) {
    throw new ValidationError(
      `Invalid name format: ${pluginJson.name}. Use lowercase letters, numbers, and hyphens only`,
      pluginPath
    );
  }

  // Check if referenced files exist
  const pluginDir = path.dirname(fullPath);
  for (const [componentType, patterns] of Object.entries(pluginJson.components)) {
    for (const pattern of patterns) {
      const globPath = path.join(pluginDir, pattern);

      // For simple patterns, check if the directory exists
      const dirToCheck = path.dirname(globPath);
      if (dirToCheck && !fs.existsSync(dirToCheck)) {
        console.warn(`  ⚠️  Warning: Directory not found for pattern: ${pattern}`);
      }
    }
  }

  return {
    valid: true,
    plugin: pluginJson
  };
}

function validateAllPlugins() {
  const pluginsDir = path.join(__dirname, '..', 'plugins');

  if (!fs.existsSync(pluginsDir)) {
    console.error('Error: plugins directory not found');
    process.exit(1);
  }

  const plugins = fs.readdirSync(pluginsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  if (plugins.length === 0) {
    console.log('No plugins found in plugins directory');
    return;
  }

  const results = [];
  let hasErrors = false;

  for (const pluginName of plugins) {
    const pluginJsonPath = path.join(pluginsDir, pluginName, 'plugin.json');

    try {
      const result = validatePlugin(pluginJsonPath);
      results.push({ plugin: pluginName, status: 'valid', data: result.plugin });
      console.log(`✅ ${pluginName}: Valid`);
    } catch (error) {
      hasErrors = true;
      results.push({ plugin: pluginName, status: 'invalid', error: error.message });
      console.error(`❌ ${pluginName}: ${error.message}`);
    }
  }

  if (hasErrors) {
    console.error('\n❌ Validation failed for one or more plugins');
    process.exit(1);
  } else {
    console.log('\n✅ All plugins validated successfully!');
  }
}

function main() {
  const args = process.argv.slice(2);

  try {
    if (args.includes('--all')) {
      validateAllPlugins();
    } else if (args.length > 0) {
      const pluginPath = args[0];
      const result = validatePlugin(pluginPath);
      console.log(`✅ Plugin validated successfully: ${result.plugin.name}@${result.plugin.version}`);
    } else {
      console.log('Usage: node validate.js <plugin.json> | --all');
      console.log('');
      console.log('Examples:');
      console.log('  node validate.js plugins/slides-generator/plugin.json');
      console.log('  node validate.js --all');
      process.exit(1);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(`❌ Validation Error in ${error.file}:`);
      console.error(`   ${error.message}`);
    } else {
      console.error(`❌ Error: ${error.message}`);
    }
    process.exit(1);
  }
}

main();
