import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Modal, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';

import ScreenHeader from '../../../shared/components/ScreenHeader';
import UseIcon from '../../../shared/utils/UseIcon';
import EnterPin from './renderer/EnterPin';

export default function ConfirmTransferDetails() {
  const {setOptions} = useNavigation();
  const [showPinForm, setShowPinForm] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Confirm Payment'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.details}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>Send To:</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.text}>JOSHUA MOOSBU</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>Account Number:</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.text}>0011334455</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>Bank Name:</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.text}>Moosbu Wallet</Text>
          </View>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>Amount:</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.text}>₦100,000.00</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>Service fee:</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.text}>Free</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>Total Amount:</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.text}>₦100,000.00</Text>
          </View>
        </View>
      </View>

      <FormButton
        title={'Pay Securely'}
        leftIcon={
          <UseIcon
            type={'MaterialIcons'}
            name="lock-outline"
            color={COLORS.white}
          />
        }
        onPress={() => {
          setShowPinForm(true);
        }}
        buttonStyle={styles.buttonStylye}
      />

      <Modal visible={showPinForm} animationType="slide" transparent={true}>
        <EnterPin setShowPinForm={setShowPinForm} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  details: {
    borderWidth: 1,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base * 2,
    paddingHorizontal: SIZES.base,
    borderColor: COLORS.borderGray,
    marginVertical: SIZES.base * 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.base * 2,
  },
  column: {
    flex: 1,
  },
  text: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
  },
  buttonStylye: {
    marginTop: SIZES.base * 2,
  },
});
