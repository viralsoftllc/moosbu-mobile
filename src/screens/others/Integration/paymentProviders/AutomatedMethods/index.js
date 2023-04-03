import React, {useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../../assets/themes';
import PaymentCard from '../renderer/PaymentCard';
import StripeModal from './renderer/StripeModal';
import UpdateSuccessful from '../../../../../shared/components/UpdateSuccessful';
import FlutterwaveModal from './renderer/FlutterwaveModal';
import PaypalModal from './renderer/PaypalModal';
import PaystackModal from './renderer/PaystackModal';

export default function AutomatedMethods() {
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [showPaypalModal, setShowPaypalModal] = useState(false);
  const [showPaystackModal, setShowPaystackModal] = useState(false);
  const [showFlutterwaveModal, setShowFlutterwaveModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function handleSuccessfulResponse() {
    setShowStripeModal(false);
    setShowFlutterwaveModal(false);
    setShowPaypalModal(false);
    setShowPaystackModal(false);
    setShowSuccessModal(true);
  }

  function handleOpenModal(params) {
    if (params === 'stripe') {
      setShowStripeModal(true);
    }
    if (params === 'flutterwave') {
      setShowFlutterwaveModal(true);
    }
    if (params === 'paypal') {
      setShowPaypalModal(true);
    }
    if (params === 'paystack') {
      setShowPaystackModal(true);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cards}>
          {/* Stripe */}
          <PaymentCard
            isActive={false}
            title="Stripe"
            description={
              'Stripe is a suite of APIs powering online payment and commerce solutions for businesses of all sizes.'
            }
            imageIcon={require('../../../../../assets/icons/stripe.png')}
            onPress={() => handleOpenModal('stripe')}
          />

          {/* Paypal */}
          <PaymentCard
            isActive={false}
            title="Paypal"
            description={
              'PayPal is the faster, safer way to send and receive money or make an online payment.'
            }
            imageIcon={require('../../../../../assets/icons/paypal.png')}
            onPress={() => handleOpenModal('paypal')}
          />
        </View>

        <View style={styles.cards}>
          {/* Flutterwave */}
          <PaymentCard
            isActive
            title="Flutterwave"
            description={
              ' Provides a payment infrastructure for global merchants and payment service providers'
            }
            imageIcon={require('../../../../../assets/icons/flutterwave.png')}
            onPress={() => handleOpenModal('flutterwave')}
          />

          {/* Paystack */}
          <PaymentCard
            isActive
            title="Paystack"
            description={
              'Offers payment processing services to businesses and was acquired by Irish-American financial company'
            }
            imageIcon={require('../../../../../assets/icons/paystack.png')}
            onPress={() => handleOpenModal('paystack')}
          />
        </View>
      </ScrollView>

      <Modal visible={showStripeModal} animationType="slide" transparent={true}>
        <StripeModal
          setShowStripeModal={setShowStripeModal}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal
        visible={showFlutterwaveModal}
        animationType="slide"
        transparent={true}>
        <FlutterwaveModal
          setShowFlutterwaveModal={setShowFlutterwaveModal}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal visible={showPaypalModal} animationType="slide" transparent={true}>
        <PaypalModal
          setShowPaypalModal={setShowPaypalModal}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal
        visible={showPaystackModal}
        animationType="slide"
        transparent={true}>
        <PaystackModal
          setShowPaystackModal={setShowPaystackModal}
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
