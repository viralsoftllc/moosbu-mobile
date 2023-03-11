import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import DeleteItem from '../../../shared/components/DeleteItem';
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
  // const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const [showNewCouponForm, setShowNewCouponForm] = useState(false);
  const [showEditCouponForm, setShowEditCouponForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Coupon'} />,
    });
  }, [setOptions]);

  const items = [];
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

  function handleSuccessfulResponse() {
    setShowEditCouponForm(false);
    setShowNewCouponForm(false);
    setShowSuccessModal(true);
  }

  return (
    <View style={styles.container}>
      <Search
        filter={false}
        handleNewItem={handleNewItem}
        items={items}
        filteredItems={filteredItems}
      />

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <CouponCard
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
        />
      </ScrollView>

      <Modal visible={showShareModal} animationType="slide" transparent={true}>
        <ShareItem setShowShareModal={setShowShareModal} />
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
