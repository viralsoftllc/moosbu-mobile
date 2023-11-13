import React, {useState, useRef, useEffect} from 'react';
import {PanResponder, Alert, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './components/BottomTabNavigator';
import routes from '../../shared/constants/routes';
import MenuStack from './stacks/MenuStack';
import ShippingStack from './stacks/ShippingStack';
// import CashFlowStack from './stacks/CashFlowStack';
import EngagementStack from './stacks/EngagementStack';
import ProductsStack from './stacks/ProductsStack';
// import AnalyticTopTabNavigator from './screens/AnalyticTopTabNavigator';
import Profile from '../../screens/Profile';
import ChangePassword from '../../screens/auth/ChangePassword';
import Coupon from '../../screens/storeFront/Coupon';
import Tax from '../../screens/storeFront/Tax';
import Logout from '../../screens/auth/Logout';
import Automation from '../../screens/marketingSuite/Automation';
import BussinessRegistration from '../../screens/scaleByMoosbu/BusinessRegistration';
import Integration from '../../screens/others/Integration';
import Support from '../../screens/others/Support';
import MarketPlace from '../../screens/marketingSuite/MarketPlace';
import ChoosePaymentMethod from '../../screens/Wallet/ChoosePaymentMethod';
import SendFunds from '../../screens/Wallet/SendFunds';
import WalletSettings from '../../screens/Wallet/WalletSettings';
import Withdraw from '../../screens/Wallet/Withdraw';
import BankTransfer from '../../screens/Wallet/BankTransfer';
import ConfirmTransferDetails from '../../screens/Wallet/ConfirmTransferDetails';
import EnterPin from '../../screens/Wallet/EnterPin';
import BusinessRegistrationStack from './stacks/BusinessRegistrationStack';
import StoreSettingsStack from './stacks/StoreSettingsStack';
import PaymentProviderTopTabNavigator from './screens/PaymentProviderTopTabNavigator';
import RewardInfo from '../../screens/Reward/RewardInfo.js';
import SubscriptionPayment from '../../screens/SubscriptionPayment';
import Notifications from '../../screens/Notifications';
import ShippingHistoryDetails from '../../screens/others/ShippingHistoryDetails';
// import MBotTopTabNavigator from './screens/MBotTopTabNavigator';
import MBot from '../../screens/marketingSuite/MBot';
import OrderTopTabNavigator from './screens/OrderTopTabNavigator';
import OrderDetails from '../../screens/storeFront/orders/OrderDetails';
import CustomerTopTabNavigator from './screens/CustomerTopTabNavigator';
import InbuiltLogistics from '../../screens/others/Integration/logisticsProviders/InbuiltLogistics';
// import Kyc from '../../screens/others/StoreSettings/Kyc';
// import Selfie from '../../screens/others/StoreSettings/Kyc/Selfie';
import JoinCommunity from '../../screens/others/JoinCommunity';
import MediaResources from '../../screens/others/MediaResources';
import PayoutSettings from '../../screens/Wallet/WalletSettings/PayoutSettings';
import CreateTransactionPin from '../../screens/Wallet/WalletSettings/CreateTransactionPin';
import Plans from '../../screens/plans';
import Analytics from '../../screens/storeFront/Analytics';
import CashFlowComingSoon from '../../screens/scaleByMoosbu/CashFlow';

import Finances from '../../screens/finances';
import RegisterWalletOne from '../../screens/finances/registerWalletOne';
import RegisterWalletTwo from '../../screens/finances/registerWalletTwo';

import SuccessfulRegistration from '../../screens/finances/SuccessfulRegistration/SuccessfulRegistration';

import TransferSuccessful from '../../screens/Wallet/TransferSuccessful/TransferSuccessful';
import TransferDeclined from '../../screens/Wallet/TransferDeclined/TransferDeclined';
import TransactionDetails from '../../screens/Wallet/TransactionDetails/TransactionDetails';
import TransactionPending from '../../screens/Wallet/TransactionPending/TransactionPending';
import TokenScreen from '../../screens/TokenScreen';
import TokenSuccess from '../../screens/TokenSuccess';
import BasicDetails from '../../screens/Wallet/businessWallet/BasicDetails';
import Address from '../../screens/Wallet/businessWallet/Address';
import OfficerDetails from '../../screens/Wallet/businessWallet/OfficerDetails';
import VerifyEmail from '../../screens/auth/VerifyEmail';

import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../../redux/slices/auth/slice';
import Customers from '../../screens/others/Customers';
import Reward from '../../screens/Reward';
import {selectUser} from '../../redux/slices/user/selectors';

const Stack = createStackNavigator();

export default function MainNavigator() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const timerId = React.useRef(false);

  const resetInactivityTimeout = () => {
    clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      console.log('Inactive');
      Alert.alert('Logged out due to inactivity');
      dispatch(setToken(null));
    }, 180000);
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        resetInactivityTimeout();
      },
    }),
  ).current;

  // React.useEffect(() => {
  //   resetInactivityTimeout();
  // }, []);

  return (
    <View
      style={{flex: 1}}
      //  {...panResponder.pandHandlers}
    >
      <Stack.Navigator>
        <Stack.Screen
          name={routes.MAIN}
          component={user.email_verified_at ? BottomTabNavigator : VerifyEmail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.MENU_STACK}
          component={MenuStack}
          options={{headerShown: false}}
        />
        <Stack.Screen name={routes.CUSTOMERS} component={Customers} />
        <Stack.Screen
          name={routes.SHIPPING_TAB}
          component={ShippingStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.CASHFLOW_TAB}
          component={CashFlowComingSoon}
          // component={CashFlowStack}
          // options={{headerShown: false}}
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
        <Stack.Screen name={routes.ANALYTICS} component={Analytics} />
        <Stack.Screen name={routes.PROFILE} component={Profile} />
        <Stack.Screen
          name={routes.CHANGE_PASSWORD}
          component={ChangePassword}
        />
        <Stack.Screen
          name={routes.LOGOUT}
          component={Logout}
          options={{headerShown: false}}
        />
        <Stack.Screen name={routes.AUTOMATION} component={Automation} />
        <Stack.Screen
          // options={{headerShown: false}}
          name={routes.M_BOT}
          component={MBot}
        />
        {/* <Stack.Screen name={routes.M_BOT_TAB} component={MBotTopTabNavigator} /> */}
        <Stack.Screen name={routes.MARKET_PLACE} component={MarketPlace} />
        <Stack.Screen name={routes.INTEGRATION} component={Integration} />
        <Stack.Screen name={routes.SUPPORT} component={Support} />
        <Stack.Screen
          name={routes.BUSINESS_REGISTRATION}
          component={BussinessRegistration}
        />
        <Stack.Screen
          name={routes.CHOOSE_PAYMENT_METHOD}
          component={ChoosePaymentMethod}
        />
        <Stack.Screen name={routes.SEND_FUNDS} component={SendFunds} />
        <Stack.Screen
          name={routes.PAYOUT_SETTINGS}
          component={PayoutSettings}
        />
        <Stack.Screen
          name={routes.WALLET_SETTINGS}
          component={WalletSettings}
        />
        <Stack.Screen
          name={routes.CREATE_TRANSACTION_PIN}
          component={CreateTransactionPin}
        />
        <Stack.Screen name={routes.WITHDRAW} component={Withdraw} />
        <Stack.Screen name={routes.BANK_TRANSFER} component={BankTransfer} />
        <Stack.Screen
          name={routes.CONFIRM_TRANSFER_DETAILS}
          component={ConfirmTransferDetails}
        />
        <Stack.Screen name={routes.ENTER_PIN} component={EnterPin} />
        <Stack.Screen
          name={routes.BUSINESS_REGISTRATION_STACK}
          component={BusinessRegistrationStack}
          options={{
            headerShown: false,
          }}
        />
        {/* Successful screen */}
        <Stack.Screen
          name={'TransferSuccessful'}
          component={TransferSuccessful}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'TransferDeclined'}
          component={TransferDeclined}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TransactionPending"
          component={TransactionPending}
          options={{headerShown: false}}
        />
        {/* Transaction Details */}
        <Stack.Screen
          name={'TransactionDetails'}
          component={TransactionDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={routes.STORE_SETTINGS_STACK}
          component={StoreSettingsStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={routes.PAYMENT_PROVIDER}
          component={PaymentProviderTopTabNavigator}
        />
        <Stack.Screen
          name={routes.LOGISTICS_PROVIDER}
          // component={LogisticsProviderTopTabNavigator}
          component={InbuiltLogistics}
        />
        <Stack.Screen name={routes.REWARD_INFO} component={RewardInfo} />
        <Stack.Screen
          name={routes.PAY_SUBSCRIPTION}
          component={SubscriptionPayment}
        />
        <Stack.Screen name={routes.NOTIFICATIONS} component={Notifications} />
        <Stack.Screen
          name={routes.SHIPPING_DETAILS}
          component={ShippingHistoryDetails}
        />
        <Stack.Screen name={routes.PLAN} component={Plans} />
        {/* <Stack.Screen name={routes.PLAN} component={PlanTopTabNavigator} /> */}
        <Stack.Screen name={routes.ORDERS} component={OrderTopTabNavigator} />
        <Stack.Screen name={routes.ORDER_DETAILS} component={OrderDetails} />
        {/* <Stack.Screen name={routes.KYC} component={Kyc} /> */}
        {/* <Stack.Screen name={routes.SELFIE} component={Selfie} /> */}
        <Stack.Screen name={routes.JOIN_COMMUNITY} component={JoinCommunity} />
        <Stack.Screen name={routes.CONTACT_SUPPORT} component={Support} />
        <Stack.Screen
          name={routes.MEDIA_RESOURCES}
          component={MediaResources}
        />
        <Stack.Screen
          name="Finances"
          component={Finances}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterWalletOne"
          component={RegisterWalletOne}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterWalletTwo"
          component={RegisterWalletTwo}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SuccessfulRegistration"
          component={SuccessfulRegistration}
          options={{headerShown: false}}
        />
        <Stack.Screen name="TokenScreen" component={TokenScreen} />
        <Stack.Screen
          name="TokenSuccess"
          component={TokenSuccess}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="BasicDetails"
          component={BasicDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OfficerDetails"
          component={OfficerDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name={routes.REWARD} component={Reward} />
        {/* <Stack.Screen
          name={routes.REWARD_INFO}
          component={RewardInfo}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </View>
  );
}
