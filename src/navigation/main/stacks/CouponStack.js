import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {couponScreens} from '../screens';

const Stack = createStackNavigator();

export default function CouponStack() {
  return (
    <Stack.Navigator
    // initialRouteName={routes.MENU}
    >
      {Object.entries({...couponScreens}).map(([name, screen]) => (
        <Stack.Screen name={name} component={screen} key={name} />
      ))}
    </Stack.Navigator>
  );
}
