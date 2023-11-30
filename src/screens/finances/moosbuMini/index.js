import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';

import {Dropdown} from 'react-native-element-dropdown';

import UseIcon from '../../../shared/utils/UseIcon';
import {SIZES, COLORS, FONTS} from '../../../assets/themes';

import FormButton from '../../../shared/components/FormButton';
import client from '../../../shared/api/client';
import handleApiError from '../../../shared/components/handleApiError';
import Accordion from '../renderers/Accordion';
import {Checkbox} from 'react-native-paper';
import Test from '../../Test';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import {launchCamera} from 'react-native-image-picker';

const MoosbuMini = () => {
  const {goBack, navigate} = useNavigation();

  const [bvn, setBvn] = useState('');
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  //business category variables
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [check, setCheck] = useState(false);
  const toggleCheck = () => setCheck(prev => !prev);

  const [personalInfo, setPersonalInfo] = useState(false);
  const [businessInfo, setBusinessInfo] = useState(false);
  const [verifyInfo, setVerifyInfo] = useState(false);

  const checkPersonalInfo = () => {
    setPersonalInfo(
      !!(
        details.firstName &&
        details.lastName &&
        details.phoneNumber &&
        details.email &&
        details.selfie
      ),
    );
  };

  const checkBusinessInfo = () => {
    setBusinessInfo(
      !!(
        details.businessName &&
        details.businessDescription &&
        details.business_category
      ),
    );
  };

  const checkVerifyInfo = () => {
    setVerifyInfo(!!(details.bvn && details.address));
  };

  const handleVerify = async () => {
    if (bvn.length < 11) {
      return notifyMessage('Please use a valid BVN');
    }

    try {
      setLoading(true);
      const {data} = await client.post('/api/lookup_bvn', {bvn});
      console.log(data);
      if (data.status == 'successful') {
        setDetails({...details, bvn});
        setVerified(true);
        setLoading(false);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  };

  //handle image from camera
  const handleCamera = async () => {
    await launchCamera(
      {
        maxHeight: 500,
        maxWidth: 500,
        quality: 0.4,
        mediaType: 'photo',
        includeBase64: true,
        saveToPhotos: false,
      },
      res => {
        // console.log(res);
        if (res.didCancel) {
          // user cancelled image picker
        } else if (res.error) {
          // error opening image picker
        } else {
          setDetails({...details, selfie: res.assets[0].base64});
        }
      },
    );
  };

  //handle create account
  const createAccount = async () => {
    console.log('JI');
    if (!personalInfo || !businessInfo || !verifyInfo || !check) {
      return notifyMessage('All fields are required');
    }

    try {
      setLoading(true);
      const {data} = await client.post('/api/create_subaccount', {
        first_name: details.firstName,
        last_name: details.lastName,
        phone: details.phoneNumber,
        email: details.email,
        bvn: details.bvn,
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
    <SafeAreaView style={{padding: 20}}>
      {loading ? (
        <Test />
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
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
                flex: 1,
                textAlign: 'left',
              }}>
              Mini Moosbu Wallet
            </Text>
          </View>

          {/* <>
          <FormInput
            label="Enter bvn"
            value={bvn}
            onChangeText={text => setBvn(text)}
            keyboardType="numeric"
            maxLength={11}
          />

          <FormButton title="Enter" onPress={handleVerify} />
        </> */}

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
            </>
          )}

          {verified && (
            <View>
              {/* Personal Details */}
              <View style={{marginBottom: 10}}>
                <Accordion title="Personal Information" complete={personalInfo}>
                  <View
                    style={[
                      styles.inputContainer,
                      {flexDirection: 'row', gap: 20},
                    ]}>
                    <View style={{flex: 1}}>
                      <Text style={styles.label}>First name</Text>
                      <TextInput
                        placeholderTextColor={COLORS.grayText}
                        style={styles.input}
                        autoCapitalize="words"
                        onChangeText={text =>
                          setDetails({...details, firstName: text})
                        }
                        onEndEditing={checkPersonalInfo}
                        value={details.firstName}
                      />
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={styles.label}>Last name</Text>
                      <TextInput
                        placeholderTextColor={COLORS.grayText}
                        style={styles.input}
                        autoCapitalize="words"
                        onChangeText={text =>
                          setDetails({...details, lastName: text})
                        }
                        onEndEditing={checkPersonalInfo}
                        value={details.lastName}
                      />
                    </View>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone number</Text>
                    <TextInput
                      placeholderTextColor={COLORS.grayText}
                      style={styles.input}
                      keyboardType="phone-pad"
                      onChangeText={text =>
                        setDetails({...details, phoneNumber: text})
                      }
                      value={details.phoneNumber}
                      onEndEditing={checkPersonalInfo}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email address</Text>
                    <TextInput
                      placeholderTextColor={COLORS.grayText}
                      style={styles.input}
                      keyboardType="email-address"
                      onChangeText={text =>
                        setDetails({...details, email: text})
                      }
                      value={details.email}
                      onEndEditing={checkPersonalInfo}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Pressable
                      onPress={handleCamera}
                      style={{
                        height: 44,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderStyle: 'dashed',
                        borderWidth: 1,
                        flex: 1,
                        backgroundColor: COLORS.lightSecondaryBackground,
                        borderColor: COLORS.borderGray,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontFamily: 'Lato-Bold',
                          fontSize: 12,
                        }}>
                        Take a Selfie
                      </Text>
                    </Pressable>
                    <Text style={{textAlign: 'center', ...FONTS.tiny}}>
                      Please provide us with a good photo of yourself. Make sure
                      to hold device at eye level and center your face when you
                      are ready.
                    </Text>
                  </View>
                </Accordion>
              </View>
              {/* Business details */}
              <View style={{marginBottom: 10}}>
                <Accordion title="Business Information" complete={businessInfo}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name of business</Text>
                    <TextInput
                      placeholderTextColor={COLORS.grayText}
                      style={styles.input}
                      autoCapitalize="words"
                      onChangeText={text =>
                        setDetails({...details, businessName: text})
                      }
                      value={details.businessName}
                      onEndEditing={checkBusinessInfo}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Business description</Text>
                    <TextInput
                      placeholderTextColor={COLORS.grayText}
                      style={styles.input}
                      onChangeText={text =>
                        setDetails({...details, businessDescription: text})
                      }
                      value={details.businessDescription}
                      onEndEditing={checkBusinessInfo}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Business category</Text>
                    <Dropdown
                      style={styles.input}
                      placeholderStyle={[styles.input, {borderWidth: 0}]}
                      itemTextStyle={{
                        ...FONTS.medium,
                      }}
                      selectedTextStyle={{...FONTS.medium}}
                      data={[
                        {
                          label: 'Accommodation And Food Services Activities',
                          value: 'Accommodation And Food Services Activities',
                        },
                        {
                          label:
                            'Activities Of Extraterritorial Organisations and Bodies',
                          value:
                            'Activities Of Extraterritorial Organisations and Bodies',
                        },
                        {
                          label:
                            'Activities Of House As Employment Undifferentiated Goods-And Services-Producing',
                          value:
                            'Activities Of House As Employment Undifferentiated Goods-And Services-Producing',
                        },
                        {
                          label:
                            'Activities Of Administrative And Support Services Activities',
                          value:
                            'Activities Of Administrative And Support Services Activities',
                        },
                        {
                          label: 'Art, Entertainment And Recreation ',
                          value: 'Art, Entertainment And Recreation ',
                        },
                        {
                          label: 'Agriculture Forestry & Fishing ',
                          value: 'Agriculture Forestry & Fishing ',
                        },
                        {
                          label: 'Community-Based Association ',
                          value: 'Community-Based Association ',
                        },
                        {
                          label: 'Cultural Based Association ',
                          value: 'Cultural Based Association ',
                        },
                        {label: 'Construction ', value: 'Construction '},
                        {label: 'Education', value: 'Education'},
                        {
                          label: 'Faith-Based Association',
                          value: 'Faith-Based Association',
                        },
                        {
                          label: 'Financial And Insurance Activities',
                          value: 'Financial And Insurance Activities',
                        },
                        {
                          label: 'Foundation Based Association',
                          value: 'Foundation Based Association',
                        },
                        {
                          label: 'Human Health And Social Work Activities',
                          value: 'Human Health And Social Work Activities',
                        },
                        {
                          label: 'Information And Communication',
                          value: 'Information And Communication',
                        },
                        {label: 'Manufacturing', value: 'Manufacturing'},
                        {
                          label: 'Mining And Quarrying',
                          value: 'Mining And Quarrying',
                        },
                        {
                          label: 'Other Service Activities',
                          value: 'Other Service Activities',
                        },
                        {label: 'Others', value: 'Others'},
                        {label: 'Power', value: 'Power'},
                        {
                          label:
                            'Professional, Scientific And Technical Activities',
                          value:
                            'Professional, Scientific And Technical Activities',
                        },
                        {
                          label:
                            'Public Administration And Defence; Defence, Compulsory Social Security ',
                          value:
                            'Public Administration And Defence; Defence, Compulsory Social Security ',
                        },
                        {
                          label: 'Real Estate Activities',
                          value: 'Real Estate Activities',
                        },
                        {
                          label: 'Repairs Of Motorvehicles And Motorcycles',
                          value: 'Repairs Of Motorvehicles And Motorcycles',
                        },
                        {
                          label: 'Social Clubs Based Association',
                          value: 'Social Clubs Based Association',
                        },
                        {
                          label: 'Sporting Based Association',
                          value: 'Sporting Based Association',
                        },
                        {label: 'Transportation', value: 'Transportation'},
                        {
                          label:
                            'Water-supply, Sewerage, Waste Management, And Remediation Activities',
                          value:
                            'Water-supply, Sewerage, Waste Management, And Remediation Activities',
                        },
                        {
                          label:
                            'Wholesale And Retail Trade; Repair Of Motor Vehicles And Motor Vehicles And Motorcycles',
                          value:
                            'Wholesale And Retail Trade; Repair Of Motor Vehicles And Motor Vehicles And Motorcycles',
                        },
                      ]}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={
                        !isFocus ? 'Select business category' : '...'
                      }
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                        setDetails(prev => ({
                          ...prev,
                          business_category: item.label,
                        }));
                        checkBusinessInfo();
                      }}
                    />
                  </View>
                </Accordion>
              </View>
              {/* verification */}
              <View style={{marginBottom: 10}}>
                <Accordion title="Verification" complete={verifyInfo}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>BVN</Text>
                    <TextInput
                      placeholderTextColor={COLORS.grayText}
                      style={styles.input}
                      onChangeText={text => setDetails({...details, bvn: text})}
                      value={details.bvn}
                      onEndEditing={checkVerifyInfo}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                      placeholderTextColor={COLORS.grayText}
                      style={styles.input}
                      onChangeText={text =>
                        setDetails({...details, address: text})
                      }
                      value={details.address}
                      onEndEditing={checkVerifyInfo}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Proof of address</Text>
                    <TextInput
                      placeholderTextColor={COLORS.grayText}
                      style={styles.input}
                      onChangeText={text =>
                        setDetails({...details, address: text})
                      }
                      value={details.address}
                    />
                  </View>
                </Accordion>
              </View>
              {/* Terms */}
              <View style={{marginBottom: 10}}>
                <Accordion title="Agree to Terms" complete={check}>
                  <View style={{flexDirection: 'row', gap: 5}}>
                    <Checkbox
                      status={check ? 'checked' : 'unchecked'}
                      color={COLORS.primary}
                      onPress={toggleCheck}
                    />
                    <Text style={{...FONTS.medium, width: '85%'}}>
                      I agree to Moosbu terms of use and privacy policy to
                      empower your staff to confirm customer transfers even when
                      you are not available, ensuring continuity of business
                      operations
                    </Text>
                  </View>
                </Accordion>
              </View>
              <FormButton
                title="Create Mini Account"
                textStyle={FONTS.h5}
                buttonStyle={{marginVertical: 20}}
                onPress={createAccount}
              />
            </View>
          )}
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
};

export default MoosbuMini;

const styles = StyleSheet.create({
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
});
