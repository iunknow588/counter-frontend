# Injective Counter Frontend

基于 React + TypeScript + Vite 的 Injective 计数器合约前端应用。

## 🚀 功能特性

- 🔗 **钱包连接**：支持 Keplr 等 Cosmos 原生钱包
- 📊 **合约查询**：实时查询计数器当前值
- ➕ **递增操作**：执行合约的 increment 方法
- 🔄 **重置功能**：重置计数器为指定值
- 🌐 **GitHub Pages 部署**：自动部署到 GitHub Pages

## 🛠️ 技术栈

- **前端框架**：React 19 + TypeScript
- **构建工具**：Vite
- **区块链交互**：@injectivelabs/sdk-ts
- **钱包集成**：@injectivelabs/wallet-strategy
- **部署平台**：GitHub Pages

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

### 方法一：使用自动部署脚本

```bash
./deploy.sh
```

### 方法二：手动部署

1. **推送代码到 GitHub**
```bash
git init
git remote add origin https://github.com/iunknow588/counter-frontend.git
git add .
git commit -m "feat: injective counter frontend"
git push -u origin main
```

2. **构建并部署**
```bash
npm run build
npm run deploy
```

### GitHub Pages 配置

1. 进入 GitHub 仓库设置
2. 找到 "Pages" 选项
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "gh-pages"
5. 保存设置

## 🔧 配置说明

### 合约地址
当前使用的合约地址：`inj1qe06nfmzk70xg78knp5qsn3e6fsltqu9sgan8m`

如需修改，请编辑 `src/App.tsx` 中的 `CONTRACT_ADDRESS` 常量。

### 网络配置
- **主网**：ChainId.Mainnet
- **测试网**：ChainId.Testnet

## 🌐 访问地址

部署完成后，可通过以下地址访问：
- **GitHub Pages**：https://iunknow588.github.io/counter-frontend/

## 📝 使用说明

1. **连接钱包**：点击"连接钱包"按钮，选择 Keplr 钱包
2. **查看计数**：连接钱包后自动显示当前计数器值
3. **递增计数**：点击"递增"按钮执行 increment 操作
4. **重置计数**：输入新值后点击"重置为指定值"

## 🔗 相关链接

- [Injective 官方文档](https://docs.ts.injective.network/)
- [Wallet Strategy 文档](https://docs.ts.injective.network/wallets/wallet-wallet-strategy)
- [GitHub 仓库](https://github.com/iunknow588/counter-frontend)

## �� 许可证

MIT License
