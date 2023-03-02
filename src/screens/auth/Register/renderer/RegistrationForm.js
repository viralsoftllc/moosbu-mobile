import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function RegistrationForm() {
  return (
    <View style={styles.container}>
      <FormInput placeholder={'Email'} />
      <FormInput placeholder={'Full Name'} />
      <FormInput placeholder={'Password'} />

      <Pressable style={styles.flex}>
        <UseIcon type={'Ionicons'} name={'checkbox'} color={COLORS.primary} />
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

      <FormButton title={'Login'} buttonStyle={styles.buttonStyle} />
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
