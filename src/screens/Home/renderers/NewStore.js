import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';
import FormInput from '../../../shared/components/FormInput';
import UseIcon from '../../../shared/utils/UseIcon';

export default function NewStore({setShowNewStoreModal}) {
  return (
    <SafeAreaView style={styles.shareModal}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.flex}>
            <View>
              <Text style={styles.title}>Create A New Store</Text>
            </View>

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
          </View>

          <FormInput label={'Store name'} placeholder="Enter Store Name" />

          <View>
            <FormButton title={'Save'} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.paddingHorizontal,
    backgroundColor: COLORS.white,
    paddingBottom: SIZES.base * 2,
    borderRadius: SIZES.radius,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  shareModal: {
    flex: 1,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: SIZES.base * 3,
  },
  title: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
    marginTop: SIZES.base / 1.5,
  },
  closeBtn: {
    padding: SIZES.base,
  },
});
