import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import copyToClipboard from '../../../shared/utils/copyToClipboard';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import UseIcon from '../../../shared/utils/UseIcon';

import {useSelector} from 'react-redux';
import {selectAccountNumber} from '../../../redux/slices/wallet/selectors';

export default function BankTransfer() {
  const {setOptions} = useNavigation();

  const accountNumber = useSelector(selectAccountNumber);

  // const copyToClipboard = content => {
  //   Clipboard.setString(content);
  // };

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Bank Transfer'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <View>
        <Text style={styles.title}>Your Moosbu Account Number</Text>

        <Pressable
          style={styles.acctNumberBtn}
          onPress={() => copyToClipboard(accountNumber)}>
          <Text style={styles.acctNumber}>{accountNumber}</Text>

          <UseIcon
            type={'MaterialCommunityIcons'}
            name="content-copy"
            color={COLORS.secondary}
          />
        </Pressable>

        <Text style={styles.subtitle}>Moosbu Bank Service</Text>

        <Text style={styles.description}>
          Money Sent to this account will reflect automatically in your moosbu
          wallet. Receive funds from your customer locally directly in your
          account
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
  },
  acctNumberBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: COLORS.textPrimary,
    ...FONTS.regular,
    marginBottom: SIZES.base * 3,
    marginTop: SIZES.base * 4,
  },
  acctNumber: {
    color: COLORS.primary,
    ...FONTS.h3,
    marginRight: SIZES.base * 1.5,
  },
  subtitle: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: SIZES.base,
  },
  description: {
    color: COLORS.grayText,
    textAlign: 'center',
    marginTop: SIZES.base * 4,
  },
});
