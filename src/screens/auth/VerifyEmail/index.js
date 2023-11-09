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
import routes from '../../../shared/constants/routes';

export default function VerifyEmail({route}) {
  const {goBack, navigate} = useNavigation();
  const [code, setCode] = useState('');

  const {email} = route.params;

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
          An email with verification instructions has been sent to{' '}
          <Text style={styles.email}>{email}</Text>. Please check your email to
          verify your Moosbu account.
        </Text>

        {/* <View>
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
        </View> */}

        <View style={{marginVertical: 50}}>
          <Text style={{textAlign: 'center', ...FONTS.medium}}>
            Completed verification?
          </Text>
          <FormButton
            title={'Go to Login Screen'}
            buttonStyle={styles.confirmButtonStyle}
            onPress={() => navigate(routes.LOGIN)}
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
    marginTop: SIZES.base,
  },
  resendButtonStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  textStyle: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
