import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import routes from '../../../../shared/constants/routes';

export default function LoginForm() {
  const {navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <FormInput placeholder={'Email'} />
      <FormInput placeholder={'Password'} />

      <Pressable onPress={() => navigate(routes.RESET_PASSWORD)}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </Pressable>

      <FormButton
        title={'Login'}
        buttonStyle={styles.buttonStyle}
        onPress={() => navigate(routes.MAIN_STACK)}
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
  },
});
