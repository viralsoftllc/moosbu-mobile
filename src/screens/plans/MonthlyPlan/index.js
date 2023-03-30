import React, {useState} from 'react';
import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';
import UpdateSuccessful from '../../../shared/components/UpdateSuccessful';
import UseIcon from '../../../shared/utils/UseIcon';
import PaymentForm from '../renderer/PaymentForm';

const benefits = [
  {label: 'Payment Processing:', value: '2% capped at ₦2500'},
  {label: 'Inventory management:', value: '25 active product listings'},
  {label: 'Stores:', value: '1 active store'},
  {label: 'Business Analytics:', value: 'Deep insight into your sales data'},
  {label: 'Marketing Campaigns:', value: '100 free credits'},
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

export default function MonthlyPlan() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function handleShowPaymentForm() {
    setShowPaymentForm(true);
  }

  function handleSuccessfulResponse() {
    setShowPaymentForm(false);
    setShowSuccessModal(true);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.planDetails}>
          <View style={styles.planHeader}>
            <Text style={styles.planHeaderText}>₦0/Month</Text>
          </View>

          <View style={styles.content}>
            <View style={[styles.flex, styles.planScaleView]}>
              <View>
                <Text style={styles.planLength}>Free Forever</Text>
                <Text style={styles.planScale}>Smaller Business</Text>
              </View>

              <Text style={styles.planStatus}>Active</Text>
            </View>

            <View style={styles.benefits}>
              {benefits?.map((benefit, i) => (
                <View style={[styles.flex, styles.benefit]} key={i}>
                  <UseIcon
                    type={'MaterialCommunityIcons'}
                    name="checkbox-marked-outline"
                    color={COLORS.textPrimary}
                    size={verticalScale(13)}
                  />

                  <Text style={styles.benefitTitle}>
                    {benefit?.label}
                    <Text style={styles.benefitLabel}>{benefit?.value}</Text>
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={[styles.dots, styles.flex]}>
          <UseIcon
            name="checkbox-blank-circle"
            type={'MaterialCommunityIcons'}
            color={COLORS.primary}
            size={verticalScale(15)}
          />
          <UseIcon
            name="checkbox-blank-circle"
            type={'MaterialCommunityIcons'}
            color={COLORS.tabBg}
            size={verticalScale(12)}
          />
        </View>

        <FormButton title={'Continue'} onPress={handleShowPaymentForm} />
      </ScrollView>

      <Modal visible={showPaymentForm} animationType="slide" transparent={true}>
        <PaymentForm
          setShowPaymentForm={setShowPaymentForm}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          message={'Thank you for subscribing'}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
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
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  planHeader: {
    justifyContent: 'center',
    backgroundColor: COLORS.borderGray,
    paddingVertical: SIZES.base,
  },
  planHeaderText: {
    color: COLORS.white,
    textAlign: 'center',
    ...FONTS.h6,
  },
  content: {
    paddingHorizontal: SIZES.base,
    paddingBottom: SIZES.base * 3,
  },
  planScaleView: {
    justifyContent: 'space-between',
    marginVertical: SIZES.base,
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
    ...FONTS.regular,
    color: COLORS.textPrimary,
    flex: 1,
  },
  benefitLabel: {
    color: COLORS.grayText,
  },
  benefit: {
    alignItems: 'flex-start',
    marginBottom: SIZES.base,
  },
  dots: {
    justifyContent: 'center',
    marginVertical: SIZES.base * 2,
  },
});
