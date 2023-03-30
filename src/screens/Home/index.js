/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Modal,
  RefreshControl,
  Pressable,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../assets/themes';
import {
  setTotalCustomers,
  setTotalProducts,
} from '../../redux/slices/businessOvervew/slice';
import {setStoreDetails, setStoreUrl} from '../../redux/slices/store/slice';
import {selectUser} from '../../redux/slices/user/selectors';
import {setWalletBalance} from '../../redux/slices/wallet/slice';
import client from '../../shared/api/client';
import handleApiError from '../../shared/components/handleApiError';
import UseIcon from '../../shared/utils/UseIcon';
import BusinessOverview from './renderers/BusinessOverview';
import HomeHeader from './renderers/HomeHeader';
import MissingActions from './renderers/MissingActions';
import NewStore from './renderers/NewStore';
// import Recommendations from './renderers/Recommendations';
import Shortcuts from './renderers/Shortcuts';
import StoreRevenue from './renderers/StoreRevenue';
import Subscriptions from './renderers/Subscriptions';
import WalletBalance from './renderers/WalletBalance';

export default function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [showNewStoreModal, setShowNewStoreModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCta, setShowCta] = useState(false);

  // async function getData() {
  //   try {
  //     console.log('Fetching new data');
  //     const {data} = await client.get('/api/dashboard');
  //     dispatch(setStoreDetails(data?.store));
  //     dispatch(setStoreUrl(data?.store_url));
  //     console.log(data);
  //   } catch (error) {
  //     handleApiError(error);
  //   }
  // }

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // console.log('Fetching dashboard data');
      const {data} = await client.get('/api/dashboard');
      dispatch(setStoreDetails(data?.store));
      dispatch(setStoreUrl(data?.store_url));
      dispatch(setWalletBalance(data?.$wallet_balance?.balance));
      dispatch(setTotalCustomers(data?.$customers));
      dispatch(setTotalProducts(data?.total_product));
      // console.log(data?.$wallet_balance?.balance);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  function handleCloseCta() {
    if (showCta) {
      setShowCta(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Pressable style={{flex: 1}} onPress={handleCloseCta}> */}
      <HomeHeader
        setShowNewStoreModal={setShowNewStoreModal}
        setShowSubscriptionModal={setShowSubscriptionModal}
        showCta={showCta}
        setShowCta={setShowCta}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl onRefresh={fetchDashboardData} refreshing={loading} />
        }>
        <Pressable onPress={handleCloseCta}>
          <View style={styles.main}>
            <View style={styles.welcomeTextView}>
              <UseIcon
                type={'MaterialCommunityIcons'}
                name={'hand-wave'}
                color={'#6A462F'}
                size={verticalScale(13)}
              />

              <Text style={styles.welcomeText}>
                Welcome{' '}
                <Text style={styles.name}>{user ? user?.name : 'back'}</Text>
              </Text>
            </View>

            {/* wallet and revenue */}
            <View style={styles.balances}>
              <WalletBalance />
              <StoreRevenue />
            </View>

            {/* Business overview */}
            <BusinessOverview />

            {/* Missing actions */}
            <MissingActions />

            {/* Shortcuts */}
            <Shortcuts />

            {/* Recommendations */}
            {/* <Recommendations /> */}
          </View>
        </Pressable>
      </ScrollView>
      {/* </Pressable> */}

      <Modal
        visible={showNewStoreModal}
        transparent={true}
        animationType="slide">
        <NewStore setShowNewStoreModal={setShowNewStoreModal} />
      </Modal>

      <Modal
        visible={showSubscriptionModal}
        transparent={true}
        animationType="slide">
        <Subscriptions setShowSubscriptionModal={setShowSubscriptionModal} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  balances: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SIZES.base * 2,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackground,
  },
  main: {
    backgroundColor: COLORS.white,
    flex: 1,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    paddingTop: SIZES.base * 2,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  name: {
    ...FONTS.h5,
    color: COLORS.textPrimary,
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: SIZES.base * 1.5,
  },
  welcomeTextView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    marginLeft: SIZES.base / 2,
    ...FONTS.regular,
    fontWeight: '300',
    color: COLORS.textPrimary,
  },
});
