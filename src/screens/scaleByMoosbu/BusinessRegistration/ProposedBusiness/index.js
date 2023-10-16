import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// import handleApiError from '../../../../shared/components/handleApiError';
// import client from '../../../../shared/api/client';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import routes from '../../../../shared/constants/routes';
import UseIcon from '../../../../shared/utils/UseIcon';
import {useEffect} from 'react';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import {useSelector} from 'react-redux';
import {selectbusinessRegistrationDetails} from '../../../../redux/slices/businessRegistration/selectors';

export default function ProposedBusiness() {
  const {params} = useRoute();

  // const [submitting, setSubmitting] = useState(false);
  const {setOptions, navigate} = useNavigation();
  const proprietorInfo = useSelector(selectbusinessRegistrationDetails);

  const [details, setDetails] = useState({});

  useEffect(() => {
    if (proprietorInfo) {
      setDetails({
        sole_owner: proprietorInfo?.sole_owner === 1 ? 'yes' : 'no',
        business_name: proprietorInfo?.business_name,
        business_description: proprietorInfo?.business_description,
        business_category: proprietorInfo?.business_category,
      });
    } else {
      setDetails({...params?.details});
    }
  }, [params, proprietorInfo]);

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <ScreenHeader
          title={'Tell Us About Your Proposed Business'}
          subtitle="Step 2 of 4"
        />
      ),
    });

    return () => {};
  }, [setOptions]);

  // async function saveInfo() {
  //   console.log(details);

  //   try {
  //     setSubmitting(true);

  //     console.log('Submitting biz info');
  //     const res = await client.post('/api/business_registration', details);
  //     console.log(res);

  //     setSubmitting(false);
  //     // navigate(routes.PROPOSED_BUSINESS);
  //     navigate(routes.BVN_VERIFICATION);
  //   } catch (error) {
  //     setSubmitting(false);
  //     handleApiError(error);
  //   }
  // }

  function continueToBvnInfo() {
    if (
      details?.sole_owner &&
      details?.business_name &&
      details?.business_description &&
      details?.business_category
    ) {
      navigate(routes.BVN_VERIFICATION, {details});
    } else {
      notifyMessage('Please fill all fields');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Platform.OS == 'ios' ? 20 : 0,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.formlabel}>
          Are you the sole owner of the business?
        </Text>

        <View style={[styles.flex, styles.options]}>
          <Pressable
            onPress={() => setDetails({...details, sole_owner: 'yes'})}
            style={[
              styles.flex,
              styles.option,
              styles.leftFormInput,
              {
                borderColor:
                  details?.sole_owner === 'yes'
                    ? COLORS.credit
                    : COLORS.borderGray,
              },
            ]}>
            <UseIcon
              type={'MaterialIcons'}
              name={
                details?.sole_owner === 'yes'
                  ? 'check-circle-outline'
                  : 'radio-button-unchecked'
              }
              color={
                details?.sole_owner === 'yes'
                  ? COLORS.credit
                  : COLORS.borderGray
              }
            />
            <Text
              style={[
                styles.optionLabel,
                {
                  color:
                    details?.sole_owner === 'yes'
                      ? COLORS.credit
                      : COLORS.grayText,
                },
              ]}>
              Yes
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setDetails({...details, sole_owner: 'no'})}
            style={[
              styles.flex,
              styles.option,
              styles.rightFormInput,
              {
                borderColor:
                  details?.sole_owner === 'no'
                    ? COLORS.credit
                    : COLORS.borderGray,
              },
            ]}>
            <UseIcon
              type={'MaterialIcons'}
              name={
                details?.sole_owner === 'no'
                  ? 'check-circle-outline'
                  : 'radio-button-unchecked'
              }
              color={
                details?.sole_owner === 'no' ? COLORS.credit : COLORS.borderGray
              }
            />
            <Text
              style={[
                styles.optionLabel,
                {
                  color:
                    details?.sole_owner === 'no'
                      ? COLORS.credit
                      : COLORS.grayText,
                },
              ]}>
              No
            </Text>
          </Pressable>
        </View>

        <FormInput
          label={'Your propose business name'}
          placeholder={'Enter Your propose business name'}
          onChangeText={text => setDetails({...details, business_name: text})}
          value={details?.business_name}
        />

        <FormInput
          label={'Business description'}
          placeholder={'Enter Business description'}
          // multiline={5}
          onChangeText={text =>
            setDetails({...details, business_description: text})
          }
          value={details?.business_description}
        />

        <FormInput
          label={'Business category'}
          placeholder={'Enter Business category'}
          onChangeText={text =>
            setDetails({...details, business_category: text})
          }
          value={details?.business_category}
        />

        <FormButton
          title={'Continue'}
          buttonStyle={styles.buttonStyle}
          // loading={submitting}
          onPress={continueToBvnInfo}
          // onPress={() => navigate(routes.BVN_VERIFICATION)}
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
  optionLabel: {
    marginLeft: SIZES.base,
  },
  option: {
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base,
    justifyContent: 'center',
    width: '40%',
    flex: 1,
  },
  options: {
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
