import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import {useLayoutEffect} from 'react';

import ScreenHeader from '../../../shared/components/ScreenHeader';
import routes from '../../../shared/constants/routes';
import TopTabBar from '../components/TopTabBar';
import AutomatedMethods from '../../../screens/others/Integration/paymentProviders/AutomatedMethods';
import ManualMethods from '../../../screens/others/Integration/paymentProviders/ManualMethods';

const Tab = createMaterialTopTabNavigator();

export default function PaymentProviderTopTabNavigator() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Payment'} />,
    });
  }, [setOptions]);

  return (
    <Tab.Navigator
      initialRouteName={routes.AUTOMATED_PAYMENT}
      tabBar={props => <TopTabBar {...props} />}>
      <Tab.Screen
        name={routes.AUTOMATED_PAYMENT}
        component={AutomatedMethods}
        options={{
          tabBarLabel: 'Automated Methods',
        }}
      />
      <Tab.Screen
        name={routes.MANUAL_PAYMENT}
        component={ManualMethods}
        options={{
          tabBarLabel: 'Manual Method',
        }}
      />
    </Tab.Navigator>
  );
}
