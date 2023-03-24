import {createSlice} from '@reduxjs/toolkit';

const name = 'businessOvervew';

export const businessOvervewSlice = createSlice({
  name,
  initialState: {
    totalCustomers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalStoreVisits: 0,
    totalConversions: 0,
  },
  reducers: {
    setTotalCustomers: (state, action) => {
      state.totalCustomers = action.payload;
    },
    setTotalOrders: (state, action) => {
      state.totalOrders = action.payload;
    },
    setTotalProducts: (state, action) => {
      state.totalProducts = action.payload;
    },
    setTotalStoreVisits: (state, action) => {
      state.totalStoreVisits = action.payload;
    },
    setTotalConversions: (state, action) => {
      state.totalConversions = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTotalCustomers,
  setTotalConversions,
  setTotalOrders,
  setTotalProducts,
  setTotalStoreVisits,
} = businessOvervewSlice.actions;
const {actions, reducer} = businessOvervewSlice;

export {actions, reducer, name};
