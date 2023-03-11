import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {verticalScale} from 'react-native-size-matters';

import Home from '../../../screens/Home';
import routes from '../../../shared/constants/routes';
import Reward from '../../../screens/Reward';
import CustomTabBarButton from './CustomTabBarButton';
import {COLORS, SIZES} from '../../../assets/themes';
import MenuTabBarButton from './MenuTabBarButton';
import Menu from '../../../screens/Menu';
import WalletStack from '../stacks/WalletStack';
import MoreStack from '../stacks/MoreStack';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      //   tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: COLORS.primary,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor:
          route.name !== routes.MENU ? COLORS.secondary : COLORS.primary,
        tabBarIcon: ({color, size, focused}) => {
          let iconName;

          if (route.name === routes.HOME) {
            iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
          } else if (route.name === routes.WALLET_STACK) {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === routes.MENU) {
            iconName = focused ? 'close' : 'ios-apps-outline';
          } else if (route.name === routes.REWARD) {
            iconName = focused ? 'ios-gift' : 'ios-gift-outline';
          } else if (route.name === routes.MORE_STACK) {
            iconName = focused ? 'grid' : 'grid-outline';
          }

          return <Icon name={iconName} size={SIZES.base * 1.5} color={color} />;
        },
      })}>
      <Tab.Screen
        name={routes.HOME}
        component={Home}
        options={{
          tabBarButton: props => (
            <CustomTabBarButton {...props} route={routes.HOME} label="Home" />
          ),
        }}
      />

      <Tab.Screen
        name={routes.WALLET_STACK}
        component={WalletStack}
        options={{
          tabBarButton: props => (
            <CustomTabBarButton
              {...props}
              route={routes.WALLET_STACK}
              label="Wallet"
            />
          ),
        }}
      />

      <Tab.Screen
        name={routes.MENU}
        component={Menu}
        options={{
          tabBarButton: props => (
            <MenuTabBarButton {...props} route={routes.MENU} />
          ),
        }}
      />

      <Tab.Screen
        name={routes.REWARD}
        component={Reward}
        options={{
          tabBarButton: props => (
            <CustomTabBarButton
              {...props}
              route={routes.REWARD}
              label="Reward"
            />
          ),
        }}
      />

      <Tab.Screen
        name={routes.MORE_STACK}
        component={MoreStack}
        options={{
          tabBarButton: props => (
            <CustomTabBarButton
              {...props}
              route={routes.MORE_STACK}
              label="More"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: COLORS.tabBg,
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? verticalScale(70) : verticalScale(60),
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: 0,
    paddingTop: SIZES.base,
  },
});
