import React, {useLayoutEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import routes from '../../../shared/constants/routes';
import Campaign from '../../../screens/marketingSuite/Campaign';
import Contacts from '../../../screens/marketingSuite/Contacts';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import TopTabBar from '../components/TopTabBar';
import Settings from '../../../screens/marketingSuite/Settings';

const Tab = createMaterialTopTabNavigator();

export default function EngagementTopTabNavigator() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Marketing Engagement'} />,
    });
    return () => {};
  }, [setOptions]);

  return (
    <Tab.Navigator
      initialRouteName={routes.CAMPAIGN}
      tabBar={props => <TopTabBar {...props} />}>
      <Tab.Screen name={routes.CAMPAIGN} component={Campaign} />
      <Tab.Screen name={routes.CONTACTS} component={Contacts} />
      <Tab.Screen name={routes.SETTINGS} component={Settings} />
    </Tab.Navigator>
  );
}
