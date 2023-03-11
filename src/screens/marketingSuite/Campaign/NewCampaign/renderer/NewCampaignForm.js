import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import UseIcon from '../../../../../shared/utils/UseIcon';

export default function NewCampaignForm({handleSuccessfulResponse}) {
  return (
    <View>
      <FormInput label={'Campaign Name'} placeholder="Campaign name" />

      <FormInput label={'Campaign Type'} placeholder="Email" />

      <FormInput
        label={'Customers/group'}
        placeholder="Select customer/group"
      />

      <Pressable style={styles.flex}>
        <UseIcon
          type={'AntDesign'}
          name="pluscircleo"
          color={COLORS.secondary}
        />
        <Text style={styles.selectText}>Customers/group</Text>
      </Pressable>

      <FormInput label={'Campaign Title'} placeholder="Campaign Title" />

      <FormInput
        label={'Campaign Message'}
        placeholder="Enter campaign message content"
        multiline={true}
        numberOfLines={5}
      />

      <FormInput
        label={'Add Image'}
        placeholder="Image for campaign header"
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
          <FormInput />
        </View>

        <View style={styles.timeView}>
          <FormInput />
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
});
