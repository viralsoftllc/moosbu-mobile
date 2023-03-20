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
import routes from '../../../shared/constants/routes';

import UseIcon from '../../../shared/utils/UseIcon';
import WithdrawalForm from './renderer/WithdrawalForm';

export default function Withdraw() {
  const {setOptions, navigate} = useNavigation();
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Withdraw'} />,
    });
  }, [setOptions]);

  function handleNewItem() {
    setShowWithdrawalModal(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Add New Card */}
      <Pressable
        style={styles.addCard}
        onPress={() => navigate(routes.PAYOUT_SETTINGS)}>
        <UseIcon
          type={'MaterialCommunityIcons'}
          name="plus-circle-outline"
          color={COLORS.primary}
        />
        <Text style={styles.addCardText}>Add Bank Details</Text>
      </Pressable>

      <Pressable style={[styles.card, styles.ussdCard]} onPress={handleNewItem}>
        <View style={[styles.iconView]}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="bank"
            color={COLORS.primary}
          />
        </View>

        <View style={styles.details}>
          <Text style={[styles.name]}>Jooshu Moosbu</Text>

          <Text style={styles.subtitle}>
            Moosbu wallet bank <Text style={styles.acctNumber}>0123616457</Text>
          </Text>
        </View>
      </Pressable>

      <Modal
        visible={showWithdrawalModal}
        animationType="slide"
        transparent={true}>
        <WithdrawalForm setShowWithdrawalModal={setShowWithdrawalModal} />
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
  card: {
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
    height: verticalScale(80),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: SIZES.base * 2,
    borderWidth: 1,
    marginVertical: SIZES.base * 2,
  },
  iconView: {
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    width: verticalScale(40),
    height: verticalScale(40),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ussdText: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    flex: 1,
  },
  details: {
    marginLeft: SIZES.base * 1.5,
  },
  name: {
    color: COLORS.textPrimary,
    ...FONTS.h5,
    marginBottom: SIZES.base,
  },
  subtitle: {
    color: COLORS.grayText,
  },
  acctNumber: {
    color: COLORS.primary,
  },
});
