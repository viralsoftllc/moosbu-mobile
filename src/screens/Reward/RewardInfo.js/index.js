import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import UseIcon from '../../../shared/utils/UseIcon';

export default function RewardInfo() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Info='} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View>
          <View style={styles.iconView}>
            <UseIcon
              type={'Ionicons'}
              name="trophy-outline"
              color={COLORS.white}
              size={verticalScale(25)}
            />
          </View>

          <Text style={styles.subtext}>Total Points</Text>
          <Text style={styles.text}>100.00</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.steps}>
            The more businesses you refer to Moosbu the greater the rewards. In
            order to earn cash and points your invites must:
          </Text>

          <Text style={styles.step}>1. Complete the sign up process</Text>
          <Text style={styles.step}>
            2. Upload all documents so their account is verified
          </Text>
          <Text style={styles.step}>
            3. Deposit at least N100K through an inbound transfer
          </Text>
        </View>

        {/* LEVEL 1 */}
        <View style={[styles.card, styles.flex]}>
          <View style={[styles.smallIconView, styles.levelCompleted]}>
            <UseIcon
              type={'MaterialIcons'}
              name="check"
              color={COLORS.white}
              size={verticalScale(18)}
            />
          </View>

          <View style={[styles.flex, styles.details]}>
            <View>
              <Text style={styles.cardLevel}>Level 1</Text>
              <Text style={styles.cardCount}>1-5 businesses</Text>
              <Text style={styles.cardPoints}>N3,000 + 100 points</Text>
            </View>
          </View>
        </View>

        {/* Level 2 */}
        <View style={[styles.card, styles.flex]}>
          <View style={[styles.smallIconView]}>
            {/* <UseIcon
              type={'MaterialIcons'}
              name="check"
              color={COLORS.white}
              size={verticalScale(18)}
            /> */}
            <Text style={styles.level}>L2</Text>
          </View>

          <View style={[styles.flex, styles.details]}>
            <View>
              <Text style={styles.cardLevel}>Level 2</Text>
              <Text style={styles.cardCount}>6-10 businesses</Text>
              <Text style={styles.cardPoints}>N5,000 + 150 points</Text>
            </View>
          </View>
        </View>

        {/* Level 3 */}
        <View style={[styles.card, styles.flex]}>
          <View style={[styles.smallIconView]}>
            {/* <UseIcon
              type={'MaterialIcons'}
              name="check"
              color={COLORS.white}
              size={verticalScale(18)}
            /> */}
            <Text style={styles.level}>L3</Text>
          </View>

          <View style={[styles.flex, styles.details]}>
            <View>
              <Text style={styles.cardLevel}>Level 3</Text>
              <Text style={styles.cardCount}>11-20 businesses</Text>
              <Text style={styles.cardPoints}>N8,000 + 200 points</Text>
            </View>
          </View>
        </View>
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
    backgroundColor: COLORS.credit,
    borderRadius: 100,
    marginVertical: SIZES.base * 4,
  },
  info: {
    marginBottom: SIZES.base * 4,
  },
  text: {
    ...FONTS.large,
    fontFamily: 'Lato-Black',
    color: COLORS.textPrimary,
    paddingHorizontal: SIZES.base * 5,
    textAlign: 'center',
  },
  subtext: {
    ...FONTS.medium,
    color: COLORS.grayText,
    marginVertical: SIZES.base,
    textAlign: 'center',
  },
  steps: {
    marginBottom: SIZES.base,
    color: COLORS.grayText,
    marginTop: SIZES.base * 3,
    ...FONTS.medium,
  },
  step: {
    color: COLORS.grayText,
    ...FONTS.medium,
    marginBottom: SIZES.base / 2,
  },
  card: {
    borderRadius: SIZES.radius,
    padding: SIZES.base,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    marginBottom: SIZES.base,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    marginLeft: SIZES.base * 2,
  },
  cardLevel: {
    color: COLORS.textPrimary,
    marginBottom: SIZES.base * 1.5,
    ...FONTS.h5,
  },
  cardPoints: {
    color: COLORS.grayText,
    ...FONTS.medium,
    marginBottom: SIZES.base / 2,
  },
  cardCount: {
    color: COLORS.credit,
    marginBottom: SIZES.base / 2,
    ...FONTS.medium,
  },
  smallIconView: {
    height: verticalScale(40),
    width: verticalScale(40),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  levelCompleted: {
    backgroundColor: COLORS.credit,
    borderWidth: 0,
  },
  level: {
    color: COLORS.textPrimary,
  },
});
