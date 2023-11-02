import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import WalletType from './renderers/walletType';
import HalfScreen from './renderers/halfScreen';
import {COLORS, FONTS, SIZES} from '../../assets/themes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {verticalScale} from 'react-native-size-matters';

const Finances = ({navigation}) => {
  const [createWalletModal, setCreateWalletModal] = useState(false);

  const handlePress = () => {
    setCreateWalletModal(false);
    navigation.navigate('RegisterWalletOne');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            alignSelf: 'flex-start',
            height: verticalScale(30),
            width: verticalScale(30),
            borderWidth: 1,
            borderColor: COLORS.borderGray,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: SIZES.radius / 2,
          }}>
          <Icon name="arrow-back" size={16} />
        </Pressable>
        <Text
          style={{
            fontFamily: 'Lato-Black',
            fontSize: 20,
          }}>
          Business Banking
        </Text>
        <Text></Text>
      </View>
      <View>
        {/* <Text
          style={{
            ...FONTS.h3,
            fontWeight: 800,
            marginTop: 50,
          }}>
          Business Banking
        </Text> */}
        <Text
          style={{
            ...FONTS.medium,
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
            ...FONTS.small,
            textAlign: 'center',
            fontFamily: 'Lato-Bold',
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
              ...FONTS.h5,
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
        <HalfScreen>
          <WalletType
            navigate={handlePress}
            setCreateWalletModel={setCreateWalletModal}
          />
        </HalfScreen>
      </Modal>
    </SafeAreaView>
  );
};

export default Finances;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
  },
  list: {
    gap: 5,
    flexDirection: 'row',
  },

  listItem: {...FONTS.medium, fontWeight: '500'},

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
