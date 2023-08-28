import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

export default function MediaResources() {
  const link = 'tagy.link/maresource';
  // const link = 'https://tagy.link/maresource';
  const {goBack} = useNavigation();

  return (
    <WebView
      source={{uri: link}}
      originWhitelist={['https://*']}
      style={{flex: 1}}
      containerStyle={{flex: 1}}
      androidHardwareAccelerationDisabled={true}
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
      onError={syntheticEvent => {
        const {nativeEvent} = syntheticEvent;
        console.log('OnError');
        console.warn('WebView error: ', nativeEvent);
        goBack();
      }}
      onNavigationStateChange={({url}) => {
        console.log('stateChanges');
        console.log(url);
        // if (url.startsWith('whatsapp://')) {
        //   // this.webview.stopLoading();
        //   Linking.openURL(url);
        // }
      }}
    />
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
