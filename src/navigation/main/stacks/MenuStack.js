import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {menuStack} from '../screens';

const Stack = createStackNavigator();

export default function MenuStack() {
  return (
    <Stack.Navigator
    // initialRouteName={routes.MENU}
    >
      {/* <Stack.Screen
        name={routes.MENU}
        component={Menu}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
      /> */}

      {Object.entries({...menuStack}).map(([name, screen]) => (
        <Stack.Screen name={name} component={screen} key={name} />
      ))}
    </Stack.Navigator>
  );
}
