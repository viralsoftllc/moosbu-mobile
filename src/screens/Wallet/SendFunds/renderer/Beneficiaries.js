import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function Beneficiaries() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved beneficiaries</Text>
        <Text style={styles.link}>View All</Text>
      </View>

      <View>
        <View style={styles.beneficiary}>
          <UseIcon
            type="Feather"
            name="arrow-up-right"
            color={COLORS.debit}
            size={17}
          />

          <View style={styles.details}>
            <Text style={styles.beneficiaryName}>JOOSHUA MOOSBU</Text>
            <Text style={styles.beneficiarySubtitle}>
              Moosbu Wallet/ 001122334455
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.base * 3,
  },
  title: {
    ...FONTS.h5,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  link: {
    color: COLORS.primary,
  },
  beneficiary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    marginLeft: SIZES.base * 2,
  },
  beneficiaryName: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontWeight: '600',
    marginBottom: SIZES.base / 2,
  },
  beneficiarySubtitle: {
    ...FONTS.medium,
    color: COLORS.grayText,
  },
  container: {
    marginTop: SIZES.base * 3,
  },
});
