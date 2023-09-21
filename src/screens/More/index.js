import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../assets/themes';
import {selectStoreDetails} from '../../redux/slices/store/selectors';
import {selectUser} from '../../redux/slices/user/selectors';
import ImageIcon from '../../shared/components/ImageIcon';
import routes from '../../shared/constants/routes';
import LinkRow from './renderer/LinkRow';

export default function More() {
  const user = useSelector(selectUser);
  const store = useSelector(selectStoreDetails);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.headerView}>
          <ImageIcon
            style={styles.imageIcon}
            // imageUrl={require('../../assets/images/accountProfile.png')}
            size={verticalScale(45)}
          />

          <View style={styles.details}>
            <Text style={styles.name}>{store?.name || ''}</Text>
            <Text style={styles.id}>Client ID {user?.id || ''}</Text>
            <Text style={styles.joinedDate}>
              Joined: {new Date(user?.created_at).toDateString() || ''}
            </Text>
          </View>

          <View style={styles.level}>
            <Text>Level 1</Text>
          </View>
        </View>

        <LinkRow
          title={'Profile'}
          iconName="person-outline"
          route={routes.PROFILE}
        />

        <LinkRow
          title={'Support'}
          iconName="support-agent"
          route={routes.CONTACT_SUPPORT}
        />

        {/* <LinkRow title={'Team Members'} iconName="people-outline" /> */}

        <LinkRow
          title={'Upgrade Account'}
          iconName="pricetag-outline"
          iconType="Ionicons"
          route={routes.PLAN}
        />

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
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  headerView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SIZES.base * 2,
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
