#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

print_message $BLUE "🚀 Counter DApp 自动化部署脚本"
echo "=================================="

# 清理 Git 仓库
print_message $BLUE "🧹 清理 Git 仓库..."
if git prune >/dev/null 2>&1; then
    print_message $GREEN "✅ Git 仓库清理完成"
fi
if [ -f ".git/gc.log" ]; then
    rm -f .git/gc.log
    print_message $GREEN "✅ 清理 Git GC 日志"
fi

# 检查是否在 main 分支
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    print_message $RED "❌ 错误：请在 main 分支上运行此脚本"
    print_message $YELLOW "当前分支：$current_branch"
    print_message $YELLOW "请运行: git checkout main"
    exit 1
fi

# 检查是否有未提交的更改
if [ -z "$(git status --porcelain)" ]; then
    print_message $YELLOW "⚠️  没有未提交的更改，跳过提交步骤"
    SKIP_COMMIT=true
else
    print_message $GREEN "📝 发现未提交的更改"
    SKIP_COMMIT=false
fi

# 步骤 1: 本地构建测试
print_message $BLUE "📦 步骤 1: 本地构建测试..."
if npm run build; then
    print_message $GREEN "✅ 本地构建成功！"
else
    print_message $RED "❌ 本地构建失败！"
    exit 1
fi

# 步骤 2: 提交更改（如果有）
if [ "$SKIP_COMMIT" = false ]; then
    print_message $BLUE "📝 步骤 2: 提交更改..."
    
    # 获取提交信息
    if [ -n "$1" ]; then
        commit_message="$1"
    else
        echo -e "${YELLOW}请输入提交信息（或按回车使用默认信息）：${NC}"
        read commit_message
        if [ -z "$commit_message" ]; then
            commit_message="Auto deploy - $(date '+%Y-%m-%d %H:%M:%S')"
        fi
    fi
    
    # 提交更改
    if git add . && git commit -m "$commit_message"; then
        print_message $GREEN "✅ 提交成功！"
        
        # 推送到远程仓库，触发 GitHub Actions
        print_message $BLUE "📤 推送到远程仓库，触发自动部署..."
        if git push origin main; then
            print_message $GREEN "✅ 推送成功！"
            print_message $BLUE "🔄 GitHub Actions 将自动构建和部署..."
        else
            print_message $RED "❌ 推送失败！"
            exit 1
        fi
    else
        print_message $RED "❌ 提交失败！"
        exit 1
    fi
else
    print_message $YELLOW "⏭️  跳过提交步骤"
fi

# 完成
echo ""
print_message $GREEN "🎉 自动化部署完成！"
print_message $BLUE "🌐 网站地址：https://iunknow588.github.io/counter-frontend/"
print_message $YELLOW "⏰ GitHub Actions 正在自动部署，可能需要几分钟时间"
echo ""

# 显示部署统计
print_message $BLUE "📊 部署统计："
echo "  - 本地构建: ✅ 成功"
if [ "$SKIP_COMMIT" = false ]; then
    echo "  - 代码提交: ✅ 成功"
    echo "  - 远程推送: ✅ 成功"
    echo "  - 自动部署: 🔄 进行中"
else
    echo "  - 代码提交: ⏭️  跳过"
    echo "  - 自动部署: ⏭️  跳过"
fi
echo "" 