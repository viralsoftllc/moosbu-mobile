import {StyleSheet, SafeAreaView, Pressable, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FONTS, SIZES, COLORS} from '../../../assets/themes/index';

const TransactionDetails = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={{padding: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
                alignSelf: 'flex-start',
                height: 30,
                width: 30,
                borderWidth: 1,
                borderColor: COLORS.borderGray,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: SIZES.radius / 2,
              }}>
              <Icon name="arrow-back" size={16} />
            </Pressable>
            <Text style={{...FONTS.small}}>Receipt</Text>
          </View>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              alignSelf: 'flex-start',

              width: 100,
              borderWidth: 1,
              borderColor: COLORS.primary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: SIZES.radius / 2,
            }}>
            <Text style={{...FONTS.regular}}>Share</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({});
