import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import Dojah from 'react-native-dojah';
import routes from '../../../../../shared/constants/routes';
import {useSelector} from 'react-redux';
import {selectUser} from '../../../../../redux/slices/user/selectors';
import {selectStoreDetails} from '../../../../../redux/slices/store/selectors';

export default function Selfie() {
  const {navigate} = useNavigation();
  const appID = '6346a9a447257b0034ae870e';
  const publicKey = 'prod_pk_sAGu0clhfSp9hs6bunWZyryyA';
  //   const publicKey = 'test_pk_3mVG77VG9OGxJosKvQN6TbVha';
  // const type = 'https://identity.dojah.io?widget_id=634d2407224d8a0034d98e57';
  const type = 'verification';
  //   const user = useSelector(selectUser);
  //   const store = useSelector(selectStoreDetails);
  //   console.log(store);

  const config = {
    debug: true,
    // otp: type === 'verification',
    // selfie: type === 'verification',
    pages: [
      {page: 'phone-number', config: {enabled: false}},
      {page: 'address', config: {enabled: false}},
      {
        page: 'government-data',
        config: {
          enabled: false,
        },
      },
      {page: 'selfie'},
      {page: 'id', config: {enabled: false}},
    ],
  };

  const response = (responseType, data) => {
    console.log(responseType, data);
    if (responseType === 'success') {
      navigate(routes.KYC);
    } else if (responseType === 'error') {
      navigate(routes.KYC);
    } else if (responseType === 'close') {
      navigate(routes.KYC);
    } else if (responseType === 'begin') {
    } else if (responseType === 'loading') {
    }
  };

  const outerContainerStyle = {width: '100%', height: '100%'};
  const style = {};
  const innerContainerStyle = {};

  return (
    <Dojah
      response={response}
      appID={appID}
      publicKey={publicKey}
      type={type}
      config={config}
      outerContainerStyle={outerContainerStyle}
      style={style}
      innerContainerStyle={innerContainerStyle}
      //   userData={{
      //     first_name: 'Chijioke',
      //     last_name: 'Nna',
      //     dob: '2022-03-12',
      //     email: 'yarzicasto@gufum.com',
      //     phone: '09026611797',
      //     residence_country: 'NG',
      //   }}
    />
  );
}
const styles = StyleSheet.create({});
