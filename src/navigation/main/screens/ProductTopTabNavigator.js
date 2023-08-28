import React, {useLayoutEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';

import ScreenHeader from '../../../shared/components/ScreenHeader';
import TopTabBar from '../components/TopTabBar';
import routes from '../../../shared/constants/routes';
import Products from '../../../screens/storeFront/Products';
import Category from '../../../screens/storeFront/Category';

const Tab = createMaterialTopTabNavigator();

export default function ProductTopTabNavigator() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Products'} />,
    });
    return () => {};
  }, [setOptions]);

  return (
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
  );
}
