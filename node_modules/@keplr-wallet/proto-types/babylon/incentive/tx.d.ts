import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Params } from "../../babylon/incentive/params";
export declare const protobufPackage = "babylon.incentive";
/** MsgWithdrawReward defines a message for withdrawing reward of a stakeholder. */
export interface MsgWithdrawReward {
    /** type is the stakeholder type {finality_provider, btc_staker} */
    type: string;
    /**
     * address is the address of the stakeholder in bech32 string
     * signer of this msg has to be this address
     */
    address: string;
}
/** MsgWithdrawRewardResponse is the response to the MsgWithdrawReward message */
export interface MsgWithdrawRewardResponse {
    /** coins is the withdrawed coins */
    coins: Coin[];
}
/** MsgUpdateParams defines a message for updating incentive module parameters. */
export interface MsgUpdateParams {
    /**
     * authority is the address of the governance account.
     * just FYI: cosmos.AddressString marks that this field should use type alias
     * for AddressString instead of string, but the functionality is not yet
     * implemented in cosmos-proto
     */
    authority: string;
    /**
     * params defines the incentive parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params | undefined;
}
/** MsgUpdateParamsResponse is the response to the MsgUpdateParams message. */
export interface MsgUpdateParamsResponse {
}
/** MsgSetWithdrawAddress sets the withdraw address */
export interface MsgSetWithdrawAddress {
    delegatorAddress: string;
    withdrawAddress: string;
}
/**
 * MsgSetWithdrawAddressResponse defines the Msg/SetWithdrawAddress response
 * type.
 */
export interface MsgSetWithdrawAddressResponse {
}
export declare const MsgWithdrawReward: {
    encode(message: MsgWithdrawReward, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawReward;
    fromJSON(object: any): MsgWithdrawReward;
    toJSON(message: MsgWithdrawReward): unknown;
    fromPartial<I extends {
        type?: string | undefined;
        address?: string | undefined;
    } & {
        type?: string | undefined;
        address?: string | undefined;
    } & Record<Exclude<keyof I, keyof MsgWithdrawReward>, never>>(object: I): MsgWithdrawReward;
};
export declare const MsgWithdrawRewardResponse: {
    encode(message: MsgWithdrawRewardResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawRewardResponse;
    fromJSON(object: any): MsgWithdrawRewardResponse;
    toJSON(message: MsgWithdrawRewardResponse): unknown;
    fromPartial<I extends {
        coins?: {
            denom?: string | undefined;
            amount?: string | undefined;
        }[] | undefined;
    } & {
        coins?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        }[] & ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & Record<Exclude<keyof I["coins"][number], keyof Coin>, never>)[] & Record<Exclude<keyof I["coins"], keyof {
            denom?: string | undefined;
            amount?: string | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "coins">, never>>(object: I): MsgWithdrawRewardResponse;
};
export declare const MsgUpdateParams: {
    encode(message: MsgUpdateParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams;
    fromJSON(object: any): MsgUpdateParams;
    toJSON(message: MsgUpdateParams): unknown;
    fromPartial<I extends {
        authority?: string | undefined;
        params?: {
            btcStakingPortion?: string | undefined;
        } | undefined;
    } & {
        authority?: string | undefined;
        params?: ({
            btcStakingPortion?: string | undefined;
        } & {
            btcStakingPortion?: string | undefined;
        } & Record<Exclude<keyof I["params"], "btcStakingPortion">, never>) | undefined;
    } & Record<Exclude<keyof I, keyof MsgUpdateParams>, never>>(object: I): MsgUpdateParams;
};
export declare const MsgUpdateParamsResponse: {
    encode(_: MsgUpdateParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse;
    fromJSON(_: any): MsgUpdateParamsResponse;
    toJSON(_: MsgUpdateParamsResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, never>, never>>(_: I): MsgUpdateParamsResponse;
};
export declare const MsgSetWithdrawAddress: {
    encode(message: MsgSetWithdrawAddress, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetWithdrawAddress;
    fromJSON(object: any): MsgSetWithdrawAddress;
    toJSON(message: MsgSetWithdrawAddress): unknown;
    fromPartial<I extends {
        delegatorAddress?: string | undefined;
        withdrawAddress?: string | undefined;
    } & {
        delegatorAddress?: string | undefined;
        withdrawAddress?: string | undefined;
    } & Record<Exclude<keyof I, keyof MsgSetWithdrawAddress>, never>>(object: I): MsgSetWithdrawAddress;
};
export declare const MsgSetWithdrawAddressResponse: {
    encode(_: MsgSetWithdrawAddressResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetWithdrawAddressResponse;
    fromJSON(_: any): MsgSetWithdrawAddressResponse;
    toJSON(_: MsgSetWithdrawAddressResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, never>, never>>(_: I): MsgSetWithdrawAddressResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** WithdrawReward defines a method to withdraw rewards of a stakeholder */
    WithdrawReward(request: MsgWithdrawReward): Promise<MsgWithdrawRewardResponse>;
    /** UpdateParams updates the incentive module parameters. */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    /**
     * SetWithdrawAddress defines a method to change the withdraw address of a
     * stakeholder
     */
    SetWithdrawAddress(request: MsgSetWithdrawAddress): Promise<MsgSetWithdrawAddressResponse>;
}
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;
export {};
