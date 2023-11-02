import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ion from 'react-native-vector-icons/Ionicons';
import {FONTS, SIZES, COLORS} from '../../../assets/themes/index';

import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import copyToClipboard from '../../../shared/utils/copyToClipboard';

import {useSelector} from 'react-redux';
import {selectUser} from '../../../redux/slices/user/selectors';
import client from '../../../shared/api/client';
import handleApiError from '../../../shared/components/handleApiError';
import Test from '../../Test';

const TransactionDetails = ({navigation, route}) => {
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

  const user = useSelector(selectUser);

  const viewRef = useRef();
  const [visible, setVisible] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await client.get(
          `/api/transaction_detail/${transactionId}`,
        );
        console.log(res.data);
        const {data} = res.data;
        setSummary(data?.attributes.summary);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleApiError(error);
      }
    };

    fetchDetails();
  }, []);

  const captureViewShot = async () => {
    setVisible(false);
    setHeaderVisible(true);
    const imageUri = await viewRef.current.capture();
    await shareScreenshot(imageUri);
    setVisible(true);
    setHeaderVisible(false);
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
      {loading ? (
        <Test />
      ) : (
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
              <Text style={{...FONTS.h3}}>Receipt</Text>
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
              <Text style={{...FONTS.h5, color: COLORS.secondary}}>Share</Text>
            </Pressable>
          </View>

          <ViewShot
            ref={viewRef}
            options={{format: 'jpg', quality: 0.5}}
            style={{
              justifyContent: 'space-evenly',
              backgroundColor: 'white',
              paddingHorizontal: 10,
              flex: 1,
            }}>
            {headerVisible ? (
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
            ) : null}

            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  ...FONTS.h3,
                }}>
                {Intl.NumberFormat('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                }).format(parseInt(amount))}
              </Text>
              <Text style={styles.label}>
                {new Date(time).toLocaleString()}
              </Text>
            </View>

            <View style={{gap: 10}}>
              <View style={styles.info}>
                <Text style={styles.label}>Summary</Text>
                <Text style={styles.content}>{summary}</Text>
                {/* </View>
              <View style={styles.info}>
                <Text style={styles.label}>To</Text>
                <Text style={styles.content}>{account_name}</Text>
                <Text style={styles.content}>{account_number}</Text>
                <Text style={styles.content}>{bank}</Text> */}
              </View>
              <View style={styles.info}>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.content}>{description}</Text>
              </View>
              <View style={styles.info}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.label}>Transaction Type</Text>
                  <Text style={styles.label}>Fees</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.content}>Outward Transfer</Text>
                  <Text style={styles.content}>
                    {' '}
                    {Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(parseInt(status == 'Debit' ? 50 : 0))}
                  </Text>
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
                  <Text style={styles.content}>{transactionId}</Text>
                </View>
                {visible ? (
                  <Pressable
                    onPress={() => copyToClipboard(transactionId)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <Text style={{color: COLORS.primary, ...FONTS.small}}>
                      Copy
                    </Text>
                    <Ion name="copy-outline" size={16} color={COLORS.primary} />
                  </Pressable>
                ) : null}
              </View>
              <View style={[styles.info, {marginBottom: 50}]}>
                <Text style={styles.label}>Transaction Status</Text>
                <Text style={styles.content}>{status}</Text>
              </View>
            </View>
          </ViewShot>

          <Text style={{...FONTS.h4, marginVertical: 30}}>More Actions</Text>
          <View style={{gap: 20}}>
            <Pressable
              style={styles.button}
              onPress={() => {
                navigation.navigate('Send Funds');
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
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
                  <Text style={{color: COLORS.textGray, ...FONTS.small}}>
                    Make this payment again
                  </Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color={COLORS.gray} />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                navigation.navigate('TransactionDetails');
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
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
                  <Ion
                    name="warning-outline"
                    color={COLORS.primary}
                    size={30}
                  />
                </View>
                <View>
                  <Text style={{...FONTS.h5}}>Report Transactions</Text>
                  <Text style={{color: COLORS.textGray, ...FONTS.small}}>
                    Report an issue with this transaction
                  </Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color={COLORS.gray} />
            </Pressable>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  info: {borderBottomWidth: 1, borderColor: COLORS.borderGray},
  label: {
    ...FONTS.medium,
    color: COLORS.textGray,
    marginBottom: 10,
  },
  content: {
    ...FONTS.medium,
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
