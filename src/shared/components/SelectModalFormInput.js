import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import UseIcon from '../utils/UseIcon';
import {COLORS, FONTS, SIZES} from '../../assets/themes';
import {verticalScale} from 'react-native-size-matters';

export default function SelectModalFormInput({
  setShowModal,
  selectedItem,
  placeholder,
  label,
}) {
  return (
    <View style={[styles.form]}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        style={styles.inputContainer}
        onPress={() => setShowModal(true)}>
        <Text
          style={[
            styles.value,
            {
              color: selectedItem?.id ? COLORS.black : COLORS.textGray,
            },
          ]}>
          {selectedItem?.name || placeholder}{' '}
        </Text>

        <UseIcon name="down" type={'AntDesign'} color={COLORS.grayText} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: SIZES.base * 2,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: SIZES.radius / 1.5,
    borderColor: COLORS.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    height: verticalScale(45),
    paddingHorizontal: SIZES.base,
  },
  label: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontWeight: '400',
    marginBottom: SIZES.base,
  },
  value: {
    color: COLORS.textGray,
    flex: 1,
    ...FONTS.regular,
  },
});
