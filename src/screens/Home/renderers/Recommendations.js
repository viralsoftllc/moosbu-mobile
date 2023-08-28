import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../shared/constants/routes';

export default function Recommendations() {
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recommendations From Moosbu</Text>

      <View style={styles.cards}>
        <Pressable
          onPress={() => navigate(routes.JOIN_COMMUNITY)}
          style={[styles.card, styles.community]}>
          <View style={styles.iconView}>
            <UseIcon
              type={'Ionicons'}
              name="people-outline"
              size={scale(20)}
              color={COLORS.black}
            />
          </View>

          <Text style={styles.text}>Join</Text>
          <Text style={styles.text}>Community</Text>
        </Pressable>

        <Pressable
          onPress={() => navigate(routes.CONTACT_SUPPORT)}
          style={[styles.card, styles.contact]}>
          <View style={styles.iconView}>
            <UseIcon
              type={'AntDesign'}
              name="customerservice"
              size={scale(20)}
              color={COLORS.black}
            />
          </View>

          <Text style={styles.text}>Contact</Text>
          <Text style={styles.text}>Support</Text>
        </Pressable>

        <Pressable
          onPress={() => navigate(routes.MEDIA_RESOURCES)}
          style={[styles.card, styles.media]}>
          <View style={styles.iconView}>
            <UseIcon
              type={'AntDesign'}
              name="profile"
              size={scale(20)}
              color={COLORS.black}
            />
          </View>

          <Text style={styles.text}>Media</Text>
          <Text style={styles.text}>Resources</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.base * 5,
  },
  sectionTitle: {
    ...FONTS.h5,
    color: COLORS.textPrimary,
    marginBottom: SIZES.base * 1.2,
  },
  cards: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  card: {
    backgroundColor: COLORS.primary,
    width: '31%',
    paddingVertical: SIZES.base,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
  },
  text: {
    color: COLORS.black,
    ...FONTS.medium,
    fontWeight: '400',
  },
  icon: {
    // marginBottom: SIZES.base,
  },
  iconView: {
    marginBottom: SIZES.base * 1.2,
    width: '40%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(40),
    borderRadius: SIZES.radius / 2,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
  },
  community: {
    backgroundColor: '#DAF5E8',
  },
  contact: {
    backgroundColor: '#CCDAED',
  },
  media: {
    backgroundColor: '#EEEFF9',
  },
});
