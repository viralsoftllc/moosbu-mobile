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

const OfficerDetails = () => {
  const {navigate, goBack} = useNavigation();

  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [maidenName, setMaidenName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bvn, setBvn] = useState('');
  const [title, setTitle] = useState('');
  const [state, setState] = useState('');
  const [percentage, setPercentage] = useState('');
  const [dob, setDob] = useState('');

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
            <Text style={{...FONTS.tiny, fontWeight: '700'}}>Step 3 of 3</Text>
          </View>

          <Text style={{textAlign: 'center', ...FONTS.medium}}>
            Create an account to improve the growth of your business
          </Text>
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.medium,
              color: COLORS.textGray,
            }}>
            Officer details
          </Text>

          <View style={{gap: 15}}>
            <TextInput
              placeholder="Role"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={role}
              onChangeText={text => setRole(text)}
              autoCapitalize="words"
            />
            <TextInput
              placeholder="First Name"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
            <TextInput
              placeholder="Middle Name"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={middleName}
              onChangeText={text => setMiddleName(text)}
            />

            <TextInput
              placeholder="Last Name"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={lastName}
              onChangeText={text => setLastName(text)}
              autoCapitalize="words"
            />
            <TextInput
              placeholder="Maiden Name"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={maidenName}
              onChangeText={text => setMaidenName(text)}
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
              autoCapitalize="words"
            />
            <TextInput
              placeholder="BVN"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={bvn}
              onChangeText={text => setBvn(text)}
              autoCapitalize="words"
            />
            <TextInput
              placeholder="Title"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={title}
              onChangeText={text => setTitle(text)}
              autoCapitalize="words"
            />
            <TextInput
              placeholder="Percentage of Share"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={percentage}
              onChangeText={text => setPercentage(text)}
              autoCapitalize="words"
            />
            <TextInput
              placeholder="Date of Birth"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={dob}
              onChangeText={text => setDob(text)}
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
              onPress={() => navigate('')}
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

export default OfficerDetails;

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
