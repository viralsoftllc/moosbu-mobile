import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import routes from '../../../../shared/constants/routes';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function ProprietorForm() {
  const {setOptions, navigate} = useNavigation();
  const [gender, setGender] = useState('');

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <ScreenHeader
          title={'The Proprietor Information'}
          subtitle="Step 1 of 4"
        />
      ),
    });

    return () => {};
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <FormInput label={'First Name'} placeholder={'Enter First Name'} />

        <FormInput label={'Last Name'} placeholder={'Enter Last Name'} />

        <FormInput
          label={'Date Of Birth'}
          placeholder={'Enter Date Of Birth'}
        />

        <Text style={styles.formlabel}>Gender</Text>

        <View style={[styles.flex, styles.genderOptions]}>
          <Pressable
            onPress={() => setGender('male')}
            style={[
              styles.flex,
              styles.genderOption,
              styles.leftFormInput,
              {
                borderColor:
                  gender === 'male' ? COLORS.credit : COLORS.borderGray,
              },
            ]}>
            <UseIcon
              type={'MaterialIcons'}
              name={
                gender === 'male'
                  ? 'check-circle-outline'
                  : 'radio-button-unchecked'
              }
              color={gender === 'male' ? COLORS.credit : COLORS.borderGray}
            />
            <Text
              style={[
                styles.genderLabel,
                {
                  color: gender === 'male' ? COLORS.credit : COLORS.grayText,
                },
              ]}>
              Male
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setGender('female')}
            style={[
              styles.flex,
              styles.genderOption,
              styles.rightFormInput,
              {
                borderColor:
                  gender === 'female' ? COLORS.credit : COLORS.borderGray,
              },
            ]}>
            <UseIcon
              type={'MaterialIcons'}
              name={
                gender === 'female'
                  ? 'check-circle-outline'
                  : 'radio-button-unchecked'
              }
              color={gender === 'female' ? COLORS.credit : COLORS.borderGray}
            />
            <Text
              style={[
                styles.genderLabel,
                {
                  color: gender === 'female' ? COLORS.credit : COLORS.grayText,
                },
              ]}>
              Female
            </Text>
          </Pressable>
        </View>

        <FormInput label={'Nationality'} placeholder={'Enter Nationality'} />

        <FormInput
          label={'National Identification Number (NIN)'}
          placeholder={'Enter National Identification Number (NIN)'}
        />

        <FormButton
          title={'Continue'}
          buttonStyle={styles.buttonStyle}
          onPress={() => navigate(routes.PROPOSED_BUSINESS)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base * 2,
    paddingBottom: SIZES.base,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  smallForm: {
    width: '40%',
    flex: 1,
  },
  rightFormInput: {
    marginLeft: SIZES.base,
  },
  leftFormInput: {
    marginRight: SIZES.base,
  },
  genderLabel: {
    marginLeft: SIZES.base,
  },
  genderOption: {
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base,
    justifyContent: 'center',
    width: '40%',
    flex: 1,
  },
  genderOptions: {
    marginBottom: SIZES.base * 2,
  },
  formlabel: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontWeight: '400',
    marginBottom: SIZES.base,
  },
  buttonStyle: {
    marginTop: SIZES.base * 3,
    marginBottom: SIZES.base,
  },
});
