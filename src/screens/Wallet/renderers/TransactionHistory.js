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

// const _transactions = [
//   {
//     amount: 1200,
//     created_at: '2022-09-30T12:12:36.000000Z',
//     flow: '',
//     flw_ref: '',
//     id: 2,
//     status: 'success',
//     store_id: 9,
//     trx_id: 2147483647,
//     trx_ref: '2142424747',
//     type: 'Order',
//     updated_at: '2022-09-30T12:12:36.000000Z',
//   },
//   {
//     amount: 1150,
//     created_at: '2022-10-03T14:29:00.000000Z',
//     flow: '',
//     flw_ref: '',
//     id: 3,
//     status: 'pending',
//     store_id: 9,
//     trx_id: 1664807340,
//     trx_ref: 'f6o4959kzg',
//     type: 'Withdraw',
//     updated_at: '2022-10-03T14:29:00.000000Z',
//   },
//   {
//     amount: 1200,
//     created_at: '2022-10-21T12:18:43.000000Z',
//     flow: '',
//     flw_ref: '',
//     id: 4,
//     status: 'success',
//     store_id: 9,
//     trx_id: 2147483647,
//     trx_ref: '2208170918',
//     type: 'Order',
//     updated_at: '2022-10-21T12:18:43.000000Z',
//   },
//   {
//     amount: 1200,
//     created_at: '2023-01-03T02:02:28.000000Z',
//     flow: '',
//     flw_ref: '',
//     id: 5,
//     status: 'success',
//     store_id: 9,
//     trx_id: 2147483647,
//     trx_ref: '2418256475',
//     type: 'Order',
//     updated_at: '2023-01-03T02:02:28.000000Z',
//   },
//   {
//     amount: 1000,
//     created_at: '2023-02-01T21:40:32.000000Z',
//     flow: '',
//     flw_ref: '',
//     id: 6,
//     status: 'pending',
//     store_id: 9,
//     trx_id: 1675287632,
//     trx_ref: 'gq4ddyn65d-s3ye8654p',
//     type: 'Withdraw',
//     updated_at: '2023-02-01T21:40:32.000000Z',
//   },
//   {
//     amount: 1000,
//     created_at: '2023-02-01T21:40:37.000000Z',
//     flow: '',
//     flw_ref: '',
//     id: 7,
//     status: 'pending',
//     store_id: 9,
//     trx_id: 1675287637,
//     trx_ref: '7txl2z7vxsichhtz5uec',
//     type: 'Withdraw',
//     updated_at: '2023-02-01T21:40:37.000000Z',
//   },
//   {
//     amount: 500,
//     created_at: '2023-05-09T19:20:15.000000Z',
//     flow: 'in',
//     flw_ref: '',
//     id: 8,
//     status: 'initialized',
//     store_id: 9,
//     trx_id: 1683660015,
//     trx_ref: 'b81z88m0g0',
//     type: 'Funding',
//     updated_at: '2023-05-09T19:20:15.000000Z',
//   },
//   {
//     amount: 100,
//     created_at: '2023-05-11T00:58:54.000000Z',
//     flow: 'in',
//     flw_ref: '',
//     id: 9,
//     status: 'initialized',
//     store_id: 9,
//     trx_id: 1683766734,
//     trx_ref: '5cjoqe7ybs',
//     type: 'Funding',
//     updated_at: '2023-05-11T00:58:54.000000Z',
//   },
//   {
//     amount: 100,
//     created_at: '2023-05-16T14:51:35.000000Z',
//     flow: 'in',
//     flw_ref: '',
//     id: 10,
//     status: 'initialized',
//     store_id: 9,
//     trx_id: 1684248695,
//     trx_ref: '0trm8yircl',
//     type: 'Funding',
//     updated_at: '2023-05-16T14:51:35.000000Z',
//   },
//   {
//     amount: 100,
//     created_at: '2023-05-16T21:08:27.000000Z',
//     flow: 'in',
//     flw_ref: '',
//     id: 15,
//     status: 'success',
//     store_id: 9,
//     trx_id: 1684271307,
//     trx_ref: 'yajn3rgtlx',
//     type: 'Funding',
//     updated_at: '2023-05-16T21:09:23.000000Z',
//   },
//   {
//     amount: 100,
//     created_at: '2023-05-16T21:10:04.000000Z',
//     flow: 'in',
//     flw_ref: '',
//     id: 16,
//     status: 'success',
//     store_id: 9,
//     trx_id: 1684271404,
//     trx_ref: 'wlhsxspg2w',
//     type: 'Funding',
//     updated_at: '2023-05-16T21:10:46.000000Z',
//   },
// ];

export default function TransactionHistory({loading, transactions}) {
  const [showFilter, setShowFilter] = useState(false);
  const [filterBy, setFilterBy] = useState('All');
  console.log(transactions);

  function handleFilter(params) {
    setFilterBy(params);
    setShowFilter(false);
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>

        {/* Filter options */}
        {/* <View style={styles.transactionFilter}>
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
        </View> */}
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
