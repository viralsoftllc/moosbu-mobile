import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import TransactionRow from './TransactionRow';

const transactions = [
  {
    type: 'Deposit',
    ref: 'MB-0000000001',
    status: 'Success',
    amount: '50,000',
    date: '12, June 2023-2:13:23',
  },
  {
    type: 'Send',
    ref: 'MB-0000000002',
    status: 'Sent',
    amount: '6,000',
    date: '10, June 2023-2:02:08',
  },
  {
    type: 'Withdraw',
    ref: 'MB-0000000003',
    status: 'Success',
    amount: '11,000',
    date: '2, June 2023-2:12:33',
  },
];

export default function TransactionHistory() {
  const [filter, setFilter] = useState('All');

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
        <UseIcon
          type={'MaterialIcons'}
          name="search"
          color={COLORS.grayText}
          size={22}
        />
      </View>

      {/* Filter options */}
      <View style={styles.filterContainer}>
        <Pressable style={styles.filter} onPress={() => setFilter('All')}>
          <Text
            style={[
              styles.filterText,
              {
                color:
                  filter === 'All' ? COLORS.textSecondary : COLORS.grayText,
              },
            ]}>
            All
          </Text>
        </Pressable>
        <Pressable style={styles.filter} onPress={() => setFilter('Send')}>
          <Text
            style={[
              styles.filterText,
              {
                color:
                  filter === 'Send' ? COLORS.textSecondary : COLORS.grayText,
              },
            ]}>
            Send
          </Text>
        </Pressable>
        <Pressable style={styles.filter} onPress={() => setFilter('Receive')}>
          <Text
            style={[
              styles.filterText,
              {
                color:
                  filter === 'Receive' ? COLORS.textSecondary : COLORS.grayText,
              },
            ]}>
            Receive
          </Text>
        </Pressable>
        <Pressable
          style={styles.filter}
          onPress={() => setFilter('Last 7 days')}>
          <Text
            style={[
              styles.filterText,
              {
                color:
                  filter === 'Last 7 days'
                    ? COLORS.textSecondary
                    : COLORS.grayText,
              },
            ]}>
            Last 7 days
          </Text>
        </Pressable>
      </View>

      {/* Transactions */}
      <View>
        {transactions?.map((transaction, i) => (
          <TransactionRow key={i} transaction={transaction} />
        ))}
      </View>
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.base * 3,
  },
  title: {
    ...FONTS.h5,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
