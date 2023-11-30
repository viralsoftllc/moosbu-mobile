import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

import {launchCamera} from 'react-native-image-picker';

import {FONTS, SIZES, COLORS} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import FormButton from '../../../shared/components/FormButton';
import notifyMessage from '../../../shared/hooks/notifyMessage';

import {selectBusinessWallet} from '../../../redux/slices/wallet/selectors';
import {setBusinessWallet} from '../../../redux/slices/wallet/slice';

const BusinessAddress = () => {
  const {goBack, navigate} = useNavigation();

  const dispatch = useDispatch();

  const businessWallet = useSelector(selectBusinessWallet);

  const [details, setDetails] = useState({});

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
          setDetails({...details, proofOfAddress: res.assets[0].base64});
        }
      },
    );
  };

  const handleContinue = () => {
    if (!details.businessAddress) {
      return notifyMessage('Business address required!');
    }
    if (!details.proofOfAddress) {
      return notifyMessage('Please provide proof of address');
    }

    const businessAddressDone = true;

    dispatch(setBusinessWallet({...details, businessAddressDone}));
    navigate('OfficerDetails');
  };

  useEffect(() => {
    setDetails({
      ...details,
      businessAddress: businessWallet.businessAddress || '',
      proofOfAddress: businessWallet.proofOfAddress || '',
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
          Business Address
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
          <Text style={styles.label}>Business address</Text>
          <TextInput
            style={styles.input}
            onChangeText={text =>
              setDetails({...details, businessAddress: text})
            }
            value={details.businessAddress}
          />
        </View>

        <View style={{gap: 15, marginVertical: 20}}>
          {details.proofOfAddress ? (
            <Image
              // source={{uri: fileResponse?.uri}}
              source={{uri: `data:image/jpeg;base64,${details.proofOfAddress}`}}
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.label}>Proof of Address</Text>
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
                  fontSize: 14,
                }}>
                {details.proofOfAddress
                  ? 'Take another photo'
                  : 'Take a snapshot'}
              </Text>
            </Pressable>
          </View>

          <Text style={{textAlign: 'center', ...FONTS.tiny}}>
            Please send us a clear, high-quality photo of your proof of address,
            such as a utility bill or a government-issued ID that shows your
            address.
          </Text>
        </View>

        <FormButton
          title="Continue"
          onPress={handleContinue}
          buttonStyle={{
            marginVertical: 50,
          }}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default BusinessAddress;

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
});
