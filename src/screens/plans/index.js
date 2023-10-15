import React, {useLayoutEffect, useState} from 'react';

import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import ScreenHeader from '../../shared/components/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, SIZES} from '../../assets/themes';
import FreePlan from './FreePlan';
import PaidPlan from './PaidPlan';
import UseIcon from '../../shared/utils/UseIcon';
import {scale} from 'react-native-size-matters';
import PlanComparison from './renderer/PlanComparison';
import {useSelector} from 'react-redux';
import {selectUser} from '../../redux/slices/user/selectors';

export default function Plans() {
  const {setOptions} = useNavigation();
  const user = useSelector(selectUser);

  const [isMonthly, setIsMonthly] = useState(true);
  const [showComparison, setShowComparison] = useState(false);

  function toggleComparisonModal() {
    setShowComparison(!showComparison);
  }

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Choose Your Subscription Plan'} />,
    });
  }, [setOptions]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLORS.primary} />
        <View style={styles.innerView}>
          <View style={styles.planPeriodContainer}>
            <View style={styles.planPeriodButtons}>
              <Pressable
                onPress={() => setIsMonthly(true)}
                style={[
                  styles.planPeriodButton,
                  isMonthly && styles.planActive,
                ]}>
                <Text
                  style={[
                    styles.planPeriodText,
                    isMonthly && styles.planActiveText,
                  ]}>
                  Monthly
                </Text>
              </Pressable>

              <View style={styles.planButtonSpacer} />

              <Pressable
                onPress={() => setIsMonthly(false)}
                style={[
                  styles.planPeriodButton,
                  !isMonthly && styles.planActive,
                ]}>
                <Text
                  style={[
                    styles.planPeriodText,
                    !isMonthly && styles.planActiveText,
                  ]}>
                  Yearly
                </Text>
              </Pressable>
            </View>
          </View>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.contentContainerStyle,
              {paddingHorizontal: Platform.OS == 'ios' ? 20 : 0},
            ]}>
            <View>
              <View style={styles.unlockDisplayView}>
                <Text style={styles.unlockDisplayHeader}>
                  Unlock Moosbu's Potential
                </Text>
                <Text style={styles.unlockDisplaySubheader}>
                  You are still on Free plan. Premium users see{' '}
                  <Text style={styles.textGreen}>45% better results</Text>
                </Text>
              </View>

              <FreePlan isActive={user?.plan !== 2} />

              <PaidPlan isActive={user?.plan === 2} />

              <Pressable
                style={styles.detailedViewBtn}
                onPress={toggleComparisonModal}>
                <Text style={styles.detailedViewText}>
                  Show detailed plan comparison
                </Text>

                <UseIcon
                  name={'chevron-right'}
                  type="MaterialIcons"
                  color={COLORS.primary}
                  size={scale(20)}
                />
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      <Modal visible={showComparison} animationType="fade">
        <PlanComparison toggleComparisonModal={toggleComparisonModal} />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: SIZES.base / 2,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  innerView: {
    flex: 1,
  },
  planPeriodContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: SIZES.base * 2,
    marginTop: SIZES.base,
  },
  planPeriodButtons: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    padding: SIZES.base / 2,
    borderRadius: 100,
    borderColor: COLORS.primary,
  },
  planPeriodButton: {
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.base,
    minWidth: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  planButtonSpacer: {
    marginHorizontal: SIZES.base / 2,
  },
  planPeriodText: {
    color: COLORS.textPrimary,
  },
  planActive: {
    backgroundColor: COLORS.primary,
  },
  planActiveText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    paddingBottom: SIZES.base * 2,
  },
  unlockDisplayView: {
    marginBottom: SIZES.base * 2,
  },
  unlockDisplayHeader: {
    ...FONTS.h5,
    // fontWeight: '600',
    marginBottom: SIZES.base / 5,
    color: COLORS.textPrimary,
  },
  unlockDisplaySubheader: {
    ...FONTS.medium,
    fontWeight: '400',
    color: COLORS.textGray,
  },
  textGreen: {
    color: COLORS.credit,
  },
  detailedViewBtn: {
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: SIZES.base * 2,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radius,
    marginVertical: SIZES.base * 2,
  },
  detailedViewText: {
    color: COLORS.primary,
    ...FONTS.regular,
  },
});
