import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS} from '../../../assets/themes';
import client from '../../../shared/api/client';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import handleApiError from '../../../shared/components/handleApiError';
import {countryListAllIsoData} from '../../../shared/countryList';

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

  const [loading, setLoading] = useState(false);
  const middleName = 'Moosbu';

  //Function to conver country to country code
  const handleCountry = text => {
    const country = countryListAllIsoData.find(({name}) => {
      return name == text;
    });
    const {code} = country;

    setCountryCode(prev => (prev = code));
  };

  //function to handle wallet registration
  const handleReg = async () => {
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
    handleCountry(country);

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
      country: countryCode,
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
    <View style={styles.container}>
      <View style={{gap: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} />
          </Pressable>
          <Text
            style={{
              ...FONTS.h4,
              fontWeight: 700,
            }}>
            Activate Your Wallet
          </Text>
          <Text style={{...FONTS.small, fontWeight: 700}}>Step 1 of 2</Text>
        </View>
        <Text style={{textAlign: 'center', ...FONTS.medium, fontWeight: 600}}>
          Kindly fill the details below to activate your wallet
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: COLORS.secondary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="lock-outline" size={40} color={COLORS.primary} />
          </View>
        </View>
      </View>
      <KeyboardAvoidingView>
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
                style={styles.input}
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
                inputMode="tel"
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
                style={styles.input}
                value={addressLine_1}
                onChangeText={text => setAddressLine_1(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text></Text>
              <TextInput
                placeholder="Address Line 2 (Optional}"
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
                style={styles.input}
                value={city}
                onChangeText={text => setCity(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Postal Code"
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
                style={styles.input}
                value={state}
                onChangeText={text => setState(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Country"
                style={styles.input}
                value={country}
                onChangeText={text => setCountry(text.trim())}
                autoComplete="off"
                autoCapitalize="words"
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
        <TouchableOpacity
          onPress={() => {
            handleReg();
            // navigation.navigate('RegisterWalletTwo')
          }}
          style={styles.button}>
          {loading ? (
            <ActivityIndicator color={COLORS.white} size={'large'} />
          ) : (
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.regular,
                fontWeight: 700,
              }}>
              Continue
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterWalletOne;

const styles = StyleSheet.create({
  container: {flex: 1, gap: 50, padding: 20},

  inputContainer: {flex: 1},
  label: {...COLORS.medium, lineHeight: 14.4},
  input: {
    borderWidth: 1,
    marginTop: 3,
    borderRadius: 5,
    height: 44,
    padding: 10,
    borderColor: COLORS.borderGray,
    fontSize: 12,
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
