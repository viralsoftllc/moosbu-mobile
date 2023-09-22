import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/themes';
import {RadioButton} from 'react-native-paper';

import Icon from 'react-native-vector-icons/AntDesign';

const WalletType = ({setCreateWalletModel, navigate}) => {
  const [checked, setChecked] = React.useState('Individual'); //initial choice
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}></View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'space-evenly',
          padding: 20,
        }}>
        <Pressable
          onPress={() => setCreateWalletModel(false)}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}>
          <Icon name="closesquareo" size={40} />
        </Pressable>

        <View
          style={{
            gap: 60,
            padding: 20,
          }}>
          <View
            style={{
              gap: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 700,
                textAlign: 'center',
                fontFamily: 'Lato',
              }}>
              Select Wallet Type
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontFamily: 'Lato',
                fontWeight: 600,
              }}>
              Select a preferred wallet to get started
            </Text>
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
                  <Text
                    style={{fontWeight: 600, fontSize: 14, fontFamily: 'Lato'}}>
                    Individual wallet
                  </Text>
                  <Text style={{fontSize: 12, fontFamily: 'Lato'}}>
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
                onPress={() => setChecked('samsung')}>
                <RadioButton
                  value="Apple"
                  status={checked === 'samsung' ? 'checked' : 'unchecked'} //if the value of checked is Apple, then select this button
                  onPress={() => setChecked('samsung')} //when pressed, set the value of the checked Hook to 'Apple'
                  disabled
                />
                <View>
                  <Text
                    style={{fontWeight: 600, fontSize: 14, fontFamily: 'Lato'}}>
                    Business wallet
                  </Text>
                  <Text
                    style={{fontSize: 12, fontFamily: 'Lato'}}
                    numberOfLines={2}>
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
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.white,
                fontFamily: 'Lato',
                fontWeight: 700,
              }}>
              Continue
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default WalletType;

const styles = StyleSheet.create({});
