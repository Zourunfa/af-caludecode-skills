#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}=== Claude Code Plugin Release Script ===${NC}\n"

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}Error: Not a git repository${NC}"
    echo "Please run: git init"
    exit 1
fi

# Validate all plugins first
echo -e "${YELLOW}Step 1: Validating all plugins...${NC}"
cd "$PROJECT_ROOT"
npm run validate:all

if [ $? -ne 0 ]; then
    echo -e "${RED}Validation failed. Please fix errors before releasing.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ All plugins validated${NC}\n"

# Check for uncommitted changes
echo -e "${YELLOW}Step 2: Checking git status...${NC}"
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}Warning: You have uncommitted changes${NC}"
    git status --short
    echo ""
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
fi

# Get current version
VERSION=$(node -p "require('./package.json').version")
echo -e "${BLUE}Current version: ${VERSION}${NC}\n"

# Ask for release type
echo "Select release type:"
echo "  1) patch (${VERSION%.*}.$(( ${VERSION##*.} + 1 )))"
echo "  2) minor (${VERSION%.*}.$(( ${VERSION##*.} + 1 )) -> ${VERSION:0:${VERSION##*.}}.$(( ${VERSION##*.} + 1 ))?)"
echo "  3) major ($(( ${VERSION%%.*} + 1 )).0.0)"
echo "  4) custom"
read -p "Choose (1-4): " RELEASE_TYPE

case $RELEASE_TYPE in
    1)
        NEW_VERSION="${VERSION%.*}.$(( ${VERSION##*.} + 1 ))"
        ;;
    2)
        MINOR="${VERSION#*.}"
        MINOR="${MINOR%.*}"
        NEW_VERSION="${VERSION%%.*}.$(( MINOR + 1 )).0"
        ;;
    3)
        NEW_VERSION="$(( ${VERSION%%.*} + 1 )).0.0"
        ;;
    4)
        read -p "Enter version (e.g., 1.2.3): " NEW_VERSION
        if [[ ! $NEW_VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            echo -e "${RED}Invalid version format${NC}"
            exit 1
        fi
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo -e "\n${BLUE}Releasing version: ${NEW_VERSION}${NC}"

# Update version in package.json
echo -e "\n${YELLOW}Step 3: Updating version in package.json...${NC}"
npm version "$NEW_VERSION" --no-git-tag-version

# Commit changes
echo -e "\n${YELLOW}Step 4: Committing version changes...${NC}"
git add package.json
git commit -m "chore: bump version to ${NEW_VERSION}"

# Create tag
echo -e "\n${YELLOW}Step 5: Creating git tag...${NC}"
git tag -a "v${NEW_VERSION}" -m "Release v${NEW_VERSION}"

# Push to GitHub
echo -e "\n${YELLOW}Step 6: Pushing to GitHub...${NC}"
read -p "Push to GitHub now? (Y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    git push
    git push --tags
    echo -e "${GREEN}✓ Pushed to GitHub${NC}"

    # Create GitHub release
    if command -v gh &> /dev/null; then
        echo -e "\n${YELLOW}Step 7: Creating GitHub release...${NC}"
        gh release create "v${NEW_VERSION}" --title "v${NEW_VERSION}" --notes "Release v${NEW_VERSION}"
        echo -e "${GREEN}✓ GitHub release created${NC}"
    else
        echo -e "${YELLOW}gh CLI not found. Skipping release creation.${NC}"
        echo "Create release manually at: https://github.com/<your-username>/af-claudecode-skill/releases/new"
    fi
else
    echo -e "${YELLOW}Skipped push. Push manually with:${NC}"
    echo "  git push"
    echo "  git push --tags"
fi

echo -e "\n${GREEN}=== Release ${NEW_VERSION} completed! ===${NC}"
echo -e "\nPlugin installation command:"
echo -e "  /plugin marketplace add <your-username>/af-claudecode-skill"
