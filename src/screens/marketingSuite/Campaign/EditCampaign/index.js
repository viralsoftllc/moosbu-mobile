import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../../assets/themes';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../../shared/components/UpdateSuccessful';
import EditCampaignForm from './renderer/EditCampaignForm';

export default function EditCampaign() {
  const {setOptions} = useNavigation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Edit Campaign'} />,
    });
    return () => {};
  }, [setOptions]);

  function handleSuccessfulResponse() {
    setShowSuccessModal(true);
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <EditCampaignForm
            handleSuccessfulResponse={handleSuccessfulResponse}
          />
        </ScrollView>
      </View>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          title={'campaign update'}
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
