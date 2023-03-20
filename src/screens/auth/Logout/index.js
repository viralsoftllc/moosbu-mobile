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
import {useDispatch} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import {setToken} from '../../../redux/slices/auth/slice';
import {setUserDetails} from '../../../redux/slices/user/slice';
import FormButton from '../../../shared/components/FormButton';
import Cache from '../../../shared/utils/Cache';
import UseIcon from '../../../shared/utils/UseIcon';

export default function Logout() {
  const {goBack} = useNavigation();
  const dispatch = useDispatch();

  async function handleLogout() {
    Cache.clearAll();
    dispatch(setToken(null));
    dispatch(setUserDetails(null));
  }

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
        <Text style={styles.welcomeText}>Log Out?</Text>

        <View style={styles.iconView}>
          <UseIcon
            name="logout"
            type={'MaterialIcons'}
            size={verticalScale(60)}
            color={COLORS.secondary}
          />
        </View>

        <Text style={styles.subheader}>
          Oh, no. You are leaving. Are you sure?
        </Text>

        <View>
          <FormButton
            title={'Cancel'}
            buttonStyle={styles.buttonStyle}
            onPress={goBack}
          />
          <FormButton
            title={'Log Out'}
            buttonStyle={styles.logoutButtonStyle}
            textStyle={styles.textStyle}
            onPress={handleLogout}
          />
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
  welcomeText: {
    ...FONTS.h4,
    fontWeight: '300',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SIZES.base * 3,
    marginBottom: SIZES.base * 4,
  },
  subheader: {
    color: COLORS.grayText,
    marginTop: SIZES.base / 2,
    ...FONTS.medium,
    marginBottom: SIZES.base * 4,
    textAlign: 'center',
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
    marginBottom: SIZES.base * 3,
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    marginTop: SIZES.base * 4,
  },
  logoutButtonStyle: {
    backgroundColor: COLORS.white,
    marginTop: SIZES.base * 2,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  textStyle: {
    color: COLORS.primary,
  },
});
