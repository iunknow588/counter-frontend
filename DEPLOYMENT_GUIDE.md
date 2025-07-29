# Counter DApp 部署指南

## 项目概述
这是一个基于 React + TypeScript + Vite 的 Counter 智能合约前端应用，部署在 GitHub Pages 上。

## 项目结构
```
counter-frontend/
├── src/
│   ├── App.tsx          # 主应用组件
│   ├── main.tsx         # 应用入口
│   └── index.css        # 样式文件
├── dist/                # 构建输出目录
├── package.json         # 项目配置
├── vite.config.ts       # Vite 配置
├── tsconfig.json        # TypeScript 配置
└── DEPLOYMENT_GUIDE.md  # 本文件
```

## 分支说明

### main 分支
- 包含完整的源代码
- 用于开发和维护
- 包含所有配置文件

### gh-pages 分支
- 只包含构建后的静态文件
- 用于 GitHub Pages 部署
- 不包含源代码

## 开发工作流程

### 1. 修改代码
```bash
# 确保在 main 分支
git checkout main

# 修改源代码文件
# 例如：编辑 src/App.tsx
```

### 2. 本地测试
```bash
# 启动开发服务器
npm run dev

# 或者构建并预览
npm run build
npm run preview
```

### 3. 提交代码
```bash
# 提交到 main 分支
git add .
git commit -m "描述你的修改"
git push origin main
```

## 部署流程

### 手动部署
```bash
# 1. 构建项目
npx vite build

# 2. 切换到 gh-pages 分支
git checkout gh-pages

# 3. 清理旧文件
rm -rf assets/ index.html

# 4. 复制新构建文件
cp -r dist/* .

# 5. 提交更改
git add .
git commit -m "Update with latest changes"
git push origin gh-pages

# 6. 回到 main 分支
git checkout main
```

### 自动部署（推荐）
```bash
# 运行部署脚本
./deploy.sh
```

## 重要注意事项

### 1. 文件路径问题
- 确保 `vite.config.ts` 中的 `base` 设置为 `'./'`
- 构建后的 `index.html` 应该使用相对路径引用资源文件

### 2. 分支管理
- **永远不要**在 `gh-pages` 分支上直接修改文件
- 所有开发工作都在 `main` 分支进行
- `gh-pages` 分支只用于部署

### 3. 构建文件
- 每次修改后都需要重新构建
- 构建后的文件名会变化（包含哈希值）
- 确保 `gh-pages` 分支包含最新的构建文件

### 4. 依赖管理
- 当前使用简化的依赖（移除了 Injective SDK）
- 如果需要添加新依赖，更新 `package.json` 后运行 `npm install`

## 常见问题解决

### 1. 网站显示空白
- 检查 `gh-pages` 分支中的文件是否正确
- 确认 `index.html` 中的资源路径是否正确
- 检查浏览器控制台是否有错误

### 2. 构建失败
- 检查 TypeScript 配置
- 确认所有依赖已安装
- 查看构建错误信息

### 3. 部署失败
- 确认 SSH 密钥配置正确
- 检查 GitHub 仓库权限
- 确认 `gh-pages` 分支存在

## 网站地址
- 生产环境：https://iunknow588.github.io/counter-frontend/
- 开发环境：http://localhost:5173/ (运行 `npm run dev` 后)

## 技术栈
- **前端框架**：React 18
- **构建工具**：Vite
- **语言**：TypeScript
- **部署平台**：GitHub Pages
- **区块链**：Injective (当前使用模拟数据)

## 联系方式
如有问题，请检查：
1. 构建日志
2. 浏览器控制台错误
3. GitHub Pages 设置
4. 分支状态

---
*最后更新：2024年7月29日* 