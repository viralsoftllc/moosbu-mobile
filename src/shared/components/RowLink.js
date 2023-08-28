import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import UseIcon from '../utils/UseIcon';
import {COLORS, FONTS, SIZES} from '../../assets/themes';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

export default function RowLink({title, iconName, route, iconType}) {
  const {navigate} = useNavigation();

  function handleNavigation() {
    if (route) {
      navigate(route);
    }
  }

  return (
    <Pressable style={styles.container} onPress={handleNavigation}>
      <UseIcon
        name={iconName}
        type={iconType || 'MaterialIcons'}
        color={COLORS.primary}
        size={scale(17)}
      />

      <Text style={styles.title}>{title}</Text>

      <UseIcon
        name={'chevron-right'}
        type="MaterialIcons"
        color={COLORS.textPrimary}
        size={scale(17)}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius / 2,
    marginBottom: SIZES.base * 1.5,
    paddingVertical: SIZES.base * 1.2,
  },
  title: {
    flex: 1,
    marginHorizontal: SIZES.base * 2,
    ...FONTS.regular,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
});
