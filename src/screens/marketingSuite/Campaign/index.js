import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import DeleteItem from '../../../shared/components/DeleteItem';
import MbotChatWidget from '../../../shared/components/MbotChatWidget';
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function handleNewItem() {
    navigate(routes.NEW_CAMPAIGN);
  }

  function handleEditItem() {
    navigate(routes.EDIT_CAMPAIGN);
  }

  function handleDeleteItem() {
    setShowDeleteModal(true);
  }

  return (
    <View style={styles.container}>
      <Search
        items={items}
        filteredItems={filteredItems}
        handleNewItem={handleNewItem}
        filter={false}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <CampaignCard
          setShowShareModal={setShowShareModal}
          title={'Valued client, we have updated our policies'}
          date="23, Feb 2023"
          time="10:30-12:45 PM"
          status={'Completed'}
          handleEditItem={handleEditItem}
          imageUrl={require('../../../assets/images/mail1.png')}
          handleDeleteItem={handleDeleteItem}
        />

        <CampaignCard
          setShowShareModal={setShowShareModal}
          title={'Thanks for signing up for updates'}
          date="28, April 2023"
          time="10:30-12:45 PM"
          status={'In Progress'}
          handleEditItem={handleEditItem}
          imageUrl={require('../../../assets/images/mail2.png')}
          handleDeleteItem={handleDeleteItem}
        />
      </ScrollView>

      <MbotChatWidget />

      <Modal visible={showShareModal} animationType="slide" transparent={true}>
        <ShareItem setShowShareModal={setShowShareModal} />
      </Modal>

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <DeleteItem
          setShowDeleteModal={setShowDeleteModal}
          title={'campaign'}
        />
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
