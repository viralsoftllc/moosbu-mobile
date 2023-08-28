import {createSlice} from '@reduxjs/toolkit';

const name = 'customers';

export const customerSlice = createSlice({
  name,
  initialState: {
    customers: null,
  },
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setCustomers} = customerSlice.actions;
const {actions, reducer} = customerSlice;

export {actions, reducer, name};
