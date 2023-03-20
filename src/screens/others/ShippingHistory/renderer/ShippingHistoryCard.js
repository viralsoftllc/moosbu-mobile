import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function ShippingHistoryCard({
  title,
  handleViewItem,
  date,
  address,
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
    <Pressable style={styles.container} onPress={closeCtaView}>
      <View style={styles.iconView}>
        <UseIcon
          name="truck-outline"
          type={'MaterialCommunityIcons'}
          color={'rgb(118, 163, 224)'}
        />
      </View>

      <View style={styles.details}>
        <View style={[styles.flex, styles.nameWrapper]}>
          <View>
            <Text style={styles.name}>{title}</Text>
            <Text style={styles.address}>{address}</Text>
          </View>

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
              <Pressable style={styles.cta} onPress={handleViewItem}>
                <Text style={styles.ctaText}>View</Text>
              </Pressable>

              <Pressable style={styles.cta} onPress={handleShareItem}>
                <Text style={[styles.ctaText]}>Share details</Text>
              </Pressable>
            </View>
          ) : null}
        </View>

        <Text style={styles.contact}>{date}</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  address: {
    color: COLORS.grayText,
    ...FONTS.medium,
    fontWeight: '300',
    marginVertical: SIZES.base / 2,
  },
  container: {
    backgroundColor: COLORS.tabBg,
    marginBottom: SIZES.base,
    borderRadius: SIZES.radius,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contact: {
    color: COLORS.grayText,
    ...FONTS.medium,
    marginBottom: SIZES.base / 2,
  },
  details: {
    flex: 1,
    paddingRight: SIZES.base,
    paddingVertical: SIZES.base,
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
  },
  nameWrapper: {
    position: 'relative',
  },
  ctaText: {
    ...FONTS.medium,
    paddingVertical: SIZES.base / 2,
    color: COLORS.textPrimary,
    paddingHorizontal: SIZES.base,
  },
  ctaView: {
    padding: SIZES.base,
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
  iconView: {
    borderRadius: 100,
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    marginHorizontal: SIZES.base,
    width: verticalScale(48),
    height: verticalScale(48),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    textAlign: 'right',
    color: COLORS.pending,
  },
  datetime: {
    width: '80%',
  },
});
