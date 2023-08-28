import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
// import AppDatePicker from '../../../../../shared/components/AppDatePicker';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import UseIcon from '../../../../../shared/utils/UseIcon';
import TextAreaInput from '../../../../../shared/components/TeaxtAreaInput';
import {selectContacts} from '../../../../../redux/slices/engagement/selectors';
import {useSelector} from 'react-redux';
import SelectModalFormInput from '../../../../../shared/components/SelectModalFormInput';
import SelectModal from '../../../../../shared/components/SelectModal';

export default function ResendCampaignForm({
  loading,
  setCampaign,
  campaign,
  handleResendCampaign,
}) {
  const [showContactGroup, setShowContactGroup] = useState(false);
  const contacts = useSelector(selectContacts);
  // console.log('contacts');
  // console.log(contacts);
  // const [sendLater, setSendLater] = useState(false);

  function channelButton(title, iconName, value) {
    return (
      <Pressable
        style={[
          styles.channel,
          styles.flex,
          {
            borderColor:
              campaign?.channel === value ? COLORS.credit : COLORS.borderGray,
          },
        ]}
        onPress={() => setCampaign({...campaign, channel: value})}>
        <UseIcon
          type={'MaterialCommunityIcons'}
          name={iconName}
          color={
            campaign?.channel === value ? COLORS.credit : COLORS.textPrimary
          }
        />
        <Text
          style={[
            styles.channelText,
            {
              color:
                campaign?.channel === value
                  ? COLORS.credit
                  : COLORS.textPrimary,
            },
          ]}>
          {title}
        </Text>
      </Pressable>
    );
  }

  return (
    <View>
      <FormInput
        label={'Campaign Name'}
        placeholder="Campaign name"
        value={campaign?.name}
        onChangeText={text => setCampaign({...campaign, name: text})}
        // editable={false}
      />

      {/* <FormInput label={'Campaign Type'} placeholder="Email" /> */}

      <Text style={styles.formlabel}>Campaign Channel</Text>

      <View style={styles.flex}>
        {channelButton('SMS', 'message-processing-outline', 'sms')}
        {channelButton('Whatsapp', 'whatsapp', 'whatsapp')}
        {channelButton('Email', 'email-outline', 'email')}
      </View>

      <SelectModalFormInput
        label={'Contact Group'}
        placeholder={'Choose Contact Group'}
        setShowModal={setShowContactGroup}
        selectedItem={campaign?.phonebook}
      />

      <TextAreaInput
        label={'Campaign Message'}
        placeholder="Enter campaign message"
        onChangeText={text => setCampaign({...campaign, content: text})}
        value={campaign?.content}
      />

      {/* <Pressable style={styles.flex} onPress={() => setSendLater(!sendLater)}>
        <UseIcon
          type={'MaterialCommunityIcons'}
          name={sendLater ? 'checkbox-marked' : 'checkbox-blank-outline'}
          color={sendLater ? COLORS.secondary : COLORS.grayText}
        />

        <Text
          style={[
            styles.selectText,
            {color: sendLater ? COLORS.secondary : COLORS.grayText},
          ]}>
          Send later
        </Text>
      </Pressable> */}

      {/* {sendLater ? (
        <>
          <Text style={styles.scheduleText}>Schedule Time</Text>
          <View style={styles.flex}>
            <View style={styles.dateView}>
              <AppDatePicker />
            </View>

            <View style={styles.timeView}>
              <AppDatePicker mode="time" />
            </View>
          </View>
        </>
      ) : null} */}

      <View style={styles.flex}>
        <View style={styles.sendNowBtn}>
          <FormButton
            title={'Send Campaign'}
            // title={'Send Now'}
            fullWidth
            onPress={handleResendCampaign}
            loading={loading}
          />
        </View>

        {/* <View style={styles.scheduleBtnView}>
          <FormButton
            title={'Schedule'}
            fullWidth
            buttonStyle={[
              styles.scheduleBtn,
              {borderColor: sendLater ? COLORS.primary : COLORS.borderGray},
            ]}
            textStyle={[
              styles.scheduleBtnText,
              {color: sendLater ? COLORS.primary : COLORS.borderGray},
            ]}
            disabled={!sendLater}
            onPress={handleResendCampaign}
          />
        </View> */}
      </View>

      <Modal visible={showContactGroup}>
        <SelectModal
          filteredItems={contacts}
          title={'Choose Contact Group'}
          setShowModal={setShowContactGroup}
          selectedItem={campaign?.phonebook}
          handleSelect={option => {
            setCampaign({...campaign, phonebook: option});
            setShowContactGroup(false);
          }}
        />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base * 2,
  },
  dateView: {
    flex: 1,
    marginRight: SIZES.base / 2,
  },
  timeView: {
    flex: 1,
    marginLeft: SIZES.base / 2,
  },
  selectText: {
    color: COLORS.secondary,
    marginLeft: SIZES.base,
  },
  scheduleText: {
    marginBottom: SIZES.base / 2,
    color: COLORS.textPrimary,
  },
  sendNowBtn: {
    flex: 1,
    marginRight: SIZES.base / 2,
  },
  scheduleBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  scheduleBtnText: {
    color: COLORS.grayText,
  },
  scheduleBtnView: {
    width: '40%',
    marginLeft: SIZES.base / 2,
  },
  formlabel: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontWeight: '400',
    marginBottom: SIZES.base,
  },
  channel: {
    // flex: 1,
    borderWidth: 1,
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.base * 1.5,
    marginRight: SIZES.base,
    borderRadius: SIZES.radius / 2,
    borderColor: COLORS.borderGray,
  },
  channelText: {
    marginLeft: SIZES.base / 2,
    color: COLORS.textPrimary,
  },
  selectedChannel: {
    borderColor: COLORS.credit,
  },
  selectedChannelText: {
    color: COLORS.credit,
  },
});
