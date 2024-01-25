import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';
import UseIcon from '../../../shared/utils/UseIcon';

const WalletType = ({setCreateWalletModel}) => {
  const [checked, setChecked] = React.useState('Individual'); //initial choice

  const {navigate} = useNavigation();

  return (
    <View
      style={{
        paddingVertical: SIZES.base,
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              ...FONTS.h5,
            }}>
            Select Wallet Type
          </Text>
          <Pressable onPress={() => setCreateWalletModel(false)} style={{}}>
            <Icon name="close" size={25} />
          </Pressable>
        </View>

        <View style={{gap: 30, marginVertical: SIZES.base * 5}}>
          {/*Create first radio button */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 40,
            }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                flex: 0.9,
              }}
              onPress={() => setChecked('Individual')}>
              <UseIcon
                type={'MaterialIcons'}
                name={
                  checked === 'Individual'
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }
                color={COLORS.primary}
              />
              <View>
                <Text
                  style={{
                    ...FONTS.medium,
                    marginBottom: 5,
                    fontFamily: 'Lato-Bold',
                  }}>
                  Moosbu Mini Business Wallet
                </Text>
                <Text style={{...FONTS.small}}>
                  Unlimited deposit, ₦1M daily transfer limit, ₦20,000 single
                  transaction limit, transaction fee ₦50
                </Text>
              </View>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 40,
            }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                flex: 0.9,
              }}
              onPress={() => setChecked('Business')}>
              <UseIcon
                type={'MaterialIcons'}
                name={
                  checked === 'Business'
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }
                color={COLORS.primary}
              />
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text
                    style={{
                      ...FONTS.medium,
                      marginBottom: 5,
                      fontFamily: 'Lato-Bold',
                    }}>
                    Moosbu Pro Business Wallet
                  </Text>

                  <View
                    style={{
                      backgroundColor: COLORS.lightSecondaryBackground,
                      borderRadius: 30,
                      padding: 10,
                      width: 100,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: COLORS.secondary,
                        textAlign: 'center',
                        fontFamily: 'Lato-Bold',
                      }}>
                      Popular
                    </Text>
                  </View>
                </View>

                <Text style={{...FONTS.small}}>
                  Unlimited deposit, ₦5M daily transfer limit, ₦1M single
                  transaction limit, transaction fee ₦50, KYB validation ₦1000
                </Text>
              </View>
            </Pressable>

            {/* <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.secondary,
                  backgroundColor: COLORS.lightSecondaryBackground,
                  borderRadius: 30,
                  textAlign: 'center',
                  fontFamily: 'Lato-Bold',
                  padding: 10,
                  width: 100,
                }}>
                Popular
              </Text>
            </View> */}
          </View>
        </View>

        <Pressable
          onPress={() => {
            setCreateWalletModel(false);
            if (checked === 'Individual') {
              return navigate('CreatePersonalWallet');
            }
            return navigate('CreateBusinessWallet');
          }}
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: 10,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.white,
            }}>
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WalletType;

const styles = StyleSheet.create({});
