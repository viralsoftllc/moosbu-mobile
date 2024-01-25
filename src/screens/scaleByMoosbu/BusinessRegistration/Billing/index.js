import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import routes from '../../../../shared/constants/routes';
import {useSelector} from 'react-redux';
import {selectWalletBalance} from '../../../../redux/slices/wallet/selectors';

import {Modal, IconButton, Button, Chip} from 'react-native-paper';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import {verticalScale} from 'react-native-size-matters';

export default function Billing() {
  const {setOptions, navigate} = useNavigation();

  const walletBalance = useSelector(selectWalletBalance);

  const [purchaseCTA, setPurchaseCTA] = useState(false);

  const showPurchaseCTA = () => setPurchaseCTA(true);
  const hidePurchaseCTA = () => setPurchaseCTA(false);

  useLayoutEffect(() => {
    setOptions({
      headerShown: false,
    });

    return () => {};
  }, [setOptions]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'default'} />

      <ScreenHeader title={'Billing'} subtitle="Step 3 of 3" />

      <View style={styles.container}>
        <Text style={styles.fee}>
          {' '}
          {Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
          }).format(18000)}
        </Text>

        <View style={styles.textView}>
          <Text style={styles.text}>
            Your payment covers, business name registration, courier and
            delivery cost, TIN/VAT registration. You can reach us via chat or
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

          <Text style={styles.totalText}>
            {Intl.NumberFormat('en-NG', {
              style: 'currency',
              currency: 'NGN',
            }).format(18000)}
          </Text>
        </View>

        <FormButton title={'Continue'} onPress={() => showPurchaseCTA(true)} />

        <FormButton
          title={'Pay later'}
          onPress={() => navigate(routes.BUSINESS_REGISTRATION)}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.textStyle}
        />
      </View>

      {/* Purchase CTA */}
      <Modal
        visible={purchaseCTA}
        onDismiss={() => {
          hidePurchaseCTA();
        }}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          paddingBottom: 40,
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
        }}>
        <IconButton
          icon="close"
          mode="outlined"
          rippleColor={COLORS.secondary}
          onPress={() => {
            hidePurchaseCTA();
          }}
          size={16}
          style={{alignSelf: 'flex-end', borderRadius: 8}}
        />
        <Text
          style={{
            textAlign: 'center',
            ...FONTS.h5,
          }}>
          Pay for Business Registration
        </Text>

        <View
          style={{
            marginVertical: 50,
            backgroundColor: COLORS.lightSecondaryBackground,
            padding: 10,
          }}>
          <Text style={{...FONTS.h5}}>
            {' '}
            Wallet Balance :{' '}
            {Intl.NumberFormat('en-NG', {
              style: 'currency',
              currency: 'NGN',
            }).format(walletBalance)}
          </Text>
        </View>

        <Button
          onPress={() => {
            if (walletBalance < 18000) {
              return notifyMessage(
                'Your balance is insufficient to make this payment',
              );
            }
            hidePurchaseCTA();
          }}
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: 8,
            width: '80%',
            alignSelf: 'center',
            height: 50,
          }}
          labelStyle={{...FONTS.regular}}
          mode="contained">
          Continue
        </Button>
      </Modal>
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
    ...FONTS.medium,
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
    height: verticalScale(48),
    paddingHorizontal: SIZES.base * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    borderWidth: 0,
  },
  formInnerBtnText: {
    color: COLORS.white,
    ...FONTS.regular,
    alignSelf: 'center',
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
