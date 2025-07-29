import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "babylon.incentive";
/**
 * Params defines the parameters for the module, including portions of rewards
 * distributed to each type of stakeholder. Note that sum of the portions should
 * be strictly less than 1 so that the rest will go to Comet
 * validators/delegations adapted from
 * https://github.com/cosmos/cosmos-sdk/blob/release/v0.47.x/proto/cosmos/distribution/v1beta1/distribution.proto
 */
export interface Params {
    /**
     * btc_staking_portion is the portion of rewards that goes to Finality
     * Providers/delegations NOTE: the portion of each Finality
     * Provider/delegation is calculated by using its voting power and finality
     * provider's commission
     */
    btcStakingPortion: string;
}
export declare const Params: {
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    fromPartial<I extends {
        btcStakingPortion?: string | undefined;
    } & {
        btcStakingPortion?: string | undefined;
    } & Record<Exclude<keyof I, "btcStakingPortion">, never>>(object: I): Params;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;
export {};
