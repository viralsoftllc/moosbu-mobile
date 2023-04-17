import {createSlice} from '@reduxjs/toolkit';

const name = 'businessRegistration';

export const businessRegistrationSlice = createSlice({
  name,
  initialState: {
    businessRegistrationDetails: null,
  },
  reducers: {
    setBusinessRegistrationDetails: (state, action) => {
      state.businessRegistrationDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setBusinessRegistrationDetails} =
  businessRegistrationSlice.actions;
const {actions, reducer} = businessRegistrationSlice;

export {actions, reducer, name};
