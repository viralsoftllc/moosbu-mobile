import {StyleSheet, Text, TextInput, View, Dimensions} from 'react-native';
import React, {useState, useLayoutEffect, useEffect, useCallback} from 'react';
import {Button, Surface, Modal, IconButton} from 'react-native-paper';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {verticalScale} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';

import {FONTS, COLORS, SIZES} from '../assets/themes';
import ScreenHeader from '../shared/components/ScreenHeader';
import client from '../shared/api/client';
import handleApiError from '../shared/components/handleApiError';
import Test from './Test';
import {selectAccountName} from '../redux/slices/wallet/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {setTokens} from '../redux/slices/wallet/slice';
import {selectTokens} from '../redux/slices/wallet/selectors';
import notifyMessage from '../shared/hooks/notifyMessage';

const TokenScreen = ({navigation}) => {
  const {setOptions} = useNavigation();
  const dispatch = useDispatch();

  const {width} = Dimensions.get('screen');

  const tokenWallet = useSelector(selectTokens);
  const accountNumber = useSelector(selectAccountName);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Marketing Tokens'} />,
    });
  }, [setOptions]);

  const [purchaseCTA, setPurchaseCTA] = useState(false);

  const showPurchaseCTA = () => setPurchaseCTA(true);
  const hidePurchaseCTA = () => setPurchaseCTA(false);

  const [chargeCTA, setChargeCTA] = useState(false);
  const showChargeCTA = () => setChargeCTA(true);
  const hideChargeCTA = () => setChargeCTA(false);

  const [enterPin, setEnterPin] = useState(false);
  const showEnterPin = () => setEnterPin(true);
  const hideEnterPin = () => setEnterPin(false);

  const [code, setCode] = useState('');

  //token picker variables
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const tokens = [
    {label: 'SMS', value: 3},
    {label: 'Vera AI', value: 4},
    // {label: 'Whatsapp', value: 5},
    // {label: 'Email', value: 3},
  ];

  const [amount, setAmount] = useState(0);
  const [token_type, setToken_type] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const buyToken = async () => {
    setIsLoading(true);
    hideEnterPin();
    try {
      const {data} = await client.post('/api/purchase_token', {
        amount,
        token_type,
        debitAccountNumber: accountNumber,
      });

      if (data.data == 1) {
        navigation.navigate('TokenSuccess');
        fetchTokens();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      handleApiError(error);
    } finally {
      setAmount(0);
      setCode('');
    }
  };

  const fetchTokens = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await client.get('/api/get_tokens');
      dispatch(setTokens(res.data.data));
      console.log(res.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      handleApiError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  return (
    <>
      {isLoading ? (
        <Test />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            padding: 20,
            backgroundColor: 'white',
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 20,
              }}>
              <Surface style={styles.surface}>
                <Text style={styles.label}>SMS</Text>
                <Text style={styles.value}>{tokenWallet.sms_token}</Text>
              </Surface>
              <Surface style={styles.surface}>
                <Text style={styles.label}>Whatsapp</Text>
                <Text style={styles.value}>{tokenWallet.whatsapp_token}</Text>
              </Surface>
              <Surface style={styles.surface}>
                <Text style={styles.label}>Emails</Text>
                <Text style={styles.value}>{tokenWallet.email_token}</Text>
              </Surface>
            </View>
          </View>
          {/* <Text>{token_type}</Text> */}
          <View>
            <Text style={{...FONTS.h5}}>Token Pricing</Text>
            <View style={{marginVertical: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  borderTopWidth: 1,
                  borderColor: COLORS.borderGray,
                  padding: 10,
                }}>
                <View style={{flex: 1}}>
                  <Text style={styles.value}>Channel</Text>
                  <Text style={styles.label}>SMS</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={styles.value}>Amount</Text>
                  <Text style={styles.label}>
                    {Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(3)}
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={styles.value}>Token</Text>
                  <Text style={styles.label}>1</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  borderTopWidth: 1,
                  borderColor: COLORS.borderGray,
                  padding: 10,
                }}>
                <View style={{flex: 1}}>
                  <Text style={styles.value}>Channel</Text>
                  <Text style={styles.label}>Whatsapp</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={styles.value}>Amount</Text>
                  <Text style={styles.label}>
                    {Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(5)}
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={styles.value}>Token</Text>
                  <Text style={styles.label}>1</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  borderTopWidth: 1,
                  borderColor: COLORS.borderGray,
                  padding: 10,
                }}>
                <View style={{flex: 1}}>
                  <Text style={styles.value}>Channel</Text>
                  <Text style={styles.label}>Email</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={styles.value}>Amount</Text>
                  <Text style={styles.label}>
                    {Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(3)}
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={styles.value}>Token</Text>
                  <Text style={styles.label}>1</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={[styles.label, {textAlign: 'center'}]}>
            1 Token is equal to 1 valid marketing message accross all messaging
            channels.
          </Text>
          <View
            style={{
              gap: 20,
            }}>
            <Button
              onPress={showPurchaseCTA}
              labelStyle={{fontFamily: 'Lato-Bold'}}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 8,
                width: '80%',
                alignSelf: 'center',
              }}
              mode="contained">
              Buy Token
            </Button>
            <Button
              labelStyle={{color: COLORS.primary, fontFamily: 'Lato-Bold'}}
              style={{
                borderRadius: 8,
                width: '80%',
                alignSelf: 'center',
                borderColor: COLORS.primary,
              }}
              mode="outlined">
              Redeem Token
            </Button>
          </View>

          {/* Purchase CTA */}
          <Modal
            visible={purchaseCTA}
            onDismiss={() => {
              hidePurchaseCTA();
              setAmount(0);
              setValue(0);
            }}
            contentContainerStyle={{
              backgroundColor: 'white',
              padding: 20,
              paddingBottom: 40,
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
            }}>
            <IconButton
              icon="close"
              mode="outlined"
              rippleColor={COLORS.secondary}
              onPress={() => {
                hidePurchaseCTA();
                setAmount(0);
                setValue(0);
              }}
              size={16}
              style={{alignSelf: 'flex-end', borderRadius: 8}}
            />
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.h5,
              }}>
              Purchase Marketing Token
            </Text>

            <View style={{marginVertical: 30, gap: 10}}>
              <Dropdown
                style={styles.input}
                placeholderStyle={[
                  styles.input,
                  {borderWidth: 0, color: COLORS.textGray},
                ]}
                itemTextStyle={{
                  ...FONTS.small,
                }}
                selectedTextStyle={{...FONTS.small}}
                data={tokens}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select token' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(prev => item.value);
                  setIsFocus(false);
                  setToken_type(prev => item.label.toLowerCase() + '_token');
                }}
              />

              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                onChangeText={text => {
                  setAmount(text);
                }}
                placeholder="Enter amount"
                placeholderTextColor={COLORS.textGray}
              />
            </View>

            {value ? (
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 30,
                  ...FONTS.medium,
                }}>
                Total number of tokens is{' '}
                {Intl.NumberFormat().format(amount / value)}
              </Text>
            ) : null}

            <Button
              onPress={() => {
                hidePurchaseCTA();
                showChargeCTA();
              }}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 8,
                width: '80%',
                alignSelf: 'center',
              }}
              mode="contained">
              Continue
            </Button>
          </Modal>

          {/* Charge CTA */}
          <Modal
            visible={chargeCTA}
            onDismiss={hideChargeCTA}
            contentContainerStyle={{
              backgroundColor: 'white',
              padding: 20,
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
            }}>
            <IconButton
              icon="close"
              mode="outlined"
              rippleColor={COLORS.secondary}
              onPress={hideChargeCTA}
              size={16}
              style={{alignSelf: 'flex-end', borderRadius: 8}}
            />
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.h5,
              }}>
              You Will Be Charged
            </Text>
            <View style={{marginVertical: 30}}>
              <Text style={{textAlign: 'center', ...FONTS.medium}}>
                {Intl.NumberFormat('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                }).format(amount)}{' '}
                +{' '}
                {Intl.NumberFormat('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                }).format(100)}{' '}
                process fee for the purchase of{' '}
                {Intl.NumberFormat().format(amount / value)} tokens
              </Text>
            </View>

            <Button
              onPress={() => {
                hideChargeCTA();
                showEnterPin();
              }}
              labelStyle={{fontFamily: 'Lato-Bold'}}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 8,
                width: '80%',
                alignSelf: 'center',
              }}
              mode="contained">
              Purchase Token
            </Button>
          </Modal>

          {/* Enter pin CTA */}
          <Modal
            visible={enterPin}
            onDismiss={() => {
              setCode('');
              hideEnterPin();
            }}
            contentContainerStyle={{
              backgroundColor: 'white',
              padding: 20,
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
            }}>
            <IconButton
              icon="close"
              mode="outlined"
              rippleColor={COLORS.secondary}
              onPress={() => {
                setCode('');
                hideEnterPin();
              }}
              size={16}
              style={{alignSelf: 'flex-end', borderRadius: 8}}
            />
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.h5,
              }}>
              Enter Pin
            </Text>
            <Text style={{...FONTS.small, textAlign: 'center'}}>
              Your pin is required to complete this transaction
            </Text>

            <View>
              <OTPInputView
                style={styles.otpView}
                pinCount={6}
                keyboardType={'number-pad'}
                autoFocusOnLoad={false}
                codeInputFieldStyle={styles.codeInputFieldStyle}
                onCodeFilled={otp => setCode(otp)}
                onCodeChanged={otp => setCode(otp)}
                code={code}
                secureTextEntry={true}
              />
            </View>

            <Button
              onPress={buyToken}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 8,
                width: '80%',
                alignSelf: 'center',
              }}
              labelStyle={{fontFamily: 'Lato-Bold'}}
              mode="contained">
              Send
            </Button>
          </Modal>
        </View>
      )}
    </>
  );
};

export default TokenScreen;

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    height: 65,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  label: {
    fontFamily: 'Lato-Regular',
    fontWeight: '600',
    color: COLORS.label,
  },
  value: {
    color: COLORS.textGray,
  },
  codeInputFieldStyle: {
    width: verticalScale(35),
    height: verticalScale(35),
    color: COLORS.black,
    backgroundColor: COLORS.tabBg,
    borderRadius: SIZES.radius / 2,
    ...FONTS.h6,
    marginHorizontal: 2,
  },
  otpView: {
    width: '90%',
    height: verticalScale(100),
    alignSelf: 'center',
    // backgroundColor: COLORS.lightSecondaryBackground,
  },
  input: {
    borderWidth: 1,
    marginTop: 3,
    borderRadius: 5,
    height: 50,
    padding: 10,
    borderColor: COLORS.borderGray,
    ...FONTS.small,
  },
});
