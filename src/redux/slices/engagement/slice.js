import {createSlice} from '@reduxjs/toolkit';

const name = 'engagement';

export const engagementSlice = createSlice({
  name,
  initialState: {
    contacts: 0,
  },
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setContacts} = engagementSlice.actions;
const {actions, reducer} = engagementSlice;

export {actions, reducer, name};
