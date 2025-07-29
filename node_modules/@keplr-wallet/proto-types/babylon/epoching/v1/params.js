"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "babylon.epoching.v1";
function createBaseParams() {
    return { epochInterval: "0" };
}
exports.Params = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.epochInterval !== "0") {
            writer.uint32(8).uint64(message.epochInterval);
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
                    message.epochInterval = longToString(reader.uint64());
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
            epochInterval: isSet(object.epochInterval)
                ? String(object.epochInterval)
                : "0",
        };
    },
    toJSON(message) {
        const obj = {};
        message.epochInterval !== undefined &&
            (obj.epochInterval = message.epochInterval);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseParams();
        message.epochInterval = (_a = object.epochInterval) !== null && _a !== void 0 ? _a : "0";
        return message;
    },
};
function longToString(long) {
    return long.toString();
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=params.js.map