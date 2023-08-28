import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import SearchBar from 'react-native-platform-searchbar';
import {verticalScale} from 'react-native-size-matters';

import {selectCustomers} from '../../../../redux/slices/customers/selectors';
import {COLORS, SIZES} from '../../../../assets/themes';
import routes from '../../../../shared/constants/routes';
import CustomerCard from '../renderer/CustomerCard';
import EmptyItemInfo from '../../../../shared/components/EmptyItemInfo';

export default function NewCustomers() {
  const {navigate} = useNavigation();
  const customers = useSelector(selectCustomers);

  // const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const searchFilterFunction = text => {
    if (text) {
      const newdata = customers?.filter(item => {
        const itemData = item?.name
          ? item?.name.toLowerCase()
          : ''.toLowerCase();

        const textData = text.toLowerCase();

        return itemData?.indexOf(textData) > -1;
      });

      setFilteredItems(newdata);
      setSearchText(text);
    } else {
      setFilteredItems(customers);
      setSearchText(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchView}>
        <SearchBar
          placeholder={'Search customer'}
          value={searchText}
          onChangeText={text => searchFilterFunction(text.trim())}
          onClear={text => searchFilterFunction('')}
          style={styles.search}
          inputStyle={styles.inputStyle}
          platform={'ios'}
        />
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {/* {loading ? <ActivityIndicator size={'large'} /> : null} */}

        {!customers?.length ? (
          <EmptyItemInfo message={'No customers to display'} />
        ) : null}

        {filteredItems?.length
          ? filteredItems?.map((item, i) => (
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
    paddingVertical: SIZES.base * 2,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingBottom: SIZES.base * 2,
  },
  search: {
    height: verticalScale(32),
    borderWidth: 1,
    borderRadius: SIZES.radius / 2,
    borderColor: COLORS.borderGray,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  searchView: {
    marginHorizontal: SIZES.base,
    marginBottom: SIZES.base * 2,
  },
  inputStyle: {
    backgroundColor: COLORS.white,
    height: verticalScale(32),
  },
});
