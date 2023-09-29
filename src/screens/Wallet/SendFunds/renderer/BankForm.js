import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import routes from '../../../../shared/constants/routes';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function BankForm({setShowBankForm}) {
  const {navigate} = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.flex}>
            <Text style={styles.title}>Send Fund</Text>

            <Pressable
              onPress={() => {
                setShowBankForm(false);
              }}
              style={styles.closeBtn}>
              <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
            </Pressable>
          </View>

          <FormInput
            label={'Provide account information of the recipient'}
            placeholder="Enter account number"
          />

          <FormInput
            label={'Select Recipient Bank'}
            placeholder="Select bank"
          />

          <View style={styles.formView}>
            <FormInput
              label={'Amount'}
              placeholder="Enter Amount"
              style={[styles.smallForm, styles.leftFormInput]}
            />

            <FormInput
              label={'Description'}
              placeholder="Enter Description"
              style={[styles.smallForm, styles.rightFormInput]}
            />
          </View>

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
              setShowBankForm(false);
              navigate(routes.CONFIRM_TRANSFER_DETAILS, {});
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
    fontWeight: '700',
  },
  formView: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  smallForm: {
    width: '45%',
    flex: 1,
  },
  rightFormInput: {
    marginLeft: SIZES.base / 2,
  },
  leftFormInput: {
    marginRight: SIZES.base / 2,
  },
  closeBtn: {
    padding: SIZES.base,
  },
});
