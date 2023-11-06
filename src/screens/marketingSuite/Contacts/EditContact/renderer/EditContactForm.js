import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import TextAreaInput from '../../../../../shared/components/TeaxtAreaInput';

export default function EditContactForm({
  setDetails,
  details,
  loading,
  handleUpdate,
}) {
  return (
    <View>
      <FormInput
        label={'Customer Name'}
        placeholder={'Enter customer’s name'}
        value={details?.name}
        onChangeText={text => setDetails({...details, name: text})}
      />

      <TextAreaInput
        label={'Customer Phone'}
        placeholder={'Enter customer’s phone number'}
        value={details?.number}
        onChangeText={text => setDetails({...details, number: text})}
        info={'Separate with "," for multiple numbers'}
      />

      {/* <TextAreaInput
        label={'Customer Email'}
        placeholder={'Enter customer’s email '}
        value={details?.emails}
        onChangeText={text => setDetails({...details, emails: text})}
        info={'Separate with "," for multiple emails'}
      /> */}

      {/* <View style={styles.flex}>
        <UseIcon
          type={'Ionicons'}
          name="alert-circle-outline"
          color={COLORS.pending}
        />
        <Text style={styles.selectText}>The fields below are optional</Text>
      </View> */}

      {/* <Text style={styles.label}>Customer Address</Text> */}

      {/* <View style={styles.optionalHeaderView}>
        <Text style={styles.billingHeader}>Billing Address</Text>

        <Pressable style={styles.optionalHeaderView}>
          <Text style={styles.shippingText}>Use as shipping address</Text>
          <UseIcon
            name="toggle-switch"
            type={'MaterialCommunityIcons'}
            color={COLORS.credit}
          />
        </Pressable>
      </View> */}

      {/* <FormInput placeholder={'Select country'} />
      <FormInput placeholder={'Select state'} />
      <FormInput placeholder={'Enter city'} />
      <FormInput
        placeholder={'Enter address'}
        multiline={true}
        numberOfLines={3}
      />
      <FormInput placeholder={'Zip code'} /> */}

      <FormButton
        title={'Save info'}
        onPress={handleUpdate}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base * 2,
  },
  selectText: {
    color: COLORS.pending,
    marginLeft: SIZES.base,
  },
  optionalHeaderView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.base / 2,
  },
  shippingText: {
    ...FONTS.tiny,
    marginRight: SIZES.base / 2,
  },
  label: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontWeight: '400',
    marginBottom: SIZES.base,
  },
  billingHeader: {
    color: COLORS.textPrimary,
    ...FONTS.medium,
    fontWeight: '400',
  },
});
