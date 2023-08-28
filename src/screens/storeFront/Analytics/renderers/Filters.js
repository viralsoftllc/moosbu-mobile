import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';

export default function Filters({data}) {
  return (
    <View style={styles.filters}>
      {data.map((filt, i) => (
        <Pressable key={i} style={styles.filter}>
          <Text style={styles.label}>{filt.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  filter: {
    borderWidth: 1,
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
    marginRight: SIZES.base / 2,
    marginBottom: SIZES.base / 2,
    borderColor: '1px solid rgba(40, 40, 40, 0.5)',
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  label: {
    ...FONTS.tiny,
    color: COLORS.textPrimary,
    fontWeight: '300',
  },
});
