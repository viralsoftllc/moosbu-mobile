import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import ShareItem from '../../storeFront/renderer/ShareItem';
import CampaignCard from './renderer/CampaignCard';

export default function Campaign() {
  const {navigate} = useNavigation();
  // const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const items = [];
  const filteredItems = [];

  const [showShareModal, setShowShareModal] = useState(false);

  function handleNewItem() {
    navigate(routes.NEW_CAMPAIGN);
  }

  function handleEditItem() {
    navigate(routes.EDIT_CAMPAIGN);
  }

  return (
    <View style={styles.container}>
      <Search
        items={items}
        filteredItems={filteredItems}
        handleNewItem={handleNewItem}
        filter={false}
      />

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <CampaignCard
          setShowShareModal={setShowShareModal}
          title={'Valued client, we have updated our policies'}
          date="23, Feb 2023"
          time="10:30-12:45 PM"
          status={'Completed'}
          handleEditItem={handleEditItem}
        />

        <CampaignCard
          setShowShareModal={setShowShareModal}
          title={'Take 20% off your order with code THANKYOU'}
          date="28, April 2023"
          time="10:30-12:45 PM"
          status={'In Progress'}
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
    flex: 1,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
});
