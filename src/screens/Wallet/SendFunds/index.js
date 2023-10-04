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

export default function SendFunds({navigation}) {
  const {setOptions} = useNavigation();
  const [showBankForm, setShowBankForm] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [bank, setBank] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  //Bank dropdown variables
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Send Fund'} />,
    });
  }, [setOptions]);

  //Fetch account information
  // const verifyAccount = async () => {
  //   try {
  //     const details = await client.get(
  //       `/api/verify_account?accountNumber=${accountNumber}&bankCode=${value}`,
  //     );
  //     const {attributes} = details;
  //     setAccountName(attributes?.accountName);
  //   } catch (error) {
  //     handleApiError(error);
  //   }
  // };

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
  // };

  useEffect(() => {
    //Fetch bank list
    const fetchBanks = async () => {
      try {
        const datum = await client.get('/api/fetch_banks');
        const formatedList = datum?.data.map(x => {
          return {label: x.attributes['name'], value: x.attributes['nipCode']};
        });

        setBankList(formatedList);

        console.log(typeof datum);
      } catch (error) {
        handleApiError(error);
        console.log(error);
      }
    };
    fetchBanks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Search filter={false} />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
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
            <Pressable style={styles.optionIcon}>
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
      </ScrollView>

      <Modal visible={showBankForm} animationType="slide" transparent={true}>
        {/* <BankForm setShowBankForm={setShowBankForm} /> */}
        <HalfScreen>
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
          <View style={{gap: 15, marginBottom: 100}}>
            <View style={{marginBottom: 40}}>
              <TextInput
                style={styles.input}
                onChangeText={text => setAccountNumber(text)}
                inputMode="numeric"
                placeholder="Enter account number "
                placeholderTextColor={COLORS.grayText}
              />
            </View>
            <View style={{marginBottom: 40}}>
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
                onChange={item => {
                  setValue(item.value);
                  setBank(item.label);
                  setIsFocus(false);
                }}
              />
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <View style={{flex: 1}}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => setAmount(text)}
                  inputMode="numeric"
                  placeholder="Enter amount"
                  placeholderTextColor={COLORS.grayText}
                />
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
        </HalfScreen>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
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
    ...FONTS.small,
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
  },
});
