import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
import ImageIcon from '../../../../../shared/components/ImageIcon';

export default function PaymentCard({
  isActive,
  imageIcon,
  title,
  description,
  onPress,
}) {
  return (
    <Pressable style={[styles.card, styles.leftCard]} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Text
          style={[
            styles.status,
            {color: isActive ? COLORS.credit : COLORS.grayText},
          ]}>
          {isActive ? 'Active' : 'Deactivated'}
        </Text>
      </View>

      <View style={styles.cardBody}>
        <ImageIcon style={styles.imageIcon} imageUrl={imageIcon} />
        <Text style={styles.cardTitle}>{title}</Text>

        <Text style={styles.cardSubtitle}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radius,
    borderColor: COLORS.borderGray,
    width: '45%',
    flex: 1,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderColor: COLORS.borderGray,
    paddingBottom: SIZES.base,
    alignItems: 'flex-end',
    paddingHorizontal: SIZES.base,
  },
  cardBody: {
    paddingHorizontal: SIZES.base / 1.5,
  },
  imageIcon: {
    margin: 0,
    marginTop: verticalScale(-17),
  },
  cardTitle: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    marginTop: SIZES.base / 2,
  },
  cardSubtitle: {
    ...FONTS.medium,
    color: COLORS.textPrimary,
    fontWeight: '100',
    marginVertical: SIZES.base,
  },
  leftCard: {
    marginRight: SIZES.base / 2,
  },
  rightCard: {
    marginLeft: SIZES.base / 2,
  },
  status: {
    ...FONTS.medium,
    fontWeight: '600',
  },
});
