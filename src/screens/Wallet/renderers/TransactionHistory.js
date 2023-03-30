import React, {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import TransactionRow from './TransactionRow';

// const transactions = [
//   {
//     type: 'Deposit',
//     ref: 'MB-0000000001',
//     status: 'Success',
//     amount: '50,000',
//     date: '12, June 2023-2:13:23',
//   },
//   {
//     type: 'Send',
//     ref: 'MB-0000000002',
//     status: 'Sent',
//     amount: '6,000',
//     date: '10, June 2023-2:02:08',
//   },
//   {
//     type: 'Withdraw',
//     ref: 'MB-0000000003',
//     status: 'Success',
//     amount: '11,000',
//     date: '2, June 2023-2:12:33',
//   },
// ];

export default function TransactionHistory({loading, transactions}) {
  const [showFilter, setShowFilter] = useState(false);
  const [filterBy, setFilterBy] = useState('All');

  function handleFilter(params) {
    setFilterBy(params);
    setShowFilter(false);
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>

        {/* Filter options */}
        <View style={styles.transactionFilter}>
          <Pressable
            onPress={() => setShowFilter(!showFilter)}
            style={styles.transactionFilterHeader}>
            <Text style={styles.transactionFilterText}>{filterBy}</Text>
            <UseIcon type={'MaterialIcons'} name="keyboard-arrow-down" />
          </Pressable>

          {showFilter ? (
            <View style={styles.filterOptions}>
              <Pressable
                style={styles.filterOption}
                onPress={() => handleFilter('All')}>
                <Text style={styles.filterOptionText}>All</Text>
              </Pressable>

              <Pressable
                style={styles.filterOption}
                onPress={() => handleFilter('Sent')}>
                <Text style={styles.filterOptionText}>Sent</Text>
              </Pressable>

              <Pressable
                style={styles.filterOption}
                onPress={() => handleFilter('Received')}>
                <Text style={styles.filterOptionText}>Received</Text>
              </Pressable>

              <Pressable
                style={styles.filterOption}
                onPress={() => handleFilter('Last 7 days')}>
                <Text style={styles.filterOptionText}>Last 7 days</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </View>

      {/* Transactions */}
      <View style={styles.transactions}>
        {loading ? <ActivityIndicator size={'small'} /> : null}

        {transactions?.map((transaction, i) => (
          <TransactionRow key={i} transaction={transaction} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.base * 3,
    position: 'relative',
    marginTop: SIZES.base,
  },
  title: {
    ...FONTS.h5,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  transactionFilter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: COLORS.white,
    flex: 1,
  },
  transactionFilterHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionFilterText: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
    fontWeight: '200',
    marginRight: SIZES.base / 5,
  },
  filterOptions: {
    position: 'absolute',
    top: verticalScale(27),
    right: 0,
    // borderWidth: 1,
    zIndex: 100,
    paddingTop: SIZES.base,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  filterOption: {
    borderBottomWidth: 1,
    paddingHorizontal: SIZES.base * 3,
    paddingVertical: SIZES.base,
    borderColor: COLORS.borderGray,
    backgroundColor: COLORS.white,
  },
  filterOptionText: {
    color: COLORS.textPrimary,
  },
  transactions: {
    zIndex: -1,
  },
});
