import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

export default function MediaResources() {
  const link = 'tagy.link/maresource';
  // const link = 'https://tagy.link/maresource';
  const {goBack} = useNavigation();

  return (
    <WebView
      source={{uri: link}}
      originWhitelist={['https://*']}
      style={styles.style}
      containerStyle={styles.containerStyle}
      androidHardwareAccelerationDisabled={true}
      startInLoadingState={true}
      renderLoading={() => (
        <View style={styles.webViewLoader}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
      onError={() => {
        goBack();
      }}
      onNavigationStateChange={({url}) => {}}
    />
  );
}

const styles = StyleSheet.create({
  style: {
    flex: 1,
  },
  containerStyle: {
    flex: 1,
  },
  webViewLoader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
