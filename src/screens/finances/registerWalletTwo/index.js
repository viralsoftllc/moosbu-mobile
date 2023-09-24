import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS} from '../../../assets/themes';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import UseIcon from '../../../shared/utils/UseIcon';

const RegisterWalletTwo = ({navigation}) => {
  const [uri, setUri] = useState('');
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
          setUri(res.assets[0].uri);
        }
      },
    );
  };

  const handleGallery = async () => {
    await launchImageLibrary(
      {
        maxHeight: 500,
        maxWidth: 500,
        quality: 0.4,
        mediaType: 'photo',
        includeBase64: true,
        saveToPhotos: false,
        selectionLimit: 1,
      },
      res => {
        // console.log('res from image picker - cover image');
        // console.log(res);
        if (res.didCancel) {
          // user cancelled image picker
        } else if (res.error) {
          // error opening image picker
        } else {
          setUri(res.assets[0].uri);
        }
      },
    );
  };
  return (
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
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} />
          </Pressable>
          <Text
            style={{
              ...FONTS.h3,
              fontWeight: 700,
            }}>
            Activate Your Wallet
          </Text>
          <Text style={{...FONTS.small, fontWeight: 700}}>Step 2 of 2</Text>
        </View>
        <Text style={{textAlign: 'center', ...FONTS.medium, fontWeight: 600}}>
          Kindly fill the details below to activate your wallet
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: COLORS.secondary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="lock-outline" size={40} color={COLORS.primary} />
          </View>
        </View>
      </View>
      <KeyboardAvoidingView style={{gap: 30}}>
        <View>
          <Text style={styles.label}>BVN</Text>
          <TextInput placeholder="Input your BVN here" style={styles.input} />
        </View>
        <View style={{gap: 10}}>
          {uri ? (
            <Image
              source={{uri}}
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
              }}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{
                borderWidth: 1,
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
                borderColor: COLORS.borderGray,
              }}>
              <Text
                style={{textAlign: 'center', fontSize: 12, fontWeight: 600}}>
                Take a Selfie
              </Text>
            </Pressable>
            <Pressable
              onPress={handleGallery}
              style={{
                height: 44,
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'dashed',
                borderWidth: 1,
                flex: 1,
                borderColor: COLORS.borderGray,
              }}>
              <Text
                style={{textAlign: 'center', fontSize: 12, fontWeight: 600}}>
                Choose from Gallery
              </Text>
            </Pressable>
          </View>

          <Text style={{textAlign: 'center', ...FONTS.tiny, fontWeight: 600}}>
            Please provide us with a good photo of yourself. Make sure to hold
            device at eye level and center your face when you are ready.
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',

            alignItems: 'center',
            gap: 10,
          }}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput placeholder="Select DOB" style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <TextInput placeholder="Select Gender" style={styles.input} />
          </View>
        </View>
      </KeyboardAvoidingView>

      <View
        style={{
          backgroundColor: '#FFD8D8',
          padding: 20,
          borderRadius: 10,
        }}>
        <Text style={{color: '#FF6F6F', marginBottom: 5, ...FONTS.regular}}>
          Why do we need your BVN
        </Text>
        <View style={styles.list}>
          <Text>{`\u25CF`}</Text>
          <Text style={styles.listItem}>
            We only need your BVN to verify your identity
          </Text>
        </View>
        <View style={styles.list}>
          <Text>{`\u25CF`}</Text>
          <Text style={styles.listItem}>
            Your BVN is necessary for opening a bank account.
          </Text>
        </View>
        <View style={styles.list}>
          <Text>{`\u25CF`}</Text>
          <Text style={styles.listItem}>
            Your BVN does not give us access to your funds and transactions.
          </Text>
        </View>
        <View style={styles.list}>
          <Text>{`\u25CF`}</Text>
          <Text style={styles.listItem}>
            Your BVN is sent to and secured by our partner bank to carry out
            verification.
          </Text>
        </View>
        <View style={styles.list}>
          <Text>{`\u25CF`}</Text>
          <Text style={styles.listItem}>
            Dial <Text style={{fontWeight: 600}}>*565*0#</Text> on your
            registered phone number to get your BVN.
          </Text>
        </View>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterWalletOne')}
          style={styles.button}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.regular,
              fontWeight: 700,
            }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterWalletTwo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    gap: 50,
    padding: 20,
  },

  inputContainer: {flex: 1},
  label: {...COLORS.medium, lineHeight: 14.4},
  input: {
    borderWidth: 1,
    marginTop: 3,
    borderRadius: 5,
    height: 44,
    padding: 10,
    borderColor: COLORS.borderGray,
    fontSize: 12,
  },

  list: {
    gap: 5,
    flexDirection: 'row',
  },

  listItem: {...FONTS.medium, flex: 1},

  button: {
    minWidth: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
  },
});
