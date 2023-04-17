import {name} from '.';

const selectShippings = state => state[name].shippings;
const selectLocations = state => state[name].locations;

export {selectShippings, selectLocations};
