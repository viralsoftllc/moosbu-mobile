import {createSlice} from '@reduxjs/toolkit';

const name = 'auth';

export const authSlice = createSlice({
  name,
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setToken} = authSlice.actions;
const {reducer} = authSlice;

export {reducer, name};
