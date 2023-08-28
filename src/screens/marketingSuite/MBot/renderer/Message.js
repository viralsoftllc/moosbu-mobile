import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import AppButton from '../../../../shared/components/AppButton';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function Message({
  message,
  isBotMessage,
  handleRewrite,
  handleCopyResponse,
}) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageView,
          isBotMessage ? styles.botMessageView : styles.userMessageView,
        ]}>
        <Text style={isBotMessage ? styles.botMessage : styles.userMessage}>
          {message}
        </Text>
      </View>

      {isBotMessage ? (
        <View style={styles.buttons}>
          <AppButton
            title={'Copy Response'}
            rightIcon={
              <UseIcon
                type={'MaterialCommunityIcons'}
                name={'content-copy'}
                color={COLORS.white}
                size={verticalScale(12)}
              />
            }
            buttonStyle={styles.button}
            textStyle={styles.textStyle}
            onPress={handleCopyResponse}
          />

          <AppButton
            title={'Request Rewrite'}
            rightIcon={
              <UseIcon
                type={'FeatherIcons'}
                name={'edit'}
                color={COLORS.white}
                size={verticalScale(12)}
              />
            }
            buttonStyle={styles.button}
            textStyle={styles.textStyle}
            onPress={handleRewrite}
          />
        </View>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.base * 3,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.base,
  },
  button: {
    backgroundColor: '#76A3E0',
    borderWidth: 0,
    marginRight: SIZES.base,
    borderRadius: SIZES.radius / 2,
  },
  textStyle: {
    color: COLORS.white,
    ...FONTS.tiny,
  },
  messageView: {
    backgroundColor: COLORS.white,
    maxWidth: '80%',
    paddingVertical: SIZES.base * 1.4,
    paddingHorizontal: SIZES.base * 2,
  },
  botMessageView: {
    backgroundColor: COLORS.primary,
    borderTopRightRadius: SIZES.radius * 2,
    borderBottomLeftRadius: SIZES.radius * 2,
    borderBottomRightRadius: SIZES.radius * 2,
  },
  botMessage: {
    color: COLORS.white,
  },
  userMessageView: {
    backgroundColor: COLORS.white,
    alignSelf: 'flex-end',
    borderTopLeftRadius: SIZES.radius * 2,
    borderBottomLeftRadius: SIZES.radius * 2,
    borderBottomRightRadius: SIZES.radius * 2,
  },
});
