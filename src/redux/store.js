import {configureStore} from '@reduxjs/toolkit';
import {name as user, reducer as userReducer} from './slices/user';
import {name as auth, reducer as authReducer} from './slices/auth';

export default configureStore({
  reducer: {
    [user]: userReducer,
    [auth]: authReducer,
  },
});
