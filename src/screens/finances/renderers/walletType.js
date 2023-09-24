import {Pressable, StyleSheet, Text, View, Alert} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../../assets/themes';
import {RadioButton} from 'react-native-paper';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const WalletType = ({setCreateWalletModel, navigate}) => {
  const [checked, setChecked] = React.useState('Individual'); //initial choice
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
          marginTop: 30,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              ...FONTS.h4,
              fontWeight: 800,
            }}>
            Select Wallet Type
          </Text>
          <Pressable onPress={() => setCreateWalletModel(false)} style={{}}>
            <Icon name="close" size={20} />
          </Pressable>
        </View>

        <View style={{gap: 20}}>
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
                status={checked === 'Individual' ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
                onPress={() => setChecked('Individual')} //when pressed, set the value of the checked Hook to 'Apple'
                color={COLORS.secondary}
              />
              <View>
                <Text style={{...FONTS.big}}>Individual wallet</Text>
                <Text style={{...FONTS.medium}}>
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
              onPress={() => notifyMessage('Coming soon')}>
              <RadioButton
                value="Business"
                status={checked === 'Business' ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
              />
              <View>
                <Text style={{...FONTS.big}}>Business wallet</Text>
                <Text style={{...FONTS.medium}}>
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
                  fontFamily: 'Lato',
                  padding: 10,
                  width: 100,
                }}>
                Popular
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={navigate}
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: 10,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...FONTS.regular,
              fontWeight: 700,
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
