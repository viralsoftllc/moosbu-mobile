import {name} from '.';

const selectStoreDetails = state => state[name].store;
const selectStoreUrl = state => state[name].storeUrl;
const selectStores = state => state[name].stores;

export {selectStoreDetails, selectStoreUrl, selectStores};
