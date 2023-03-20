import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../assets/themes';
import UseIcon from '../utils/UseIcon';

export default function ScreenHeader({title, subtitle}) {
  const {goBack} = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable style={styles.iconWrapper} onPress={goBack}>
        <UseIcon
          type={'MaterialIcons'}
          name="arrow-back"
          color={COLORS.textPrimary}
        />
      </Pressable>

      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingBottom: SIZES.base,
    paddingTop: Platform.OS === 'ios' ? SIZES.base * 5 : SIZES.base,
    backgroundColor: COLORS.white,
  },
  iconWrapper: {
    alignSelf: 'flex-start',
    height: verticalScale(30),
    paddingRight: SIZES.base,
  },
  title: {
    color: COLORS.textPrimary,
    ...FONTS.h5,
  },
  subtitle: {
    ...FONTS.tiny,
    color: COLORS.grayText,
    marginTop: SIZES.base / 2,
    fontWeight: '300',
  },
});
