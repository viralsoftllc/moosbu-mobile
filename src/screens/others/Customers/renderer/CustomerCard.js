import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import ImageIcon from '../../../../shared/components/ImageIcon';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function CustomerCard({onPress, customer}) {
  return (
    <View style={[styles.container, styles.flex]}>
      <ImageIcon />

      <View style={[styles.flex, styles.details]}>
        <View>
          <Text style={styles.name}>{customer?.name}</Text>
          <Text style={styles.email}>{customer?.email}</Text>
          <Text style={styles.phone}>{customer?.phone}</Text>
        </View>

        <Pressable style={styles.iconview} onPress={onPress}>
          <UseIcon name="right" type={'AntDesign'} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.tabBg,
    borderRadius: SIZES.radius,
    paddingRight: SIZES.base,
    marginBottom: SIZES.base,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    color: COLORS.textPrimary,
    marginTop: SIZES.base,
  },
  email: {
    color: COLORS.grayText,
    ...FONTS.medium,
    marginBottom: SIZES.base / 2,
  },
  phone: {
    color: COLORS.credit,
    marginBottom: SIZES.base,
  },
  iconview: {
    height: '100%',
    paddingVertical: SIZES.base,
    paddingLeft: SIZES.base,
  },
});
