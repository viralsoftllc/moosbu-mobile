import {createSlice} from '@reduxjs/toolkit';

const name = 'user';

export const userSlice = createSlice({
  name,
  initialState: {
    user: null,
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUserDetails} = userSlice.actions;
const {actions, reducer} = userSlice;

export {actions, reducer, name};
