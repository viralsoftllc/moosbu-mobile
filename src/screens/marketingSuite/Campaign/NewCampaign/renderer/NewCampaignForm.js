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
import SelectModal from '../../../../../shared/components/SelectModal';
import SelectModalFormInput from '../../../../../shared/components/SelectModalFormInput';
import {Checkbox} from 'react-native-paper';
import notifyMessage from '../../../../../shared/hooks/notifyMessage';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-gesture-handler';

export default function NewCampaignForm({
  loading,
  setCampaign,
  campaign,
  handleCreateCampaign,
  handleSaveAndSendCampaign,
  saving,
}) {
  const [showContactGroup, setShowContactGroup] = useState(false);
  const [checked, setChecked] = useState(false);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date().getTime());
  const [open, setOpen] = useState(false);

  const contacts = useSelector(selectContacts);
  // console.log('contacts');
  // console.log(contacts);
  // const [sendLater, setSendLater] = useState(false);

  return (
    <View>
      <FormInput
        label={'Campaign Name'}
        placeholder="Campaign name"
        value={campaign?.name}
        onChangeText={text => setCampaign({...campaign, name: text})}
      />

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
          onPress={() => notifyMessage('coming soon')}>
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
          onPress={() => notifyMessage('coming soon')}>
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

      <SelectModalFormInput
        label={'Contact Group'}
        placeholder={'Choose Contact Group'}
        setShowModal={setShowContactGroup}
        selectedItem={campaign?.phonebook}
      />

      <FormInput
        label={'Campaign Title'}
        placeholder={'Enter campaign title'}
        value={campaign?.title}
        onChangeText={text => setCampaign({...campaign, title: text})}
      />

      <TextAreaInput
        label={'Campaign Message'}
        placeholder="Enter campaign message"
        onChangeText={text => setCampaign({...campaign, content: text})}
        value={campaign?.content}
      />

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text style={{...FONTS.medium, color: COLORS.primary}}>Send later</Text>
      </View>
      {checked ? (
        <View>
          <Text style={{...FONTS.medium}}>Schedule Time</Text>
          <View style={{flexDirection: 'row', gap: 20}}>
            <TextInput
              value={date.toDateString()}
              placeholder="Select Date"
              style={styles.input}
              onPressIn={() => setOpen(true)}
            />
            <TextInput
              value={time}
              placeholder="Select Time"
              style={styles.input}
            />
          </View>
        </View>
      ) : null}

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode="date"
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
            title={'Save and Send'}
            // title={'Send Now'}
            fullWidth
            onPress={handleSaveAndSendCampaign}
            loading={loading}
          />
        </View>

        <View style={styles.scheduleBtnView}>
          <FormButton
            title={'Save for later'}
            fullWidth
            buttonStyle={[
              styles.scheduleBtn,
              // {borderColor: sendLater ? COLORS.primary : COLORS.borderGray},
            ]}
            textStyle={[
              styles.scheduleBtnText,
              // {color: sendLater ? COLORS.primary : COLORS.borderGray},
            ]}
            // disabled={!sendLater}
            loading={saving}
            onPress={handleCreateCampaign}
          />
        </View>
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
    borderColor: COLORS.primary,
  },
  scheduleBtnText: {
    color: COLORS.primary,
  },
  scheduleBtnView: {
    width: '45%',
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
    ...FONTS.medium,
  },
  selectedChannel: {
    borderColor: COLORS.credit,
  },
  selectedChannelText: {
    color: COLORS.credit,
  },
  input: {
    borderWidth: 1,
    marginTop: 3,
    borderRadius: 5,
    height: 44,
    padding: 10,
    borderColor: COLORS.borderGray,
    fontSize: 12,
    flex: 1,
  },
});
