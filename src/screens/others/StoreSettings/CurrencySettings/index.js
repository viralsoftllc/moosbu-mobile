import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useEffect} from 'react';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UseIcon from '../../../../shared/utils/UseIcon';
import client from '../../../../shared/api/client';
import handleApiError from '../../../../shared/components/handleApiError';
import SelectModal from '../../../../shared/components/SelectModal';
import SelectModalFormInput from '../../../../shared/components/SelectModalFormInput';

export default function CurrencySettings() {
  const {setOptions} = useNavigation();

  const [currencies, setcurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  // console.log('currencies from state');
  // console.log(currencies);
  const [currencySympolPosition, setCurrencySympolPosition] = useState(false);
  const [currencySympolSpace, setCurrencySympolSpace] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Currency setting'} />,
    });
  }, [setOptions]);

  const getData = useCallback(async () => {
    try {
      console.log('Fetching new data');
      const {data} = await client.get('/api/currency');
      console.log(data);
      setcurrencies(data?.data);
    } catch (error) {
      handleApiError(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // const c = {
  //   code: 'NGN',
  //   created_at: '2023-03-27T09:55:51.000000Z',
  //   id: 0,
  //   name: 'Nigerian Naira',
  //   symbols: '₦',
  //   updated_at: '2023-03-27T09:55:51.000000Z',
  // };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SelectModalFormInput
          label={'Currency'}
          placeholder={'Select Currency'}
          setShowModal={setShowModal}
          selectedItem={selectedCurrency}
        />

        <FormInput
          label={'Currency Symbol'}
          placeholder="Enter Currency"
          value={selectedCurrency?.symbols}
          editable={false}
        />

        <View style={[styles.flex, styles.noteView]}>
          <UseIcon
            type={'AntDesign'}
            name="exclamationcircleo"
            color={COLORS.pending}
          />

          <Text style={styles.note}>
            Note: Add currency code as per three-letter ISO code. you can find
            out here..
          </Text>
        </View>

        <Pressable
          style={[styles.flex, styles.select]}
          onPress={() => setCurrencySympolPosition(!currencySympolPosition)}>
          <Text style={styles.selectText}>Currency Symbol Position</Text>

          <UseIcon
            name={
              currencySympolPosition
                ? 'toggle-switch'
                : 'toggle-switch-off-outline'
            }
            type={'MaterialCommunityIcons'}
            color={COLORS.credit}
            size={verticalScale(23)}
          />
        </Pressable>

        <Pressable
          style={[styles.flex, styles.select]}
          onPress={() => setCurrencySympolSpace(!currencySympolSpace)}>
          <Text style={styles.selectText}>Currency Symbol Space</Text>

          <UseIcon
            name={
              currencySympolSpace
                ? 'toggle-switch'
                : 'toggle-switch-off-outline'
            }
            type={'MaterialCommunityIcons'}
            color={COLORS.credit}
            size={verticalScale(23)}
          />
        </Pressable>

        <FormButton title={'Save changes'} buttonStyle={styles.buttonStyle} />
      </SafeAreaView>

      <Modal visible={showModal}>
        <SelectModal
          filteredItems={currencies}
          title={'Choose Contact Group'}
          setShowModal={setShowModal}
          selectedItem={selectedCurrency}
          handleSelect={option => {
            setSelectedCurrency(option);
            setShowModal(false);
          }}
          keyLabel={'name'}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base * 2,
  },
  note: {
    color: COLORS.pending,
    ...FONTS.medium,
    marginLeft: SIZES.base,
    flex: 1,
  },
  noteView: {
    marginBottom: SIZES.base * 3,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectText: {
    flex: 1,
    color: COLORS.textPrimary,
  },
  select: {
    marginVertical: SIZES.base / 2,
  },
  buttonStyle: {
    marginTop: SIZES.base * 3,
  },
});
