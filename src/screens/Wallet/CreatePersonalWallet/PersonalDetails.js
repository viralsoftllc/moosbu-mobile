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
import {launchCamera} from 'react-native-image-picker';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/FormButton';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import {setPersonalWallet} from '../../../redux/slices/wallet/slice';
import {selectUser} from '../../../redux/slices/user/selectors';
import {selectPersonalWallet} from '../../../redux/slices/wallet/selectors';

const PersonalDetails = () => {
  const {goBack, navigate} = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const personalWallet = useSelector(selectPersonalWallet);

  const [details, setDetails] = useState({});

  //Date Picker variables
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

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
          setDetails({...details, selfie: res.assets[0].base64});
          console.log(res.assets[0]);
        }
      },
    );
  };

  const handleNext = () => {
    if (!details.firstName) {
      return notifyMessage('First name is required!');
    }
    if (!details.lastName) {
      return notifyMessage('Last name is required!');
    }
    if (!details.middleName) {
      return notifyMessage('Middle name is required!');
    }
    if (!details.email) {
      return notifyMessage('Email is required!');
    }

    if (!details.phoneNumber) {
      return notifyMessage('Phone number is require!');
    }

    if (!details.selfie) {
      return notifyMessage('Please take a selfie');
    }

    const personalDetailsDone = true;

    console.log(details);
    dispatch(setPersonalWallet({...details, personalDetailsDone}));
    navigate('BusinessInformation');
  };

  useEffect(() => {
    setDetails({
      ...details,
      firstName: personalWallet.firstName || '',
      lastName: personalWallet.lastName || '',
      middleName: personalWallet.middleName || '',
      maidenName: personalWallet.maidenName || '',
      dob: personalWallet.dob,
      email: user.email || '',
      phoneNumber: user.phone_number.toString() || '',
      selfie: personalWallet.selfie || '',
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
          Personal Details
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
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="words"
            onChangeText={text => setDetails({...details, firstName: text})}
            value={details.firstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="words"
            onChangeText={text => setDetails({...details, lastName: text})}
            value={details.lastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Middle Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="words"
            onChangeText={text => setDetails({...details, middleName: text})}
            value={details.middleName}
          />
        </View>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Maiden Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="words"
            onChangeText={text => setDetails({...details, maidenName: text})}
            value={details.maidenName}
          />
        </View> */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
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
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of birth (DOB)</Text>
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

        <View style={{gap: 15, marginVertical: 20}}>
          {details.selfie ? (
            <Image
              // source={{uri: fileResponse?.uri}}
              source={{uri: `data:image/jpeg;base64,${details.selfie}`}}
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
                {details.selfie ? 'Take another photo' : 'Take a selfie'}
              </Text>
            </Pressable>
          </View>

          <Text style={{textAlign: 'center', ...FONTS.tiny}}>
            Please provide us with a good photo of yourself. Make sure to hold
            device at eye level and center your face when you are ready.
          </Text>
        </View>

        <FormButton
          title={'Next'}
          buttonStyle={styles.buttonStyle}
          textStyle={FONTS.h5}
          onPress={handleNext}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default PersonalDetails;

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
