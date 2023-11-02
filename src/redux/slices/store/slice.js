import {createSlice} from '@reduxjs/toolkit';

const name = 'store';

export const storeSlice = createSlice({
  name,
  initialState: {
    store: null,
    storeUrl: null,
    stores: [],
  },
  reducers: {
    setStoreDetails: (state, action) => {
      state.store = action.payload;
    },
    setStoreUrl: (state, action) => {
      state.storeUrl = action.payload;
    },
    setStores: (state, action) => {
      state.stores = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setStoreDetails, setStoreUrl, setStores} = storeSlice.actions;
const {actions, reducer} = storeSlice;

export {actions, reducer, name};
