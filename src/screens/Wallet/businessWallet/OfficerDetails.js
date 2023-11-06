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

import {Dropdown} from 'react-native-element-dropdown';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import DatePicker from 'react-native-date-picker';

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

  const [valueTitle, setValueTitle] = useState(null);
  const [isFocusTitle, setIsFocusTitle] = useState(false);

  const [valueRole, setValueRole] = useState(null);
  const [isFocusRole, setIsFocusRole] = useState(false);

  //Date picker
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateUI, setDateUI] = useState('');

  //format date
  function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', {year: 'numeric'});
    const month = date.toLocaleString('default', {
      month: '2-digit',
    });
    const day = date.toLocaleString('default', {day: '2-digit'});

    const formattedDate = [year, month, day].join('-');
    return formattedDate;
  }

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
            <Text style={{...FONTS.tiny}}>Step 3 of 3</Text>
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
                {label: 'Owner', value: 'mr'},
                {label: 'Partner', value: 'mrs'},
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocusRole ? 'Role' : '...'}
              value={valueRole}
              onFocus={() => setIsFocusRole(true)}
              onBlur={() => setIsFocusRole(false)}
              onChange={item => {
                setValueRole(item.value);
                setIsFocusRole(false);
              }}
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
                {label: 'Mr', value: 'mr'},
                {label: 'Mrs', value: 'mrs'},
                {label: 'Miss', value: 'ms'},
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocusTitle ? 'Title' : '...'}
              value={valueTitle}
              onFocus={() => setIsFocusTitle(true)}
              onBlur={() => setIsFocusTitle(false)}
              onChange={item => {
                setValueTitle(item.value);
                setIsFocusTitle(false);
              }}
            />
            <TextInput
              placeholder="Percentage of Share"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={percentage}
              onChangeText={text => setPercentage(text)}
              autoCapitalize="words"
            />

            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDateUI(formatDate(date));
              }}
              onCancel={() => {
                setOpen(false);
              }}
              mode="date"
            />
            <TextInput
              placeholder="Date of birth"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={dateUI}
              onPressIn={() => setOpen(true)}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => notifyMessage('Will add the endpoint tonight sir')}
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
