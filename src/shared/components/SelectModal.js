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
import Test from '../../screens/Test';

export default function SelectModal({
  setShowModal,
  loading,
  filteredItems,
  selectedItem,
  handleSelect,
  title,
  keyLabel,
}) {
  console.log('filteredItems');
  console.log(filteredItems);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.header}>
        <Pressable
          style={styles.iconWrapper}
          onPress={() => setShowModal(false)}>
          <UseIcon
            type={'MaterialIcons'}
            name="arrow-back"
            color={COLORS.textPrimary}
          />
        </Pressable>

        <Text style={[FONTS.h5, styles.headerText]}>{title}</Text>
      </View>

      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.containerStyle}>
          {loading ? <Test /> : null}

          {filteredItems?.length > 0 ? (
            filteredItems?.map((item, i) => (
              <Pressable
                key={i}
                onPress={() => handleSelect(item)}
                style={styles.row}>
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
  iconWrapper: {
    alignSelf: 'flex-start',
    height: verticalScale(30),
    width: verticalScale(30),
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius / 2,
    margin: verticalScale(SIZES.base),
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
    fontFamily: 'Lato-Bold',
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
