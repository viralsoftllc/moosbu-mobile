import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';

export default function LinkRow({title, iconName, route}) {
  const {navigate} = useNavigation();

  function handleNavigation() {
    if (route) {
      navigate(route);
    }
  }

  return (
    <View style={styles.container}>
      <UseIcon
        name={iconName}
        type="MaterialIcons"
        color={COLORS.primary}
        size={verticalScale(20)}
      />

      <Text style={styles.title}>{title}</Text>

      <Pressable style={styles.link} onPress={handleNavigation}>
        <UseIcon
          name={'chevron-right'}
          type="MaterialIcons"
          color={COLORS.textPrimary}
          size={verticalScale(20)}
        />
      </Pressable>
    </View>
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
  },
  title: {
    flex: 1,
    marginHorizontal: SIZES.base * 2,
    ...FONTS.regular,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  link: {
    paddingVertical: SIZES.base * 1.2,
    paddingLeft: SIZES.base,
  },
});
