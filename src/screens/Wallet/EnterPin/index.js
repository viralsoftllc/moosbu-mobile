import {useNavigation} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useLayoutEffect, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import UseIcon from '../../../shared/utils/UseIcon';

export default function EnterPin() {
  const {setOptions} = useNavigation();
  const [code, setCode] = useState('');

  function submitPassword() {}

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Enter Pin'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Enter your Moosbu pin</Text>
        <Text style={styles.subtitle}>
          Your Moosbu pin is required to complete this transaction
        </Text>
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

      <Pressable style={styles.iconView}>
        <UseIcon
          type={'MaterialIcons'}
          name="fingerprint"
          size={verticalScale(25)}
          color={COLORS.primary}
        />
      </Pressable>

      <Text style={styles.info}>Need help?</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base * 3,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
