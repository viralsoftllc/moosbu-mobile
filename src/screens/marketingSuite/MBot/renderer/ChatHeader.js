import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import AppButton from '../../../../shared/components/AppButton';
import ImageIcon from '../../../../shared/components/ImageIcon';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function ChatHeader({handleSaveChat}) {
  const {goBack} = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <View style={[styles.flex, styles.flexOne]}>
          <View style={styles.imageIconView}>
            <ImageIcon
              imageUrl={require('../../../../assets/images/moosbuicon.png')}
              size={verticalScale(20)}
              rounded
              style={styles.imageIcon}
            />
          </View>

          <View style={styles.iconTexts}>
            <Text style={styles.chatWith}>Chat with</Text>
            <Text style={styles.mbot}>Mbot</Text>
          </View>
        </View>

        <Pressable style={styles.closeBtn} onPress={goBack}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name={'close'}
            color={COLORS.white}
          />
        </Pressable>
      </View>

      <View style={styles.flex}>
        <Text style={styles.helpText}>
          I am always here to assist you in growing your business. Ask me about
          anything.
        </Text>

        <AppButton
          title={'Save conversation'}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.textStyle}
          onPress={handleSaveChat}
          rightIcon={
            <UseIcon
              type={'AntDesign'}
              name={'download'}
              color={COLORS.textPrimary}
              size={verticalScale(11)}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryBackground,
    paddingVertical: SIZES.base * 2,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  imageIcon: {
    margin: 0,
  },
  imageIconView: {
    borderRadius: 100,
    backgroundColor: '#A3C7F7',
    width: verticalScale(40),
    height: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.base,
  },
  closeBtn: {
    padding: SIZES.base,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexOne: {
    flex: 1,
  },
  chatWith: {
    color: COLORS.white,
    ...FONTS.medium,
  },
  mbot: {
    color: COLORS.white,
    ...FONTS.h6,
  },
  helpText: {
    flex: 1,
    color: COLORS.white,
    marginTop: SIZES.base,
    ...FONTS.medium,
    fontWeight: '100',
  },
  buttonStyle: {
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
  },
  textStyle: {
    color: COLORS.textPrimary,
    // fontSize: verticalScale(9),
  },
});
