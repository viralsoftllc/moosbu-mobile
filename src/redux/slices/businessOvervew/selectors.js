import {name} from '.';

const selectTotalCustomers = state => state[name].totalCustomers;
const selectTotalOrders = state => state[name].totalOrders;
const selectTotalProducts = state => state[name].totalProducts;
const selectTotalStoreVisits = state => state[name].totalStoreVisits;
const selectTotalConversions = state => state[name].totalConversions;

export {
  selectTotalConversions,
  selectTotalCustomers,
  selectTotalOrders,
  selectTotalProducts,
  selectTotalStoreVisits,
};
