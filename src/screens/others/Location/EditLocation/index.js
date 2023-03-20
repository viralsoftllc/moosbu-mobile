import React, {useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import UpdateSuccessful from '../../../../shared/components/UpdateSuccessful';
import EditLocationForm from './renderer/EditLocationForm';

export default function EditLocation() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function handleSuccessfulResponse() {
    setShowSuccessModal(true);
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <EditLocationForm
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
          title={'location update'}
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
