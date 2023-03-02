import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import LocationCard from './renderer/LocationCard';

export default function Location() {
  const {navigate} = useNavigation();
  // const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const items = [];
  const filteredItems = [];

  function handleNewItem() {
    navigate(routes.NEW_LOCATION);
  }

  function handleEditItem() {
    navigate(routes.EDIT_LOCATION);
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
        <LocationCard
          title={'Lagos state, Nigeria'}
          address={'Cover all area in Lagos State.'}
          time={'10:30-12:45 PM'}
          date={'21, Oct 2022'}
          handleEditItem={handleEditItem}
        />

        <LocationCard
          title={'Ikotun, Nigeria'}
          address={'Cover all area in Lagos State.'}
          time={'10:30-12:45 PM'}
          date={'21, Oct 2022'}
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
