import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../../shared/components/UpdateSuccessful';
import NewRequest from './NewRequest';

export default function SettingsId() {
  const {setOptions} = useNavigation();

  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'SMS Sender IDs'} />,
    });
  }, [setOptions]);

  function handleSuccessfulResponse() {
    setShowNewRequestModal(false);
    setShowSuccessModal(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={[styles.flex, styles.header]}>
          <View style={styles.flexItem}>
            <Text style={styles.headerText}>Sender ID</Text>
          </View>
          <View style={styles.flexItem}>
            <Text style={styles.headerText}>Status</Text>
          </View>
          <View style={styles.flexItem}>
            <Text style={styles.headerText}>Company</Text>
          </View>
          <View style={styles.flexItem}>
            <Text style={styles.headerText}>Use Case</Text>
          </View>
        </View>

        <View style={[styles.flex, styles.content]}>
          <View style={styles.flexItem}>
            <Text style={styles.text}>Moosbu</Text>
          </View>

          <View style={styles.flexItem}>
            <Pressable style={styles.status}>
              <Text style={[styles.text, styles.statusText]}>Active</Text>
            </Pressable>
          </View>

          <View style={styles.flexItem}>
            <Text style={styles.text}>Moosbu</Text>
          </View>

          <View style={styles.flexItem}>
            <Text style={[styles.text, styles.message]}>
              Hello, thanks for your interest in registering your small
              business. Follow this link: https:// moosbu.com/scale to proceed.
            </Text>
          </View>
        </View>

        <View style={[styles.flex, styles.content]}>
          <View style={styles.flexItem}>
            <Text style={styles.text}>Moosbu</Text>
          </View>

          <View style={styles.flexItem}>
            <Pressable style={styles.status}>
              <Text style={[styles.text, styles.statusText]}>Active</Text>
            </Pressable>
          </View>

          <View style={styles.flexItem}>
            <Text style={styles.text}>Moosbu</Text>
          </View>

          <View style={styles.flexItem}>
            <Text style={[styles.text, styles.message]}>
              Hello, thanks for your interest in registering your small
              business. Follow this link: https:// moosbu.com/scale to proceed.
            </Text>
          </View>
        </View>
      </View>

      <FormButton
        title={'Make new request'}
        onPress={() => setShowNewRequestModal(true)}
      />

      <Modal
        visible={showNewRequestModal}
        animationType="slide"
        transparent={true}>
        <NewRequest
          setShowNewRequestModal={setShowNewRequestModal}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          title={'sms request'}
        />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
  },
  flexItem: {
    flex: 1,
    // width: '25%',
    paddingHorizontal: SIZES.base / 2,
  },
  header: {
    backgroundColor: COLORS.tabBg,
    paddingVertical: SIZES.base,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.tabBg,
  },
  headerText: {
    color: COLORS.textPrimary,
  },
  content: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: COLORS.tabBg,
    paddingVertical: SIZES.base,
  },
  text: {
    color: COLORS.textPrimary,
    fontWeight: '300',
  },
  message: {
    ...FONTS.medium,
    fontWeight: '300',
  },
  status: {
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.base,
  },
  statusText: {
    textAlign: 'center',
    color: COLORS.primary,
    fontWeight: '600',
  },
  table: {
    marginBottom: SIZES.base * 5,
  },
});
