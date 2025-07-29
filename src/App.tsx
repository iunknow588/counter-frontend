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

const CONTRACT_ADDRESS = "inj1qe06nfmzk70xg78knp5qsn3e6fsltqu9sgan8m";

function App() {
  const [count, setCount] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [walletStrategy, setWalletStrategy] = useState<any>(null);
  const [broadcaster, setBroadcaster] = useState<any>(null);
  const [wasmApi, setWasmApi] = useState<any>(null);

  useEffect(() => {
    const strategy = new WalletStrategy({
      chainId: ChainId.Mainnet,
      wallet: Wallet.Keplr,
    });
    setWalletStrategy(strategy);
    setBroadcaster(new MsgBroadcaster({ walletStrategy: strategy, network: Network.MainnetLB }));
    setWasmApi(new IndexerGrpcMetaApi("https://sentry.exchange.grpc-web.injective.network"));
  }, []);

  const connectWallet = async () => {
    if (!walletStrategy) return;
    setLoading(true);
    setError("");
    try {
      if (!window.keplr) {
        setError("Please install Keplr wallet extension");
        return;
      }
      await window.keplr.enable("injective-1");
      // WalletStrategy 2.x 可能用 init() 或 connect(), 这里都尝试
      if (typeof walletStrategy.init === "function") {
        await walletStrategy.init();
      } else if (typeof walletStrategy.connect === "function") {
        await walletStrategy.connect();
      }
      const addresses = await walletStrategy.getAddresses();
      if (addresses.length > 0) {
        setAddress(addresses[0]);
        setIsConnected(true);
        await fetchCount();
      } else {
        setError("No addresses found in wallet");
      }
    } catch (err: any) {
      setError(`Failed to connect wallet: ${err?.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCount = async () => {
    if (!wasmApi) return;
    setError("");
    try {
      const response = await wasmApi.fetchSmartContractState({
        address: CONTRACT_ADDRESS,
        query: { get_count: {} }
      });
      const countData = JSON.parse(Buffer.from(response.data, "base64").toString("utf-8"));
      setCount(countData.count || 0);
    } catch (err) {
      setError("Failed to fetch count from contract");
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
      const msg = MsgExecuteContract.fromJSON({
        sender: address,
        contractAddress: CONTRACT_ADDRESS,
        msg: { increment: {} },
        funds: [],
      });
      await broadcaster.broadcast({
        msgs: [msg],
        injectiveAddress: address,
      });
      setTimeout(() => {
        fetchCount();
      }, 3000);
    } catch (err) {
      setError("Failed to increment counter");
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
      setTimeout(() => {
        fetchCount();
      }, 3000);
    } catch (err) {
      setError("Failed to reset counter");
    } finally {
      setLoading(false);
    }
  };

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
