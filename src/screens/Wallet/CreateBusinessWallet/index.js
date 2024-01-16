import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Text,
  View,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import UseIcon from '../../../shared/utils/UseIcon';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import {selectBusinessWallet} from '../../../redux/slices/wallet/selectors';
import {setBusinessWallet} from '../../../redux/slices/wallet/slice';
import FormButton from '../../../shared/components/FormButton';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import Test from '../../Test';

import handleApiError from '../../../shared/components/handleApiError';
import client from '../../../shared/api/client';

const CreateBusinessWallet = () => {
  const {navigate, goBack} = useNavigation();
  const dispatch = useDispatch();
  const businessWallet = useSelector(selectBusinessWallet);

  const [bvn, setBvn] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationInfo, setVerificationInfo] = useState({});

  const [loading, setLoading] = useState(false);

  const [bvnVerified, setBvnVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(true);
  const [codeVerified, setCodeVerified] = useState(true);
  const [verified, setVerified] = useState(false);

  const {
    basicBusinessDetailsDone,
    businessAddressDone,
    officerDetailsDone,
    officerAddressDone,
  } = businessWallet;

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
        // setDetails({...details, bvn});
        setVerificationInfo(data.data);
        dispatch(setBusinessWallet({bvn}));
        setBvnVerified(true);
        setPhoneVerified(false);
        setLoading(false);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      // handleApiError(error);
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
          setBusinessWallet({
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

  // create wallet
  const createWallet = async () => {
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

    try {
      setLoading(true);
      const {data} = await client.post('/api/create_wallet', {
        firstName: businessWallet.doingBusinessAs,
        lastName: '',
        phoneNumber: businessWallet.phoneNumber,
        email: businessWallet.email,
        bvn: businessWallet.bvn,
      });

      console.log(data.data);
      if (data.status == 'success') {
        navigate('SuccessfulRegistration');
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
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
          Create Moosbu Pro Wallet
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

              <FormButton title="Send" onPress={handlePhoneNumber} />
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
            </>
          )}
        </ScrollView>
      )}
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
