import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import client from '../../../shared/api/client';
import DeleteItem from '../../../shared/components/DeleteItem';
import EmptyItemInfo from '../../../shared/components/EmptyItemInfo';
import handleApiError from '../../../shared/components/handleApiError';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../shared/components/UpdateSuccessful';
import UseIcon from '../../../shared/utils/UseIcon';
import ShareItem from '../renderer/ShareItem';
import EditCoupon from './EditCoupon';
import NewCoupon from './NewCoupon';
import CouponCard from './renderer/CouponCard';
import {verticalScale} from 'react-native-size-matters';
import SearchBar from 'react-native-platform-searchbar';

export default function Coupon() {
  const {setOptions} = useNavigation();
  const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const [showNewCouponForm, setShowNewCouponForm] = useState(false);
  const [showEditCouponForm, setShowEditCouponForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [response, setResponse] = useState({message: '', subtitle: ''});

  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const searchFilterFunction = text => {
    if (text) {
      const newdata = items?.filter(item => {
        const itemData = item?.name
          ? item?.name.toLowerCase()
          : ''.toLowerCase();

        const textData = text.toLowerCase();

        return itemData?.indexOf(textData) > -1;
      });

      setFilteredItems(newdata);
      setSearchText(text);
    } else {
      setFilteredItems(items);
      setSearchText(text);
    }
  };

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Coupon'} />,
    });
  }, [setOptions]);

  // const items = [];
  // const filteredItems = [];

  const [showShareModal, setShowShareModal] = useState(false);

  function handleNewItem() {
    setShowNewCouponForm(true);
  }

  function handleEditItem() {
    setShowEditCouponForm(true);
  }

  function handleDeleteItem() {
    setShowDeleteModal(true);
  }

  const getAllCoupons = useCallback(async () => {
    setLoading(true);

    try {
      console.log('Fetching coupons');
      const {data} = await client.get('/api/coupons');
      console.log(data);
      setLoading(false);

      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, []);

  function handleSuccessfulResponse(message, subtitle) {
    setResponse({message, subtitle});
    setShowEditCouponForm(false);
    setShowNewCouponForm(false);
    setShowSuccessModal(true);
    getAllCoupons();
  }

  function handleShareItem(params) {
    setSelectedCoupon(params);
    setShowShareModal(true);
  }

  useEffect(() => {
    getAllCoupons();
  }, [getAllCoupons]);

  async function handleDelete() {
    if (selectedCoupon?.id) {
      setDeleting(true);

      try {
        console.log('deleting coupon');
        const {data} = await client.delete('/api/coupon/' + selectedCoupon?.id);
        console.log(data);

        getAllCoupons();
        setDeleting(false);
        setShowDeleteModal(false);
      } catch (error) {
        setDeleting(false);
        handleApiError(error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <View style={styles.searchContainer}>
        <View style={styles.searchView}>
          <SearchBar
            placeholder={'Search Coupons'}
            value={searchText}
            onChangeText={text => searchFilterFunction(text.trim())}
            onClear={text => searchFilterFunction('')}
            style={styles.search}
            inputStyle={styles.inputStyle}
            platform={'ios'}
            cancelText=""
          />
        </View>

        <Pressable
          style={[styles.iconView, styles.plusIcon]}
          onPress={handleNewItem}>
          <UseIcon type={'AntDesign'} name="plus" color={COLORS.white} />
        </Pressable>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainerStyle,
          {paddingHorizontal: Platform.OS == 'ios' ? 20 : 0},
        ]}>
        {loading ? <ActivityIndicator size={'large'} /> : null}
        {!loading && !filteredItems?.length ? (
          <EmptyItemInfo message={'No coupon to display'} />
        ) : null}

        {filteredItems.length
          ? filteredItems.map((coupon, i) => (
              <CouponCard
                key={i}
                coupon={coupon}
                title={'MOOSBU2023'}
                icon={
                  <UseIcon
                    name="brightness-percent"
                    type={'MaterialCommunityIcons'}
                    color={COLORS.textPrimary}
                  />
                }
                setShowShareModal={setShowShareModal}
                handleEditItem={() => {
                  setSelectedCoupon(coupon);
                  handleEditItem(coupon);
                }}
                handleDeleteItem={() => {
                  setSelectedCoupon(coupon);
                  handleDeleteItem();
                }}
                handleShareItem={handleShareItem}
              />
            ))
          : null}
      </ScrollView>

      <Modal visible={showShareModal} animationType="slide" transparent={true}>
        <ShareItem
          setShowShareModal={setShowShareModal}
          link={selectedCoupon?.code}
        />
      </Modal>

      <Modal
        visible={showNewCouponForm}
        animationType="slide"
        transparent={true}>
        <NewCoupon
          setShowNewCouponForm={setShowNewCouponForm}
          handleSuccessfulResponse={() =>
            handleSuccessfulResponse(
              'Coupon successfully added',
              'Your coupons will be updated',
            )
          }
        />
      </Modal>

      <Modal
        visible={showEditCouponForm}
        animationType="slide"
        transparent={true}>
        <EditCoupon
          setShowEditCouponForm={setShowEditCouponForm}
          handleSuccessfulResponse={() =>
            handleSuccessfulResponse(
              'Coupon updated successfully',
              'Your coupons will be updated',
            )
          }
          selectedItem={selectedCoupon}
          setSelectedItem={setSelectedCoupon}
        />
      </Modal>

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <DeleteItem
          setShowDeleteModal={setShowDeleteModal}
          title={'coupon'}
          loading={deleting}
          onDelete={handleDelete}
        />
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          onPress={() => {
            setResponse({message: '', subtitle: ''});
            getAllCoupons();
          }}
          message={response.message}
          subtitle={response.subtitle}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.paddingHorizontal,
    backgroundColor: COLORS.white,
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: SIZES.base,
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
