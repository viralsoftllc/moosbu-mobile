import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../assets/themes';
import ScreenHeader from '../../shared/components/ScreenHeader';

export default function Notifications() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Notifications'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.empty}>
        <Text style={styles.emptyText}>You do not have a notification yet</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.paddingHorizontal,
    backgroundColor: COLORS.white,
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyText: {
    ...FONTS.regular,
    color: COLORS.grayText,
  },
});
