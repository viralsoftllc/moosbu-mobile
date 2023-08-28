/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../assets/themes';

export default function TextAreaInput({
  label,
  labelIcon,
  placeholder,
  style,
  inputStyle,
  multiline,
  inputContainerStyle,
  rightIcon,
  leftIcon,
  info,
  ...rest
}) {
  return (
    <View style={[styles.container, style]}>
      {label ? (
        <View style={styles.labelView}>
          {labelIcon ? labelIcon : null}
          <Text
            style={[
              styles.label,
              {marginLeft: labelIcon ? SIZES.base / 1.5 : 0},
            ]}>
            {label}
          </Text>
        </View>
      ) : null}

      <View
        style={{
          borderWidth: 1,
          borderRadius: SIZES.radius / 1.5,
          borderColor: COLORS.borderGray,
        }}>
        <TextInput
          editable
          multiline
          numberOfLines={5}
          placeholder={placeholder}
          // maxLength={40}
          // onChangeText={text => onChangeText(text)}
          // value={value}
          style={{padding: 10, textAlignVertical: 'top'}}
          {...rest}
        />
      </View>

      {info ? <Text style={styles.info}>{info}</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.base * 2,
  },
  label: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontWeight: '400',
  },
  textinput: {
    ...FONTS.regular,
    flex: 1,
  },
  labelView: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: SIZES.base,
  },
  info: {
    ...FONTS.medium,
    marginTop: SIZES.base / 2,
  },
});