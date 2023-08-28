import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import routes from '../../../shared/constants/routes';
import UseIcon from '../../../shared/utils/UseIcon';
import MenuCard from '../../Menu/renderers/MenuCard';

const shortcuts = [
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
    route: routes.M_BOT_TAB,
  },
  {
    title: 'Shipping',
    icon: (
      <UseIcon type={'Feather'} name="truck" size={14} color={COLORS.black} />
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
    route: routes.CUSTOMERS,
  },
];

export default function Shortcuts() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Shortcuts</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.menus}>
          {shortcuts.map((nav, index) => (
            <MenuCard key={index} nav={nav} style={styles.menuCard} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.base * 1.5,
  },
  sectionTitle: {
    ...FONTS.h5,
    color: COLORS.textPrimary,
    marginBottom: SIZES.base * 1.2,
  },
  menus: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  menuCard: {
    backgroundColor: COLORS.tabBg,
  },
});
