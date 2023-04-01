import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import routes from '../../../../shared/constants/routes';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function OrderCard({order}) {
  const {navigate} = useNavigation();

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigate(routes.ORDER_DETAILS, {order})}>
      <View style={[styles.flex, styles.top]}>
        <View style={[styles.itemIcon, styles.iconView]}>
          <UseIcon
            name="notebook-edit-outline"
            type={'MaterialCommunityIcons'}
            color={COLORS.borderGray}
          />
        </View>

        <View style={styles.details}>
          <View style={[styles.flex]}>
            <Text style={styles.name}>{order?.name || ''}</Text>

            <Text style={styles.price}>₦{order?.price || 0}</Text>

            <Pressable style={styles.ctaIcon}>
              <UseIcon
                type={'Ionicons'}
                name="ellipsis-vertical"
                style={styles.icon}
                color={COLORS.textPrimary}
              />
            </Pressable>
          </View>

          <Text style={styles.date}>
            {new Date(order?.created_at).toDateString() || ''}
          </Text>
        </View>
      </View>

      {/* Address */}
      <View style={[styles.flex, styles.top]}>
        <View style={[styles.iconView]}>
          <UseIcon
            name="location-outline"
            type={'Ionicons'}
            color={'#0247A6'}
          />
        </View>

        <View style={styles.details}>
          <Text style={styles.deliveryLabel}>Delivery Address</Text>
          <Text style={styles.deliveryAddress}>345 Lekki Penisula, Lagos.</Text>
        </View>
      </View>

      {/* Status */}
      <View style={[styles.flex, styles.bottomView]}>
        <View style={[styles.iconView]}>
          {order?.status?.toLowerCase() === 'delivered' ? (
            <UseIcon
              name="check-circle"
              type={'MaterialCommunityIcons'}
              color={COLORS.credit}
            />
          ) : (
            <UseIcon
              name="clock-time-nine"
              type={'MaterialCommunityIcons'}
              color={COLORS.pending}
            />
          )}
        </View>

        <View style={styles.details}>
          <Text style={styles.status}>
            {order?.status?.toLowerCase() === 'delivered'
              ? 'Completed'
              : 'Pending'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: SIZES.base,
    // paddingLeft: SIZES.base,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base * 1.5,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    flex: 1,
  },
  iconView: {
    borderRadius: SIZES.radius / 2,
    padding: SIZES.base / 2,
    marginRight: SIZES.base,
  },
  itemIcon: {
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  name: {
    color: COLORS.textPrimary,
    ...FONTS.h6,
    flex: 1,
  },
  price: {
    color: COLORS.textPrimary,
    ...FONTS.medium,
    fontWeight: 'bold',
  },
  ctaIcon: {
    padding: SIZES.base,
  },
  date: {
    color: COLORS.grayText,
    ...FONTS.medium,
  },
  top: {
    borderBottomWidth: 1,
    borderColor: COLORS.borderGray,
    paddingVertical: SIZES.base / 2,
    marginHorizontal: SIZES.base,
  },
  bottomView: {
    borderBottomWidth: 0,
    paddingVertical: SIZES.base / 2,
    marginHorizontal: SIZES.base,
  },
  deliveryLabel: {
    color: COLORS.grayText,
    ...FONTS.medium,
  },
  deliveryAddress: {
    color: COLORS.textPrimary,
    marginTop: SIZES.base / 2,
  },
  status: {
    color: COLORS.textPrimary,
  },
});
