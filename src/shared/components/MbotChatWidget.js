import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Draggable from 'react-native-draggable';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, SIZES} from '../../assets/themes';
import routes from '../constants/routes';
import UseIcon from '../utils/UseIcon';

export default function MbotChatWidget() {
  const {navigate} = useNavigation();

  return (
    <Draggable
      x={SIZES.width - verticalScale(100)}
      y={verticalScale(400)}
      shouldReverse={false}
      renderColor={COLORS.primary}
      isCircle
      onShortPressRelease={() => navigate(routes.M_BOT)}>
      <View style={styles.iconView}>
        <UseIcon
          name="chat"
          type={'MaterialIcons'}
          size={verticalScale(20)}
          color={COLORS.secondary}
        />
      </View>
    </Draggable>
  );
}
const styles = StyleSheet.create({
  iconView: {
    alignSelf: 'center',
    height: verticalScale(56),
    width: verticalScale(56),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 100,
  },
});
