import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Modal, SafeAreaView, StyleSheet, StatusBar, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import RowLink from '../../../shared/components/RowLink';
import routes from '../../../shared/constants/routes';
import CreateTransactionPin from './CreateTransactionPin';

export default function WalletSettings() {
  const {setOptions} = useNavigation();
  const [showCreateTransactionPinForm, setShowCreateTransactionPinForm] =
    useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Wallet Settings'} />,
    });
  }, [setOptions]);

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar backgroundColor={COLORS.primary} />
        <View style={styles.container}>
          <RowLink
            title={'Create Transaction Pin'}
            // route={routes.CREATE_TRANSACTION_PIN}
            onPress={() => setShowCreateTransactionPinForm(true)}
            iconName={'security'}
          />
          {/* <RowLink
            title={'Set Withdraw Account'}
            route={routes.PAYOUT_SETTINGS}
            iconName={'bank'}
            iconType={'MaterialCommunityIcons'}
          /> */}
        </View>
      </SafeAreaView>

      <Modal
        visible={showCreateTransactionPinForm}
        animationType="slide"
        transparent={true}>
        <CreateTransactionPin
          handleToggleShortModal={() => setShowCreateTransactionPinForm(false)}
        />
      </Modal>

      {/* <Modal
        visible={showCreateTransactionPinForm}
        animationType="slide"
        transparent={true}>
        <CreateTransactionPin
          handleToggleShortModal={() => setShowCreateTransactionPinForm(false)}
        />
      </Modal> */}
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
    // paddingHorizontal: SIZES.paddingHorizontal,
  },
  container: {
    flex: 1,
    paddingTop: SIZES.base * 3,
    paddingHorizontal: 20,
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
