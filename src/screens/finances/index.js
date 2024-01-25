import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import WalletType from './renderers/walletType';
import HalfScreen from './renderers/halfScreen';
import {COLORS, FONTS, SIZES} from '../../assets/themes';
import ScreenHeader from '../../shared/components/ScreenHeader';

const Finances = ({navigation}) => {
  const [createWalletModal, setCreateWalletModal] = useState(false);

  // TODO: checked will never be resolved to "Individual"
  const handlePress = () => {
    setCreateWalletModal(false);
    // if (checked === 'Individual') {
    //   return navigation.navigate('CreatePersonalWallet');
    // }
    navigation.navigate('BasicDetails');
  };

  return (
    <>
      <StatusBar barStyle={'default'} />

      <SafeAreaView style={styles.safeAreaView}>
        <ScreenHeader title={'Business Banking'} />

        <View style={styles.container}>
          <Text
            style={{
              ...FONTS.medium,
              marginBottom: SIZES.base * 2,
            }}>
            Manage your business finances effectively with Moosbu Super Business
            App;
          </Text>

          <View
            style={{rowGap: SIZES.base * 1.5, marginBottom: SIZES.base * 5}}>
            <View style={styles.list}>
              <Text
                style={{
                  ...FONTS.medium,
                }}>{`\u25CF`}</Text>
              <Text style={styles.listItem}> Bank Transfer</Text>
            </View>

            <View style={styles.list}>
              <Text
                style={{
                  ...FONTS.medium,
                }}>
                {'\u25CF'}
              </Text>
              <Text style={styles.listItem}>
                Empower your staff to confirm customer transfers even when you
                are not available, ensuring continuity of business operations
              </Text>
            </View>

            <View style={styles.list}>
              <Text
                style={{
                  ...FONTS.medium,
                }}>
                {'\u25CF'}
              </Text>
              <Text style={styles.listItem}>
                Secure cash-flow advance for your business and help your
                business grow and expand
              </Text>
            </View>

            <View style={styles.list}>
              <Text
                style={{
                  ...FONTS.medium,
                }}>
                {'\u25CF'}
              </Text>
              <Text style={styles.listItem}>
                Receive your online store revenue
              </Text>
            </View>
          </View>

          <View style={styles.notice}>
            <Text
              style={{
                ...FONTS.small,
                textAlign: 'center',
                fontFamily: 'Lato-Bold',
              }}>
              Banking/financial services offered on the Moosbu Super Business
              App are provided by CBN-licensed and NDIC-insured banks and
              financial institutions
            </Text>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => setCreateWalletModal(true)}
              style={styles.button}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h5,
                }}>
                Create Your Business Wallet
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <Modal
        visible={createWalletModal}
        animationType="slide"
        transparent={true}
        style={{padding: 20}}>
        <HalfScreen>
          <WalletType
            navigate={handlePress}
            setCreateWalletModel={setCreateWalletModal}
          />
        </HalfScreen>
      </Modal>
    </>
  );
};

export default Finances;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base * 2,
  },
  list: {
    gap: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  listItem: {
    ...FONTS.medium,
    fontWeight: '400',
    color: COLORS.label,
  },
  notice: {
    backgroundColor: '#E4EDF9',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    marginBottom: SIZES.base * 4,
  },

  button: {
    minWidth: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
  },
});
