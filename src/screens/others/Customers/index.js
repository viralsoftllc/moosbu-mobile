import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import CustomerCard from './renderer/CustomerCard';

export default function Customers() {
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Customers'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <Search filter={false} />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <CustomerCard
          name={'Joshua Moosbu'}
          email={'Joshuamoosbu@org.ng'}
          phone="0802222333444"
          onPress={() => navigate(routes.CUSTOMER_ORDER)}
        />
        <CustomerCard
          name={'Joshua Moosbu'}
          email={'Joshuamoosbu@org.ng'}
          phone="0802222333444"
          onPress={() => navigate(routes.CUSTOMER_ORDER)}
        />
        <CustomerCard
          name={'Joshua Moosbu'}
          email={'Joshuamoosbu@org.ng'}
          phone="0802222333444"
          onPress={() => navigate(routes.CUSTOMER_ORDER)}
        />
      </ScrollView>
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
});
