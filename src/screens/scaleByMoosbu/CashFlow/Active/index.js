import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';
import CreditScoreDetailsLink from '../renderer/CreditScoreDetailsLink';
import FormButton from '../../../../shared/components/FormButton';
import routes from '../../../../shared/constants/routes';
import {useNavigation} from '@react-navigation/native';

export default function Active() {
  const {navigate} = useNavigation();
  const [amount, setAmount] = useState(2500);

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.topContainer}>
          <CreditScoreDetailsLink />

          <View style={[styles.card, styles.maximumLoanCard]}>
            <View style={styles.iconView}>
              <UseIcon name="credit-card" type={'MaterialIcons'} />
            </View>

            <View>
              <Text style={styles.limitHeaderText}>Maximum You Can Borrow</Text>
              <Text style={styles.limitSubtitle}>
                This is the maximum amount you can borrow
              </Text>
              <Text style={styles.limitAmount}>50,000.00</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.borrowText}>
              How much do you want to borrow?
            </Text>

            <Slider
              minimumValue={100}
              maximumValue={50000}
              onValueChange={val => setAmount(Math.ceil(val))}
              value={amount}
              minimumTrackTintColor={COLORS.secondary}
              maximumTrackTintColor={COLORS.white}
              thumbTintColor={COLORS.black}
            />

            <View style={[styles.amountView, styles.flex]}>
              <Text style={styles.amountText}>N20,000.00</Text>
              <Text style={styles.amount}>N{amount}</Text>
              <Text style={styles.amountText}>N50,000.00</Text>
            </View>
          </View>

          <Text style={styles.loanInfo}>
            All loans must be repaid in{' '}
            <Text style={styles.loanDays}>30 days</Text>. It will take a maximum
            of 24 hours to review and fund your loan.
          </Text>
        </View>

        <View style={styles.bottomView}>
          <View style={[styles.bottomViewHeader, styles.flex]}>
            <Text style={styles.bottomText}>Amount to borrow</Text>
            <Text style={styles.bottomAmount}>{amount}</Text>
          </View>

          <FormButton
            title={'View breakdown'}
            onPress={() => navigate(routes.CASHFLOW_BREAKDOWN)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.white,
    flex: 1,
  },
  topContainer: {
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
  card: {
    backgroundColor: COLORS.tabBg,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base * 2,
    paddingHorizontal: SIZES.paddingHorizontal,
    marginVertical: SIZES.base * 2,
  },
  iconView: {
    borderRadius: 100,
    padding: SIZES.base * 1.5,
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    marginRight: SIZES.base,
  },
  maximumLoanCard: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  slider: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'red',
    height: 100,
  },
  amountView: {
    marginTop: SIZES.base,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  borrowText: {
    textAlign: 'center',
    ...FONTS.h6,
    color: COLORS.black,
    marginBottom: SIZES.base * 4,
  },
  amountText: {
    color: COLORS.textPrimary,
    fontWeight: '300',
  },
  amount: {
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  limitHeaderText: {
    ...FONTS.h5,
    color: COLORS.textPrimary,
    marginBottom: SIZES.base / 3,
  },
  limitSubtitle: {
    color: COLORS.grayText,
    ...FONTS.tiny,
    marginBottom: SIZES.base * 2,
  },
  limitAmount: {
    ...FONTS.h4,
    color: COLORS.textPrimary,
  },
  loanInfo: {
    color: COLORS.grayText,
    textAlign: 'center',
    marginVertical: SIZES.base * 3,
  },
  loanDays: {
    color: COLORS.secondary,
  },
  bottomView: {
    borderTopWidth: 1,
    paddingVertical: SIZES.base * 2,
    paddingHorizontal: SIZES.paddingHorizontal,
    borderColor: COLORS.borderGray,
  },
  bottomViewHeader: {
    marginBottom: SIZES.base * 2,
  },
  bottomText: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
  },
  bottomAmount: {
    color: COLORS.textSecondary,
    ...FONTS.regular,
  },
});
