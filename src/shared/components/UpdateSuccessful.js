import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../assets/themes';
import UseIcon from '../utils/UseIcon';
export default function UpdateSuccessful({
  setShowSuccessModal,
  title,
  subtitle,
  message,
  onPress,
}) {
  return (
    <SafeAreaView style={styles.shareModal}>
      <View style={styles.modalContainer}>
        <View style={[styles.container, styles.flex]}>
          <View style={styles.iconView}>
            <UseIcon
              type={'AntDesign'}
              name="exclamationcircleo"
              color={COLORS.credit}
              size={verticalScale(21)}
            />
          </View>

          <View style={styles.details}>
            {message ? (
              <Text style={styles.title}>{message}</Text>
            ) : (
              <Text style={styles.title}>
                Your {title ? title : 'item update'} is successful
              </Text>
            )}

            {subtitle ? (
              <Text style={styles.subtitle}>{subtitle}</Text>
            ) : // <Text style={styles.subtitle}>
            //   Your {title ? title : 'item update'} will be updated now
            // </Text>
            null}

            <View style={styles.flex}>
              {/* <Pressable
                style={[styles.btn]}
                onPress={() => setShowSuccessModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable> */}

              <Pressable
                style={[styles.btn, styles.deleteBtn]}
                onPress={() => {
                  if (onPress) {
                    setShowSuccessModal(false);
                    onPress();
                  }
                  setShowSuccessModal(false);
                }}>
                <Text style={styles.deleteText}>Continue</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  shareModal: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  container: {
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.paddingHorizontal,
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.base * 2,
  },
  iconView: {
    height: verticalScale(40),
    width: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    borderRadius: 100,
    marginRight: SIZES.base,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: SIZES.base * 2,
    paddingVertical: SIZES.base / 2,
    borderRadius: SIZES.radius * 2,
    borderWidth: 1,
    marginRight: SIZES.base,
    borderColor: COLORS.borderGray,
  },
  cancelText: {
    color: COLORS.borderGray,
  },
  deleteText: {
    color: COLORS.white,
    ...FONTS.medium,
  },
  deleteBtn: {
    backgroundColor: COLORS.credit,
    borderColor: COLORS.credit,
  },
  title: {
    color: COLORS.credit,
    ...FONTS.h5,
    marginBottom: SIZES.base / 2,
  },
  subtitle: {
    color: COLORS.grayText,
    marginBottom: SIZES.base * 2,
    ...FONTS.medium,
  },
  details: {
    flex: 1,
    marginLeft: SIZES.base,
  },
});
