import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, SIZES} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import routes from '../../../shared/constants/routes';
import UseIcon from '../../../shared/utils/UseIcon';

export default function StoreSettings() {
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Store setting'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cards}>
        <Pressable
          style={styles.card}
          onPress={() => navigate(routes.GENERAL_SETTINGS)}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="shopping-outline"
            color={COLORS.secondary}
          />
          <Text style={styles.cardText}>Store Settings</Text>
        </Pressable>

        <Pressable
          style={[styles.card, styles.currency]}
          onPress={() => navigate(routes.CURRENCY_SETTINGS)}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="bank"
            color={COLORS.secondary}
          />
          <Text style={styles.cardText}>Currency Settings</Text>
        </Pressable>

        <Pressable style={[styles.card, styles.kyc]}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="card-account-details-outline"
            color={COLORS.secondary}
          />
          <Text style={styles.cardText}>KYC</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    height: verticalScale(120),
    borderRadius: SIZES.radius,
    width: '40%',
    margin: SIZES.base,
  },
  cardText: {
    color: COLORS.textPrimary,
    marginTop: SIZES.base / 2,
  },
  currency: {
    backgroundColor: '#F5F1DA',
  },
  kyc: {
    backgroundColor: '#E7FFF3',
  },
});
