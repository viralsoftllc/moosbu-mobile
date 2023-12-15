import React, {useLayoutEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Keyboard,
  Text,
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
import {verticalScale} from 'react-native-size-matters';
import routes from '../../../shared/constants/routes';

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
  const {setOptions, navigate} = useNavigation();
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
      header: () => <ScreenHeader title="Vera AI" />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      {/* <ComingSoon
        page={'Vera AI'}
        iconType={'MaterialCommunityIcons'}
        iconName="robot"
      /> */}

      <View style={styles.cards}>
        <Pressable
          style={[styles.card, styles.currency]}
          onPress={() => navigate('TokenScreen')}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="robot"
            color={COLORS.secondary}
          />
          <Text style={styles.cardText}>Vera AI Tokens</Text>
        </Pressable>
        <Pressable
          style={styles.card}
          onPress={() => navigate(routes.MAIN, {screen: routes.MORE_STACK})}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="cog"
            color={COLORS.secondary}
          />
          <Text style={styles.cardText}>Settings</Text>
        </Pressable>
      </View>

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
    backgroundColor: COLORS.white,
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
  cards: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    height: verticalScale(120),
    borderRadius: SIZES.radius,
    width: '40%',
    margin: SIZES.base,
  },
  cardText: {
    fontFamily: 'Lato-Regular',
    color: COLORS.textPrimary,
    marginTop: SIZES.base / 2,
  },
  currency: {
    backgroundColor: '#F5F1DA',
  },
  kyc: {
    backgroundColor: '#E7FFF3',
  },
});
