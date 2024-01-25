import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {productScreen} from '../screens';

const Stack = createStackNavigator();

export default function ProductsStack() {
  return (
    <Stack.Navigator
      // initialRouteName={routes.MENU}
      screenOptions={{
        headerShown: false,
      }}>
      {Object.entries({...productScreen}).map(([name, screen]) => (
        <Stack.Screen name={name} component={screen} key={name} />
      ))}
    </Stack.Navigator>
  );
}
