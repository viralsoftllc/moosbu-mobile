import {createSlice} from '@reduxjs/toolkit';

const name = 'wallet';

export const walletSlice = createSlice({
  name,
  initialState: {
    balance: 0,
  },
  reducers: {
    setWalletBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setWalletBalance} = walletSlice.actions;
const {actions, reducer} = walletSlice;

export {actions, reducer, name};
