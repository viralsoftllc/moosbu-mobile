import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import {COLORS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import routes from '../../../../shared/constants/routes';

export default function PersonalInformation() {
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Personal information'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <FormInput placeholder={'First Name'} />
        <FormInput placeholder={'Last Name'} />
        <FormInput placeholder={'Business Name'} />
        <FormInput placeholder={'Phone Number'} />
        <FormInput placeholder={'Email Address'} />
        <FormInput placeholder={'Address'} />
        <FormInput placeholder={'City'} />
        <FormInput placeholder={'State'} />
        <FormButton
          title={'Continue'}
          onPress={() => navigate(routes.REFEREE)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingBottom: SIZES.base,
    paddingTop: SIZES.base * 2,
  },
});
