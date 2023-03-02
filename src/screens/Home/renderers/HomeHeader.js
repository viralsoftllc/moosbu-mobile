import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import AppButton from '../../../shared/components/AppButton';
import UseIcon from '../../../shared/utils/UseIcon';

export default function HomeHeader() {
  return (
    <View style={styles.topView}>
      <View style={styles.header}>
        <UseIcon
          type="EvilIcons"
          name={'user'}
          color={COLORS.white}
          size={verticalScale(20)}
        />
        <UseIcon
          type="MaterialIcons"
          name={'notifications-none'}
          color={COLORS.white}
          size={verticalScale(18)}
        />
      </View>

      <View>
        <Text style={styles.link}>moosbu.com/retail.store</Text>
        <Text style={styles.linkComment}>
          Link shared with customers can be visited and make orders
        </Text>
      </View>

      <View style={styles.linkButtons}>
        <AppButton
          title={'Copy link'}
          rightIcon={
            <UseIcon
              type={'MaterialIcons'}
              name={'content-copy'}
              color={COLORS.white}
              size={verticalScale(11)}
            />
          }
          buttonStyle={{marginRight: SIZES.base, borderColor: COLORS.white}}
        />

        <AppButton
          title={'Share link'}
          rightIcon={
            <UseIcon
              type={'FAIcon5'}
              name={'share-square'}
              color={COLORS.white}
              size={verticalScale(11)}
            />
          }
          buttonStyle={{borderColor: COLORS.white}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackground,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.base,
    marginTop: Platform.OS === 'android' ? SIZES.base : 0,
  },
  link: {
    color: COLORS.white,
    ...FONTS.h6,
    marginBottom: 1,
  },
  linkButtons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: SIZES.base,
    marginBottom: SIZES.base * 1.5,
  },
  linkComment: {
    color: COLORS.grayText,
    ...FONTS.tiny,
  },
  topView: {
    paddingHorizontal: SIZES.paddingHorizontal,
  },
});
