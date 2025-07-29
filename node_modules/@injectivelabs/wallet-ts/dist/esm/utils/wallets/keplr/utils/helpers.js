import { getStdFee } from '@injectivelabs/utils';
export const createEip712StdSignDoc = ({ memo, chainId, accountNumber, timeoutHeight, sequence, gas, msgs, }) => ({
    chain_id: chainId,
    timeout_height: timeoutHeight || '',
    account_number: accountNumber.toString(),
    sequence: sequence.toString(),
    fee: getStdFee({ gas }),
    msgs: msgs.map((m) => m.toEip712()),
    memo: memo || '',
});
//# sourceMappingURL=helpers.js.map