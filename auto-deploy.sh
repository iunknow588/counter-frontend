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

# 检查 SSH 密钥配置
print_message $BLUE "🔑 检查 SSH 密钥配置..."
if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
    print_message $GREEN "✅ SSH 密钥配置正确"
elif ssh -T git@github.com 2>&1 | grep -q "Permission denied"; then
    print_message $RED "❌ SSH 密钥认证失败"
    print_message $YELLOW "🔄 尝试在当前 shell 中设置 SSH 认证..."
    
    # 在当前 shell 中直接设置 SSH 认证
    print_message $BLUE "📡 启动 SSH 代理..."
    eval "$(ssh-agent -s)"
    
    print_message $BLUE "🔑 添加 SSH 密钥..."
    if ssh-add ~/.ssh/dell; then
        print_message $GREEN "✅ SSH 密钥添加成功"
        
        print_message $BLUE "🔍 测试 GitHub 连接..."
        if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
            print_message $GREEN "✅ SSH 认证成功"
        else
            print_message $RED "❌ SSH 认证仍然失败"
            print_message $YELLOW "💡 请手动检查 SSH 配置"
        fi
    else
        print_message $RED "❌ SSH 密钥添加失败"
        print_message $YELLOW "💡 请检查 SSH 密钥文件是否存在"
    fi
else
    print_message $YELLOW "⚠️  无法验证 SSH 密钥，将尝试推送"
fi

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
            print_message $YELLOW "🔄 尝试重新登录 SSH 并重试推送..."
            
            # 尝试重新设置 SSH 认证
            print_message $BLUE "📡 重新设置 SSH 认证..."
            
            # 重新启动 SSH 代理并添加密钥
            eval "$(ssh-agent -s)"
            if ssh-add ~/.ssh/dell; then
                print_message $GREEN "✅ SSH 密钥重新添加成功"
                
                # 测试连接
                if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
                    print_message $GREEN "✅ SSH 重新认证成功，尝试重新推送..."
                    if git push origin main; then
                        print_message $GREEN "✅ 重新推送成功！"
                        print_message $BLUE "🔄 GitHub Actions 将自动构建和部署..."
                    else
                        print_message $RED "❌ 重新推送仍然失败"
                        print_message $YELLOW "🔄 正在回滚提交..."
                        if git reset --soft HEAD~1; then
                            print_message $GREEN "✅ 提交已回滚"
                            print_message $YELLOW "💡 请手动检查网络连接或 GitHub 配置"
                        else
                            print_message $RED "❌ 回滚失败，请手动处理"
                        fi
                        exit 1
                    fi
                else
                    print_message $RED "❌ SSH 重新认证失败"
                    print_message $YELLOW "🔄 正在回滚提交..."
                    if git reset --soft HEAD~1; then
                        print_message $GREEN "✅ 提交已回滚"
                        print_message $YELLOW "💡 请手动检查 SSH 配置"
                    else
                        print_message $RED "❌ 回滚失败，请手动处理"
                    fi
                    exit 1
                fi
            else
                print_message $RED "❌ SSH 密钥重新添加失败"
                print_message $YELLOW "🔄 正在回滚提交..."
                if git reset --soft HEAD~1; then
                    print_message $GREEN "✅ 提交已回滚"
                    print_message $YELLOW "💡 请手动检查 SSH 配置"
                else
                    print_message $RED "❌ 回滚失败，请手动处理"
                fi
                exit 1
            fi
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