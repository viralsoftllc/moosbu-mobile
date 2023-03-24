import {configureStore} from '@reduxjs/toolkit';
import {name as user, reducer as userReducer} from './slices/user';
import {name as auth, reducer as authReducer} from './slices/auth';
import {name as store, reducer as storeReducer} from './slices/store';
import {name as wallet, reducer as walletReducer} from './slices/wallet';
import {name as orders, reducer as ordersReducer} from './slices/orders';
import {
  name as businessOvervew,
  reducer as businessOvervewReducer,
} from './slices/businessOvervew';

export default configureStore({
  reducer: {
    [user]: userReducer,
    [auth]: authReducer,
    [store]: storeReducer,
    [wallet]: walletReducer,
    [businessOvervew]: businessOvervewReducer,
    [orders]: ordersReducer,
  },
});
