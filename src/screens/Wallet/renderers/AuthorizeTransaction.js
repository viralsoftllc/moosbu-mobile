import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import {verticalScale} from 'react-native-size-matters';
import ShortModal from '../../../shared/components/ShortModal';

export default function AuthorizeTransaction({setCloseAuthModal, onComplete}) {
  const [code, setCode] = useState('');

  return (
    <ShortModal
      handleToggleShortModal={() => setCloseAuthModal(false)}
      title={'Enter your Moosbu pin'}>
      <View>
        <Text style={styles.subtitle}>
          Your Moosbu pin is required to complete this transaction
        </Text>
      </View>

      <OTPInputView
        style={styles.otpView}
        pinCount={4}
        keyboardType={'number-pad'}
        autoFocusOnLoad
        codeInputFieldStyle={styles.codeInputFieldStyle}
        onCodeFilled={otp => onComplete(otp)}
        onCodeChanged={otp => setCode(otp)}
        code={code}
        secureTextEntry={true}
      />

      <Text style={styles.info}>Please enter your passcode</Text>
      {/* <Text style={styles.info}>
        Please enter your passcode or use your fingerprint ID
      </Text> */}

      <Pressable style={styles.iconView}>
        {/* <UseIcon
          type={'MaterialIcons'}
          name="fingerprint"
          size={verticalScale(25)}
          color={COLORS.primary}
        /> */}
      </Pressable>

      <Text style={styles.info}>Need help?</Text>
    </ShortModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base * 2,
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
    // borderWidth: 1,
    borderRadius: SIZES.radius,
    padding: SIZES.base,
    alignSelf: 'center',
    borderColor: COLORS.primary,
    marginBottom: SIZES.base * 5,
  },
});
