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
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../assets/themes';
import {
  setTotalCustomers,
  setTotalProducts,
  setTotalOrders,
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
import WalletBalance from './renderers/WalletBalance';
import Stores from './renderers/Stores';
import Recommendations from './renderers/Recommendations';
import UpdateSuccessful from '../../shared/components/UpdateSuccessful';
import {selectStoreDetails} from '../../redux/slices/store/selectors';

export default function Home({navigation}) {
  const user = useSelector(selectUser);
  const storeDetails = useSelector(selectStoreDetails);
  const dispatch = useDispatch();

  const [showNewStoreModal, setShowNewStoreModal] = useState(false);
  const [showStoresModal, setShowStoresModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // console.log('Fetching dashboard data');
      const {data} = await client.get('/api/dashboard');
      console.log('dashboard data');
      console.log(data);
      dispatch(setStoreDetails(data?.store));
      dispatch(setStoreUrl(data?.store_url));
      dispatch(setTotalCustomers(data?.customers));
      dispatch(setTotalProducts(data?.total_product));
      dispatch(setTotalOrders(data?.orders.length));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const getWalletBalance = useCallback(async () => {
    try {
      setWalletLoading(true);
      // console.log('Fetching wallet balance');
      const {data} = await client.get('/api/wallet');
      // console.log(data?.balance);
      dispatch(setWalletBalance(data?.balance.availableBalance));
      setWalletLoading(false);
    } catch (error) {
      setWalletLoading(false);
      // handleApiError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getWalletBalance();
  }, [getWalletBalance]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />

      <HomeHeader
        setShowStoresModal={setShowStoresModal}
        loading={loading}
        storeImageUrl={
          storeDetails?.logo == 'logo.png' ? null : storeDetails?.logo
        }
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl onRefresh={fetchDashboardData} refreshing={false} />
        }>
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
            <WalletBalance loading={walletLoading} />
            <StoreRevenue />
          </View>

          {/* <TouchableOpacity onPress={() => navigation.navigate('Finances')}>
            <Text>Go to finances</Text>
          </TouchableOpacity> */}

          {/* Business overview */}
          <BusinessOverview />

          {/* Missing actions */}
          <MissingActions />

          {/* Shortcuts */}
          <Shortcuts />

          {/* Recommendations */}
          <Recommendations />
        </View>
      </ScrollView>

      <Modal visible={showStoresModal} transparent={true} animationType="slide">
        <Stores
          setShowStoresModal={setShowStoresModal}
          setShowNewStoreModal={setShowNewStoreModal}
        />
      </Modal>

      <Modal
        visible={showNewStoreModal}
        transparent={true}
        animationType="slide">
        <NewStore
          setShowNewStoreModal={setShowNewStoreModal}
          setShowStoresModal={setShowStoresModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          message={'New store created'}
          subtitle={'You can now switch between stores'}
          onPress={() => setShowNewStoreModal(false)}
        />
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
