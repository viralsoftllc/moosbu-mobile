import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import UseIcon from '../../../shared/utils/UseIcon';
import {COLORS, SIZES, FONTS} from '../../../assets/themes';
import ShortModal from '../../../shared/components/ShortModal';
import FormButton from '../../../shared/components/FormButton';
import {selectWalletBalance} from '../../../redux/slices/wallet/selectors';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../shared/constants/routes';

export default function PaymentModal({handleTogglePaymentModal, onContinue}) {
  const {navigate} = useNavigation();
  const balance = useSelector(selectWalletBalance);
  // const insufficientFund = Number(balance) < 5000;
  let insufficientFund = false;

  return (
    <ShortModal
      title={'Amount to pay'}
      handleToggleShortModal={handleTogglePaymentModal}>
      <View style={styles.paymentInfoView}>
        <Text style={styles.price}>₦5,000</Text>

        <Text style={styles.fee}>Zero Fee</Text>

        <Text style={styles.info}>
          You are about to subscribe to Moosbu paid plan for bigger business.
          You will be charged from your Moosbu wallet
        </Text>
      </View>

      <View style={styles.walletContainer}>
        <Text style={styles.walletLabel}>Pay From</Text>

        <View style={styles.wallet}>
          <UseIcon name="wallet-outline" type={'Ionicons'} />
          <Text style={styles.walletText}>Wallet Balance</Text>
          <Text style={styles.walletText}>₦{balance || 0}</Text>
        </View>
      </View>
      {insufficientFund ? (
        <Text style={styles.warn}>You have insufficient wallet balance</Text>
      ) : null}

      {insufficientFund ? (
        <FormButton
          title={'Top Up Wallet'}
          containerStyle={styles.button}
          buttonStyle={styles.buttonStyle}
          onPress={() => {
            handleTogglePaymentModal();
            navigate(routes.WALLET);
          }}
        />
      ) : (
        <FormButton
          title={'Continue'}
          containerStyle={styles.button}
          onPress={onContinue}
        />
      )}
    </ShortModal>
  );
}

const styles = StyleSheet.create({
  paymentInfoView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.base,
  },
  price: {
    ...FONTS.h2,
    marginBottom: SIZES.base / 3,
  },
  fee: {
    ...FONTS.regular,
    color: COLORS.credit,
    marginBottom: SIZES.base,
  },
  info: {
    ...FONTS.medium,
    color: COLORS.textGray,
    marginBottom: SIZES.base * 3,
  },
  walletContainer: {
    marginBottom: SIZES.base,
  },
  walletLabel: {
    ...FONTS.h6,
    marginBottom: SIZES.base,
  },
  wallet: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base * 2,
    borderRadius: SIZES.radius / 2,
  },
  walletText: {
    flex: 1,
    marginLeft: SIZES.base,
    ...FONTS.regular,
  },
  button: {
    marginHorizontal: SIZES.base * 3,
    marginBottom: SIZES.base * 3,
    marginTop: SIZES.base * 5,
  },
  buttonStyle: {
    backgroundColor: COLORS.debit,
  },
  warn: {
    color: COLORS.debit,
  },
});
