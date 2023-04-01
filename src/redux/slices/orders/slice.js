import {createSlice} from '@reduxjs/toolkit';

const name = 'orders';

export const ordersSlice = createSlice({
  name,
  initialState: {
    orders: null,
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setOrders} = ordersSlice.actions;
const {actions, reducer} = ordersSlice;

export {actions, reducer, name};
