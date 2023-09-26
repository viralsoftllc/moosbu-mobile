import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../assets/themes';
import routes from '../../shared/constants/routes';
import UseIcon from '../../shared/utils/UseIcon';
import MenuCard from './renderers/MenuCard';

const menus = [
  {
    title: 'Store Front',
    navs: [
      {
        title: 'Analytics',
        icon: (
          <UseIcon
            type={'Feather'}
            name="bar-chart-2"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: COLORS.lightSecondaryBackground,
        route: routes.ANALYTICS,
      },
      {
        title: 'Products',
        icon: (
          <UseIcon type={'Feather'} name="box" size={14} color={COLORS.black} />
        ),
        iconBackground: 'rgba(6, 223, 119, 0.1)',
        route: routes.PRODUCTS_STACK,
        // nestedRoute: routes.PRODUCTS,
      },
      {
        title: 'Orders',
        icon: (
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="shopping-outline"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: '#F5F1DA',
        route: routes.ORDERS,
      },
      {
        title: 'Tax',
        icon: (
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="view-dashboard-outline"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: 'rgba(106, 70, 47, 0.2)',
        route: routes.TAX,
      },
      {
        title: 'Coupon',
        icon: (
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="credit-card-minus"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: 'rgba(206, 206, 206, 0.4)',
        route: routes.COUPON,
      },
      {
        title: 'Shipping',
        icon: (
          <UseIcon
            type={'Feather'}
            name="truck"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: '#CCDAED',
        route: routes.SHIPPING_TAB,
      },
    ],
  },
  {
    title: 'Marketing Suite',
    navs: [
      {
        title: 'Engagement',
        icon: (
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="message-badge-outline"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: 'rgba(202, 45, 49, 0.2)',
        route: routes.ENGAGEMNT_TAB,
      },
      {
        title: 'Automation',
        icon: (
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="chart-timeline-variant"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: 'rgba(206, 206, 206, 0.4)',
        route: routes.AUTOMATION,
      },
      {
        title: 'mBot',
        icon: (
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="robot"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: '#F5F1DA',
        route: routes.M_BOT,
        // route: routes.M_BOT_TAB,
      },
      {
        title: 'Marketplace',
        icon: (
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="shopping-outline"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: '#E4F4F1',
        route: routes.MARKET_PLACE,
      },
    ],
  },
  {
    title: 'Scale by Moosbu',
    navs: [
      {
        title: 'Business Registration',
        icon: (
          <UseIcon
            type={'SimpleLineIcons'}
            name="briefcase"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: '#F5F1DA',
        route: routes.BUSINESS_REGISTRATION_STACK,
      },
      {
        title: 'Cash Flow',
        subtitle: 'Advance',
        icon: (
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="cash"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: '#CCDAED',
        route: routes.CASHFLOW_TAB,
      },
    ],
  },
  // {
  //   title: 'Integrations',
  //   navs: [
  //     {
  //       title: 'Payment',
  //       icon: (
  //         <UseIcon
  //           type={'MaterialCommunityIcons'}
  //           name="credit-card-outline"
  //           size={14}
  //           color={COLORS.black}
  //         />
  //       ),
  //       iconBackground: 'rgba(255, 162, 29, 0.1)',
  //       route: routes.PAYMENT_PROVIDER,
  //     },
  //     {
  //       title: 'Logistics',
  //       icon: (
  //         <UseIcon
  //           type={'MaterialCommunityIcons'}
  //           name="truck-outline"
  //           size={14}
  //           color={COLORS.black}
  //         />
  //       ),
  //       iconBackground: 'rgba(255, 162, 29, 0.1)',
  //       route: routes.LOGISTICS_PROVIDER,
  //     },
  //   ],
  // },
  {
    title: 'Others',
    navs: [
      {
        title: 'Customers',
        icon: (
          <UseIcon
            type={'MaterialIcons'}
            name="person-outline"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: 'rgba(189, 189, 189, 0.6)',
        route: routes.CUSTOMERS,
      },
      {
        title: 'Support',
        icon: (
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="face-agent"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: 'rgba(62, 201, 214, 0.2)',
        route: routes.SUPPORT,
      },
      {
        title: 'General Settings',
        icon: (
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="cog-outline"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: 'rgba(202, 45, 49, 0.2)',
        route: routes.STORE_SETTINGS_STACK,
      },
    ],
  },
];

export default function Menu() {
  const {setOptions, addListener, goBack} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      headerShown: false,
    });
    return () => {};
  }, [setOptions]);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = addListener('tabPress', e => {
        e.preventDefault();
        goBack();
      });

      return () => unsubscribe();
    }, [addListener, goBack]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuContainer}>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {menus.map((menu, i) => (
            <View style={styles.menuWrapper} key={i}>
              <Text style={styles.menuTitle}>{menu.title}</Text>

              <View style={styles.menus}>
                {menu.navs.map((nav, index) => (
                  <MenuCard key={index} nav={nav} style={styles.menuCard} />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: SIZES.base * 5,
    paddingTop: SIZES.base,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: COLORS.tabBg,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base,
  },
  menuWrapper: {
    marginBottom: SIZES.base * 3,
  },
  menuTitle: {
    ...FONTS.h5,
    color: COLORS.textPrimary,
    marginBottom: SIZES.base / 5,
  },
  menus: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // borderWidth: 1,
    // justifyContent: 'space-between',
  },
  menuCard: {
    width: '23%',
  },
});
