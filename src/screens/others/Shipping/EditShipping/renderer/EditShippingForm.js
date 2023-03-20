import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import UseIcon from '../../../../../shared/utils/UseIcon';

export default function EditShippingForm({handleSuccessfulResponse}) {
  return (
    <View>
      <FormInput label={'Shipping Title'} placeholder={'Shipping Title'} />

      <FormInput
        label={'Shipping description'}
        placeholder={'Enter Shipping description'}
      />

      <FormInput label={'Delivery Time'} placeholder={'Enter Delivery Time'} />

      <View style={styles.charges}>
        <UseIcon
          name="check-box"
          type={'MaterialIcons'}
          color={COLORS.textSecondary}
        />
        <Text style={styles.chargesText}>Delivery Charges</Text>
      </View>

      <FormInput label={'Price'} placeholder={'Price per order'} />

      <FormButton title={'Save Changes'} onPress={handleSuccessfulResponse} />
    </View>
  );
}

const styles = StyleSheet.create({
  charges: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: SIZES.base * 2,
  },
  chargesText: {
    color: COLORS.textSecondary,
    marginLeft: SIZES.base / 2,
    ...FONTS.regular,
  },
});
