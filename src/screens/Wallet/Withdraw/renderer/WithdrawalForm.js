import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import routes from '../../../../shared/constants/routes';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function WithdrawalForm({setShowWithdrawalModal}) {
  const {navigate} = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.flex}>
            <View>
              <Text style={styles.title}>Withdrawal</Text>
              <Text style={styles.subtitle}>
                Withdraw cash from you Moosbu wallet to your bank acccount
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setShowWithdrawalModal(false);
              }}
              style={styles.closeBtn}>
              <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
            </Pressable>
          </View>

          <View style={styles.details}>
            <Text style={styles.name}>Jooshau Moosbu</Text>
            <Text style={styles.subtitle}>
              Moosbu wallet bank{' '}
              <Text style={styles.acctNumber}>0123616457</Text>
            </Text>
          </View>

          <FormInput label={'Amount'} placeholder="Enter amount to withdraw" />
          <Text style={styles.serviceFeeText}>
            Service Fee <Text style={styles.fee}>35</Text>
          </Text>

          <FormButton
            title={'Proceed'}
            leftIcon={
              <UseIcon
                type={'MaterialIcons'}
                name="lock-outline"
                color={COLORS.white}
              />
            }
            onPress={() => {
              setShowWithdrawalModal(false);
              navigate(routes.ENTER_PIN);
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
  subtitle: {
    ...FONTS.medium,
    color: COLORS.grayText,
  },
  details: {
    marginVertical: SIZES.base * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: COLORS.textPrimary,
    ...FONTS.h5,
    marginBottom: SIZES.base,
  },
  acctNumber: {
    color: COLORS.primary,
  },
  serviceFeeText: {
    textAlign: 'right',
    ...FONTS.medium,
    color: COLORS.grayText,
    marginBottom: SIZES.base * 4,
  },
  fee: {
    color: COLORS.debit,
  },
  closeBtn: {
    padding: SIZES.base,
  },
});
