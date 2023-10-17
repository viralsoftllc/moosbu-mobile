import React, {useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import PlanCard from '../renderer/PlanCard';
import PlanDetails from '../renderer/PlanDetails';
import PaymentModal from '../renderer/PaymentModal';
import ReviewPaymentModal from '../renderer/ReviewPaymentModal';

const benefits = [
  {
    label: 'Payment Processing:',
    value: '2% capped at ₦2500 (If you don’t activate your own processor)',
  },
  {label: 'Inventory management:', value: 'Unlimited product listings'},
  {label: 'Stores:', value: '10 active store'},
  {label: 'Business Analytics:', value: 'Deep insight into your sales data'},
  {label: 'Marketing Campaigns:', value: '1,000 free credits'},
];

const benefits2 = [
  {
    label: 'Personalised AI powered assistant:',
    value: '100 conversations monthly',
  },
  {label: 'AI Sales Writer:', value: '100 sales writeups monthly'},
  {label: 'Discounts & Coupons:', value: '10 active coupons monthly'},
  {label: 'Custom Domain:', value: '.moosbu.store subdomain'},
  {label: 'Staff Login:', value: 'None'},
  {label: 'Growth Settings:', value: 'None'},
  {label: 'Third Party Integrations:', value: 'None'},
];

export default function PaidPlan({isActive, price}) {
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReviewPayment, setShowReviewPayment] = useState(false);

  function handleToggleDetails() {
    setShowPlanDetails(!showPlanDetails);
  }

  function handleTogglePaymentModal() {
    setShowPaymentModal(!showPaymentModal);
  }

  // function handleSuccessfulResponse() {
  //   setShowSuccessModal(true);
  // }

  function handleContinue() {
    setShowPaymentModal(false);
    setShowReviewPayment(true);
  }

  function handleToggleReviewModal() {
    setShowReviewPayment(!showReviewPayment);
  }

  return (
    <View style={styles.container}>
      <PlanCard
        benefits={benefits}
        onGetStarted={handleTogglePaymentModal}
        onLearnMore={handleToggleDetails}
        price={price}
        isPaid={true}
        title={'Paid Plan'}
        businessScale={'Bigger business'}
        isActive={isActive}
      />

      <Modal visible={showPlanDetails} animationType="slide" transparent={true}>
        <PlanDetails
          handleToggleDetails={handleToggleDetails}
          title={'Paid Plan'}
          features={[...benefits, ...benefits2]}
          isPaid={true}
          price={'5,000'}
          businessScale={'Bigger business'}
        />
      </Modal>

      {/* <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          message={'Thank you for subscribing'}
        />
      </Modal> */}

      <Modal
        visible={showPaymentModal}
        animationType="slide"
        transparent={true}>
        <PaymentModal
          handleTogglePaymentModal={handleTogglePaymentModal}
          onContinue={handleContinue}
        />
      </Modal>

      <Modal
        visible={showReviewPayment}
        animationType="slide"
        transparent={true}>
        <ReviewPaymentModal handleToggleReviewModal={handleToggleReviewModal} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  planDetails: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  planHeader: {
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.base,
  },
  planHeaderText: {
    color: COLORS.white,
    textAlign: 'center',
    ...FONTS.h6,
  },
  content: {
    paddingHorizontal: SIZES.base,
    paddingBottom: SIZES.base,
  },
  planScaleView: {
    justifyContent: 'space-between',
    marginVertical: SIZES.base * 1.5,
    paddingLeft: SIZES.base * 2,
  },
  planLength: {
    color: COLORS.textPrimary,
    ...FONTS.h6,
    marginBottom: SIZES.base / 2,
  },
  planScale: {
    color: COLORS.grayText,
    ...FONTS.medium,
  },
  planStatus: {
    backgroundColor: 'rgba(6, 223, 119, 0.2)',
    paddingHorizontal: SIZES.base * 1.5,
    paddingVertical: SIZES.base / 2,
    borderRadius: SIZES.radius * 2,
    ...FONTS.tiny,
    color: COLORS.credit,
  },
  benefits: {
    marginTop: SIZES.base,
  },
  benefitTitle: {
    marginLeft: SIZES.base / 2,
    ...FONTS.medium,
    color: COLORS.textPrimary,
    flex: 1,
  },
  benefitLabel: {
    color: COLORS.grayText,
  },
  benefit: {
    // alignItems: 'flex-start',
    marginBottom: SIZES.base,
  },
  dots: {
    justifyContent: 'center',
    marginVertical: SIZES.base * 2,
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    marginTop: SIZES.base * 2,
  },
  learnMore: {
    paddingVertical: SIZES.base,
    color: COLORS.primary,
    ...FONTS.regular,
  },
  getStartedBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.base * 3,
    borderRadius: SIZES.base / 2,
    height: verticalScale(32),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedText: {
    color: COLORS.white,
    ...FONTS.medium,
  },
});
