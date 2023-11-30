import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import UseIcon from '../../../shared/utils/UseIcon';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import {selectPersonalWallet} from '../../../redux/slices/wallet/selectors';
import {setPersonalWallet} from '../../../redux/slices/wallet/slice';
import FormButton from '../../../shared/components/FormButton';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import {selectUser} from '../../../redux/slices/user/selectors';
import Test from '../../Test';
import handleApiError from '../../../shared/components/handleApiError';
import client from '../../../shared/api/client';

export default function CreatePersonalWallet() {
  const {goBack, navigate} = useNavigation();

  const dispatch = useDispatch();
  const personalWallet = useSelector(selectPersonalWallet);
  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const [bvn, setBvn] = useState('');

  const {personalDetailsDone, kycDone, businessDescriptionDone} =
    personalWallet;
  console.log(personalWallet);

  const handleVerify = async () => {
    if (bvn.length < 11) {
      return notifyMessage('Please use a valid BVN');
    }

    try {
      setLoading(true);
      const {data} = await client.post('/api/lookup_bvn', {bvn});
      console.log(data);
      if (data.status == 'successful') {
        // setDetails({...details, bvn});
        dispatch(setPersonalWallet({bvn}));
        setVerified(true);
        setLoading(false);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  };

  //handle create account
  const createAccount = async () => {
    if (!personalDetailsDone) {
      return notifyMessage('Complete personal details');
    }
    if (!businessDescriptionDone) {
      return notifyMessage('Complete business information');
    }
    if (!kycDone) {
      return notifyMessage('Complete verification');
    }

    try {
      setLoading(true);
      const {data} = await client.post('/api/create_subaccount', {
        first_name: personalWallet.firstName,
        last_name: personalWallet.lastName,
        phone: personalWallet.phoneNumber,
        email: personalWallet.email,
        bvn: personalWallet.bvn,
      });
      console.log(data);

      if (data?.data[0].attributes.accountType == 'REGULAR') {
        navigate('SuccessfulRegistration');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 50,
          alignItems: 'center',
          gap: 50,
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
          Create Moosbu Mini Wallet
        </Text>
      </View>

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

          {!verified && (
            <>
              <View style={{marginBottom: 100}}>
                <Text style={styles.label}>BVN</Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  maxLength={11}
                  keyboardType="numeric"
                  onChangeText={text => {
                    setBvn(text);
                  }}
                  value={bvn}
                />
              </View>

              <FormButton title="Verify" onPress={handleVerify} />

              <View
                style={{
                  backgroundColor: '#FFD8D8',
                  padding: 20,
                  borderRadius: 10,
                  marginVertical: 50,
                }}>
                <Text
                  style={{color: '#FF6F6F', marginBottom: 5, ...FONTS.regular}}>
                  Why do we need your BVN
                </Text>
                <View style={styles.list}>
                  <Text>{`\u25CF`}</Text>
                  <Text style={styles.listItem}>
                    We only need your BVN to verify your identity
                  </Text>
                </View>
                <View style={styles.list}>
                  <Text>{`\u25CF`}</Text>
                  <Text style={styles.listItem}>
                    Your BVN is necessary for opening a bank account.
                  </Text>
                </View>
                <View style={styles.list}>
                  <Text>{`\u25CF`}</Text>
                  <Text style={styles.listItem}>
                    Your BVN does not give us access to your funds and
                    transactions.
                  </Text>
                </View>
                <View style={styles.list}>
                  <Text>{`\u25CF`}</Text>
                  <Text style={styles.listItem}>
                    Your BVN is sent to and secured by our partner bank to carry
                    out verification.
                  </Text>
                </View>
                <View style={styles.list}>
                  <Text>{`\u25CF`}</Text>
                  <Text style={styles.listItem}>
                    Dial <Text style={{fontWeight: 600}}>*565*0#</Text> on your
                    registered phone number to get your BVN.
                  </Text>
                </View>
              </View>
            </>
          )}

          {verified && (
            <>
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

              {/* Terms
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
              </Pressable> */}

              <FormButton
                title={'Create Mini Account'}
                onPress={createAccount}
              />
            </>
          )}
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
  inputContainer: {marginBottom: 20},
  label: {
    ...FONTS.medium,
    color: COLORS.label,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    marginTop: 3,
    borderRadius: 5,
    height: 50,
    padding: 10,
    borderColor: COLORS.borderGray,
    ...FONTS.medium,
  },
  list: {
    gap: 5,
    flexDirection: 'row',
  },

  listItem: {...FONTS.small, color: COLORS.label, flex: 1},
});