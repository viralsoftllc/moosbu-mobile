import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import routes from '../../../../shared/constants/routes';

export default function ResetPasswordMailSent() {
  const {navigate} = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader />

      <Text style={styles.headerText}>Check Your Email</Text>

      <View style={styles.iconView}>
        <UseIcon
          name="mail-unread-outline"
          type={'Ionicons'}
          size={verticalScale(80)}
          color={COLORS.secondary}
        />
      </View>

      <Text style={styles.message}>
        We have sent password recover instructions to your email
      </Text>

      <View style={styles.resendView}>
        {/* <FormButton
            title={'Open email app'}
            buttonStyle={styles.confirmButtonStyle}
          /> */}

        <Text style={styles.message}>
          Do not receive the mail? Check your spam filter, or{' '}
          <Text
            style={styles.email}
            onPress={() => navigate(routes.RESET_PASSWORD)}>
            send another mail
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base,
  },
  headerText: {
    textAlign: 'center',
    color: COLORS.primary,
    ...FONTS.h4,
  },
  message: {
    color: COLORS.grayText,
    ...FONTS.regular,
    paddingHorizontal: SIZES.base * 2,
  },
  email: {
    color: COLORS.primary,
  },
  confirmButtonStyle: {
    backgroundColor: COLORS.primary,
    marginTop: SIZES.base * 5,
    marginBottom: SIZES.base * 10,
  },
  iconView: {
    alignSelf: 'center',
    height: verticalScale(104),
    width: verticalScale(104),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    borderRadius: 100,
    marginTop: SIZES.base * 5,
    marginBottom: SIZES.base * 2,
  },
  resendView: {
    marginTop: 'auto',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: '5%',
  },
});
