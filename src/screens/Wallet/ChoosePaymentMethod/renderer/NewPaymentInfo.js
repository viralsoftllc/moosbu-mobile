import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function NewPaymentInfo({setShowNewPaymentInfoForm}) {
  const [saveCard, setSaveCard] = useState(false);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.flex}>
            <View>
              <Text style={styles.title}>Add new coupon</Text>
              <Text style={styles.subtitle}>
                Please note that your card maybe charged a one time fee.
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setShowNewPaymentInfoForm(false);
              }}
              style={styles.closeBtn}>
              <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
            </Pressable>
          </View>

          <FormInput
            label={'How Much Do You Want To Fund?'}
            placeholder="Enter amount in naira"
          />

          <View style={styles.formView}>
            <FormInput
              label={'Card Number'}
              placeholder="Enter your card number"
              style={[styles.smallForm, styles.leftFormInput]}
            />

            <FormInput
              label={'CVV'}
              placeholder="***"
              style={[styles.smallForm, styles.rightFormInput]}
            />
          </View>

          <Pressable
            style={[styles.formView, styles.addVariantBtn]}
            onPress={() => setSaveCard(!saveCard)}>
            <UseIcon
              name={saveCard ? 'checkbox-marked' : 'checkbox-blank-outline'}
              type={'MaterialCommunityIcons'}
              color={COLORS.textSecondary}
            />

            <Text style={styles.addVariantText}>Save card</Text>
          </Pressable>

          <FormButton
            title={'Proceed'}
            leftIcon={
              <UseIcon
                type={'MaterialIcons'}
                name="lock-outline"
                color={COLORS.white}
              />
            }
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
  },
  subtitle: {
    ...FONTS.medium,
    color: COLORS.grayText,
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
  addVariantText: {
    color: COLORS.textSecondary,
    marginLeft: SIZES.base,
    ...FONTS.regular,
  },
  addVariantBtn: {
    marginBottom: SIZES.base * 2,
  },
  closeBtn: {
    padding: SIZES.base,
  },
});
