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
    account_number: accountNumber,
    bank_code: bankCode,
    bank_id: bankId,
    amount: amount,
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            paddingVertical: 20,
          }}>
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
                  <Text style={styles.text}>{`\u20A6 ${amount}`}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.text}>Transfer fee:</Text>
                </View>

                <View style={styles.column}>
                  <Text style={styles.text}>{`\u20A6 ${transferFee}`}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.text}>Total Amount:</Text>
                </View>

                <View style={styles.column}>
                  <Text style={styles.text}>
                    {`\u20A6 ${parseInt(amount) + transferFee}`}
                  </Text>
                </View>
              </View>
            </View>
          </>
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
            onPress={() => setShowPinForm(true)}
            buttonStyle={styles.buttonStylye}
          />

          <Modal visible={showPinForm} animationType="slide" transparent={true}>
            <EnterPin setShowPinForm={setShowPinForm} options={options} />
          </Modal>
        </View>
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
    color: COLORS.label,
    ...FONTS.small,
  },
  buttonStylye: {
    marginTop: SIZES.base * 6,
  },
});
