import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TopTabBar from '../components/TopTabBar';
import routes from '../../../shared/constants/routes';
import AllOrders from '../../../screens/storeFront/orders/AllOrders';
import ProcessingOrders from '../../../screens/storeFront/orders/ProcessingOrders';
import CompletedOrders from '../../../screens/storeFront/orders/CompletedOrders';
import {COLORS, SIZES} from '../../../assets/themes';

const Tab = createMaterialTopTabNavigator();

export default function OrderTopTabNavigator() {
  // const {setOptions} = useNavigation();

  // useLayoutEffect(() => {
  //   setOptions({
  //     header: () => <ScreenHeader title={'Orders'} />,
  //     headerShown: true,
  //   });
  //   return () => {};
  // }, [setOptions]);

  return (
    <Tab.Navigator
      tabBar={props => <TopTabBar {...props} />}
      style={{paddingTop: SIZES.base * 5, backgroundColor: COLORS.white}}>
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
