import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'react-native-element-dropdown';
import FormButton from '../../../shared/components/FormButton';
import {selectPersonalWallet} from '../../../redux/slices/wallet/selectors';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import {setPersonalWallet} from '../../../redux/slices/wallet/slice';
import Test from '../../Test';
import handleApiError from '../../../shared/components/handleApiError';
import client from '../../../shared/api/client';

const PersonalAddress = () => {
  const {goBack, navigate} = useNavigation();

  const dispatch = useDispatch();

  const personalWallet = useSelector(selectPersonalWallet);

  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({addressLine_2: ''});

  //Country Picker Variables
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);

  const handleNext = async () => {
    if (!details.addressLine_1) {
      return notifyMessage('Address is required!');
    }
    if (!details.city) {
      return notifyMessage('City is required!');
    }
    if (!details.postalCode) {
      return notifyMessage('Postal Code is required!');
    }
    if (!details.state) {
      return notifyMessage('State is required!');
    }

    if (!details.country) {
      return notifyMessage('Select Country');
    }

    dispatch(setPersonalWallet(details));

    console.log(personalWallet);
    setLoading(true);
    try {
      const {data} = await client.post('/api/create_wallet', personalWallet);
      console.log(data);
      setLoading(false);
      const personalAddressDone = true;
      dispatch(setPersonalWallet(personalAddressDone));
      navigate('LevelOneKYC');
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Test />
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 50,
              alignItems: 'center',
              // gap: 70,
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
                ...FONTS.h4,
                flex: 1,
                textAlign: 'center',
              }}>
              Address
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
              <Text style={styles.label}>Address Line 1</Text>
              <TextInput
                placeholder="Address line 1"
                placeholderTextColor={COLORS.grayText}
                style={styles.input}
                autoCapitalize="words"
                onChangeText={text =>
                  setDetails({...details, addressLine_1: text})
                }
                value={details.addressLine_1}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Address Line 2</Text>
              <TextInput
                placeholder="Address line 2"
                placeholderTextColor={COLORS.grayText}
                style={styles.input}
                autoCapitalize="words"
                onChangeText={text =>
                  setDetails({...details, addressLine_2: text})
                }
                value={details.addressLine_2}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>City</Text>
              <TextInput
                placeholder="City"
                placeholderTextColor={COLORS.grayText}
                style={styles.input}
                autoCapitalize="words"
                onChangeText={text => setDetails({...details, city: text})}
                value={details.city}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Postal Code</Text>
              <TextInput
                placeholder="Postal Code"
                placeholderTextColor={COLORS.grayText}
                style={styles.input}
                keyboardType="number-pad"
                maxLength={6}
                onChangeText={text =>
                  setDetails({...details, postalCode: text})
                }
                value={details.postalCode}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>State</Text>
              <TextInput
                placeholder="State"
                placeholderTextColor={COLORS.grayText}
                style={styles.input}
                onChangeText={text =>
                  setDetails({...details, state: text.trim()})
                }
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
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setDetails({...details, country: item.value});
                  setIsFocus(false);
                }}
              />
            </View>

            <FormButton
              title={'Next'}
              buttonStyle={styles.buttonStyle}
              textStyle={FONTS.h5}
              onPress={handleNext}
            />
          </KeyboardAwareScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default PersonalAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base * 2,
  },
  inputContainer: {marginBottom: 20},
  label: {...FONTS.regular, color: COLORS.label, marginBottom: 5},
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
    justifyContent: 'flex-start',
  },
  buttonStyle: {
    marginTop: SIZES.base * 5,
    marginBottom: SIZES.base * 3,
  },
});
