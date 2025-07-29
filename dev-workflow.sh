#!/bin/bash

echo "🔄 开发工作流脚本..."

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 发现未提交的更改，准备提交..."
    
    # 提示用户输入提交信息
    echo "请输入提交信息（或按回车使用默认信息）："
    read commit_message
    
    if [ -z "$commit_message" ]; then
        commit_message="Update code - $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    # 提交更改
    git add .
    git commit -m "$commit_message"
    git push origin main
    
    echo "✅ 代码已提交并推送到远程仓库"
else
    echo "✅ 没有未提交的更改"
fi

# 询问是否要部署
echo "是否要部署到 GitHub Pages？(y/n)"
read deploy_choice

if [ "$deploy_choice" = "y" ] || [ "$deploy_choice" = "Y" ]; then
    echo "🚀 开始部署..."
    ./deploy.sh
else
    echo "部署已跳过"
fi

echo "✅ 开发工作流完成！" 