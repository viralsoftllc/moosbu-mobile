import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {businessRegistrationScreens} from '../screens';

const Stack = createStackNavigator();

export default function BusinessRegistrationStack() {
  return (
    <Stack.Navigator
    // initialRouteName={routes.MENU}
    >
      {Object.entries({...businessRegistrationScreens}).map(
        ([name, screen]) => (
          <Stack.Screen name={name} component={screen} key={name} />
        ),
      )}
    </Stack.Navigator>
  );
}
