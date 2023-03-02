import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../assets/themes';
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import UseIcon from '../../../shared/utils/UseIcon';
import ShareItem from '../renderer/ShareItem';
import CouponCard from './renderer/CouponCard';

export default function Coupon() {
  const {navigate} = useNavigation();
  // const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const items = [];
  const filteredItems = [];

  const [showShareModal, setShowShareModal] = useState(false);

  function handleNewItem() {
    navigate(routes.NEW_COUPON);
  }

  function handleEditItem() {
    navigate(routes.EDIT_COUPON);
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
              name="ticket-percent-outline"
              type={'MaterialCommunityIcons'}
              color={COLORS.textPrimary}
            />
          }
          setShowShareModal={setShowShareModal}
          handleEditItem={handleEditItem}
        />
      </ScrollView>

      <Modal visible={showShareModal} animationType="slide" transparent={true}>
        <ShareItem setShowShareModal={setShowShareModal} />
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
