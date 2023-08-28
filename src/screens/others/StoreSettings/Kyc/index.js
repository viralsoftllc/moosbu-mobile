import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UseIcon from '../../../../shared/utils/UseIcon';
import routes from '../../../../shared/constants/routes';

export default function Kyc() {
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'KYC'} />,
    });
  }, [setOptions]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Pressable style={styles.link} onPress={() => navigate(routes.SELFIE)}>
          <View style={styles.iconView}>
            <UseIcon
              name={'person'}
              type="MaterialIcons"
              color={COLORS.primary}
              size={verticalScale(20)}
            />
          </View>

          <View style={styles.details}>
            <Text style={styles.title}>Take Selfie</Text>
            <Text style={styles.subtitle}>Unverified</Text>
          </View>

          <UseIcon
            name={'chevron-right'}
            type="MaterialIcons"
            color={COLORS.textPrimary}
            size={verticalScale(20)}
          />
        </Pressable>

        <Pressable style={styles.link}>
          <View style={styles.iconView}>
            <UseIcon
              name={'person'}
              type="MaterialIcons"
              color={COLORS.primary}
              size={verticalScale(20)}
            />
          </View>

          <View style={styles.details}>
            <Text style={styles.title}>Id Card</Text>
            <Text style={styles.subtitle}>Unverified</Text>
          </View>

          <UseIcon
            name={'chevron-right'}
            type="MaterialIcons"
            color={COLORS.textPrimary}
            size={verticalScale(20)}
          />
        </Pressable>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: SIZES.base * 1.5,
    borderColor: COLORS.borderGray,
  },
  details: {
    flex: 1,
    marginHorizontal: SIZES.base,
  },
  iconView: {
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
    padding: SIZES.base / 1.5,
  },
  title: {
    ...FONTS.h5,
    color: COLORS.primary,
    marginBottom: SIZES.base / 3,
  },
  subtitle: {
    ...FONTS.medium,
    color: COLORS.grayText,
  },
});
