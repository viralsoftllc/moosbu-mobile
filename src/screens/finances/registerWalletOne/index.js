import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS} from '../../../assets/themes';
import client from '../../../shared/api/client';
import notifyMessage from '../../../shared/hooks/notifyMessage';

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

  //function to handle wallet registration
  const handleReg = async () => {
    const options = {
      firstName,
      lastName,
      email,
      phoneNumber,
      addressLine_1,
      addressLine_2,
      city,
      postalCode,
      state,
      country,
    };
    console.log(options);

    try {
      const data = await client.post('/api/create_wallet', options);
      console.log(data);
    } catch (error) {
      console.log(error);
      notifyMessage('error');
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
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                placeholder="Last Name"
                style={styles.input}
                value={lastName}
                onChangeText={text => setLastName(text)}
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
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                placeholder="Phone Number"
                style={styles.input}
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
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
                onChangeText={text => setCountry(text)}
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
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.regular,
              fontWeight: 700,
            }}>
            Continue
          </Text>
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
