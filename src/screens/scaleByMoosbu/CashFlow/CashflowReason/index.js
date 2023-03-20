import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import routes from '../../../../shared/constants/routes';
import UseIcon from '../../../../shared/utils/UseIcon';

const ratings = [
  {text: 'Advertising & promotion'},
  {text: 'Bill payment/ supplier payment'},
  {text: 'Cash flow'},
  {text: 'Equipment'},
  {text: 'Hiring'},
  {text: 'Sourcing/inventory'},
  {text: 'Expansion/Relocation'},
  {text: 'Rent payments'},
  {text: 'Renovation'},
  {text: 'Tax payments'},
  {text: 'Training & development'},
];

export default function CashflowReason() {
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <ScreenHeader title={'What is the cash flow advance for?'} />
      ),
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {ratings?.map((rating, i) => (
          <Pressable
            style={styles.rating}
            key={i}
            onPress={() => navigate(routes.PERSONAL_INFORMATION)}>
            <View style={styles.ratingIcon}>
              <UseIcon
                type={'MaterialCommunityIcons'}
                name="calendar-blank-outline"
                color={'rgb(118, 163, 224)'}
              />
            </View>

            <Text style={styles.ratingText}>{rating.text}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingBottom: SIZES.base,
    paddingTop: SIZES.base * 2,
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: SIZES.base * 1.5,
    borderColor: COLORS.borderGray,
    marginBottom: SIZES.base * 2,
  },
  ratingIcon: {
    padding: SIZES.base * 1.4,
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    borderRadius: 100,
    marginRight: SIZES.base * 1.5,
  },
  ratingText: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
  },
});
