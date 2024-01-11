import React from 'react';
import {Pressable, StyleSheet, Text, View, Linking} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import ImageIcon from '../../../../shared/components/ImageIcon';
import UseIcon from '../../../../shared/utils/UseIcon';
import {verticalScale} from 'react-native-size-matters';

export default function CustomerCard({onPress, customer}) {
  const call = phone => {
    Linking.openURL('tel:' + phone);
  };

  const mail = email => {
    Linking.openURL('mailto:' + email);
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.flex}>
        <ImageIcon size={verticalScale(35)} />

        <View style={[styles.details]}>
          <View style={styles.flex}>
            <Text style={styles.name}>{customer?.name}</Text>

            {/* <Pressable>
              <UseIcon
                type={'Ionicons'}
                name="ellipsis-vertical"
                style={styles.icon}
                color={COLORS.textPrimary}
              />
            </Pressable> */}
          </View>

          <View
            style={[
              styles.flex,
              styles.contact,
              {justifyContent: 'space-between'},
            ]}>
            <View style={[styles.flex]}>
              <View style={styles.smallIcon}>
                <UseIcon
                  name={'email-outline'}
                  type={'MaterialCommunityIcons'}
                  size={12}
                  color={COLORS.borderGray}
                />
              </View>
              <Pressable onPress={() => mail(customer?.email)}>
                <Text style={styles.email}>{customer?.email}</Text>
              </Pressable>
            </View>

            <View style={styles.flex}>
              <View style={styles.smallIcon}>
                <UseIcon
                  name={'whatsapp'}
                  type={'MaterialCommunityIcons'}
                  size={12}
                  color={COLORS.borderGray}
                />
              </View>

              <Pressable onPress={() => call(customer?.phone)}>
                <Text style={styles.phone}>{customer?.phone}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.flex, styles.orderDetailsView]}>
        <View style={styles.orderDetails}>
          <Text style={styles.label}>Total Order</Text>
          <Text style={styles.value}>0</Text>
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.label}>Complete Order</Text>
          <Text style={styles.value}>0</Text>
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.label}>Cancelled Order</Text>
          <Text style={styles.value}>0</Text>
        </View>
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
    paddingVertical: SIZES.base,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    display: 'flex',
  },
  name: {
    color: COLORS.textPrimary,
    flex: 1,
    ...FONTS.medium,
  },
  email: {
    color: COLORS.grayText,
    ...FONTS.tiny,

    marginRight: SIZES.base / 3,
  },
  phone: {
    color: COLORS.grayText,
    ...FONTS.tiny,
  },
  iconview: {
    height: '100%',
    paddingVertical: SIZES.base,
    paddingLeft: SIZES.base,
  },
  smallIcon: {
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    padding: SIZES.base / 3,
    borderRadius: 100,
    marginRight: SIZES.base / 3,
  },
  contact: {
    marginVertical: SIZES.base / 1.5,
  },
  orderDetailsView: {
    borderTopWidth: 1,
    borderColor: COLORS.borderGray,
  },
  orderDetails: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SIZES.base / 2,
  },
  label: {
    color: COLORS.grayText,
    ...FONTS.medium,
  },
  value: {
    ...FONTS.h5,
    color: COLORS.textPrimary,
    marginTop: SIZES.base / 2,
  },
});
