import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UseIcon from '../../../../shared/utils/UseIcon';

const ratings = [
  {text: 'Have consistent inflow and outflow'},
  {text: 'Add your inventory'},
  {text: 'Repay loans on time'},
  {text: 'Add your customers'},
  {text: 'Link your bank account'},
];

export default function HowCreditScoreWorks() {
  const {setOptions, goBack} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'How it works'} />,
    });

    return () => {};
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.top}>
          <Text style={styles.topInfo}>
            The amount you are able to borrow depends on your Moosbu Credit
            Rating
          </Text>

          <View style={[styles.grade, styles.highGrade]}>
            <Text style={styles.gradeText}>A+</Text>
          </View>

          <Text style={styles.gradeLabel}>The highest rating is A+</Text>

          <View style={styles.hr} />

          <View style={[styles.grade, styles.lowGrade]}>
            <Text style={styles.gradeText}>F+</Text>
          </View>

          <Text style={styles.gradeLabel}>The lowest rating is an F</Text>
        </View>

        <Text style={styles.text}>
          A cash flow advance offer is automatically calculated based on your
          MCR.
        </Text>

        <View>
          <Text style={styles.ratingsHeader}>Improving your rating</Text>
          <Text style={styles.ratingsSubHeader}>
            Improving your Moosbu Credit Rating is based on various factors,
            here are some actions you can take to improve your rating
          </Text>

          {ratings?.map((rating, i) => (
            <View style={styles.rating} key={i}>
              <View style={styles.ratingIcon}>
                <UseIcon
                  type={'MaterialCommunityIcons'}
                  name="calendar-blank-outline"
                  color={'rgb(118, 163, 224)'}
                />
              </View>

              <Text style={styles.ratingText}>{rating.text}</Text>
            </View>
          ))}

          <Text style={styles.text}>
            The more you use your Moosbu account, the better we are able to
            assess your business and offer you loans to grow and succeed. For
            more information please reach out to{' '}
            <Text style={styles.link}>loans@moosbu.com</Text>
          </Text>

          <FormButton title={'Back to dashboard'} onPress={goBack} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 5,
  },
  top: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZES.base * 2,
  },
  topInfo: {
    textAlign: 'center',
    ...FONTS.h5,
    paddingHorizontal: SIZES.paddingHorizontal,
    color: COLORS.textPrimary,
    marginBottom: SIZES.base * 3,
  },
  grade: {
    borderRadius: 100,
    padding: SIZES.base * 2.5,
    marginBottom: SIZES.base * 3,
  },
  highGrade: {
    backgroundColor: COLORS.credit,
  },
  lowGrade: {
    backgroundColor: COLORS.debit,
  },
  gradeText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  gradeLabel: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
  },
  hr: {
    borderTopWidth: 1,
    width: '65%',
    marginVertical: SIZES.base * 4,
    borderColor: COLORS.borderGray,
  },
  text: {
    color: COLORS.textPrimary,
    marginVertical: SIZES.base * 3,
  },
  ratingsHeader: {
    ...FONTS.h6,
    color: COLORS.textPrimary,
    marginBottom: SIZES.base,
  },
  ratingsSubHeader: {
    color: COLORS.textPrimary,
    marginBottom: SIZES.base * 3,
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: SIZES.base * 1.5,
    borderColor: COLORS.borderGray,
    marginBottom: SIZES.base * 2,
  },
  ratingIcon: {
    padding: SIZES.base * 1.4,
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    borderRadius: 100,
    marginRight: SIZES.base * 1.5,
  },
  ratingText: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
  },
  link: {
    color: COLORS.textSecondary,
  },
});
