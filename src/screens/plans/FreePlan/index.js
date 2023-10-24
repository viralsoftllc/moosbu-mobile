import React, {useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import PlanDetails from '../renderer/PlanDetails';
import PlanCard from '../renderer/PlanCard';

const benefits = [
  {label: 'Payment Processing:', value: '2% capped at ₦2500'},
  {label: 'Inventory management:', value: '25 active product listings'},
  {label: 'Stores:', value: '1 active store'},
  {label: 'Business Analytics:', value: 'Deep insight into your sales data'},
  {label: 'Marketing Campaigns:', value: '100 free credits'},
];

function handleTogglePaymentModal() {
  setShowPaymentModal(!showPaymentModal);
}

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

export default function FreePlan({isActive, price}) {
  const [showPlanDetails, setShowPlanDetails] = useState(false);

  function handleToggleDetails() {
    setShowPlanDetails(!showPlanDetails);
  }

  return (
    <View style={styles.container}>
      <PlanCard
        benefits={benefits}
        onGetStarted={() => {
          handleToggleDetails;
        }}
        onLearnMore={handleToggleDetails}
        isActive={isActive}
        title={'Free Forever Plan'}
        businessScale={'Smaller business'}
        price={price}
      />

      <Modal visible={showPlanDetails} animationType="slide" transparent={true}>
        <PlanDetails
          handleToggleDetails={handleToggleDetails}
          title={'Free Forever Plan'}
          features={[...benefits, ...benefits2]}
          businessScale={'Smaller Business'}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginBottom: SIZES.base * 2,
  },
});
