"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformTypedData = void 0;
const exceptions_1 = require("@injectivelabs/exceptions");
const eth_sig_util_1 = require("@metamask/eth-sig-util");
// Sanitization is used for T1 as eth-sig-util does not support BigInt
// @ts-ignore
function sanitizeData(data) {
    switch (Object.prototype.toString.call(data)) {
        case '[object Object]': {
            // @ts-ignore
            const entries = Object.keys(data).map((k) => [k, sanitizeData(data[k])]);
            return Object.fromEntries(entries);
        }
        case '[object Array]':
            return data.map((v) => sanitizeData(v));
        case '[object BigInt]':
            return data.toString();
        default:
            return data;
    }
}
/**
 * Calculates the domain_separator_hash and message_hash from an EIP-712 Typed Data object.
 *
 * The Trezor Model 1 does not currently support constructing the hash on the device,
 * so this function pre-computes them.
 *
 * @template {TypedMessage} T
 * @param {T} data - The EIP-712 Typed Data object.
 * @param {boolean} metamask_v4_compat - Set to `true` for compatibility with Metamask's signTypedData_v4 function.
 * @returns {{domain_separator_hash: string, message_hash?: string} & T} The hashes.
 */
const transformTypedData = (data, metamask_v4_compat = true) => {
    if (!metamask_v4_compat) {
        throw new exceptions_1.TrezorException(new Error('Trezor: Only version 4 of typed data signing is supported'));
    }
    const version = eth_sig_util_1.SignTypedDataVersion.V4;
    const { types, primaryType, domain, message } = eth_sig_util_1.TypedDataUtils.sanitizeData(data);
    const domainSeparatorHash = eth_sig_util_1.TypedDataUtils.hashStruct('EIP712Domain', sanitizeData(domain), types, version).toString('hex');
    let messageHash = null;
    if (primaryType !== 'EIP712Domain') {
        messageHash = eth_sig_util_1.TypedDataUtils.hashStruct(primaryType, sanitizeData(message), types, version).toString('hex');
    }
    return Object.assign({ domain_separator_hash: domainSeparatorHash, message_hash: messageHash }, data);
};
exports.transformTypedData = transformTypedData;
//# sourceMappingURL=utils.js.map