import { ChainId } from '@injectivelabs/ts-types';
import { Msgs } from '@injectivelabs/sdk-ts';
export declare const createEip712StdSignDoc: ({ memo, chainId, accountNumber, timeoutHeight, sequence, gas, msgs, }: {
    memo?: string | undefined;
    chainId: ChainId;
    timeoutHeight?: string | undefined;
    accountNumber: number;
    sequence: number;
    gas?: string | undefined;
    msgs: Msgs[];
}) => {
    chain_id: ChainId;
    timeout_height: string;
    account_number: string;
    sequence: string;
    fee: {
        amount: {
            denom: string;
            amount: string;
        }[];
        gas: string;
        payer: string | undefined;
        granter: string | undefined;
        feePayer: string | undefined;
    };
    msgs: {
        type: string;
        value: Record<string, unknown>;
    }[];
    memo: string;
};
//# sourceMappingURL=helpers.d.ts.map