import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';
import FormInput from '../../../shared/components/FormInput';
import UseIcon from '../../../shared/utils/UseIcon';

export default function NewStore({setShowNewStoreModal}) {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <Pressable
            onPress={() => {
              setShowNewStoreModal(false);
            }}
            style={styles.closeBtn}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name={'close'}
              color={COLORS.debit}
            />
          </Pressable>

          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Create A New Store</Text>
            </View>
          </View>

          <FormInput label={'Store name'} placeholder="Enter Store Name" />

          <View style={styles.buttons}>
            <FormButton
              title={'Save'}
              buttonStyle={styles.buttonStyle}
              onPress={() => {}}
            />

            <FormButton
              title={'Back'}
              buttonStyle={[styles.buttonStyle, styles.backButton]}
              textStyle={styles.textStyle}
              onPress={() => setShowNewStoreModal(false)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base,
    paddingBottom: SIZES.base * 2,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
  },
  safeAreaView: {
    flex: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: SIZES.base * 3,
  },
  title: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
    marginTop: SIZES.base / 1.5,
  },
  closeBtn: {
    padding: SIZES.base,
    alignSelf: 'flex-end',
  },
  buttons: {
    marginTop: SIZES.base * 2,
  },
  buttonStyle: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: SIZES.base,
  },
  backButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  textStyle: {
    color: COLORS.primary,
  },
});
