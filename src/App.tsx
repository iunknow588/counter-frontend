import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { Wallet, WalletStrategy, MsgBroadcaster } from "@injectivelabs/wallet-ts";
import { ChainId } from "@injectivelabs/ts-types";
import { IndexerGrpcMetaApi } from "@injectivelabs/sdk-ts";
import { Network } from "@injectivelabs/networks";
import { MsgExecuteContract } from "@injectivelabs/sdk-ts";

// 类型声明，解决 window.keplr 报错
declare global {
  interface Window {
    keplr?: any;
  }
}

// 测试网配置
const CHAIN_ID = ChainId.Testnet;
const NETWORK = Network.TestnetK8s;
const GRPC_URL = "https://sentry.testnet.exchange.grpc-web.injective.network";
const CONTRACT_ADDRESS = "inj1qe06nfmzk70xg78knp5qsn3e6fsltqu9sgan8m";

function App() {
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

  // 钱包策略、广播器、合约查询API
  const [walletStrategy, setWalletStrategy] = useState<any>(null);
  const [broadcaster, setBroadcaster] = useState<any>(null);
  const [wasmApi, setWasmApi] = useState<any>(null);

  // 初始化钱包策略和API
  useEffect(() => {
    console.log("[App] 应用启动，初始化配置");
    console.log("[App] 使用测试网配置:", { CHAIN_ID, NETWORK, GRPC_URL, CONTRACT_ADDRESS });
    
    // 注意：这里不创建 WalletStrategy，因为需要用户先连接钱包
    // 只初始化 API 实例
    const wasmApi = new IndexerGrpcMetaApi(GRPC_URL);
    setWasmApi(wasmApi);
    console.log("[App] 初始化完成，等待用户连接钱包");
  }, []);

  // 连接钱包（参考 Injective 官方文档 WalletStrategy 规范流程）
  const connectWallet = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("[connectWallet] 开始连接钱包");
      
      // 1. 检查 Keplr 是否安装
      if (!window.keplr) {
        setError("Please install Keplr wallet extension");
        setLoading(false);
        return;
      }
      
      // 2. 检查 Keplr 是否有账户
      console.log("[connectWallet] 检查 Keplr 账户");
      const accounts = await window.keplr.getAccounts();
      console.log("[connectWallet] Keplr 账户列表:", accounts);
      
      if (!accounts || accounts.length === 0) {
        setError("Keplr wallet has no accounts. Please create or import an account first.");
        setLoading(false);
        return;
      }
      
      // 3. 请求授权连接
      console.log("[connectWallet] 调用 keplr.enable，准备弹出授权界面，chainId:", CHAIN_ID);
      await window.keplr.enable(CHAIN_ID);
      console.log("[connectWallet] keplr.enable 调用完成，用户已授权或已授权过");
      
      // 4. 创建 Injective 钱包策略
      console.log("[connectWallet] 创建 WalletStrategy 实例");
      const strategy = new WalletStrategy({
        chainId: CHAIN_ID,
        wallet: Wallet.Keplr,
      });
      setWalletStrategy(strategy);
      setBroadcaster(new MsgBroadcaster({ walletStrategy: strategy, network: NETWORK }));
      
      // 5. 获取钱包地址
      console.log("[connectWallet] 调用 strategy.getAddresses()");
      const addresses = await strategy.getAddresses();
      console.log("[connectWallet] 获取到钱包地址:", addresses);
      
      if (addresses.length > 0) {
        setAddress(addresses[0]);
        setIsConnected(true);
        console.log("[connectWallet] 钱包连接成功，isConnected = true");
        await fetchCount();
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

  // 查询链上计数器状态
  const fetchCount = async () => {
    if (!wasmApi) return;
    setError("");
    try {
      console.log("[fetchCount] 查询合约计数");
      const response = await wasmApi.fetchSmartContractState({
        address: CONTRACT_ADDRESS,
        query: { get_count: {} }
      });
      console.log("[fetchCount] 合约返回:", response);
      // 解析链上返回的 base64 数据
      const countData = JSON.parse(Buffer.from(response.data, "base64").toString("utf-8"));
      setCount(countData.count || 0);
      console.log("[fetchCount] 当前计数:", countData.count);
    } catch (err) {
      setError("Failed to fetch count from contract");
      console.error("[fetchCount] 查询异常", err);
    }
  };

  // 发起链上交易时，MsgBroadcaster 会自动弹出钱包签名界面
  const increment = async () => {
    if (!address || !broadcaster) {
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
      await broadcaster.broadcast({
        msgs: [msg],
        injectiveAddress: address,
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
    if (!address || !broadcaster) {
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
      await broadcaster.broadcast({
        msgs: [msg],
        injectiveAddress: address,
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
      <h1>Counter DApp</h1>
      <p>Contract Address: {CONTRACT_ADDRESS}</p>
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
