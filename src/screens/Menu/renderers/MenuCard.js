import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';

export default function MenuCard({nav, style}) {
  const {navigate} = useNavigation();

  function handleNav() {
    if (!nav?.route) {
      return;
    }

    if (nav?.nestedRoute) {
      return navigate(nav?.route, {
        screen: nav?.nestedRoute,
      });
    }

    return navigate(nav?.route);
    // return navigate(routes.MENU_STACK, {screen: nav?.route});
  }

  return (
    <Pressable style={[styles.container, style]} onPress={handleNav}>
      <View style={[styles.iconView, {backgroundColor: nav?.iconBackground}]}>
        {nav?.icon}
      </View>
      <Text style={styles.title}>{nav?.title}</Text>
      {nav?.subtitle ? <Text style={styles.title}>{nav?.subtitle}</Text> : null}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    height: verticalScale(70),
    width: verticalScale(70),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.base / 4,
    marginVertical: SIZES.base / 1.5,
    paddingVertical: SIZES.base,
  },
  iconView: {
    height: verticalScale(24),
    width: verticalScale(24),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius / 2,
    marginBottom: SIZES.base,
  },
  title: {
    ...FONTS.tiny,
    textAlign: 'center',
    fontWeight: '400',
  },
});
