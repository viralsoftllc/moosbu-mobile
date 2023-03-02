/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../assets/themes';
import UseIcon from '../../shared/utils/UseIcon';
import BusinessOverview from './renderers/BusinessOverview';
import HomeHeader from './renderers/HomeHeader';
import MissingActions from './renderers/MissingActions';
import Recommendations from './renderers/Recommendations';
import Shortcuts from './renderers/Shortcuts';
import StoreRevenue from './renderers/StoreRevenue';
import WalletBalance from './renderers/WalletBalance';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />

      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.main}>
          <View style={styles.welcomeTextView}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name={'hand-wave'}
              color={'#6A462F'}
              size={verticalScale(13)}
              // style={{transform: [{rotateX: '-90deg'}]}}
            />

            <Text style={styles.welcomeText}>
              Welcome, <Text style={styles.name}>Afolabi</Text>
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
    ...FONTS.h6,
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
