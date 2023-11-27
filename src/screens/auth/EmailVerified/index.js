import {StyleSheet, Text, View, StatusBar, SafeAreaView} from 'react-native';
import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import Cache from '../../../shared/utils/Cache';
import {useNavigation} from '@react-navigation/native';

import {COLORS, SIZES, FONTS} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import FormButton from '../../../shared/components/FormButton';
import {selectToken} from '../../../redux/slices/auth/selectors';
import {setToken} from '../../../redux/slices/auth/slice';

const EmailVerified = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const {navigate} = useNavigation();

  const handleLogin = async () => {
    if (token) {
      Cache.clearAll();
      dispatch(setToken(null));
      navigate('Login');
      return;
    }

    navigate('Login');
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', padding: 20}}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />
      <View style={{marginVertical: 50}}>
        <Text style={styles.headerText}>Congratulations</Text>
        <Text style={{...FONTS.medium, textAlign: 'center'}}>
          Your account has been verified
        </Text>
      </View>

      <FormButton title={'Proceed to login'} onPress={handleLogin} />
    </SafeAreaView>
  );
};

export default EmailVerified;

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    color: COLORS.primary,
    ...FONTS.h5,
  },
});
