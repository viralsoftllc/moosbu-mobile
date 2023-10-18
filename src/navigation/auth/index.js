import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Finances from '../../screens/finances';
import RegisterWalletOne from '../../screens/finances/registerWalletOne';
import RegisterWalletTwo from '../../screens/finances/registerWalletTwo';
import TransactionDetails from '../../screens/Wallet/TransactionDetails/TransactionDetails';

import {authScreens} from './screens';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {Object.entries({...authScreens}).map(([name, screen]) => (
        <Stack.Screen name={name} component={screen} key={name} />
      ))}
    </Stack.Navigator>
  );
}
