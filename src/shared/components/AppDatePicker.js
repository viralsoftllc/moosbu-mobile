import React, {useState} from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../assets/themes';

export default function AppDatePicker({
  onSelected,
  onCancel,
  label,
  maximumDate,
  minimuDate,
  mode = 'date',
}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  function onConfirm(params) {
    if (onSelected) {
      onSelected(params);
    }
    setDate(params);
    setOpen(false);
  }

  return (
    <>
      <View style={styles.maskedInputView}>
        {label ? (
          <Text style={[styles.label, FONTS.regular]}>{label}</Text>
        ) : null}
        <Pressable onPress={() => setOpen(true)} style={styles.pressable}>
          <Text style={FONTS.regular}>{date.toDateString()}</Text>
        </Pressable>
      </View>

      <DatePicker
        modal
        open={open}
        date={date}
        mode={mode}
        maximumDate={maximumDate}
        minimumDate={minimuDate}
        onConfirm={selectedDate => onConfirm(selectedDate)}
        onCancel={() => {
          setDate(new Date());
          setOpen(false);
          if (onCancel) {
            onCancel();
          }
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  maskedInputView: {
    marginBottom: SIZES.base * 2,
  },
  label: {
    marginBottom: SIZES.base,
    color: COLORS.black,
  },
  pressable: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    borderColor: COLORS.borderGray,
    height: verticalScale(45),
    paddingHorizontal: SIZES.base,
  },
});
