import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';
import handleApiError from '../../../../shared/components/handleApiError';
import client from '../../../../shared/api/client';
import {ActivityIndicator} from 'react-native-paper';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Test from '../../../Test';
import {useDispatch} from 'react-redux';
import {setWalletBalance} from '../../../../redux/slices/wallet/slice';

export default function EnterPin({setShowPinForm, options}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');

  const handleTransfer = async () => {
    setLoading(true);
    console.log(options);
    try {
      const res = await client.post('/api/transfer', {
        ...options,
        pin: code,
      });

      console.log(res.data);

      const {attributes, id} = res.data;
      console.log(attributes);

      const {status, failureReason, reason, createdAt} = attributes;

      if (status == 'FAILED') {
        setShowPinForm(false);
        navigation.navigate('TransferDeclined', options);
      }
      if (status == 'PENDING') {
        navigation.navigate('TransactionPending', {
          ...options,
          time: createdAt,
          transactionId: id,
          status,
        });
      }
      if (status == 'COMPLETED') {
        setShowPinForm(false);
        navigation.navigate('TransferSuccessful', {
          ...options,
          time: createdAt,
          transactionId: id,
          status,
        });
      }

      setLoading(false);
    } catch (error) {
      navigation.navigate('TransferDeclined', options);
      setShowPinForm(false);
      setLoading(false);
      handleApiError(error);
    }
    // finally {
    //   const {data} = await client.get('/api/wallet');
    //   const balanceinNaira = data?.balance.availableBalance / 100;
    //   dispatch(setWalletBalance(balanceinNaira));
    // }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.modalContainer}>
        {loading ? (
          <Test />
        ) : (
          <View style={styles.container}>
            <View>
              <View style={styles.flex}>
                <View style={{flex: 2}}>
                  <Text style={styles.title}>Enter your Moosbu pin</Text>
                  <Text style={styles.subtitle}>
                    Your Moosbu pin is required to complete this transaction
                  </Text>
                </View>

                <View>
                  <Pressable
                    onPress={() => {
                      setShowPinForm(false);
                    }}
                    style={styles.closeBtn}>
                    <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
                  </Pressable>
                </View>
              </View>

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
            </View>

            <Pressable style={styles.iconView} onPress={handleTransfer}>
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <>
                  <UseIcon
                    type={'Feather'}
                    name="send"
                    size={verticalScale(15)}
                    color={COLORS.white}
                  />
                  <Text style={{color: COLORS.white, ...FONTS.medium}}>
                    Send
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
  },
  flex: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: SIZES.base * 1.3,
  },
  title: {
    ...FONTS.medium,
    color: COLORS.label,
  },
  subtitle: {
    ...FONTS.small,
    color: COLORS.grayText,
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
  info: {
    ...FONTS.medium,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SIZES.base * 2,
  },
  iconView: {
    borderWidth: 1,
    borderRadius: SIZES.radius,
    padding: SIZES.base,
    alignSelf: 'center',
    borderColor: COLORS.primary,
    marginBottom: SIZES.base * 5,
    marginTop: SIZES.base * 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 10,
    backgroundColor: COLORS.primary,
    width: '90%',
  },
  closeBtn: {
    padding: SIZES.base,
  },
});
