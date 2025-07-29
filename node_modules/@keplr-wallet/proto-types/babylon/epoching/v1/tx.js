"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgUpdateParamsResponse = exports.MsgUpdateParams = exports.MsgWrappedEditValidatorResponse = exports.MsgWrappedEditValidator = exports.MsgWrappedCancelUnbondingDelegationResponse = exports.MsgWrappedCancelUnbondingDelegation = exports.MsgWrappedBeginRedelegateResponse = exports.MsgWrappedBeginRedelegate = exports.MsgWrappedUndelegateResponse = exports.MsgWrappedUndelegate = exports.MsgWrappedDelegateResponse = exports.MsgWrappedDelegate = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const tx_1 = require("../../../cosmos/staking/v1beta1/tx");
const params_1 = require("../../../babylon/epoching/v1/params");
exports.protobufPackage = "babylon.epoching.v1";
function createBaseMsgWrappedDelegate() {
    return { msg: undefined };
}
exports.MsgWrappedDelegate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.msg !== undefined) {
            tx_1.MsgDelegate.encode(message.msg, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWrappedDelegate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.msg = tx_1.MsgDelegate.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            msg: isSet(object.msg) ? tx_1.MsgDelegate.fromJSON(object.msg) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.msg !== undefined &&
            (obj.msg = message.msg ? tx_1.MsgDelegate.toJSON(message.msg) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgWrappedDelegate();
        message.msg =
            object.msg !== undefined && object.msg !== null
                ? tx_1.MsgDelegate.fromPartial(object.msg)
                : undefined;
        return message;
    },
};
function createBaseMsgWrappedDelegateResponse() {
    return {};
}
exports.MsgWrappedDelegateResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWrappedDelegateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgWrappedDelegateResponse();
        return message;
    },
};
function createBaseMsgWrappedUndelegate() {
    return { msg: undefined };
}
exports.MsgWrappedUndelegate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.msg !== undefined) {
            tx_1.MsgUndelegate.encode(message.msg, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWrappedUndelegate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.msg = tx_1.MsgUndelegate.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            msg: isSet(object.msg) ? tx_1.MsgUndelegate.fromJSON(object.msg) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.msg !== undefined &&
            (obj.msg = message.msg ? tx_1.MsgUndelegate.toJSON(message.msg) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgWrappedUndelegate();
        message.msg =
            object.msg !== undefined && object.msg !== null
                ? tx_1.MsgUndelegate.fromPartial(object.msg)
                : undefined;
        return message;
    },
};
function createBaseMsgWrappedUndelegateResponse() {
    return {};
}
exports.MsgWrappedUndelegateResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWrappedUndelegateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgWrappedUndelegateResponse();
        return message;
    },
};
function createBaseMsgWrappedBeginRedelegate() {
    return { msg: undefined };
}
exports.MsgWrappedBeginRedelegate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.msg !== undefined) {
            tx_1.MsgBeginRedelegate.encode(message.msg, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWrappedBeginRedelegate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.msg = tx_1.MsgBeginRedelegate.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            msg: isSet(object.msg)
                ? tx_1.MsgBeginRedelegate.fromJSON(object.msg)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.msg !== undefined &&
            (obj.msg = message.msg
                ? tx_1.MsgBeginRedelegate.toJSON(message.msg)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgWrappedBeginRedelegate();
        message.msg =
            object.msg !== undefined && object.msg !== null
                ? tx_1.MsgBeginRedelegate.fromPartial(object.msg)
                : undefined;
        return message;
    },
};
function createBaseMsgWrappedBeginRedelegateResponse() {
    return {};
}
exports.MsgWrappedBeginRedelegateResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWrappedBeginRedelegateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgWrappedBeginRedelegateResponse();
        return message;
    },
};
function createBaseMsgWrappedCancelUnbondingDelegation() {
    return { msg: undefined };
}
exports.MsgWrappedCancelUnbondingDelegation = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.msg !== undefined) {
            tx_1.MsgCancelUnbondingDelegation.encode(message.msg, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWrappedCancelUnbondingDelegation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.msg = tx_1.MsgCancelUnbondingDelegation.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            msg: isSet(object.msg)
                ? tx_1.MsgCancelUnbondingDelegation.fromJSON(object.msg)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.msg !== undefined &&
            (obj.msg = message.msg
                ? tx_1.MsgCancelUnbondingDelegation.toJSON(message.msg)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgWrappedCancelUnbondingDelegation();
        message.msg =
            object.msg !== undefined && object.msg !== null
                ? tx_1.MsgCancelUnbondingDelegation.fromPartial(object.msg)
                : undefined;
        return message;
    },
};
function createBaseMsgWrappedCancelUnbondingDelegationResponse() {
    return {};
}
exports.MsgWrappedCancelUnbondingDelegationResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWrappedCancelUnbondingDelegationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgWrappedCancelUnbondingDelegationResponse();
        return message;
    },
};
function createBaseMsgWrappedEditValidator() {
    return { msg: undefined };
}
exports.MsgWrappedEditValidator = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.msg !== undefined) {
            tx_1.MsgEditValidator.encode(message.msg, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWrappedEditValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.msg = tx_1.MsgEditValidator.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            msg: isSet(object.msg)
                ? tx_1.MsgEditValidator.fromJSON(object.msg)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.msg !== undefined &&
            (obj.msg = message.msg
                ? tx_1.MsgEditValidator.toJSON(message.msg)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMsgWrappedEditValidator();
        message.msg =
            object.msg !== undefined && object.msg !== null
                ? tx_1.MsgEditValidator.fromPartial(object.msg)
                : undefined;
        return message;
    },
};
function createBaseMsgWrappedEditValidatorResponse() {
    return {};
}
exports.MsgWrappedEditValidatorResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWrappedEditValidatorResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgWrappedEditValidatorResponse();
        return message;
    },
};
function createBaseMsgUpdateParams() {
    return { authority: "", params: undefined };
}
exports.MsgUpdateParams = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            params_1.Params.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authority = reader.string();
                    break;
                case 2:
                    message.params = params_1.Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            authority: isSet(object.authority) ? String(object.authority) : "",
            params: isSet(object.params) ? params_1.Params.fromJSON(object.params) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.authority !== undefined && (obj.authority = message.authority);
        message.params !== undefined &&
            (obj.params = message.params ? params_1.Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgUpdateParams();
        message.authority = (_a = object.authority) !== null && _a !== void 0 ? _a : "";
        message.params =
            object.params !== undefined && object.params !== null
                ? params_1.Params.fromPartial(object.params)
                : undefined;
        return message;
    },
};
function createBaseMsgUpdateParamsResponse() {
    return {};
}
exports.MsgUpdateParamsResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateParamsResponse();
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=tx.js.map