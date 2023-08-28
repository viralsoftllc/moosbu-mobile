import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function SaveChatForm({
  setShowSaveChatForm,
  handleSuccessfulResponse,
}) {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.flex}>
            <View>
              <Text style={styles.title}>
                Are you sure you want to save conversation?
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setShowSaveChatForm(false);
              }}
              style={styles.closeBtn}>
              <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
            </Pressable>
          </View>

          <FormInput
            label={'Conversation Title'}
            placeholder="Enter conversation title here"
          />

          <FormButton
            title={'Save'}
            buttonStyle={styles.buttonStyle}
            onPress={handleSuccessfulResponse}
          />

          <FormButton
            title={'Cancel'}
            buttonStyle={styles.cancelButtonStyle}
            textStyle={styles.textStyle}
            onPress={() => {
              setShowSaveChatForm(false);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: SIZES.base * 1.3,
  },
  title: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
  },
  subtitle: {
    ...FONTS.medium,
    color: COLORS.grayText,
  },
  closeBtn: {
    padding: SIZES.base,
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    marginTop: SIZES.base * 2,
  },
  cancelButtonStyle: {
    backgroundColor: COLORS.white,
    marginTop: SIZES.base * 2,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  textStyle: {
    color: COLORS.primary,
  },
});
