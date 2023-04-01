import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, SIZES} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import routes from '../../../shared/constants/routes';
import UseIcon from '../../../shared/utils/UseIcon';

export default function StoreSettings() {
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Store setting'} />,
    });
  }, [setOptions]);

  const s = {
    about: null,
    address: 'Happy Land Estate',
    city: 'Sangotedo',
    country: 'Nigeria',
    created_at: '2022-06-03T14:18:00.000000Z',
    created_by: 3,
    currency: '₦',
    currency_code: 'NGN',
    currency_symbol_position: 'pre',
    currency_symbol_space: 'without',
    decimal_number: 2,
    domains: null,
    email: 'jmfirima@gmail.com',
    enable_bank_transfer: 'on',
    enable_card_payment: 'on',
    enable_domain: 'off',
    enable_guest_checkout: 'on',
    enable_shipping: 'off',
    enable_storelink: 'on',
    enable_subdomain: 'off',
    enable_telegram: 'off',
    enable_ussd_payment: 'on',
    enable_whatsapp: 'on',
    facebook: '#',
    facebook_pixel: null,
    footer_note: null,
    google_analytic: null,
    id: 4,
    instagram: '#',
    invoice_logo: 'invoice_logo_4.png',
    is_active: 1,
    is_paypal_enabled: 'off',
    is_store_enabled: 1,
    is_stripe_enabled: 'off',
    is_twilio_enabled: null,
    item_variable:
      '{sku} : {quantity} x {product_name} - {variant_name} + {item_tax} = {item_total}',
    lang: 'en',
    logo: 'moosbu (1)_1654419562.png',
    mail_driver: null,
    mail_encryption: null,
    mail_from_address: null,
    mail_from_name: null,
    mail_host: null,
    mail_password: null,
    mail_port: null,
    mail_username: null,
    meta_data: null,
    meta_description: null,
    name: 'Jason Store',
    notification_number: null,
    payoutID: null,
    paypal_client_id: '',
    paypal_mode: 'sandbox',
    paypal_secret_key: '',
    phone_number: '',
    pin: null,
    slug: 'jason-store',
    state: 'Lagos',
    store_theme: 'style-card-body-dark-grey.css',
    storejs: null,
    stripe_key: '',
    stripe_secret: '',
    subdomain: null,
    tagline: 'You Quality Store',
    telegrambot: '',
    telegramchatid: '',
    twilio_from: null,
    twilio_sid: null,
    twilio_token: null,
    twitter: '#',
    updated_at: '2022-06-05T09:25:34.000000Z',
    uuid: '',
    whatsapp: '+2348104775719',
    whatsapp_number: '+2348104775719',
    youtube: '#',
    zipcode: '101233',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cards}>
        <Pressable
          style={styles.card}
          onPress={() => navigate(routes.GENERAL_SETTINGS)}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="shopping-outline"
            color={COLORS.secondary}
          />
          <Text style={styles.cardText}>Store Settings</Text>
        </Pressable>

        <Pressable
          style={[styles.card, styles.currency]}
          onPress={() => navigate(routes.CURRENCY_SETTINGS)}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="bank"
            color={COLORS.secondary}
          />
          <Text style={styles.cardText}>Currency Settings</Text>
        </Pressable>

        <Pressable style={[styles.card, styles.kyc]}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="card-account-details-outline"
            color={COLORS.secondary}
          />
          <Text style={styles.cardText}>KYC</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    height: verticalScale(120),
    borderRadius: SIZES.radius,
    width: '40%',
    margin: SIZES.base,
  },
  cardText: {
    color: COLORS.textPrimary,
    marginTop: SIZES.base / 2,
  },
  currency: {
    backgroundColor: '#F5F1DA',
  },
  kyc: {
    backgroundColor: '#E7FFF3',
  },
});
