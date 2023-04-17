import {configureStore} from '@reduxjs/toolkit';
import {name as user, reducer as userReducer} from './slices/user';
import {name as auth, reducer as authReducer} from './slices/auth';
import {name as store, reducer as storeReducer} from './slices/store';
import {name as wallet, reducer as walletReducer} from './slices/wallet';
import {name as orders, reducer as ordersReducer} from './slices/orders';
import {name as catalog, reducer as catalogReducer} from './slices/catalog';
import {
  name as shippings,
  reducer as shippingsReducer,
} from './slices/shipping';
import {
  name as customers,
  reducer as customersReducer,
} from './slices/customers';
import {
  name as businessOvervew,
  reducer as businessOvervewReducer,
} from './slices/businessOvervew';
import {
  name as businessRegistration,
  reducer as businessRegistrationReducer,
} from './slices/businessRegistration';

export default configureStore({
  reducer: {
    [user]: userReducer,
    [auth]: authReducer,
    [store]: storeReducer,
    [wallet]: walletReducer,
    [businessOvervew]: businessOvervewReducer,
    [orders]: ordersReducer,
    [customers]: customersReducer,
    [shippings]: shippingsReducer,
    [catalog]: catalogReducer,
    [businessRegistration]: businessRegistrationReducer,
  },
});
