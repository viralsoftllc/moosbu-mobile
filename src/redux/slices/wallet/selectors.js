import {name} from '.';

const selectWalletBalance = state => state[name].balance;
const selectBanks = state => state[name].banks;

export {selectWalletBalance, selectBanks};
