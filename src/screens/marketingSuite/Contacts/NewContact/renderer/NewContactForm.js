import React, {useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import SelectModalFormInput from '../../../../../shared/components/SelectModalFormInput';
import SelectModal from '../../../../../shared/components/SelectModal';
import TextAreaInput from '../../../../../shared/components/TeaxtAreaInput';

export default function NewContactForm({
  setDetails,
  details,
  loading,
  handleCreate,
  fetchContacts,
  contactsFetchedFromApi,
}) {
  const [showContactGroup, setShowContactGroup] = useState(false);

  function showNumberAndEmailForm() {
    if (contactsFetchedFromApi) {
      return (
        <>
          <TextAreaInput
            label={'Phone Numbers'}
            placeholder={'Enter customer’s phone number'}
            value={details?.numbers}
            onChangeText={text => setDetails({...details, numbers: text})}
            info={'Separate with "," for multiple numbers'}
          />

          <TextAreaInput
            label={'Emails'}
            placeholder={'Enter customer’s email'}
            value={details?.emails}
            onChangeText={text => setDetails({...details, emails: text})}
            info={'Separate with "," for multiple emails'}
          />
        </>
      );
    } else {
      return null;
    }
  }

  return (
    <View style={{flex: 1}}>
      <FormInput
        label={'Group Name'}
        placeholder={'Enter group name'}
        value={details?.name}
        onChangeText={text => setDetails({...details, name: text})}
      />

      <SelectModalFormInput
        label={'Contact Group'}
        placeholder={'Choose Contact Group'}
        setShowModal={setShowContactGroup}
        selectedItem={details?.type}
      />

      {showNumberAndEmailForm()}

      {/* <TextAreaInput
        label={'Phone Numbers'}
        placeholder={'Enter customer’s phone number'}
        value={details?.number}
        onChangeText={text => setDetails({...details, number: text})}
        info={'Separate with "," for multiple numbers'}
      />

      <TextAreaInput
        label={'Emails'}
        placeholder={'Enter customer’s email'}
        value={details?.emails}
        onChangeText={text => setDetails({...details, emails: text})}
        info={'Separate with "," for multiple emails'}
      /> */}

      {/* <FormInput
        label={'Customer Phone'}
        placeholder={'Enter customer’s phone number'}
        value={details?.number}
        onChangeText={text => setDetails({...details, number: text})}
      /> */}

      {/* <FormInput
        label={'Customer Email'}
        placeholder={'Enter customer’s email '}
        value={details?.emails}
        onChangeText={text => setDetails({...details, emails: text})}
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
        onPress={handleCreate}
        loading={loading}
        containerStyle={{marginTop: 'auto'}}
      />

      <Modal visible={showContactGroup}>
        <SelectModal
          filteredItems={[
            {name: 'All Customers', value: 'all', id: 1},
            {name: 'By product category', value: 'price', id: 2},
            {name: 'By product type', value: 'type', id: 3},
            {name: 'By price range', value: 'all', id: 4},
            {name: 'By date of purchase', value: 'date', id: 5},
          ]}
          title={'Choose Contact Group'}
          setShowModal={setShowContactGroup}
          selectedItem={details?.type}
          handleSelect={option => {
            setDetails({...details, type: option});
            setShowContactGroup(false);
            fetchContacts(option?.value);
          }}
        />
      </Modal>
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
