import React, {useLayoutEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';

import ScreenHeader from '../../../shared/components/ScreenHeader';
import TopTabBar from '../components/TopTabBar';
import routes from '../../../shared/constants/routes';
import Customers from '../../../screens/others/Customers';
import NewCustomers from '../../../screens/others/Customers/NewCustomers';
import ReturningCustomers from '../../../screens/others/Customers/ReturningCustomers';

const Tab = createMaterialTopTabNavigator();

export default function CustomerTopTabNavigator() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Customers'} />,
    });
    return () => {};
  }, [setOptions]);

  return (
    <Tab.Navigator tabBar={props => <TopTabBar {...props} />}>
      <Tab.Screen
        name={routes.ALL_CUSTOMERS}
        component={Customers}
        options={{
          tabBarLabel: 'All',
        }}
      />

      <Tab.Screen
        name={routes.NEW_CUSTOMERS}
        component={NewCustomers}
        options={{
          tabBarLabel: 'New',
        }}
      />

      <Tab.Screen
        name={routes.RETURNING_CUSTOMERS}
        component={ReturningCustomers}
        options={{
          tabBarLabel: 'Returning',
        }}
      />
    </Tab.Navigator>
  );
}
