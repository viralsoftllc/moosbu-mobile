import {createSlice} from '@reduxjs/toolkit';

const name = 'orders';

export const ordersSlice = createSlice({
  name,
  initialState: {
    orders: null,
  },
  reducers: {
    setOrdersDetails: (state, action) => {
      state.orders = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setOrdersDetails} = ordersSlice.actions;
const {actions, reducer} = ordersSlice;

export {actions, reducer, name};
