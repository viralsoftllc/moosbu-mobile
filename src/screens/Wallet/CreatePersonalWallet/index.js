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
import FormInput from '../../../shared/components/FormInput';

export default function CreatePersonalWallet() {
  const {goBack, navigate} = useNavigation();

  const dispatch = useDispatch();
  const personalWallet = useSelector(selectPersonalWallet);
  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(false);

  const [bvnVerified, setBvnVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(true);
  const [codeVerified, setCodeVerified] = useState(true);
  const [verified, setVerified] = useState(false);

  const [bvn, setBvn] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationInfo, setVerificationInfo] = useState({});

  const {personalDetailsDone, kycDone, businessDescriptionDone} =
    personalWallet;

  //verify bvn
  const handleVerify = async () => {
    if (bvn.length < 11) {
      return notifyMessage('Please use a valid BVN');
    }

    try {
      setLoading(true);
      const {data} = await client.post('/api/lookup_bvn', {bvn});
      console.log(data);
      if (data.status == 'successful') {
        setVerificationInfo(data.data);

        dispatch(setPersonalWallet({bvn}));
        setBvnVerified(true);
        setPhoneVerified(false);
        setLoading(false);
        return;
      }

      if (data.status == 'error') {
        notifyMessage(data.data);
        setLoading(false);
        return;
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('BVN not found!');
      notifyMessage('BVN not found!');
    }
  };

  //verify phone
  const handlePhoneNumber = async () => {
    if (phoneNumber != verificationInfo.phone_number1) {
      return notifyMessage('Please enter number linked to bvn!');
    }

    try {
      setLoading(true);
      const {data} = await client.post('/api/bvn-number/verification', {
        phone: `+234${phoneNumber.slice(1)}`,
      });
      console.log(data);
      const {statusCode, status} = data;
      if (statusCode == 200) {
        dispatch(
          setPersonalWallet({
            firstName: verificationInfo.first_name,
            middleName: verificationInfo.middle_name,
            lastName: verificationInfo.last_name,
            dob: verificationInfo.date_of_birth,
            phoneNumber,
          }),
        );

        setPhoneVerified(true);
        setCodeVerified(false);
        setLoading(false);
        notifyMessage(status);
        return;
      }
      setLoading(false);
      notifyMessage(status);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  };

  //verify code
  const handleCode = async () => {
    try {
      setLoading(true);
      const {data} = await client.post('/api/phone/verification', {
        phone: `+234${phoneNumber.slice(1)}`,
        token: code,
      });
      console.log(data);
      const {statusCode, Message} = data;
      if (statusCode == 200) {
        setCodeVerified(true);
        setVerified(true);
        setLoading(false);
        notifyMessage(Message);
        return;
      }

      setLoading(false);
      notifyMessage(Message);
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
      const {data} = await client.post('/api/create_wallet', {
        firstName: `${personalWallet.firstName} / ${personalWallet.doingBusinessAs}`,
        lastName: '',
        phoneNumber: personalWallet.phoneNumber,
        email: personalWallet.email,
        bvn: personalWallet.bvn,
      });
      console.log(data);

      if (data.statusCode == 200) {
        navigate('SuccessfulRegistration');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  };

  const digits = () => {
    return <Text style={{fontFamily: FONTS.regular}}>234</Text>;
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

          {!bvnVerified && (
            <>
              <View style={{marginBottom: 30}}>
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

          {!phoneVerified && (
            <>
              <View style={{marginBottom: 30}}>
                <Text style={styles.label}>Phone number</Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  maxLength={11}
                  keyboardType="numeric"
                  onChangeText={text => {
                    setPhoneNumber(text);
                  }}
                  value={phoneNumber}
                />
              </View>

              <FormButton
                title="Send Verification Code"
                onPress={handlePhoneNumber}
              />
            </>
          )}

          {!codeVerified && (
            <>
              <View style={{marginBottom: 30}}>
                <Text style={styles.label}>Enter OTP</Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  maxLength={11}
                  keyboardType="numeric"
                  onChangeText={text => {
                    setCode(text);
                  }}
                  value={code}
                />
              </View>
              <View style={{gap: 15}}>
                <FormButton title="Verify" onPress={handleCode} />
                <FormButton
                  buttonStyle={{
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                  }}
                  textStyle={{color: COLORS.primary}}
                  title="Resend Verification Code"
                  onPress={handlePhoneNumber}
                />
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
                  <Text style={styles.value}>Personal / Business Address</Text>
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
