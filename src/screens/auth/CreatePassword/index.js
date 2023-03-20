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
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import CreatePasswordForm from './renderer/CreatePasswordForm';

export default function CreatePassword() {
  const {goBack} = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.iconWrapper} onPress={goBack}>
        <UseIcon
          type={'MaterialIcons'}
          name="arrow-back"
          color={COLORS.textPrimary}
        />
      </Pressable>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeTextView}>
          <Text style={styles.welcomeText}>Create New Password</Text>
        </View>

        <Text style={styles.subheader}>
          Your new password must e different from the previously used password
        </Text>

        <CreatePasswordForm />
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
  welcomeTextView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
  },
  welcomeText: {
    marginRight: SIZES.base / 2,
    ...FONTS.h6,
    fontWeight: '300',
    color: COLORS.textSecondary,
  },
  subheader: {
    color: COLORS.grayText,
    marginTop: SIZES.base / 2,
    ...FONTS.medium,
    marginBottom: SIZES.base * 4,
  },
  iconWrapper: {
    alignSelf: 'flex-start',
    height: verticalScale(30),
    paddingRight: SIZES.base,
    marginBottom: SIZES.base,
  },
});
