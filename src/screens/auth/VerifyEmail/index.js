import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';
import UseIcon from '../../../shared/utils/UseIcon';
import handleApiError from '../../../shared/components/handleApiError';
import client from '../../../shared/api/client';
import {useSelector} from 'react-redux';
import {selectUser} from '../../../redux/slices/user/selectors';

import {useDispatch} from 'react-redux';
import Cache from '../../../shared/utils/Cache';
import {setToken} from '../../../redux/slices/auth/slice';
import Test from '../../Test';
import {selectToken} from '../../../redux/slices/auth/selectors';
import notifyMessage from '../../../shared/hooks/notifyMessage';

export default function VerifyEmail({route}) {
  const {goBack, navigate} = useNavigation();

  const token = useSelector(selectToken);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const user = useSelector(selectUser);

  let email = user?.email || route.params.email;

  const handleVerify = async () => {
    try {
      setLoading(true);
      const {data} = await client.post('/api/verify-code', {email});
      console.log(data);

      setLoading(false);
      notifyMessage(data.Message);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  };

  const submitPassword = async () => {
    if (code.length < 4) {
      return notifyMessage('Invalid code');
    }

    try {
      setLoading(true);
      const {data} = await client.post('/api/verify', {email, token: code});

      setLoading(false);
      notifyMessage(data.Message);
      navigate('EmailVerified');
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      {loading ? (
        <Test />
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 50,
              alignItems: 'center',
            }}>
            <Pressable style={styles.iconWrapper} onPress={goBack}>
              <UseIcon
                type={'MaterialIcons'}
                name="arrow-back"
                color={COLORS.textPrimary}
              />
            </Pressable>

            <Text
              style={{
                ...FONTS.h5,
                textAlign: 'center',
                flex: 1,
              }}>
              Verify Email
            </Text>
          </View>

          <Image
            source={require('../../../assets/images/verify.png')}
            style={{alignSelf: 'center', marginVertical: 20}}
          />

          {/* Todo - verify email */}
          <Text style={styles.message}>
            Please enter the number code sent to your email,{' '}
            <Text style={{color: COLORS.primary}}>{email}</Text>
          </Text>

          <View>
            <OTPInputView
              style={styles.otpView}
              pinCount={4}
              keyboardType={'number-pad'}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.codeInputFieldStyle}
              onCodeFilled={otp => setCode(otp)}
              onCodeChanged={otp => setCode(otp)}
              code={code}
            />
          </View>

          <View style={{marginVertical: 50}}>
            <FormButton
              title={'Confirm'}
              buttonStyle={styles.confirmButtonStyle}
              onPress={submitPassword}
              loading={loading}
              textStyle={FONTS.h5}
            />
            <FormButton
              title={'Resend code'}
              buttonStyle={[
                styles.confirmButtonStyle,
                {
                  backgroundColor: 'white',
                  borderWidth: 2,
                  borderColor: COLORS.primary,
                },
              ]}
              onPress={handleVerify}
              loading={loading}
              textStyle={{
                color: COLORS.primary,
                ...FONTS.h5,
              }}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
  },
  imageView: {
    height: verticalScale(220),
    marginVertical: SIZES.base,
  },
  image: {
    height: '100%',
  },
  headerText: {
    textAlign: 'center',
    color: COLORS.primary,
    ...FONTS.h4,
    marginTop: SIZES.base * 1.5,
    marginBottom: SIZES.base,
  },
  message: {
    color: COLORS.primaryText,
    ...FONTS.medium,
    paddingHorizontal: SIZES.base * 2,
    textAlign: 'center',
  },
  email: {
    color: COLORS.textPrimary,
  },
  codeInputFieldStyle: {
    width: verticalScale(40),
    height: verticalScale(40),
    color: COLORS.black,
    backgroundColor: COLORS.tabBg,
    borderRadius: SIZES.radius / 2,
    ...FONTS.h6,
  },
  otpView: {
    width: '80%',
    height: verticalScale(100),
    alignSelf: 'center',
  },
  confirmButtonStyle: {
    marginBottom: SIZES.base,
    backgroundColor: COLORS.primary,
    marginTop: SIZES.base,
    ...FONTS.h5,
  },
  resendButtonStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  textStyle: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
