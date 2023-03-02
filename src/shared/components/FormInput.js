/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../assets/themes';

export default function FormInput({
  label,
  placeholder,
  style,
  inputStyle,
  multiline,
  ...rest
}) {
  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={[styles.inputContainer]}>
        <TextInput
          style={[
            styles.textinput,
            inputStyle,
            {textAlignVertical: multiline ? 'top' : 'center'},
          ]}
          placeholder={placeholder}
          {...rest}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.base * 2,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: SIZES.radius / 2,
    borderColor: COLORS.borderGray,
  },
  label: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontWeight: '400',
    marginBottom: SIZES.base,
  },
  textinput: {
    ...FONTS.regular,
  },
});
