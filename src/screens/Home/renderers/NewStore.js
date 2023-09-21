import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';
import FormInput from '../../../shared/components/FormInput';
import client from '../../../shared/api/client';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import handleApiError from '../../../shared/components/handleApiError';
import ShortModal from '../../../shared/components/ShortModal';

export default function NewStore({
  setShowNewStoreModal,
  setShowStoresModal,
  setShowSuccessModal,
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  async function addNewStore() {
    if (!name) {
      return notifyMessage('Please provide name of store');
    }

    try {
      setLoading(true);

      await client.post('/api/add/store', {name});

      setLoading(false);
      setShowNewStoreModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }

  return (
    <ShortModal
      handleToggleShortModal={() => {
        setShowNewStoreModal(false);
        setShowStoresModal(true);
      }}
      title={'Create A New Store'}>
      <FormInput
        label={'Store name'}
        placeholder="Enter Store Name"
        onChangeText={text => setName(text)}
        value={name}
      />

      <View style={styles.buttons}>
        <FormButton
          title={'Save'}
          buttonStyle={styles.buttonStyle}
          onPress={addNewStore}
          loading={loading}
          disabled={loading}
        />

        <FormButton
          title={'Back'}
          buttonStyle={[styles.buttonStyle, styles.backButton]}
          textStyle={styles.textStyle}
          onPress={() => {
            setShowNewStoreModal(false);
            setShowStoresModal(true);
          }}
        />
      </View>
    </ShortModal>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: SIZES.base * 2,
  },
  buttonStyle: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: SIZES.base,
  },
  backButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  textStyle: {
    color: COLORS.primary,
  },
});
