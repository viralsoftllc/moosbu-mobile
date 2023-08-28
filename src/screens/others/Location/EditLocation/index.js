import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';
import EditLocationForm from './renderer/EditLocationForm';
import client from '../../../../shared/api/client';
import handleApiError from '../../../../shared/components/handleApiError';
import notifyMessage from '../../../../shared/hooks/notifyMessage';

export default function EditLocation({
  setShowEditForm,
  handleSuccessfulResponse,
  selectedItem,
}) {
  const [details, setDetails] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setDetails(selectedItem);
  }, [selectedItem]);

  async function updateLocation() {
    if (!details?.name) {
      return notifyMessage('Fill all fields');
    }

    setSubmitting(true);

    try {
      console.log('Update location');
      const res = await client.put(
        `/api/location/update/${selectedItem?.id}`,
        details,
      );
      console.log(res?.data);
      setSubmitting(false);
      setShowEditForm(false);

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
              <Text style={styles.title}>Edit location</Text>
            </View>

            <Pressable
              onPress={() => {
                setShowEditForm(false);
              }}
              style={styles.closeBtn}>
              <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
            </Pressable>
          </View>

          <EditLocationForm
            handleSuccessfulResponse={handleSuccessfulResponse}
            details={details}
            onSubmit={updateLocation}
            setDetails={setDetails}
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
