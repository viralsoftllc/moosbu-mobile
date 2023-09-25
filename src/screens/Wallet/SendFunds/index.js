import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, SIZES, FONTS} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import Search from '../../../shared/components/Search';
import UseIcon from '../../../shared/utils/UseIcon';
import Beneficiaries from './renderer/Beneficiaries';
import BankForm from './renderer/BankForm';

export default function SendFunds() {
  const {setOptions} = useNavigation();
  const [showBankForm, setShowBankForm] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Send Fund'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <Search filter={false} />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.options}>
          <View style={styles.option}>
            <Pressable
              style={styles.optionIcon}
              onPress={() => setShowBankForm(true)}>
              <UseIcon
                type={'MaterialCommunityIcons'}
                name="bank"
                color={COLORS.primary}
              />
            </Pressable>
            <Text style={styles.optionText}>Send to bank</Text>
          </View>

          <View style={styles.option}>
            <Pressable style={styles.optionIcon}>
              <UseIcon
                type={'MaterialIcons'}
                name="person-outline"
                color={COLORS.primary}
              />
            </Pressable>
            <Text style={styles.optionText}>Send to a friend</Text>
          </View>
        </View>

        <Beneficiaries />
      </ScrollView>

      <Modal visible={showBankForm} animationType="slide" transparent={true}>
        <BankForm setShowBankForm={setShowBankForm} />
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
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.primaryBackground,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base * 2,
    marginBottom: SIZES.base * 5,
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIcon: {
    backgroundColor: COLORS.white,
    width: verticalScale(40),
    height: verticalScale(40),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.base,
  },
  optionText: {
    color: COLORS.white,
    ...FONTS.medium,
  },
});
