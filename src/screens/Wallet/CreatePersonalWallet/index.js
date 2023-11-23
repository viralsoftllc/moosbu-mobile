import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import UseIcon from '../../../shared/utils/UseIcon';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import {selectPersonalWallet} from '../../../redux/slices/wallet/selectors';
import {setPersonalWallet} from '../../../redux/slices/wallet/slice';
import FormButton from '../../../shared/components/FormButton';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import {selectUser} from '../../../redux/slices/user/selectors';

export default function CreatePersonalWallet() {
  const {goBack, navigate} = useNavigation();

  const dispatch = useDispatch();
  const personalWallet = useSelector(selectPersonalWallet);
  const user = useSelector(selectUser);

  const {
    personalDetailsDone,
    personalAddressDone,
    kycDone,
    businessDescriptionDone,
  } = personalWallet;
  console.log(personalWallet);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 50,
          alignItems: 'center',
          gap: 70,
        }}>
        <Pressable
          onPress={goBack}
          style={{
            alignSelf: 'flex-start',
            height: 35,
            width: 35,
            borderWidth: 1,
            borderColor: COLORS.borderGray,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: SIZES.radius / 2,
          }}>
          <UseIcon type={'MaterialIcons'} name="arrow-back" size={16} />
        </Pressable>
        <Text
          style={{
            ...FONTS.h4,
          }}>
          Create Moosbu Mini Wallet
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Platform.OS == 'ios' ? 20 : 0,
          paddingBottom: 100,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {/* {user.customerID ? (
          <Text style={{...FONTS.regular, marginBottom: 20}}>
            Dear{' '}
            <Text style={{color: COLORS.primary, ...FONTS.h5}}>
              {user.name}
            </Text>
            , you've finished the first two steps. Please complete the next
            steps to create your moosbu wallet.
          </Text>
        ) : ( */}
        <>
          {/* Personal Information */}
          <Pressable
            style={styles.step}
            onPress={() => navigate('PersonalDetails')}>
            <View style={styles.iconView}>
              {personalDetailsDone ? (
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
              <Text style={styles.label}>Step One</Text>
              <Text style={styles.value}>Personal Details</Text>
            </View>
          </Pressable>

          {/* Business Information */}

          {/* Address */}

          {/* <Pressable
              style={styles.step}
              onPress={() => {
                navigate('PersonalAddress');
              }}>
              <View style={styles.iconView}>
                {personalAddressDone ? (
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
                <Text style={styles.label}>Step Two</Text>
                <Text style={styles.value}>Address</Text>
              </View>
            </Pressable> */}
        </>

        {/* KYC */}

        {/* <Pressable
          style={styles.step}
          onPress={() => navigate('IdentificationDocuments')}>
          <View style={styles.iconView}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="close"
              color={COLORS.debit}
            />
          </View>

          <View>
            <Text style={styles.label}>Step Four</Text>
            <Text style={styles.value}>Identification Documents</Text>
          </View>
        </Pressable> */}

        {/* Business Information */}
        <Pressable
          style={styles.step}
          onPress={() => navigate('BusinessInformation')}>
          <View style={styles.iconView}>
            {businessDescriptionDone ? (
              <UseIcon
                type="MaterialCommunityIcons"
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
            <Text style={styles.label}>Step Two</Text>
            <Text style={styles.value}>Business Information</Text>
          </View>
        </Pressable>

        {/* Verification */}
        <Pressable
          style={styles.step}
          onPress={() => {
            navigate('LevelOneKYC');
          }}>
          <View style={styles.iconView}>
            {kycDone ? (
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
            <Text style={styles.label}>Step Three</Text>
            <Text style={styles.value}>Verification</Text>
          </View>
        </Pressable>

        {/* Terms */}
        <Pressable style={styles.step} onPress={() => navigate('Terms')}>
          <View style={styles.iconView}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="close"
              color={COLORS.debit}
            />
          </View>

          <View>
            <Text style={styles.label}>Step Four</Text>
            <Text style={styles.value}>Agree to Terms</Text>
          </View>
        </Pressable>

        <FormButton
          title={'Create Mini Account'}
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
  step: {
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.base * 1,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base * 2,
  },
  iconView: {
    padding: SIZES.base * 1.4,
    borderRadius: 100,
    marginRight: SIZES.base * 1.5,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  label: {
    color: COLORS.primary,
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
});
