import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import notifyMessage from '../../../../../shared/hooks/notifyMessage';
import {kMaxLength} from 'buffer';
import handleApiError from '../../../../../shared/components/handleApiError';
import client from '../../../../../shared/api/client';

export default function NewSmsRequestForm({handleSuccessfulResponse}) {
  const [loading, setLoading] = useState(false);

  const [senderID, setSenderID] = useState('');
  const [company, setCompany] = useState('');
  const [useCase, setUseCase] = useState('');

  const handleNewRequest = async () => {
    console.log(senderID);
    if (!senderID || !company || !useCase) {
      return notifyMessage('All fields are required!');
    }

    const options = {
      name: company,
      sender_id: senderID,
      company: company,
      usecase: useCase,
    };
    setLoading(true);
    console.log(options);

    try {
      const {data} = await client.post('/api/request_senderID', options);

      console.log(data);
      handleSuccessfulResponse();

      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  };

  return (
    <View style={styles.container}>
      <FormInput
        label={'Sender ID for SMS'}
        placeholder="Make sure ID is not more than 11 character"
        onChangeText={text => setSenderID(text)}
        maxLength={11}
      />
      <FormInput
        label={'Company'}
        placeholder="E.g Moosu"
        onChangeText={text => setCompany(text)}
      />
      <FormInput
        label={'Use Case'}
        placeholder="It is a sample of message you will send with Moosbu"
        multiline={5}
        onChangeText={text => setUseCase(text)}
      />

      <FormButton title={'Save'} onPress={handleNewRequest} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: SIZES.base * 2,
  },
});
