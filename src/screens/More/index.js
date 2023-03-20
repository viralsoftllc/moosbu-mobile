import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../assets/themes';
import ImageIcon from '../../shared/components/ImageIcon';
import routes from '../../shared/constants/routes';
import LinkRow from './renderer/LinkRow';

export default function More() {
  // const {setOptions} = useNavigation();

  // useLayoutEffect(() => {
  //   setOptions({
  //     header: () => <ScreenHeader title={'Account'} />,
  //   });
  // }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <ImageIcon
            style={styles.imageIcon}
            imageUrl={require('../../assets/images/accountProfile.png')}
            size={verticalScale(45)}
          />

          <View style={styles.details}>
            <Text style={styles.name}>Jooshua Moosbu</Text>
            <Text style={styles.id}>Client ID 911912264</Text>
            <Text style={styles.joinedDate}>Joined: Nov 22, 2017</Text>
          </View>

          <View style={styles.level}>
            <Text>Level 3</Text>
          </View>
        </View>

        <LinkRow
          title={'Profile'}
          iconName="person-outline"
          route={routes.PROFILE}
        />
        <LinkRow title={'Support'} iconName="support-agent" />
        <LinkRow title={'Team Members'} iconName="people-outline" />
        <LinkRow title={'About Moosbu'} iconName="info-outline" />
        <LinkRow title={'Sign out'} iconName="logout" route={routes.LOGOUT} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  headerView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SIZES.base * 3,
  },
  imageIcon: {
    margin: 0,
  },
  details: {
    flex: 1,
    marginHorizontal: SIZES.base,
  },
  name: {
    ...FONTS.h5,
    color: COLORS.textPrimary,
    marginBottom: SIZES.base / 1.5,
  },
  id: {
    color: COLORS.textPrimary,
    fontWeight: '300',
  },
  joinedDate: {
    color: COLORS.textGray,
  },
  level: {
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    paddingHorizontal: SIZES.base * 2,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radius,
  },
});
