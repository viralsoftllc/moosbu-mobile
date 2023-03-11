import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../assets/themes';
import UseIcon from '../utils/UseIcon';

export default function DeleteItem({setShowDeleteModal, title}) {
  return (
    <SafeAreaView style={styles.shareModal}>
      <View style={styles.modalContainer}>
        <View style={[styles.container, styles.flex]}>
          <View style={styles.iconView}>
            <UseIcon
              type={'AntDesign'}
              name="exclamationcircleo"
              color={COLORS.debit}
              size={verticalScale(21)}
            />
          </View>

          <View style={styles.details}>
            <Text style={styles.title}>Delete {title ? title : 'item'}?</Text>
            <Text style={styles.subtitle}>
              This action can not be undo. Do you still want to continue?
            </Text>

            <View style={styles.flex}>
              <Pressable
                style={[styles.btn]}
                onPress={() => setShowDeleteModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>

              <Pressable style={[styles.btn, styles.deleteBtn]}>
                <Text style={styles.deleteText}>Delete</Text>
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
    // alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
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
    backgroundColor: 'rgba(202, 45, 49, 0.1)',
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
  },
  deleteBtn: {
    backgroundColor: COLORS.debit,
    borderColor: COLORS.debit,
  },
  title: {
    color: COLORS.debit,
    ...FONTS.regular,
    fontWeight: '600',
    marginBottom: SIZES.base / 2,
  },
  subtitle: {
    color: COLORS.grayText,
    marginBottom: SIZES.base * 2,
  },
  details: {
    flex: 1,
    marginLeft: SIZES.base,
  },
});
