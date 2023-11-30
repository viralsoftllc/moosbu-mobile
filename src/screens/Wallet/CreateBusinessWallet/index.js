import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Text,
  View,
} from 'react-native';
import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import UseIcon from '../../../shared/utils/UseIcon';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import {selectBusinessWallet} from '../../../redux/slices/wallet/selectors';
import FormButton from '../../../shared/components/FormButton';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import notifyMessage from '../../../shared/hooks/notifyMessage';

const CreateBusinessWallet = () => {
  const {setOptions, navigate, goBack} = useNavigation();
  const dispatch = useDispatch();
  const businessWallet = useSelector(selectBusinessWallet);

  const {
    basicBusinessDetailsDone,
    businessAddressDone,
    officerDetailsDone,
    officerAddressDone,
  } = businessWallet;

  console.log(businessWallet);

  const createWallet = (async = () => {
    if (!basicBusinessDetailsDone) {
      return notifyMessage('Complete business details');
    }
    if (!businessAddressDone) {
      return notifyMessage('Complete business address');
    }
    if (!officerAddressDone) {
      return notifyMessage('Complete officer details');
    }
    if (!officerAddressDone) {
      return notifyMessage('Complete officer address');
    }

    notifyMessage('Endpoint is in the pipeline');
  });

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
            ...FONTS.h5,
          }}>
          Create Business Wallet
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Platform.OS == 'ios' ? 20 : 0,
          paddingBottom: 100,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Pressable
          style={styles.step}
          onPress={() => navigate('BasicBusinessDetails')}>
          <View style={styles.iconView}>
            {basicBusinessDetailsDone ? (
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
            <Text style={styles.value}>Basic Business Details</Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.step}
          onPress={() => navigate('BusinessAddress')}>
          <View style={styles.iconView}>
            {businessAddressDone ? (
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
            <Text style={styles.value}>Business Address</Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.step}
          onPress={() => navigate('OfficerDetails')}>
          <View style={styles.iconView}>
            {officerDetailsDone ? (
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
            <Text style={styles.value}>Officer Details</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.step}
          onPress={() => navigate('OfficerAddress')}>
          <View style={styles.iconView}>
            {officerAddressDone ? (
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
            <Text style={styles.label}>Step Four</Text>
            <Text style={styles.value}>Officer Address</Text>
          </View>
        </Pressable>

        {/* <Pressable style={styles.step}>
          <View style={styles.iconView}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="close"
              color={COLORS.debit}
            />
          </View>

          <View>
            <Text style={styles.label}>Step Five</Text>
            <Text style={styles.value}>Agree to Terms</Text>
          </View>
        </Pressable> */}

        <FormButton
          title={'Create Business Wallet'}
          buttonStyle={styles.buttonStyle}
          onPress={createWallet}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateBusinessWallet;

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
});
