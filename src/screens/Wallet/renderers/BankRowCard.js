import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import UseIcon from '../../../shared/utils/UseIcon';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';

export default function BankRowCard({onPress, selectedItem, label}) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.iconView}>
        <UseIcon
          type="MaterialCommunityIcons"
          size={verticalScale(14)}
          name={'bank'}
          color={COLORS.black}
        />
      </View>

      <Text style={styles.text}>{label}</Text>

      {selectedItem === label ? (
        <UseIcon
          type="MaterialIcons"
          name={'check'}
          size={verticalScale(14)}
          color={selectedItem === label ? COLORS.credit : COLORS.grey}
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.base,
    // paddingLeft: SIZES.base / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.base * 2,
    borderBottomWidth: 1,
    paddingBottom: SIZES.base,
    borderColor: COLORS.borderGray,
  },
  text: {
    flex: 1,
    paddingHorizontal: SIZES.base,
    color: COLORS.black,
    ...FONTS.medium,
    fontWeight: 'bold',
  },
  iconView: {
    borderRadius: 50,
    height: verticalScale(35),
    width: verticalScale(35),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.tabBg,
    overflow: 'hidden',
  },
});
