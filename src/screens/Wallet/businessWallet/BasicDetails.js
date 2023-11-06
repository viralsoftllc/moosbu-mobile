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
import DatePicker from 'react-native-date-picker';

import {Dropdown} from 'react-native-element-dropdown';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';

const BasicDetails = () => {
  const {navigate, goBack} = useNavigation();

  const [businessName, setBusinessName] = useState('');
  const [businessBVN, setBusinessBVN] = useState('');
  const [industry, setIndustry] = useState('');
  const [registrationType, setRegistrationType] = useState('');
  // const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [website, setWebsite] = useState('');

  //industry picker variables
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  //industry picker variables
  const [valueType, setValueType] = useState(null);
  const [isFocusType, setIsFocusType] = useState(false);

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
            <Text style={{...FONTS.tiny}}>Step 1 of 3</Text>
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

            <Dropdown
              style={styles.input}
              placeholderStyle={[{borderWidth: 0, color: COLORS.grayText}]}
              placeholderTextColor={COLORS.grayText}
              itemTextStyle={{
                ...FONTS.medium,
              }}
              selectedTextStyle={{...FONTS.medium}}
              data={[
                {label: 'Auto', value: 'auto'},
                {label: 'FMCG', value: 'fmcg'},
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Industry' : '...'}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
            <Dropdown
              style={styles.input}
              placeholderStyle={[{borderWidth: 0, color: COLORS.grayText}]}
              placeholderTextColor={COLORS.grayText}
              itemTextStyle={{
                ...FONTS.medium,
              }}
              selectedTextStyle={{...FONTS.medium}}
              data={[
                {label: 'Individual', value: 'Male'},
                {label: 'Business', value: 'Female'},
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocusType ? 'Registration Type' : '...'}
              value={valueType}
              onFocus={() => setIsFocusType(true)}
              onBlur={() => setIsFocusType(false)}
              onChange={item => {
                setValueType(item.value);
                setIsFocusType(false);
              }}
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
              placeholder="Date of Registration"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={dateUI}
              onPressIn={() => setOpen(true)}
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
