import React, {useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';

import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import {SIZES, FONTS, COLORS} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import {scale, verticalScale} from 'react-native-size-matters';

function Row({
  leftIcon,
  title,
  subtitle,
  buttonIcon,
  buttonTitle,
  onButtonPress,
  onPress,
}) {
  return (
    <View style={styles.flex}>
      {leftIcon ? <View style={styles.leftIconView}>{leftIcon}</View> : null}

      <Pressable onPress={onPress} style={styles.textView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </Pressable>

      {buttonTitle ? (
        <Pressable style={styles.button} onPress={onButtonPress}>
          {buttonIcon}

          <Text style={styles.buttonTitle}>{buttonTitle}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export default function Support() {
  const {setOptions, goBack} = useNavigation();
  const liveWebChatLink =
    'https://tawk.to/chat/645be10aad80445890ec3a08/1h03ee58d';
  const mediaResourcesLink = 'tagy.link/maresource';
  const whatsappLink =
    'https://api.whatsapp.com/send?phone=+2348160419897&text=Hi';

  const [showLiveWebChat, setLiveWebChat] = useState(false);
  const [showMediaResource, setMediaResource] = useState(false);
  const [showWhatsappModal, setWhatsappModal] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Contact Support'} />,
    });
  }, [setOptions]);

  const body = '';
  const subject = '';

  function handleEmail() {
    Linking.openURL(`mailto:help@moosbu.com?subject=${subject}&body=${body}`);
  }

  function handlePhone() {
    Linking.openURL('tel://08104775719');
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chat</Text>

            <View style={styles.sectionContent}>
              <Row
                title={'Live Web Chat'}
                subtitle={'Start a live chat with us'}
                leftIcon={
                  <UseIcon
                    type={'Ionicons'}
                    name="chatbox-outline"
                    color={COLORS.primary}
                  />
                }
                onPress={() => setLiveWebChat(true)}
              />

              <Row
                title={'Whatsapp'}
                subtitle={'Start a chat with us on whatsapp'}
                leftIcon={
                  <UseIcon
                    type={'Ionicons'}
                    name="logo-whatsapp"
                    color={COLORS.credit}
                  />
                }
                onPress={() => setWhatsappModal(true)}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Call</Text>

            <View style={styles.sectionContent}>
              <Row
                title={'+234 810 477 5719'}
                subtitle={'Talk to us via call today.'}
                buttonIcon={
                  <UseIcon
                    type={'Ionicons'}
                    name="call-outline"
                    color={COLORS.primary}
                    style={{
                      marginRight: SIZES.base,
                    }}
                    size={scale(12)}
                  />
                }
                onButtonPress={handlePhone}
                buttonTitle={'Call'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Email</Text>

            <View style={styles.sectionContent}>
              <Row
                title={'help@moosbu.com'}
                subtitle={'Talk to us via mail today.'}
                buttonIcon={
                  <UseIcon
                    type={'Ionicons'}
                    name="mail-outline"
                    color={COLORS.primary}
                    style={{
                      marginRight: SIZES.base,
                    }}
                    size={scale(12)}
                  />
                }
                buttonTitle={'Email'}
                onButtonPress={handleEmail}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>

            <View style={styles.sectionContent}>
              <Row
                title={'Moosbu Support Portal'}
                subtitle={'Read articles and FAQs on how to use Moosbu'}
                leftIcon={
                  <UseIcon
                    type={'Ionicons'}
                    name="reader-outline"
                    color={COLORS.primary}
                  />
                }
                onPress={() => setMediaResource(true)}
              />

              <Pressable
                style={[styles.readMoreView]}
                onPress={() => setMediaResource(true)}>
                <Text style={styles.readMoreText}>Read Now</Text>
                <UseIcon
                  type={'AntDesign'}
                  name="right"
                  color={COLORS.primary}
                  size={verticalScale(11)}
                />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal visible={showLiveWebChat} transparent={true} animationType="slide">
        <ScreenHeader
          onPress={() => setLiveWebChat(false)}
          style={{backgroundColor: COLORS.primary}}
          iconColor={COLORS.white}
        />
        <WebView
          source={{uri: liveWebChatLink}}
          style={styles.style}
          containerStyle={styles.containerStyle}
          androidHardwareAccelerationDisabled={true}
          originWhitelist={['https://*', 'whatsapp://*']}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.webViewLoader}>
              <ActivityIndicator size={'large'} />
            </View>
          )}
          onNavigationStateChange={() => {}}
          onError={() => goBack()}
        />
      </Modal>

      <Modal
        visible={showMediaResource}
        transparent={true}
        animationType="slide">
        <ScreenHeader
          onPress={() => setMediaResource(false)}
          style={{backgroundColor: COLORS.primary}}
          iconColor={COLORS.white}
        />
        <WebView
          source={{uri: mediaResourcesLink}}
          style={styles.style}
          containerStyle={styles.containerStyle}
          androidHardwareAccelerationDisabled={true}
          originWhitelist={['https://*', 'whatsapp://*']}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.webViewLoader}>
              <ActivityIndicator size={'large'} />
            </View>
          )}
          onNavigationStateChange={() => {}}
          onError={() => goBack()}
        />
      </Modal>

      <Modal
        visible={showWhatsappModal}
        transparent={true}
        animationType="slide">
        <ScreenHeader
          onPress={() => setWhatsappModal(false)}
          style={{backgroundColor: COLORS.primary}}
          iconColor={COLORS.white}
        />
        <WebView
          source={{uri: whatsappLink}}
          style={styles.style}
          containerStyle={styles.containerStyle}
          androidHardwareAccelerationDisabled={true}
          originWhitelist={['https://*', 'whatsapp://*']}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.webViewLoader}>
              <ActivityIndicator size={'large'} />
            </View>
          )}
          onNavigationStateChange={() => {}}
          onError={() => goBack()}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: SIZES.base,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: SIZES.base,
  },
  section: {
    marginBottom: SIZES.base * 3,
  },
  sectionTitle: {
    ...FONTS.h6,
    marginBottom: SIZES.base,
  },
  sectionContent: {
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.borderGray,
    paddingHorizontal: SIZES.base,
  },
  leftIconView: {
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    height: verticalScale(40),
    width: verticalScale(40),
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.base,
  },
  textView: {
    flex: 1,
  },
  title: {
    ...FONTS.h6,
    marginBottom: SIZES.base / 5,
  },
  subtitle: {
    color: COLORS.textGray,
    ...FONTS.medium,
  },
  button: {
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 2,
    borderRadius: SIZES.radius / 2,
    borderColor: COLORS.primary,
  },
  buttonTitle: {
    ...FONTS.medium,
    color: COLORS.primary,
  },
  readMoreView: {
    marginLeft: verticalScale(50),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: SIZES.base,
  },
  readMoreText: {
    color: COLORS.primary,
    ...FONTS.h5,
    fontWeight: 'bold',
    marginRight: SIZES.base / 2,
  },
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
