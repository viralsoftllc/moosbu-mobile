import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {ONESIGNAL_APP_ID} from '@env';

import store from './src/redux/store';
import Instance from './src/instance';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const n = {
//   actionButtons: undefined,
//   additionalData: null,
//   androidNotificationId: 1742394504,
//   bigPicture:
//     'https://img.onesignal.com/tmp/81c9f5e8-f015-4b80-9490-8f6c71a615d8.jpg',
//   body: 'Testing one signal notifications',
//   collapseId: undefined,
//   fromProjectNumber: '480088421092',
//   groupKey: undefined,
//   groupMessage: undefined,
//   largeIcon: undefined,
//   launchURL: undefined,
//   ledColor: undefined,
//   lockScreenVisibility: 1,
//   notificationId: '756c067c-fda7-471c-bf81-21541b97dff3',
//   priority: 5,
//   rawPayload:
//     '{"google.delivered_priority":"normal","google.sent_time":1680516284299,"google.ttl":259200,"google.original_priority":"normal","custom":"{\\"a\\":{},\\"i\\":\\"756c067c-fda7-471c-bf81-21541b97dff3\\"}","pri":"5","vis":"1","from":"480088421092","alert":"Testing one signal notifications","bicon":"https:\\/\\/img.onesignal.com\\/tmp\\/81c9f5e8-f015-4b80-9490-8f6c71a615d8.jpg","title":"Push from abdul","google.message_id":"0:1680516284315344%3ea23ee6f9fd7ecd","google.c.sender.id":"480088421092"}',
//   smallIcon: undefined,
//   smallIconAccentColor: undefined,
//   sound: undefined,
//   title: 'Push from abdul',
// };

const App = () => {
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
      <StatusBar hidden={true} />
      <Instance />
    </Provider>
  );
};

export default App;
