import {StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../../../assets/themes';
import routes from '../../../shared/constants/routes';

const TransferSuccessful = ({navigation, route}) => {
  const {
    amount,
    _id,
    approvedAt,
    creditAccountName,
    creditAccountNumber,
    fees,
  } = route.params;

  console.log(route.params);

  console.log(amount, creditAccountName, creditAccountNumber, approvedAt);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
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
            <Text style={{fontWeight: '700'}}>
              {' '}
              {Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
              }).format(parseInt(amount))}
            </Text>{' '}
            was successfully sent to {'\n'}
            <Text style={{fontWeight: '700'}}>{creditAccountName}</Text>
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
                <Text style={{...FONTS.h5}}>Repeat Transaction</Text>
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
              navigation.navigate('TransactionDetails', route.params);
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
                <Text style={{...FONTS.h5}}>Share Receipt</Text>
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
              navigation.navigate(routes.WALLET);
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
                <Text style={{...FONTS.h5}}>Go to Wallet</Text>
                <Text style={{color: COLORS.gray, ...FONTS.medium}}>
                  Go To Moosbu Wallet Dashboard
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

export default TransferSuccessful;

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
