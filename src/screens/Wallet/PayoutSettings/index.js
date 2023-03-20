import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';
import FormInput from '../../../shared/components/FormInput';
import ScreenHeader from '../../../shared/components/ScreenHeader';

export default function PayoutSettings() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <ScreenHeader
          title={'Setup Payout Details'}
          subtitle={'Cashout to your preferred account'}
        />
      ),
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputs}>
        <FormInput label={'Bank Name'} placeholder="Select bank" />

        <View style={[styles.form]}>
          <Text style={styles.label}>Account Number</Text>

          <View style={[styles.inputContainer]}>
            <TextInput
              style={[styles.textinput]}
              placeholder={'Enter account number'}
            />

            <Pressable style={styles.formBtn}>
              <Text style={styles.formBtnText}>Verify</Text>
            </Pressable>
          </View>
        </View>

        <FormInput label={'Account Name'} placeholder="Enter Account Name" />
      </View>

      <FormButton title={'Submit'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  form: {
    marginBottom: SIZES.base * 2,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: SIZES.radius / 1.5,
    borderColor: COLORS.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  label: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontWeight: '400',
    marginBottom: SIZES.base,
  },
  textinput: {
    ...FONTS.regular,
    paddingHorizontal: SIZES.base,
    flex: 1,
  },
  formBtn: {
    backgroundColor: COLORS.primaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    paddingHorizontal: SIZES.base * 3,
    paddingVertical: SIZES.base * 1.4,
  },
  formBtnText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  inputs: {
    marginTop: SIZES.base * 2,
    marginBottom: SIZES.base * 5,
  },
});
