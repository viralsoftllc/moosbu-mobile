import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import {selectStoreDetails} from '../../../redux/slices/store/selectors';
import routes from '../../../shared/constants/routes';

export default function MissingActions() {
  const {navigate} = useNavigation();
  const store = useSelector(selectStoreDetails);

  function handleNavigate() {
    navigate(routes.STORE_SETTINGS_STACK, {screen: routes.GENERAL_SETTINGS});
  }

  return (
    <>
      {!store?.logo && !store?.address ? (
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Missing Actions</Text>

          {!store?.address ? (
            <Pressable style={styles.actionCard} onPress={handleNavigate}>
              <UseIcon type={'AntDesign'} name="warning" color={COLORS.red} />

              <View style={styles.actionText}>
                <Text style={styles.title}>Missing Store Address</Text>
                <Text style={styles.subtitle}>
                  Add your store address to be discovered by buyers
                </Text>
              </View>
            </Pressable>
          ) : null}

          {!store?.logo ? (
            <Pressable style={styles.actionCard} onPress={handleNavigate}>
              <UseIcon type={'AntDesign'} name="warning" color={COLORS.red} />

              <View style={styles.actionText}>
                <Text style={styles.title}>Upload An Image For Your Store</Text>
                <Text style={styles.subtitle}>
                  Let potential buyers recognize your physical store
                </Text>
              </View>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </>
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
    ...FONTS.medium,
    marginBottom: SIZES.base / 5,
  },
});
