import React, {useState} from 'react';
import {Modal, View} from 'react-native';

import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import {useSelector} from 'react-redux';
import {selectLocations} from '../../../../../redux/slices/shipping/selectors';
import SelectModal from '../../../../../shared/components/SelectModal';
import SelectModalFormInput from '../../../../../shared/components/SelectModalFormInput';

export default function NewShippingForm({
  setDetails,
  details,
  submitting,
  onSubmit,
}) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const [showModal, setShowModal] = useState(false);
  const locations = useSelector(selectLocations);

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
        selectedItem={selectedLocation}
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
          selectedItem={selectedLocation}
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
