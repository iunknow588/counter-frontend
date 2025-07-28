import React, { useState, useEffect } from "react";
import { WalletStrategy } from "@injectivelabs/wallet-strategy";
import { ChainId } from "@injectivelabs/ts-types";
import { Network, getNetworkInfo } from "@injectivelabs/networks";
import {
  MsgExecuteContractCompat,
  ChainRestWasmApi,
  type TxRaw
} from "@injectivelabs/sdk-ts";
import { Buffer } from "buffer";

if (!window.Buffer) window.Buffer = Buffer;

// TODO: 替换为你的合约地址和链信息
const CONTRACT_ADDRESS = "inj1qe06nfmzk70xg78knp5qsn3e6fsltqu9sgan8m";
const CHAIN_ID = ChainId.Mainnet;
const NETWORK = Network.Mainnet;
const { rest, grpc } = getNetworkInfo(NETWORK);

function App() {
  const [walletStrategy, setWalletStrategy] = useState<WalletStrategy>();
  const [address, setAddress] = useState<string>("");
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetValue, setResetValue] = useState(0);

  useEffect(() => {
    const strategy = new WalletStrategy({
      chainId: CHAIN_ID,
      strategies: {}, // 空对象作为默认策略
    });
    setWalletStrategy(strategy);
  }, []);

  const connectWallet = async () => {
    if (!walletStrategy) return;
    await walletStrategy.enable();
    const addresses = await walletStrategy.getAddresses();
    setAddress(addresses[0]);
  };

  const fetchCount = async () => {
    setLoading(true);
    const wasmApi = new ChainRestWasmApi(rest);
    const res = await wasmApi.fetchSmartContractState(CONTRACT_ADDRESS, JSON.stringify({ get_count: {} }));
    setCount((res as any).count);
    setLoading(false);
  };

  const increment = async () => {
    if (!walletStrategy || !address) return;
    setLoading(true);
    
    // 创建消息
    const msg = MsgExecuteContractCompat.fromJSON({
      sender: address,
      contractAddress: CONTRACT_ADDRESS,
      msg: { increment: {} },
    });

    // 签名交易 - 使用简化的方式
    const txRaw = await walletStrategy.signCosmosTransaction({
      txRaw: msg as any, // 临时类型断言
      accountNumber: 0, // 需要从链上获取实际的 accountNumber
      chainId: CHAIN_ID,
      address: address,
    });

    // 发送交易
    await walletStrategy.sendTransaction(
      txRaw,
      {
        address,
        chainId: CHAIN_ID,
        endpoints: { rest, grpc },
      }
    );
    
    await fetchCount();
    setLoading(false);
  };

  const reset = async () => {
    if (!walletStrategy || !address) return;
    setLoading(true);
    
    // 创建消息
    const msg = MsgExecuteContractCompat.fromJSON({
      sender: address,
      contractAddress: CONTRACT_ADDRESS,
      msg: { reset: { count: resetValue } },
    });

    // 签名交易 - 使用简化的方式
    const txRaw = await walletStrategy.signCosmosTransaction({
      txRaw: msg as any, // 临时类型断言
      accountNumber: 0, // 需要从链上获取实际的 accountNumber
      chainId: CHAIN_ID,
      address: address,
    });

    // 发送交易
    await walletStrategy.sendTransaction(
      txRaw,
      {
        address,
        chainId: CHAIN_ID,
        endpoints: { rest, grpc },
      }
    );
    
    await fetchCount();
    setLoading(false);
  };

  useEffect(() => {
    if (address) fetchCount();
    // eslint-disable-next-line
  }, [address]);

  return (
    <div style={{ padding: 32 }}>
      <h1>Injective Counter DApp</h1>
      {!address ? (
        <button onClick={connectWallet}>连接钱包</button>
      ) : (
        <div>
          <div>钱包地址: {address}</div>
          <div>
            当前计数: {loading ? "加载中..." : count}
            <button onClick={fetchCount} disabled={loading}>刷新</button>
          </div>
          <button onClick={increment} disabled={loading}>递增</button>
          <div style={{ marginTop: 16 }}>
            <input
              type="number"
              value={resetValue}
              onChange={e => setResetValue(Number(e.target.value))}
              style={{ width: 80 }}
            />
            <button onClick={reset} disabled={loading}>重置为指定值</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
