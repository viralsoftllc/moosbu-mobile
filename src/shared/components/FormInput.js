/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../assets/themes';

export default function FormInput({
  label,
  labelIcon,
  placeholder,
  style,
  inputStyle,
  multiline,
  inputContainerStyle,
  rightIcon,
  leftIcon,
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

      <View style={[styles.inputContainer, inputContainerStyle]}>
        {leftIcon ? leftIcon : null}

        <TextInput
          style={[
            styles.textinput,
            inputStyle,
            {textAlignVertical: multiline ? 'top' : 'center'},
          ]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.grayText}
          {...rest}
        />
        {rightIcon ? rightIcon : null}
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
    borderRadius: SIZES.radius / 1.5,
    borderColor: COLORS.borderGray,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: SIZES.base / 2,
    height: verticalScale(45),
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
});
