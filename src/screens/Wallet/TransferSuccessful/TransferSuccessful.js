import {StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../../../assets/themes';
import LongButton from './renderer/LongButton';

const TransferSuccessful = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.logoContainer}>
          <Icon name="check-circle-outline" size={80} color="green" />
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: COLORS.label,
              ...FONTS.h3,
              textAlign: 'center',
            }}>
            Transaction Successful
          </Text>

          <Text
            style={{
              color: '#282828',
              ...FONTS.medium,
              fontWeight: '400',
              textAlign: 'center',
            }}>
            ₦40,900 was successfully sent to Idrees Afolabi
          </Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            color: '#282828',
            ...FONTS.medium,
            fontWeight: '600',
          }}>
          What Would You Like To Do Next?
        </Text>
        <View style={{gap: 15, marginTop: 20}}>
          <LongButton
            icon="cache"
            title="Repeat Transaction"
            label="Make this payment again"
          />
          <LongButton
            icon="share-outline"
            title="Share Receipt"
            label="Share receipt with others"
          />
          <LongButton
            icon="home-variant-outline"
            title="Go Home"
            label="Go To Moosbu Homepage "
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransferSuccessful;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  logoContainer: {
    backgroundColor: COLORS.lightSecondaryBackground,
    width: 105,
    height: 105,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
