import {Pressable, StyleSheet, Text, View, Alert} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../../assets/themes';
import {RadioButton} from 'react-native-paper';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useNavigation} from '@react-navigation/native';

const WalletType = ({setCreateWalletModel}) => {
  const [checked, setChecked] = React.useState('Individual'); //initial choice

  const {navigate} = useNavigation();

  return (
    <View
      style={{
        justifyContent: 'space-evenly',
      }}>
      <View
        style={{
          gap: 35,
          padding: 20,
          justifyContent: 'space-evenly',
        }}>
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

        <View style={{gap: 30, marginVertical: 50}}>
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
                flex: 0.6,
              }}
              onPress={() => setChecked('Individual')}>
              <RadioButton
                value="Individual"
                status={checked === 'Individual' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Individual')}
                color={COLORS.primary}
              />
              <View>
                <Text style={{...FONTS.regular}}>Individual wallet</Text>
                <Text style={{...FONTS.small}}>
                  Transfer easily from your bank account
                </Text>
              </View>
            </Pressable>

            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{}}></Text>
            </View>
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
                flex: 0.6,
              }}
              onPress={() => setChecked('Business')}>
              <RadioButton
                color={COLORS.primary}
                value="Business"
                status={checked === 'Business' ? 'checked' : 'unchecked'}
              />
              <View>
                <Text style={{...FONTS.regular}}>Business wallet</Text>
                <Text style={{...FONTS.small}}>
                  Use any of your card to fund your wallet
                </Text>
              </View>
            </Pressable>

            <View
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
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => {
            setCreateWalletModel(false);
            if (checked === 'Individual') {
              return navigate('RegisterWalletOne');
            }
            return navigate('BasicDetails');
          }}
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: 10,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
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
