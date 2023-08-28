import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {engagementScreen} from '../screens';

const Stack = createStackNavigator();

export default function EngagementStack() {
  return (
    <Stack.Navigator
    // initialRouteName={routes.MENU}
    >
      {Object.entries({...engagementScreen}).map(([name, screen]) => (
        <Stack.Screen name={name} component={screen} key={name} />
      ))}
    </Stack.Navigator>
  );
}
