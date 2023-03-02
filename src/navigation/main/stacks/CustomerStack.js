import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {customerScreens} from '../screens';

const Stack = createStackNavigator();

export default function CustomerStack() {
  return (
    <Stack.Navigator
    // initialRouteName={routes.MENU}
    >
      {Object.entries({...customerScreens}).map(([name, screen]) => (
        <Stack.Screen name={name} component={screen} key={name} />
      ))}
    </Stack.Navigator>
  );
}
