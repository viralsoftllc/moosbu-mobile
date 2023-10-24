import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ion from 'react-native-vector-icons/Ionicons';
import {FONTS, SIZES, COLORS} from '../../../assets/themes/index';

import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import copyToClipboard from '../../../shared/utils/copyToClipboard';

const HistoryDetails = () => {
  const viewRef = useRef();

  const captureViewShot = async () => {
    setVisible(false);
    const imageUri = await viewRef.current.capture();
    await shareScreenshot(imageUri);
    setVisible(true);
  };

  const shareScreenshot = async screenshotUri => {
    const shareOptions = {
      title: 'Share Screenshot',
      url: screenshotUri,
      type: 'image/png',
    };
    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing screenshot:', error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white, padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
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
            <Text style={{...FONTS.h3, fontWeight: '700'}}>Receipt</Text>
          </View>
          <Pressable
            onPress={captureViewShot}
            style={{
              alignSelf: 'flex-start',

              width: 100,
              borderWidth: 1,
              borderColor: COLORS.secondary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              padding: 8,
            }}>
            <Text style={{...FONTS.regular, color: COLORS.secondary}}>
              Share
            </Text>
          </Pressable>
        </View>

        <ViewShot
          ref={viewRef}
          options={{format: 'jpg', quality: 0.5}}
          style={{
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/images/moosbuu.png')}
              style={{width: 150, height: 150}}
              resizeMode="contain"
            />
            <Text style={{...FONTS.regular}}>Transaction Receipt</Text>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{...FONTS.h3, fontWeight: '700'}}>
              {' '}
              {Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
              }).format(parseInt(200))}
            </Text>
            <Text style={styles.label}>time</Text>
          </View>

          <View style={{gap: 10}}>
            <View style={styles.info}>
              <Text style={styles.label}>From</Text>
              <Text style={styles.content}>{'user'}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>To</Text>
              <Text style={styles.content}>{'account_name'}</Text>
              <Text style={styles.content}>{'account_number'}</Text>
              <Text style={styles.content}>{'bank'}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.content}>{'description'}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Transaction Type</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.content}>Outward Transfer</Text>
                <Text style={styles.content}>#0.00</Text>
              </View>
            </View>
            <View
              style={[
                styles.info,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <View>
                <Text style={styles.label}>Transaction Reference</Text>
                <Text style={styles.content}>{'transactionId'}</Text>
              </View>
            </View>
            <View style={[styles.info, {marginBottom: 50}]}>
              <Text style={styles.label}>Transaction Status</Text>
              <Text style={styles.content}>Successful</Text>
            </View>
          </View>
        </ViewShot>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryDetails;

const styles = StyleSheet.create({
  info: {borderBottomWidth: 1, borderColor: COLORS.borderGray},
  label: {
    ...FONTS.medium,
    color: COLORS.textGray,
    marginBottom: 10,
  },
  content: {
    ...FONTS.medium,
    fontWeight: '700',
    color: COLORS.label,
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    borderRadius: 8,
  },
});
