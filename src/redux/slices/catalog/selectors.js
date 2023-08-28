import {name} from '.';

const selectCategories = state => state[name].categories;
const selectProducts = state => state[name].products;

export {selectCategories, selectProducts};
