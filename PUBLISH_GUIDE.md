# slides-generator 插件发布指南

## 📋 发布前检查清单

- [ ] 所有代码文件已创建
- [ ] 插件配置文件 `plugin.json` 已完善
- [ ] 市场配置 `market.json` 已更新
- [ ] 中文文档已创建
- [ ] Git 仓库已初始化

---

## 🚀 发布步骤详解

### 第 1 步：验证插件配置

```bash
# 验证单个插件
node scripts/validate.js plugins/slides-generator/plugin.json

# 验证所有插件
npm run validate:all
```

**预期输出：**
```
✅ slides-generator: Valid
✅ Plugin validated successfully: slides-generator@1.0.0
```

### 第 2 步：检查 Git 状态

```bash
# 查看当前分支和状态
git status

# 查看远程仓库
git remote -v

# 查看最近的提交
git log --oneline -5
```

**预期输出：**
```
On branch main
nothing to commit, working tree clean

origin	https://github.com/Zourunfa/af-caludecode-skills.git (fetch)
origin	https://github.com/Zourunfa/af-caludecode-skills.git (push)
```

### 第 3 步：添加所有更改

```bash
# 添加所有文件
git add -A

# 查看将要提交的文件
git status
```

### 第 4 步：提交更改

```bash
git commit -m "chore: update repository URLs for GitHub publication

- Update market.json with correct GitHub repository URL
- Update plugin.json repository information
- Prepare for v1.0.0 release

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

**预期输出：**
```
[main xxxxxx] chore: update repository URLs for GitHub publication
 2 files changed, 4 insertions(+), 4 deletions(-)
```

### 第 5 步：推送到 GitHub

```bash
# 推送到 main 分支
git push origin main
```

**预期输出：**
```
To https://github.com/Zourunfa/af-caludecode-skills.git
   xxxxxxx..yyyyyyy  main -> main
```

### 第 6 步：创建版本标签

```bash
# 创建带注释的标签
git tag -a v1.0.0 -m "Release v1.0.0 - slides-generator plugin"

# 推送标签到 GitHub
git push origin v1.0.0
```

**预期输出：**
```
To https://github.com/Zourunfa/af-caludecode-skills.git
 * [new tag]         v1.0.0 -> v1.0.0
```

### 第 7 步：创建 GitHub Release（可选）

如果有安装 `gh` CLI：

```bash
gh release create v1.0.0 \
  --title "v1.0.0 - slides-generator Plugin" \
  --notes "Release notes here"
```

或者手动在 GitHub 网页上创建：
1. 访问 https://github.com/Zourunfa/af-caludecode-skills/releases
2. 点击 "Draft a new release"
3. 选择标签 v1.0.0
4. 填写标题和说明
5. 点击 "Publish release"

---

## ✅ 验证发布是否成功

### 方法 1：检查 GitHub 仓库

```bash
# 在浏览器中访问
https://github.com/Zourunfa/af-caludecode-skills
```

**检查项：**
- [ ] 代码已推送，文件都在
- [ ] Tags 页面显示 v1.0.0 标签
- [ ] Releases 页面有 v1.0.0 release（如果创建的话）

### 方法 2：验证标签

```bash
# 查看本地标签
git tag -l

# 查看远程标签
git ls-remote --tags origin

# 查看标签详情
git show v1.0.0
```

**预期输出：**
```
v1.0.0

From https://github.com/Zourunfa/af-caludecode-skills.git
 * [new tag]         v1.0.0 -> v1.0.0

tag v1.0.0
Tagger: ...
Date: ...

Release v1.0.0 - slides-generator plugin
...
```

### 方法 3：检查插件配置

访问插件配置文件（通过 GitHub Raw URL）：

```bash
# 在浏览器中访问
https://raw.githubusercontent.com/Zourunfa/af-caludecode-skills/main/plugins/slides-generator/plugin.json
```

**验证 JSON 格式正确，包含：**
- `name`: "slides-generator"
- `version`: "1.0.0"
- `description`: 描述信息
- `repository`: 正确的 GitHub URL

### 方法 4：检查市场配置

```bash
# 在浏览器中访问
https://raw.githubusercontent.com/Zourunfa/af-caludecode-skills/main/market.json
```

**验证 JSON 格式正确，包含插件信息**

### 方法 5：用户安装测试

让用户尝试安装：

```bash
# 用户添加市场
/plugin marketplace add Zourunfa/af-caludecode-skills

# 用户查看插件
/plugin menu

# 用户测试生成
/slides title="测试演示" slides=3 theme="modern"
```

---

## 📊 发布成功的标志

✅ **所有检查项通过：**

1. ✓ GitHub 仓库代码完整
2. ✓ v1.0.0 标签已推送
3. ✓ 插件配置文件可访问
4. ✓ 市场配置文件正确
5. ✓ 用户可以添加市场源
6. ✓ 用户可以安装并使用插件

---

## 🔧 常见问题

### Q: 如何查看远程仓库的所有标签？

```bash
git ls-remote --tags origin
```

### Q: 如何删除错误的标签？

```bash
# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin :refs/tags/v1.0.0
```

### Q: 如何更新现有版本？

```bash
# 修改版本号
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# 提交并推送
git push origin main
git push origin --tags
```

### Q: 插件安装失败怎么办？

1. 检查仓库是否为 public（公开）
2. 检查 `market.json` 和 `plugin.json` 格式
3. 验证 GitHub URL 是否正确
4. 尝试重新添加市场源

---

## 📝 版本发布记录

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0.0 | 2026-03-21 | 首次发布 slides-generator 插件 |

---

## 🎯 下一步

发布成功后：

1. 📢 通知用户安装使用
2. 📖 完善文档和使用示例
3. 🐛 收集用户反馈
4. ✨ 开发新功能
5. 🔄 持续维护更新

---

## 📞 支持

如有问题，请访问：
- GitHub Issues: https://github.com/Zourunfa/af-caludecode-skills/issues
- 插件文档: https://github.com/Zourunfa/af-caludecode-skills/tree/main/plugins/slides-generator
