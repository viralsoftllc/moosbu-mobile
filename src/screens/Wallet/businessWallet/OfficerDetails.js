import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

import {Dropdown} from 'react-native-element-dropdown';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import DatePicker from 'react-native-date-picker';
import client from '../../../shared/api/client';
import handleApiError from '../../../shared/components/handleApiError';
import Test from '../../Test';
import routes from '../../../shared/constants/routes';

const OfficerDetails = ({route}) => {
  const {navigate, goBack} = useNavigation();

  const [details, setDetails] = useState({});

  const [loading, setLoading] = useState(false);

  const [valueTitle, setValueTitle] = useState(null);
  const [isFocusTitle, setIsFocusTitle] = useState(false);

  const [valueRole, setValueRole] = useState(null);
  const [isFocusRole, setIsFocusRole] = useState(false);
  const [valueState, setValueState] = useState(null);
  const [isFocusState, setIsFocusState] = useState(false);

  //Date picker
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateUI, setDateUI] = useState('');

  //format date
  function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', {year: 'numeric'});
    const month = date.toLocaleString('default', {
      month: '2-digit',
    });
    const day = date.toLocaleString('default', {day: '2-digit'});

    const formattedDate = [year, month, day].join('-');
    return formattedDate;
  }

  const handleRegister = async () => {
    setLoading(true);

    try {
      const res = await client.post('/api/business/wallet', {...details});
      console.log(res.data);
      setLoading(false);
      navigate(routes.MAIN);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  };

  useEffect(() => {
    setDetails({...route.params});
    console.log(route.params);
  }, [route.params]);

  return (
    <SafeAreaView>
      {loading ? (
        <Test />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View style={{gap: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => goBack()}
                style={{
                  alignSelf: 'flex-start',
                  height: verticalScale(30),
                  width: verticalScale(30),
                  borderWidth: 1,
                  borderColor: COLORS.borderGray,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: SIZES.radius / 2,
                }}>
                <Icon name="arrow-back" size={16} />
              </Pressable>
              <Text
                style={{
                  ...FONTS.h5,
                }}>
                Activate Your Wallet
              </Text>
              <Text style={{...FONTS.tiny}}>Step 2 of 2</Text>
            </View>

            <Text style={{textAlign: 'center', ...FONTS.medium}}>
              Create an account to improve the growth of your business
            </Text>
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.medium,
                color: COLORS.textGray,
              }}>
              Officer details
            </Text>

            <View style={{gap: 15}}>
              <Dropdown
                style={styles.input}
                placeholderStyle={[
                  {borderWidth: 0, color: COLORS.grayText, ...FONTS.medium},
                ]}
                itemTextStyle={{
                  ...FONTS.medium,
                }}
                selectedTextStyle={{...FONTS.medium}}
                data={[
                  {label: 'Owner', value: 'mr'},
                  {label: 'Partner', value: 'mrs'},
                ]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusRole ? 'Role' : '...'}
                value={valueRole}
                onFocus={() => setIsFocusRole(true)}
                onBlur={() => setIsFocusRole(false)}
                onChange={item => {
                  setValueRole(item.value);
                  setDetails({...details, officerOneRole: item.label});
                  setIsFocusRole(false);
                }}
              />

              <TextInput
                placeholder="First Name"
                placeholderTextColor={COLORS.grayText}
                style={styles.input}
                value={details.officerOneFirstName}
                onChangeText={text =>
                  setDetails({...details, officerOneFirstName: text})
                }
              />
              <TextInput
                placeholder="Middle Name"
                placeholderTextColor={COLORS.grayText}
                style={styles.input}
                value={details.officerOneMiddleName}
                onChangeText={text =>
                  setDetails({...details, officerOneMiddleName: text})
                }
              />

              <TextInput
                placeholder="Last Name"
                placeholderTextColor={COLORS.grayText}
                style={styles.input}
                value={details.officerOneLastName}
                onChangeText={text =>
                  setDetails({...details, officerOneLastName: text})
                }
              />
              <TextInput
                placeholder="Maiden Name"
                placeholderTextColor={COLORS.grayText}
                style={styles.input}
                value={details.officerOneMaidenName}
                onChangeText={text =>
                  setDetails({...details, officerOneMaidenName: text})
                }
              />

              <Dropdown
                style={styles.input}
                placeholderStyle={[{borderWidth: 0, color: COLORS.grayText}]}
                placeholderTextColor={COLORS.grayText}
                itemTextStyle={{
                  ...FONTS.medium,
                }}
                selectedTextStyle={{...FONTS.medium}}
                data={[
                  {label: 'Abia', value: 'Abia'},
                  {label: 'Adamawa', value: 'Adamawa'},
                  {label: 'Akwa Ibom', value: 'Akwa Ibom'},
                  {label: 'Anambra', value: 'Anambra'},
                  {label: 'Bauchi', value: 'Bauchi'},
                  {label: 'Bayelsa', value: 'Bayelsa'},
                  {label: 'Benue', value: 'Benue'},
                  {label: 'Borno', value: 'Borno'},
                  {label: 'Cross River', value: 'Cross River'},
                  {label: 'Delta', value: 'Delta'},
                  {label: 'Ebonyi', value: 'Ebonyi'},
                  {label: 'Edo', value: 'Edo'},
                  {label: 'Ekiti', value: 'Ekiti'},
                  {label: 'Enugu', value: 'Enugu'},
                  {label: 'FCT - Abuja', value: 'FCT - Abuja'},
                  {label: 'Gombe', value: 'Gombe'},
                  {label: 'Imo', value: 'Imo'},
                  {label: 'Jigawa', value: 'Jigawa'},
                  {label: 'Kaduna', value: 'Kaduna'},
                  {label: 'Kano', value: 'Kano'},
                  {label: 'Katsina', value: 'Katsina'},
                  {label: 'Kebbi', value: 'Kebbi'},
                  {label: 'Kogi', value: 'Kogi'},
                  {label: 'Kwara', value: 'Kwara'},
                  {label: 'Lagos', value: 'Lagos'},
                  {label: 'Nasarawa', value: 'Nasarawa'},
                  {label: 'Niger', value: 'Niger'},
                  {label: 'Ogun', value: 'Ogun'},
                  {label: 'Ondo', value: 'Ondo'},
                  {label: 'Osun', value: 'Osun'},
                  {label: 'Oyo', value: 'Oyo'},
                  {label: 'Plateau', value: 'Plateau'},
                  {label: 'Rivers', value: 'Rivers'},
                  {label: 'Sokoto', value: 'Sokoto'},
                  {label: 'Taraba', value: 'Taraba'},
                  {label: 'Yobe', value: 'Yobe'},
                  {label: 'Zamfara', value: 'Zamfara'},
                ]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusState ? 'State' : '...'}
                value={valueState}
                onFocus={() => setIsFocusState(true)}
                onBlur={() => setIsFocusState(false)}
                onChange={item => {
                  setValueState(item.value);
                  setDetails({...details, officerOneState: item.label});
                  setIsFocusState(false);
                }}
              />

              <TextInput
                placeholder="Email Address"
                placeholderTextColor={COLORS.grayText}
                style={styles.input}
                value={details.officerOneEmail}
                onChangeText={text =>
                  setDetails({...details, officerOneEmail: text})
                }
                keyboardType="email-address"
              />

              <TextInput
                placeholder="Phone Number"
                placeholderTextColor={COLORS.grayText}
                style={styles.input}
                value={details.officerOnePhoneNumber}
                onChangeText={text =>
                  setDetails({...details, officerOnePhoneNumber: text})
                }
                keyboardType="number-pad"
                maxLength={11}
              />
              <TextInput
                placeholder="BVN"
                placeholderTextColor={COLORS.grayText}
                style={styles.input}
                value={details.officerOneBvn}
                onChangeText={text =>
                  setDetails({...details, officerOneBvn: text})
                }
                keyboardType="number-pad"
                maxLength={11}
              />

              <Dropdown
                style={styles.input}
                placeholderStyle={[
                  {borderWidth: 0, color: COLORS.grayText, ...FONTS.medium},
                ]}
                itemTextStyle={{
                  ...FONTS.medium,
                }}
                selectedTextStyle={{...FONTS.medium}}
                data={[
                  {label: 'Mr', value: 'mr'},
                  {label: 'Mrs', value: 'mrs'},
                  {label: 'Miss', value: 'ms'},
                ]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusTitle ? 'Title' : '...'}
                value={valueTitle}
                onFocus={() => setIsFocusTitle(true)}
                onBlur={() => setIsFocusTitle(false)}
                onChange={item => {
                  setValueTitle(item.value);
                  setDetails({...details, officerOneTitle: item.label});
                  setIsFocusTitle(false);
                }}
              />
              <TextInput
                placeholder="Percentage of Share"
                placeholderTextColor={COLORS.grayText}
                style={styles.input}
                value={details.officerOnepercentageOwned}
                onChangeText={text =>
                  setDetails({...details, officerOnepercentageOwned: text})
                }
                keyboardType="number-pad"
              />

              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDateUI(formatDate(date));
                  setDetails({...details, officerOneDOB: formatDate(date)});
                }}
                onCancel={() => {
                  setOpen(false);
                }}
                mode="date"
              />
              <TextInput
                placeholder="Date of birth"
                placeholderTextColor={COLORS.grayText}
                style={styles.input}
                value={dateUI}
                onPressIn={() => setOpen(true)}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (
                    !details.officerOneRole &&
                    !details.officerOneFirstName &&
                    !details.officerOneLastName &&
                    !details.officerOneLastName &&
                    !details.officerOneMaidenName &&
                    !details.officerOneMiddleName &&
                    !details.officerOneState &&
                    !details.officerOneEmail &&
                    !details.officerOnePhoneNumber &&
                    !details.officerOneBvn &&
                    !details.officerOneTitle &&
                    !details.officerOnepercentageOwned &&
                    !details.officerOneDOB
                  ) {
                    return notifyMessage('Please fill all details');
                  }

                  handleRegister();
                }}
                style={styles.button}>
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.h5,
                  }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default OfficerDetails;

const styles = StyleSheet.create({
  container: {
    gap: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'flex-start',
    paddingBottom: 100,
  },
  input: {
    borderWidth: 1,
    marginTop: 3,
    borderRadius: 5,
    height: 50,
    padding: 10,
    borderColor: COLORS.borderGray,
    ...FONTS.medium,
  },
  button: {
    minWidth: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
  },
});
