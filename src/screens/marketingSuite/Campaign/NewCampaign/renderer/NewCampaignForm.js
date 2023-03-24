import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
import AppDatePicker from '../../../../../shared/components/AppDatePicker';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import UseIcon from '../../../../../shared/utils/UseIcon';

export default function NewCampaignForm({
  handleSuccessfulResponse,
  setCampaign,
  campaign,
}) {
  return (
    <View>
      <FormInput label={'Campaign Name'} placeholder="Campaign name" />

      {/* <FormInput label={'Campaign Type'} placeholder="Email" /> */}

      <Text style={styles.formlabel}>Campaign Channel</Text>

      <View style={styles.flex}>
        <Pressable
          style={[
            styles.channel,
            styles.flex,
            {
              borderColor:
                campaign?.channel === 'sms' ? COLORS.credit : COLORS.borderGray,
            },
          ]}
          onPress={() => setCampaign({...campaign, channel: 'sms'})}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="message-processing-outline"
            color={
              campaign?.channel === 'sms' ? COLORS.credit : COLORS.textPrimary
            }
          />
          <Text
            style={[
              styles.channelText,
              {
                color:
                  campaign?.channel === 'sms'
                    ? COLORS.credit
                    : COLORS.textPrimary,
              },
            ]}>
            SMS
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.channel,
            styles.flex,
            {
              borderColor:
                campaign?.channel === 'whatsapp'
                  ? COLORS.credit
                  : COLORS.borderGray,
            },
          ]}
          onPress={() => setCampaign({...campaign, channel: 'whatsapp'})}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="whatsapp"
            color={
              campaign?.channel === 'whatsapp'
                ? COLORS.credit
                : COLORS.textPrimary
            }
          />
          <Text
            style={[
              styles.channelText,
              {
                color:
                  campaign?.channel === 'whatsapp'
                    ? COLORS.credit
                    : COLORS.textPrimary,
              },
            ]}>
            Whatsapp
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.channel,
            styles.flex,
            {
              borderColor:
                campaign?.channel === 'email'
                  ? COLORS.credit
                  : COLORS.borderGray,
            },
          ]}
          onPress={() => setCampaign({...campaign, channel: 'email'})}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="email-outline"
            color={
              campaign?.channel === 'email' ? COLORS.credit : COLORS.textPrimary
            }
          />
          <Text
            style={[
              styles.channelText,
              {
                color:
                  campaign?.channel === 'email'
                    ? COLORS.credit
                    : COLORS.textPrimary,
              },
            ]}>
            Email
          </Text>
        </Pressable>
      </View>

      <FormInput label={'Contact group'} placeholder="Select customer/group" />

      <FormInput label={'Campaign Title'} placeholder="Campaign Title" />

      <FormInput
        label={'Campaign Message'}
        placeholder="Enter campaign message content"
        multiline={true}
        numberOfLines={5}
      />

      <Pressable style={styles.flex}>
        <UseIcon
          type={'AntDesign'}
          name="checksquare"
          color={COLORS.secondary}
        />

        <Text style={styles.selectText}>Send later</Text>
      </Pressable>

      <Text style={styles.scheduleText}>Schedule Time</Text>
      <View style={styles.flex}>
        <View style={styles.dateView}>
          <AppDatePicker />
        </View>

        <View style={styles.timeView}>
          <AppDatePicker mode="time" />
        </View>
      </View>

      <View style={styles.flex}>
        <View style={styles.sendNowBtn}>
          <FormButton
            title={'Send Now'}
            fullWidth
            onPress={handleSuccessfulResponse}
          />
        </View>

        <View style={styles.scheduleBtnView}>
          <FormButton
            title={'Schedule'}
            fullWidth
            buttonStyle={styles.scheduleBtn}
            textStyle={styles.scheduleBtnText}
          />
        </View>
      </View>
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
