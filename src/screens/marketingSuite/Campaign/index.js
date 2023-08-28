import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import DeleteItem from '../../../shared/components/DeleteItem';
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import ShareItem from '../../storeFront/renderer/ShareItem';
import CampaignCard from './renderer/CampaignCard';
import handleApiError from '../../../shared/components/handleApiError';
import client from '../../../shared/api/client';
import EmptyItemInfo from '../../../shared/components/EmptyItemInfo';

export default function Campaign() {
  const {navigate} = useNavigation();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  // const items = [];
  // const filteredItems = [];

  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleNewItem() {
    navigate(routes.NEW_CAMPAIGN);
  }

  function handleEditItem() {
    navigate(routes.EDIT_CAMPAIGN);
  }

  function handleDeleteItem() {
    setShowDeleteModal(true);
  }

  const getCampaigns = useCallback(async () => {
    try {
      setLoading(true);

      console.log('Fetching campaigns');
      const {data} = await client.get('/api/campaign');
      console.log(data);

      setLoading(false);
      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, []);

  useEffect(() => {
    getCampaigns();
  }, [getCampaigns]);

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
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getCampaigns} />
        }>
        {loading ? <ActivityIndicator size={'large'} /> : null}

        {!loading && !items?.length ? (
          <EmptyItemInfo message={'No campaigns to display'} />
        ) : null}

        {!loading && filteredItems?.length
          ? filteredItems?.map((campaign, i) => (
              <CampaignCard
                key={i}
                campaign={campaign}
                onPress={() => navigate(routes.RESEND_CAMPAIGN, {campaign})}
                setShowShareModal={setShowShareModal}
                handleEditItem={handleEditItem}
                imageUrl={require('../../../assets/images/mail1.png')}
                handleDeleteItem={handleDeleteItem}
              />
            ))
          : null}
      </ScrollView>

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
