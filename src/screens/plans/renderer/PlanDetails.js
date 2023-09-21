import React from 'react';

import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import UseIcon from '../../../shared/utils/UseIcon';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import PlanCard from './PlanCard';

export default function PlanDetails({
  handleToggleDetails,
  title,
  features,
  price,
  isPaid,
  businessScale,
}) {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.flex}>
            <Text style={styles.title}>{title}</Text>

            <Pressable onPress={handleToggleDetails} style={styles.closeBtn}>
              <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
            </Pressable>
          </View>

          <PlanCard
            benefits={features}
            price={price}
            isPaid={isPaid}
            title={title}
            businessScale={businessScale}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base,
    paddingBottom: SIZES.base * 2,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: SIZES.base * 1.3,
  },
  title: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
  },
  closeBtn: {
    padding: SIZES.base,
  },
});
