import React, {useLayoutEffect, useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../assets/themes';
import ComingSoon from '../../shared/components/ComingSoon';
import FormButton from '../../shared/components/FormButton';
import UseIcon from '../../shared/utils/UseIcon';
import routes from '../../shared/constants/routes';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../../shared/components/ScreenHeader';

import {useSelector} from 'react-redux';
import {selectUser} from '../../redux/slices/user/selectors';
import client from '../../shared/api/client';
import handleApiError from '../../shared/components/handleApiError';
import copyToClipboard from '../../shared/utils/copyToClipboard';
import notifyMessage from '../../shared/hooks/notifyMessage';
import Test from '../Test';

export default function Reward() {
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title="Refer and Earn" />,
    });
  }, [setOptions]);

  const user = useSelector(selectUser);
  console.log(user);

  const [loading, setLoading] = useState(false);

  const [numberOfReferrals, setNumberOfReferrals] = useState(0);
  const [numberOfInvalidReferrals, setNumberOfInvalidReferrals] = useState(0);

  useEffect(() => {
    const fetchReferrals = async () => {
      setLoading(true);
      try {
        const res = await client.get(`/api/ref?refCode=${user.referral_code}`);
        console.log(res.data);
        setNumberOfReferrals(res.data['valid refered user']);
        setNumberOfInvalidReferrals(res.data['invalid refered user']);

        console.log(numberOfReferrals);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleApiError(error);
      }
    };

    fetchReferrals();
  }, [numberOfReferrals]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      {/* <ComingSoon page={'Reward'} iconType={'Ionicons'} iconName={'ios-gift'} /> */}
      {loading ? (
        <Test />
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.contentContainerStyle,
            {paddingHorizontal: Platform.OS == 'ios' ? 20 : 0},
          ]}>
          {/* <View style={styles.flex}>
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
          </View> */}

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
              <Text style={{...FONTS.tiny, textAlign: 'center'}}>
                Referral Code
              </Text>
              <Text style={{...FONTS.h5, marginVertical: 5}}>
                {user.referral_code}
              </Text>
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

              <Text style={styles.referralLabel}>Total Referrals</Text>

              <Text style={{...FONTS.h3}}>
                {numberOfInvalidReferrals + numberOfReferrals}
              </Text>

              {/* <Text style={styles.referralSublabel}>Earnings Balance</Text>
              <Text style={styles.referralValue}>
                {Intl.NumberFormat('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                }).format(numberOfReferrals * 3000)}
              </Text> */}
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
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.referralSublabel}>Verified Referrals</Text>
                <Text style={styles.referralValue}>{numberOfReferrals}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.referralSublabel}>
                  Unverified Referrals
                </Text>
                <Text style={styles.referralValue}>
                  {numberOfInvalidReferrals}
                </Text>
              </View>
            </View>
          </View>
          {/* 
          <FormButton
            title={'Refer a Business'}
            onPress={() => {
              copyToClipboard(user.referral_code);
              notifyMessage(user.referral_code);
            }}
          /> */}
        </ScrollView>
      )}
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
    color: COLORS.textPrimary,
    paddingHorizontal: SIZES.base * 5,
    textAlign: 'center',
    fontFamily: 'Lato-Black',
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
  },
  infoLink: {
    marginLeft: SIZES.base / 2,
    color: COLORS.textSecondary,
    ...FONTS.h5,
    fontSize: 14,
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
    ...FONTS.regular,
    marginBottom: SIZES.base,
  },
  referralSublabel: {
    color: COLORS.grayText,
    ...FONTS.medium,
    marginBottom: SIZES.base,
    width: '70%',
  },
  referral: {
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base * 2,
    flex: 1,
  },
  referralView: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
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
