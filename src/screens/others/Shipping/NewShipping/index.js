import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';

import NewShippingForm from './renderer/NewShippingForm';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import handleApiError from '../../../../shared/components/handleApiError';
import client from '../../../../shared/api/client';

// let l = [
//   {
//     address: 'Surulere mainland, Lagos',
//     created_at: '2023-07-31T21:04:12.000000Z',
//     created_by: 164,
//     id: 23,
//     name: 'Surulere',
//     store_id: 173,
//     updated_at: '2023-08-06T20:40:31.000000Z',
//   },
//   {
//     address: 'Yaba location, mainland',
//     created_at: '2023-07-31T22:17:49.000000Z',
//     created_by: 164,
//     id: 24,
//     name: 'Yaba',
//     store_id: 173,
//     updated_at: '2023-07-31T22:17:49.000000Z',
//   },
//   {
//     address: 'Ajah lekki and co',
//     created_at: '2023-08-06T20:31:09.000000Z',
//     created_by: 164,
//     id: 25,
//     name: 'Island',
//     store_id: 173,
//     updated_at: '2023-08-06T20:31:09.000000Z',
//   },
// ];

export default function NewShipping({
  setShowNewForm,
  handleSuccessfulResponse,
}) {
  const [details, setDetails] = useState({});
  const [submitting, setSubmitting] = useState(false);

  async function createShipping() {
    if (!details?.name || !details?.price) {
      return notifyMessage('Fill all fields');
    }

    setSubmitting(true);

    try {
      console.log('Creating shipping');
      const res = await client.post('/api/shipping', details);
      console.log(res?.data);
      handleSuccessfulResponse();
    } catch (error) {
      setSubmitting(false);
      handleApiError(error);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.flex}>
            <View>
              <Text style={styles.title}>Add shipping</Text>
            </View>

            <Pressable
              onPress={() => {
                setShowNewForm(false);
              }}
              style={styles.closeBtn}>
              <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
            </Pressable>
          </View>

          <NewShippingForm
            handleSuccessfulResponse={handleSuccessfulResponse}
            details={details}
            setDetails={setDetails}
            onSubmit={createShipping}
            submitting={submitting}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: SIZES.base * 1.3,
  },
  title: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
  },
  subtitle: {
    ...FONTS.medium,
    color: COLORS.grayText,
  },
  closeBtn: {
    padding: SIZES.base,
  },
});
