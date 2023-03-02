import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';

export default function MissingActions() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Missing Actions</Text>

      <View style={styles.actionCard}>
        <UseIcon type={'AntDesign'} name="warning" color={COLORS.red} />

        <View style={styles.actionText}>
          <Text style={styles.title}>Missing Store Address</Text>
          <Text style={styles.subtitle}>
            Add your store address to be discovered by buyers
          </Text>
        </View>
      </View>

      <View style={styles.actionCard}>
        <UseIcon type={'AntDesign'} name="warning" color={COLORS.red} />

        <View style={styles.actionText}>
          <Text style={styles.title}>Upload An Image For Your Store</Text>
          <Text style={styles.subtitle}>
            Let potential buyers recognize your physical store
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  actionCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.base * 1.3,
    paddingVertical: SIZES.base / 1.3,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius / 2,
    marginBottom: SIZES.base,
  },
  actionText: {
    marginLeft: SIZES.base,
  },
  container: {
    marginBottom: SIZES.base * 1.5,
  },
  sectionTitle: {
    ...FONTS.h5,
    color: COLORS.textPrimary,
    marginBottom: SIZES.base * 1.2,
  },
  subtitle: {
    color: COLORS.grayText,
    ...FONTS.tiny,
  },
  title: {
    color: COLORS.white,
    ...FONTS.regular,
    marginBottom: SIZES.base / 5,
  },
});
