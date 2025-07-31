import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { Wallet, WalletStrategy } from "@injectivelabs/wallet-ts";
import { ChainId } from "@injectivelabs/ts-types";
import { IndexerGrpcMetaApi, MsgExecuteContract, MsgBroadcasterWithPk, ChainGrpcBankApi } from "@injectivelabs/sdk-ts";
import { Network, getNetworkEndpoints } from "@injectivelabs/networks";

// 立即执行的测试日志
console.log("🔥 文件加载测试 - App.tsx 开始加载");
console.log("⏰ 加载时间:", new Date().toISOString());
console.log("🌍 运行环境:", typeof window !== 'undefined' ? '浏览器' : 'Node.js');

// 类型声明，解决 window.keplr 报错
declare global {
  interface Window {
    keplr?: any;
  }
}

// 测试网配置 - 使用实际运营代码的方式
const NETWORK = Network.Testnet;
const endpointsForNetwork = getNetworkEndpoints(NETWORK);
const CHAIN_ID = "injective-888" as any; // 使用正确的测试网链ID
const CONTRACT_ADDRESS = "inj1qe06nfmzk70xg78knp5qsn3e6fsltqu9sgan8m";

// 测试日志功能
console.log("🚀 App.tsx 已加载，测试日志功能");
console.log("📅 当前时间:", new Date().toLocaleString());
console.log("🌐 网络配置:", { NETWORK, CHAIN_ID, endpointsForNetwork });
console.log("🔗 端点详情:", {
  grpc: endpointsForNetwork.grpc,
  indexer: endpointsForNetwork.indexer
});

function App() {
  console.log("🔧 App 组件开始渲染");
  
  // 添加明显的测试日志
  console.error("🚨 错误日志测试 - 这应该很明显");
  console.warn("⚠️ 警告日志测试 - 这应该很明显");
  console.info("ℹ️ 信息日志测试 - 这应该很明显");
  
  // 测试源码映射 - 故意创建一个错误
  const testSourceMap = () => {
    console.log("🧪 测试源码映射功能");
    // 这行代码应该能在开发者工具中显示正确的行号
    throw new Error("🔍 这是一个测试错误，用于验证源码映射是否工作");
  };
  
  // 如果控制台不可见，使用 alert 作为备选
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      console.log("🔄 延迟测试日志 - 3秒后执行");
      // 3秒后触发测试错误
      // testSourceMap(); // 暂时注释掉，避免页面崩溃
    }, 3000);
  }
  
  // 计数器状态
  const [count, setCount] = useState<number>(0);
  // 钱包地址
  const [address, setAddress] = useState<string>("");
  // 钱包是否已连接
  const [isConnected, setIsConnected] = useState<boolean>(false);
  // 加载状态
  const [loading, setLoading] = useState<boolean>(false);
  // 错误信息
  const [error, setError] = useState<string>("");
  // 私钥（从 Keplr 获取）
  const [privateKey, setPrivateKey] = useState<string>("");
  // 账户余额
  const [balance, setBalance] = useState<any>(null);
  // 余额加载状态
  const [balanceLoading, setBalanceLoading] = useState<boolean>(false);

  // 钱包策略、合约查询API、银行API
  const [walletStrategy, setWalletStrategy] = useState<any>(null);
  const [wasmApi, setWasmApi] = useState<any>(null);
  const [bankApi, setBankApi] = useState<any>(null);

  // 测试点击函数
  const testClick = async () => {
    console.log("🎯 测试按钮被点击了！");
    console.log("🔑 当前私钥状态:", privateKey ? "已获取" : "未获取");
    console.log("👛 当前钱包状态:", { address, isConnected });
    console.log("💰 当前余额状态:", { balance, balanceLoading });
    console.log("🌐 网络配置:", { NETWORK, CHAIN_ID });
    console.log("📡 API 状态:", { wasmApi: !!wasmApi, walletStrategy: !!walletStrategy, bankApi: !!bankApi });
    console.log("🔍 Keplr 状态:", { 
      keplrInstalled: !!window.keplr,
      keplrType: typeof window.keplr,
      keplrVersion: window.keplr?.version || "未安装"
    });
    
    // 测试 Keplr 功能
    if (window.keplr) {
      try {
        console.log("🔍 测试 Keplr 功能...");
        const accounts = await window.keplr.getAccounts();
        console.log("📋 Keplr 账户:", accounts);
        
        // 测试网络支持
        const supportedChains = await window.keplr.getSupportedChains();
        console.log("🌐 支持的链:", supportedChains);
        
        // 测试当前链状态
        const currentChain = await window.keplr.getChainId();
        console.log("🔗 当前链ID:", currentChain);
        
      } catch (keplrError) {
        console.error("❌ Keplr 功能测试失败:", keplrError);
      }
    }
    
    alert("测试按钮被点击了！请检查控制台日志。");
  };

  // 专门测试 Keplr 连接
  const testKeplrConnection = async () => {
    console.log("🔗 开始测试 Keplr 连接...");
    
    if (!window.keplr) {
      alert("❌ Keplr 未安装！请先安装 Keplr 钱包扩展。");
      return;
    }
    
    try {
      // 1. 测试基本功能
      console.log("📋 测试获取账户...");
      const accounts = await window.keplr.getAccounts();
      console.log("📋 账户列表:", accounts);
      
      if (accounts.length === 0) {
        alert("❌ Keplr 中没有账户！请先创建或导入账户。");
        return;
      }
      
      // 2. 测试网络支持
      console.log("🌐 测试网络支持...");
      const supportedChains = await window.keplr.getSupportedChains();
      console.log("🌐 支持的链:", supportedChains);
      
      // 3. 测试 enable 调用
      console.log("🔐 测试 enable 调用...");
      console.log("🔗 目标链ID:", CHAIN_ID);
      
      await window.keplr.enable(CHAIN_ID);
      console.log("✅ enable 调用成功！");
      
      // 4. 测试获取地址
      console.log("📍 测试获取地址...");
      const address = await window.keplr.getKey(CHAIN_ID);
      console.log("📍 获取到的地址:", address);
      
      alert("✅ Keplr 连接测试成功！\n\n地址: " + address.bech32Address + "\n\n请检查控制台获取详细信息。");
      
    } catch (error: any) {
      console.error("❌ Keplr 连接测试失败:", error);
      alert("❌ Keplr 连接测试失败！\n\n错误: " + error.message + "\n\n请检查控制台获取详细信息。");
    }
  };

  // 测试网络端点连接
  const testNetworkEndpoints = async () => {
    console.log("🌐 开始测试网络端点连接...");
    console.log("📡 当前网络配置:", { NETWORK, CHAIN_ID, endpointsForNetwork });
    
    try {
      // 测试 gRPC 端点
      console.log("🔗 测试 gRPC 端点:", endpointsForNetwork.grpc);
      
      // 测试 Indexer 端点
      console.log("📊 测试 Indexer 端点:", endpointsForNetwork.indexer);
      
      // 尝试创建一个简单的 API 实例来测试连接
      if (wasmApi) {
        console.log("✅ WASM API 已初始化");
        try {
          // 尝试查询一个简单的合约状态
          const testResponse = await wasmApi.fetchSmartContractState({
            address: CONTRACT_ADDRESS,
            query: { get_count: {} }
          });
          console.log("✅ 合约查询成功:", testResponse);
        } catch (contractError) {
          console.warn("⚠️ 合约查询失败，但 API 连接正常:", contractError);
        }
      } else {
        console.warn("⚠️ WASM API 未初始化");
      }
      
      if (bankApi) {
        console.log("✅ Bank API 已初始化");
      } else {
        console.warn("⚠️ Bank API 未初始化");
      }
      
      alert("✅ 网络端点测试完成！\n\n请检查控制台获取详细信息。");
      
    } catch (error: any) {
      console.error("❌ 网络端点测试失败:", error);
      alert("❌ 网络端点测试失败！\n\n错误: " + error.message + "\n\n请检查控制台获取详细信息。");
    }
  };

  // 初始化 API
  useEffect(() => {
    console.log("[App] 应用启动，初始化配置");
    console.log("[App] 使用测试网配置:", { NETWORK, CHAIN_ID, endpointsForNetwork });
    
    // 初始化合约查询 API
    const wasmApi = new IndexerGrpcMetaApi(endpointsForNetwork.grpc);
    setWasmApi(wasmApi);

    // 初始化银行 API
    const bankApi = new ChainGrpcBankApi(endpointsForNetwork.grpc);
    setBankApi(bankApi);

    console.log("[App] 初始化完成，等待用户连接钱包");
  }, []);

  // 连接钱包（参考 Injective 官方文档 WalletStrategy 规范流程）
  const connectWallet = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("[connectWallet] 开始连接钱包");
      console.log("[connectWallet] 网络配置:", { NETWORK, CHAIN_ID, endpointsForNetwork });
      console.log("[connectWallet] Keplr 对象状态:", {
        keplrExists: !!window.keplr,
        keplrType: typeof window.keplr,
        keplrVersion: window.keplr?.version || "未安装"
      });
      
      // 1. 检查 Keplr 是否安装
      if (!window.keplr) {
        setError("Please install Keplr wallet extension");
        setLoading(false);
        return;
      }
      
      // 2. 检查 Keplr 是否有账户
      console.log("[connectWallet] 检查 Keplr 账户");
      try {
        const accounts = await window.keplr.getAccounts();
        console.log("[connectWallet] Keplr 账户列表:", accounts);
        
        if (!accounts || accounts.length === 0) {
          setError("Keplr wallet has no accounts. Please create or import an account first.");
          setLoading(false);
          return;
        }
      } catch (accountError) {
        console.error("[connectWallet] 获取账户失败:", accountError);
        setError("Failed to get accounts from Keplr wallet");
        setLoading(false);
        return;
      }
      
      // 3. 检查网络支持
      console.log("[connectWallet] 检查网络支持");
      try {
        const supportedChains = await window.keplr.getSupportedChains();
        console.log("[connectWallet] 支持的链:", supportedChains);
        
        if (!supportedChains.includes(CHAIN_ID)) {
          console.warn("[connectWallet] 当前链不在支持列表中，尝试添加网络");
          // 尝试添加网络到 Keplr
          try {
            await window.keplr.experimentalSuggestChain({
              chainId: CHAIN_ID,
              chainName: "Injective Testnet",
              rpc: endpointsForNetwork.grpc,
              rest: endpointsForNetwork.indexer,
              bip44: {
                coinType: 60,
              },
              bech32Config: {
                bech32PrefixAccAddr: "inj",
                bech32PrefixAccPub: "injpub",
                bech32PrefixValAddr: "injvaloper",
                bech32PrefixValPub: "injvaloperpub",
                bech32PrefixConsAddr: "injvalcons",
                bech32PrefixConsPub: "injvalconspub",
              },
            });
            console.log("[connectWallet] 网络添加成功");
          } catch (addChainError) {
            console.warn("[connectWallet] 添加网络失败:", addChainError);
          }
        }
      } catch (chainError) {
        console.warn("[connectWallet] 检查网络支持失败:", chainError);
      }
      
      // 4. 请求授权连接 - 这里应该会弹出授权界面
      console.log("[connectWallet] 调用 keplr.enable，准备弹出授权界面，chainId:", CHAIN_ID);
      try {
        await window.keplr.enable(CHAIN_ID);
        console.log("[connectWallet] keplr.enable 调用完成，用户已授权或已授权过");
      } catch (enableError: any) {
        console.error("[connectWallet] keplr.enable 失败:", enableError);
        if (enableError.code === 4001) {
          setError("User rejected the connection request");
        } else {
          setError(`Failed to enable Keplr: ${enableError.message}`);
        }
        setLoading(false);
        return;
      }
      
      // 5. 创建 Injective 钱包策略
      console.log("[connectWallet] 创建 WalletStrategy 实例");
      const strategy = new WalletStrategy({
        chainId: CHAIN_ID,
        wallet: Wallet.Keplr,
      });
      setWalletStrategy(strategy);
      
      // 6. 获取钱包地址
      console.log("[connectWallet] 调用 strategy.getAddresses()");
      const addresses = await strategy.getAddresses();
      console.log("[connectWallet] 获取到钱包地址:", addresses);
      
      if (addresses.length > 0) {
        const walletAddress = addresses[0];
        setAddress(walletAddress);
        
        // 7. 获取私钥 - 这是关键步骤
        console.log("[connectWallet] 尝试获取私钥");
        try {
          // 从 Keplr 获取私钥
          const privateKeyHex = await window.keplr.getEnigmaUtils(CHAIN_ID).getTxEncryptionKey(walletAddress);
          console.log("[connectWallet] 获取到私钥（已加密）");
          
          // 解密私钥（这里需要用户输入密码）
          const decryptedPrivateKey = await window.keplr.getEnigmaUtils(CHAIN_ID).decrypt(walletAddress, privateKeyHex);
          setPrivateKey(decryptedPrivateKey);
          console.log("[connectWallet] 私钥解密成功");
          
          setIsConnected(true);
          console.log("[connectWallet] 钱包连接成功，isConnected = true");
          
          // 连接成功后自动查询余额和计数
          // 注意：先设置地址，再查询余额
          console.log("[connectWallet] 开始查询余额和计数...");
          await fetchCount();
          await fetchBalance();
        } catch (keyError) {
          console.error("[connectWallet] 获取私钥失败:", keyError);
          setError("Failed to get private key from wallet");
        }
      } else {
        setError("No addresses found in wallet");
        console.warn("[connectWallet] 钱包未返回地址");
      }
    } catch (err: any) {
      console.error("[connectWallet] 连接钱包异常", err);
      
      // 更详细的错误处理
      if (err.code === 4001) {
        setError("User rejected the connection request");
      } else if (err.message && err.message.includes("wallet must has at least one account")) {
        setError("Keplr wallet has no accounts. Please create or import an account first.");
      } else {
        setError(`Connection failed: ${err?.message || err}`);
      }
    } finally {
      setLoading(false);
      console.log("[connectWallet] 连接流程结束");
    }
  };

  // 查询账户余额
  const fetchBalance = async () => {
    console.log("[fetchBalance] 开始查询余额，检查条件...");
    console.log("[fetchBalance] bankApi 状态:", !!bankApi);
    console.log("[fetchBalance] address 状态:", address);
    
    if (!bankApi) {
      console.warn("[fetchBalance] 银行API未初始化");
      return;
    }
    
    if (!address) {
      console.warn("[fetchBalance] 地址为空，无法查询余额");
      return;
    }
    
    setBalanceLoading(true);
    setError("");
    try {
      console.log("[fetchBalance] 开始查询账户余额");
      console.log("[fetchBalance] 查询地址:", address);
      console.log("[fetchBalance] 使用的 API:", bankApi);
      
      const response = await bankApi.fetchBalance({
        accountAddress: address,
      });
      console.log("[fetchBalance] 余额查询返回:", response);
      
      if (response && response.balances) {
        setBalance(response.balances);
        console.log("[fetchBalance] 账户余额:", response.balances);
        console.log("[fetchBalance] 余额数量:", response.balances.length);
      } else {
        console.warn("[fetchBalance] 余额数据为空");
        setBalance([]);
      }
    } catch (err: any) {
      console.error("[fetchBalance] 余额查询异常", err);
      console.error("[fetchBalance] 错误详情:", {
        message: err?.message || "Unknown error",
        stack: err?.stack || "No stack trace",
        name: err?.name || "Unknown error type"
      });
      setError("Failed to fetch account balance");
    } finally {
      setBalanceLoading(false);
      console.log("[fetchBalance] 余额查询完成");
    }
  };

  // 查询链上计数器状态
  const fetchCount = async () => {
    if (!wasmApi) return;
    setError("");
    try {
      console.log("[fetchCount] 查询合约计数");
      console.log("[fetchCount] 合约地址:", CONTRACT_ADDRESS);
      
      const response = await wasmApi.fetchSmartContractState({
        address: CONTRACT_ADDRESS,
        query: { get_count: {} }
      });
      console.log("[fetchCount] 合约返回:", response);
      
      if (response && response.data) {
        // 解析链上返回的 base64 数据
        const countData = JSON.parse(Buffer.from(response.data, "base64").toString("utf-8"));
        setCount(countData.count || 0);
        console.log("[fetchCount] 当前计数:", countData.count);
      } else {
        console.warn("[fetchCount] 合约返回数据为空");
        setCount(0);
      }
    } catch (err) {
      console.error("[fetchCount] 查询异常", err);
      setError("Failed to fetch count from contract");
    }
  };

  // 发起链上交易时，MsgBroadcaster 会自动弹出钱包签名界面
  const increment = async () => {
    if (!address || !walletStrategy) {
      setError("Wallet not connected");
      console.warn("[increment] 钱包未连接，无法发起交易");
      return;
    }
    setLoading(true);
    setError("");
    try {
      console.log("[increment] 当前计数:", count);
      const prevCount = count;
      const msg = MsgExecuteContract.fromJSON({
        sender: address,
        contractAddress: CONTRACT_ADDRESS,
        msg: { increment: {} },
        funds: [],
      });
      console.log("[increment] 构造的消息:", msg);
      console.log("[increment] 调用 broadcaster.broadcast，准备弹出签名界面");
      
      // 使用 MsgBroadcasterWithPk 进行广播 - 参考实际运营代码
      const broadcaster = new MsgBroadcasterWithPk({
        network: NETWORK,
        privateKey: privateKey, // 使用私钥进行签名
      });

      await broadcaster.broadcast({
        msgs: [msg],
      });
      console.log("[increment] 交易已广播，开始轮询链上计数");
      let retries = 10;
      let updated = false;
      while (retries-- > 0) {
        await new Promise(res => setTimeout(res, 1500));
        await fetchCount();
        console.log(`[increment] 轮询中，当前计数: ${count}, 之前计数: ${prevCount}`);
        if (count !== prevCount) {
          updated = true;
          break;
        }
      }
      if (!updated) {
        setError("链上数据未及时同步，请稍后刷新。");
        console.warn("[increment] 计数未更新，链上同步可能有延迟");
      } else {
        console.log("[increment] 计数已更新:", count);
      }
    } catch (err) {
      setError("Failed to increment counter");
      console.error("[increment] 增加计数异常", err);
    } finally {
      setLoading(false);
      console.log("[increment] 增加流程结束");
    }
  };

  // 重置计数器
  const reset = async () => {
    if (!address || !walletStrategy) {
      setError("Wallet not connected");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const msg = MsgExecuteContract.fromJSON({
        sender: address,
        contractAddress: CONTRACT_ADDRESS,
        msg: { reset: { count: 0 } },
        funds: [],
      });
      
      // 使用 MsgBroadcasterWithPk 进行广播 - 参考实际运营代码
      const broadcaster = new MsgBroadcasterWithPk({
        network: NETWORK,
        privateKey: privateKey, // 使用私钥进行签名
      });

      await broadcaster.broadcast({
        msgs: [msg],
      });
      // 轮询链上数据，直到计数归零或超时
      let retries = 10;
      let updated = false;
      while (retries-- > 0) {
        await new Promise(res => setTimeout(res, 1500));
        await fetchCount();
        if (count === 0) {
          updated = true;
          break;
        }
      }
      if (!updated) setError("链上数据未及时同步，请稍后刷新。");
    } catch (err) {
      setError("Failed to reset counter");
    } finally {
      setLoading(false);
    }
  };

  // 断开钱包连接
  const disconnectWallet = async () => {
    if (walletStrategy) {
      if (typeof walletStrategy.disconnect === "function") {
        await walletStrategy.disconnect();
      }
    }
    setAddress("");
    setIsConnected(false);
    setCount(0);
    setBalance(null);
    setError("");
  };

  // 钱包连接后自动查询计数
  useEffect(() => {
    if (isConnected) {
      fetchCount();
    }
  }, [isConnected]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Counter DApp - 余额功能已添加 ({new Date().toLocaleTimeString()})</h1>
      <p>Contract Address: {CONTRACT_ADDRESS}</p>
      
      {/* 测试按钮 */}
      <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
        <p>🔍 调试测试区域：</p>
        <button
          onClick={testClick}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          测试日志功能
        </button>
        <button
          onClick={testSourceMap}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          测试源码映射
        </button>
        <button
          onClick={testKeplrConnection}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          测试 Keplr 连接
        </button>
        <button
          onClick={testNetworkEndpoints}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          测试网络端点
        </button>
        <span style={{ fontSize: "12px", color: "#666" }}>
          点击按钮测试功能
        </span>
      </div>
      {error && (
        <div style={{
          padding: "10px",
          margin: "10px 0",
          backgroundColor: "#ffebee",
          color: "#c62828",
          borderRadius: "4px"
        }}>
          {error}
        </div>
      )}
      {!isConnected ? (
        <div>
          <button
            onClick={connectWallet}
            disabled={loading}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: loading ? "#ccc" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Connecting..." : "Connect Wallet"}
          </button>
          {typeof window !== "undefined" && !("keplr" in window) && (
            <p style={{ color: "#f57c00", marginTop: "10px" }}>
              Please install <a href="https://keplr.app/" target="_blank" rel="noopener noreferrer">Keplr wallet</a> extension
            </p>
          )}
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <p>Connected Address: {address}</p>
            <button
              onClick={disconnectWallet}
              style={{
                padding: "5px 10px",
                fontSize: "12px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Disconnect
            </button>
          </div>
          
          {/* 账户余额显示 */}
          <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #e9ecef" }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#495057" }}>💰 账户余额</h3>
            {balanceLoading ? (
              <p style={{ color: "#6c757d", fontStyle: "italic" }}>正在查询余额...</p>
            ) : balance && balance.length > 0 ? (
              <div>
                {balance.map((token: any, index: number) => (
                  <div key={index} style={{ 
                    marginBottom: "8px", 
                    padding: "8px", 
                    backgroundColor: "white", 
                    borderRadius: "4px",
                    border: "1px solid #dee2e6"
                  }}>
                    <div style={{ fontWeight: "bold", color: "#495057" }}>
                      {token.denom === "inj" ? "INJ" : token.denom}
                    </div>
                    <div style={{ fontSize: "14px", color: "#6c757d" }}>
                      余额: {parseFloat(token.amount) / Math.pow(10, 18)} {token.denom === "inj" ? "INJ" : token.denom}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#6c757d", fontStyle: "italic" }}>暂无余额数据</p>
            )}
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={fetchBalance}
                disabled={balanceLoading}
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  backgroundColor: balanceLoading ? "#ccc" : "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: balanceLoading ? "not-allowed" : "pointer"
                }}
              >
                {balanceLoading ? "查询中..." : "刷新余额"}
              </button>
              <button
                onClick={() => {
                  console.log("🔍 手动检查余额状态:", {
                    balance,
                    balanceLoading,
                    address,
                    bankApi: !!bankApi
                  });
                }}
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                调试余额
              </button>
            </div>
          </div>
          
          <h2>Current Count: {count}</h2>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              onClick={increment}
              disabled={loading}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: loading ? "#ccc" : "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Processing..." : "Increment"}
            </button>
            <button
              onClick={reset}
              disabled={loading}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: loading ? "#ccc" : "#FF9800",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Processing..." : "Reset"}
            </button>
            <button
              onClick={fetchCount}
              disabled={loading}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: loading ? "#ccc" : "#9C27B0",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
