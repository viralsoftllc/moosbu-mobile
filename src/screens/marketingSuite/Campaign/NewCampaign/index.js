import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

// import {Modal} from 'react-native-paper';

import {COLORS, SIZES} from '../../../../assets/themes';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../../shared/components/UpdateSuccessful';
import NewCampaignForm from './renderer/NewCampaignForm';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import handleApiError from '../../../../shared/components/handleApiError';
import client from '../../../../shared/api/client';
import routes from '../../../../shared/constants/routes';

import {Checkbox} from 'react-native-paper';

export default function NewCampaign() {
  const {setOptions, navigate} = useNavigation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [campaign, setCampaign] = useState({
    channel: 'sms',
  });

  // const [] = useState(false)

  const [checked, setChecked] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Create New Campaign'} />,
    });
    return () => {};
  }, [setOptions]);

  function handleSuccessfulResponse() {
    setShowSuccessModal(true);
  }

  async function handleSaveAndSendCampaign() {
    setLoading(true);

    if (!campaign?.name) {
      setLoading(false);
      return notifyMessage('Campaign Name is required');
    }

    if (!campaign?.content) {
      setLoading(false);
      return notifyMessage('Campaign Content is required');
    }

    if (!campaign?.phonebook) {
      setLoading(false);
      return notifyMessage('Campaign Group is required');
    }

    if (!campaign?.channel) {
      setLoading(false);
      return notifyMessage('Campaign Channel is required');
    }

    const payload = {
      name: campaign?.name,
      title: campaign?.title,
      channel: campaign?.channel,
      phonebook_id: campaign?.phonebook?.id,
      content: campaign?.content,
    };

    try {
      const res = await client.post('/api/campaign/save_send', payload);
      console.log('New save and send campaign response');
      console.log(res);
      console.log(res.data);
      setCampaign({channel: ''});
      setLoading(false);
      handleSuccessfulResponse();
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }

  async function handleCreateCampaign() {
    setSaving(true);

    // if (!campaign?.name) {
    //   setSaving(false);
    //   return notifyMessage('Campaign Name is required');
    // }

    // if (!campaign?.content) {
    //   setSaving(false);
    //   return notifyMessage('Campaign Content is required');
    // }

    // if (!campaign?.phonebook) {
    //   setSaving(false);
    //   return notifyMessage('Campaign Group is required');
    // }

    // if (!campaign?.channel) {
    //   setSaving(false);
    //   return notifyMessage('Campaign Channel is required');
    // }

    const payload = {
      name: campaign?.name,
      title: campaign?.title,
      channel: campaign?.channel,
      phonebook_id: campaign?.phonebook?.id,
      content: campaign?.content,
    };

    try {
      const res = await client.post('/api/campaign', payload);
      console.log('New campaign response');
      console.log(res);
      console.log(res.data);
      setCampaign({channel: ''});
      setSaving(false);
      handleSuccessfulResponse();
    } catch (error) {
      setSaving(false);
      handleApiError(error);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <NewCampaignForm
            handleSuccessfulResponse={handleSuccessfulResponse}
            setCampaign={setCampaign}
            campaign={campaign}
            loading={loading}
            handleCreateCampaign={handleCreateCampaign}
            handleSaveAndSendCampaign={handleSaveAndSendCampaign}
            saving={saving}
          />
        </ScrollView>
      </View>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          message={'Campaign has been created'}
          subtitle={'Your campaigns will be updated'}
          onPress={() => {
            navigate(routes.ENGAGEMNT_TAB, {screen: routes.ENGAGEMNT});
          }}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
});
