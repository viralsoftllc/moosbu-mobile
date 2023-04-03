import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../../../../assets/themes';
import UseIcon from '../../../../../../shared/utils/UseIcon';
import FormButton from '../../../../../../shared/components/FormButton';

export default function DhlModal({setShowDhlModal}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={[styles.flex, styles.headerView]}>
            <View style={styles.headerTexts}>
              <Text style={styles.title}>Set Up DHL Logistics</Text>
              {/* <Text style={styles.subtitle}>
                Please enter your cash On Delivery API keys. You will find your
                API keys at cash On Delivery API key dashboard{' '}
              </Text> */}
            </View>

            <Pressable
              onPress={() => {
                setShowDhlModal(false);
              }}
              style={styles.closeBtn}>
              <UseIcon
                type={'MaterialCommunityIcons'}
                name={'close'}
                color={COLORS.debit}
                size={verticalScale(18)}
              />
            </Pressable>
          </View>

          {/* Form */}
          <View style={styles.formView}>
            {/* <FormInput
              label={'Public Key'}
              placeholder={'Enter your public key'}
            />
            <FormInput
              label={'Secret Key'}
              placeholder={'Enter your secret key'}
            /> */}

            <Pressable
              style={styles.activateBtn}
              onPress={() => setIsActive(!isActive)}>
              <View style={styles.cardIcon}>
                <UseIcon
                  name={
                    isActive ? 'toggle-switch' : 'toggle-switch-off-outline'
                  }
                  type={'MaterialCommunityIcons'}
                  color={isActive ? COLORS.credit : COLORS.grayText}
                  size={verticalScale(23)}
                />
              </View>

              <Text style={styles.activateText}>
                {isActive ? 'Deactivate DHL' : 'Activate DHL'}
              </Text>
            </Pressable>

            <FormButton title={'Save'} />
          </View>
        </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: SIZES.base * 1.3,
  },
  headerTexts: {
    flex: 1,
  },
  headerView: {
    alignItems: 'flex-start',
  },
  formView: {
    marginTop: SIZES.base,
  },
  title: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
  },
  subtitle: {
    ...FONTS.medium,
    color: COLORS.grayText,
    marginTop: SIZES.base,
  },
  closeBtn: {
    paddingLeft: SIZES.base * 1.5,
    paddingBottom: SIZES.base * 1.5,
  },
  activateBtn: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: SIZES.base * 2,
  },
  activateText: {
    marginLeft: SIZES.base / 2,
    color: COLORS.textPrimary,
    ...FONTS.regular,
  },
});
