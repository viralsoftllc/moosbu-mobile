import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import SearchBar from 'react-native-platform-searchbar';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, SIZES} from '../../assets/themes';
import UseIcon from '../utils/UseIcon';

export default function Search({
  items,
  filteredItems,
  handleNewItem,
  filter = true,
  placeholder,
}) {
  const [searchText, setSearchText] = useState('');

  const searchFilterFunction = text => {
    if (text) {
      const newdata = items?.filter(item => {
        const itemData = item?.displayName
          ? item?.displayName.toLowerCase()
          : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData?.indexOf(textData) > -1;
      });

      filteredItems(newdata);
      setSearchText(text);
    } else {
      filteredItems(items);
      setSearchText(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchView}>
        <SearchBar
          placeholder={placeholder}
          value={searchText}
          onChangeText={text => searchFilterFunction(text.trim())}
          onClear={text => searchFilterFunction('')}
          style={styles.search}
          inputStyle={styles.inputStyle}
          platform={'ios'}
        />
      </View>

      {filter ? (
        <View style={styles.iconView}>
          <UseIcon
            type={'AntDesign'}
            name="filter"
            color={COLORS.textPrimary}
          />
        </View>
      ) : null}

      {handleNewItem ? (
        <Pressable
          style={[styles.iconView, styles.plusIcon]}
          onPress={handleNewItem}>
          <UseIcon type={'AntDesign'} name="plus" color={COLORS.white} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: SIZES.base * 2,
  },
  iconView: {
    borderWidth: 1,
    borderColor: COLORS.grayText,
    height: verticalScale(32),
    width: verticalScale(40),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius / 2,
    marginLeft: SIZES.base,
  },
  inputStyle: {
    backgroundColor: COLORS.white,
    height: verticalScale(32),
  },
  plusIcon: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  search: {
    height: verticalScale(32),
    borderWidth: 1,
    borderRadius: SIZES.radius / 2,
    borderColor: COLORS.borderGray,
    overflow: 'hidden',
  },
  searchView: {
    flex: 1,
  },
});
