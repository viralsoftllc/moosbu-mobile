import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {PAYSTACK_SECRET_KEY} from '@env';

import {COLORS, FONTS, SIZES} from '../../../../../../assets/themes';
import UseIcon from '../../../../../../shared/utils/UseIcon';
import FormInput from '../../../../../../shared/components/FormInput';
import FormButton from '../../../../../../shared/components/FormButton';
import {selectBanks} from '../../../../../../redux/slices/wallet/selectors';
import client from '../../../../../../shared/api/client';
import {setBanks} from '../../../../../../redux/slices/wallet/slice';
import handleApiError from '../../../../../../shared/components/handleApiError';
import SelectInput from '../../../../../../shared/components/SelectInput';

export default function BankTransferModal({setShowBankTransferModal}) {
  const [isActive, setIsActive] = useState(false);
  const banks = useSelector(selectBanks);
  const dispatch = useDispatch();
  const [selectedBank, setSelectedBank] = useState({});
  const [loadingBanks, setLoadingBanks] = useState(false);

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

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={[styles.flex, styles.headerView]}>
            <View style={styles.headerTexts}>
              <Text style={styles.title}>Set Up Bank Transfer</Text>
              <Text style={styles.subtitle}>
                Please enter your bank Transfer details
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setShowBankTransferModal(false);
              }}
              style={styles.closeBtn}>
              <UseIcon
                type={'MaterialCommunityIcons'}
                name={'close'}
                color={COLORS.debit}
                size={verticalScale(18)}
              />
            </Pressable>
          </View>

          {/* Form */}
          <View style={styles.formView}>
            {/* <FormInput label={'Bank name'} placeholder={'Enter Bank name'} /> */}
            <SelectInput
              label={'Bank Name'}
              placeholder={'Select bank'}
              options={banks}
              onChange={option => {
                setSelectedBank(option);
                // setAccount({...account, bank_code: option?.code});
              }}
              rightIcon={<UseIcon name="down" type={'AntDesign'} />}
              keyExtractor={item => item.id}
              labelExtractor={item => item.name}
              value={selectedBank?.name}
            />

            <FormInput
              label={'Bank account number'}
              placeholder={'Enter your bank account number'}
            />

            <FormInput
              label={'Account name'}
              placeholder={'Enter your account name'}
            />

            <Pressable
              style={styles.activateBtn}
              onPress={() => setIsActive(!isActive)}>
              <View style={styles.cardIcon}>
                <UseIcon
                  name={
                    isActive ? 'toggle-switch' : 'toggle-switch-off-outline'
                  }
                  type={'MaterialCommunityIcons'}
                  color={isActive ? COLORS.credit : COLORS.grayText}
                  size={verticalScale(23)}
                />
              </View>

              <Text style={styles.activateText}>
                {isActive
                  ? 'Deactivate Bank Transfer'
                  : 'Activate Bank Transfer'}
              </Text>
            </Pressable>

            <FormButton title={'Save'} />
          </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: SIZES.base * 1.3,
  },
  headerTexts: {
    flex: 1,
  },
  headerView: {
    alignItems: 'flex-start',
  },
  formView: {
    marginTop: SIZES.base,
  },
  title: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
  },
  subtitle: {
    ...FONTS.medium,
    color: COLORS.grayText,
    marginTop: SIZES.base,
  },
  closeBtn: {
    paddingLeft: SIZES.base * 1.5,
    paddingBottom: SIZES.base * 1.5,
  },
  activateBtn: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: SIZES.base * 2,
  },
  activateText: {
    marginLeft: SIZES.base / 2,
    color: COLORS.textPrimary,
    ...FONTS.regular,
  },
});
