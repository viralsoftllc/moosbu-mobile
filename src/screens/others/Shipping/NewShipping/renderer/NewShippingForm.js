import React, {useState} from 'react';
import {Modal, View, Text, TextInput, StyleSheet} from 'react-native';

import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import {useSelector} from 'react-redux';
import {selectLocations} from '../../../../../redux/slices/shipping/selectors';
import SelectModal from '../../../../../shared/components/SelectModal';
import SelectModalFormInput from '../../../../../shared/components/SelectModalFormInput';

import {COLORS, FONTS} from '../../../../../assets/themes';
import {MultiSelect} from 'react-native-element-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';

export default function NewShippingForm({
  setDetails,
  details,
  submitting,
  onSubmit,
}) {
  // const [selectedLocations, setSelectedLocations] = useState({});
  const [selectedLocation, setSelectedLocation] = useState({});
  const [showModal, setShowModal] = useState(false);
  const locations = useSelector(selectLocations);

  const formattedLocations = locations.map(x => {
    return {label: x.name, value: x.name};
  });

  const [selected, setSelected] = useState([]);

  function handleSelect(option) {
    setSelectedLocation(option);
    setDetails({...details, location: option?.name});
    setShowModal(false);
  }

  const numberFormatter = value => {
    // console.log('1  ' + value + '  ' + typeof value); // Standard input from the textbox
    if (value == null || value.length === 0) return value; // No crash when empty textbox
    value = value.replaceAll('.', '').replaceAll(',', ''); // Remove garbage so we can make a number
    // console.log('2  ' + value + '  ' + typeof value);
    value = parseInt(value, 10); // toLocaleString needs a Number
    // console.log('3  ' + value + '  ' + typeof value);
    if (isNaN(value)) return 0; // Cant make a number then 0
    // console.log(typeof value);
    return value?.toLocaleString('en-US'); // Cast number to US locale
  };

  return (
    <View>
      <FormInput
        label={'Shipping Title'}
        placeholder={'Shipping Title'}
        onChangeText={text => setDetails({...details, name: text})}
        value={details?.name}
      />

      {/* <FormInput
        label={'Shipping Price'}
        placeholder={'Enter shipping price'}
        onChangeText={text => setDetails({...details, price: text})}
        value={details?.price}
      /> */}

      <View style={{gap: 10, marginBottom: 15}}>
        <Text style={{...FONTS.regular, color: COLORS.label}}>
          Shipping Price
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            marginTop: 3,
            borderRadius: 5,
            gap: 5,
            padding: 3,
            paddingLeft: 10,
            borderColor: COLORS.borderGray,
            height: 60,
          }}>
          <Text style={{fontWeight: '300', fontSize: 20}}>{'\u20A6'}</Text>
          <TextInput
            style={{width: '90%', ...FONTS.regular}}
            onChangeText={text =>
              setDetails({...details, price: numberFormatter(text)})
            }
            inputMode="numeric"
            placeholder="Enter shipping price"
            placeholderTextColor={COLORS.textGray}
            value={details?.price}
          />
        </View>
      </View>

      {/* <MultiSelect
        data={locations}
        placeholder="Choose Shipping Location"
        placeholderStyle={{...FONTS.regular, color: COLORS.grayText}}
      /> */}

      <View style={{gap: 15, marginBottom: 100, marginTop: 30}}>
        <Text style={FONTS.regular}>Shipping Location</Text>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          data={formattedLocations}
          labelField="label"
          valueField="value"
          placeholder="Choose Shipping Location"
          searchPlaceholder="Search..."
          value={selected}
          onChange={item => {
            setSelected(prev => item);
            setDetails({...details, location: [...item]});
          }}
          itemTextStyle={{...FONTS.regular}}
          activeColor={COLORS.borderGray}
          renderLeftIcon={() => (
            <Entypo
              style={styles.icon}
              color={COLORS.primary}
              name="location"
              size={20}
            />
          )}
          selectedStyle={styles.selectedStyle}
        />
      </View>

      {/* <SelectModalFormInput
        label={'Shipping Location'}
        placeholder={'Choose Shipping Location'}
        selectedItem={selectedLocation}
        setShowModal={setShowModal}
      /> */}

      <FormButton
        title={'Save Changes'}
        onPress={onSubmit}
        loading={submitting}
      />

      {/* <Modal visible={showModal}>
        <SelectModal
          filteredItems={locations}
          title={'Choose Location'}
          setShowModal={setShowModal}
          selectedItem={selectedLocation}
          handleSelect={handleSelect}
        />
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 60,
    backgroundColor: 'transparent',
    borderColor: COLORS.borderGray,
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
  },
  placeholderStyle: {
    ...FONTS.regular,
    color: COLORS.grayText,
  },
  selectedTextStyle: {
    ...FONTS.medium,
    fontFamily: 'Lato-Bold',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    ...FONTS.regular,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 5,
    gap: 10,
    marginTop: 10,
  },
});
