import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import UseIcon from '../../../../../shared/utils/UseIcon';

export default function EditCouponForm({handleSuccessfulResponse}) {
  return (
    <View style={styles.container}>
      <View>
        <FormInput label={'Coupon Name'} placeholder="Enter coupon name" />

        <View style={styles.flex}>
          <FormInput
            label={'Discount'}
            placeholder="Enter discount"
            style={[styles.smallForm, styles.leftFormInput]}
          />

          <FormInput
            label={'Limit'}
            placeholder="Enter limit"
            style={[styles.smallForm, styles.rightFormInput]}
          />
        </View>

        <Text style={styles.linkText}>Coupon code</Text>
        <View style={[styles.flex, styles.copyView]}>
          <Text style={styles.link}>Mowu74u</Text>
          <Pressable style={styles.copyBtn}>
            <UseIcon
              type={'EvilIcons'}
              name="refresh"
              color={COLORS.white}
              size={verticalScale(20)}
            />
            <Text style={styles.copyText}>Generate</Text>
          </Pressable>
        </View>
      </View>

      <FormButton title={'Save'} onPress={handleSuccessfulResponse} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: SIZES.base * 2,
  },
  inputStyle: {
    textAlignVertical: 'top',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  smallForm: {
    width: '40%',
    flex: 1,
  },
  rightFormInput: {
    marginLeft: SIZES.base,
  },
  leftFormInput: {
    marginRight: SIZES.base,
  },
  link: {
    ...FONTS.medium,
    marginLeft: SIZES.base,
    flex: 1,
  },
  copyView: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius / 2,
    overflow: 'hidden',
    marginBottom: SIZES.base * 3,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  copyBtn: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base,
  },
  copyText: {
    color: COLORS.white,
    marginLeft: SIZES.base / 2,
  },
  linkText: {
    marginBottom: SIZES.base,
  },
});
