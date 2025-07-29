import { useState, useEffect } from "react";

const CONTRACT_ADDRESS = "inj1qe06nfmzk70xg78knp5qsn3e6fsltqu9sgan8m";

function App() {
  const [count, setCount] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      // 简化钱包连接逻辑
      const mockAddress = "inj1qe06nfmzk70xg78knp5qsn3e6fsltqu9sgan8m";
      setAddress(mockAddress);
      setIsConnected(true);
      fetchCount();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const fetchCount = async () => {
    try {
      // 模拟获取计数
      setCount(Math.floor(Math.random() * 100));
    } catch (error) {
      console.error("Failed to fetch count:", error);
    }
  };

  const increment = async () => {
    if (!address) return;
    setLoading(true);
    try {
      // 简化交易逻辑
      console.log("Increment transaction would be sent here");
      setTimeout(() => {
        setCount(prev => prev + 1);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to increment:", error);
      setLoading(false);
    }
  };

  const reset = async () => {
    if (!address) return;
    setLoading(true);
    try {
      // 简化交易逻辑
      console.log("Reset transaction would be sent here");
      setTimeout(() => {
        setCount(0);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to reset:", error);
      setLoading(false);
    }
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
      
      {!isConnected ? (
        <button onClick={connectWallet} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Connect Wallet
        </button>
      ) : (
        <div>
          <p>Connected Address: {address}</p>
          <h2>Current Count: {count}</h2>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button 
              onClick={increment} 
              disabled={loading}
              style={{ padding: "10px 20px", fontSize: "16px" }}
            >
              {loading ? "Processing..." : "Increment"}
            </button>
            <button 
              onClick={reset} 
              disabled={loading}
              style={{ padding: "10px 20px", fontSize: "16px" }}
            >
              {loading ? "Processing..." : "Reset"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 