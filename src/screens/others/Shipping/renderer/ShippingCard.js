import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';

const ShippingCard = forwardRef(
  ({handleEditItem, handleDeleteItem, shipping}, ref) => {
    const [showCta, setShowCta] = useState(false);

    function toggleCtaView() {
      setShowCta(!showCta);
    }

    function closeCtaView() {
      if (showCta) {
        setShowCta(false);
      }
    }

    useImperativeHandle(ref, () => ({
      closeCtaView,
    }));

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
              <Text style={styles.name}>{shipping?.name || ''}</Text>
              {shipping?.location_id ? (
                <Text style={styles.address}>
                  {shipping?.location_id || ''}
                </Text>
              ) : null}
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
                <Pressable style={styles.cta} onPress={handleEditItem}>
                  <Text style={styles.ctaText}>Edit</Text>
                </Pressable>

                <Pressable style={styles.cta} onPress={handleDeleteItem}>
                  <Text style={[styles.ctaText, styles.deleteCta]}>Delete</Text>
                </Pressable>
              </View>
            ) : null}
          </View>

          <Text
            style={[
              styles.price,
              {
                color:
                  shipping?.price > 0 ? COLORS.textSecondary : COLORS.pending,
              },
            ]}>
            {Number(shipping?.price) > 0 ? `₦ ${shipping?.price}` : ''}
          </Text>

          <View style={[styles.flex, styles.datetime]}>
            {shipping?.time ? (
              <Text style={styles.contact}>{shipping?.time || ''}</Text>
            ) : null}

            {shipping?.date ? (
              <Text style={styles.contact}>{shipping?.date || ''}</Text>
            ) : null}
          </View>
        </View>
      </Pressable>
    );
  },
);

export default ShippingCard;
const styles = StyleSheet.create({
  address: {
    color: COLORS.grayText,
    ...FONTS.medium,
    fontWeight: '300',
    marginTop: SIZES.base / 3,
  },
  container: {
    backgroundColor: COLORS.tabBg,
    marginBottom: SIZES.base * 2,
    borderRadius: SIZES.radius,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.base,
  },
  contact: {
    color: COLORS.grayText,
    ...FONTS.medium,
    marginVertical: SIZES.base,
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
    ...FONTS.medium,
    fontFamily: 'Lato-Bold',
  },
  nameWrapper: {
    position: 'relative',
    marginBottom: SIZES.base,
  },
  ctaText: {
    ...FONTS.medium,
    paddingVertical: SIZES.base / 2,
    color: COLORS.textPrimary,
    paddingHorizontal: SIZES.base,
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
    // textAlign: 'right',
    color: COLORS.pending,
    ...FONTS.medium,
  },
  datetime: {
    width: '80%',
  },
});
