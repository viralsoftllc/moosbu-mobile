import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import WalletType from './renderers/walletType';
import {COLORS, FONTS} from '../../assets/themes';

const Finances = ({navigation}) => {
  const [createWalletModal, setCreateWalletModal] = useState(false);

  const handlePress = () => {
    setCreateWalletModal(false);
    navigation.navigate('RegisterWalletOne');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 20,
            lineHeight: 24,
            fontWeight: 800,
            marginBottom: 5,
            marginTop: 50,
            fontFamily: 'Lato',
          }}>
          Business Banking
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 14.4,
            fontFamily: 'Lato',
          }}>
          Manage your business finances effectively with Moosbu Super Business
          App;
        </Text>
      </View>

      <View style={{gap: 15, marginBottom: 20}}>
        <View style={styles.list}>
          <Text>{`\u25CF`}</Text>
          <Text style={styles.listItem}> Bank Transfer</Text>
        </View>
        <View style={styles.list}>
          <Text>{`\u25CF`}</Text>
          <Text style={styles.listItem}>
            Empower your staff to confirm customer transfers even when you are
            not available, ensuring continuity of business operations
          </Text>
        </View>
        <View style={styles.list}>
          <Text>{`\u25CF`}</Text>
          <Text style={styles.listItem}>
            Secure cash-flow advance for your business and help your business
            grow and expand
          </Text>
        </View>
        <View style={styles.list}>
          <Text>{`\u25CF`}</Text>
          <Text style={styles.listItem}>Receive your online store revenue</Text>
        </View>
      </View>

      <View style={styles.notice}>
        <Text
          style={{
            fontWeight: 700,
            textAlign: 'center',
            fontFamily: 'Lato',
            fontSize: 12,
            lineHeight: 14.4,
          }}>
          Banking/financial services offered on the Moosbu Super Business App
          are provided by CBN-licensed and NDIC-insured banks and financial
          institutions
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => setCreateWalletModal(true)}
          style={styles.button}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 14,
              fontWeight: 800,
              lineHeight: 16.8,
              fontFamily: 'Lato',
            }}>
            Create Your Business Wallet
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={createWalletModal}
        animationType="slide"
        transparent={true}
        style={{padding: 20}}>
        <WalletType
          navigate={handlePress}
          setCreateWalletModel={setCreateWalletModal}
        />
      </Modal>
    </View>
  );
};

export default Finances;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, gap: 40},
  list: {
    gap: 5,
    flexDirection: 'row',
    fontFamily: 'Lato',
  },

  listItem: {fontSize: 12, lineHeight: 14.4, flex: 1},

  notice: {
    backgroundColor: '#E4EDF9',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
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
