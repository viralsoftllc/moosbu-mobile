import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Platform,
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
import AppDatePicker from '../../../../shared/components/AppDatePicker';
// import handleApiError from '../../../../shared/components/handleApiError';
// import client from '../../../../shared/api/client';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import {useSelector} from 'react-redux';
import {selectbusinessRegistrationDetails} from '../../../../redux/slices/businessRegistration/selectors';

export default function ProprietorForm() {
  const {setOptions, navigate} = useNavigation();
  const [details, setDetails] = useState({});
  const proprietorInfo = useSelector(selectbusinessRegistrationDetails);

  useEffect(() => {
    setDetails({
      first_name: proprietorInfo?.first_name,
      last_name: proprietorInfo?.last_name,
      gender: proprietorInfo?.gender,
      nationality: proprietorInfo?.nationality,
      nin: proprietorInfo?.nin,
      dob: proprietorInfo?.dob,
    });
  }, [proprietorInfo]);

  // const [submitting, setSubmitting] = useState(false);

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

  // async function submitProprietorInfo() {
  //   console.log(details);

  //   try {
  //     setSubmitting(true);

  //     console.log('Submitting Proprietor info');
  //     const res = await client.post('/api/business_registration', details);
  //     console.log(res);

  //     setSubmitting(false);
  //     // navigate(routes.PROPOSED_BUSINESS);
  //   } catch (error) {
  //     setSubmitting(false);
  //     handleApiError(error);
  //   }
  // }

  function continueToBusinessInfo() {
    if (
      details?.first_name &&
      details?.last_name &&
      details?.gender &&
      details?.nationality &&
      details?.nin &&
      details?.dob
    ) {
      navigate(routes.PROPOSED_BUSINESS, {details});
    } else {
      notifyMessage('Please fill all fields');
    }
  }

  function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  // console.log(formatDate(details?.dob));

  // const minimumTenure = 1;
  // const maximumTenure = 24;
  // const currentDate = new Date();

  // const maximumDate = new Date(
  //   currentDate.setMonth(new Date().getMonth() + maximumTenure),
  // );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Platform.OS == 'ios' ? 20 : 0,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <FormInput
          label={'First Name'}
          placeholder={'Enter First Name'}
          onChangeText={text => setDetails({...details, first_name: text})}
          value={details?.first_name}
        />

        <FormInput
          label={'Last Name'}
          placeholder={'Enter Last Name'}
          onChangeText={text => setDetails({...details, last_name: text})}
          value={details?.last_name}
        />

        {/* <FormInput
          label={'Date Of Birth'}
          placeholder={'Enter Date Of Birth'}
        /> */}

        <AppDatePicker
          label={'Date of birth'}
          maximumDate={new Date()}
          onSelected={date => setDetails({...details, dob: formatDate(date)})}
          mode="date"
        />

        <Text style={styles.formlabel}>Gender</Text>

        <View style={[styles.flex, styles.genderOptions]}>
          <Pressable
            onPress={() => setDetails({...details, gender: 'male'})}
            style={[
              styles.flex,
              styles.genderOption,
              styles.leftFormInput,
              {
                borderColor:
                  details?.gender === 'male'
                    ? COLORS.credit
                    : COLORS.borderGray,
              },
            ]}>
            <UseIcon
              type={'MaterialIcons'}
              name={
                details?.gender === 'male'
                  ? 'check-circle-outline'
                  : 'radio-button-unchecked'
              }
              color={
                details?.gender === 'male' ? COLORS.credit : COLORS.borderGray
              }
            />
            <Text
              style={[
                styles.genderLabel,
                {
                  color:
                    details?.gender === 'male'
                      ? COLORS.credit
                      : COLORS.grayText,
                },
              ]}>
              Male
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setDetails({...details, gender: 'female'})}
            style={[
              styles.flex,
              styles.genderOption,
              styles.rightFormInput,
              {
                borderColor:
                  details?.gender === 'female'
                    ? COLORS.credit
                    : COLORS.borderGray,
              },
            ]}>
            <UseIcon
              type={'MaterialIcons'}
              name={
                details?.gender === 'female'
                  ? 'check-circle-outline'
                  : 'radio-button-unchecked'
              }
              color={
                details?.gender === 'female' ? COLORS.credit : COLORS.borderGray
              }
            />
            <Text
              style={[
                styles.genderLabel,
                {
                  color:
                    details?.gender === 'female'
                      ? COLORS.credit
                      : COLORS.grayText,
                },
              ]}>
              Female
            </Text>
          </Pressable>
        </View>

        <FormInput
          label={'Nationality'}
          placeholder={'Enter Nationality'}
          onChangeText={text => setDetails({...details, nationality: text})}
          value={details?.nationality}
        />

        <FormInput
          label={'National Identification Number (NIN)'}
          placeholder={'Enter National Identification Number (NIN)'}
          onChangeText={text => setDetails({...details, nin: text})}
          value={details?.nin}
          maxLength={11}
          keyboardType={'Number-pad'}
        />

        <FormButton
          title={'Continue'}
          buttonStyle={styles.buttonStyle}
          onPress={continueToBusinessInfo}
          // loading={submitting}
          // onPress={() => navigate(routes.PROPOSED_BUSINESS)}
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
