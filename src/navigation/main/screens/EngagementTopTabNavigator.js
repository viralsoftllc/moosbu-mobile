import React, {useLayoutEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import routes from '../../../shared/constants/routes';
import Campaign from '../../../screens/marketingSuite/Campaign';
import PhoneBook from '../../../screens/marketingSuite/PhoneBook';
import Email from '../../../screens/marketingSuite/Email';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import TopTabBar from '../components/TopTabBar';

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
      <Tab.Screen name={routes.PHONE_BOOK} component={PhoneBook} />
      <Tab.Screen name={routes.EMAIL} component={Email} />
    </Tab.Navigator>
  );
}
