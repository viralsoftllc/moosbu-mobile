import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import routes from '../../../shared/constants/routes';
import Shipping from '../../../screens/others/Shipping';
import Location from '../../../screens/others/Location';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import TopTabBar from '../components/TopTabBar';
import {SafeAreaView} from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function ShippingTopTabNavigator() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenHeader title={'Shipping Method/Location'} />

      <Tab.Navigator
        initialRouteName={routes.LOCATION}
        tabBar={props => <TopTabBar {...props} />}>
        <Tab.Screen name={routes.LOCATION} component={Location} />
        <Tab.Screen name={routes.SHIPPING} component={Shipping} />
        {/* <Tab.Screen
        name={routes.SHIPPING_HISTORY}
        component={ShippingHistory}
        options={{
          tabBarLabel: 'History',
        }}
      /> */}
      </Tab.Navigator>
    </SafeAreaView>
  );
}
