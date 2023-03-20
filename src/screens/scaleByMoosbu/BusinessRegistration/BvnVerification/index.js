import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import routes from '../../../../shared/constants/routes';

export default function BvnVerification() {
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <ScreenHeader title={'BVN Verification'} subtitle="Step 3 of 4" />
      ),
    });

    return () => {};
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <FormInput label={'BVN Number'} placeholder={'Enter Your BVN Number'} />
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
          onPress={() => navigate(routes.BILLING)}
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
