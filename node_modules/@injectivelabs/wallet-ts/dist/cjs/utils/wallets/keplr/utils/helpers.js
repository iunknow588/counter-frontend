"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEip712StdSignDoc = void 0;
const utils_1 = require("@injectivelabs/utils");
const createEip712StdSignDoc = ({ memo, chainId, accountNumber, timeoutHeight, sequence, gas, msgs, }) => ({
    chain_id: chainId,
    timeout_height: timeoutHeight || '',
    account_number: accountNumber.toString(),
    sequence: sequence.toString(),
    fee: (0, utils_1.getStdFee)({ gas }),
    msgs: msgs.map((m) => m.toEip712()),
    memo: memo || '',
});
exports.createEip712StdSignDoc = createEip712StdSignDoc;
//# sourceMappingURL=helpers.js.map