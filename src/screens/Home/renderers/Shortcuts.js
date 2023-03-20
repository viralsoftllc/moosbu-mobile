import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';

export default function Shortcuts() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Shortcuts</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.shortcut}>
          <UseIcon
            type={'Ionicons'}
            name="ellipsis-vertical"
            style={styles.icon}
            color={COLORS.white}
          />
          <Image
            source={require('../../../assets/images/analytics.png')}
            resizeMode="contain"
          />
        </View>

        <View style={styles.shortcut}>
          <UseIcon
            type={'Ionicons'}
            name="ellipsis-vertical"
            style={styles.icon}
            color={COLORS.white}
          />
          <Image
            source={require('../../../assets/images/privy.png')}
            resizeMode="contain"
          />
        </View>

        <View style={styles.newShortcut}>
          <UseIcon type={'Feather'} name="plus" color={COLORS.textPrimary} />
          <Text style={styles.shortcutText}>Add shortcut</Text>
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
  icon: {
    position: 'absolute',
    top: SIZES.base / 2,
    right: SIZES.base / 3,
  },
  newShortcut: {
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(88),
    backgroundColor: COLORS.textGray,
    borderRadius: SIZES.radius / 2,
    width: verticalScale(103),
  },
  shortcut: {
    height: verticalScale(88),
    width: verticalScale(103),
    backgroundColor: COLORS.textPrimary,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius / 2,
    padding: SIZES.base,
    marginRight: SIZES.base,
  },
  shortcutText: {
    color: COLORS.textPrimary,
    fontWeight: '200',
  },
});
