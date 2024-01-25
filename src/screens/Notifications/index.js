import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../assets/themes';
import ScreenHeader from '../../shared/components/ScreenHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationRow from './renderer/NotificationRow';
import UseIcon from '../../shared/utils/UseIcon';

export default function Notifications() {
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState({});
  const [notifications, setNotifications] = useState([]);

  const getNotifications = useCallback(async () => {
    setLoading(true);
    AsyncStorage.getItem('notifications')
      .then(data => {
        setNotifications(JSON.parse(data));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  function handleSelectNotification(params) {
    setShowModal(true);
    setSelectedNotification(params);
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScreenHeader title={'Notifications'} />

        <StatusBar backgroundColor={COLORS.primary} barStyle={'dark-content'} />
        {loading ? <ActivityIndicator /> : null}

        {!loading && !notifications?.length ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              You do not have a notification yet
            </Text>
          </View>
        ) : null}

        {notifications?.length ? (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: SIZES.paddingHorizontal,
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={getNotifications} />
            }>
            {notifications?.map((notification, i) => (
              <NotificationRow
                key={i}
                notification={notification}
                handleSelectNotification={handleSelectNotification}
              />
            ))}
          </ScrollView>
        ) : null}
      </SafeAreaView>

      <Modal visible={showModal} animationType="fade" transparent={true}>
        <SafeAreaView style={styles.modalSafeAreaView}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Pressable
                onPress={() => {
                  setShowModal(false);
                }}
                style={styles.closeBtn}>
                <UseIcon
                  type={'MaterialCommunityIcons'}
                  name={'close'}
                  color={COLORS.debit}
                />
              </Pressable>

              {selectedNotification?.title?.trim()?.length !== 0 ? (
                <Text style={styles.title}>{selectedNotification?.title}</Text>
              ) : null}

              <Text style={[styles.message]}>
                {selectedNotification?.message}
              </Text>

              <View style={styles.bigPicture}>
                <Image
                  source={{uri: selectedNotification?.bigPicture}}
                  resizeMode="contain"
                  style={styles.picture}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyText: {
    ...FONTS.regular,
    color: COLORS.grayText,
  },
  modalSafeAreaView: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    paddingHorizontal: verticalScale(20),
    borderRadius: 10,
    paddingTop: SIZES.base * 3,
    width: '90%',
  },
  title: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SIZES.base * 1.5,
    ...FONTS.big,
    // fontWeight: '500',
  },
  message: {
    color: COLORS.textPrimary,
    // ...FONTS.regular,
    fontWeight: '300',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    paddingLeft: SIZES.base * 2,
    marginBottom: SIZES.base,
  },
  bigPicture: {
    height: verticalScale(200),
    width: '100%',
    marginVertical: SIZES.base * 3,
  },
  picture: {
    height: '100%',
    width: '100%',
  },
});
