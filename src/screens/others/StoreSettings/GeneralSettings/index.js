import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
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
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import DeleteItem from '../../../../shared/components/DeleteItem';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function GeneralSettings() {
  const {setOptions} = useNavigation();
  const [enableShipping, setEnableShipping] = useState(false);
  const [enableGuestCheckout, setEnableGuestCheckout] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'General setting'} />,
    });
  }, [setOptions]);

  function handleDeleteItem() {
    setShowDeleteModal(true);
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

        <FormInput label={'Store Name'} placeholder="Enter Store Name" />
        <FormInput label={'Email'} placeholder="Enter Email" />

        <View style={styles.formView}>
          <FormInput
            label={'Tag Line'}
            placeholder="Enter your Tag Line"
            style={[styles.smallForm, styles.leftFormInput]}
          />

          <FormInput
            label={'Store Default Language'}
            placeholder="Select Language"
            style={[styles.smallForm, styles.rightFormInput]}
          />
        </View>

        <Text style={styles.formlabel}>Store Address</Text>

        <FormInput placeholder="Enter city" />

        <View style={styles.formView}>
          <FormInput
            label={'Country'}
            placeholder="Select your Country"
            style={[styles.smallForm, styles.leftFormInput]}
          />

          <FormInput
            label={'State'}
            placeholder="Select State"
            style={[styles.smallForm, styles.rightFormInput]}
          />
        </View>

        <FormInput placeholder="Enter address" />

        <View style={styles.formView}>
          <FormInput
            placeholder="Zip code"
            style={[styles.smallForm, styles.leftFormInput]}
          />

          <FormInput
            placeholder="Decimal No. Format"
            style={[styles.smallForm, styles.rightFormInput]}
          />
        </View>

        <Pressable
          style={[styles.formView, styles.addVariantBtn]}
          onPress={() => setEnableShipping(!enableShipping)}>
          <UseIcon
            name={enableShipping ? 'checkbox-marked' : 'checkbox-blank-outline'}
            type={'MaterialCommunityIcons'}
            color={COLORS.textSecondary}
          />

          <Text style={styles.addVariantText}>Shipping Method Enable</Text>
        </Pressable>

        <Pressable
          style={[styles.formView, styles.addVariantBtn]}
          onPress={() => setEnableGuestCheckout(!enableGuestCheckout)}>
          <UseIcon
            name={
              enableGuestCheckout ? 'checkbox-marked' : 'checkbox-blank-outline'
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
          />

          <FormInput
            label={'Facebook Pixel'}
            placeholder="Enter Facebook Pixel"
            style={[styles.smallForm, styles.rightFormInput]}
          />
        </View>

        <FormInput label={'Store Custom JS'} placeholder="About" />

        <View style={styles.formView}>
          <FormInput
            label={'Meta Keywords'}
            placeholder="Enter Meta Keywords"
            style={[styles.smallForm, styles.leftFormInput]}
          />

          <FormInput
            label={'Meta Description'}
            placeholder="Enter Meta Description"
            style={[styles.smallForm, styles.rightFormInput]}
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
          />

          <FormInput
            labelIcon={
              <UseIcon type={'MaterialCommunityIcons'} name="whatsapp" />
            }
            label={'Whatsapp'}
            placeholder="Enter Whatsapp"
            style={[styles.smallForm, styles.rightFormInput]}
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
          />

          <FormInput
            labelIcon={
              <UseIcon type={'MaterialCommunityIcons'} name="instagram" />
            }
            label={'Instagram'}
            placeholder="Enter Instagram"
            style={[styles.smallForm, styles.rightFormInput]}
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
          />

          <FormInput
            labelIcon={
              <UseIcon type={'MaterialCommunityIcons'} name="youtube" />
            }
            label={'Youtube'}
            placeholder="Enter Youtube"
            style={[styles.smallForm, styles.rightFormInput]}
          />
        </View>

        <FormInput label={'Footer Note'} placeholder="Enter Footer Note" />

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
