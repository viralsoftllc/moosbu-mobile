import React, {useLayoutEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';

import ScreenHeader from '../../../shared/components/ScreenHeader';
import routes from '../../../shared/constants/routes';
import TopTabBar from '../components/TopTabBar';
import Active from '../../../screens/scaleByMoosbu/CashFlow/Active';
import LoanHistory from '../../../screens/scaleByMoosbu/CashFlow/LoanHistory';

const Tab = createMaterialTopTabNavigator();

export default function CashFlowTopTabNavigator() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Loan Dashboard'} />,
    });
    return () => {};
  }, [setOptions]);

  return (
    <Tab.Navigator
      initialRouteName={routes.ACTIVE}
      tabBar={props => <TopTabBar {...props} />}>
      <Tab.Screen name={routes.ACTIVE} component={Active} />

      <Tab.Screen name={routes.LOAN_HISTORY} component={LoanHistory} />
    </Tab.Navigator>
  );
}
