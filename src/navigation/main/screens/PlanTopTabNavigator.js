import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';

import MonthlyPlan from '../../../screens/plans/MonthlyPlan';
import YearlyPlan from '../../../screens/plans/YearlyPlan';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import routes from '../../../shared/constants/routes';
import TopTabBar from '../components/TopTabBar';

const Tab = createMaterialTopTabNavigator();

export default function PlanTopTabNavigator() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Choose Your Subscription Plan'} />,
    });
    return () => {};
  }, [setOptions]);

  return (
    <Tab.Navigator tabBar={props => <TopTabBar {...props} />}>
      <Tab.Screen
        name={routes.MONTHLY_PLAN}
        component={MonthlyPlan}
        options={{
          tabBarLabel: 'Monthly Plan',
        }}
      />

      <Tab.Screen
        name={routes.YEARLY_PLAN}
        component={YearlyPlan}
        options={{
          tabBarLabel: 'Yearly Plan',
        }}
      />
    </Tab.Navigator>
  );
}
