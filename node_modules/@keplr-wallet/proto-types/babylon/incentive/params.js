"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "babylon.incentive";
function createBaseParams() {
    return { btcStakingPortion: "" };
}
exports.Params = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.btcStakingPortion !== "") {
            writer.uint32(10).string(message.btcStakingPortion);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.btcStakingPortion = reader.string();
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
            btcStakingPortion: isSet(object.btcStakingPortion)
                ? String(object.btcStakingPortion)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.btcStakingPortion !== undefined &&
            (obj.btcStakingPortion = message.btcStakingPortion);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseParams();
        message.btcStakingPortion = (_a = object.btcStakingPortion) !== null && _a !== void 0 ? _a : "";
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
//# sourceMappingURL=params.js.map