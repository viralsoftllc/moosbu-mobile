import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Finances from '../../screens/finances';
import RegisterWalletOne from '../../screens/finances/registerWalletOne';
import RegisterWalletTwo from '../../screens/finances/registerWalletTwo';
import TransactionDetails from '../../screens/Wallet/TransactionDetails/TransactionDetails';
import HistoryDetails from '../../screens/Wallet/HistoryDetails/HistoryDetails';
import Test from '../../screens/Test';
import TokenScreen from '../../screens/TokenSuccess';
import SuccessfulRegistration from '../../screens/finances/SuccessfulRegistration/SuccessfulRegistration';

import {authScreens} from './screens';
import VerifyEmail from '../../screens/auth/VerifyEmail';
import EmailVerified from '../../screens/auth/EmailVerified';

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
      {/* <Stack.Screen
        name="EmailVerified"
        component={EmailVerified}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
}
