#!/bin/bash

echo "🚀 开始部署 Counter DApp..."

# 清理 Git 仓库
echo "🧹 清理 Git 仓库..."
if git prune >/dev/null 2>&1; then
    echo "✅ Git 仓库清理完成"
fi
if [ -f ".git/gc.log" ]; then
    rm -f .git/gc.log
    echo "✅ 清理 Git GC 日志"
fi

# 检查是否在 main 分支
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "❌ 错误：请在 main 分支上运行此脚本"
    echo "当前分支：$current_branch"
    exit 1
fi

# 构建项目
echo "📦 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败！"
    exit 1
fi

echo "✅ 构建成功！"

# 切换到 gh-pages 分支
echo "🔄 切换到 gh-pages 分支..."
git checkout gh-pages

if [ $? -ne 0 ]; then
    echo "❌ 切换到 gh-pages 分支失败！"
    exit 1
fi

# 清理旧文件
echo "🧹 清理旧文件..."
rm -rf assets/ index.html

# 复制新构建文件
echo "📋 复制新构建文件..."
cp -r dist/* .

# 提交更改
echo "💾 提交更改..."
git add .
git commit -m "Update with latest changes - $(date '+%Y-%m-%d %H:%M:%S')"

# 推送到远程仓库
echo "📤 推送到远程仓库..."
git push origin gh-pages

if [ $? -ne 0 ]; then
    echo "❌ 推送失败！"
    exit 1
fi

# 回到 main 分支
echo "🔄 回到 main 分支..."
git checkout main

echo "✅ 部署完成！"
echo "🌐 网站地址：https://iunknow588.github.io/counter-frontend/"
echo "⏰ 可能需要几分钟时间才能看到更新" 