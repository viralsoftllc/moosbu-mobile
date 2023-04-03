import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import DeleteItem from '../../../../shared/components/DeleteItem';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UseIcon from '../../../../shared/utils/UseIcon';
import {selectStoreDetails} from '../../../../redux/slices/store/selectors';

export default function GeneralSettings() {
  const {setOptions} = useNavigation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const store = useSelector(selectStoreDetails);
  // console.log(store);

  const [details, setDetails] = useState({});

  useEffect(() => {
    setDetails({
      name: store?.name || '',
      email: store?.email || '',
      about: store?.about || '',
      tagline: store?.tagline || '',
      // default language
      city: store?.city || '',
      country: store?.country || '',
      state: store?.state || '',
      address: store?.address || '',
      zipcode: store?.zipcode || '',
      // Decimal format
      enable_shipping: store?.enable_shipping || '',
      enable_guest_checkout: store?.enable_guest_checkout || '',
      google_analytic: store?.google_analytic || '',
      facebook_pixel: store?.facebook_pixel || '',
      storejs: store?.storejs || '',
      meta_data: store?.meta_data || '',
      meta_description: store?.meta_description || '',
      // email: store?.email || '',
      facebook: store?.facebook || '',
      whatsapp: store?.whatsapp || '',
      instagram: store?.instagram || '',
      twitter: store?.twitter || '',
      youtube: store?.youtube || '',
      footer_note: store?.footer_note || '',
    });
  }, [store]);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'General setting'} />,
    });
  }, [setOptions]);

  function handleDeleteItem() {
    setShowDeleteModal(true);
  }

  function handleEnableShipping() {
    if (details?.enable_shipping === 'off') {
      setDetails({...details, enable_shipping: 'on'});
    }

    if (details?.enable_shipping === 'on') {
      setDetails({...details, enable_shipping: 'off'});
    }
  }

  function handleEnableGuestCheckout() {
    if (details?.enable_guest_checkout === 'off') {
      setDetails({...details, enable_guest_checkout: 'on'});
    }

    if (details?.enable_guest_checkout === 'on') {
      setDetails({...details, enable_guest_checkout: 'off'});
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cards}>
          <Pressable style={styles.card}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="camera-outline"
              color={COLORS.borderGray}
            />
            <Text style={styles.cardText}>Add store logo</Text>
          </Pressable>

          <Pressable style={styles.card}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="camera-outline"
              color={COLORS.borderGray}
            />
            <Text style={styles.cardText}>Add invoice logo</Text>
          </Pressable>
        </View>

        <FormInput
          label={'Store Name'}
          placeholder="Enter Store Name"
          onChangeText={text => setDetails({...details, name: text})}
          value={details?.name}
        />

        <FormInput
          label={'Email'}
          placeholder="Enter Email"
          onChangeText={text => setDetails({...details, email: text})}
          value={details?.email}
          editable={false}
        />

        <View style={styles.formView}>
          <FormInput
            label={'Tag Line'}
            placeholder="Enter your Tag Line"
            style={[styles.smallForm, styles.leftFormInput]}
            onChangeText={text => setDetails({...details, tagline: text})}
            value={details?.tagline}
          />

          <FormInput
            label={'Store Default Language'}
            placeholder="Select Language"
            style={[styles.smallForm, styles.rightFormInput]}
          />
        </View>

        <Text style={styles.formlabel}>Store Address</Text>

        <FormInput
          placeholder="Enter Address"
          onChangeText={text => setDetails({...details, address: text})}
          value={details?.address}
        />

        <View style={styles.formView}>
          <FormInput
            label={'Country'}
            placeholder="Select your Country"
            style={[styles.smallForm, styles.leftFormInput]}
            onChangeText={text => setDetails({...details, country: text})}
            value={details?.country}
          />

          <FormInput
            label={'State'}
            placeholder="Select State"
            style={[styles.smallForm, styles.rightFormInput]}
            onChangeText={text => setDetails({...details, state: text})}
            value={details?.state}
          />
        </View>

        <FormInput
          placeholder="Enter city"
          onChangeText={text => setDetails({...details, city: text})}
          value={details?.city}
        />

        <View style={styles.formView}>
          <FormInput
            placeholder="Zip code"
            style={[styles.smallForm, styles.leftFormInput]}
            onChangeText={text => setDetails({...details, zipcode: text})}
            value={details?.zipcode}
          />

          <FormInput
            placeholder="Decimal No. Format"
            style={[styles.smallForm, styles.rightFormInput]}
          />
        </View>

        <Pressable
          style={[styles.formView, styles.addVariantBtn]}
          onPress={handleEnableShipping}>
          <UseIcon
            name={
              details?.enable_shipping === 'on'
                ? 'checkbox-marked'
                : 'checkbox-blank-outline'
            }
            type={'MaterialCommunityIcons'}
            color={COLORS.textSecondary}
          />

          <Text style={styles.addVariantText}>Shipping Method Enable</Text>
        </Pressable>

        <Pressable
          style={[styles.formView, styles.addVariantBtn]}
          onPress={handleEnableGuestCheckout}>
          <UseIcon
            name={
              details?.enable_guest_checkout === 'on'
                ? 'checkbox-marked'
                : 'checkbox-blank-outline'
            }
            type={'MaterialCommunityIcons'}
            color={COLORS.textSecondary}
          />

          <Text style={styles.addVariantText}>Guest Checkout Enable</Text>
        </Pressable>

        <View style={styles.formView}>
          <FormInput
            label={'Google Analytics'}
            placeholder="Enter Google Analytics"
            style={[styles.smallForm, styles.leftFormInput]}
            onChangeText={text =>
              setDetails({...details, google_analytic: text})
            }
            value={details?.google_analytic}
          />

          <FormInput
            label={'Facebook Pixel'}
            placeholder="Enter Facebook Pixel"
            style={[styles.smallForm, styles.rightFormInput]}
            onChangeText={text =>
              setDetails({...details, facebook_pixel: text})
            }
            value={details?.facebook_pixel}
          />
        </View>

        <FormInput
          label={'Store Custom JS'}
          placeholder="Store custom js"
          onChangeText={text => setDetails({...details, storejs: text})}
          value={details?.storejs}
        />

        <View style={styles.formView}>
          <FormInput
            label={'Meta Keywords'}
            placeholder="Enter Meta Keywords"
            style={[styles.smallForm, styles.leftFormInput]}
            onChangeText={text => setDetails({...details, meta_data: text})}
            value={details?.meta_data}
          />

          <FormInput
            label={'Meta Description'}
            placeholder="Enter Meta Description"
            style={[styles.smallForm, styles.rightFormInput]}
            onChangeText={text =>
              setDetails({...details, meta_description: text})
            }
            value={details?.meta_description}
          />
        </View>

        <Text style={styles.formlabel}>Footer Notes</Text>
        <Text style={styles.formSubtitle}>
          This details will be use to explore social media
        </Text>

        <View style={styles.formView}>
          <FormInput
            label={'Email'}
            labelIcon={
              <UseIcon type={'MaterialCommunityIcons'} name="email-outline" />
            }
            placeholder="Enter email"
            style={[styles.smallForm, styles.leftFormInput]}
            onChangeText={text => setDetails({...details, email: text})}
            value={details?.email}
            editable={false}
          />

          <FormInput
            labelIcon={
              <UseIcon type={'MaterialCommunityIcons'} name="whatsapp" />
            }
            label={'Whatsapp'}
            placeholder="Enter Whatsapp"
            style={[styles.smallForm, styles.rightFormInput]}
            onChangeText={text => setDetails({...details, whatsapp: text})}
            value={details?.whatsapp}
          />
        </View>

        <View style={styles.formView}>
          <FormInput
            label={'Facebook'}
            labelIcon={
              <UseIcon type={'MaterialCommunityIcons'} name="facebook" />
            }
            placeholder="Enter Facebook"
            style={[styles.smallForm, styles.leftFormInput]}
            onChangeText={text => setDetails({...details, facebook: text})}
            value={details?.facebook}
          />

          <FormInput
            labelIcon={
              <UseIcon type={'MaterialCommunityIcons'} name="instagram" />
            }
            label={'Instagram'}
            placeholder="Enter Instagram"
            style={[styles.smallForm, styles.rightFormInput]}
            onChangeText={text => setDetails({...details, instagram: text})}
            value={details?.instagram}
          />
        </View>

        <View style={styles.formView}>
          <FormInput
            label={'Twitter'}
            labelIcon={
              <UseIcon type={'MaterialCommunityIcons'} name="twitter" />
            }
            placeholder="Enter Twitter"
            style={[styles.smallForm, styles.leftFormInput]}
            onChangeText={text => setDetails({...details, twitter: text})}
            value={details?.twitter}
          />

          <FormInput
            labelIcon={
              <UseIcon type={'MaterialCommunityIcons'} name="youtube" />
            }
            label={'Youtube'}
            placeholder="Enter Youtube"
            style={[styles.smallForm, styles.rightFormInput]}
            onChangeText={text => setDetails({...details, youtube: text})}
            value={details?.youtube}
          />
        </View>

        <FormInput
          label={'Footer Note'}
          placeholder="Enter Footer Note"
          onChangeText={text => setDetails({...details, footer_note: text})}
          value={details?.footer_note}
        />

        <FormButton title={'Save Changes'} />

        <FormButton
          title={'Delete Store'}
          buttonStyle={styles.logoutButtonStyle}
          textStyle={styles.textStyle}
          onPress={handleDeleteItem}
        />
      </ScrollView>

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <DeleteItem setShowDeleteModal={setShowDeleteModal} title={'store'} />
      </Modal>
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
    height: verticalScale(120),
    borderRadius: SIZES.radius,
    width: '40%',
    margin: SIZES.base,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  cardText: {
    color: COLORS.borderGray,
    marginTop: SIZES.base / 2,
  },
  formView: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  smallForm: {
    width: '45%',
    flex: 1,
  },
  rightFormInput: {
    marginLeft: SIZES.base / 2,
  },
  leftFormInput: {
    marginRight: SIZES.base / 2,
  },
  addVariantBtn: {
    marginBottom: SIZES.base * 2,
  },
  formlabel: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontWeight: '400',
    marginBottom: SIZES.base,
  },
  formSubtitle: {
    color: COLORS.grayText,
    ...FONTS.medium,
    marginBottom: SIZES.base,
  },
  addVariantText: {
    color: COLORS.textPrimary,
    marginLeft: SIZES.base,
    ...FONTS.regular,
  },
  logoutButtonStyle: {
    backgroundColor: COLORS.white,
    marginTop: SIZES.base * 2,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginBottom: SIZES.base * 5,
  },
  textStyle: {
    color: COLORS.primary,
  },
});
