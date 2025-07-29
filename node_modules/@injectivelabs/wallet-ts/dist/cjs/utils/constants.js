"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIP_IN_GWEI = exports.GWEI_IN_WEI = void 0;
const utils_1 = require("@injectivelabs/utils");
exports.GWEI_IN_WEI = new utils_1.BigNumber(1000000000);
exports.TIP_IN_GWEI = new utils_1.BigNumberInBase(2).times(exports.GWEI_IN_WEI);
//# sourceMappingURL=constants.js.map