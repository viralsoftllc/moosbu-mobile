import {createSlice} from '@reduxjs/toolkit';

const name = 'catalog';

export const catalogSlice = createSlice({
  name,
  initialState: {
    categories: [],
    products: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setCategories, setProducts} = catalogSlice.actions;
const {actions, reducer} = catalogSlice;

export {actions, reducer, name};
