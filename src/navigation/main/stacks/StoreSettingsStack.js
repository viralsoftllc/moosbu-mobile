import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {storeSettingsScreen} from '../screens';

const Stack = createStackNavigator();

export default function StoreSettingsStack() {
  return (
    <Stack.Navigator initialRouteName={'General'}>
      {Object.entries({...storeSettingsScreen}).map(([name, screen]) => (
        <Stack.Screen name={name} component={screen} key={name} />
      ))}
    </Stack.Navigator>
  );
}
