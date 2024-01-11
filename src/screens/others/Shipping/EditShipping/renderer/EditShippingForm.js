import React, {useEffect, useState} from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {FONTS, COLORS} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import {selectLocations} from '../../../../../redux/slices/shipping/selectors';
import SelectModal from '../../../../../shared/components/SelectModal';
import SelectModalFormInput from '../../../../../shared/components/SelectModalFormInput';
import {MultiSelect} from 'react-native-element-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';

export default function EditShippingForm({
  setDetails,
  details,
  submitting,
  onSubmit,
}) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const [showModal, setShowModal] = useState(false);
  const locations = useSelector(selectLocations);

  const [selected, setSelected] = useState([]);

  const formattedLocations = locations.map(x => {
    return {label: x.name, value: x.name};
  });

  useEffect(() => {
    if (!selectedLocation?.name && details?.location) {
      const found = locations?.filter(el => el?.name === details?.location);

      setSelectedLocation(found?.[0]);
    }
  }, [details, selectedLocation, locations]);

  return (
    <View>
      <FormInput
        label={'Shipping Title'}
        placeholder={'Shipping Title'}
        onChangeText={text => setDetails({...details, name: text})}
        value={details?.name}
      />

      <FormInput
        label={'Shipping Price'}
        placeholder={'Enter shipping price'}
        onChangeText={text => setDetails({...details, price: text})}
        value={details?.price}
      />

      <View style={{gap: 15, marginBottom: 50}}>
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
        selectedItem={selectedLocation || details?.location}
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
          selectedItem={selectedLocation || details?.location}
          handleSelect={option => {
            setSelectedLocation(option);
            setDetails({...details, location: option?.name});
            setShowModal(false);
          }}
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
  selectedStyle: {
    borderRadius: 5,
    gap: 10,
    marginTop: 10,
  },
});
