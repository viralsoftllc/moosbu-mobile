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
import notifyMessage from '../../../shared/hooks/notifyMessage';

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

  const [details, setDetails] = useState({});

  //industry picker variables
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  //industry picker variables
  const [valueType, setValueType] = useState(null);
  const [isFocusType, setIsFocusType] = useState(false);

  //business state variables
  const [valueState, setValueState] = useState(null);
  const [valueRegState, setValueRegState] = useState(null);
  const [isFocusState, setIsFocusState] = useState(false);
  const [isFocusRegState, setIsFocusRegState] = useState(false);

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
            <Text style={{...FONTS.tiny}}>Step 1 of 2</Text>
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
              value={details.businessName}
              onChangeText={text =>
                setDetails({...details, businessName: text})
              }
              autoCapitalize="words"
            />
            <TextInput
              placeholder="Business BVN"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={details.businessBvn}
              onChangeText={text => setDetails({...details, businessBvn: text})}
              keyboardType="number-pad"
              maxLength={11}
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
                setDetails({...details, industry: item.label});
                setIsFocus(false);
              }}
            />

            <TextInput
              placeholder="Description"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={details.description}
              onChangeText={text => setDetails({...details, description: text})}
              autoCapitalize="words"
            />
            {/* <TextInput
              placeholder="State of Business"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={details.businessState}
              onChangeText={text =>
                setDetails({...details, businessState: text})
              }
              autoCapitalize="words"
            /> */}

            <Dropdown
              style={styles.input}
              placeholderStyle={[{borderWidth: 0, color: COLORS.grayText}]}
              placeholderTextColor={COLORS.grayText}
              itemTextStyle={{
                ...FONTS.medium,
              }}
              selectedTextStyle={{...FONTS.medium}}
              data={[
                {label: 'Abia', value: 'Abia'},
                {label: 'Adamawa', value: 'Adamawa'},
                {label: 'Akwa Ibom', value: 'Akwa Ibom'},
                {label: 'Anambra', value: 'Anambra'},
                {label: 'Bauchi', value: 'Bauchi'},
                {label: 'Bayelsa', value: 'Bayelsa'},
                {label: 'Benue', value: 'Benue'},
                {label: 'Borno', value: 'Borno'},
                {label: 'Cross River', value: 'Cross River'},
                {label: 'Delta', value: 'Delta'},
                {label: 'Ebonyi', value: 'Ebonyi'},
                {label: 'Edo', value: 'Edo'},
                {label: 'Ekiti', value: 'Ekiti'},
                {label: 'Enugu', value: 'Enugu'},
                {label: 'FCT - Abuja', value: 'FCT - Abuja'},
                {label: 'Gombe', value: 'Gombe'},
                {label: 'Imo', value: 'Imo'},
                {label: 'Jigawa', value: 'Jigawa'},
                {label: 'Kaduna', value: 'Kaduna'},
                {label: 'Kano', value: 'Kano'},
                {label: 'Katsina', value: 'Katsina'},
                {label: 'Kebbi', value: 'Kebbi'},
                {label: 'Kogi', value: 'Kogi'},
                {label: 'Kwara', value: 'Kwara'},
                {label: 'Lagos', value: 'Lagos'},
                {label: 'Nasarawa', value: 'Nasarawa'},
                {label: 'Niger', value: 'Niger'},
                {label: 'Ogun', value: 'Ogun'},
                {label: 'Ondo', value: 'Ondo'},
                {label: 'Osun', value: 'Osun'},
                {label: 'Oyo', value: 'Oyo'},
                {label: 'Plateau', value: 'Plateau'},
                {label: 'Rivers', value: 'Rivers'},
                {label: 'Sokoto', value: 'Sokoto'},
                {label: 'Taraba', value: 'Taraba'},
                {label: 'Yobe', value: 'Yobe'},
                {label: 'Zamfara', value: 'Zamfara'},
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocusState ? 'State of Business' : '...'}
              value={valueState}
              onFocus={() => setIsFocusState(true)}
              onBlur={() => setIsFocusState(false)}
              onChange={item => {
                setValueState(item.value);
                setDetails({...details, businessState: item.label});
                setIsFocusState(false);
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
                setDetails({...details, registrationType: item.label});
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
                setDetails({...details, registrationDate: formatDate(date)});
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

            <Dropdown
              style={styles.input}
              placeholderStyle={[{borderWidth: 0, color: COLORS.grayText}]}
              placeholderTextColor={COLORS.grayText}
              itemTextStyle={{
                ...FONTS.medium,
              }}
              selectedTextStyle={{...FONTS.medium}}
              data={[
                {label: 'Abia', value: 'Abia'},
                {label: 'Adamawa', value: 'Adamawa'},
                {label: 'Akwa Ibom', value: 'Akwa Ibom'},
                {label: 'Anambra', value: 'Anambra'},
                {label: 'Bauchi', value: 'Bauchi'},
                {label: 'Bayelsa', value: 'Bayelsa'},
                {label: 'Benue', value: 'Benue'},
                {label: 'Borno', value: 'Borno'},
                {label: 'Cross River', value: 'Cross River'},
                {label: 'Delta', value: 'Delta'},
                {label: 'Ebonyi', value: 'Ebonyi'},
                {label: 'Edo', value: 'Edo'},
                {label: 'Ekiti', value: 'Ekiti'},
                {label: 'Enugu', value: 'Enugu'},
                {label: 'FCT - Abuja', value: 'FCT - Abuja'},
                {label: 'Gombe', value: 'Gombe'},
                {label: 'Imo', value: 'Imo'},
                {label: 'Jigawa', value: 'Jigawa'},
                {label: 'Kaduna', value: 'Kaduna'},
                {label: 'Kano', value: 'Kano'},
                {label: 'Katsina', value: 'Katsina'},
                {label: 'Kebbi', value: 'Kebbi'},
                {label: 'Kogi', value: 'Kogi'},
                {label: 'Kwara', value: 'Kwara'},
                {label: 'Lagos', value: 'Lagos'},
                {label: 'Nasarawa', value: 'Nasarawa'},
                {label: 'Niger', value: 'Niger'},
                {label: 'Ogun', value: 'Ogun'},
                {label: 'Ondo', value: 'Ondo'},
                {label: 'Osun', value: 'Osun'},
                {label: 'Oyo', value: 'Oyo'},
                {label: 'Plateau', value: 'Plateau'},
                {label: 'Rivers', value: 'Rivers'},
                {label: 'Sokoto', value: 'Sokoto'},
                {label: 'Taraba', value: 'Taraba'},
                {label: 'Yobe', value: 'Yobe'},
                {label: 'Zamfara', value: 'Zamfara'},
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocusState ? 'State of Registration' : '...'}
              value={valueRegState}
              onFocus={() => setIsFocusRegState(true)}
              onBlur={() => setIsFocusRegState(false)}
              onChange={item => {
                setValueRegState(item.value);
                setDetails({...details, registeredState: item.label});
                setIsFocusState(false);
              }}
            />

            <TextInput
              placeholder="Website"
              placeholderTextColor={COLORS.grayText}
              style={styles.input}
              value={website}
              onChangeText={text => setDetails({...details, website: text})}
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
              onPress={() => {
                if (
                  !details.businessName &&
                  !details.businessBvn &&
                  !details.registrationType &&
                  !details.registrationDate &&
                  !details.description &&
                  !details.businessState &&
                  !details.registeredState
                ) {
                  return notifyMessage('Please fill all details');
                }
                console.log(details);
                navigate('OfficerDetails', details);
              }}
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
