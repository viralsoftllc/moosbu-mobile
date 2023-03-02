import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {taxScreen} from '../screens';

const Stack = createStackNavigator();

export default function TaxStack() {
  return (
    <Stack.Navigator
    // initialRouteName={routes.MENU}
    >
      {Object.entries({...taxScreen}).map(([name, screen]) => (
        <Stack.Screen name={name} component={screen} key={name} />
      ))}
    </Stack.Navigator>
  );
}
