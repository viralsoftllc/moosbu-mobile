import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import {useNavigation} from '@react-navigation/native';

export default function TransactionRow({transaction}) {
  const navigation = useNavigation();

  function getIcon() {
    if (attributes?.direction.toLowerCase() === 'order') {
      return (
        <UseIcon
          type="FAIcon5"
          name="file-invoice"
          color={COLORS.textGray}
          size={17}
        />
      );
    }

    if (attributes?.direction.toLowerCase() === 'funding') {
      return (
        <UseIcon
          type="MaterialIcons"
          name="payments"
          color={COLORS.textGray}
          size={17}
        />
      );
    }

    if (attributes?.direction.toLowerCase() === 'debit') {
      return (
        <UseIcon
          type="Feather"
          name="arrow-up-right"
          color={COLORS.debit}
          size={17}
        />
      );
    }
    if (attributes?.direction.toLowerCase() === 'credit') {
      return (
        <UseIcon
          type="Feather"
          name="arrow-down-left"
          color={COLORS.credit}
          size={17}
        />
      );
    }

    if (attributes?.direction.toLowerCase() === 'withdraw') {
      return (
        <UseIcon type="FAIcon" name="bank" color={COLORS.textGray} size={14} />
      );
    }

    return (
      <UseIcon
        type="MaterialIcons"
        name="payment"
        color={COLORS.textGray}
        size={14}
      />
    );
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

  const {attributes, id} = transaction;

  const amount = attributes.amount / 100;

  function addHours(date) {
    date = new Date(date).getTime() + 60 * 60 * 1000;

    date = new Date(date).toLocaleString();

    return date;
  }

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('TransactionDetails', {
          // account_name,
          // account_number,
          amount,
          // bank,
          time: attributes.transactionDate,
          transactionId: id,
          // description,
          status: attributes.direction,
        });
      }}
      style={[styles.flex, styles.container]}>
      {getIcon()}

      <View style={styles.detailsContainer}>
        <View style={[styles.flex]}>
          <View>
            <Text style={styles.text}>{transaction?.attributes.direction}</Text>
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
              {Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
              }).format(attributes?.amount / 100)}
            </Text>
          </View>
        </View>

        <Text style={styles.date}>{addHours(attributes.createdAt)}</Text>
      </View>
    </Pressable>
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
