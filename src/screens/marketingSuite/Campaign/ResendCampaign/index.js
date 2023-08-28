import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../../assets/themes';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../../shared/components/UpdateSuccessful';
import ResendCampaignForm from './renderer/ResendCampaignForm';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import handleApiError from '../../../../shared/components/handleApiError';
import client from '../../../../shared/api/client';
import {selectContacts} from '../../../../redux/slices/engagement/selectors';
import {useSelector} from 'react-redux';
import routes from '../../../../shared/constants/routes';

export default function ResendCampaign() {
  const {setOptions, navigate} = useNavigation();
  const {params} = useRoute();
  console.log('campaign params');
  console.log(params?.campaign);
  const contacts = useSelector(selectContacts);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState({
    channel: '',
  });

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Resend Campaign'} />,
    });
    return () => {};
  }, [setOptions]);

  const getPhonebookObject = useCallback(() => {
    if (params?.campaign) {
      const found = contacts?.find(
        el => el?.id?.toString() === params?.campaign?.phonebook_id,
      );
      return found;
    }
  }, [contacts, params]);

  useEffect(() => {
    setCampaign({
      name: params?.campaign?.name,
      content: params?.campaign?.content,
      phonebook: getPhonebookObject(),
      channel: params?.campaign?.channel,
      id: params?.campaign?.id,
    });
  }, [params, getPhonebookObject]);

  function handleSuccessfulResponse() {
    setShowSuccessModal(true);
  }

  async function handleResendCampaign() {
    setLoading(true);

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

    // let url = '';
    // if (campaign?.channel === 'sms') url = '/api/send_sms';
    // if (campaign?.channel === 'whatsapp') url = '/api/send_whatsapp';
    // if (campaign?.channel === 'email') url = '/api/send_email';

    let contacts = '';
    if (campaign.channel?.toLocaleLowerCase() === 'email') {
      contacts = campaign.phonebook?.emails;
    } else {
      contacts = campaign?.phonebook?.number;
    }

    const payload = {
      contacts,
      message: campaign?.content,
    };

    console.log('payload');
    console.log(payload);

    try {
      const res = await client.get(
        '/api/campaign/send/' + campaign?.id,
        payload,
      );
      console.log('Resend campaign response');
      console.log(res);
      console.log(res.data);
      setLoading(false);
      handleSuccessfulResponse();
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <ResendCampaignForm
            handleSuccessfulResponse={handleSuccessfulResponse}
            setCampaign={setCampaign}
            campaign={campaign}
            loading={loading}
            handleResendCampaign={handleResendCampaign}
          />
        </ScrollView>
      </View>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          message={'Campaign has been sent'}
          subtitle={'Campaign has been sent to your customers'}
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
