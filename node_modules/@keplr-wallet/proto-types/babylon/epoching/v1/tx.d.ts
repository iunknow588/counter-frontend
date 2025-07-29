import _m0 from "protobufjs/minimal";
import { MsgDelegate, MsgUndelegate, MsgBeginRedelegate, MsgCancelUnbondingDelegation, MsgEditValidator } from "../../../cosmos/staking/v1beta1/tx";
import { Params } from "../../../babylon/epoching/v1/params";
export declare const protobufPackage = "babylon.epoching.v1";
/** MsgWrappedDelegate is the message for delegating stakes */
export interface MsgWrappedDelegate {
    msg: MsgDelegate | undefined;
}
/** MsgWrappedDelegate is the response to the MsgWrappedDelegate message */
export interface MsgWrappedDelegateResponse {
}
/** MsgWrappedUndelegate is the message for undelegating stakes */
export interface MsgWrappedUndelegate {
    msg: MsgUndelegate | undefined;
}
/**
 * MsgWrappedUndelegateResponse is the response to the MsgWrappedUndelegate
 * message
 */
export interface MsgWrappedUndelegateResponse {
}
/**
 * MsgWrappedDelegate is the message for moving bonded stakes from a
 * validator to another validator
 */
export interface MsgWrappedBeginRedelegate {
    msg: MsgBeginRedelegate | undefined;
}
/**
 * MsgWrappedBeginRedelegateResponse is the response to the
 * MsgWrappedBeginRedelegate message
 */
export interface MsgWrappedBeginRedelegateResponse {
}
/**
 * MsgWrappedCancelUnbondingDelegation is the message for cancelling
 * an unbonding delegation
 */
export interface MsgWrappedCancelUnbondingDelegation {
    msg: MsgCancelUnbondingDelegation | undefined;
}
/**
 * MsgWrappedCancelUnbondingDelegationResponse is the response to the
 * MsgWrappedCancelUnbondingDelegation message
 */
export interface MsgWrappedCancelUnbondingDelegationResponse {
}
/**
 * MsgWrappedEditValidator defines a message for updating validator description
 * and commission rate.
 */
export interface MsgWrappedEditValidator {
    msg: MsgEditValidator | undefined;
}
/** MsgWrappedEditValidatorResponse is the response to the MsgWrappedEditValidator message. */
export interface MsgWrappedEditValidatorResponse {
}
/** MsgUpdateParams defines a message for updating epoching module parameters. */
export interface MsgUpdateParams {
    /**
     * authority is the address of the governance account.
     * just FYI: cosmos.AddressString marks that this field should use type alias
     * for AddressString instead of string, but the functionality is not yet implemented
     * in cosmos-proto
     */
    authority: string;
    /**
     * params defines the epoching parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params | undefined;
}
/** MsgUpdateParamsResponse is the response to the MsgUpdateParams message. */
export interface MsgUpdateParamsResponse {
}
export declare const MsgWrappedDelegate: {
    encode(message: MsgWrappedDelegate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgWrappedDelegate;
    fromJSON(object: any): MsgWrappedDelegate;
    toJSON(message: MsgWrappedDelegate): unknown;
    fromPartial<I extends {
        msg?: {
            delegatorAddress?: string | undefined;
            validatorAddress?: string | undefined;
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        } | undefined;
    } & {
        msg?: ({
            delegatorAddress?: string | undefined;
            validatorAddress?: string | undefined;
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        } & {
            delegatorAddress?: string | undefined;
            validatorAddress?: string | undefined;
            amount?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["msg"]["amount"], keyof import("../../../cosmos/base/v1beta1/coin").Coin>, never>) | undefined;
        } & Record<Exclude<keyof I["msg"], keyof MsgDelegate>, never>) | undefined;
    } & Record<Exclude<keyof I, "msg">, never>>(object: I): MsgWrappedDelegate;
};
export declare const MsgWrappedDelegateResponse: {
    encode(_: MsgWrappedDelegateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgWrappedDelegateResponse;
    fromJSON(_: any): MsgWrappedDelegateResponse;
    toJSON(_: MsgWrappedDelegateResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, never>, never>>(_: I): MsgWrappedDelegateResponse;
};
export declare const MsgWrappedUndelegate: {
    encode(message: MsgWrappedUndelegate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgWrappedUndelegate;
    fromJSON(object: any): MsgWrappedUndelegate;
    toJSON(message: MsgWrappedUndelegate): unknown;
    fromPartial<I extends {
        msg?: {
            delegatorAddress?: string | undefined;
            validatorAddress?: string | undefined;
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        } | undefined;
    } & {
        msg?: ({
            delegatorAddress?: string | undefined;
            validatorAddress?: string | undefined;
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        } & {
            delegatorAddress?: string | undefined;
            validatorAddress?: string | undefined;
            amount?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["msg"]["amount"], keyof import("../../../cosmos/base/v1beta1/coin").Coin>, never>) | undefined;
        } & Record<Exclude<keyof I["msg"], keyof MsgUndelegate>, never>) | undefined;
    } & Record<Exclude<keyof I, "msg">, never>>(object: I): MsgWrappedUndelegate;
};
export declare const MsgWrappedUndelegateResponse: {
    encode(_: MsgWrappedUndelegateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgWrappedUndelegateResponse;
    fromJSON(_: any): MsgWrappedUndelegateResponse;
    toJSON(_: MsgWrappedUndelegateResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, never>, never>>(_: I): MsgWrappedUndelegateResponse;
};
export declare const MsgWrappedBeginRedelegate: {
    encode(message: MsgWrappedBeginRedelegate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgWrappedBeginRedelegate;
    fromJSON(object: any): MsgWrappedBeginRedelegate;
    toJSON(message: MsgWrappedBeginRedelegate): unknown;
    fromPartial<I extends {
        msg?: {
            delegatorAddress?: string | undefined;
            validatorSrcAddress?: string | undefined;
            validatorDstAddress?: string | undefined;
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        } | undefined;
    } & {
        msg?: ({
            delegatorAddress?: string | undefined;
            validatorSrcAddress?: string | undefined;
            validatorDstAddress?: string | undefined;
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        } & {
            delegatorAddress?: string | undefined;
            validatorSrcAddress?: string | undefined;
            validatorDstAddress?: string | undefined;
            amount?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["msg"]["amount"], keyof import("../../../cosmos/base/v1beta1/coin").Coin>, never>) | undefined;
        } & Record<Exclude<keyof I["msg"], keyof MsgBeginRedelegate>, never>) | undefined;
    } & Record<Exclude<keyof I, "msg">, never>>(object: I): MsgWrappedBeginRedelegate;
};
export declare const MsgWrappedBeginRedelegateResponse: {
    encode(_: MsgWrappedBeginRedelegateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgWrappedBeginRedelegateResponse;
    fromJSON(_: any): MsgWrappedBeginRedelegateResponse;
    toJSON(_: MsgWrappedBeginRedelegateResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, never>, never>>(_: I): MsgWrappedBeginRedelegateResponse;
};
export declare const MsgWrappedCancelUnbondingDelegation: {
    encode(message: MsgWrappedCancelUnbondingDelegation, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgWrappedCancelUnbondingDelegation;
    fromJSON(object: any): MsgWrappedCancelUnbondingDelegation;
    toJSON(message: MsgWrappedCancelUnbondingDelegation): unknown;
    fromPartial<I extends {
        msg?: {
            delegatorAddress?: string | undefined;
            validatorAddress?: string | undefined;
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            creationHeight?: string | undefined;
        } | undefined;
    } & {
        msg?: ({
            delegatorAddress?: string | undefined;
            validatorAddress?: string | undefined;
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            creationHeight?: string | undefined;
        } & {
            delegatorAddress?: string | undefined;
            validatorAddress?: string | undefined;
            amount?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["msg"]["amount"], keyof import("../../../cosmos/base/v1beta1/coin").Coin>, never>) | undefined;
            creationHeight?: string | undefined;
        } & Record<Exclude<keyof I["msg"], keyof MsgCancelUnbondingDelegation>, never>) | undefined;
    } & Record<Exclude<keyof I, "msg">, never>>(object: I): MsgWrappedCancelUnbondingDelegation;
};
export declare const MsgWrappedCancelUnbondingDelegationResponse: {
    encode(_: MsgWrappedCancelUnbondingDelegationResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgWrappedCancelUnbondingDelegationResponse;
    fromJSON(_: any): MsgWrappedCancelUnbondingDelegationResponse;
    toJSON(_: MsgWrappedCancelUnbondingDelegationResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, never>, never>>(_: I): MsgWrappedCancelUnbondingDelegationResponse;
};
export declare const MsgWrappedEditValidator: {
    encode(message: MsgWrappedEditValidator, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgWrappedEditValidator;
    fromJSON(object: any): MsgWrappedEditValidator;
    toJSON(message: MsgWrappedEditValidator): unknown;
    fromPartial<I extends {
        msg?: {
            description?: {
                moniker?: string | undefined;
                identity?: string | undefined;
                website?: string | undefined;
                securityContact?: string | undefined;
                details?: string | undefined;
            } | undefined;
            validatorAddress?: string | undefined;
            commissionRate?: string | undefined;
            minSelfDelegation?: string | undefined;
        } | undefined;
    } & {
        msg?: ({
            description?: {
                moniker?: string | undefined;
                identity?: string | undefined;
                website?: string | undefined;
                securityContact?: string | undefined;
                details?: string | undefined;
            } | undefined;
            validatorAddress?: string | undefined;
            commissionRate?: string | undefined;
            minSelfDelegation?: string | undefined;
        } & {
            description?: ({
                moniker?: string | undefined;
                identity?: string | undefined;
                website?: string | undefined;
                securityContact?: string | undefined;
                details?: string | undefined;
            } & {
                moniker?: string | undefined;
                identity?: string | undefined;
                website?: string | undefined;
                securityContact?: string | undefined;
                details?: string | undefined;
            } & Record<Exclude<keyof I["msg"]["description"], keyof import("../../../cosmos/staking/v1beta1/staking").Description>, never>) | undefined;
            validatorAddress?: string | undefined;
            commissionRate?: string | undefined;
            minSelfDelegation?: string | undefined;
        } & Record<Exclude<keyof I["msg"], keyof MsgEditValidator>, never>) | undefined;
    } & Record<Exclude<keyof I, "msg">, never>>(object: I): MsgWrappedEditValidator;
};
export declare const MsgWrappedEditValidatorResponse: {
    encode(_: MsgWrappedEditValidatorResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgWrappedEditValidatorResponse;
    fromJSON(_: any): MsgWrappedEditValidatorResponse;
    toJSON(_: MsgWrappedEditValidatorResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, never>, never>>(_: I): MsgWrappedEditValidatorResponse;
};
export declare const MsgUpdateParams: {
    encode(message: MsgUpdateParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams;
    fromJSON(object: any): MsgUpdateParams;
    toJSON(message: MsgUpdateParams): unknown;
    fromPartial<I extends {
        authority?: string | undefined;
        params?: {
            epochInterval?: string | undefined;
        } | undefined;
    } & {
        authority?: string | undefined;
        params?: ({
            epochInterval?: string | undefined;
        } & {
            epochInterval?: string | undefined;
        } & Record<Exclude<keyof I["params"], "epochInterval">, never>) | undefined;
    } & Record<Exclude<keyof I, keyof MsgUpdateParams>, never>>(object: I): MsgUpdateParams;
};
export declare const MsgUpdateParamsResponse: {
    encode(_: MsgUpdateParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse;
    fromJSON(_: any): MsgUpdateParamsResponse;
    toJSON(_: MsgUpdateParamsResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, never>, never>>(_: I): MsgUpdateParamsResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /**
     * WrappedDelegate defines a method for performing a delegation of coins from
     * a delegator to a validator.
     */
    WrappedDelegate(request: MsgWrappedDelegate): Promise<MsgWrappedDelegateResponse>;
    /**
     * WrappedUndelegate defines a method for performing an undelegation from a
     * delegate and a validator.
     */
    WrappedUndelegate(request: MsgWrappedUndelegate): Promise<MsgWrappedUndelegateResponse>;
    /**
     * WrappedBeginRedelegate defines a method for performing a redelegation of
     * coins from a delegator and source validator to a destination validator.
     */
    WrappedBeginRedelegate(request: MsgWrappedBeginRedelegate): Promise<MsgWrappedBeginRedelegateResponse>;
    /**
     * WrappedCancelUnbondingDelegation defines a method for cancelling unbonding of
     * coins from a delegator and source validator to a destination validator.
     */
    WrappedCancelUnbondingDelegation(request: MsgWrappedCancelUnbondingDelegation): Promise<MsgWrappedCancelUnbondingDelegationResponse>;
    /**
     * WrappedEditValidator defines a method for editing the validator
     * information.
     */
    WrappedEditValidator(request: MsgWrappedEditValidator): Promise<MsgWrappedEditValidatorResponse>;
    /** UpdateParams defines a method for updating epoching module parameters. */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
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
