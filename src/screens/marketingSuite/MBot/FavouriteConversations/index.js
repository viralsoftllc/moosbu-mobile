import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import ConversationCard from '../renderer/ConversationCard';
import ComingSoon from '../../../../shared/components/ComingSoon';

export default function FavouriteConversations() {
  return (
    <View style={styles.container}>
      {/* <ComingSoon
        page={'M Bot'}
        iconType={'MaterialCommunityIcons'}
        iconName="robot"
      /> */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <ConversationCard />
        <ConversationCard />
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
