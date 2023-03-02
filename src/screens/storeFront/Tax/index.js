import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import UseIcon from '../../../shared/utils/UseIcon';
import TaxCard from './renderer/TaxCard';

export default function Tax() {
  const {setOptions} = useNavigation();
  const {navigate} = useNavigation();
  // const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const items = [];
  const filteredItems = [];

  function handleNewItem() {
    navigate(routes.NEW_TAX);
  }

  function handleEditItem() {
    navigate(routes.EDIT_TAX);
  }

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Tax'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Search
          items={items}
          filteredItems={filteredItems}
          handleNewItem={handleNewItem}
        />

        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <TaxCard
            title={'VAT'}
            subtitle="Value added tax charge on items purchased"
            amount={'7%'}
            icon={
              <UseIcon
                name="ticket-percent-outline"
                type={'MaterialCommunityIcons'}
                color={COLORS.textPrimary}
              />
            }
            handleEditItem={handleEditItem}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
});
