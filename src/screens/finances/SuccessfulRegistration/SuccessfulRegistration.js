import {StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ion from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../../../assets/themes';
import {logUserOut} from '../../auth/Logout';
import {useDispatch} from 'react-redux';
import {setToken} from '../../../redux/slices/auth/slice';

const SuccessfulRegistration = ({navigation}) => {
  const dispatch = useDispatch();

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
              ...FONTS.h5,
              textAlign: 'center',
            }}>
            Wallet Successfully Created.
          </Text>
        </View>
      </View>

      <View style={{flex: 1, gap: 20}}>
        <Pressable
          style={styles.button}
          onPress={() => {
            // navigation.navigate('Wallet');
            logUserOut();
            dispatch(setToken(null));
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
              <Ion name={'wallet-outline'} color={COLORS.primary} size={30} />
            </View>
            <View>
              <Text style={{fontFamily: 'Lato-Bold'}}>Go to Dashboard</Text>
              <Text style={{...FONTS.small, color: COLORS.gray}}>
                Go to Wallet Dashboard
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={COLORS.gray} />
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            // navigation.navigate('Main', {screen: 'Home Tab'});
            logUserOut();
            dispatch(setToken(null));
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
              <Text style={{fontFamily: 'Lato-Bold'}}>Go Home</Text>
              <Text style={{...FONTS.small, color: COLORS.gray}}>
                Go To Moosbu Homepage
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={COLORS.gray} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SuccessfulRegistration;

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
