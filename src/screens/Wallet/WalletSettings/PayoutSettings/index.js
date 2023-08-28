import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import client from '../../../../shared/api/client';
import handleApiError from '../../../../shared/components/handleApiError';
import Banks from '../../renderers/Banks';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';
import {verticalScale} from 'react-native-size-matters';

export default function PayoutSettings() {
  const {setOptions} = useNavigation();

  const [account, setAccount] = useState({});
  const [selectedBank, setSelectedBank] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showBanks, setShowBanks] = useState(false);
  // console.log('account');
  // console.log(account);
  // console.log('selectedBank');
  // console.log(selectedBank);

  const [verifying, setVerifying] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <ScreenHeader
          title={'Setup Payout Details'}
          subtitle={'Cashout to your preferred account'}
        />
      ),
    });
  }, [setOptions]);

  async function submit() {
    console.log('Submitting details...');
    console.log(account);

    if (!selectedBank) {
      return notifyMessage('Please select recipient Bank');
    }
    if (!account?.account_number) {
      return notifyMessage('Please add account number');
    }

    if (!account?.account_name) {
      return notifyMessage('Please verify account details');
    }

    try {
      console.log('Submitting data');
      setSubmitting(true);

      const res = await client.get(
        `/api/account/recipient?account_name=${account?.account_name}&account_number=${account?.account_number}&bank_code=${selectedBank?.code}`,
        account,
      );
      console.log('res from setting withdrawal');
      console.log(res);
      setSubmitting(false);
      notifyMessage('Payout account updated');
    } catch (error) {
      setSubmitting(false);
      handleApiError(error);
    }
  }

  async function verifyAccount() {
    if (!selectedBank) {
      return notifyMessage('Please select recipient Bank');
    }
    if (!account?.account_number) {
      return notifyMessage('Please add account number');
    }

    try {
      setVerifying(true);
      const res = await client.get(
        `/api/account/verification?account_number=${account?.account_number}&bank_code=${selectedBank?.code}`,
      );

      console.log('Verify account');
      console.log(res);
      console.log(res.data);
      setVerifying(false);

      if (!res.data?.status) {
        return handleApiError(res);
      }

      setAccount({...account, account_name: res.data?.data?.account_name});
    } catch (error) {
      setVerifying(false);
      handleApiError(error);
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.inputs}>
            <View style={[styles.form]}>
              <Text style={styles.label}>Bank Name</Text>

              <Pressable
                style={[styles.inputContainer, styles.bankName]}
                onPress={() => setShowBanks(true)}>
                <Text
                  style={[
                    styles.bankNameText,
                    {
                      color: selectedBank?.name
                        ? COLORS.black
                        : COLORS.textGray,
                    },
                  ]}>
                  {selectedBank?.name || 'Select bank'}{' '}
                </Text>

                <UseIcon
                  name="down"
                  type={'AntDesign'}
                  color={COLORS.grayText}
                />
              </Pressable>
            </View>

            <View style={[styles.form]}>
              <Text style={styles.label}>Account Number</Text>

              <View style={[styles.inputContainer]}>
                <TextInput
                  style={[styles.textinput]}
                  placeholder={'Enter account number'}
                  value={account?.account_number}
                  onChangeText={text => {
                    setAccount({
                      ...account,
                      account_number: String(text),
                      account_name: '',
                    });
                  }}
                  keyboardType="numeric"
                  maxLength={10}
                />

                <Pressable style={styles.formBtn} onPress={verifyAccount}>
                  {verifying ? (
                    <ActivityIndicator color={COLORS.white} />
                  ) : (
                    <Text style={styles.formBtnText}>Verify</Text>
                  )}
                </Pressable>
              </View>
            </View>

            <FormInput
              label={'Account Name'}
              placeholder="Enter Account Name"
              value={account?.account_name}
              editable={false}
              onChangeText={text =>
                setAccount({...account, account_name: text})
              }
            />
          </View>

          <FormButton title={'Submit'} onPress={submit} loading={submitting} />
        </ScrollView>
      </SafeAreaView>

      <Modal visible={showBanks} animationType="slide" transparent={true}>
        <Banks
          setShowBanks={setShowBanks}
          setSelectedBank={setSelectedBank}
          selectedBank={selectedBank}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  form: {
    marginBottom: SIZES.base * 2,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: SIZES.radius / 1.5,
    borderColor: COLORS.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    height: verticalScale(45),
  },
  label: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontWeight: '400',
    marginBottom: SIZES.base,
  },
  textinput: {
    ...FONTS.regular,
    paddingHorizontal: SIZES.base,
    flex: 1,
  },
  formBtn: {
    backgroundColor: COLORS.primaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    paddingHorizontal: SIZES.base * 3,
    height: verticalScale(40),
    minWidth: '30%',
  },
  formBtnText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  inputs: {
    marginTop: SIZES.base * 2,
    marginBottom: SIZES.base * 5,
  },
  bankName: {
    paddingHorizontal: SIZES.base,
  },
  bankNameText: {
    color: COLORS.textGray,
    flex: 1,
    ...FONTS.regular,
  },
});
