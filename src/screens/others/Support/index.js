import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

import ComingSoon from '../../../shared/components/ComingSoon';
import {useNavigation} from '@react-navigation/native';

export default function Support() {
  // const link = 'tawk.to/chat/645be10aad80445890ec3a08/1h03ee58d';
  const {goBack} = useNavigation();
  const link = 'https://tawk.to/chat/645be10aad80445890ec3a08/1h03ee58d';

  return (
    <>
      {/* {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : null} */}

      <WebView
        source={{uri: link}}
        style={{flex: 1}}
        containerStyle={{flex: 1}}
        androidHardwareAccelerationDisabled={true}
        originWhitelist={['https://*', 'whatsapp://*']}
        startInLoadingState={true}
        renderLoading={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} />
          </View>
        )}
        onNavigationStateChange={({url}) => {
          console.log('stateChanges');
          console.log(url);
          // if (url.startsWith('whatsapp://')) {
          //   // this.webview.stopLoading();
          //   Linking.openURL(url);
          // }
        }}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.log('OnError');
          console.warn('WebView error: ', nativeEvent);
          goBack();
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
