import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect} from 'react';
import {
  PermissionsAndroid,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import RnSmileId from 'rn-smile-id';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UseIcon from '../../../../shared/utils/UseIcon';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import routes from '../../../../shared/constants/routes';
import {useSelector} from 'react-redux';
import {selectStoreDetails} from '../../../../redux/slices/store/selectors';
import {selectUser} from '../../../../redux/slices/user/selectors';

export default function Kyc() {
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'KYC'} />,
    });
  }, [setOptions]);

  const consentDialog = () =>
    RnSmileId.requestConsent(
      'USER_ID_001',
      'ic_mushroom',
      'com.moosbu',
      'Moosbu OS',
      'www.google.com',
    );

  async function takeSelfie() {
    try {
      // await consentDialog();
      const data = await RnSmileId.captureSelfie('Selfie', null);
      console.log('Selfie response');
      console.log(data);
    } catch (error) {
      console.log('Selfie error');
      console.log(error);
    }
  }

  async function takeIdSnap() {
    try {
      await consentDialog();
      const data = await RnSmileId.captureIDCard('id', null);
      console.log('Id card response');
      console.log(data);
    } catch (error) {
      console.log('Id card error');
      console.log(error);
    }
  }

  //   const logo = require('../../../../assets/images/moosbuicon.png');
  //   const logo = 'https://moosbu.com/wp-content/uploads/2020/09/moosbuwhite.png';

  //   const requestConsent = useCallback(async () => {
  //     try {
  //       const response = await RnSmileId.requestConsent(
  //         '',
  //         logo,
  //         'com.moosbu',
  //         '',
  //         'https://moosbu.com/',
  //       );
  //       console.log('Consent response');
  //       console.log(response);
  //     } catch (error) {
  //       console.log('Consent error');
  //       console.log(error);
  //     }
  //   }, [logo]);

  //   useEffect(() => {
  //     requestConsent();
  //   }, [requestConsent]);

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

        <Pressable style={styles.link} onPress={takeIdSnap}>
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
