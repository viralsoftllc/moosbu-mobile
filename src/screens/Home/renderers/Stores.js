import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';

import UseIcon from '../../../shared/utils/UseIcon';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import ImageIcon from '../../../shared/components/ImageIcon';
// import FormButton from '../../../shared/components/FormButton';
import {useSelector} from 'react-redux';
import {
  selectStoreDetails,
  selectStores,
} from '../../../redux/slices/store/selectors';
import ShortModal from '../../../shared/components/ShortModal';
import notifyMessage from '../../../shared/hooks/notifyMessage';

import {useDispatch} from 'react-redux';
import {setStoreDetails} from '../../../redux/slices/store/slice';
import client from '../../../shared/api/client';
import handleApiError from '../../../shared/components/handleApiError';

export default function Stores({
  setShowStoresModal,
  setShowNewStoreModal,
  level,
}) {
  const store = useSelector(selectStoreDetails);
  const stores = useSelector(selectStores);

  console.log(stores);
  const [selectedStore, setSelectedStore] = useState(store?.id);

  const dispatch = useDispatch();

  function handleNewStore() {
    if (level == 1) {
      return notifyMessage(
        'Please upgrade to paid version to own multiple stores.',
      );
    }
    setShowStoresModal(false);
    setShowNewStoreModal(true);
  }

  async function handleStore(id) {
    try {
      const {data} = await client.post('/api/update_current_store', {
        storeID: id,
      });
      console.log(data);
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <>
      <ShortModal
        title={'Add New Store'}
        handleToggleShortModal={() => {
          setShowStoresModal(false);
        }}>
        <Pressable onPress={handleNewStore} style={styles.flex}>
          <UseIcon name="plus" type={'AntDesign'} />
          <Text style={styles.title}>Add New Store</Text>
        </Pressable>

        <View style={styles.stores}>
          {stores.map((store, index) => (
            <Pressable
              key={index}
              style={[styles.flex, styles.store]}
              onPress={() => {
                setSelectedStore(store?.id);
                dispatch(setStoreDetails(store));
                handleStore(selectedStore);
              }}>
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
          ))}
        </View>
      </ShortModal>
    </>
  );
}
const styles = StyleSheet.create({
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
