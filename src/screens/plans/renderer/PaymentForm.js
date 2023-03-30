import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';
import routes from '../../../shared/constants/routes';
import UseIcon from '../../../shared/utils/UseIcon';

export default function PaymentForm({setShowPaymentForm}) {
  const {navigate} = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.flex}>
            <View>
              <Text style={styles.title}>Subscribe</Text>
              {/* <Text style={styles.subtitle}>Enter tax details</Text> */}
            </View>

            <Pressable
              onPress={() => {
                setShowPaymentForm(false);
              }}
              style={styles.closeBtn}>
              <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
            </Pressable>
          </View>

          <Text style={styles.balanceMessage}>
            You don’t have enough balance in your wallet. Please fund your
            wallet with ₦5,000{' '}
          </Text>

          <View style={styles.details}>
            <View style={styles.flex}>
              <Text style={styles.label}>Amount</Text>
              <Text style={styles.value}>₦5,000</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.label}>Fee</Text>
              <Text style={styles.value}>₦0</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.label}>Total Amount</Text>
              <Text style={styles.value}>₦5,000</Text>
            </View>
          </View>

          <View style={styles.details}>
            <View style={styles.flex}>
              <Text style={styles.label}>Total Amount</Text>
              <Text style={styles.value}>₦5,000</Text>
            </View>
          </View>

          <FormButton
            title={'Fund wallet'}
            onPress={() => {
              setShowPaymentForm(false);
              navigate(routes.CHOOSE_PAYMENT_METHOD);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: SIZES.base * 1.3,
  },
  title: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
  },
  balanceMessage: {
    ...FONTS.medium,
    color: COLORS.textPrimary,
  },
  closeBtn: {
    padding: SIZES.base,
  },
  details: {
    borderWidth: 1,
    paddingHorizontal: SIZES.base * 2,
    borderRadius: SIZES.radius,
    borderColor: COLORS.borderGray,
    marginVertical: SIZES.base * 1.5,
  },
  label: {
    color: COLORS.textPrimary,
  },
  value: {
    color: COLORS.textPrimary,
  },
});
