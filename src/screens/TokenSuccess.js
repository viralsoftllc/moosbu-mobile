import {StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../assets/themes';

const TokenSuccess = ({navigation, route}) => {
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
            Purchase Successful
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
              navigation.navigate('TokenScreen');
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
                <Text style={{fontWeight: '600'}}>Repeat Purchase</Text>
                <Text style={{color: COLORS.gray}}>
                  Make this purchase again
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

export default TokenSuccess;

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
