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
  Dimensions,
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
import {
  setStoreDetails,
  setStoreUrl,
  setStores,
} from '../../redux/slices/store/slice';
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
import {
  selectStoreDetails,
  selectStores,
} from '../../redux/slices/store/selectors';

import SwiperFlatList from 'react-native-swiper-flatlist';
import Test from '../Test';
import OneSignal from 'react-native-onesignal';

export default function Home({navigation}) {
  const user = useSelector(selectUser);
  const storeDetails = useSelector(selectStoreDetails);
  const stores = useSelector(selectStores);

  console.log(stores);
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
      // console.log(data);
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
      dispatch(setWalletBalance(data?.balance.availableBalance / 100));
      setWalletLoading(false);
    } catch (error) {
      setWalletLoading(false);
      // handleApiError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getWalletBalance();
  }, [getWalletBalance]);

  const fetchStores = useCallback(async () => {
    console.log('Fetching stores');
    setLoading(true);
    try {
      const res = await client.get('/api/get_stores');
      dispatch(setStores(res.data.data));
      // console.log(res.data.data);
      setLoading(false);
    } catch (error) {
      handleApiError(error);
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  useEffect(() => {
    const getID = async () => {
      const data = await OneSignal.getDeviceState();

      const playerID = data?.userId;
      console.log(playerID);

      console.log('Sending playerId');
      const res = await client.put('/api/update/PlayersID', {playerID});
      console.log('playid endpoint response', res.data);
    };

    getID();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />

      {loading ? (
        <Test />
      ) : (
        <>
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
              <RefreshControl
                onRefresh={() => {
                  fetchDashboardData();
                  fetchStores();
                }}
                refreshing={false}
              />
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
              {/* <ScrollView
            pagingEnabled
            indicatorStyle="black"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 40, padding: 20}}>
            <View style={{width: windowWidth - 100}}>
              <WalletBalance loading={walletLoading} />
            </View>
            <View style={{width: windowWidth - 100}}>
              <StoreRevenue />
            </View>
          </ScrollView> */}
              {/* <View style={{paddingVertical: 20}}>
            <SwiperFlatList
              paginationActiveColor={COLORS.primary}
              contentContainerStyle={{
                gap: 20,
                marginBottom: 20,
                paddingRight: 50,
              }}>
              <View style={{width: windowWidth - 40}}>
                <WalletBalance loading={walletLoading} />
              </View>
              <View style={{width: windowWidth - 60}}>
                <StoreRevenue />
              </View>
            </SwiperFlatList>
          </View> */}

              <View style={{marginVertical: 20}}>
                <WalletBalance />
              </View>

              {/* <TouchableOpacity
            onPress={() => navigation.navigate('SuccessfulRegistration')}>
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

          <Modal
            visible={showStoresModal}
            transparent={true}
            animationType="slide">
            <Stores
              setShowStoresModal={setShowStoresModal}
              setShowNewStoreModal={setShowNewStoreModal}
              level={user ? user?.plan : 1}
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
        </>
      )}
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
