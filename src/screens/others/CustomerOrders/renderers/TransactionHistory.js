import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import routes from '../../../../shared/constants/routes';

import TransactionRow from './TransactionRow';

const transactions = [
  {
    id: '000642',
    name: 'Body Lotion',
    status: 'Completed',
    payment: 'Paystack',
    amount: '50,000',
    date: '12, June 2023-2:13:23',
  },
  {
    id: '000643',
    name: 'Body Lotion',
    status: 'Pending',
    payment: 'Paystack',
    amount: '50,000',
    date: '12, June 2023-2:13:23',
  },
  {
    id: '000644',
    name: 'Body Lotion',
    status: 'Cancelled',
    payment: 'Paystack',
    amount: '50,000',
    date: '12, June 2023-2:13:23',
  },
];

export default function TransactionHistory() {
  const [filter, setFilter] = useState('All order');
  const {navigate} = useNavigation();

  return (
    <View>
      {/* Filter options */}
      <View style={styles.filterContainer}>
        <Pressable style={styles.filter} onPress={() => setFilter('All order')}>
          <Text
            style={[
              styles.filterText,
              {
                color:
                  filter === 'All order'
                    ? COLORS.textSecondary
                    : COLORS.grayText,
              },
            ]}>
            All order
          </Text>
        </Pressable>
        <Pressable
          style={styles.filter}
          onPress={() => setFilter('Processing')}>
          <Text
            style={[
              styles.filterText,
              {
                color:
                  filter === 'Processing'
                    ? COLORS.textSecondary
                    : COLORS.grayText,
              },
            ]}>
            Processing
          </Text>
        </Pressable>
        <Pressable style={styles.filter} onPress={() => setFilter('Completed')}>
          <Text
            style={[
              styles.filterText,
              {
                color:
                  filter === 'Completed'
                    ? COLORS.textSecondary
                    : COLORS.grayText,
              },
            ]}>
            Completed
          </Text>
        </Pressable>
        <Pressable style={styles.filter} onPress={() => setFilter('Cancelled')}>
          <Text
            style={[
              styles.filterText,
              {
                color:
                  filter === 'Cancelled'
                    ? COLORS.textSecondary
                    : COLORS.grayText,
              },
            ]}>
            Cancelled
          </Text>
        </Pressable>
      </View>

      {/* Header */}
      <View style={styles.headers}>
        <View>
          <Text style={styles.text}>ID</Text>
        </View>

        <View>
          <Text style={styles.text}>Product Name</Text>
        </View>

        <View>
          <Text style={styles.text}>Status</Text>
        </View>

        <View>
          <Text style={[styles.text]}>Payment</Text>
        </View>

        <View>
          <Text style={[styles.text]}>Price</Text>
        </View>
      </View>

      {/* Transactions */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {transactions?.map((transaction, i) => (
          <TransactionRow
            key={i}
            transaction={transaction}
            onPress={() => navigate(routes.CUSTOMER_ORDER_DETAILS)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filter: {
    paddingVertical: SIZES.base / 2,
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  filterText: {
    color: COLORS.grayText,
  },
  headers: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: SIZES.base * 1.5,
    borderBottomWidth: 1,
    borderColor: COLORS.borderGray,
  },
  text: {
    color: COLORS.textPrimary,
    ...FONTS.medium,
    fontWeight: '500',
  },
});
