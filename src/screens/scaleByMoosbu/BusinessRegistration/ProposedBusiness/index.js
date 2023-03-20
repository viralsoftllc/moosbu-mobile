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

export default function ProposedBusiness() {
  const {setOptions, navigate} = useNavigation();
  const [isSoleowner, setIsSoleOwner] = useState(null);

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.formlabel}>
          Are you the sole owner of the business?
        </Text>

        <View style={[styles.flex, styles.options]}>
          <Pressable
            onPress={() => setIsSoleOwner(true)}
            style={[
              styles.flex,
              styles.option,
              styles.leftFormInput,
              {
                borderColor: isSoleowner ? COLORS.credit : COLORS.borderGray,
              },
            ]}>
            <UseIcon
              type={'MaterialIcons'}
              name={
                isSoleowner ? 'check-circle-outline' : 'radio-button-unchecked'
              }
              color={isSoleowner ? COLORS.credit : COLORS.borderGray}
            />
            <Text
              style={[
                styles.optionLabel,
                {
                  color: isSoleowner ? COLORS.credit : COLORS.grayText,
                },
              ]}>
              Yes
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setIsSoleOwner(false)}
            style={[
              styles.flex,
              styles.option,
              styles.rightFormInput,
              {
                borderColor: !isSoleowner ? COLORS.credit : COLORS.borderGray,
              },
            ]}>
            <UseIcon
              type={'MaterialIcons'}
              name={
                !isSoleowner ? 'check-circle-outline' : 'radio-button-unchecked'
              }
              color={!isSoleowner ? COLORS.credit : COLORS.borderGray}
            />
            <Text
              style={[
                styles.optionLabel,
                {
                  color: !isSoleowner ? COLORS.credit : COLORS.grayText,
                },
              ]}>
              No
            </Text>
          </Pressable>
        </View>

        <FormInput
          label={'Your propose business name'}
          placeholder={'Enter Your propose business name'}
        />

        <FormInput
          label={'Business description'}
          placeholder={'Enter Business description'}
          // multiline={5}
        />

        <FormInput
          label={'Business category'}
          placeholder={'Enter Business category'}
        />

        <FormButton
          title={'Continue'}
          buttonStyle={styles.buttonStyle}
          onPress={() => navigate(routes.BVN_VERIFICATION)}
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
