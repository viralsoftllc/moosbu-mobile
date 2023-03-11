import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import Search from '../../../shared/components/Search';
import UseIcon from '../../../shared/utils/UseIcon';
import TransactionHistory from './renderers/TransactionHistory';

export default function CustomerOrders() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Orders'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.overview, styles.flex]}>
        <View style={styles.overviewCol}>
          <Text style={styles.overviewTitle}>Total Order</Text>

          <View style={[styles.overviewFigures, styles.flex]}>
            <Text style={styles.overviewNumber}>27</Text>

            <UseIcon
              name="checkbox-blank-circle"
              type={'MaterialCommunityIcons'}
              size={verticalScale(9)}
              color={COLORS.pending}
            />
          </View>
        </View>

        <View style={styles.overviewCol}>
          <Text style={styles.overviewTitle}>Completed Order</Text>

          <View style={[styles.overviewFigures, styles.flex]}>
            <Text style={styles.overviewNumber}>17</Text>

            <UseIcon
              name="checkbox-blank-circle"
              type={'MaterialCommunityIcons'}
              size={verticalScale(9)}
              color={COLORS.credit}
            />
          </View>
        </View>

        <View style={styles.overviewCol}>
          <Text style={styles.overviewTitle}>Cancelled Order</Text>

          <View style={[styles.overviewFigures, styles.flex]}>
            <Text style={styles.overviewNumber}>7</Text>

            <UseIcon
              name="checkbox-blank-circle"
              type={'MaterialCommunityIcons'}
              size={verticalScale(9)}
              color={COLORS.debit}
            />
          </View>
        </View>
      </View>

      <Search filter={false} />

      <TransactionHistory />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  overview: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base,
    justifyContent: 'space-around',
    marginBottom: SIZES.base * 3,
  },
  overviewCol: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZES.base * 2,
  },
  overviewFigures: {
    marginTop: SIZES.base,
  },
  overviewTitle: {
    color: COLORS.white,
    ...FONTS.tiny,
    fontWeight: 'bold',
  },
  overviewNumber: {
    color: COLORS.white,
    marginRight: SIZES.base / 2,
    ...FONTS.large,
  },
});
