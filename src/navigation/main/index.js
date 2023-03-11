import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './components/BottomTabNavigator';
import routes from '../../shared/constants/routes';
import MenuStack from './stacks/MenuStack';
import CustomerStack from './stacks/CustomerStack';
import ShippingStack from './stacks/ShippingStack';
import CashFlowStack from './stacks/CashFlowStack';
import EngagementStack from './stacks/EngagementStack';
import ProductsStack from './stacks/ProductsStack';
import AnalyticTopTabNavigator from './screens/AnalyticTopTabNavigator';
import Profile from '../../screens/Profile';
import ChangePassword from '../../screens/auth/ChangePassword';
import Coupon from '../../screens/storeFront/Coupon';
import Tax from '../../screens/storeFront/Tax';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.MAIN}
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes.MENU_STACK}
        component={MenuStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes.CUSTOMERS_TAB}
        component={CustomerStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes.SHIPPING_TAB}
        component={ShippingStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes.CASHFLOW_TAB}
        component={CashFlowStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes.ENGAGEMNT_TAB}
        component={EngagementStack}
        options={{headerShown: false}}
      />
      <Stack.Screen name={routes.COUPON} component={Coupon} />
      <Stack.Screen name={routes.TAX} component={Tax} />
      <Stack.Screen
        name={routes.PRODUCTS_STACK}
        component={ProductsStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes.ANALYTICS}
        component={AnalyticTopTabNavigator}
      />
      <Stack.Screen name={routes.PROFILE} component={Profile} />
      <Stack.Screen name={routes.CHANGE_PASSWORD} component={ChangePassword} />
    </Stack.Navigator>
  );
}
