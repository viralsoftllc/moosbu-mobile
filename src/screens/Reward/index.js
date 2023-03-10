import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../assets/themes';
import UseIcon from '../../shared/utils/UseIcon';

export default function Reward() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.iconView}>
          <UseIcon
            name="gift-outline"
            type={'Ionicons'}
            size={verticalScale(60)}
            color={COLORS.secondary}
          />
        </View>

        <Text style={styles.text}>
          Our <Text style={styles.highlight}>reward</Text> page will be{' '}
          <Text style={styles.highlight}>launched soon</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconView: {
    alignSelf: 'center',
    height: verticalScale(104),
    width: verticalScale(104),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    borderRadius: 100,
    marginBottom: SIZES.base * 3,
  },
  text: {
    ...FONTS.large,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    paddingHorizontal: SIZES.base * 5,
    textAlign: 'center',
  },
  highlight: {
    color: COLORS.primary,
  },
});
