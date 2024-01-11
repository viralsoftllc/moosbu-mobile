import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import routes from '../../../shared/constants/routes';
import UseIcon from '../../../shared/utils/UseIcon';
import client from '../../../shared/api/client';
import handleApiError from '../../../shared/components/handleApiError';
import {useDispatch, useSelector} from 'react-redux';
import {setBusinessRegistrationDetails} from '../../../redux/slices/businessRegistration/slice';
import {selectbusinessRegistrationDetails} from '../../../redux/slices/businessRegistration/selectors';
import Test from '../../Test';
import notifyMessage from '../../../shared/hooks/notifyMessage';

export default function BussinessRegistration() {
  const {setOptions, navigate} = useNavigation();
  const dispatch = useDispatch();

  const details = useSelector(selectbusinessRegistrationDetails);

  const [loading, setLoading] = useState(false);

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

  const getAllCategories = useCallback(async () => {
    setLoading(true);

    try {
      const {data} = await client.get('/api/business_registrations');
      setLoading(false);
      // console.log('biz reg');
      console.log(data);

      dispatch(setBusinessRegistrationDetails(data?.[0]));
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  function checkProprietorInfo() {
    if (
      details?.first_name &&
      details?.last_name &&
      details?.dob &&
      details?.gender &&
      details?.nationality &&
      details?.nin
    ) {
      return true;
    }

    return false;
  }

  function checkBvinInfo() {
    if (details?.bvn) {
      return true;
    }

    return false;
  }

  function checkBusinessInfo() {
    if (
      details?.sole_owner === 0 ||
      (details?.sole_owner === 1 &&
        details?.business_name &&
        details?.business_description &&
        details?.business_category)
    ) {
      return true;
    }

    return false;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      {loading ? (
        <Test />
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: Platform.OS == 'ios' ? 20 : 0,
            paddingBottom: 100,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator size={'large'} style={styles.loader} />
          ) : null}

          {/* Step 1 */}
          <Pressable
            style={styles.step}
            onPress={() => {
              // if (checkProprietorInfo()) {
              //   return notifyMessage('Step completed');
              // }

              navigate(routes.PROPRIETOR_INFO);
            }}>
            <View style={styles.iconView}>
              {checkProprietorInfo() ? (
                <UseIcon
                  type={'MaterialCommunityIcons'}
                  name="check"
                  color={COLORS.credit}
                />
              ) : (
                <UseIcon
                  type={'MaterialCommunityIcons'}
                  name="close"
                  color={COLORS.debit}
                />
              )}
            </View>

            <View>
              <Text style={styles.label}>First Step</Text>
              <Text style={styles.value}>Proprietor information</Text>
            </View>
          </Pressable>

          {/* step 2 */}
          <Pressable
            style={styles.step}
            onPress={() => {
              // if (checkBvinInfo()) {
              //   return notifyMessage('Step completed');
              // }
              navigate(routes.PROPOSED_BUSINESS);
            }}>
            <View style={styles.iconView}>
              {checkBusinessInfo() ? (
                <UseIcon
                  type={'MaterialCommunityIcons'}
                  name="check"
                  color={COLORS.credit}
                />
              ) : (
                <UseIcon
                  type={'MaterialCommunityIcons'}
                  name="close"
                  color={COLORS.debit}
                />
              )}
            </View>

            <View>
              <Text style={styles.label}>Second Step</Text>
              <Text style={styles.value}>Business information</Text>
            </View>
          </Pressable>

          {/* step 3 */}
          {/* <Pressable
          style={styles.step}
          onPress={() => navigate(routes.BVN_VERIFICATION)}>
          <View style={styles.iconView}>
            {checkBvinInfo() ? (
              <UseIcon
                type={'MaterialCommunityIcons'}
                name="check"
                color={COLORS.credit}
              />
            ) : (
              <UseIcon
                type={'MaterialCommunityIcons'}
                name="close"
                color={COLORS.debit}
              />
            )}
          </View>

          <View>
            <Text style={styles.label}>Third Step</Text>
            <Text style={styles.value}>BVN Verification</Text>
          </View>
        </Pressable> */}

          {/* step 4 */}
          <Pressable
            style={styles.step}
            onPress={() => navigate(routes.BILLING)}>
            <View style={styles.iconView}>
              <UseIcon
                type={'MaterialCommunityIcons'}
                name="close"
                color={COLORS.debit}
              />
            </View>

            <View>
              <Text style={styles.label}>Third Step</Text>
              <Text style={styles.value}>Billing</Text>
            </View>
          </Pressable>

          <FormButton
            title={'Need help? Contact Us'}
            buttonStyle={styles.buttonStyle}
            onPress={() => navigate(routes.CONTACT_SUPPORT)}
          />
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
    ...FONTS.medium,
  },
  value: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontFamily: 'Lato-Bold',
  },
  buttonStyle: {
    marginTop: SIZES.base * 5,
    marginBottom: SIZES.base * 3,
  },
  loader: {
    marginBottom: SIZES.base * 2,
  },
});
