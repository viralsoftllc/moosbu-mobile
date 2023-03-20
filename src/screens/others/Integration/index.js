import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import routes from '../../../shared/constants/routes';
import UseIcon from '../../../shared/utils/UseIcon';

export default function Integration() {
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Integration'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cards}>
        <Pressable
          style={styles.card}
          onPress={() => navigate(routes.PAYMENT_PROVIDER)}>
          <View style={styles.cardInner}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="credit-card-outline"
              color={COLORS.secondary}
            />
            <Text style={styles.cardText}>Payment Providers</Text>
          </View>
        </Pressable>

        <Pressable
          style={[styles.card, styles.logistics]}
          onPress={() => navigate(routes.LOGISTICS_PROVIDER)}>
          <View style={styles.cardInner}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="truck-outline"
              color={COLORS.secondary}
            />
            <Text style={styles.cardText}>Logistic Providers</Text>
          </View>
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
    backgroundColor: '#E7FFF3',
    height: verticalScale(120),
    borderRadius: SIZES.radius,
    width: '45%',
    margin: SIZES.base / 2,
    paddingHorizontal: SIZES.base,
  },
  cardText: {
    color: COLORS.textPrimary,
    ...FONTS.tiny,
    marginLeft: SIZES.base / 2,
  },
  cardInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.base,
    borderWidth: 1,
    borderRadius: SIZES.radius * 2,
    borderColor: COLORS.borderGray,
  },
  logistics: {
    backgroundColor: '#F5F1DA',
  },
});
