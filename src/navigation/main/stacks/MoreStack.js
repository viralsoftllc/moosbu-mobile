import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {moreScreens} from '../screens';
import routes from '../../../shared/constants/routes';

import StoreSettingsStack from './StoreSettingsStack';

const Stack = createStackNavigator();

export default function MoreStack() {
  return (
    <Stack.Navigator
      initialRouteName={routes.MORE}
      screenOptions={{
        headerShown: false,
      }}>
      {Object.entries({...moreScreens}).map(([name, screen]) => (
        <Stack.Screen name={name} component={screen} key={name} />
      ))}
      <Stack.Screen
        name={routes.STORE_SETTINGS_STACK}
        component={StoreSettingsStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
