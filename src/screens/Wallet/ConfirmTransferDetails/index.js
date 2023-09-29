import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';

import ScreenHeader from '../../../shared/components/ScreenHeader';
import UseIcon from '../../../shared/utils/UseIcon';
import EnterPin from './renderer/EnterPin';
import client from '../../../shared/api/client';
import handleApiError from '../../../shared/components/handleApiError';
import notifyMessage from '../../../shared/hooks/notifyMessage';

export default function ConfirmTransferDetails({route}) {
  const {accountNumber, amount, bank, bankCode, description} = route.params;
  const {setOptions} = useNavigation();
  const [showPinForm, setShowPinForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [bankId, setBankId] = useState('');
  const [transferId, setTransferId] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const transferFee = 50;

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Confirm Payment'} />,
    });
  }, [setOptions]);

  useEffect(() => {
    //verify account details
    const verifyAccount = async () => {
      setLoading(true);
      try {
        const details = await client.get(
          `/api/verify_account?accountNumber=${accountNumber}&bankCode=${bankCode}`,
        );
        const {attributes} = details.data;

        setAccountName(attributes?.accountName);
        setBankId(attributes?.bank.id);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleApiError(error);
      }
    };

    verifyAccount();
  }, []);

  const options = {
    account_name: accountName,
    account_number: 3072705914,
    bank_code: bankCode,
    bank_id: bankId,
    amount: amount,
  };

  const handleVerify = async () => {
    setButtonLoading(true);
    try {
      const {data} = await client.post('/api/transfer', options);
      console.log(data);

      const {id, attributes} = data.data;
      setTransferId(id);

      // if (attributes?.status == 'FAILED') {
      //   setButtonLoading(false);
      //   return notifyMessage(attributes?.failureReason);
      // }

      console.log(id, attributes);
      setButtonLoading(false);
      setShowPinForm(true);
    } catch (error) {
      setButtonLoading(false);
      handleApiError(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
      ) : (
        <>
          <View style={styles.details}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.text}>Send To:</Text>
              </View>

              <View style={styles.column}>
                <Text style={styles.text}>{accountName}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.text}>Account Number:</Text>
              </View>

              <View style={styles.column}>
                <Text style={styles.text}>{accountNumber}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.text}>Bank Name:</Text>
              </View>

              <View style={styles.column}>
                <Text style={styles.text}>{bank}</Text>
              </View>
            </View>
          </View>

          <View style={styles.details}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.text}>Amount:</Text>
              </View>

              <View style={styles.column}>
                <Text style={styles.text}>{amount}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.text}>Transfer fee:</Text>
              </View>

              <View style={styles.column}>
                <Text style={styles.text}>{transferFee}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.text}>Total Amount:</Text>
              </View>

              <View style={styles.column}>
                <Text style={styles.text}>
                  {parseInt(amount) + transferFee}
                </Text>
              </View>
            </View>
          </View>

          <FormButton
            title={'Pay Securely'}
            loading={buttonLoading}
            leftIcon={
              <UseIcon
                type={'MaterialIcons'}
                name="lock-outline"
                color={COLORS.white}
              />
            }
            onPress={handleVerify}
            buttonStyle={styles.buttonStylye}
          />

          <Modal visible={showPinForm} animationType="slide" transparent={true}>
            <EnterPin setShowPinForm={setShowPinForm} id={transferId} />
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  details: {
    borderWidth: 1,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base * 2,
    paddingHorizontal: SIZES.base,
    borderColor: COLORS.borderGray,
    marginVertical: SIZES.base * 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.base * 2,
  },
  column: {
    flex: 1,
  },
  text: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
  },
  buttonStylye: {
    marginTop: SIZES.base * 2,
  },
});
