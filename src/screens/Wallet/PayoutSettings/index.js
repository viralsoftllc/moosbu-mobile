import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {PAYSTACK_SECRET_KEY} from '@env';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import client from '../../../shared/api/client';
import FormButton from '../../../shared/components/FormButton';
import FormInput from '../../../shared/components/FormInput';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import SelectInput from '../../../shared/components/SelectInput';
import UseIcon from '../../../shared/utils/UseIcon';
import handleApiError from '../../../shared/components/handleApiError';
import {useDispatch, useSelector} from 'react-redux';
import {setBanks} from '../../../redux/slices/wallet/slice';
import {selectBanks} from '../../../redux/slices/wallet/selectors';
import notifyMessage from '../../../shared/hooks/notifyMessage';

export default function PayoutSettings() {
  const {setOptions} = useNavigation();
  const dispatch = useDispatch();
  const banks = useSelector(selectBanks);
  // console.log('banks from store');
  // console.log(banks);
  // console.log(banks[11]);

  const [account, setAccount] = useState({});
  const [selectedBank, setSelectedBank] = useState({});
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // console.log(account);

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

  const fetchBanks = useCallback(async () => {
    setLoadingBanks(true);
    try {
      console.log('Fetching banks');

      const {data} = await client.get('https://api.paystack.co/bank', {
        headers: {
          Authorization: PAYSTACK_SECRET_KEY,
        },
      });

      // console.log('response from paystack');
      // console.log(data?.data);
      dispatch(setBanks(data?.data));
      setLoadingBanks(false);
    } catch (error) {
      setLoadingBanks(false);
      handleApiError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks]);

  async function submit() {
    console.log('Submitting details...');
    console.log(account);

    if (
      !account?.bank_code ||
      !account?.account_name ||
      !account?.account_number
    ) {
      return notifyMessage('Please fill all fields');
    }

    try {
      console.log('Submitting data');
      setSubmitting(true);

      const res = await client.post('/api/set_withdrawal_details', account);
      console.log('res from setting withdrawal');
      console.log(res);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      handleApiError(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.inputs}>
          <SelectInput
            label={'Bank Name'}
            placeholder={'Select bank'}
            options={banks}
            onChange={option => {
              setSelectedBank(option);
              setAccount({...account, bank_code: option?.code});
            }}
            rightIcon={<UseIcon name="down" type={'AntDesign'} />}
            keyExtractor={item => item.id}
            labelExtractor={item => item.name}
            value={selectedBank?.name}
          />

          <View style={[styles.form]}>
            <Text style={styles.label}>Account Number</Text>

            <View style={[styles.inputContainer]}>
              <TextInput
                style={[styles.textinput]}
                placeholder={'Enter account number'}
                onChangeText={text =>
                  setAccount({...account, account_number: String(text)})
                }
                keyboardType="numeric"
                maxLength={11}
              />

              <Pressable style={styles.formBtn}>
                <Text style={styles.formBtnText}>Verify</Text>
              </Pressable>
            </View>
          </View>

          <FormInput
            label={'Account Name'}
            placeholder="Enter Account Name"
            onChangeText={text => setAccount({...account, account_name: text})}
          />
        </View>

        <FormButton title={'Submit'} onPress={submit} loading={submitting} />
      </ScrollView>
    </SafeAreaView>
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
  },
  formBtnText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  inputs: {
    marginTop: SIZES.base * 2,
    marginBottom: SIZES.base * 5,
  },
});
