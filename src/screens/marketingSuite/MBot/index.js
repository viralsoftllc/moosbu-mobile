import React, {useLayoutEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Keyboard,
  Modal,
  StatusBar,
} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import FormInput from '../../../shared/components/FormInput';
import UpdateSuccessful from '../../../shared/components/UpdateSuccessful';
import copyToClipboard from '../../../shared/utils/copyToClipboard';
import UseIcon from '../../../shared/utils/UseIcon';
import ChatHeader from './renderer/ChatHeader';
import Message from './renderer/Message';
import SaveChatForm from './renderer/SaveChatForm';
import ComingSoon from '../../../shared/components/ComingSoon';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../../../shared/components/ScreenHeader';

const messages = [
  {
    msg: 'Hello! Nice to see you here. How can I help you today?',
    isBotMessage: true,
  },
];

const randomMsg = [
  "We're working on it",
  'Our server is processing request',
  'We are here to server you better',
  'A random reply',
  'Another random reply',
];

export default function MBot() {
  const {setOptions} = useNavigation();
  const [msg, setMsg] = useState('');
  const [showSaveChatForm, setShowSaveChatForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function handleSuccessfulResponse() {
    setShowSaveChatForm(false);
    setShowSuccessModal(true);
  }

  function handleSaveChat() {
    setShowSaveChatForm(true);
  }

  function handleSendMessage() {
    messages.push({msg: msg, isBotMessage: false});
    messages.push({
      msg: randomMsg[Math.floor(Math.random() * randomMsg.length)],
      isBotMessage: true,
    });
    setMsg('');
    Keyboard.dismiss();
  }

  function handleRewrite() {
    messages.push({
      msg: randomMsg[Math.floor(Math.random() * randomMsg.length)],
      isBotMessage: true,
    });
  }

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <ComingSoon
        page={'M Bot'}
        iconType={'MaterialCommunityIcons'}
        iconName="robot"
      />

      {/* <ChatHeader handleSaveChat={handleSaveChat} /> */}

      {/* <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {messages?.map((message, i) => (
          <Message
            message={message.msg}
            isBotMessage={message.isBotMessage}
            key={i}
            handleRewrite={handleRewrite}
            handleCopyResponse={() =>
              copyToClipboard(message.msg, 'Message copied')
            }
          />
        ))}
      </ScrollView> */}

      {/* <View style={styles.inputView}>
        <FormInput
          placeholder={'Enter your message here'}
          rightIcon={
            <Pressable onPress={handleSendMessage}>
              <UseIcon
                type={'FeatherIcons'}
                name={'send'}
                color={COLORS.primary}
              />
            </Pressable>
          }
          inputStyle={styles.inputStyle}
          inputContainerStyle={styles.inputContainerStyle}
          onChangeText={text => setMsg(text)}
          value={msg}
        />
      </View>

      <Modal
        visible={showSaveChatForm}
        animationType="slide"
        transparent={true}>
        <SaveChatForm
          setShowSaveChatForm={setShowSaveChatForm}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          message={'Your conversation have been saved'}
          subtitle={'Your conversations will be updated'}
        />
      </Modal> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.tabBg,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: SIZES.base * 2,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  inputView: {
    backgroundColor: COLORS.primaryBackground,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base * 2,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  inputContainerStyle: {
    backgroundColor: COLORS.white,
    paddingRight: SIZES.base * 2,
    borderRadius: SIZES.radius * 2,
    borderWidth: 0,
  },
});
