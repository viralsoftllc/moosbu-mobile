import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {moreScreens} from '../screens';
import routes from '../../../shared/constants/routes';

const Stack = createStackNavigator();

export default function MoreStack() {
  return (
    <Stack.Navigator initialRouteName={routes.MORE}>
      {Object.entries({...moreScreens}).map(([name, screen]) => (
        <Stack.Screen name={name} component={screen} key={name} />
      ))}
    </Stack.Navigator>
  );
}
