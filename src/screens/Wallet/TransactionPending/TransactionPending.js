import {StyleSheet, Text, View, SafeAreaView, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../../../assets/themes';

const TransactionPending = ({navigation, route}) => {
  const {
    account_name,
    account_number,
    amount,
    bank,
    time,
    transactionId,
    description,
    status,
  } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={styles.logoContainer}>
          <Icon name="timelapse" size={80} color="orange" />
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: COLORS.label,
              ...FONTS.h3,
              textAlign: 'center',
            }}>
            Transaction Processing...
          </Text>

          <Text
            style={{
              color: '#282828',
              ...FONTS.medium,
              fontWeight: '400',
              textAlign: 'center',
            }}>
            You will be notified shortly on the status of the transaction.
          </Text>
        </View>
        <View style={{gap: 15, marginTop: 50}}>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate('Send Funds');
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: COLORS.tabBg,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={'cached'} color={COLORS.primary} size={30} />
              </View>
              <View>
                <Text style={{...FONTS.regular, fontFamily: 'Lato-Bold'}}>
                  Repeat Transaction
                </Text>
                <Text style={{color: COLORS.gray, ...FONTS.medium}}>
                  Make this payment again
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={COLORS.gray} />
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate('TransactionDetails', {
                account_name,
                account_number,
                amount,
                bank,
                time,
                transactionId,
                description,
              });
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: COLORS.tabBg,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={'share-outline'} color={COLORS.primary} size={30} />
              </View>
              <View>
                <Text style={{...FONTS.regular, fontFamily: 'Lato-Bold'}}>
                  Share Receipt
                </Text>
                <Text style={{color: COLORS.gray, ...FONTS.medium}}>
                  Share receipt with others
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={COLORS.gray} />
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate('Main', {screen: 'Home Tab'});
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: COLORS.tabBg,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name={'home-variant-outline'}
                  color={COLORS.primary}
                  size={30}
                />
              </View>
              <View>
                <Text style={{...FONTS.regular, fontFamily: 'Lato-Bold'}}>
                  Go Home
                </Text>
                <Text style={{color: COLORS.gray, ...FONTS.medium}}>
                  Go To Moosbu Homepage
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={COLORS.gray} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransactionPending;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: 'white',
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
  button: {
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
});
