import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function TaxCard({
  tax,
  title,
  subtitle,
  amount,
  handleEditItem,
  icon,
  handleDeleteItem,
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

        <Text style={styles.name}>{tax?.name}</Text>

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
            {/* <Pressable style={styles.cta}>
              <Text style={styles.ctaText}>Move to top</Text>
            </Pressable> */}
            <Pressable style={styles.cta} onPress={handleDeleteItem}>
              <Text style={[styles.ctaText, styles.deleteCta]}>
                Delete coupon
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <Text style={styles.subtitle}>{tax?.description}</Text>

      <View>
        <Text style={styles.statsLabel}>Rate</Text>
        <Text style={styles.statsValue}>{tax?.rate}%</Text>
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
    flex: 1,
    marginLeft: SIZES.base / 2,
    maxWidth: verticalScale(240),
  },
  nameWrapper: {
    position: 'relative',
  },
  subtitle: {
    marginTop: SIZES.base / 5,
    marginBottom: SIZES.base,
    color: COLORS.grayText,
    ...FONTS.medium,
  },
  statsLabel: {
    color: COLORS.grayText,
    ...FONTS.medium,
  },
  statsValue: {
    color: COLORS.textPrimary,
  },
});
