import React, {useLayoutEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {COLORS, SIZES} from '../../../../../assets/themes';
import PaymentCard from '../renderer/PaymentCard';
import ScreenHeader from '../../../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../../../shared/components/UpdateSuccessful';
import FedExModal from './renderer/FedExModal';
import DhlModal from './renderer/DhlModal';
import UpsModal from './renderer/UpsModal';
import GigModal from './renderer/GigModal';

export default function InbuiltLogistics() {
  const {setOptions} = useNavigation();

  const [showGigModal, setShowGigModal] = useState(false);
  const [showUpsModal, setShowUpsModal] = useState(false);
  const [showDhlModal, setShowDhlModal] = useState(false);
  const [showFedExModal, setShowFedExModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function handleSuccessfulResponse() {
    setShowGigModal(false);
    setShowFedExModal(false);
    setShowUpsModal(false);
    setShowDhlModal(false);
    setShowSuccessModal(true);
  }

  function handleOpenModal(params) {
    if (params === 'gig') {
      setShowGigModal(true);
    }
    if (params === 'fedex') {
      setShowFedExModal(true);
    }
    if (params === 'ups') {
      setShowUpsModal(true);
    }
    if (params === 'dhl') {
      setShowDhlModal(true);
    }
  }

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Logistics'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cards}>
          <PaymentCard
            isActive={false}
            title="Gig Logistic"
            description={
              'Leading logistics service provider in Africa, GIGL offers convenient, affordable, express delivery services'
            }
            imageIcon={require('../../../../../assets/icons/gig.png')}
            onPress={() => handleOpenModal('gig')}
          />

          <PaymentCard
            isActive={false}
            title="Ups Logistic"
            description={
              'UPS® is one of the largest and most trusted Global shipping and logistics companies worldwide'
            }
            imageIcon={require('../../../../../assets/icons/ups.png')}
            onPress={() => handleOpenModal('ups')}
          />
        </View>

        <View style={styles.cards}>
          <PaymentCard
            isActive
            title="DHL Logistic"
            description={
              'An international logistics company that spread it wings across the border Nigeria and operates well in the country.'
            }
            imageIcon={require('../../../../../assets/icons/dhl.png')}
            onPress={() => handleOpenModal('dhl')}
          />

          <PaymentCard
            isActive
            title="FedEx"
            description={
              'FedEx express shipping is a fast way to send priority shipments that need to be delivered by a certain deadline.'
            }
            imageIcon={require('../../../../../assets/icons/fedex.png')}
            onPress={() => handleOpenModal('fedex')}
          />
        </View>
      </ScrollView>

      <Modal visible={showGigModal} animationType="slide" transparent={true}>
        <GigModal
          setShowGigModal={setShowGigModal}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal visible={showUpsModal} animationType="slide" transparent={true}>
        <UpsModal
          setShowUpsModal={setShowUpsModal}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal visible={showDhlModal} animationType="slide" transparent={true}>
        <DhlModal
          setShowDhlModal={setShowDhlModal}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal visible={showFedExModal} animationType="slide" transparent={true}>
        <FedExModal
          setShowFedExModal={setShowFedExModal}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          title={'shipping'}
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
    paddingTop: SIZES.base * 2,
  },
  cards: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: SIZES.base,
  },
});
