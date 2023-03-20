import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {COLORS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import routes from '../../../../shared/constants/routes';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function LoginForm({
  setCredentials,
  credentials,
  loading,
  login,
}) {
  const {navigate} = useNavigation();
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <FormInput
        placeholder={'Email'}
        onChangeText={text => {
          setCredentials({...credentials, email: text});
        }}
        value={credentials?.email}
      />
      <FormInput
        placeholder={'Password'}
        onChangeText={text => setCredentials({...credentials, password: text})}
        value={credentials?.password}
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

      <Pressable onPress={() => navigate(routes.RESET_PASSWORD)}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </Pressable>

      <FormButton
        title={'Login'}
        buttonStyle={styles.buttonStyle}
        onPress={login}
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
  },
});
