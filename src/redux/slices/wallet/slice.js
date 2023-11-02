import {createSlice} from '@reduxjs/toolkit';

const name = 'wallet';

export const walletSlice = createSlice({
  name,
  initialState: {
    balance: 0,
    accountNumber: '',
    accountName: '',
    bank: '',
    banks: [],
    tokens: {},
  },
  reducers: {
    setWalletBalance: (state, action) => {
      state.balance = action.payload;
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
  },
});

// Action creators are generated for each case reducer function
export const {
  setWalletBalance,
  setAccountNumber,
  setBanks,
  setBank,
  setAccountName,
  setTokens,
} = walletSlice.actions;
const {actions, reducer} = walletSlice;

export {actions, reducer, name};
