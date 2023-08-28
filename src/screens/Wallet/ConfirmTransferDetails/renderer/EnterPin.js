import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function EnterPin({setShowPinForm}) {
  const [code, setCode] = useState('');

  function submitPassword(params) {}

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.flex}>
            <View>
              <Text style={styles.title}>Enter your Moosbu pin</Text>
              <Text style={styles.subtitle}>
                Your Moosbu pin is required to complete this transaction
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setShowPinForm(false);
              }}
              style={styles.closeBtn}>
              <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
            </Pressable>
          </View>

          <View>
            <OTPInputView
              style={styles.otpView}
              pinCount={4}
              keyboardType={'number-pad'}
              autoFocusOnLoad
              codeInputFieldStyle={styles.codeInputFieldStyle}
              onCodeFilled={otp => submitPassword(otp)}
              onCodeChanged={otp => setCode(otp)}
              code={code}
            />
          </View>

          <Text style={styles.info}>
            Please enter your passcode or use your fingerprint ID
          </Text>

          <Pressable style={styles.iconView}>
            <UseIcon
              type={'MaterialIcons'}
              name="fingerprint"
              size={verticalScale(25)}
              color={COLORS.primary}
            />
          </Pressable>

          <Text style={styles.info}>Need help?</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: SIZES.base * 1.3,
  },
  title: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
  },
  subtitle: {
    ...FONTS.medium,
    color: COLORS.grayText,
  },
  codeInputFieldStyle: {
    width: verticalScale(50),
    height: verticalScale(50),
    color: COLORS.black,
    backgroundColor: COLORS.tabBg,
    borderRadius: SIZES.radius / 2,
    ...FONTS.h6,
  },
  otpView: {
    width: '90%',
    height: verticalScale(100),
    alignSelf: 'center',
  },
  info: {
    ...FONTS.medium,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SIZES.base * 2,
  },
  iconView: {
    borderWidth: 1,
    borderRadius: SIZES.radius,
    padding: SIZES.base,
    alignSelf: 'center',
    borderColor: COLORS.primary,
    marginBottom: SIZES.base * 10,
  },
  closeBtn: {
    padding: SIZES.base,
  },
});
