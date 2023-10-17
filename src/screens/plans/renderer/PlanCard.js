import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import UseIcon from '../../../shared/utils/UseIcon';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import {verticalScale} from 'react-native-size-matters';

export default function PlanCard({
  benefits,
  onGetStarted,
  onLearnMore,
  isActive,
  isPaid,
  price,
  title,
  businessScale,
}) {
  return (
    <View
      style={[
        styles.planDetails,
        {borderColor: isPaid ? COLORS.primary : COLORS.borderGray},
      ]}>
      <View
        style={[
          styles.planHeader,
          {backgroundColor: isPaid ? COLORS.primary : COLORS.borderGray},
        ]}>
        <Text style={styles.planHeaderText}>₦{price}</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.flex, styles.planScaleView]}>
          <View>
            <Text style={styles.planLength}>{title}</Text>
            <Text style={styles.planScale}>{businessScale}</Text>
          </View>

          {isActive ? <Text style={styles.planStatus}>Active</Text> : null}
        </View>

        <View style={styles.benefits}>
          {benefits?.map((benefit, i) => (
            <View style={[styles.flex, styles.benefit]} key={i}>
              <UseIcon
                type={'MaterialCommunityIcons'}
                name="checkbox-marked-outline"
                color={COLORS.textPrimary}
                size={verticalScale(13)}
              />

              <Text style={styles.benefitTitle}>
                {benefit?.label}{' '}
                <Text style={styles.benefitLabel}>{benefit?.value}</Text>
              </Text>
            </View>
          ))}
        </View>

        {onGetStarted && onLearnMore ? (
          <View style={styles.buttons}>
            <Pressable
              style={[
                styles.getStartedBtn,
                {backgroundColor: isPaid ? COLORS.primary : COLORS.borderGray},
              ]}
              onPress={onGetStarted}>
              <Text style={styles.getStartedText}>Get Started</Text>
            </Pressable>

            <Text style={styles.learnMore} onPress={onLearnMore}>
              Learn More
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  planDetails: {
    borderWidth: 1,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  planHeader: {
    justifyContent: 'center',
    backgroundColor: COLORS.borderGray,
    paddingVertical: SIZES.base,
  },
  planHeaderText: {
    color: COLORS.white,
    textAlign: 'center',
    ...FONTS.h6,
  },
  content: {
    paddingHorizontal: SIZES.base,
    paddingBottom: SIZES.base,
  },
  planScaleView: {
    justifyContent: 'space-between',
    marginVertical: SIZES.base * 1.5,
    paddingLeft: SIZES.base * 2,
  },
  planLength: {
    color: COLORS.textPrimary,
    ...FONTS.h6,
    marginBottom: SIZES.base / 2,
  },
  planScale: {
    color: COLORS.grayText,
    ...FONTS.medium,
  },
  planStatus: {
    backgroundColor: 'rgba(6, 223, 119, 0.2)',
    paddingHorizontal: SIZES.base * 1.5,
    paddingVertical: SIZES.base / 2,
    borderRadius: SIZES.radius * 2,
    ...FONTS.tiny,
    color: COLORS.credit,
  },
  benefits: {
    marginTop: SIZES.base,
  },
  benefitTitle: {
    marginLeft: SIZES.base / 2,
    ...FONTS.medium,
    color: COLORS.textPrimary,
    flex: 1,
  },
  benefitLabel: {
    color: COLORS.grayText,
  },
  benefit: {
    marginBottom: SIZES.base,
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    marginTop: SIZES.base * 2,
  },
  learnMore: {
    paddingVertical: SIZES.base,
    color: COLORS.primary,
    ...FONTS.regular,
  },
  getStartedBtn: {
    backgroundColor: COLORS.borderGray,
    paddingHorizontal: SIZES.base * 3,
    borderRadius: SIZES.base / 2,
    height: verticalScale(32),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedText: {
    color: COLORS.white,
    ...FONTS.medium,
  },
});
