import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import ScreenHeader from '../../../shared/components/ScreenHeader';
import TopTabBar from '../components/TopTabBar';
import routes from '../../../shared/constants/routes';
import Products from '../../../screens/storeFront/Products';
import Category from '../../../screens/storeFront/Category';
import {SafeAreaView} from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function ProductTopTabNavigator() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScreenHeader title={'Products'} />

      <Tab.Navigator
        // initialRouteName={routes.PRODUCTS}
        tabBar={props => <TopTabBar {...props} />}>
        <Tab.Screen
          name={routes.PRODUCTS}
          component={Products}
          options={{
            tabBarLabel: 'Products',
          }}
        />

        <Tab.Screen
          name={routes.CATEGORY}
          component={Category}
          options={{
            tabBarLabel: 'Category',
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
