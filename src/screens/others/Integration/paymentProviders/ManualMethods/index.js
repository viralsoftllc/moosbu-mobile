import React, {useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../../../assets/themes';
import PaymentCard from '../renderer/PaymentCard';
import UpdateSuccessful from '../../../../../shared/components/UpdateSuccessful';
import BankTransferModal from './renderer/BankTransferModal';
import CashOnDeliveryModal from './renderer/CashOnDeliveryModal';

export default function ManualMethods() {
  // const [showPosModal, setShowPosModal] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  // const [showCashModal, setShowCashModal] = useState(false);
  const [showCashOnDeliveryModal, setShowCashOnDeliveryModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function handleSuccessfulResponse() {
    // setShowPosModal(false);
    setShowCashOnDeliveryModal(false);
    setShowBankTransferModal(false);
    // setShowCashModal(false);
    setShowSuccessModal(true);
  }

  function handleOpenModal(params) {
    // if (params === 'pos') {
    //   setShowPosModal(true);
    // }
    if (params === 'cod') {
      setShowCashOnDeliveryModal(true);
    }
    if (params === 'bank') {
      setShowBankTransferModal(true);
    }
    // if (params === 'cash') {
    //   setShowCashModal(true);
    // }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cards}>
          {/* POS */}
          {/* <PaymentCard
            isActive={false}
            title="P.O.S"
            description={
              'Stripe is a suite of APIs powering online payment and commerce solutions for businesses of all sizes.'
            }
            imageIcon={require('../../../../../assets/icons/pos.png')}
            onPress={() => handleOpenModal('pos')}
          /> */}
          {/* Cash on delivery */}
          <PaymentCard
            isActive
            title="Cash On Delivery"
            description={
              'Offers payment processing services to businesses and was acquired by Irish-American financial company'
            }
            imageIcon={require('../../../../../assets/icons/cashOnDelivery.png')}
            onPress={() => handleOpenModal('cod')}
          />

          {/* Bank */}
          <PaymentCard
            isActive={false}
            title="Bank transfer"
            description={
              'PayPal is the faster, safer way to send and receive money or make an online payment.'
            }
            imageIcon={require('../../../../../assets/icons/bank.png')}
            onPress={() => handleOpenModal('bank')}
          />
        </View>

        <View style={styles.cards}>
          {/* Cash */}
          {/* <PaymentCard
            isActive
            title="Cash"
            description={
              ' Provides a payment infrastructure for global merchants and payment service providers'
            }
            imageIcon={require('../../../../../assets/icons/cash.png')}
            onPress={() => handleOpenModal('cash')}
          /> */}
        </View>
      </ScrollView>

      {/* <Modal visible={showPosModal} animationType="slide" transparent={true}>
        <PosModal
          setShowPosModal={setShowPosModal}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal> */}

      <Modal
        visible={showBankTransferModal}
        animationType="slide"
        transparent={true}>
        <BankTransferModal
          setShowBankTransferModal={setShowBankTransferModal}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      {/* <Modal visible={showCashModal} animationType="slide" transparent={true}>
        <CashModal
          setShowCashModal={setShowCashModal}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal> */}

      <Modal
        visible={showCashOnDeliveryModal}
        animationType="slide"
        transparent={true}>
        <CashOnDeliveryModal
          setShowCashOnDeliveryModal={setShowCashOnDeliveryModal}
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
