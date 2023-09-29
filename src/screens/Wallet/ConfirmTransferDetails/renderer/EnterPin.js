import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';
import handleApiError from '../../../../shared/components/handleApiError';
import client from '../../../../shared/api/client';

export default function EnterPin({setShowPinForm, id}) {
  const [code, setCode] = useState('');

  const handleTransfer = async () => {
    console.log(id, code);

    try {
      const res = await client.post('/api/verify_transfer', {
        pin: code,
        transfer_id: id,
      });
      console.log(res.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  function submitPassword(params) {}

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.flex}>
            <View style={{flex: 2}}>
              <Text style={styles.title}>Enter your Moosbu pin</Text>
              <Text style={styles.subtitle}>
                Your Moosbu pin is required to complete this transaction
              </Text>
            </View>

            <View>
              <Pressable
                onPress={() => {
                  setShowPinForm(false);
                }}
                style={styles.closeBtn}>
                <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
              </Pressable>
            </View>
          </View>

          <View>
            <OTPInputView
              style={styles.otpView}
              pinCount={6}
              keyboardType={'number-pad'}
              autoFocusOnLoad
              codeInputFieldStyle={styles.codeInputFieldStyle}
              onCodeFilled={otp => setCode(otp)}
              onCodeChanged={otp => setCode(otp)}
              code={code}
            />
          </View>

          <Text style={styles.info}>
            Please enter your moosbu passcode to complete transaction.
          </Text>

          <Pressable style={styles.iconView} onPress={handleTransfer}>
            <UseIcon
              type={'MaterialIcons'}
              name="fingerprint"
              size={verticalScale(25)}
              color={COLORS.primary}
            />
          </Pressable>
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
    alignItems: 'flex-start',
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
    width: verticalScale(35),
    height: verticalScale(35),
    color: COLORS.black,
    backgroundColor: COLORS.tabBg,
    borderRadius: SIZES.radius / 2,
    ...FONTS.h6,
    marginHorizontal: 2,
  },
  otpView: {
    width: '90%',
    height: verticalScale(100),
    alignSelf: 'center',
    // backgroundColor: COLORS.lightSecondaryBackground,
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
