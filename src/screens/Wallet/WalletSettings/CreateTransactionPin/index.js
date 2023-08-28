import React, {useLayoutEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {SIZES} from '../../../../assets/themes';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import FormInput from '../../../../shared/components/FormInput';
import FormButton from '../../../../shared/components/FormButton';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import handleApiError from '../../../../shared/components/handleApiError';
import client from '../../../../shared/api/client';

export default function CreateTransactionPin() {
  const {setOptions} = useNavigation();
  const [pin, setPin] = useState('');
  const [pin2, setPin2] = useState('');
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <ScreenHeader
          title={'Create Transaction Pin'}
          subtitle={'Transaction PIN is required for withdrawal'}
        />
      ),
    });
  }, [setOptions]);

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
      const res = await client.post('/api/account/pin', {pin});
      // const res = await client.post('/api/create_withdrawal_pin', {pin});
      console.log('Response from set pin');
      console.log(res);
      console.log(res.data);
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
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {/* <Text>CreateTransactionPin</Text> */}

        <View style={{marginBottom: 'auto', paddingBottom: SIZES.base * 2}}>
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
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: SIZES.base * 3,
  },
  container: {
    paddingHorizontal: SIZES.paddingHorizontal,
    flex: 1,
    paddingBottom: SIZES.base * 3,
  },
});
