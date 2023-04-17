import React, {useState} from 'react';
import {View} from 'react-native';

import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import {useSelector} from 'react-redux';
import {selectLocations} from '../../../../../redux/slices/shipping/selectors';
import SelectInput from '../../../../../shared/components/SelectInput';
import UseIcon from '../../../../../shared/utils/UseIcon';

export default function NewShippingForm({
  handleSuccessfulResponse,
  setDetails,
  details,
  submitting,
  onSubmit,
}) {
  const [selectedLocation, setSelectedLocation] = useState({});
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

      <SelectInput
        label={'Shipping Location'}
        placeholder={'Select location'}
        options={locations}
        onChange={option => {
          setSelectedLocation(option);
          setDetails({...details, location: option?.name});
          // setAccount({...account, bank_code: option?.code});
        }}
        rightIcon={<UseIcon name="down" type={'AntDesign'} />}
        keyExtractor={item => item.id}
        labelExtractor={item => item.name}
        value={selectedLocation?.name}
      />

      <FormButton
        title={'Save Changes'}
        onPress={onSubmit}
        loading={submitting}
      />
    </View>
  );
}
