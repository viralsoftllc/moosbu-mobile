import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function SettingsRow({onPress}) {
  return (
    <View style={styles.container}>
      <UseIcon type={'Ionicons'} name="swap-vertical" color={COLORS.primary} />

      <Text style={styles.text}>SMS Sender ID</Text>

      <Pressable style={styles.arrowIcon} onPress={onPress}>
        <UseIcon type={'AntDesign'} name="right" color={COLORS.textPrimary} />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.base * 1.5,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius / 2,
  },
  text: {
    flex: 1,
    marginHorizontal: SIZES.base * 1.5,
    color: COLORS.textPrimary,
  },
  arrowIcon: {
    paddingVertical: SIZES.base * 2,
    paddingLeft: SIZES.base,
  },
});
