import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {COLORS, SIZES, FONTS} from '../../../../assets/themes';
import FormInput from '../../../../shared/components/FormInput';
import FormButton from '../../../../shared/components/FormButton';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import handleApiError from '../../../../shared/components/handleApiError';
import client from '../../../../shared/api/client';
import ShortModal from '../../../../shared/components/ShortModal';

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
      await client.post('/api/account/pin', {pin});

      setLoading(false);
      setPin('');
      setPin2('');
      notifyMessage('PIN set successfully');
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
        <View>
          <Text style={styles.subtitle}>
            Transaction PIN is required for withdrawal
          </Text>

          <FormInput
            label={'Enter Transaction Pin'}
            placeholder={'Enter 4 digit pin'}
            value={pin}
            onChangeText={text => setPin(text)}
            maxLength={4}
            keyboardType="number-pad"
            secureTextEntry={true}
          />

          <FormInput
            label={'Confirm Transaction Pin'}
            placeholder={'Confirm 4 digit pin'}
            value={pin2}
            maxLength={4}
            onChangeText={text => setPin2(text)}
            keyboardType="number-pad"
            secureTextEntry={true}
          />
        </View>

        <FormButton
          title={'Create Pin'}
          onPress={handleCreatePin}
          loading={loading}
        />
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
});
