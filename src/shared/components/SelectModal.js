import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import UseIcon from '../utils/UseIcon';
import {COLORS, FONTS, SIZES} from '../../assets/themes';

export default function SelectModal({
  setShowModal,
  loading,
  filteredItems,
  selectedItem,
  handleSelect,
  title,
  keyLabel,
}) {
  console.log('selectedItem');
  console.log(selectedItem);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.header}>
        <Pressable style={styles.closeIcon} onPress={() => setShowModal(false)}>
          <UseIcon
            type="Ionicons"
            name="close-outline"
            size={verticalScale(25)}
          />
        </Pressable>

        <Text style={[FONTS.h5, styles.headerText]}>{title}</Text>
      </View>

      {/* <View
        style={{
          paddingHorizontal: SIZES.paddingHorizontal,
        }}>
        <SearchBar2
          theme="light"
          placeholder="Search for bank"
          searchIcon={{size: verticalScale(20), color: COLORS.black}}
          style={{marginVertical: SIZES.base}}
          inputStyle={styles.search}
          value={searchText}
          onChangeText={text => searchFilterFunction(text.trim())}
          onClear={text => searchFilterFunction('')}
        />
      </View> */}

      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.containerStyle}>
          {loading ? (
            <ActivityIndicator size={'large'} color={COLORS.primary} />
          ) : null}

          {filteredItems?.length > 0 ? (
            filteredItems?.map((item, i) => (
              <Pressable
                key={i}
                onPress={() => handleSelect(item)}
                style={styles.row}>
                {/* <View style={styles.iconView}>
                  <UseIcon
                    type="MaterialCommunityIcons"
                    size={verticalScale(14)}
                    name={'bank'}
                    color={COLORS.black}
                  />
                </View> */}

                <Text style={styles.text}>{item?.name}</Text>

                {!keyLabel && selectedItem?.id === item?.id ? (
                  <UseIcon
                    type="MaterialIcons"
                    name={'check'}
                    size={verticalScale(14)}
                    color={
                      selectedItem?.id === item?.id
                        ? COLORS.credit
                        : COLORS.grey
                    }
                  />
                ) : null}

                {keyLabel && selectedItem?.[keyLabel] === item?.[keyLabel] ? (
                  <UseIcon
                    type="MaterialIcons"
                    name={'check'}
                    size={verticalScale(14)}
                    color={
                      selectedItem?.id === item?.id
                        ? COLORS.credit
                        : COLORS.grey
                    }
                  />
                ) : null}
              </Pressable>
            ))
          ) : (
            <Text style={styles.emptyBank}>No items to display</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: verticalScale(10),
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: verticalScale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: SIZES.base * 3,
    color: COLORS.black,
  },
  containerStyle: {
    padding: 0,
    marginVertical: 20,
    backgroundColor: COLORS.white,
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  inputContainerStyle: {
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    backgroundColor: COLORS.white,
    marginBottom: 5,
  },
  search: {
    color: COLORS.black,
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.white,
    borderWidth: 0.3,
    borderColor: COLORS.grey2,
  },
  closeIcon: {
    padding: 10,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyBank: {
    textAlign: 'center',
    ...FONTS.regular,
    color: COLORS.textGray,
  },
  row: {
    paddingHorizontal: SIZES.base,
    // paddingLeft: SIZES.base / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.base * 2,
    borderBottomWidth: 1,
    paddingBottom: SIZES.base,
    borderColor: COLORS.borderGray,
  },
  text: {
    flex: 1,
    paddingHorizontal: SIZES.base,
    color: COLORS.black,
    ...FONTS.medium,
    fontWeight: 'bold',
  },
  iconView: {
    borderRadius: 50,
    height: verticalScale(35),
    width: verticalScale(35),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.tabBg,
    overflow: 'hidden',
  },
});
