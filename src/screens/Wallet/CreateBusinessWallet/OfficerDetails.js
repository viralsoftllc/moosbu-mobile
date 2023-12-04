import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/FormButton';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import {launchCamera} from 'react-native-image-picker';
import {setBusinessWallet} from '../../../redux/slices/wallet/slice';
import {selectBusinessWallet} from '../../../redux/slices/wallet/selectors';

const OfficerDetails = () => {
  const {goBack, navigate} = useNavigation();
  const dispatch = useDispatch();

  const businessWallet = useSelector(selectBusinessWallet);

  const [details, setDetails] = useState({});

  //Date Picker variables
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [isFocus, setIsFocus] = useState(false);

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

  //handle image from camera
  const handleCamera = async () => {
    await launchCamera(
      {
        maxHeight: 500,
        maxWidth: 500,
        quality: 0.4,
        mediaType: 'photo',
        includeBase64: true,
        saveToPhotos: false,
      },
      res => {
        // console.log(res);
        if (res.didCancel) {
          // user cancelled image picker
        } else if (res.error) {
          // error opening image picker
        } else {
          setDetails({...details, officerSelfie: res.assets[0].base64});
          console.log(res.assets[0]);
        }
      },
    );
  };

  const handleNext = () => {
    if (!details.role) {
      return notifyMessage('Role required');
    }
    if (!details.firstName) {
      return notifyMessage('First name required');
    }
    if (!details.lastName) {
      return notifyMessage('Last name required');
    }
    if (!details.middleName) {
      return notifyMessage('Middle name required');
    }
    if (!details.dob) {
      return notifyMessage('Please enter date of birth');
    }
    if (!details.email) {
      return notifyMessage('Email required');
    }
    if (!details.phoneNumber) {
      return notifyMessage('Phone number required');
    }

    if (!details.officerSelfie) {
      return notifyMessage('Please take a selfie');
    }
    const officerDetailsDone = true;
    dispatch(setBusinessWallet({...details, officerDetailsDone}));
    navigate('OfficerAddress');
  };

  useEffect(() => {
    setDetails({
      ...details,
      role: businessWallet.role || '',
      firstName: businessWallet.firstName || '',
      lastName: businessWallet.lastName || '',
      middleName: businessWallet.middleName || '',
      maidenName: businessWallet.maidenName || '',
      dob: businessWallet.dob || '',
      email: businessWallet.email || '',
      phoneNumber: businessWallet.phoneNumber || '',
      officerSelfie: businessWallet.officerSelfie || '',
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 50,
          alignItems: 'center',
          gap: 50,
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
            // textAlign: 'center',
            flex: 1,
          }}>
          Officer Details
        </Text>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingHorizontal: Platform.OS == 'ios' ? 20 : 0,
          paddingBottom: 100,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Officer Role</Text>
          <Dropdown
            style={styles.input}
            itemTextStyle={{
              ...FONTS.medium,
            }}
            selectedTextStyle={{...FONTS.medium}}
            data={[
              {label: 'Director', value: 'Director'},
              {label: 'Owner', value: 'Owner'},
            ]}
            placeholder="Choose role"
            placeholderStyle={[styles.label, {color: COLORS.grayText}]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={details.role}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setDetails({...details, role: item.value});
              setIsFocus(false);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Officer First Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="words"
            onChangeText={text => setDetails({...details, firstName: text})}
            value={details.firstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Officer Last Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="words"
            onChangeText={text => setDetails({...details, lastName: text})}
            value={details.lastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Officer Middle Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="words"
            onChangeText={text => setDetails({...details, middleName: text})}
            value={details.middleName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Officer Maiden Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="words"
            onChangeText={text => setDetails({...details, maidenName: text})}
            value={details.maidenName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Officer Date of birth (DOB)</Text>
          <TextInput
            placeholderTextColor={COLORS.grayText}
            style={styles.input}
            onPressIn={() => setOpen(true)}
            value={details.dob}
          />
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDetails({...details, dob: formatDate(date)});
            }}
            onCancel={() => {
              setOpen(false);
            }}
            mode="date"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => setDetails({...details, email: text})}
            value={details.email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={11}
            onChangeText={text => setDetails({...details, phoneNumber: text})}
            value={details.phoneNumber}
          />
        </View>

        <View style={{gap: 15, marginVertical: 20}}>
          {details.officerSelfie ? (
            <Image
              // source={{uri: fileResponse?.uri}}
              source={{uri: `data:image/jpeg;base64,${details.officerSelfie}`}}
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
          ) : null}

          <View style={{flexDirection: 'row', gap: 20}}>
            <Pressable
              onPress={handleCamera}
              style={{
                height: 44,
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'dashed',
                borderWidth: 1,
                flex: 1,
                backgroundColor: COLORS.lightSecondaryBackground,
                borderColor: COLORS.borderGray,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Lato-Bold',
                  fontSize: 16,
                }}>
                {details.officerSelfie ? 'Take another photo' : 'Take a selfie'}
              </Text>
            </Pressable>
          </View>

          <Text style={{textAlign: 'center', ...FONTS.tiny}}>
            Please provide us with a good photo of yourself. Make sure to hold
            device at eye level and center your face when you are ready.
          </Text>
        </View>

        <FormButton
          title={'Continue'}
          buttonStyle={styles.buttonStyle}
          onPress={handleNext}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default OfficerDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base * 2,
  },
  inputContainer: {marginBottom: 20},
  label: {...FONTS.medium, color: COLORS.label, marginBottom: 5},
  input: {
    borderWidth: 1,
    marginTop: 3,
    borderRadius: 5,
    height: 50,
    padding: 10,
    borderColor: COLORS.borderGray,
    ...FONTS.medium,
  },
  buttonStyle: {
    marginTop: SIZES.base * 5,
    marginBottom: SIZES.base * 3,
  },
});
