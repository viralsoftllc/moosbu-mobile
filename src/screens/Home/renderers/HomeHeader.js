import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform, Pressable, Modal} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import AppButton from '../../../shared/components/AppButton';
import ImageIcon from '../../../shared/components/ImageIcon';
import routes from '../../../shared/constants/routes';
import copyToClipboard from '../../../shared/utils/copyToClipboard';
import UseIcon from '../../../shared/utils/UseIcon';
import ShareItem from '../../storeFront/renderer/ShareItem';

export default function HomeHeader({
  setShowSubscriptionModal,
  setShowNewStoreModal,
}) {
  const {navigate} = useNavigation();

  const [showShareModal, setShowShareModal] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const link = 'moosbu.com/retail.store';

  return (
    <>
      <View style={styles.topView}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <Pressable onPress={() => navigate(routes.PROFILE)}>
              <ImageIcon
                size={verticalScale(20)}
                style={styles.imageIcon}
                imageUrl={require('../../../assets/images/profile.png')}
              />
            </Pressable>

            <Pressable
              style={styles.store}
              onPress={() => setShowCta(!showCta)}>
              <Text style={styles.storeName}>Jewelry store</Text>
              <UseIcon
                type={'AntDesign'}
                name="down"
                color={COLORS.white}
                size={verticalScale(11)}
              />
            </Pressable>

            {showCta ? (
              <View style={styles.ctaView}>
                <Pressable style={styles.cta}>
                  <Text style={styles.ctaText}>Jewelry Store</Text>
                </Pressable>

                <Pressable
                  style={styles.cta}
                  onPress={() => {
                    setShowCta(false);
                    setShowNewStoreModal(true);
                  }}>
                  <UseIcon
                    type={'AntDesign'}
                    name="plus"
                    color={COLORS.textPrimary}
                  />
                  <Text style={styles.ctaText}>Create New Store</Text>
                </Pressable>

                <Pressable
                  style={styles.cta}
                  onPress={() => {
                    setShowCta(false);
                    setShowSubscriptionModal(true);
                  }}>
                  <Text style={[styles.ctaText, styles.deleteCta]}>Plans</Text>
                </Pressable>
              </View>
            ) : null}
          </View>

          <Pressable
            onPress={() => navigate(routes.NOTIFICATIONS)}
            style={styles.notifications}>
            <UseIcon
              type="MaterialIcons"
              name={'notifications-none'}
              color={COLORS.white}
              size={verticalScale(18)}
            />
          </Pressable>
        </View>

        <View>
          <Text style={styles.link}>{link}</Text>
          <Text style={styles.linkComment}>
            Link shared with customers can be visited and make orders
          </Text>
        </View>

        <View style={styles.linkButtons}>
          <AppButton
            title={'Copy link'}
            onPress={() => copyToClipboard(link, 'Store Link copied')}
            rightIcon={
              <UseIcon
                type={'MaterialIcons'}
                name={'content-copy'}
                color={COLORS.white}
                size={verticalScale(11)}
              />
            }
            buttonStyle={{marginRight: SIZES.base, borderColor: COLORS.white}}
          />

          <AppButton
            title={'Share link'}
            onPress={() => setShowShareModal(true)}
            rightIcon={
              <UseIcon
                type={'FAIcon5'}
                name={'share-square'}
                color={COLORS.white}
                size={verticalScale(11)}
              />
            }
            buttonStyle={{borderColor: COLORS.white}}
          />
        </View>
      </View>

      <Modal visible={showShareModal} animationType="slide" transparent={true}>
        <ShareItem setShowShareModal={setShowShareModal} title={'store'} />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackground,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.base,
    marginTop: Platform.OS === 'android' ? SIZES.base : 0,
  },
  link: {
    color: COLORS.white,
    ...FONTS.h6,
    marginBottom: 1,
  },
  linkButtons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: SIZES.base,
    marginBottom: SIZES.base * 1.5,
  },
  linkComment: {
    color: COLORS.grayText,
    ...FONTS.tiny,
  },
  topView: {
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  imageIcon: {
    margin: 0,
  },
  leftHeader: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  store: {
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SIZES.base,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius / 2,
    borderColor: COLORS.white,
    paddingVertical: SIZES.base / 5,
  },
  storeName: {
    color: COLORS.white,
    marginRight: SIZES.base / 2,
  },
  ctaText: {
    ...FONTS.medium,
    paddingVertical: SIZES.base / 2,
    color: COLORS.textPrimary,
    paddingHorizontal: SIZES.base,
    fontWeight: '600',
  },
  ctaView: {
    position: 'absolute',
    left: 0,
    top: SIZES.base * 3,
    zIndex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius / 2,
    width: verticalScale(178),
    paddingTop: SIZES.base * 1.5,
    // paddingBottom: SIZES.base * 3,
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    overflow: 'hidden',
  },
  cta: {
    paddingHorizontal: SIZES.base,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.borderGray,
    paddingVertical: SIZES.base,
  },
  notifications: {
    padding: SIZES.base / 2,
  },
});
