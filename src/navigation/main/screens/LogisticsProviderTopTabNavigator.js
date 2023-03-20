import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import {useLayoutEffect} from 'react';

import ScreenHeader from '../../../shared/components/ScreenHeader';
import routes from '../../../shared/constants/routes';
import TopTabBar from '../components/TopTabBar';
import InbuiltLogistics from '../../../screens/others/Integration/logisticsProviders/InbuiltLogistics';
import ThirdPartyLogistics from '../../../screens/others/Integration/logisticsProviders/ThirdPartyLogistics';

const Tab = createMaterialTopTabNavigator();

export default function LogisticsProviderTopTabNavigator() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Logistics'} />,
    });
  }, [setOptions]);

  return (
    <Tab.Navigator
      initialRouteName={routes.INBUILT_LOGISTICS}
      tabBar={props => <TopTabBar {...props} />}>
      <Tab.Screen
        name={routes.INBUILT_LOGISTICS}
        component={InbuiltLogistics}
        options={{
          tabBarLabel: 'Inbuilt Logistics',
        }}
      />
      <Tab.Screen
        name={routes.THIRDPARTY_LOGISTICS}
        component={ThirdPartyLogistics}
        options={{
          tabBarLabel: 'Thirdparty Logistics',
        }}
      />
    </Tab.Navigator>
  );
}
