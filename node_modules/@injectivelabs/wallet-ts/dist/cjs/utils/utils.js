"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEthereumSignerAddress = exports.getInjectiveSignerAddress = void 0;
const sdk_ts_1 = require("@injectivelabs/sdk-ts");
const getInjectiveSignerAddress = (address) => {
    if (!address) {
        return '';
    }
    if (address.startsWith('inj')) {
        return address;
    }
    if (address.startsWith('0x')) {
        return (0, sdk_ts_1.getInjectiveAddress)(address);
    }
    return '';
};
exports.getInjectiveSignerAddress = getInjectiveSignerAddress;
const getEthereumSignerAddress = (address) => {
    if (!address) {
        return '';
    }
    if (address.startsWith('0x')) {
        return address;
    }
    if (address.startsWith('inj')) {
        return (0, sdk_ts_1.getEthereumAddress)(address);
    }
    return '';
};
exports.getEthereumSignerAddress = getEthereumSignerAddress;
//# sourceMappingURL=utils.js.map