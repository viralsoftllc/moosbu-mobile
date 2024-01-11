import {name} from '.';

const selectWalletBalance = state => state[name].balance;
const selectBanks = state => state[name].banks;
const selectAccountNumber = state => state[name].accountNumber;
const selectAccountName = state => state[name].accountName;
const selectBank = state => state[name].bank;
const selectTokens = state => state[name].tokens;
const selectPersonalWallet = state => state[name].personalWallet;
const selectBusinessWallet = state => state[name].businessWallet;
const selectStoreRevenue = state => state[name].storeRevenue;

export {
  selectWalletBalance,
  selectAccountNumber,
  selectAccountName,
  selectBanks,
  selectBank,
  selectTokens,
  selectBusinessWallet,
  selectPersonalWallet,
  selectStoreRevenue,
};
