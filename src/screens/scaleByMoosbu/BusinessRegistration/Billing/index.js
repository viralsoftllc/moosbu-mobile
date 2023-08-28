import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import routes from '../../../../shared/constants/routes';

export default function Billing() {
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Billing'} subtitle="Step 4 of 4" />,
    });

    return () => {};
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.fee}>N 18,000</Text>

      <View style={styles.textView}>
        <Text style={styles.text}>
          Your payment covers, business name registration, courier and delivery
          cost, TIN/VAT registration. Once concluded your Moosbu business
          account will automatically be opened. You can reach us via chat or
          call our support team on 08024234363536
        </Text>
      </View>

      <View style={styles.btnContainer}>
        <FormInput
          placeholder={'Enter promo code'}
          style={styles.form}
          inputContainerStyle={styles.inputStyle}
          margin={0}
        />
        <Pressable style={styles.formInnerBtn}>
          <Text style={styles.formInnerBtnText}>Redeem</Text>
        </Pressable>
      </View>

      <View style={styles.btnContainer}>
        <FormInput
          placeholder={'Total'}
          style={styles.form}
          inputContainerStyle={styles.inputStyle}
          margin={0}
          editable={false}
        />

        <Text style={styles.totalText}>N 22,000</Text>
      </View>

      <FormButton
        title={'Continue'}
        // onPress={() => navigate(routes.BUSINESS_REGISTRATION)}
      />

      <FormButton
        title={'Pay later'}
        onPress={() => navigate(routes.BUSINESS_REGISTRATION)}
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base * 2,
  },
  textView: {
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base * 5,
  },
  fee: {
    textAlign: 'center',
    ...FONTS.h4,
    color: COLORS.textPrimary,
    marginBottom: SIZES.base * 2,
  },
  text: {
    color: COLORS.textPrimary,
    fontWeight: '300',
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: SIZES.base * 3,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: SIZES.radius,
    borderColor: COLORS.borderGray,
  },
  form: {
    marginBottom: 0,
    flex: 1,
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
  totalText: {
    color: COLORS.textPrimary,
    paddingHorizontal: SIZES.base * 1.5,
  },
  buttonStyle: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginTop: SIZES.base * 2,
  },
  textStyle: {
    color: COLORS.primary,
  },
});
