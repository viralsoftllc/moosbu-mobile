import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';

import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../../shared/components/UpdateSuccessful';
import NewLocationForm from './renderer/NewLocationForm';

export default function NewLocation() {
  const {setOptions} = useNavigation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function handleSuccessfulResponse() {
    setShowSuccessModal(true);
  }

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'New Location'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <NewLocationForm
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
          title={'location'}
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
