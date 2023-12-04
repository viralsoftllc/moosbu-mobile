import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import {selectStoreDetails} from '../../../redux/slices/store/selectors';
import routes from '../../../shared/constants/routes';
import {selectTotalProducts} from '../../../redux/slices/businessOvervew/selectors';
import {selectUser} from '../../../redux/slices/user/selectors';

export default function MissingActions() {
  const {navigate} = useNavigation();
  const store = useSelector(selectStoreDetails);
  const totalProducts = useSelector(selectTotalProducts);
  const user = useSelector(selectUser);

  function handleNavigate() {
    navigate(routes.STORE_SETTINGS_STACK, {screen: routes.GENERAL_SETTINGS});
  }

  return (
    <>
      {store?.logo == 'logo.png' ||
      !store?.address ||
      totalProducts < 0 ||
      !user.customerID ? (
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Lets Get You Started</Text>

          {!store?.address ? (
            <Pressable style={styles.actionCard} onPress={handleNavigate}>
              <UseIcon
                type={'AntDesign'}
                name="warning"
                color={COLORS.pending}
              />

              <View style={styles.actionText}>
                <Text style={styles.title}>Add Your Store Address</Text>
                <Text style={styles.subtitle}>
                  Add your store address to be discovered by buyers
                </Text>
              </View>
            </Pressable>
          ) : null}

          {store?.logo == 'logo.png' ? (
            <Pressable style={styles.actionCard} onPress={handleNavigate}>
              <UseIcon
                type={'AntDesign'}
                name="warning"
                color={COLORS.pending}
              />

              <View style={styles.actionText}>
                <Text style={styles.title}>Upload An Image For Your Store</Text>
                <Text style={styles.subtitle}>
                  Let potential buyers recognize your physical store
                </Text>
              </View>
            </Pressable>
          ) : null}

          {store?.logo ? (
            <Pressable
              style={styles.actionCard}
              onPress={() =>
                navigate(routes.ENGAGEMNT_TAB, {screen: routes.SETTINGS_ID})
              }>
              <UseIcon
                type={'AntDesign'}
                name="warning"
                color={COLORS.pending}
              />

              <View style={styles.actionText}>
                <Text style={styles.title}>Setup Your Sender ID</Text>
                <Text style={styles.subtitle}>
                  Let your buyers know you are the one messaging them
                </Text>
              </View>
            </Pressable>
          ) : null}

          {totalProducts == 0 ? (
            <Pressable
              style={styles.actionCard}
              onPress={() =>
                navigate(routes.PRODUCTS_STACK, {screen: routes.NEW_PRODUCT})
              }>
              <UseIcon
                type={'AntDesign'}
                name="warning"
                color={COLORS.pending}
              />

              <View style={styles.actionText}>
                <Text style={styles.title}>Create Your First Product</Text>
                <Text style={styles.subtitle}>
                  Start accepting orders on your online store
                </Text>
              </View>
            </Pressable>
          ) : null}
          {!store?.accountID ? (
            <Pressable
              style={styles.actionCard}
              onPress={() => navigate(routes.WALLET)}>
              <UseIcon
                type={'AntDesign'}
                name="warning"
                color={COLORS.pending}
              />

              <View style={styles.actionText}>
                <Text style={styles.title}> Complete Your KYC</Text>
                <Text style={styles.subtitle}>
                  Do your KYC to unlock Moosbu’s full potential
                </Text>
              </View>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </>
  );
}

// Setup Sender ID (Let your buyers know you are the one messaging them)

//Create First Product (Start accepting orders on your online store)

//Pending KYC (Do your KYC to unlock Moosbu’s full potential)

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
