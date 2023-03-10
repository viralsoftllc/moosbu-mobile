import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import routes from '../../../shared/constants/routes';
import SettingsRow from './renderer/SettingsRow';

export default function Settings() {
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <SettingsRow onPress={() => navigate(routes.SETTINGS_ID)} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
});
