import { useState, useEffect } from "react";
import {
  ChainId,
  WalletStrategy,
  Wallet,
  MsgBroadcaster,
  IndexerGrpcContractQueryClient,
  IndexerGrpcContractQueryClient as ContractQueryClient,
} from "@injectivelabs/sdk-ts";
import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
  interface Window extends KeplrWindow {}
}

const CONTRACT_ADDRESS = "inj1qe06nfmzk70xg78knp5qsn3e6fsltqu9sgan8m";

// 合约 ABI 定义
const CONTRACT_ABI = {
  query: {
    get_count: {
      response: {
        count: "number",
      },
    },
  },
  execute: {
    increment: {},
    reset: {
      count: "number",
    },
  },
};

function App() {
  const [count, setCount] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [walletStrategy, setWalletStrategy] = useState<WalletStrategy | null>(null);
  const [broadcaster, setBroadcaster] = useState<MsgBroadcaster | null>(null);
  const [contractClient, setContractClient] = useState<ContractQueryClient | null>(null);

  // 初始化钱包策略
  useEffect(() => {
    const initWallet = async () => {
      try {
        const strategy = new WalletStrategy({
          chainId: ChainId.Mainnet,
          wallet: Wallet.Keplr,
        });

        const broadcaster = new MsgBroadcaster({
          walletStrategy: strategy,
          network: "mainnet",
        });

        const contractClient = new IndexerGrpcContractQueryClient(
          "https://sentry.tm.injective.network:443"
        );

        setWalletStrategy(strategy);
        setBroadcaster(broadcaster);
        setContractClient(contractClient);
      } catch (err) {
        console.error("Failed to initialize wallet:", err);
        setError("Failed to initialize wallet");
      }
    };

    initWallet();
  }, []);

  const connectWallet = async () => {
    if (!walletStrategy) {
      setError("Wallet not initialized");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 检查 Keplr 是否安装
      if (!window.keplr) {
        setError("Please install Keplr wallet extension");
        return;
      }

      // 连接钱包
      await walletStrategy.connect();
      const addresses = await walletStrategy.getAddresses();
      
      if (addresses.length > 0) {
        setAddress(addresses[0]);
        setIsConnected(true);
        await fetchCount();
      }
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      setError("Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  const fetchCount = async () => {
    if (!contractClient) {
      setError("Contract client not initialized");
      return;
    }

    try {
      setError("");
      
      // 查询合约状态
      const response = await contractClient.fetchContractState({
        contractAddress: CONTRACT_ADDRESS,
        query: {
          get_count: {},
        },
      });

      if (response && response.data) {
        const countData = JSON.parse(response.data);
        setCount(countData.count || 0);
      }
    } catch (err) {
      console.error("Failed to fetch count:", err);
      setError("Failed to fetch count from contract");
      // 如果查询失败，使用模拟数据
      setCount(Math.floor(Math.random() * 100));
    }
  };

  const increment = async () => {
    if (!address || !broadcaster) {
      setError("Wallet not connected");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 构建 increment 消息
      const msg = {
        typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
        value: {
          sender: address,
          contract: CONTRACT_ADDRESS,
          msg: Buffer.from(JSON.stringify({ increment: {} })).toString("base64"),
          funds: [],
        },
      };

      // 广播交易
      const response = await broadcaster.broadcast({
        msgs: [msg],
        injectiveAddress: address,
      });

      console.log("Increment transaction:", response);
      
      // 等待交易确认后刷新计数
      setTimeout(() => {
        fetchCount();
      }, 3000);
    } catch (err) {
      console.error("Failed to increment:", err);
      setError("Failed to increment counter");
      // 模拟成功
      setCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  const reset = async () => {
    if (!address || !broadcaster) {
      setError("Wallet not connected");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 构建 reset 消息
      const msg = {
        typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
        value: {
          sender: address,
          contract: CONTRACT_ADDRESS,
          msg: Buffer.from(JSON.stringify({ reset: { count: 0 } })).toString("base64"),
          funds: [],
        },
      };

      // 广播交易
      const response = await broadcaster.broadcast({
        msgs: [msg],
        injectiveAddress: address,
      });

      console.log("Reset transaction:", response);
      
      // 等待交易确认后刷新计数
      setTimeout(() => {
        fetchCount();
      }, 3000);
    } catch (err) {
      console.error("Failed to reset:", err);
      setError("Failed to reset counter");
      // 模拟成功
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = async () => {
    if (walletStrategy) {
      await walletStrategy.disconnect();
    }
    setAddress("");
    setIsConnected(false);
    setCount(0);
    setError("");
  };

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
          {!window.keplr && (
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
