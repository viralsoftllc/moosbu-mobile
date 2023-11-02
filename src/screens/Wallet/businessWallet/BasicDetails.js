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
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';

const BasicDetails = () => {
  const {navigate, goBack} = useNavigation();

  const [businessName, setBusinessName] = useState('');
  const [businessBVN, setBusinessBVN] = useState('');
  const [industry, setIndustry] = useState('');
  const [registrationType, setRegistrationType] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [website, setWebsite] = useState('');

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
                ...FONTS.h4,
                fontWeight: '700',
              }}>
              Activate Your Wallet
            </Text>
            <Text style={{...FONTS.tiny, fontWeight: '700'}}>Step 1 of 3</Text>
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
            Basic Details
          </Text>

          <View style={{gap: 15}}>
            <TextInput
              placeholder="Business Name"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={businessName}
              onChangeText={text => setBusinessName(text)}
              autoCapitalize="words"
            />
            <TextInput
              placeholder="Business BVN"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={businessBVN}
              onChangeText={text => setBusinessBVN(text)}
            />
            <TextInput
              placeholder="Industry"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={industry}
              onChangeText={text => setIndustry(text)}
              autoCapitalize="words"
            />
            <TextInput
              placeholder="Registration Type"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={registrationType}
              onChangeText={text => setRegistrationType(text)}
              autoCapitalize="words"
            />
            <TextInput
              placeholder="Date of Registration"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={date}
              onChangeText={text => setDate(text)}
              autoCapitalize="words"
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={description}
              onChangeText={text => setDescription(text)}
              autoCapitalize="words"
            />
            <TextInput
              placeholder="Country"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={country}
              onChangeText={text => setCountry(text)}
              autoCapitalize="words"
            />
            <TextInput
              placeholder="Website"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={website}
              onChangeText={text => setWebsite(text)}
              autoCapitalize="words"
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => navigate('Address')}
              style={styles.button}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.regular,
                  fontWeight: '700',
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

export default BasicDetails;

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
