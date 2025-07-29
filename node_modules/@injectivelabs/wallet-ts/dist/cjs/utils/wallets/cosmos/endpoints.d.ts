import { ChainId, CosmosChainId, TestnetCosmosChainId, DevnetCosmosChainId } from '@injectivelabs/ts-types';
/** @deprecated - pass endpoints directly to the methods */
export declare const getEndpointsFromChainId: (chainId: TestnetCosmosChainId | CosmosChainId | ChainId | DevnetCosmosChainId) => {
    rpc: string;
    rest: string;
};
//# sourceMappingURL=endpoints.d.ts.map