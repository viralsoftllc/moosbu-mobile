/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../assets/themes';
import {selectUser} from '../../redux/slices/user/selectors';
// import client from '../../shared/api/client';
// import handleApiError from '../../shared/components/handleApiError';
import UseIcon from '../../shared/utils/UseIcon';
import BusinessOverview from './renderers/BusinessOverview';
import HomeHeader from './renderers/HomeHeader';
import MissingActions from './renderers/MissingActions';
import NewStore from './renderers/NewStore';
import Recommendations from './renderers/Recommendations';
import Shortcuts from './renderers/Shortcuts';
import StoreRevenue from './renderers/StoreRevenue';
import Subscriptions from './renderers/Subscriptions';
import WalletBalance from './renderers/WalletBalance';

export default function Home() {
  const user = useSelector(selectUser);
  const [showNewStoreModal, setShowNewStoreModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  async function getAllCategories() {
    // try {
    //   const {data} = await client.get('/api/marketing');
    //   console.log(data);
    // } catch (error) {
    //   handleApiError(error);
    // }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader
        setShowNewStoreModal={setShowNewStoreModal}
        setShowSubscriptionModal={setShowSubscriptionModal}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}>
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
          <Recommendations />
        </View>
      </ScrollView>

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
