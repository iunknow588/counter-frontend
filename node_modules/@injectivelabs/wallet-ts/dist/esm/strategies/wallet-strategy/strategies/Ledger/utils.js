import { TypedDataUtils } from 'eth-sig-util';
export const domainHash = (message) => TypedDataUtils.hashStruct('EIP712Domain', message.domain, message.types, true);
export const messageHash = (message) => TypedDataUtils.hashStruct(message.primaryType, message.message, message.types, true);
//# sourceMappingURL=utils.js.map