import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
  Linking,
  Pressable,
} from 'react-native';
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

  const browser = async url => {
    console.log('Pressed');
    await Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <Text
        style={{
          ...FONTS.h5,
          marginBottom: 20,
          marginTop: 20,
          textAlign: 'center',
        }}>
        More
      </Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS == 'ios' ? 20 : 0,
          paddingBottom: 100,
        }}>
        <View style={styles.headerView}>
          {store?.logo !== 'logo.png' ? (
            <ImageIcon style={styles.imageIcon} imageUrl={store?.logo} />
          ) : (
            <ImageIcon
              style={styles.imageIcon}
              // imageUrl={require('../../assets/images/accountProfile.png')}
              size={verticalScale(45)}
            />
          )}

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

        {/* <LinkRow
          title={'Upgrade Account'}
          iconName="pricetag-outline"
          iconType="Ionicons"
          route={routes.PLAN}
        /> */}

        <LinkRow
          title={'About Moosbu'}
          iconName="info-outline"
          onPress={() => browser('https://moosbu.com/about-company/')}
        />

        <LinkRow
          title={'General Settings'}
          iconName="cog-outline"
          iconType="MaterialCommunityIcons"
          route={routes.STORE_SETTINGS_STACK}
        />
        <LinkRow
          title={'Privacy Policy'}
          iconType="MaterialCommunityIcons"
          iconName="shield-lock-outline"
          onPress={() => browser('https://moosbu.com/privacy-policy/')}
        />
        <LinkRow
          title={'Terms of Use'}
          iconType="MaterialCommunityIcons"
          iconName="file-document-outline"
          onPress={() => browser('https://moosbu.com/terms-of-use/')}
        />
        <LinkRow title={'Sign Out'} iconName="logout" route={routes.LOGOUT} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
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
