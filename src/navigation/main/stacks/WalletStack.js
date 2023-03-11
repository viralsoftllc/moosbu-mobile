import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {walletScreens} from '../screens';
import routes from '../../../shared/constants/routes';

const Stack = createStackNavigator();

export default function WalletStack() {
  return (
    <Stack.Navigator
      initialRouteName={routes.WALLET}
      screenOptions={{headerShown: false}}>
      {Object.entries({...walletScreens}).map(([name, screen]) => (
        <Stack.Screen name={name} component={screen} key={name} />
      ))}
    </Stack.Navigator>
  );
}
