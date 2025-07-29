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
    const strategy = new WalletStrategy({
      chainId: ChainId.Mainnet,
      wallet: Wallet.Keplr,
    });
    setWalletStrategy(strategy);
    setBroadcaster(new MsgBroadcaster({ walletStrategy: strategy, network: Network.MainnetLB }));
    setWasmApi(new IndexerGrpcMetaApi("https://sentry.exchange.grpc-web.injective.network"));
  }, []);

  // 连接钱包（参考 Injective 官方文档 WalletStrategy 规范流程）
  const connectWallet = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("[connectWallet] 开始连接钱包");
      if (!window.keplr) {
        setError("Please install Keplr wallet extension");
        setLoading(false);
        return;
      }
      console.log("[connectWallet] 调用 keplr.enable，准备弹出授权界面，chainId:", CHAIN_ID);
      await window.keplr.enable(CHAIN_ID);
      console.log("[connectWallet] keplr.enable 调用完成，用户已授权或已授权过");
      // 检查 Keplr 是否已连接 Injective 测试网
      if (window.keplr.experimentalSuggestChain) {
        console.log("[connectWallet] Keplr 支持 experimentalSuggestChain");
      }
      // 2. 创建 Injective 钱包策略（测试网）
      console.log("[connectWallet] 创建 WalletStrategy 实例");
      const strategy = new WalletStrategy({
        chainId: CHAIN_ID,
        wallet: Wallet.Keplr,
      });
      setWalletStrategy(strategy);
      setBroadcaster(new MsgBroadcaster({ walletStrategy: strategy, network: NETWORK }));
      setWasmApi(new IndexerGrpcMetaApi(GRPC_URL));
      // 3. 获取钱包地址
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
      setError(`[connectWallet] Failed: ${err?.message || err}`);
      console.error("[connectWallet] 连接钱包异常", err);
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
      return;
    }
    setLoading(true);
    setError("");
    try {
      const prevCount = count;
      const msg = MsgExecuteContract.fromJSON({
        sender: address,
        contractAddress: CONTRACT_ADDRESS,
        msg: { increment: {} },
        funds: [],
      });
      console.log("[increment] 构造消息:", msg);
      // 这里会自动弹出钱包签名界面
      await broadcaster.broadcast({
        msgs: [msg],
        injectiveAddress: address,
      });
      console.log("[increment] 交易已广播，开始轮询链上计数");
      // 轮询链上数据，直到计数变化或超时
      let retries = 10;
      let updated = false;
      while (retries-- > 0) {
        await new Promise(res => setTimeout(res, 1500));
        await fetchCount();
        if (count !== prevCount) {
          updated = true;
          break;
        }
      }
      if (!updated) setError("链上数据未及时同步，请稍后刷新。");
      else console.log("[increment] 计数已更新:", count);
    } catch (err) {
      setError("Failed to increment counter");
      console.error("[increment] 增加计数异常", err);
    } finally {
      setLoading(false);
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
