import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {COLORS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import routes from '../../../../shared/constants/routes';

export default function CreditScoreDetailsLink() {
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Moosbu Credit Score</Text>
      <FormButton
        title={'How It Works'}
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
        onPress={() => navigate(routes.HOW_CREDIT_SCORE_WORKS)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
  },
  container: {
    marginBottom: SIZES.base * 5,
  },
  text: {
    color: COLORS.grayText,
    textAlign: 'center',
    marginVertical: SIZES.base * 8,
  },
  textStyle: {
    color: COLORS.secondary,
  },
});
