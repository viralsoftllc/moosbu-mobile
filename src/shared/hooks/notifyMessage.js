import {Alert, Platform, ToastAndroid} from 'react-native';

export default function notifyMessage(message) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === 'ios') {
    Alert.alert(message);
  }
}
