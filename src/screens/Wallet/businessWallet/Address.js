import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';

const Address = ({route}) => {
  const {navigate, goBack} = useNavigation();

  // const {details} = route.params;

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [website, setWebsite] = useState('');

  const [details, setDetails] = useState({});

  //country picker variables
  const [valueCountry, setValueCountry] = useState(null);
  const [isFocusCountry, setIsFocusCountry] = useState(false);

  useEffect(() => {
    setDetails({...route.params});
  }, [route.params]);

  return (
    <SafeAreaView>
      <ScrollView
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
              onPress={() => goBack()}
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
                ...FONTS.h5,
              }}>
              Activate Your Wallet
            </Text>
            <Text style={{...FONTS.tiny}}>Step 2 of 3</Text>
          </View>

          <Text style={{textAlign: 'center', ...FONTS.medium}}>
            Kindly fill the details below to activate your wallet
          </Text>
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.medium,
              color: COLORS.textGray,
            }}>
            Address
          </Text>

          <View style={{gap: 15}}>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)}
              autoCapitalize="words"
            />
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
            />
            <TextInput
              placeholder="Address"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={address}
              onChangeText={text => setAddress(text)}
              multiline={true}
            />

            <TextInput
              placeholder="City"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={city}
              onChangeText={text => setCity(text)}
              autoCapitalize="words"
            />
            <TextInput
              placeholder="State"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={state}
              onChangeText={text => setState(text)}
              autoCapitalize="words"
            />
            <Dropdown
              style={styles.input}
              placeholderStyle={[
                {borderWidth: 0, color: COLORS.grayText, ...FONTS.medium},
              ]}
              itemTextStyle={{
                ...FONTS.medium,
              }}
              selectedTextStyle={{...FONTS.medium}}
              data={[
                {label: 'Nigeria', value: 'NG'},
                {label: 'Ghana', value: 'GH'},
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocusCountry ? 'Country' : '...'}
              value={valueCountry}
              onFocus={() => setIsFocusCountry(true)}
              onBlur={() => setIsFocusCountry(false)}
              onChange={item => {
                setValueCountry(item.value);
                setIsFocusCountry(false);
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => navigate('OfficerDetails')}
              style={styles.button}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h5,
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    gap: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'flex-start',
    paddingBottom: 100,
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
  button: {
    minWidth: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
  },
});
