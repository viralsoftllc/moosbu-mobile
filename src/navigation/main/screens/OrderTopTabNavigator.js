import React, {useLayoutEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';

import ScreenHeader from '../../../shared/components/ScreenHeader';
import TopTabBar from '../components/TopTabBar';
import routes from '../../../shared/constants/routes';
import AllOrders from '../../../screens/storeFront/orders/AllOrders';
import ProcessingOrders from '../../../screens/storeFront/orders/ProcessingOrders';
import CompletedOrders from '../../../screens/storeFront/orders/CompletedOrders';

const Tab = createMaterialTopTabNavigator();

export default function OrderTopTabNavigator() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Orders'} />,
    });
    return () => {};
  }, [setOptions]);

  return (
    <Tab.Navigator tabBar={props => <TopTabBar {...props} />}>
      <Tab.Screen
        name={routes.ALL_ORDERS}
        component={AllOrders}
        options={{
          tabBarLabel: 'All',
        }}
      />

      <Tab.Screen
        name={routes.PROCESSING_ORDERS}
        component={ProcessingOrders}
        options={{
          tabBarLabel: 'Processing',
        }}
      />

      <Tab.Screen
        name={routes.COMPLETED_ORDERS}
        component={CompletedOrders}
        options={{
          tabBarLabel: 'Completed',
        }}
      />
    </Tab.Navigator>
  );
}
