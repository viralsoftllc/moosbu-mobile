import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../shared/components/UpdateSuccessful';
import routes from '../../../shared/constants/routes';
import UseIcon from '../../../shared/utils/UseIcon';
import NewPaymentInfo from './renderer/NewPaymentInfo';

export default function ChoosePaymentMethod() {
  const {setOptions, navigate} = useNavigation();
  const [showNewPaymentInfoForm, setShowNewPaymentInfoForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Choose Payment Method'} />,
    });
  }, [setOptions]);

  function handleNewItem() {
    setShowNewPaymentInfoForm(true);
  }

  function handleSuccessfulResponse() {
    setShowNewPaymentInfoForm(false);
    setShowSuccessModal(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Add New Card */}
      <View>
        <Text style={styles.label}>Debit or Credit Card</Text>

        <Pressable style={styles.addCard} onPress={handleNewItem}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="plus-circle-outline"
            color={COLORS.primary}
          />
          <Text style={styles.addCardText}>Add New Card</Text>
        </Pressable>
      </View>

      {/* Bank transfer */}
      <View>
        <Text style={styles.label}>Bank Transfer</Text>

        <Pressable
          style={styles.card}
          onPress={() => navigate(routes.BANK_TRANSFER)}>
          <View style={styles.iconView}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="bank"
              color={COLORS.primary}
            />
          </View>
          <Text style={styles.bankTransferText}>Bank Transfer</Text>
        </Pressable>
      </View>

      {/* USSD */}
      <View>
        <Text style={styles.label}>USSD Transfer</Text>

        <Pressable
          style={[styles.card, styles.ussdCard]}
          onPress={() => navigate(routes.BANK_TRANSFER)}>
          <View style={[styles.iconView, styles.ussdIconView]}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="swap-vertical"
              color={COLORS.white}
            />
          </View>
          <Text style={[styles.bankTransferText, styles.ussdCardText]}>
            USSD Transfer
          </Text>
        </Pressable>
      </View>

      <Modal
        visible={showNewPaymentInfoForm}
        animationType="slide"
        transparent={true}>
        <NewPaymentInfo
          setShowNewPaymentInfoForm={setShowNewPaymentInfoForm}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          title={'coupon update'}
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
  },
  addCard: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
    height: verticalScale(80),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  addCardText: {
    color: COLORS.textPrimary,
    marginLeft: SIZES.base,
  },
  label: {
    marginBottom: SIZES.base,
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontWeight: '500',
    marginTop: SIZES.base * 3,
  },
  card: {
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
    height: verticalScale(80),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: SIZES.base * 2,
    backgroundColor: COLORS.primary,
  },
  iconView: {
    backgroundColor: COLORS.white,
    width: verticalScale(40),
    height: verticalScale(40),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankTransferText: {
    color: COLORS.white,
    textAlign: 'center',
    flex: 1,
  },
  ussdText: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    flex: 1,
  },
  ussdCard: {
    backgroundColor: '#E4EDF9',
  },
  ussdCardText: {
    color: COLORS.textPrimary,
  },
  ussdIconView: {
    backgroundColor: COLORS.primary,
  },
});
