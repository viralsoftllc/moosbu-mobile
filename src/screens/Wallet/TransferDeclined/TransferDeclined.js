import {StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../../../assets/themes';

const TransferDeclined = ({navigation, route}) => {
  const {account_name, amount} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.logoContainer}>
          <Icon name="error-outline" size={80} color="red" />
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: COLORS.label,
              ...FONTS.h3,
              textAlign: 'center',
            }}>
            Transaction Declined
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
            was not successfully sent to{' '}
            <Text style={{fontWeight: '700'}}>{account_name}</Text>
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
          {/* <LongButton
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
          /> */}

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
                <MIcon name={'cached'} color={COLORS.primary} size={30} />
              </View>
              <View>
                <Text style={{fontWeight: '600'}}>Try Again</Text>
                <Text style={{color: COLORS.gray}}>
                  Make this payment again
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={COLORS.gray} />
          </Pressable>
          <Pressable style={styles.button} onPress={() => {}}>
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
                <MIcon name={'close'} color={COLORS.primary} size={30} />
              </View>
              <View>
                <Text style={{fontWeight: '600'}}>Cancel Payment</Text>
                <Text style={{color: COLORS.gray}}>Cancel this payment</Text>
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
                <MIcon
                  name={'home-variant-outline'}
                  color={COLORS.primary}
                  size={30}
                />
              </View>
              <View>
                <Text style={{fontWeight: '600'}}>Go Home</Text>
                <Text style={{color: COLORS.gray}}>Go To Moosbu Homepage</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={COLORS.gray} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransferDeclined;

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