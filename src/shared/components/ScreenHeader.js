import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../assets/themes';
import UseIcon from '../utils/UseIcon';

export default function ScreenHeader({
  title,
  subtitle,
  onPress,
  style,
  iconColor,
}) {
  const {goBack} = useNavigation();

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.iconWrapper} onPress={onPress || goBack}>
        <UseIcon
          type={'MaterialIcons'}
          name="arrow-back"
          color={iconColor || COLORS.textPrimary}
        />
      </Pressable>

      <View style={styles.textView}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base,
    // paddingTop: Platform.OS === 'ios' ? 0 : SIZES.base,
    // paddingTop: SIZES.base,
    backgroundColor: COLORS.white,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    alignSelf: 'flex-start',
    height: verticalScale(30),
    width: verticalScale(30),
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius / 2,
  },
  title: {
    color: COLORS.label,
    ...FONTS.h5,
  },
  subtitle: {
    ...FONTS.tiny,
    color: COLORS.grayText,
    marginTop: SIZES.base / 5,
    fontWeight: '300',
  },
  textView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
