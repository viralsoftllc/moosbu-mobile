import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function ResetPasswordMailSent() {
  const {goBack} = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Pressable style={styles.iconWrapper} onPress={goBack}>
          <UseIcon
            type={'MaterialIcons'}
            name="arrow-back"
            color={COLORS.textPrimary}
          />
        </Pressable>

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

        <View>
          <FormButton
            title={'Open email app'}
            buttonStyle={styles.confirmButtonStyle}
          />

          <Text style={styles.message}>
            Do not receive the mail? Check your spam filter, or{' '}
            <Text style={styles.email}>send another mail</Text>
          </Text>
        </View>
      </ScrollView>
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
  headerText: {
    textAlign: 'center',
    color: COLORS.primary,
    ...FONTS.h4,
    marginTop: SIZES.base * 1.5,
    marginBottom: SIZES.base,
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
});
