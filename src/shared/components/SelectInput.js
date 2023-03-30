/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../assets/themes';

export default function SelectInput({
  label,
  labelIcon,
  placeholder,
  style,
  inputStyle,
  inputContainerStyle,
  rightIcon,
  leftIcon,
  options,
  onChange,
  value,
  keyExtractor,
  labelExtractor,
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

        <ModalSelector
          data={options}
          onChange={onChange}
          style={styles.modalSelector}
          initValue={placeholder}
          keyExtractor={keyExtractor}
          labelExtractor={labelExtractor}
          optionTextStyle={{color: COLORS.textPrimary, textAlign: 'left'}}
          overlayStyle={{padding: '2%'}}
          optionContainerStyle={{backgroundColor: COLORS.white}}
          cancelContainerStyle={{backgroundColor: COLORS.white}}>
          {/* <TextInput
            style={[styles.textinput, inputStyle]}
            placeholder={placeholder}
            editable={false}
            value={value}
            {...rest}
          /> */}
          <Text style={styles.selected}>{value || placeholder}</Text>
        </ModalSelector>

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
    color: COLORS.black,
  },
  modalSelector: {
    flex: 1,
  },
  labelView: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: SIZES.base,
  },
});
