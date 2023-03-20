import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function Referee() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <ScreenHeader
          title={'Submit two references to request a cash flow advance'}
        />
      ),
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.info}>
        Please add at least two business contacts as references. Your references
        help us verify the authentication of your request. Your reference will
        be confirmed before your cash flow advance is approved
      </Text>

      <Text style={styles.emptyRef}>You have no reference at this time</Text>

      <Pressable style={styles.addBtn}>
        <View style={styles.iconView}>
          <UseIcon type={'AntDesign'} name="plus" color={COLORS.debit} />
        </View>

        <Text style={styles.addText}>Add reference</Text>
      </Pressable>

      <FormButton title={'Continue'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingBottom: SIZES.base * 2,
    paddingTop: SIZES.base * 2,
    justifyContent: 'space-between',
    position: 'relative',
  },
  info: {
    color: COLORS.grayText,
    marginBottom: SIZES.base * 2,
  },
  emptyRef: {
    textAlign: 'center',
    color: COLORS.textPrimary,
    marginVertical: SIZES.base * 10,
  },
  addBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
    borderRadius: SIZES.radius * 4,
    alignSelf: 'center',
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base * 2,
    position: 'absolute',
    right: SIZES.base * 2,
    bottom: '20%',
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  iconView: {
    height: verticalScale(40),
    width: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(202, 45, 49, 0.1)',
    borderRadius: 100,
    marginRight: SIZES.base,
  },
  addText: {
    color: COLORS.debit,
  },
});
