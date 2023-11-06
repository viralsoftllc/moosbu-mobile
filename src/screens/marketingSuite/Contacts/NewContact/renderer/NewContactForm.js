import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import SelectModalFormInput from '../../../../../shared/components/SelectModalFormInput';
import SelectModal from '../../../../../shared/components/SelectModal';
import TextAreaInput from '../../../../../shared/components/TeaxtAreaInput';
import {Checkbox} from 'react-native-paper';

export default function NewContactForm({
  setDetails,
  details,
  loading,
  handleCreate,
  fetchContacts,
  contactsFetchedFromApi,
  contactsPermission,
  setContactsPermission,
  policyChecked,
  setPolicyChecked,
}) {
  const [showContactGroup, setShowContactGroup] = useState(false);

  function showNumberAndEmailForm() {
    if (contactsFetchedFromApi) {
      return (
        <>
          <TextAreaInput
            label={'Phone Numbers'}
            placeholder={'Enter customer’s phone number'}
            // value={}
            onChangeText={text => {
              setDetails({...details, number: text, numbers: text});
            }}
            info={'Separate with "," for multiple numbers'}
          />

          <Text style={{...FONTS.regular}}>
            Total Phone Numbers: {details.numbers.split(',').length}
          </Text>

          {/* <TextAreaInput
            label={'Emails'}
            placeholder={'Enter customer’s email'}
            value={details?.emails}
            onChangeText={text => setDetails({...details, emails: text})}
            info={'Separate with "," for multiple emails'}
          /> */}
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
      <View
        style={{
          backgroundColor: COLORS.lightSecondaryBackground,
          padding: 20,
          borderRadius: 10,
          marginVertical: 50,
          gap: 10,
        }}>
        <Text style={{marginBottom: 10, ...FONTS.h5}}>DISCLAIMER</Text>
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'flex-start'}}>
          <Checkbox
            status={contactsPermission ? 'checked' : 'unchecked'}
            onPress={() => {
              setContactsPermission(!contactsPermission);
            }}
            color={COLORS.primary}
          />

          <Text style={{...FONTS.medium, width: '90%'}}>
            You agree that this contacts have given you permission to contact
            them
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'flex-start'}}>
          <Checkbox
            status={policyChecked ? 'checked' : 'unchecked'}
            onPress={() => {
              setPolicyChecked(!policyChecked);
            }}
            color={COLORS.primary}
          />
          <Text style={{...FONTS.medium, width: '90%'}}>
            You agree to adhere to moosbu privacy policy and terms of use
          </Text>
        </View>

        <Text
          style={{
            ...FONTS.medium,
            fontFamily: 'Lato-Bold',
            marginVertical: 10,
          }}>
          NOTE: Moosbu will never contact your contacts on your behalf
        </Text>
      </View>
      <FormButton
        title={'Create Contact Group'}
        onPress={handleCreate}
        loading={loading}
        containerStyle={{marginTop: 'auto'}}
      />

      <Modal visible={showContactGroup}>
        <SelectModal
          filteredItems={[
            {name: 'All Customers', value: 'all', id: 1},
            {name: 'By product category', value: 'price', id: 2},
            // {name: 'By product type', value: 'type', id: 3},
            {name: 'By price range', value: 'all', id: 3},
            {name: 'By date of purchase', value: 'date', id: 4},
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
