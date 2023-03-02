import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import ShippingCard from './renderer/ShippingCard';

export default function Shipping() {
  const {navigate} = useNavigation();
  // const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const items = [];
  const filteredItems = [];

  function handleNewItem() {
    navigate(routes.NEW_SHIPPING);
  }

  function handleEditItem() {
    navigate(routes.EDIT_SHIPPING);
  }

  return (
    <View style={styles.container}>
      <Search
        items={items}
        filteredItems={filteredItems}
        handleNewItem={handleNewItem}
        filter={false}
      />

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <ShippingCard
          title={'Free Shipping'}
          address={'Sabo, Yaba, Laogos Mainland'}
          time={'10:30-12:45 PM'}
          date={'21, Oct 2022'}
          price={'Free'}
          handleEditItem={handleEditItem}
        />
        <ShippingCard
          title={'Customer Pick-up'}
          address={'Onike-Ikeja, Lagos state'}
          time={'10:30-12:45 PM'}
          date={'21, Oct 2022'}
          price={1000}
          handleEditItem={handleEditItem}
        />
      </ScrollView>
    </View>
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
