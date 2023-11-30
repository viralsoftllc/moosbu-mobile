import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

import {FONTS, SIZES, COLORS} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import FormButton from '../../../shared/components/FormButton';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import {setBusinessWallet} from '../../../redux/slices/wallet/slice';
import {selectBusinessWallet} from '../../../redux/slices/wallet/selectors';

const BasicBusinessDetails = () => {
  const {goBack, navigate} = useNavigation();

  const dispatch = useDispatch();
  const businessWallet = useSelector(selectBusinessWallet);

  const [details, setDetails] = useState({});

  const handleContinue = () => {
    if (!details.businessNumber) {
      return notifyMessage('Business number required!');
    }
    if (!details.tin) {
      return notifyMessage('TIN required');
    }

    const basicBusinessDetailsDone = true;

    dispatch(setBusinessWallet({...details, basicBusinessDetailsDone}));
    navigate('BusinessAddress');
  };

  useEffect(() => {
    setDetails({
      ...details,
      businessNumber: businessWallet.businessNumber || '',
      tin: businessWallet.tin || '',
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 50,
          alignItems: 'center',
          gap: 50,
        }}>
        <Pressable
          onPress={goBack}
          style={{
            alignSelf: 'flex-start',
            height: 35,
            width: 35,
            borderWidth: 1,
            borderColor: COLORS.borderGray,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: SIZES.radius / 2,
          }}>
          <UseIcon type={'MaterialIcons'} name="arrow-back" size={16} />
        </Pressable>
        <Text
          style={{
            ...FONTS.h5,
            // textAlign: 'center',
            flex: 1,
          }}>
          Basic Business Details
        </Text>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingHorizontal: Platform.OS == 'ios' ? 20 : 0,
          paddingBottom: 100,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Business number or Registered company
          </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="characters"
            onChangeText={text =>
              setDetails({...details, businessNumber: text})
            }
            value={details.businessNumber}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tax Identification Number (TIN)</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="characters"
            onChangeText={text => setDetails({...details, tin: text})}
            value={details.tin}
          />
        </View>

        <FormButton
          title="Continue"
          onPress={handleContinue}
          buttonStyle={{
            marginVertical: 50,
          }}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default BasicBusinessDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base * 2,
  },
  inputContainer: {marginBottom: 20},
  label: {...FONTS.medium, color: COLORS.label, marginBottom: 5},
  input: {
    borderWidth: 1,
    marginTop: 3,
    borderRadius: 5,
    height: 50,
    padding: 10,
    borderColor: COLORS.borderGray,
    ...FONTS.medium,
  },
});
