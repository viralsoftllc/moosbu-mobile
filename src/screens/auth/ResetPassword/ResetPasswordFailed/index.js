import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function ResetPasswordFailed() {
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

      <View style={styles.content}>
        <View style={styles.iconView}>
          <UseIcon
            type={'MaterialIcons'}
            name="error-outline"
            size={verticalScale(70)}
            color={COLORS.debit}
          />
        </View>

        <Text style={styles.text}>
          Error occurred while trying to reset your password
        </Text>
      </View>

      <FormButton title={'Try Again'} />
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
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25%',
    marginBottom: SIZES.base * 10,
  },
  text: {
    textAlign: 'center',
    color: COLORS.grayText,
    ...FONTS.regular,
  },
  iconView: {
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    height: 104,
    width: 104,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginBottom: SIZES.base * 2,
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
  },
});
