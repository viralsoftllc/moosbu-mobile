import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';

import Coupon from '../../../screens/storeFront/Coupon';
import BuyxGety from '../../../screens/storeFront/Coupon/BuyxGety';
import Discount from '../../../screens/storeFront/Coupon/Discount';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import routes from '../../../shared/constants/routes';
import TopTabBar from '../components/TopTabBar';

const Tab = createMaterialTopTabNavigator();

export default function CouponTopTabNavigator() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Coupon'} />,
    });
    return () => {};
  }, [setOptions]);

  return (
    <Tab.Navigator
      initialRouteName={routes.COUPON_DISCOUNT}
      tabBar={props => <TopTabBar {...props} />}>
      <Tab.Screen name={routes.COUPON_DISCOUNT} component={Discount} />

      <Tab.Screen name={routes.COUPON_CODE} component={Coupon} />

      <Tab.Screen name={routes.COUPON_BUYXGETY} component={BuyxGety} />
    </Tab.Navigator>
  );
}
