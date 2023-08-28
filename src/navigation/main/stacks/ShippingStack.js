import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {shippingScreens} from '../screens';

const Stack = createStackNavigator();

export default function ShippingStack() {
  return (
    <Stack.Navigator
    // initialRouteName={routes.MENU}
    >
      {Object.entries({...shippingScreens}).map(([name, screen]) => (
        <Stack.Screen name={name} component={screen} key={name} />
      ))}
    </Stack.Navigator>
  );
}
