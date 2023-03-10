import {useNavigation} from '@react-navigation/native';
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
        title: 'Category',
        icon: (
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="view-dashboard-outline"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: '#F5F1DA',
        route: routes.PRODUCTS_STACK,
        nestedRoute: routes.CATEGORY,
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
        route: routes.BUSINESS_REGISTRATION,
      },
      {
        title: 'Cash Flow Advance',
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
  {
    title: 'Others',
    navs: [
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
        route: routes.CUSTOMERS_TAB,
      },
      {
        title: 'Integration',
        icon: (
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="integrated-circuit-chip"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: 'rgba(255, 162, 29, 0.1)',
        route: routes.INTEGRATION,
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
        title: 'Store Settings',
        icon: (
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="cog-outline"
            size={14}
            color={COLORS.black}
          />
        ),
        iconBackground: 'rgba(202, 45, 49, 0.2)',
        route: routes.STORE_SETTINGS,
      },
    ],
  },
];

export default function Menu() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      headerShown: false,
    });
    return () => {};
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuContainer}>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          showsHorizontalScrollIndicator={false}>
          {menus.map((menu, i) => (
            <View style={styles.menuWrapper} key={i}>
              <Text style={styles.menuTitle}>{menu.title}</Text>

              <View style={styles.menus}>
                {menu.navs.map((nav, index) => (
                  <MenuCard key={index} nav={nav} />
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
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: COLORS.tabBg,
    // height: '85%',
    // borderTopRightRadius: SIZES.radius * 4,
    // borderTopLeftRadius: SIZES.radius * 4,
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
  },
});
