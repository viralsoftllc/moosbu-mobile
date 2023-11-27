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

const MoosbuMini = () => {
  const {goBack} = useNavigation();

  const [bvn, setBvn] = useState('');
  const [details, setDetails] = useState({});

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
      !!(details.proprietorName && details.phoneNumber && details.email),
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
    try {
      const {data} = await client.post('/api/validate_selfie', {bvn});
      console.log(data);
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <SafeAreaView style={{padding: 20}}>
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

        <View>
          {/* Personal Details */}
          <View style={{marginBottom: 10}}>
            <Accordion title="Personal Information" complete={personalInfo}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Proprietor name</Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  autoCapitalize="words"
                  onChangeText={text =>
                    setDetails({...details, proprietorName: text})
                  }
                  onEndEditing={checkPersonalInfo}
                  value={details.proprietorName}
                />
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
                  onChangeText={text => setDetails({...details, email: text})}
                  value={details.email}
                  onEndEditing={checkPersonalInfo}
                />
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
                  placeholder={!isFocus ? 'Select business category' : '...'}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                    setDetails({...details, business_category: item.label});
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
                  onChangeText={text => setDetails({...details, address: text})}
                  value={details.address}
                  onEndEditing={checkVerifyInfo}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Proof of address</Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  onChangeText={text => setDetails({...details, address: text})}
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
                  I agree to Moosbu terms of use and privacy policy to empower
                  your staff to confirm customer transfers even when you are not
                  available, ensuring continuity of business operations
                </Text>
              </View>
            </Accordion>
          </View>
          <FormButton
            title="Create Mini Account"
            textStyle={FONTS.h5}
            buttonStyle={{marginVertical: 20}}
          />
        </View>
      </KeyboardAwareScrollView>
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
