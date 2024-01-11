import {createSlice} from '@reduxjs/toolkit';

const name = 'wallet';

export const walletSlice = createSlice({
  name,
  initialState: {
    balance: 0,
    storeRevenue: 0,
    accountNumber: '',
    accountName: '',
    bank: '',
    banks: [],
    tokens: {},
    personalWallet: {},
    businessWallet: {},
  },
  reducers: {
    setWalletBalance: (state, action) => {
      state.balance = action.payload;
    },
    setStoreRevenue: (state, action) => {
      state.storeRevenue = action.payload;
    },
    setAccountNumber: (state, action) => {
      state.accountNumber = action.payload;
    },
    setAccountName: (state, action) => {
      state.accountName = action.payload;
    },
    setBanks: (state, action) => {
      state.banks = action.payload;
    },
    setBank: (state, action) => {
      state.bank = action.payload;
    },
    setTokens: (state, action) => {
      state.tokens = action.payload;
    },
    setPersonalWallet: (state, action) => {
      state.personalWallet = {...state.personalWallet, ...action.payload};
    },
    setBusinessWallet: (state, action) => {
      state.businessWallet = {...state.businessWallet, ...action.payload};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setWalletBalance,
  setStoreRevenue,
  setAccountNumber,
  setBanks,
  setBank,
  setAccountName,
  setTokens,
  setPersonalWallet,
  setBusinessWallet,
} = walletSlice.actions;
const {actions, reducer} = walletSlice;

export {actions, reducer, name};
