import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function RegistrationForm({
  credentials,
  setCredentials,
  loading,
  register,
  setAgreePolicy,
  agreePolicy,
}) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <FormInput
        placeholder={'Email'}
        value={credentials?.email}
        onChangeText={text => setCredentials({...credentials, email: text})}
      />
      <FormInput
        placeholder={'Full Name'}
        value={credentials?.name}
        onChangeText={text => setCredentials({...credentials, name: text})}
      />
      <FormInput
        placeholder={'Store Name'}
        value={credentials?.store_name}
        onChangeText={text =>
          setCredentials({...credentials, store_name: text})
        }
      />
      <FormInput
        placeholder={'Password'}
        value={credentials?.password}
        onChangeText={text => setCredentials({...credentials, password: text})}
        secureTextEntry={!passwordIsVisible}
        rightIcon={
          <Pressable onPress={() => setPasswordIsVisible(!passwordIsVisible)}>
            <UseIcon
              type={'Ionicons'}
              name={passwordIsVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={COLORS.textPrimary}
            />
          </Pressable>
        }
      />
      <FormInput
        placeholder={'Confirm Password'}
        value={credentials?.password_confirmation}
        onChangeText={text =>
          setCredentials({...credentials, password_confirmation: text})
        }
        secureTextEntry={!passwordIsVisible}
        rightIcon={
          <Pressable onPress={() => setPasswordIsVisible(!passwordIsVisible)}>
            <UseIcon
              type={'Ionicons'}
              name={passwordIsVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={COLORS.textPrimary}
            />
          </Pressable>
        }
      />

      <Pressable
        style={styles.flex}
        onPress={() => setAgreePolicy(!agreePolicy)}>
        <UseIcon
          type={'MaterialCommunityIcons'}
          name={agreePolicy ? 'checkbox-marked' : 'checkbox-blank-outline'}
          color={COLORS.primary}
        />
        <View style={[styles.flex, styles.texts]}>
          <Text style={styles.text}>I agree to the</Text>

          <Pressable>
            <Text style={styles.link}>Terms of Service</Text>
          </Pressable>

          <Text style={styles.text}>and</Text>

          <Pressable>
            <Text style={styles.link}>Privacy Policy</Text>
          </Pressable>
        </View>
      </Pressable>

      <FormButton
        title={'Create account'}
        buttonStyle={styles.buttonStyle}
        onPress={register}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.base * 1.5,
  },
  forgotPasswordText: {
    marginBottom: SIZES.base * 4,
    color: COLORS.textSecondary,
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    marginTop: SIZES.base * 3,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  texts: {
    marginLeft: SIZES.base / 2,
  },
  text: {
    marginHorizontal: SIZES.base / 4,
    color: COLORS.textPrimary,
  },
  link: {
    color: COLORS.textSecondary,
  },
});
