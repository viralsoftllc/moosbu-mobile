import {name} from '.';

const selectStoreDetails = state => state[name].store;
const selectStoreUrl = state => state[name].storeUrl;

export {selectStoreDetails, selectStoreUrl};
