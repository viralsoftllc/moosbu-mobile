import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';
import {ONESIGNAL_APP_ID} from '@env';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';

import store from './src/redux/store';
import Instance from './src/instance';
import {COLORS} from './src/assets/themes';

function App() {
  // OneSignal Initialization
  OneSignal.setAppId(ONESIGNAL_APP_ID);

  OneSignal.promptForPushNotificationsWithUserResponse();

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    async notificationReceivedEvent => {
      // console.log(
      //   'OneSignal: notification will show in foreground:',
      //   notificationReceivedEvent,
      // );
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      // const data = notification?.additionalData;
      // console.log('additionalData: ', data);

      const message = {
        title: notification?.title,
        message: notification?.body,
        bigPicture: notification?.bigPicture,
        icon: notification?.smallIcon,
      };

      const currentMessages = await AsyncStorage.getItem('notifications');
      let messageArray;
      if (currentMessages == null) {
        messageArray = [];
      } else {
        messageArray = JSON.parse(currentMessages);
      }

      messageArray.push(message);
      await AsyncStorage.setItem('notifications', JSON.stringify(messageArray));

      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(async notification => {
    console.log('OneSignal: notification opened:', notification);
    const message = {
      title: notification?.notification?.title,
      message: notification?.notification?.body,
      bigPicture: notification?.notification?.bigPicture,
      icon: notification?.notification?.smallIcon,
    };

    const currentMessages = await AsyncStorage.getItem('notifications');
    let messageArray;
    if (currentMessages == null) {
      messageArray = [];
    } else {
      messageArray = JSON.parse(currentMessages);
    }

    messageArray.push(message);
    await AsyncStorage.setItem('notifications', JSON.stringify(messageArray));
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle={'default'} backgroundColor={COLORS.primary} />
      <Instance />
    </Provider>
  );
}

export default App;
