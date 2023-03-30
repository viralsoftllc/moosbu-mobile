import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import client from '../../../shared/api/client';
import DeleteItem from '../../../shared/components/DeleteItem';
import EmptyItemInfo from '../../../shared/components/EmptyItemInfo';
import handleApiError from '../../../shared/components/handleApiError';
import MbotChatWidget from '../../../shared/components/MbotChatWidget';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import Search from '../../../shared/components/Search';
import UpdateSuccessful from '../../../shared/components/UpdateSuccessful';
import UseIcon from '../../../shared/utils/UseIcon';
import ShareItem from '../renderer/ShareItem';
import EditCoupon from './EditCoupon';
import NewCoupon from './NewCoupon';
import CouponCard from './renderer/CouponCard';

export default function Coupon() {
  const {setOptions} = useNavigation();
  const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const [showNewCouponForm, setShowNewCouponForm] = useState(false);
  const [showEditCouponForm, setShowEditCouponForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Coupon'} />,
    });
  }, [setOptions]);

  // const items = [];
  const filteredItems = [];

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
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, []);

  function handleSuccessfulResponse() {
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

  return (
    <View style={styles.container}>
      <Search
        filter={false}
        handleNewItem={handleNewItem}
        items={items}
        filteredItems={filteredItems}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {loading ? <ActivityIndicator size={'large'} /> : null}
        {!loading && !items?.length ? (
          <EmptyItemInfo message={'No coupon to display'} />
        ) : null}

        {items.length
          ? items.map((coupon, i) => (
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
                handleEditItem={handleEditItem}
                handleDeleteItem={handleDeleteItem}
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
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal
        visible={showEditCouponForm}
        animationType="slide"
        transparent={true}>
        <EditCoupon
          setShowEditCouponForm={setShowEditCouponForm}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <DeleteItem setShowDeleteModal={setShowDeleteModal} title={'coupon'} />
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          title={'coupon update'}
        />
      </Modal>

      <MbotChatWidget />
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
});
