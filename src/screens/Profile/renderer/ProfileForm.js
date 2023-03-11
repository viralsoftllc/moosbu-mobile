import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import routes from '../../../shared/constants/routes';
import {COLORS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';
import FormInput from '../../../shared/components/FormInput';
import UseIcon from '../../../shared/utils/UseIcon';

export default function ProfileForm() {
  const {navigate} = useNavigation();

  return (
    <View>
      <FormInput label={'Full Name'} placeholder="Joshua Moosbu" />
      <FormInput label={'Email Address'} placeholder="Joshua@moosbu.com" />
      <FormInput label={'Phone Number'} placeholder="08022233344" />

      <Pressable
        style={styles.changePassword}
        onPress={() => navigate(routes.CHANGE_PASSWORD)}>
        <Text style={styles.changePasswordText}>Change Password</Text>
        <UseIcon type={'AntDesign'} name="right" />
      </Pressable>

      <FormButton title={'Save'} buttonStyle={styles.buttonStyle} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  changePassword: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    paddingVertical: SIZES.base * 1.3,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.base,
    marginVertical: SIZES.base * 2,
  },
  changePasswordText: {
    color: COLORS.textPrimary,
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    marginTop: SIZES.base,
  },
});
