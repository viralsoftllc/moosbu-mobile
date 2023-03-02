import React, {useLayoutEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SalesAnalytics from '../../../screens/storeFront/Analytics/SalesAnalytics';
import ProductAnalytics from '../../../screens/storeFront/Analytics/ProductAnalytics';
import CustomerAnalytics from '../../../screens/storeFront/Analytics/CustomerAnalytics';
import routes from '../../../shared/constants/routes';
import TopTabBar from '../components/TopTabBar';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../../../shared/components/ScreenHeader';

const Tab = createMaterialTopTabNavigator();

export default function AnalyticTopTabNavigator() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <ScreenHeader
          title={'Analytics'}
          subtitle="Check your business stat today"
        />
      ),
    });
    return () => {};
  }, [setOptions]);

  return (
    <Tab.Navigator
      initialRouteName={routes.SALES_ANALYTICS}
      tabBar={props => <TopTabBar {...props} />}>
      <Tab.Screen
        name={routes.SALES_ANALYTICS}
        component={SalesAnalytics}
        options={{
          tabBarLabel: 'Sales',
        }}
      />
      <Tab.Screen
        name={routes.PRODUCT_ANALYTICS}
        component={ProductAnalytics}
        options={{
          tabBarLabel: 'Products',
        }}
      />
      <Tab.Screen
        name={routes.CUSTOMER_ANALYTICS}
        component={CustomerAnalytics}
        options={{
          tabBarLabel: 'Customers',
        }}
      />
    </Tab.Navigator>
  );
}
