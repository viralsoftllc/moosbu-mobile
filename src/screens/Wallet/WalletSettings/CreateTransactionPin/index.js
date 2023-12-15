import React, {useState} from 'react';
import {StyleSheet, Text, KeyboardAvoidingView, View} from 'react-native';

import {COLORS, SIZES, FONTS} from '../../../../assets/themes';
import FormInput from '../../../../shared/components/FormInput';
import FormButton from '../../../../shared/components/FormButton';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import handleApiError from '../../../../shared/components/handleApiError';
import client from '../../../../shared/api/client';
import ShortModal from '../../../../shared/components/ShortModal';

import OTPInputView from '@twotalltotems/react-native-otp-input';

export default function CreateTransactionPin({handleToggleShortModal}) {
  const [pin, setPin] = useState('');
  const [pin2, setPin2] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreatePin() {
    setLoading(true);

    if (!pin) {
      setLoading(false);
      return notifyMessage('Enter PIN to continue');
    }

    if (!pin2) {
      setLoading(false);
      return notifyMessage('Enter PIN again to continue');
    }

    if (pin !== pin2) {
      setLoading(false);
      return notifyMessage('Pin does not match');
    }

    try {
      const {data} = await client.post('/api/account/pin', {pin});
      console.log(data);
      setLoading(false);
      setPin('');
      setPin2('');
      notifyMessage('PIN set successfully');
      handleToggleShortModal();
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }

  return (
    <>
      <ShortModal
        handleToggleShortModal={handleToggleShortModal}
        title={'Create Transaction Pin'}>
        <KeyboardAvoidingView behavior="padding">
          <View>
            {/* <Text style={styles.subtitle}>
              Transaction PIN is required for withdrawal
            </Text> */}

            {/* <FormInput
              label={'Enter Transaction Pin'}
              placeholder={'Enter 6 digit pin'}
              value={pin}
              onChangeText={text => setPin(text)}
              maxLength={6}
              keyboardType="number-pad"
              secureTextEntry={true}
            /> */}

            <View style={{marginBottom: 50, gap: 20}}>
              <View>
                <Text style={{...FONTS.medium, fontFamily: 'Lato-Bold'}}>
                  Enter Transaction Pin
                </Text>
                <OTPInputView
                  style={{
                    width: '100%',
                    height: 70,
                    alignSelf: 'center',
                  }}
                  pinCount={6}
                  keyboardType={'number-pad'}
                  autoFocusOnLoad={false}
                  codeInputFieldStyle={styles.codeInputFieldStyle}
                  onCodeFilled={otp => setPin(otp)}
                  onCodeChanged={otp => setPin(otp)}
                  code={pin}
                  secureTextEntry
                />
              </View>

              <View>
                <Text style={{...FONTS.medium, fontFamily: 'Lato-Bold'}}>
                  Confirm Transaction Pin
                </Text>
                <OTPInputView
                  style={{
                    width: '100%',
                    height: 70,
                    alignSelf: 'center',
                  }}
                  pinCount={6}
                  keyboardType={'number-pad'}
                  autoFocusOnLoad={false}
                  codeInputFieldStyle={styles.codeInputFieldStyle}
                  onCodeFilled={otp => setPin2(otp)}
                  onCodeChanged={otp => setPin2(otp)}
                  code={pin2}
                  secureTextEntry
                />
              </View>
            </View>

            {/* <FormInput
              label={'Confirm Transaction Pin'}
              placeholder={'Confirm 6 digit pin'}
              value={pin2}
              maxLength={6}
              onChangeText={text => setPin2(text)}
              keyboardType="number-pad"
              secureTextEntry={true}
            /> */}
          </View>

          <FormButton
            title={'Create Pin'}
            onPress={handleCreatePin}
            loading={loading}
          />
        </KeyboardAvoidingView>
      </ShortModal>
    </>
  );
}
const styles = StyleSheet.create({
  subtitle: {
    ...FONTS.medium,
    color: COLORS.grayText,
    marginBottom: SIZES.base * 2,
  },
  codeInputFieldStyle: {
    width: 50,
    height: 50,
    color: COLORS.black,
    backgroundColor: COLORS.tabBg,
    borderRadius: SIZES.radius / 2,
    ...FONTS.h6,
    marginHorizontal: 2,
  },
});
