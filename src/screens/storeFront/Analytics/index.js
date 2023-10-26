import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../../assets/themes';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import ChartContainer from './renderers/ChartContainer';
import client from '../../../shared/api/client';
import handleApiError from '../../../shared/components/handleApiError';
import Loader from '../../../shared/components/Loader';
import {useSelector} from 'react-redux';
import {selectStoreDetails} from '../../../redux/slices/store/selectors';
import {selectTotalCustomers} from '../../../redux/slices/businessOvervew/selectors';

export default function Analytics() {
  const {setOptions} = useNavigation();
  const store = useSelector(selectStoreDetails);
  const businessOvervew = useSelector(selectTotalCustomers);

  console.log(businessOvervew);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <ScreenHeader
          title={'Analytics'}
          subtitle="Check your business stat today"
        />
      ),
    });
    return () => {};
  }, [setOptions]);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);

      const res = await client.get('/api/analytic/sales');

      const formatted = Object.entries(res.data)?.map((item, index) => ({
        title: item?.[0],
        value: Number(item?.[1]),
        index: index + 1,
        currency: item?.[0]?.includes('amount') ? store?.currency : '',
      }));

      setData(formatted);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, [store]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={COLORS.primary} />
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.contentContainerStyle,
            {paddingHorizontal: Platform.OS == 'ios' ? 20 : 0},
          ]}>
          {loading ? (
            <Loader loading={loading} />
          ) : (
            <ChartContainer data={data} />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    paddingBottom: SIZES.base * 2,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  container: {
    flex: 1,
    paddingTop: SIZES.base * 2,
  },
  pageHeaderView: {
    marginBottom: SIZES.base * 3,
  },
  pageHeader: {
    ...FONTS.h5,
    marginBottom: SIZES.base / 5,
    color: COLORS.textPrimary,
  },
  pageSubheader: {
    ...FONTS.medium,
    fontWeight: '400',
    color: COLORS.textGray,
  },
});
