import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';

import {FONTS, COLORS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/FormButton';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import {setPersonalWallet} from '../../../redux/slices/wallet/slice';
import {selectPersonalWallet} from '../../../redux/slices/wallet/selectors';
import {Checkbox} from 'react-native-paper';

const LevelOneKYC = () => {
  const {goBack, navigate} = useNavigation();

  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked(prev => !prev);

  const personalWallet = useSelector(selectPersonalWallet);
  console.log(personalWallet);

  const [details, setDetails] = useState({});

  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);

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

  //handle image from gallery
  // const handleGallery = async () => {
  //   await launchImageLibrary(
  //     {
  //       maxHeight: 500,
  //       maxWidth: 500,
  //       quality: 0.4,
  //       mediaType: 'photo',
  //       includeBase64: true,
  //       saveToPhotos: false,
  //       selectionLimit: 1,
  //     },
  //     res => {
  //       // console.log('res from image picker - cover image');
  //       // console.log(res);
  //       if (res.didCancel) {
  //         // user cancelled image picker
  //       } else if (res.error) {
  //         // error opening image picker
  //       } else {
  //         setFileResponse(res.assets[0]);
  //         setDetails({...details, selfie: res.assets[0].base64});
  //       }
  //     },
  //   );
  // };

  const handleNext = () => {
    if (!details.selfie) {
      return notifyMessage('Selfie required!');
    }

    if (!details.address) {
      return notifyMessage('Address required');
    }

    if (!details.city) {
      return notifyMessage('Enter City');
    }

    if (!details.postalCode) {
      return notifyMessage('Enter Postal Code');
    }

    if (!details.state) {
      return notifyMessage('Enter State');
    }
    if (!details.country) {
      return notifyMessage('Select Country');
    }

    if (!checked) {
      return notifyMessage('Accept terms');
    }

    const kycDone = true;

    dispatch(setPersonalWallet({...details, kycDone}));
    navigate('CreatePersonalWallet');
  };

  useEffect(() => {
    setDetails({
      ...details,
      address: personalWallet.address || '',
      city: personalWallet.city || '',
      postalCode: personalWallet.postalCode || '',
      state: personalWallet.state || '',
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
            flex: 1,
            // textAlign: 'center',
          }}>
          Verification
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
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={2}
            onChangeText={text => setDetails({...details, address: text})}
            value={details.address}
          />
        </View>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Address Line 2</Text>
          <TextInput
            placeholder="Address line 2"
            placeholderTextColor={COLORS.grayText}
            style={styles.input}
            autoCapitalize="words"
            onChangeText={text => setDetails({...details, addressLine_2: text})}
            value={details.addressLine_2}
          />
        </View> */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="words"
            onChangeText={text => setDetails({...details, city: text})}
            value={details.city}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Postal Code</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={6}
            onChangeText={text => setDetails({...details, postalCode: text})}
            value={details.postalCode}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setDetails({...details, state: text.trim()})}
            value={details.state}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country</Text>
          <Dropdown
            style={styles.input}
            placeholderStyle={[
              styles.input,
              {borderWidth: 0, color: COLORS.textGray},
            ]}
            itemTextStyle={{
              ...FONTS.medium,
            }}
            selectedTextStyle={{...FONTS.medium}}
            data={[{label: 'Nigeria', value: 'NG'}]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Country' : '...'}
            value={details.country}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setDetails({...details, country: item.value});
              setIsFocus(false);
            }}
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
          ) : (
            <View
              style={{
                borderWidth: 2,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                height: 100,
                borderRadius: 100,
                alignSelf: 'center',
                borderColor: COLORS.borderGray,
              }}>
              <UseIcon
                type={'MaterialCommunityIcons'}
                name="camera-outline"
                color={COLORS.borderGray}
                size={40}
              />
            </View>
          )}

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
                Take a selfie
              </Text>
            </Pressable>
            {/* <Pressable
              onPress={handleGallery}
              style={{
                height: 44,
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'dashed',
                borderWidth: 1,
                flex: 1,
                borderColor: COLORS.borderGray,
                backgroundColor: COLORS.lightSecondaryBackground,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Lato-Bold',
                  fontSize: 16,
                }}>
                Choose from gallery
              </Text>
            </Pressable> */}
          </View>

          <Text style={{textAlign: 'center', ...FONTS.tiny}}>
            {/* Please send us a clear, high-quality photo of your proof of address,
            such as a utility bill or a government-issued ID that shows your
            address. */}
            Please provide us with a good photo of yourself. Make sure to hold
            device at eye level and center your face when you are ready.
          </Text>
        </View>

        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <Dropdown
            style={styles.input}
            placeholderStyle={[
              styles.input,
              {borderWidth: 0, color: COLORS.textGray},
            ]}
            itemTextStyle={{
              ...FONTS.medium,
            }}
            selectedTextStyle={{...FONTS.medium}}
            data={[
              {label: 'Male', value: 'Male'},
              {label: 'Female', value: 'Female'},
            ]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Gender' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setDetails({...details, gender: item.value});
              setIsFocus(false);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            placeholder="Select DOB"
            placeholderTextColor={COLORS.grayText}
            style={styles.input}
            onPressIn={() => setOpen(true)}
            value={details.dob}
          />
        </View>

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
        /> */}

        {/* Bvn field already filled */}
        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>BVN</Text>
          <TextInput
            placeholder="Input your BVN here"
            placeholderTextColor={COLORS.grayText}
            style={styles.input}
            autoCapitalize="words"
            keyboardType="number-pad"
            maxLength={11}
            onChangeText={text => setDetails({...details, bvn: text})}
            value={details.bvn}
          />
        </View>

        <View
          style={{
            backgroundColor: '#FFD8D8',
            padding: 20,
            borderRadius: 10,
            marginVertical: 30,
          }}>
          <Text style={{color: '#FF6F6F', marginBottom: 5, ...FONTS.h5}}>
            Why do we need your BVN
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>
              {`\u25CF `}
              We only need your BVN to verify your identity
            </Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listItem}>
              {`\u25CF `}
              Your BVN is necessary for opening a bank account.
            </Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listItem}>
              {`\u25CF `}
              Your BVN does not give us access to your funds and transactions.
            </Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listItem}>
              {`\u25CF `}
              Your BVN is sent to and secured by our partner bank to carry out
              verification.
            </Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listItem}>
              {`\u25CF `}
              Dial <Text style={FONTS.h5}>*565*0#</Text> on your registered
              phone number to get your BVN.
            </Text>
          </View>
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            marginTop: 30,
          }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            color={COLORS.primary}
            onPress={toggleChecked}
          />
          <Text style={{...FONTS.medium, width: '90%'}}>
            I agree to Moosbu terms of use and privacy policy to empower your
            staff to confirm customer transfers even when you are not available,
            ensuring continuity of business operations
          </Text>
        </View>

        <FormButton
          title="Next"
          buttonStyle={styles.buttonStyle}
          textStyle={FONTS.h5}
          onPress={handleNext}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LevelOneKYC;

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
  textArea: {
    borderWidth: 1,
    marginTop: 3,
    borderRadius: 5,

    padding: 10,
    borderColor: COLORS.borderGray,
    ...FONTS.medium,
  },
  buttonStyle: {
    marginTop: SIZES.base * 5,
    marginBottom: SIZES.base * 3,
  },

  list: {
    paddingVertical: 5,
  },

  listItem: {...FONTS.small, color: COLORS.label, fontFamily: 'Lato-Bold'},
});
