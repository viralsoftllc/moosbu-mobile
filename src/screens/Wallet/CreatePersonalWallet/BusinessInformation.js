import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import UseIcon from '../../../shared/utils/UseIcon';
import {SIZES, FONTS, COLORS} from '../../../assets/themes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/FormButton';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import {setPersonalWallet} from '../../../redux/slices/wallet/slice';
import {selectPersonalWallet} from '../../../redux/slices/wallet/selectors';

const BusinessInformation = () => {
  const {goBack, navigate} = useNavigation();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});

  const personalWallet = useSelector(selectPersonalWallet);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleNext = () => {
    if (!details.doingBusinessAs) {
      return notifyMessage('Business name is required!');
    }
    if (!details.businessDescription) {
      return notifyMessage('Business description is required!');
    }

    if (!details.businessCategory) {
      return notifyMessage('Please select business category');
    }
    // if (!details.isSoleProprietor) {
    //   return notifyMessage('Are you a sole proprietor?');
    // }

    const businessDescriptionDone = true;
    dispatch(setPersonalWallet({...details, businessDescriptionDone}));

    navigate('LevelOneKYC');
  };

  useEffect(() => {
    setDetails({
      ...details,
      doingBusinessAs: personalWallet.doingBusinessAs || '',
      businessDescription: personalWallet.businessDescription || '',
      businessCategory: personalWallet.businessCategory || '',
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
            flex: 1,
            // textAlign: 'center',
          }}>
          Business Information
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
          <Text style={styles.label}>Name of Business</Text>
          <TextInput
            style={styles.input}
            onChangeText={text =>
              setDetails({...details, doingBusinessAs: text})
            }
            value={details.doingBusinessAs}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Business Description </Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={3}
            onChangeText={text =>
              setDetails({...details, businessDescription: text})
            }
            value={details.businessDescription}
          />
        </View>

        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Are you a Sole Proprietor?</Text>
          <Dropdown
            style={styles.input}
            placeholderStyle={[
              styles.input,
              {borderWidth: 0, color: COLORS.textGray},
            ]}
            itemTextStyle={{
              ...FONTS.medium,
            }}
            selectedTextStyle={{...FONTS.medium}}
            data={[
              {label: 'Yes', value: true},
              {label: 'No', value: false},
            ]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Choose option' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setDetails({...details, isSoleProprietor: item.value});
              setIsFocus(false);
            }}
          />
        </View> */}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Business category</Text>
          <Dropdown
            style={styles.input}
            placeholderStyle={[styles.input, {borderWidth: 0}]}
            itemTextStyle={{
              ...FONTS.medium,
            }}
            selectedTextStyle={{...FONTS.medium}}
            data={[
              {
                label: 'Accommodation And Food Services Activities',
                value: 'Accommodation And Food Services Activities',
              },
              {
                label:
                  'Activities Of Extraterritorial Organisations and Bodies',
                value:
                  'Activities Of Extraterritorial Organisations and Bodies',
              },
              {
                label:
                  'Activities Of House As Employment Undifferentiated Goods-And Services-Producing',
                value:
                  'Activities Of House As Employment Undifferentiated Goods-And Services-Producing',
              },
              {
                label:
                  'Activities Of Administrative And Support Services Activities',
                value:
                  'Activities Of Administrative And Support Services Activities',
              },
              {
                label: 'Art, Entertainment And Recreation ',
                value: 'Art, Entertainment And Recreation ',
              },
              {
                label: 'Agriculture Forestry & Fishing ',
                value: 'Agriculture Forestry & Fishing ',
              },
              {
                label: 'Community-Based Association ',
                value: 'Community-Based Association ',
              },
              {
                label: 'Cultural Based Association ',
                value: 'Cultural Based Association ',
              },
              {label: 'Construction ', value: 'Construction '},
              {label: 'Education', value: 'Education'},
              {
                label: 'Faith-Based Association',
                value: 'Faith-Based Association',
              },
              {
                label: 'Financial And Insurance Activities',
                value: 'Financial And Insurance Activities',
              },
              {
                label: 'Foundation Based Association',
                value: 'Foundation Based Association',
              },
              {
                label: 'Human Health And Social Work Activities',
                value: 'Human Health And Social Work Activities',
              },
              {
                label: 'Information And Communication',
                value: 'Information And Communication',
              },
              {label: 'Manufacturing', value: 'Manufacturing'},
              {label: 'Mining And Quarrying', value: 'Mining And Quarrying'},
              {
                label: 'Other Service Activities',
                value: 'Other Service Activities',
              },
              {label: 'Others', value: 'Others'},
              {label: 'Power', value: 'Power'},
              {
                label: 'Professional, Scientific And Technical Activities',
                value: 'Professional, Scientific And Technical Activities',
              },
              {
                label:
                  'Public Administration And Defence; Defence, Compulsory Social Security ',
                value:
                  'Public Administration And Defence; Defence, Compulsory Social Security ',
              },
              {
                label: 'Real Estate Activities',
                value: 'Real Estate Activities',
              },
              {
                label: 'Repairs Of Motorvehicles And Motorcycles',
                value: 'Repairs Of Motorvehicles And Motorcycles',
              },
              {
                label: 'Social Clubs Based Association',
                value: 'Social Clubs Based Association',
              },
              {
                label: 'Sporting Based Association',
                value: 'Sporting Based Association',
              },
              {label: 'Transportation', value: 'Transportation'},
              {
                label:
                  'Water-supply, Sewerage, Waste Management, And Remediation Activities',
                value:
                  'Water-supply, Sewerage, Waste Management, And Remediation Activities',
              },
              {
                label:
                  'Wholesale And Retail Trade; Repair Of Motor Vehicles And Motor Vehicles And Motorcycles',
                value:
                  'Wholesale And Retail Trade; Repair Of Motor Vehicles And Motor Vehicles And Motorcycles',
              },
            ]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select business category' : '...'}
            value={details.businessCategory}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
              setDetails({...details, businessCategory: item.label});
            }}
          />
        </View>
        <FormButton
          title="Next"
          textStyle={FONTS.h5}
          buttonStyle={styles.buttonStyle}
          onPress={handleNext}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default BusinessInformation;

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
  textArea: {
    borderWidth: 1,
    marginTop: 3,
    borderRadius: 5,
    padding: 10,
    borderColor: COLORS.borderGray,
    ...FONTS.medium,
    justifyContent: 'flex-start',
  },
  buttonStyle: {
    marginTop: SIZES.base * 5,
    marginBottom: SIZES.base * 3,
  },
});
