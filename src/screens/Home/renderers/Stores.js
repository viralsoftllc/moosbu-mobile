import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';

import UseIcon from '../../../shared/utils/UseIcon';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import ImageIcon from '../../../shared/components/ImageIcon';
// import FormButton from '../../../shared/components/FormButton';
import {useSelector} from 'react-redux';
import {selectStoreDetails} from '../../../redux/slices/store/selectors';

export default function Stores({setShowStoresModal, setShowNewStoreModal}) {
  const store = useSelector(selectStoreDetails);
  const [selectedStore, setSelectedStore] = useState(store?.id);

  function handleNewStore() {
    setShowStoresModal(false);
    setShowNewStoreModal(true);
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <Pressable
            onPress={() => {
              setShowStoresModal(false);
            }}
            style={styles.closeBtn}>
            <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
          </Pressable>

          <Pressable onPress={handleNewStore} style={styles.flex}>
            <UseIcon name="plus" type={'AntDesign'} />
            <Text style={styles.title}>Add New Store</Text>
          </Pressable>

          <View style={styles.stores}>
            <Pressable style={[styles.flex, styles.store]}>
              <ImageIcon margin={0} size={scale(25)} />

              <Text style={styles.storeName}>{store?.name}</Text>

              <UseIcon
                name={
                  store?.id === selectedStore
                    ? 'checkbox-marked-circle'
                    : 'checkbox-blank-circle-outline'
                }
                type={'MaterialCommunityIcons'}
                size={scale(18)}
                color={
                  store?.id === selectedStore
                    ? COLORS.credit
                    : COLORS.borderGray
                }
              />
            </Pressable>
          </View>

          {/* <FormButton
            title={'Add Store'}
            buttonStyle={styles.buttonStyle}
            onPress={handleNewStore}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base,
    paddingBottom: SIZES.base * 2,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  safeAreaView: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: SIZES.base * 1.3,
  },
  title: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
    flex: 1,
    marginLeft: SIZES.base,
  },
  closeBtn: {
    padding: SIZES.base,
    alignSelf: 'flex-end',
  },
  stores: {
    marginBottom: SIZES.base * 3,
  },
  store: {
    borderWidth: 1,
    paddingLeft: SIZES.base * 2,
    paddingRight: SIZES.base,
    paddingVertical: SIZES.base / 1.3,
    borderRadius: SIZES.radius / 2,
    borderColor: COLORS.borderGray,
  },
  storeName: {
    flex: 1,
    marginHorizontal: SIZES.base * 2,
    color: COLORS.black,
    ...FONTS.regular,
  },
  buttonStyle: {
    width: '80%',
    alignSelf: 'center',
  },
});
