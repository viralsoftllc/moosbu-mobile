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
import Logout from '../../screens/auth/Logout';
import Automation from '../../screens/marketingSuite/Automation';
import MBot from '../../screens/marketingSuite/MBot';
import BussinessRegistration from '../../screens/scaleByMoosbu/BusinessRegistration';
import Integration from '../../screens/others/Integration';
import Support from '../../screens/others/Support';
import StoreSettings from '../../screens/others/StoreSettings';
import MarketPlace from '../../screens/marketingSuite/MarketPlace';

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
      <Stack.Screen
        name={routes.LOGOUT}
        component={Logout}
        options={{headerShown: false}}
      />

      <Stack.Screen name={routes.AUTOMATION} component={Automation} />

      <Stack.Screen name={routes.M_BOT} component={MBot} />

      <Stack.Screen name={routes.MARKET_PLACE} component={MarketPlace} />

      <Stack.Screen name={routes.INTEGRATION} component={Integration} />
      <Stack.Screen name={routes.SUPPORT} component={Support} />
      <Stack.Screen name={routes.STORE_SETTINGS} component={StoreSettings} />

      <Stack.Screen
        name={routes.BUSINESS_REGISTRATION}
        component={BussinessRegistration}
      />
    </Stack.Navigator>
  );
}
