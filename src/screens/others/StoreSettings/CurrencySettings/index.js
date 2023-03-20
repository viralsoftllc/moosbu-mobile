import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function CurrencySettings() {
  const {setOptions} = useNavigation();
  const [currencySympolPosition, setCurrencySympolPosition] = useState(false);
  const [currencySympolSpace, setCurrencySympolSpace] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Currency setting'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <FormInput
        label={'Currency Symbol'}
        placeholder="Enter Currency Symbol"
      />

      <FormInput label={'Currency'} placeholder="Enter Currency" />

      <View style={[styles.flex, styles.noteView]}>
        <UseIcon
          type={'AntDesign'}
          name="exclamationcircleo"
          color={COLORS.pending}
        />

        <Text style={styles.note}>
          Note: Add currency code as per three-letter ISO code. you can find out
          here..
        </Text>
      </View>

      <Pressable
        style={[styles.flex, styles.select]}
        onPress={() => setCurrencySympolPosition(!currencySympolPosition)}>
        <Text style={styles.selectText}>Currency Symbol Position</Text>

        <UseIcon
          name={
            currencySympolPosition
              ? 'toggle-switch'
              : 'toggle-switch-off-outline'
          }
          type={'MaterialCommunityIcons'}
          color={COLORS.credit}
          size={verticalScale(23)}
        />
      </Pressable>

      <Pressable
        style={[styles.flex, styles.select]}
        onPress={() => setCurrencySympolSpace(!currencySympolSpace)}>
        <Text style={styles.selectText}>Currency Symbol Space</Text>

        <UseIcon
          name={
            currencySympolSpace ? 'toggle-switch' : 'toggle-switch-off-outline'
          }
          type={'MaterialCommunityIcons'}
          color={COLORS.credit}
          size={verticalScale(23)}
        />
      </Pressable>

      <FormButton title={'Save changes'} buttonStyle={styles.buttonStyle} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  note: {
    color: COLORS.pending,
    ...FONTS.medium,
    marginLeft: SIZES.base,
    flex: 1,
  },
  noteView: {
    marginBottom: SIZES.base * 3,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectText: {
    flex: 1,
    color: COLORS.textPrimary,
  },
  select: {
    marginVertical: SIZES.base,
  },
  buttonStyle: {
    marginTop: SIZES.base * 3,
  },
});
