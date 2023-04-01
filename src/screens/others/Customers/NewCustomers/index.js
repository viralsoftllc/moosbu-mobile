import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import {selectCustomers} from '../../../../redux/slices/customers/selectors';
import {COLORS, SIZES} from '../../../../assets/themes';
import routes from '../../../../shared/constants/routes';
import CustomerCard from '../renderer/CustomerCard';
import EmptyItemInfo from '../../../../shared/components/EmptyItemInfo';
import Search from '../../../../shared/components/Search';

export default function NewCustomers() {
  const {navigate} = useNavigation();
  const customers = useSelector(selectCustomers);

  // const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Search filter={false} />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {/* {loading ? <ActivityIndicator size={'large'} /> : null} */}

        {!customers?.length ? (
          <EmptyItemInfo message={'No customers to display'} />
        ) : null}

        {customers?.length
          ? customers?.map((item, i) => (
              <CustomerCard
                customer={item}
                key={i}
                onPress={() => navigate(routes.CUSTOMER_ORDER)}
              />
            ))
          : null}
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
