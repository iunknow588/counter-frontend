# Counter DApp Frontend

基于 React + TypeScript + Vite 的 Counter 智能合约前端应用，已部署到 GitHub Pages。

## 🚀 功能特性

- 🔗 **钱包连接**：模拟钱包连接功能
- 📊 **合约查询**：显示计数器当前值（模拟数据）
- ➕ **递增操作**：模拟执行合约的 increment 方法
- 🔄 **重置功能**：模拟重置计数器为 0
- 🌐 **GitHub Pages 部署**：已部署到 GitHub Pages

## 🛠️ 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **部署平台**：GitHub Pages
- **区块链**：Injective (当前使用模拟数据)

## 📦 安装依赖

```bash
npm install
```

## 🏃‍♂️ 本地开发

```bash
npm run dev
```

访问 http://localhost:5173 查看应用。

## 🚀 部署到 GitHub Pages

### 方法一：使用自动部署脚本（推荐）

```bash
# 确保在 main 分支
git checkout main

# 运行部署脚本
./deploy.sh
```

### 方法二：手动部署

1. **构建项目**
```bash
npx vite build
```

2. **切换到 gh-pages 分支**
```bash
git checkout gh-pages
```

3. **清理并复制文件**
```bash
rm -rf assets/ index.html
cp -r dist/* .
```

4. **提交并推送**
```bash
git add .
git commit -m "Update with latest changes"
git push origin gh-pages
```

5. **回到 main 分支**
```bash
git checkout main
```

## 📋 分支说明

### main 分支
- 包含完整的源代码
- 用于开发和维护
- 包含所有配置文件

### gh-pages 分支
- 只包含构建后的静态文件
- 用于 GitHub Pages 部署
- 不包含源代码

## 🔧 配置说明

### 合约地址
当前使用的合约地址：`inj1qe06nfmzk70xg78knp5qsn3e6fsltqu9sgan8m`

如需修改，请编辑 `src/App.tsx` 中的 `CONTRACT_ADDRESS` 常量。

### 重要配置
- `vite.config.ts` 中的 `base` 设置为 `'./'` 以支持相对路径
- 构建后的文件使用相对路径引用资源

## 🌐 访问地址

- **生产环境**：https://iunknow588.github.io/counter-frontend/
- **开发环境**：http://localhost:5173/ (运行 `npm run dev` 后)

## 📝 使用说明

1. **连接钱包**：点击"连接钱包"按钮（模拟连接）
2. **查看计数**：连接钱包后显示随机生成的计数器值
3. **递增计数**：点击"递增"按钮模拟执行 increment 操作
4. **重置计数**：点击"重置"按钮将计数器重置为 0

## ⚠️ 重要注意事项

### 1. 分支管理
- **永远不要**在 `gh-pages` 分支上直接修改文件
- 所有开发工作都在 `main` 分支进行
- `gh-pages` 分支只用于部署

### 2. 文件路径问题
- 确保 `vite.config.ts` 中的 `base` 设置为 `'./'`
- 构建后的 `index.html` 应该使用相对路径引用资源文件

### 3. 构建文件
- 每次修改后都需要重新构建
- 构建后的文件名会变化（包含哈希值）
- 确保 `gh-pages` 分支包含最新的构建文件

## 🔗 相关链接

- [GitHub 仓库](https://github.com/iunknow588/counter-frontend)
- [部署指南](DEPLOYMENT_GUIDE.md)
- [Injective 官方文档](https://docs.ts.injective.network/)

## 📄 许可证

MIT License

---
*最后更新：2024年7月29日*
