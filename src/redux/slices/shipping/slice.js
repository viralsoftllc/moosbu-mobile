import {createSlice} from '@reduxjs/toolkit';

const name = 'shipping';

export const shippingSlice = createSlice({
  name,
  initialState: {
    shippings: [],
    locations: [],
  },
  reducers: {
    setShippings: (state, action) => {
      state.shippings = action.payload;
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setShippings, setLocations} = shippingSlice.actions;
const {actions, reducer} = shippingSlice;

export {actions, reducer, name};
