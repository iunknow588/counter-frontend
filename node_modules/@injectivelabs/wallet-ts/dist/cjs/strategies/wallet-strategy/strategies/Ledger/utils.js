"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageHash = exports.domainHash = void 0;
const eth_sig_util_1 = require("eth-sig-util");
const domainHash = (message) => eth_sig_util_1.TypedDataUtils.hashStruct('EIP712Domain', message.domain, message.types, true);
exports.domainHash = domainHash;
const messageHash = (message) => eth_sig_util_1.TypedDataUtils.hashStruct(message.primaryType, message.message, message.types, true);
exports.messageHash = messageHash;
//# sourceMappingURL=utils.js.map