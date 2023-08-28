import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {cashFlowScreens} from '../screens';

const Stack = createStackNavigator();

export default function CashFlowStack() {
  return (
    <Stack.Navigator
    // initialRouteName={routes.MENU}
    >
      {Object.entries({...cashFlowScreens}).map(([name, screen]) => (
        <Stack.Screen name={name} component={screen} key={name} />
      ))}
    </Stack.Navigator>
  );
}
