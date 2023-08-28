import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';

export default function JoinCommunity() {
  const link = 'https://tagy.link/mobcom';
  // const link = 'tagy.link/mobcom';
  const {goBack} = useNavigation();

  return (
    <WebView
      source={{uri: link}}
      originWhitelist={['https://*', 'whatsapp://*']}
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
      onNavigationStateChange={({url}) => {
        console.log('stateChanges');
        console.log(url);
        if (url.startsWith('whatsapp://')) {
          // this.webview.stopLoading();
          Linking.openURL(url);
        }
      }}
      onError={syntheticEvent => {
        const {nativeEvent} = syntheticEvent;
        console.log('OnError');
        console.warn('WebView error: ', nativeEvent);
        goBack();
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
