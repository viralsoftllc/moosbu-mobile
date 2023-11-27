import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import client from '../../../shared/api/client';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import handleApiError from '../../../shared/components/handleApiError';
import {countryListAllIsoData} from '../../../shared/countryList';
import {verticalScale} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const RegisterWalletOne = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressLine_1, setAddressLine_1] = useState('');
  const [addressLine_2, setAddressLine_2] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');

  //country picker variables
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [loading, setLoading] = useState(false);
  const middleName = '';

  //Function to conver country to country code
  const handleCountry = text => {
    const country = countryListAllIsoData.find(({name}) => {
      return name == text;
    });
    const {code} = country;

    return setCountryCode(prev => (prev = code));
  };

  //function to handle wallet registration
  const handleReg = async country => {
    // handleCountry(country);

    //Handle input validation
    if (!firstName || !lastName) {
      return notifyMessage('Name cannot be blank');
    } else if (phoneNumber.length !== 11) {
      return notifyMessage('Please enter a valid phone number');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return notifyMessage('Email is invalid');
    } else if (!addressLine_1) {
      return notifyMessage('Please enter Address Line 1');
    } else if (!city) {
      return notifyMessage('Please enter City');
    } else if (!postalCode) {
      return notifyMessage('Please enter Postal Code');
    } else if (!state) {
      return notifyMessage('Please enter State');
    } else if (!country) {
      return notifyMessage('Please enter Country');
    }

    //Convert Country to Code

    const options = {
      firstName,
      lastName,
      middleName,
      email,
      phoneNumber,
      addressLine_1,
      addressLine_2,
      city,
      postalCode,
      state,
      country: 'NG',
    };
    // console.log(options);
    setLoading(true);
    try {
      const {data} = await client.post('/api/create_wallet', options);
      console.log(data);
      navigation.navigate('RegisterWalletTwo');
      notifyMessage('Success');
      setLoading(false);
    } catch (error) {
      console.log(error);
      // notifyMessage('error');
      handleApiError(error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.primary} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={{gap: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
                alignSelf: 'flex-start',
                height: verticalScale(30),
                width: verticalScale(30),
                borderWidth: 1,
                borderColor: COLORS.borderGray,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: SIZES.radius / 2,
              }}>
              <Icon name="arrow-back" size={16} />
            </Pressable>
            <Text
              style={{
                ...FONTS.h4,
              }}>
              Activate Your Wallet
            </Text>
            <Text style={{...FONTS.tiny}}>Step 1 of 2</Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              gap: 20,
            }}>
            <Text style={{textAlign: 'center', ...FONTS.medium}}>
              Kindly fill the details below to activate your wallet
            </Text>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: COLORS.textSecondary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="lock-outline" size={40} color={COLORS.primary} />
            </View>
          </View>
        </View>
        <KeyboardAwareScrollView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{paddingBottom: 70}}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 10,
              }}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  placeholder="First Name"
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  value={firstName}
                  onChangeText={text => setFirstName(text)}
                  autoCapitalize="words"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  value={lastName}
                  onChangeText={text => setLastName(text)}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 10,
              }}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  value={email}
                  onChangeText={text => setEmail(text)}
                  inputMode="email"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  placeholder="Phone Number"
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={text => setPhoneNumber(text)}
                  inputMode="tel"
                  maxLength={11}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 10,
              }}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  placeholder="Address Line 1"
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  value={addressLine_1}
                  onChangeText={text => setAddressLine_1(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text></Text>
                <TextInput
                  placeholder="Address Line 2 (Optional}"
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  value={addressLine_2}
                  onChangeText={text => setAddressLine_2(text)}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',

                alignItems: 'center',
                gap: 10,
              }}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="city"
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  value={city}
                  onChangeText={text => setCity(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Postal Code"
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  value={postalCode}
                  onChangeText={text => setPostalCode(text)}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 10,
              }}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="State"
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  value={state}
                  onChangeText={text => setState(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                {/* <TextInput
                  placeholder="Country"
                  placeholderTextColor={COLORS.grayText}
                  style={styles.input}
                  value={country}
                  onChangeText={text => setCountry(text.trim())}
                  autoComplete="off"
                  autoCapitalize="words"
                /> */}
                <Dropdown
                  style={styles.input}
                  placeholderStyle={[
                    styles.input,
                    {borderWidth: 0, color: COLORS.textGray},
                  ]}
                  itemTextStyle={{
                    ...FONTS.small,
                  }}
                  selectedTextStyle={{...FONTS.small}}
                  data={[{label: 'Nigeria', value: 'NG'}]}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select Country' : '...'}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setCountry(item.label);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
            }}>
            <TouchableOpacity
              onPress={() => handleReg(country)}
              style={styles.button}>
              {loading ? (
                <ActivityIndicator color={COLORS.white} size={'small'} />
              ) : (
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.h5,
                  }}>
                  Continue
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterWalletOne;

const styles = StyleSheet.create({
  container: {
    gap: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
    // justifyContent: 'flex-start',
    paddingBottom: 100,
  },

  inputContainer: {flex: 0.5},
  label: {...FONTS.small, color: COLORS.label, fontWeight: '500'},
  input: {
    borderWidth: 1,
    marginTop: 3,
    borderRadius: 5,
    height: 50,
    padding: 10,
    borderColor: COLORS.borderGray,
    ...FONTS.medium,
  },
  button: {
    minWidth: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
  },
});
