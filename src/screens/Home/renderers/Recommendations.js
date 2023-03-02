import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';

export default function Recommendations() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recommendations From Moosbu</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.cardImageWrapper}>
            <Image
              source={require('../../../assets/images/recom.png')}
              resizeMode="cover"
              style={styles.cardImage}
            />
          </View>

          <Text style={styles.cardTitle}>
            How to use Moosbu to to reach larger audience and turn your audience
            to customers
          </Text>

          <View style={styles.cardFooter}>
            <Text style={styles.date}>April 12</Text>
            <Text style={styles.cta}>Watch now</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardImageWrapper}>
            <Image
              source={require('../../../assets/images/recom2.png')}
              resizeMode="cover"
              style={styles.cardImage}
            />
          </View>

          <Text style={styles.cardTitle}>
            How to use Moosbu to to reach larger audience and turn your audience
            to customers
          </Text>

          <View style={styles.cardFooter}>
            <Text style={styles.date}>April 12</Text>
            <Text style={styles.cta}>Read article</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    width: verticalScale(163),
    // height: verticalScale(136),
    borderRadius: SIZES.radius / 2,
    borderColor: COLORS.borderGray,
    marginRight: SIZES.base,
  },
  cardFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.base / 2,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    color: COLORS.textPrimary,
    ...FONTS.medium,
    padding: SIZES.base / 2,
    fontWeight: '400',
  },
  cta: {
    color: COLORS.textSecondary,
    ...FONTS.medium,
    fontWeight: '500',
  },
  container: {
    marginBottom: SIZES.base * 10,
  },
  date: {
    color: COLORS.grayText,
    ...FONTS.tiny,
  },
  sectionTitle: {
    ...FONTS.h5,
    color: COLORS.textPrimary,
    marginBottom: SIZES.base * 1.2,
  },
  cardImageWrapper: {
    height: verticalScale(68),
  },
});
