import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import UseIcon from '../../../shared/utils/UseIcon';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';

export default function NotificationRow({
  notification,
  handleSelectNotification,
}) {
  let totalChars = 0;

  const words = notification?.message?.trim()?.split(' ');
  words?.forEach(word => {
    totalChars += word?.length;
  });

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable}>
        <View style={styles.icons}>
          <UseIcon
            type="Ionicons"
            size={verticalScale(20)}
            name={'notifications-outline'}
            color={COLORS.white}
          />
        </View>

        <View style={styles.details}>
          {notification?.title?.trim()?.length !== 0 ? (
            <Text style={[styles.title]} numberOfLines={1}>
              {notification?.title}
            </Text>
          ) : null}

          <Text numberOfLines={4} style={[styles.message]}>
            {notification?.message}
          </Text>

          {words?.length > 20 || totalChars > 85 || notification?.bigPicture ? (
            <Pressable onPress={() => handleSelectNotification(notification)}>
              <Text style={styles.readMore}>Read More</Text>
            </Pressable>
          ) : null}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginBottom: SIZES.base,
    paddingVertical: SIZES.base,
    borderColor: COLORS.borderGray,
  },
  icons: {
    backgroundColor: COLORS.primary,
    margin: 0,
    height: verticalScale(40),
    width: verticalScale(40),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  details: {
    marginLeft: SIZES.base,
    flex: 1,
  },
  pressable: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    ...FONTS.big,
    color: COLORS.textPrimary,
  },
  message: {
    ...FONTS.medium,
    color: COLORS.grayText,
    marginTop: SIZES.base / 3,
    marginBottom: SIZES.base / 2,
  },
  readMore: {
    textDecorationLine: 'underline',
  },
});
