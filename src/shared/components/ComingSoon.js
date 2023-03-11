import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../assets/themes';
import UseIcon from '../utils/UseIcon';
import ScreenHeader from './ScreenHeader';

export default function ComingSoon({page, iconType, iconName}) {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.iconView}>
          <UseIcon
            type={iconType}
            name={iconName}
            size={verticalScale(60)}
            color={COLORS.secondary}
          />
        </View>

        <Text style={styles.text}>
          Our <Text style={styles.highlight}>{page}</Text> page will be{' '}
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
