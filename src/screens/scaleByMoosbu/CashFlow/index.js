import React, {useLayoutEffect} from 'react';
import {Linking, SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import {COLORS, SIZES, FONTS} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';

export default function CashFlowComingSoon() {
  const link = 'https://forms.gle/oVTtxEYak9agi1Yz9';
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Cash Flow Advance'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      {/* <ComingSoon
        page={'Cash Flow'}
        iconType={'MaterialCommunityIcons'}
        iconName={'cash'}
      /> */}
      <Text style={styles.text}>
        We are currently working on this service and it will be live in few
        week. Kindly fill the short form below to be the first to know once this
        service is live
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
