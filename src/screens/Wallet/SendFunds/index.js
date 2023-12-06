import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, SIZES, FONTS} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import Search from '../../../shared/components/Search';
import UseIcon from '../../../shared/utils/UseIcon';
import Beneficiaries from './renderer/Beneficiaries';
import BankForm from './renderer/BankForm';
import HalfScreen from '../../finances/renderers/halfScreen';
import routes from '../../../shared/constants/routes';
import {Dropdown} from 'react-native-element-dropdown';
import client from '../../../shared/api/client';
import handleApiError from '../../../shared/components/handleApiError';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import {formatedList} from '../../../../banklist';

export default function SendFunds({navigation}) {
  const {setOptions} = useNavigation();
  const [showBankForm, setShowBankForm] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bank, setBank] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [nameEnquiryReference, setNameEnquiryReference] = useState('');

  //Verify account details variable
  const [isFetching, setIsFetching] = useState(false);

  //Bank dropdown variables
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Send Fund'} />,
    });
  }, [setOptions]);

  // const handleSubmit = async () => {
  //   await verifyAccount()
  //     .then(
  //       navigation.navigate(routes.CONFIRM_TRANSFER_DETAILS, {
  //         accountName,
  //         accountNumber,
  //         bank,
  //         bankCode: value,
  //         amount,
  //         description,
  //       }),
  //     )
  //     .catch(error => handleApiError(error));
  // };a

  const verifyAcc = async code => {
    try {
      setIsFetching(true);
      const {data} = await client.post(`/api/verify_account`, {
        accountNumber,
        bankCode: code,
      });
      console.log(data);
      const {bank} = data;
      setAccountName(bank.data.accountName);
      setNameEnquiryReference(bank.data.sessionId);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsFetching(false);
    }
  };

  // useEffect(() => {
  //   const verifyAccount = async () => {
  //     try {
  //       setIsFetching(true);
  //       const {data} = await client.post(`/api/verify_account`, {
  //         accountNumber,
  //         bankCode: value,
  //       });
  //       console.log(data);
  //       // const {attributes} = data;

  //       // setAccountName(attributes?.accountName);
  //       setIsFetching(false);
  //     } catch (error) {
  //       // Handle the error appropriately, e.g., show an error message or log the error.
  //       console.error('Error while verifying account:', error);
  //       setIsFetching(false);
  //     }
  //   };

  //   // Call the verifyAccount function when the 'bank' dependency changes.
  //   verifyAccount();
  // }, [bank, value]);

  const numberFormatter = value => {
    // console.log('1  ' + value + '  ' + typeof value); // Standard input from the textbox
    if (value == null || value.length === 0) return value; // No crash when empty textbox
    value = value.replaceAll('.', '').replaceAll(',', ''); // Remove garbage so we can make a number
    // console.log('2  ' + value + '  ' + typeof value);
    value = parseInt(value, 10); // toLocaleString needs a Number
    // console.log('3  ' + value + '  ' + typeof value);
    if (isNaN(value)) return 0; // Cant make a number then 0
    console.log(typeof value);
    return value?.toLocaleString('en-US'); // Cast number to US locale
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      {/* <Search filter={false} /> */}

      {/* <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'ios' ? 20 : 0,
        }}>
        <View style={styles.options}>
          <View style={styles.option}>
            <Pressable
              style={styles.optionIcon}
              onPress={() => setShowBankForm(true)}>
              <UseIcon
                type={'MaterialCommunityIcons'}
                name="bank"
                color={COLORS.primary}
              />
            </Pressable>
            <Text style={styles.optionText}>Send to bank</Text>
          </View>

          <View style={styles.option}>
            <Pressable
              style={styles.optionIcon}
              onPress={() => navigation.navigate('TransferSuccessful')}>
              <UseIcon
                type={'MaterialIcons'}
                name="person-outline"
                color={COLORS.primary}
              />
            </Pressable>
            <Text style={styles.optionText}>Send to a friend</Text>
          </View>
        </View>

        <Beneficiaries />
      </ScrollView> */}

      {/* <Modal visible={showBankForm} animationType="slide" transparent={true}> */}
      {/* <BankForm setShowBankForm={setShowBankForm} /> */}
      {/* <HalfScreen>
          {isFetching ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  marginBottom: 50,
                }}>
                <View>
                  <Text
                    style={{
                      ...FONTS.regular,
                      color: COLORS.textPrimary,
                      fontWeight: '700',
                    }}>
                    Send Money
                  </Text>
                  <Text
                    style={{
                      ...FONTS.small,
                      color: COLORS.textGray,
                    }}>
                    Provide account information of the recipient
                  </Text>
                </View>

                <Pressable
                  onPress={() => {
                    setShowBankForm(false);
                  }}
                  style={{}}>
                  <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
                </Pressable>
              </View>
              <KeyboardAvoidingView behavior="padding">
                <View style={{gap: 15, marginBottom: 30}}>
                  <View style={{marginBottom: 10}}>
                    <TextInput
                      style={styles.input}
                      onChangeText={text => setAccountNumber(text)}
                      inputMode="numeric"
                      placeholder="Enter account number "
                      placeholderTextColor={COLORS.grayText}
                      value={accountNumber}
                    />

                    <Text style={{...FONTS.medium}}>{accountName}</Text>
                  </View>
                  <View style={{marginBottom: 10}}>
                    <Text style={styles.label}>Select Recipient Bank</Text>
                    <Dropdown
                      style={styles.input}
                      placeholderStyle={[
                        styles.input,
                        {borderWidth: 0, color: COLORS.textGray},
                      ]}
                      itemTextStyle={{
                        ...FONTS.small,
                      }}
                      selectedTextStyle={{...FONTS.small}}
                      data={bankList}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? 'Select Bank' : '...'}
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={async item => {
                        if (accountNumber.length !== 10) {
                          setValue('');
                          setBank('');
                          return notifyMessage(
                            'Please input correct acount number',
                          );
                        } else {
                          setValue(item.value);
                          setBank(item.label);
                          setIsFocus(false);

                          await verifyAccount();
                        }
                      }}
                    />
                  </View>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    <View style={{flex: 1}}>
                      <Text style={styles.label}>Amount</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderWidth: 1,
                          marginTop: 3,
                          borderRadius: 5,
                          gap: 5,
                          padding: 3,
                          borderColor: COLORS.borderGray,
                          height: 50,
                        }}>
                        <Text style={{fontWeight: '300'}}>{'\u20A6'}</Text>
                        <TextInput
                          style={{}}
                          onChangeText={text => setAmount(text)}
                          inputMode="numeric"
                          placeholder="Enter amount"
                          placeholderTextColor={COLORS.grayText}
                        />
                      </View>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={styles.label}>Description</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Transaction description"
                        placeholderTextColor={COLORS.grayText}
                        onChangeText={text => setDescription(text)}
                      />
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>

              <Pressable
                onPress={() => {
                  if (!accountNumber) {
                    return notifyMessage('Please fill in account number');
                  }

                  if (accountNumber.length !== 10) {
                    return notifyMessage('Please enter a valid account number');
                  }
                  if (!bank) {
                    return notifyMessage('Please select bank');
                  }

                  if (!amount) {
                    return notifyMessage('Enter amount to proceed');
                  }
                  setShowBankForm(false);
                  navigation.navigate(routes.CONFIRM_TRANSFER_DETAILS, {
                    accountNumber,
                    bank,
                    bankCode: value,
                    amount,
                    description,
                  });
                }}
                style={styles.button}>
                <UseIcon
                  type={'MaterialIcons'}
                  name="lock-outline"
                  color={COLORS.white}
                />
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.regular,
                    fontWeight: 700,
                  }}>
                  Proceed
                </Text>
              </Pressable>
            </>
          )}
        </HalfScreen> */}
      {/* </Modal> */}

      {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              marginBottom: 50,
            }}>
            <View>
              <Text
                style={{
                  ...FONTS.regular,
                  color: COLORS.textPrimary,
                  fontWeight: '700',
                }}>
                Send Money
              </Text>
              <Text
                style={{
                  ...FONTS.small,
                  color: COLORS.textGray,
                }}>
                Provide account information of the recipient
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setShowBankForm(false);
              }}
              style={{}}>
              <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
            </Pressable>
          </View> */}
      <KeyboardAvoidingView behavior="padding">
        <View style={{gap: 15, marginBottom: 30}}>
          <View style={{marginBottom: 10}}>
            <Text
              style={{
                ...FONTS.small,
                color: COLORS.label,
              }}>
              Provide account information of the recipient
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setAccountNumber(text)}
              inputMode="numeric"
              placeholder="Enter account number "
              placeholderTextColor={COLORS.grayText}
              value={accountNumber}
              maxLength={10}
            />
            <View style={{paddingTop: 10}}>
              {isFetching && bank ? (
                <ActivityIndicator size="small" color={COLORS.primary} />
              ) : (
                <Text style={{...FONTS.medium}}>{accountName}</Text>
              )}
            </View>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={styles.label}>Select Recipient Bank</Text>
            <Dropdown
              style={styles.input}
              placeholderStyle={{
                ...FONTS.medium,
                color: COLORS.grayText,
              }}
              itemTextStyle={{
                ...FONTS.small,
              }}
              search
              searchPlaceholder="Search bank..."
              inputSearchStyle={{...FONTS.medium}}
              selectedTextStyle={{...FONTS.small}}
              data={[
                ...formatedList,
                {
                  label: 'Moosbu Bank Tech',
                  value: 999240,
                },
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select Bank' : '...'}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={async item => {
                if (accountNumber.length !== 10) {
                  setValue('');
                  setBank('');
                  setAccountName('');
                  return notifyMessage('Please input correct acount number');
                } else {
                  setValue(prev => item.value);
                  setBank(item.label);
                  verifyAcc(item.value);
                  setIsFocus(false);
                }
              }}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 10}}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Amount</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  marginTop: 3,
                  borderRadius: 5,
                  gap: 5,
                  padding: 3,
                  borderColor: COLORS.borderGray,
                  height: 50,
                }}>
                <Text style={{fontWeight: '300'}}>{'\u20A6'}</Text>
                <TextInput
                  style={{width: '90%', ...FONTS.small}}
                  onChangeText={text =>
                    setAmount(prev => numberFormatter(text))
                  }
                  inputMode="numeric"
                  placeholder="Enter amount"
                  placeholderTextColor={COLORS.grayText}
                  value={amount}
                />
              </View>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                placeholder="Transaction description"
                placeholderTextColor={COLORS.grayText}
                onChangeText={text => setDescription(text)}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      <Pressable
        onPress={() => {
          if (!accountNumber) {
            return notifyMessage('Please fill in account number');
          }

          if (accountNumber.length !== 10) {
            return notifyMessage('Please enter a valid account number');
          }
          if (!bank) {
            return notifyMessage('Please select bank');
          }

          if (!amount) {
            return notifyMessage('Enter amount to proceed');
          }
          setShowBankForm(false);
          navigation.navigate(routes.CONFIRM_TRANSFER_DETAILS, {
            accountNumber,
            bank,
            bankCode: value,
            amount,
            description,
            accountName,
            nameEnquiryReference,
          });
        }}
        style={styles.button}>
        <UseIcon
          type={'MaterialIcons'}
          name="lock-outline"
          color={COLORS.white}
        />
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h5,
          }}>
          Proceed
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.primaryBackground,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base * 2,
    marginBottom: SIZES.base * 5,
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIcon: {
    backgroundColor: COLORS.white,
    width: verticalScale(40),
    height: verticalScale(40),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.base,
  },
  optionText: {
    color: COLORS.white,
    ...FONTS.medium,
  },
  label: {...FONTS.small, color: COLORS.label},
  input: {
    borderWidth: 1,
    marginTop: 3,
    borderRadius: 5,
    height: 50,
    padding: 10,
    borderColor: COLORS.borderGray,
    ...FONTS.medium,
  },
  button: {
    minWidth: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 5,
    marginTop: 50,
  },
});
