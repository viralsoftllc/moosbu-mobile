import {useNavigation} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';
import UseIcon from '../../../shared/utils/UseIcon';

export default function VerifyEmail() {
  const {goBack} = useNavigation();
  const [code, setCode] = useState('');

  function submitPassword(params) {}

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Pressable style={styles.iconWrapper} onPress={goBack}>
          <UseIcon
            type={'MaterialIcons'}
            name="arrow-back"
            color={COLORS.textPrimary}
          />
        </Pressable>

        <Text style={styles.headerText}>Verify Email</Text>

        {/* Todo - verify email */}
        <Text style={styles.message}>
          Please enter the number code sent to your email,{' '}
          <Text style={styles.email}>joshua@moosbu.com</Text>
        </Text>

        <View>
          <OTPInputView
            style={styles.otpView}
            pinCount={6}
            keyboardType={'number-pad'}
            autoFocusOnLoad
            codeInputFieldStyle={styles.codeInputFieldStyle}
            onCodeFilled={otp => submitPassword(otp)}
            onCodeChanged={otp => setCode(otp)}
            code={code}
          />
        </View>

        <View>
          <FormButton
            title={'Confirm'}
            buttonStyle={styles.confirmButtonStyle}
          />
          <FormButton
            title={'Resend code'}
            buttonStyle={styles.resendButtonStyle}
            textStyle={styles.textStyle}
          />
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
    paddingVertical: SIZES.base * 2,
  },
  imageView: {
    height: verticalScale(220),
    marginVertical: SIZES.base,
  },
  image: {
    height: '100%',
  },
  headerText: {
    textAlign: 'center',
    color: COLORS.primary,
    ...FONTS.h4,
    marginTop: SIZES.base * 1.5,
    marginBottom: SIZES.base,
  },
  message: {
    color: COLORS.grayText,
    ...FONTS.regular,
    paddingHorizontal: SIZES.base * 2,
  },
  email: {
    color: COLORS.textPrimary,
  },
  codeInputFieldStyle: {
    width: verticalScale(40),
    height: verticalScale(40),
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
  confirmButtonStyle: {
    marginBottom: SIZES.base,
    backgroundColor: COLORS.primary,
    marginTop: SIZES.base * 2,
  },
  resendButtonStyle: {
    backgroundColor: 'transparent',
  },
  textStyle: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
