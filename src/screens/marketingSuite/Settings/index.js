import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import routes from '../../../shared/constants/routes';
import LinkRow from '../../More/renderer/LinkRow';

export default function Settings() {
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}>
        <LinkRow
          title="SMS Sender ID"
          route={routes.SETTINGS_ID}
          iconName={'swap-vertical'}
          iconType="Ionicons"
        />
        <LinkRow
          iconName="payments"
          iconType="MaterialIcons"
          title="Marketing Tokens"
          onPress={() => navigate('TokenScreen')}
        />
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
