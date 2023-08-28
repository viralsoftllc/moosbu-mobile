import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import ComingSoon from '../../../shared/components/ComingSoon';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

export default function CashFlowComingSoon() {
  const link = 'https://forms.gle/oVTtxEYak9agi1Yz9';
  // const link = 'forms.gle/oVTtxEYak9agi1Yz9';
  const {goBack} = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ComingSoon
        page={'Cash Flow'}
        iconType={'MaterialCommunityIcons'}
        iconName={'cash'}
      />
      {/* <WebView
        source={{uri: link}}
        // source={{uri: 'reactnative.dev'}}
        style={{flex: 1}}
        containerStyle={{flex: 1}}
        // style={{flex: 1, opacity: 0.99, overflow: 'hidden'}}
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
        originWhitelist={['https://*', 'whatsapp://*', 'intent://*']}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
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
      /> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
