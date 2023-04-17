import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';

import handleApiError from '../../../../shared/components/handleApiError';
import client from '../../../../shared/api/client';
import {COLORS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import routes from '../../../../shared/constants/routes';
import {useSelector} from 'react-redux';
import {selectbusinessRegistrationDetails} from '../../../../redux/slices/businessRegistration/selectors';

export default function BvnVerification() {
  const {setOptions, navigate} = useNavigation();
  const {params} = useRoute();

  const [submitting, setSubmitting] = useState(false);
  const [details, setDetails] = useState({});

  const proprietorInfo = useSelector(selectbusinessRegistrationDetails);

  useEffect(() => {
    if (proprietorInfo) {
      setDetails({
        bvn: proprietorInfo?.bvn,
      });
    } else {
      setDetails({...params?.details});
    }
  }, [proprietorInfo, params]);

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <ScreenHeader title={'BVN Verification'} subtitle="Step 3 of 4" />
      ),
    });

    return () => {};
  }, [setOptions]);

  async function saveInfo() {
    console.log(details);

    try {
      setSubmitting(true);

      await client.post('/api/business_registration', details);

      setSubmitting(false);
      // navigate(routes.PROPOSED_BUSINESS);
      navigate(routes.BILLING);
    } catch (error) {
      setSubmitting(false);
      handleApiError(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <FormInput
          label={'BVN Number'}
          placeholder={'Enter Your BVN Number'}
          maxLength={11}
          onChangeText={text => setDetails({...details, bvn: text})}
          value={details?.bvn}
        />

        <Text style={styles.text}>
          We use your BVN number to verify your identity . When you enter your
          BVN the only ndata we are bable to retrieve is your name, date of
          birth and the mobile number attached to your BVN. We do not have
          access to any of your bank account, transaction history or other
          sensitive financial data
        </Text>

        <FormButton
          title={'Continue'}
          buttonStyle={styles.buttonStyle}
          // onPress={() => navigate(routes.BILLING)}
          onPress={saveInfo}
          loading={submitting}
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
  buttonStyle: {
    marginTop: SIZES.base * 10,
    marginBottom: SIZES.base,
  },
  text: {
    color: COLORS.grayText,
    textAlign: 'center',
  },
});
