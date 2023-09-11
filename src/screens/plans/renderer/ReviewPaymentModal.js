import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import ShortModal from '../../../shared/components/ShortModal';
import UseIcon from '../../../shared/utils/UseIcon';
import {COLORS, SIZES, FONTS} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';
import {selectWalletBalance} from '../../../redux/slices/wallet/selectors';
import handleApiError from '../../../shared/components/handleApiError';
import client from '../../../shared/api/client';
import notifyMessage from '../../../shared/hooks/notifyMessage';

export default function ReviewPaymentModal({handleToggleReviewModal}) {
  const balance = useSelector(selectWalletBalance);
  const [loading, setLoading] = useState(false);

  async function upgradePlan() {
    try {
      setLoading(true);

      const res = await client.post('/api/plan/upgrade', {amount: 5000});

      setLoading(false);
      notifyMessage(res.data?.Message || res.data?.message);
      handleToggleReviewModal();
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }

  return (
    <ShortModal
      title={'Review Payment'}
      handleToggleShortModal={handleToggleReviewModal}>
      <View style={styles.review}>
        <View style={styles.amountView}>
          <Text style={styles.price}>Amount</Text>

          <View>
            <Text style={styles.price}>₦5,000</Text>
            <Text style={styles.fee}>Zero Fee</Text>
          </View>
        </View>

        <View style={styles.wallet}>
          <UseIcon name="wallet-outline" type={'Ionicons'} />
          <Text style={styles.walletText}>Wallet Balance</Text>
          <Text style={[styles.walletText, styles.walletBalance]}>
            ₦{balance || 0}
          </Text>
        </View>
      </View>

      <Text style={styles.info}>
        You are about to subscribe to Moosbu paid plan for bigger business. You
        will be charged from your Moosbu wallet
      </Text>

      <FormButton
        title={'Complete Payment'}
        containerStyle={styles.button}
        onPress={upgradePlan}
        loading={loading}
      />
    </ShortModal>
  );
}
const styles = StyleSheet.create({
  review: {
    borderWidth: 1,
    borderRadius: SIZES.radius,
    padding: SIZES.base * 2,
    borderColor: COLORS.borderGray,
    backgroundColor: COLORS.tabBg,
  },
  amountView: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: COLORS.borderGray,
    paddingBottom: SIZES.base,
    marginBottom: SIZES.base,
  },
  wallet: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: COLORS.borderGray,
    paddingVertical: SIZES.base * 2,
    borderRadius: SIZES.radius / 2,
  },
  walletText: {
    flex: 1,
    marginLeft: SIZES.base,
    ...FONTS.regular,
  },
  price: {
    ...FONTS.h5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fee: {
    ...FONTS.regular,
    color: COLORS.credit,
    marginBottom: SIZES.base,
    textAlign: 'center',
  },
  walletBalance: {
    textAlign: 'right',
  },
  info: {
    ...FONTS.medium,
    color: COLORS.textGray,
    marginTop: SIZES.base * 1.5,
    marginBottom: SIZES.base * 4,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: SIZES.base * 3,
    marginBottom: SIZES.base * 3,
  },
});
