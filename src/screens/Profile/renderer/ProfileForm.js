import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import routes from '../../../shared/constants/routes';
import {COLORS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';
import FormInput from '../../../shared/components/FormInput';
import UseIcon from '../../../shared/utils/UseIcon';

export default function ProfileForm({profile, setProfile}) {
  const {navigate} = useNavigation();

  return (
    <View>
      <FormInput
        label={'Full Name'}
        placeholder="Your full name"
        onChangeText={text => setProfile({...profile, name: text})}
        value={profile?.name}
      />

      <FormInput
        label={'Email Address'}
        placeholder="Your email address"
        onChangeText={text => setProfile({...profile, email: text})}
        value={profile?.email}
        editable={false}
      />

      <FormInput
        label={'Phone Number'}
        placeholder="phone number"
        onChangeText={text => setProfile({...profile, phone_number: text})}
        value={profile?.phone_number}
      />

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
