import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
import AppButton from '../../../../../shared/components/AppButton';
import ImageIcon from '../../../../../shared/components/ImageIcon';
import routes from '../../../../../shared/constants/routes';

export default function TemplateCard() {
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imageIconView}>
        <ImageIcon
          imageUrl={require('../../../../../assets/images/moosbuicon.png')}
          size={verticalScale(20)}
          rounded
          style={styles.imageIcon}
        />
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>Birthday Message</Text>
        <Text style={styles.subtitle}>
          Helps you write a short yet very captivating birthday message.
        </Text>
      </View>

      <View style={styles.statusView}>
        <AppButton
          title={'Start'}
          buttonStyle={styles.buttonStyle}
          onPress={() => navigate(routes.M_BOT)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageIconView: {
    borderRadius: 100,
    backgroundColor: '#A3C7F7',
    width: verticalScale(40),
    height: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    margin: 0,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base * 1.5,
    marginBottom: SIZES.base * 2,
  },
  details: {
    flex: 1,
    marginHorizontal: SIZES.base,
  },
  title: {
    color: COLORS.textPrimary,
    ...FONTS.h6,
    marginBottom: SIZES.base / 2,
  },
  subtitle: {
    ...FONTS.medium,
    color: COLORS.grayText,
  },
  status: {
    ...FONTS.medium,
    color: COLORS.credit,
    marginBottom: SIZES.base * 1.2,
  },
  statusView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  favIcon: {
    paddingHorizontal: SIZES.base,
  },
  buttonStyle: {
    backgroundColor: COLORS.primaryBackground,
    borderWidth: 0,
  },
});
