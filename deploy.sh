#!/bin/bash

# 部署脚本 - 推送到 GitHub 并部署到 GitHub Pages

echo "🚀 开始部署 counter-frontend 到 GitHub Pages..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在 counter-frontend 目录下运行此脚本"
    exit 1
fi

# 检查 git 是否已初始化
if [ ! -d ".git" ]; then
    echo "📁 初始化 git 仓库..."
    git init
fi

# 添加远程仓库
echo "🔗 配置远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/iunknow588/counter-frontend.git

# 添加所有文件
echo "📦 添加文件到 git..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "feat: injective counter frontend with wallet integration"

# 推送到 GitHub
echo "⬆️ 推送到 GitHub..."
git push -u origin main

# 安装依赖（如果需要）
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

# 构建项目
echo "🔨 构建项目..."
npm run build

# 部署到 GitHub Pages
echo "🌐 部署到 GitHub Pages..."
npm run deploy

echo "✅ 部署完成！"
echo "🌍 访问地址: https://iunknow588.github.io/counter-frontend/"
echo ""
echo "📝 注意事项："
echo "1. 确保 GitHub 仓库已启用 GitHub Pages"
echo "2. 在仓库设置中，Source 选择 'Deploy from a branch'"
echo "3. Branch 选择 'gh-pages'"
echo "4. 等待几分钟后即可访问" 