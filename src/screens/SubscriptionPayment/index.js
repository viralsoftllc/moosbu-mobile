import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../assets/themes';
import FormButton from '../../shared/components/FormButton';
import FormInput from '../../shared/components/FormInput';
import ImageIcon from '../../shared/components/ImageIcon';

import ScreenHeader from '../../shared/components/ScreenHeader';

export default function SubscriptionPayment() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.top}>
          <Text style={styles.title}>Final Step, make the payment</Text>

          <Text style={styles.subtitle}>
            To finalize your subscription, kindly complete your payment using a
            valid debit card
          </Text>

          <ImageIcon
            imageUrl={require('../../assets/icons/paystackwhite.png')}
            style={styles.imageIcon}
          />

          <Text style={styles.subtitle}>Joshua@moosbu.com</Text>
        </View>

        <View style={styles.forms}>
          <FormInput
            label={'Card number'}
            placeholder={'0000 0000 0000 0000'}
          />

          <View style={styles.formView}>
            <FormInput
              label={'Expiry date'}
              placeholder="MM/YY"
              style={[styles.smallForm, styles.leftFormInput]}
            />

            <FormInput
              label={'CVV'}
              placeholder="***"
              style={[styles.smallForm, styles.rightFormInput]}
            />
          </View>

          <Text style={styles.formlabel}>Discount</Text>
          <View style={styles.btnContainer}>
            <FormInput
              placeholder={'Enter discount code'}
              style={styles.form}
              inputContainerStyle={styles.inputStyle}
              margin={0}
            />

            <Pressable style={styles.formInnerBtn}>
              <Text style={styles.formInnerBtnText}>Apply</Text>
            </Pressable>
          </View>

          <FormButton title={'Pay Now'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  top: {
    alignItems: 'center',
  },
  imageIcon: {
    marginVertical: SIZES.base * 4,
  },
  title: {
    color: COLORS.textPrimary,
    ...FONTS.h5,
    marginBottom: SIZES.base * 2,
  },
  subtitle: {
    color: COLORS.grayText,
  },
  formView: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  smallForm: {
    width: '45%',
    flex: 1,
  },
  rightFormInput: {
    marginLeft: SIZES.base / 2,
  },
  leftFormInput: {
    marginRight: SIZES.base / 2,
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: SIZES.base * 4,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: SIZES.radius,
    borderColor: COLORS.borderGray,
  },
  form: {
    marginBottom: 0,
    flex: 1,
  },
  forms: {
    marginVertical: SIZES.base * 5,
  },
  formInnerBtn: {
    backgroundColor: COLORS.primaryBackground,
    paddingVertical: SIZES.base,
    height: '100%',
    paddingHorizontal: SIZES.base * 2,
  },
  inputStyle: {
    borderWidth: 0,
  },
  formInnerBtnText: {
    color: COLORS.white,
  },
  formlabel: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontWeight: '400',
    marginBottom: SIZES.base,
    marginTop: SIZES.base * 3,
  },
});
