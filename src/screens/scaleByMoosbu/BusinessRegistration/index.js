import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import routes from '../../../shared/constants/routes';
import UseIcon from '../../../shared/utils/UseIcon';

export default function BussinessRegistration() {
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <ScreenHeader
          title={'Register your business'}
          subtitle="Pick up where you left off"
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
        {/* Step 1 */}
        <Pressable
          style={styles.step}
          onPress={() => navigate(routes.PROPRIETOR_INFO)}>
          <View style={styles.iconView}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="close"
              color={COLORS.debit}
            />
          </View>

          <View>
            <Text style={styles.label}>First Step</Text>
            <Text style={styles.value}>Proprietor information</Text>
          </View>
        </Pressable>

        {/* step 2 */}
        <Pressable
          style={styles.step}
          onPress={() => navigate(routes.PROPOSED_BUSINESS)}>
          <View style={styles.iconView}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="close"
              color={COLORS.debit}
            />
          </View>

          <View>
            <Text style={styles.label}>Second Step</Text>
            <Text style={styles.value}>Business information</Text>
          </View>
        </Pressable>

        {/* step 3 */}
        <Pressable
          style={styles.step}
          onPress={() => navigate(routes.BVN_VERIFICATION)}>
          <View style={styles.iconView}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="close"
              color={COLORS.debit}
            />
          </View>

          <View>
            <Text style={styles.label}>Third Step</Text>
            <Text style={styles.value}>BVN Verification</Text>
          </View>
        </Pressable>

        {/* step 4 */}
        <Pressable style={styles.step} onPress={() => navigate(routes.BILLING)}>
          <View style={styles.iconView}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="close"
              color={COLORS.debit}
            />
          </View>

          <View>
            <Text style={styles.label}>Fourth Step</Text>
            <Text style={styles.value}>Billing</Text>
          </View>
        </Pressable>

        <FormButton
          title={'Need help? Message Us'}
          buttonStyle={styles.buttonStyle}
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
  },
  iconView: {
    padding: SIZES.base * 1.4,
    borderRadius: 100,
    marginRight: SIZES.base * 1.5,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  step: {
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.base * 2,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base * 2,
  },
  label: {
    color: COLORS.grayText,
    marginBottom: SIZES.base / 2,
  },
  value: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontWeight: 'bold',
  },
  buttonStyle: {
    marginTop: SIZES.base * 5,
    marginBottom: SIZES.base * 3,
  },
});
