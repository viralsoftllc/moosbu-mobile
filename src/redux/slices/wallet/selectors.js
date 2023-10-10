import {name} from '.';

const selectWalletBalance = state => state[name].balance;
const selectBanks = state => state[name].banks;
const selectAccountNumber = state => state[name].accountNumber;

export {selectWalletBalance, selectAccountNumber, selectBanks};
