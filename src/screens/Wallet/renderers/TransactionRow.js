import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';

export default function TransactionRow({transaction}) {
  function getIcon() {
    if (transaction?.type?.toLowerCase() === 'send') {
      return (
        <UseIcon
          type="Feather"
          name="arrow-up-right"
          color={COLORS.debit}
          size={17}
        />
      );
    }
    if (transaction?.type?.toLowerCase() === 'deposit') {
      return (
        <UseIcon
          type="Feather"
          name="arrow-down-left"
          color={COLORS.credit}
          size={17}
        />
      );
    }
    if (transaction?.type?.toLowerCase() === 'withdraw') {
      return (
        <UseIcon type="FAIcon" name="bank" color={COLORS.primary} size={14} />
      );
    }
  }

  function getColor() {
    if (transaction?.status?.toLowerCase() === 'success') {
      return COLORS.credit;
    }
    if (transaction?.status?.toLowerCase() === 'pending') {
      return COLORS.pending;
    }
    if (transaction?.status?.toLowerCase() === 'fail') {
      return COLORS.debit;
    }
    if (transaction?.status?.toLowerCase() === 'sent') {
      return COLORS.debit;
    }
  }

  //   function getAmountSign() {
  //     if (transaction?.type?.toLowerCase() === 'deposit')
  //   }

  return (
    <View style={[styles.flex, styles.container]}>
      {getIcon()}

      <View style={styles.detailsContainer}>
        <View style={[styles.flex]}>
          <View>
            <Text style={styles.text}>{transaction?.type}</Text>
          </View>
          <View>
            <Text style={styles.text}>{transaction?.ref}</Text>
          </View>
          <View>
            <Text style={[styles.text, {color: getColor()}]}>
              {transaction?.status}
            </Text>
          </View>
          <View>
            <Text style={[styles.text, {color: getColor()}]}>
              ₦{transaction?.amount}
            </Text>
          </View>
        </View>

        <Text style={styles.date}>12, June 2023-2:12:08</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.base * 2,
    zIndex: 0,
  },
  date: {
    color: COLORS.textGray,
    ...FONTS.tiny,
    fontWeight: '400',
    marginTop: SIZES.base / 5,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: SIZES.base,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: COLORS.textPrimary,
    ...FONTS.medium,
    fontWeight: '500',
    zIndex: 0,
  },
});
