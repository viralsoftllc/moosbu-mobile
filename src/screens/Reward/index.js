import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../assets/themes';
import ComingSoon from '../../shared/components/ComingSoon';
import FormButton from '../../shared/components/FormButton';
import UseIcon from '../../shared/utils/UseIcon';
import routes from '../../shared/constants/routes';
import {useNavigation} from '@react-navigation/native';

export default function Reward() {
  const {navigate} = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* <ComingSoon page={'Reward'} iconType={'Ionicons'} iconName={'ios-gift'} /> */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.flex}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Refer And Earn</Text>
            <Text style={styles.subheaderText}>
              Extra goodness to secure your Moosbu account
            </Text>
          </View>

          <Pressable
            style={styles.flex}
            onPress={() => navigate(routes.REWARD_INFO)}>
            <UseIcon
              type={'AntDesign'}
              name="arrowright"
              color={COLORS.textSecondary}
            />

            <Text style={styles.infoLink}>Info</Text>
          </Pressable>
        </View>

        <View>
          <View style={styles.iconView}>
            <UseIcon
              type={'MaterialIcons'}
              name="person-add-alt"
              color={COLORS.white}
              size={verticalScale(25)}
            />
          </View>

          <Text style={styles.subtext}>Refer & Earn Points</Text>
          <Text style={styles.text}>Level 1</Text>

          <Pressable style={styles.linkBtn}>
            <Text style={styles.linkText}>Share your link</Text>
          </Pressable>
        </View>

        <View style={styles.referralView}>
          <View style={[styles.referral, styles.borderRight]}>
            <View style={styles.smallIconView}>
              <UseIcon
                type={'MaterialIcons'}
                name="person-add-alt"
                color={COLORS.primary}
                size={verticalScale(18)}
              />
            </View>

            <Text style={styles.referralLabel}>Referral Earnings</Text>
            <Text style={styles.referralSublabel}>Earnings Balance</Text>
            <Text style={styles.referralValue}>N3,000.00</Text>
          </View>

          <View style={styles.referral}>
            <View style={styles.smallIconView}>
              <UseIcon
                type={'MaterialIcons'}
                name="person-add-alt"
                color={COLORS.primary}
                size={verticalScale(18)}
              />
            </View>

            <Text style={styles.referralLabel}>Number of Referrals</Text>
            <Text style={styles.referralSublabel}>Total Referrals</Text>
            <Text style={styles.referralValue}>1</Text>
          </View>
        </View>

        <FormButton title={'Refer a Business'} />
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
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 5,
  },
  iconView: {
    alignSelf: 'center',
    height: verticalScale(80),
    width: verticalScale(80),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 100,
    marginVertical: SIZES.base * 4,
  },
  smallIconView: {
    height: verticalScale(48),
    width: verticalScale(48),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    borderRadius: 100,
    marginBottom: SIZES.base * 2,
  },
  text: {
    ...FONTS.large,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    paddingHorizontal: SIZES.base * 5,
    textAlign: 'center',
  },
  subtext: {
    ...FONTS.medium,
    color: COLORS.grayText,
    marginVertical: SIZES.base,
    fontWeight: '300',
    textAlign: 'center',
  },
  highlight: {
    color: COLORS.primary,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flex: 1,
  },
  headerText: {
    color: COLORS.textPrimary,
    ...FONTS.h5,
  },
  subheaderText: {
    ...FONTS.tiny,
    color: COLORS.grayText,
    marginTop: SIZES.base / 2,
    fontWeight: '300',
  },
  infoLink: {
    marginLeft: SIZES.base / 2,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  linkBtn: {
    alignSelf: 'center',
    borderRadius: SIZES.radius * 2,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base * 4,
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    marginVertical: SIZES.base * 3,
  },
  referralLabel: {
    color: COLORS.textPrimary,
    ...FONTS.h5,
    marginBottom: SIZES.base / 2,
  },
  referralSublabel: {
    color: COLORS.grayText,
    ...FONTS.medium,
    marginBottom: SIZES.base * 1.5,
  },
  referral: {
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base * 2,
    flex: 1,
  },
  referralView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base * 5,
  },
  referralValue: {
    color: COLORS.textPrimary,
    ...FONTS.h5,
  },
  borderRight: {
    borderRightWidth: 1,
    borderColor: COLORS.borderGray,
  },
});
