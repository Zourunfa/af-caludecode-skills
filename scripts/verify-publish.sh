#!/bin/bash

# Claude Code Plugin 发布验证脚本
# 检查插件是否成功发布到 GitHub

echo "========================================"
echo "  Claude Code Plugin 发布验证"
echo "========================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查项计数
PASS=0
FAIL=0

# 检查函数
check_pass() {
    echo -e "${GREEN}✅ PASS${NC}: $1"
    ((PASS++))
}

check_fail() {
    echo -e "${RED}❌ FAIL${NC}: $1"
    ((FAIL++))
}

check_warn() {
    echo -e "${YELLOW}⚠️  WARN${NC}: $1"
}

# 1. 检查 Git 远程仓库
echo "1️⃣  检查 Git 远程仓库"
if git remote get-url origin &> /dev/null; then
    REMOTE_URL=$(git remote get-url origin)
    echo "   远程仓库: $REMOTE_URL"
    if [[ "$REMOTE_URL" == *"github.com"* ]]; then
        check_pass "GitHub 远程仓库已配置"
    else
        check_warn "远程仓库不是 GitHub"
    fi
else
    check_fail "未找到远程仓库"
fi
echo ""

# 2. 检查版本标签
echo "2️⃣  检查版本标签"
TAGS=$(git tag -l)
if [ -n "$TAGS" ]; then
    echo "   本地标签: $TAGS"
    check_pass "存在本地版本标签"
else
    check_fail "未找到本地版本标签"
fi

REMOTE_TAGS=$(git ls-remote --tags origin 2>/dev/null | grep -v "\^{}" | awk '{print $2}')
if [ -n "$REMOTE_TAGS" ]; then
    echo "   远程标签: $(echo $REMOTE_TAGS | sed 's/refs\/tags\///g')"
    check_pass "标签已推送到远程"
else
    check_fail "标签未推送到远程"
fi
echo ""

# 3. 检查插件配置文件
echo "3️⃣  检查插件配置文件"
PLUGIN_FILE="plugins/slides-generator/plugin.json"
if [ -f "$PLUGIN_FILE" ]; then
    # 验证 JSON 格式
    if python3 -m json.tool "$PLUGIN_FILE" > /dev/null 2>&1; then
        check_pass "plugin.json 格式正确"
    else
        check_fail "plugin.json 格式错误"
    fi

    # 检查必需字段
    NAME=$(grep -o '"name"[[:space:]]*:[[:space:]]*"[^"]*"' "$PLUGIN_FILE" | cut -d'"' -f4)
    VERSION=$(grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' "$PLUGIN_FILE" | cut -d'"' -f4)
    echo "   插件名称: $NAME"
    echo "   插件版本: $VERSION"

    if [ -n "$NAME" ] && [ -n "$VERSION" ]; then
        check_pass "插件名称和版本正确"
    else
        check_fail "插件配置缺少必需字段"
    fi
else
    check_fail "未找到 plugin.json 文件"
fi
echo ""

# 4. 检查市场配置文件
echo "4️⃣  检查市场配置文件"
MARKET_FILE="market.json"
if [ -f "$MARKET_FILE" ]; then
    if python3 -m json.tool "$MARKET_FILE" > /dev/null 2>&1; then
        check_pass "market.json 格式正确"
    else
        check_fail "market.json 格式错误"
    fi
else
    check_fail "未找到 market.json 文件"
fi
echo ""

# 5. 检查验证脚本
echo "5️⃣  运行插件验证"
if [ -f "scripts/validate.js" ]; then
    VALIDATE_OUTPUT=$(node scripts/validate.js "$PLUGIN_FILE" 2>&1)
    if echo "$VALIDATE_OUTPUT" | grep -q "Valid"; then
        check_pass "插件配置验证通过"
    else
        check_fail "插件配置验证失败"
    fi
else
    check_warn "未找到验证脚本"
fi
echo ""

# 6. 检查 Git 工作区状态
echo "6️⃣  检查 Git 工作区状态"
GIT_STATUS=$(git status --porcelain 2>/dev/null)
if [ -z "$GIT_STATUS" ]; then
    check_pass "工作区干净（无未提交更改）"
else
    check_warn "存在未提交的更改"
    echo "$GIT_STATUS" | head -5
fi
echo ""

# 7. 检查分支
echo "7️⃣  检查 Git 分支"
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
echo "   当前分支: $BRANCH"
if [ "$BRANCH" == "main" ] || [ "$BRANCH" == "master" ]; then
    check_pass "在主分支上"
else
    check_warn "不在主分支上"
fi
echo ""

# 总结
echo "========================================"
echo "  验证结果汇总"
echo "========================================"
echo -e "${GREEN}✅ 通过: $PASS${NC}"
echo -e "${RED}❌ 失败: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 所有检查通过！插件发布成功！${NC}"
    echo ""
    echo "📦 用户可以安装使用了："
    echo "   /plugin marketplace add Zourunfa/af-caludecode-skills"
    echo "   /slides title=\"演示\" slides=5 theme=\"modern\""
    exit 0
else
    echo -e "${RED}❌ 存在 $FAIL 个问题，请检查并修复${NC}"
    exit 1
fi
