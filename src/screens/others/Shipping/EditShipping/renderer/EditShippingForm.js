import React, {useEffect, useState} from 'react';
import {Modal, View} from 'react-native';
import {useSelector} from 'react-redux';

import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import {selectLocations} from '../../../../../redux/slices/shipping/selectors';
import SelectModal from '../../../../../shared/components/SelectModal';
import SelectModalFormInput from '../../../../../shared/components/SelectModalFormInput';

export default function EditShippingForm({
  setDetails,
  details,
  submitting,
  onSubmit,
}) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const [showModal, setShowModal] = useState(false);
  const locations = useSelector(selectLocations);

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

      <SelectModalFormInput
        label={'Shipping Location'}
        placeholder={'Choose Shipping Location'}
        selectedItem={selectedLocation || details?.location}
        setShowModal={setShowModal}
      />

      <FormButton
        title={'Save Changes'}
        onPress={onSubmit}
        loading={submitting}
      />

      <Modal visible={showModal}>
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
      </Modal>
    </View>
  );
}
