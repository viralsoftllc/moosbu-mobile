import React from 'react';
import {
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import {COLORS, SIZES, FONTS} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';

export default function CashFlowComingSoon() {
  const link = 'https://forms.gle/oVTtxEYak9agi1Yz9';

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'default'} />
      <ScreenHeader title={'Cash Flow Advance'} />

      <View style={styles.container}>
        <Text style={styles.text}>
          We are currently working on this service and it will be live in few
          week. Kindly fill the short form below to be the first to know once
          this service is live
        </Text>

        <FormButton
          title={'Let me Know'}
          containerStyle={styles.containerStyle}
          onPress={() => Linking.openURL(link)}
        />

        <Text style={[styles.text, {color: COLORS.textGray}]}>
          Kindly keep using your Moosbu OS to accept payment orders as it will
          give you access to better financing once this service is launched
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.paddingHorizontal,
    backgroundColor: COLORS.white,
    paddingTop: SIZES.base * 3,
  },
  containerStyle: {
    marginHorizontal: SIZES.base * 2,
    marginVertical: SIZES.base * 5,
  },
  text: {
    textAlign: 'center',
    ...FONTS.regular,
    paddingHorizontal: 20,
  },
});
