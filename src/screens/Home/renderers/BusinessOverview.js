import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import {
  // selectTotalConversions,
  selectTotalCustomers,
  selectTotalOrders,
  selectTotalProducts,
  // selectTotalStoreVisits,
} from '../../../redux/slices/businessOvervew/selectors';
import UseIcon from '../../../shared/utils/UseIcon';
import BusinessOverviewCard from './BusinessOverviewCard';

export default function BusinessOverview() {
  const [showFilter, setShowFilter] = useState(false);
  const [filterBy, setFilterBy] = useState('Today');

  const totalCustomers = useSelector(selectTotalCustomers);
  const totalProducts = useSelector(selectTotalProducts);
  const totalOrders = useSelector(selectTotalOrders);
  // const totalStoreVisits = useSelector(selectTotalStoreVisits);
  // const totalConversions = useSelector(selectTotalConversions);

  function handleFilter(params) {
    setFilterBy(params);
    setShowFilter(false);
  }

  return (
    <View>
      <View style={styles.businessOverviewHeader}>
        <Text style={styles.sectionTitle}>Business Overview</Text>

        {/* <View style={styles.businessOverviewPeriod}>
          <Pressable
            onPress={() => setShowFilter(!showFilter)}
            style={styles.businessOverviewPeriodHeader}>
            <Text style={styles.businessOverviewPeriodText}>{filterBy}</Text>
            <UseIcon type={'MaterialIcons'} name="keyboard-arrow-down" />
          </Pressable>

          {showFilter ? (
            <View style={styles.filterOptions}>
              <Pressable
                style={styles.filterOption}
                onPress={() => handleFilter('Today')}>
                <Text style={styles.filterOptionText}>Today</Text>
              </Pressable>

              <Pressable
                style={styles.filterOption}
                onPress={() => handleFilter('This week')}>
                <Text style={styles.filterOptionText}>This week</Text>
              </Pressable>

              <Pressable
                style={styles.filterOption}
                onPress={() => handleFilter('Last 7 days')}>
                <Text style={styles.filterOptionText}>Last 7 days</Text>
              </Pressable>

              <Pressable
                style={styles.filterOption}
                onPress={() => handleFilter('Last month')}>
                <Text style={styles.filterOptionText}>Last month</Text>
              </Pressable>
            </View>
          ) : null}
        </View> */}
      </View>

      {/* Cards */}
      <View style={styles.businessOverviewCards}>
        <BusinessOverviewCard
          icon={
            <UseIcon
              type={'Fontisto'}
              name="person"
              size={14}
              color={COLORS.black}
            />
          }
          label="Total Customers"
          amount={totalCustomers}
          percent={9}
          backgroundColor="#E4F4F1"
        />

        <BusinessOverviewCard
          icon={
            <UseIcon
              type={'Feather'}
              name="box"
              size={14}
              color={COLORS.black}
            />
          }
          label="Total Products"
          amount={totalProducts}
          percent={36}
          backgroundColor="#F5F1DA"
        />

        <BusinessOverviewCard
          icon={
            <UseIcon
              type={'SimpleLineIcons'}
              name="handbag"
              size={14}
              color={COLORS.black}
            />
          }
          label="Total Order"
          amount={totalOrders}
          percent={29}
          backgroundColor="#EEF1F6"
        />
      </View>

      {/* <View style={styles.businessOverviewCards}>
        <BusinessOverviewCard
          icon={
            <UseIcon
              type={'Ionicons'}
              name="people-outline"
              size={14}
              color={COLORS.black}
            />
          }
          label="Total Store visit"
          amount={totalStoreVisits}
          percent={13}
          backgroundColor="#ECECFF"
        />

        <BusinessOverviewCard
          icon={
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="chart-timeline-variant"
              size={14}
              color={COLORS.black}
            />
          }
          label="Total Conversion"
          amount={totalConversions}
          percent={14}
          backgroundColor="#E2E2E2"
        />

        <View style={styles.emptyView} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  businessOverviewCards: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.base * 1.5,
  },
  businessOverviewHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: SIZES.base * 1.5,
  },
  businessOverviewPeriod: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  businessOverviewPeriodHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  businessOverviewPeriodText: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
    fontWeight: '200',
    marginRight: SIZES.base / 5,
  },
  emptyView: {width: '31%'},
  sectionTitle: {
    ...FONTS.h5,
    color: COLORS.textPrimary,
  },
  filterOptions: {
    position: 'absolute',
    top: verticalScale(27),
    right: 0,
    // borderWidth: 1,
    zIndex: 10,
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
  },
  filterOptionText: {
    color: COLORS.textPrimary,
  },
});
