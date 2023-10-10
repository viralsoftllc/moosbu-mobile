import {createSlice} from '@reduxjs/toolkit';

const name = 'wallet';

export const walletSlice = createSlice({
  name,
  initialState: {
    balance: 0,
    accountNumber: '',
    banks: [],
  },
  reducers: {
    setWalletBalance: (state, action) => {
      state.balance = action.payload;
    },
    setAccountNumber: (state, action) => {
      state.accountNumber = action.payload;
    },
    setBanks: (state, action) => {
      state.banks = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setWalletBalance, setAccountNumber, setBanks} =
  walletSlice.actions;
const {actions, reducer} = walletSlice;

export {actions, reducer, name};
