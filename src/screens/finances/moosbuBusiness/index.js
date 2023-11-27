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

import UseIcon from '../../../shared/utils/UseIcon';
import {SIZES, COLORS, FONTS} from '../../../assets/themes';

import Accordion from '../renderers/Accordion';
import {Checkbox} from 'react-native-paper';
import FormButton from '../../../shared/components/FormButton';

const MoosbuBusiness = () => {
  const [details, setDetails] = useState({});

  const [check, setCheck] = useState(false);
  const toggleCheck = () => setCheck(prev => !prev);

  const [businessInfo, setBusinessInfo] = useState(false);
  const [addressInfo, setAddressInfo] = useState(false);
  const [officerInfo, setOfficerInfo] = useState(false);
  const [officerAddressInfo, setOfficerAddressInfo] = useState(false);

  const checkBusinessInfo = () => {
    setBusinessInfo(!!(details.businessNumber && details.tin));
  };

  const checkAddressInfo = () => {
    setAddressInfo(!!(details.businessAddress && details.proofOfAddress));
  };

  const checkOfficerInfo = () => {
    setOfficerInfo(
      !!(
        details.officerRole &&
        details.officerFullName &&
        details.officerDOB &&
        details.officerEmail &&
        details.officerPhoneNumber
      ),
    );
  };

  const checkOfficerAddress = () => {
    setOfficerAddressInfo(
      !!(details.officerAddress && details.officerProofOfAddress),
    );
  };

  const {goBack} = useNavigation();
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
            Business Moosbu Wallet
          </Text>
        </View>

        <View>
          {/* Basic Business Details */}
          <View style={{marginBottom: 10}}>
            <Accordion title="Basic Business Details" complete={businessInfo}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Business number or Registered company
                </Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  autoCapitalize="words"
                  onChangeText={text =>
                    setDetails({...details, businessNumber: text})
                  }
                  onEndEditing={checkBusinessInfo}
                  value={details.businessNumber}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Tax Identification Number (TIN)
                </Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  keyboardType="phone-pad"
                  onChangeText={text => setDetails({...details, tin: text})}
                  value={details.tin}
                  onEndEditing={checkBusinessInfo}
                />
              </View>
            </Accordion>
          </View>
          {/* Business address */}
          <View style={{marginBottom: 10}}>
            <Accordion title="Business Address" complete={addressInfo}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Business address</Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  autoCapitalize="words"
                  onChangeText={text =>
                    setDetails({...details, businessAddress: text})
                  }
                  onEndEditing={checkAddressInfo}
                  value={details.businessNumber}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Proof of address</Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  keyboardType="phone-pad"
                  onChangeText={text =>
                    setDetails({...details, proofOfAddress: text})
                  }
                  value={details.proofOfAddress}
                  onEndEditing={checkAddressInfo}
                />
              </View>
            </Accordion>
          </View>
          {/* Officer Details */}
          <View style={{marginBottom: 10}}>
            <Accordion title="Officer Details" complete={officerInfo}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Officer role</Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  onChangeText={text =>
                    setDetails({...details, officerRole: text})
                  }
                  onEndEditing={checkOfficerInfo}
                  value={details.officerRole}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Officer full name</Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  autoCapitalize="words"
                  onChangeText={text =>
                    setDetails({...details, officerFullName: text})
                  }
                  value={details.officerFullName}
                  onEndEditing={checkOfficerInfo}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Officer date of birth</Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  onChangeText={text =>
                    setDetails({...details, officerDOB: text})
                  }
                  value={details.officerDOB}
                  onEndEditing={checkOfficerInfo}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  d
                  onChangeText={text =>
                    setDetails({...details, officerEmail: text})
                  }
                  value={details.officerEmail}
                  onEndEditing={checkOfficerInfo}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone number</Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  d
                  onChangeText={text =>
                    setDetails({...details, officerPhoneNumber: text})
                  }
                  value={details.officerPhoneNumber}
                  onEndEditing={checkOfficerInfo}
                />
              </View>
            </Accordion>
          </View>
          {/* Officer address */}
          <View style={{marginBottom: 10}}>
            <Accordion title="Business Address" complete={officerAddressInfo}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Officer address</Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  autoCapitalize="words"
                  onChangeText={text =>
                    setDetails({...details, officerAddress: text})
                  }
                  onEndEditing={checkOfficerAddress}
                  value={details.officerAddress}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Proof of address</Text>
                <TextInput
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  keyboardType="phone-pad"
                  onChangeText={text =>
                    setDetails({...details, officerProofOfAddress: text})
                  }
                  value={details.officerProofOfAddress}
                  onEndEditing={checkOfficerAddress}
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
        </View>

        <FormButton
          title="Create Business Account"
          textStyle={FONTS.h5}
          buttonStyle={{marginVertical: 20}}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default MoosbuBusiness;

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
