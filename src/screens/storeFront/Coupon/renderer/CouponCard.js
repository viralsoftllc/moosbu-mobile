import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function CouponCard({
  coupon,
  handleEditItem,
  icon,
  setShowShareModal,
  handleDeleteItem,
  handleShareItem,
}) {
  const [showCta, setShowCta] = useState(false);

  function toggleCtaView() {
    setShowCta(!showCta);
  }

  function closeCtaView() {
    if (showCta) {
      setShowCta(false);
    }
  }

  return (
    <Pressable onPress={closeCtaView} style={styles.container}>
      <View style={[styles.flex, styles.nameWrapper]}>
        {icon}

        <Text style={styles.name}>{coupon?.code}</Text>

        <Pressable onPress={toggleCtaView}>
          <UseIcon
            type={'Ionicons'}
            name="ellipsis-vertical"
            style={styles.icon}
            color={COLORS.textPrimary}
          />
        </Pressable>

        {showCta ? (
          <View style={styles.ctaView}>
            <Pressable style={styles.cta} onPress={handleEditItem}>
              <Text style={styles.ctaText}>Edit</Text>
            </Pressable>

            <Pressable style={styles.cta} onPress={handleDeleteItem}>
              <Text style={[styles.ctaText, styles.deleteCta]}>
                Delete coupon
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <Text style={styles.subtitle}>{coupon?.name}</Text>

      <View style={[styles.flex]}>
        <View style={styles.stats}>
          <Text style={styles.statsLabel}>Times used</Text>
          <Text style={styles.statsValue}>{coupon?.used}</Text>
        </View>

        <View style={styles.stats}>
          <Text style={styles.statsLabel}>Limit</Text>
          <Text style={styles.statsValue}>{coupon?.limit}</Text>
        </View>

        <Pressable
          onPress={() => handleShareItem(coupon)}
          style={[styles.flex, styles.shareIcon]}>
          <UseIcon
            type={'Ionicons'}
            name="share-social-outline"
            style={styles.icon}
            color={COLORS.textPrimary}
          />

          <Text style={styles.shareText}>Share coupon</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.borderGray,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base * 1.5,
    backgroundColor: COLORS.tabBg,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
  },
  ctaText: {
    ...FONTS.medium,
    paddingVertical: SIZES.base / 2,
    color: COLORS.textPrimary,
  },
  ctaView: {
    paddingHorizontal: SIZES.base,
    position: 'absolute',
    right: 0,
    top: SIZES.base * 2,
    zIndex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius / 2,
  },
  deleteCta: {
    color: COLORS.debit,
  },
  details: {
    flex: 1,
    marginLeft: SIZES.base,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  name: {
    color: COLORS.textPrimary,
    maxWidth: verticalScale(240),
    flex: 1,
    marginLeft: SIZES.base / 2,
  },
  nameWrapper: {
    position: 'relative',
  },
  subtitle: {
    marginTop: SIZES.base / 5,
    marginBottom: SIZES.base * 2,
    color: COLORS.grayText,
    ...FONTS.medium,
  },
  shareText: {
    color: COLORS.grayText,
    ...FONTS.tiny,
    fontWeight: '200',
    marginLeft: SIZES.base,
  },
  shareIcon: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 2,
    borderRadius: SIZES.radius / 2,
    zIndex: -1,
  },
  statsLabel: {
    color: COLORS.grayText,
    ...FONTS.medium,
  },
  statsValue: {
    color: COLORS.textPrimary,
  },
});
