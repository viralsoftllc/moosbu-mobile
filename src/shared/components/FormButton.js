/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, SIZES, FONTS} from '../../assets/themes';

export default function FormButton({
  title,
  fullWidth,
  buttonStyle,
  containerStyle,
  textStyle,
  onPress,
  disabled,
  leftIcon,
  rightIcon,
  loading,
}) {
  return (
    <View
      style={[
        styles.container,
        {paddingHorizontal: fullWidth ? 0 : SIZES.paddingHorizontal},
        containerStyle,
      ]}>
      <Pressable
        style={[
          styles.btn,
          {backgroundColor: disabled ? COLORS.grayText : COLORS.primary},
          buttonStyle,
        ]}
        onPress={onPress}
        disabled={disabled || loading}>
        {loading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <>
            {leftIcon ? leftIcon : null}

            <Text
              style={[
                styles.text,
                textStyle,
                {
                  marginLeft: leftIcon ? SIZES.base : 0,
                  marginRight: rightIcon ? SIZES.base : 0,
                },
              ]}>
              {title}
            </Text>

            {rightIcon ? rightIcon : null}
          </>
        )}
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: COLORS.primary,
    height: verticalScale(43),
    borderRadius: SIZES.radius,
  },
  text: {
    color: COLORS.white,
    ...FONTS.medium,
  },
});
