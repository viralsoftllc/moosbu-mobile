import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS} from '../../../assets/themes';

const RegisterWalletOne = ({navigation}) => {
  return (
    <View style={styles.container}>
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
          <Text style={{...FONTS.small, fontWeight: 700}}>Step 1 of 2</Text>
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
      <KeyboardAvoidingView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',

              alignItems: 'center',
              gap: 10,
            }}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput placeholder="First Name" style={styles.input} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput placeholder="Last Name" style={styles.input} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',

              alignItems: 'center',
              gap: 10,
            }}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput placeholder="Email Address" style={styles.input} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput placeholder="Phone Number" style={styles.input} />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',

              alignItems: 'center',
              gap: 10,
            }}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Address</Text>
              <TextInput placeholder="Address Line 1" style={styles.input} />
            </View>
            <View style={styles.inputContainer}>
              <Text></Text>
              <TextInput
                placeholder="Address Line 2 (Optional}"
                style={styles.input}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',

              alignItems: 'center',
              gap: 10,
            }}>
            <View style={styles.inputContainer}>
              <TextInput placeholder="city" style={styles.input} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput placeholder="Postal Code" style={styles.input} />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',

              alignItems: 'center',
              gap: 10,
            }}>
            <View style={styles.inputContainer}>
              <TextInput placeholder="State" style={styles.input} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput placeholder="Country" style={styles.input} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterWalletTwo')}
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
    </View>
  );
};

export default RegisterWalletOne;

const styles = StyleSheet.create({
  container: {flex: 1, gap: 50, padding: 20},

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
  button: {
    minWidth: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
  },
});
