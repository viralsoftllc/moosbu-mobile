import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import UseIcon from '../../../../../shared/utils/UseIcon';

export default function NewCouponForm({
  onSubmit,
  details,
  setDetails,
  submitting,
}) {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return setDetails({...details, code: result});
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View>
          <FormInput
            label={'Coupon Name'}
            placeholder="Enter coupon name"
            onChangeText={text => setDetails({...details, name: text})}
            // style={styles.nameForm}
          />

          {/* <Pressable
            style={[styles.flex, styles.flatDiscountSwitch]}
            onPress={() =>
              setDetails({...details, enable_flat: !details?.enable_flat})
            }>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name={
                !details?.enable_flat
                  ? 'toggle-switch-off-outline'
                  : 'toggle-switch'
              }
              color={!details?.enable_flat ? COLORS.grayText : COLORS.credit}
              size={verticalScale(22)}
            />

            <Text style={styles.flatDiscountText}>Flat discount</Text>
          </Pressable> */}

          {/* <FormInput
            label={'Coupon description'}
            placeholder="Enter coupon description"
            onChangeText={text => setDetails({...details, description: text})}
          /> */}

          <View style={styles.flex}>
            <FormInput
              label={'Discount'}
              placeholder="Enter discount"
              style={[styles.smallForm, styles.leftFormInput]}
              keyboardType="numeric"
              onChangeText={text =>
                setDetails({...details, discount: String(text)})
              }
            />

            <FormInput
              label={'Limit'}
              placeholder="Enter limit"
              style={[styles.smallForm, styles.rightFormInput]}
              keyboardType="numeric"
              onChangeText={text =>
                setDetails({...details, limit: String(text)})
              }
            />
          </View>

          <Text style={styles.linkText}>Coupon code</Text>
          <View style={[styles.flex, styles.copyView]}>
            <Text style={styles.link}>{details?.code}</Text>
            <Pressable style={styles.copyBtn} onPress={() => generateString(6)}>
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

        <FormButton title={'Save'} onPress={onSubmit} loading={submitting} />
      </ScrollView>
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
  flatDiscountText: {
    color: COLORS.textPrimary,
    marginLeft: SIZES.base / 2,
    paddingVertical: SIZES.base,
    fontWeight: '300',
  },
  flatDiscountSwitch: {
    marginBottom: SIZES.base * 2,
  },
  nameForm: {marginBottom: 0},
});
