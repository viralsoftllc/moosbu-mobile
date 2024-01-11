import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import client from '../../../../shared/api/client';
import handleApiError from '../../../../shared/components/handleApiError';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import UseIcon from '../../../../shared/utils/UseIcon';
import NewCouponForm from './renderer/NewCouponForm';

export default function NewCoupon({
  setShowNewCouponForm,
  handleSuccessfulResponse,
}) {
  const [details, setDetails] = useState({enable_flat: false});
  const [submitting, setSubmitting] = useState(false);

  async function createCoupon() {
    if (!details?.name || !details?.discount || !details?.limit) {
      notifyMessage('Please input all fields');
    }

    try {
      console.log('Creating coupon...');
      setSubmitting(true);

      const res = await client.post('/api/coupon', {
        ...details,
        // enable_flat: !details?.enable_flat ? 'off' : 'on',
      });
      console.log('response from creating coupon...');
      console.log(res);
      setSubmitting(false);
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
            <Text style={styles.title}>Add New Coupon</Text>

            <Pressable
              onPress={() => {
                setShowNewCouponForm(false);
              }}
              style={styles.closeBtn}>
              <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
            </Pressable>
          </View>

          <NewCouponForm
            details={details}
            setDetails={setDetails}
            onSubmit={createCoupon}
            handleSuccessfulResponse={handleSuccessfulResponse}
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
  closeBtn: {
    padding: SIZES.base,
  },
});
