import React, {useLayoutEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';

import routes from '../../../shared/constants/routes';
import Shipping from '../../../screens/others/Shipping';
import Location from '../../../screens/others/Location';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import TopTabBar from '../components/TopTabBar';
import ShippingHistory from '../../../screens/others/ShippingHistory';

const Tab = createMaterialTopTabNavigator();

export default function ShippingTopTabNavigator() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Shipping/Location'} />,
    });
  }, [setOptions]);

  return (
    <Tab.Navigator
      initialRouteName={routes.LOCATION}
      tabBar={props => <TopTabBar {...props} />}>
      <Tab.Screen name={routes.LOCATION} component={Location} />
      <Tab.Screen name={routes.SHIPPING} component={Shipping} />
      <Tab.Screen
        name={routes.SHIPPING_HISTORY}
        component={ShippingHistory}
        options={{
          tabBarLabel: 'History',
        }}
      />
    </Tab.Navigator>
  );
}
