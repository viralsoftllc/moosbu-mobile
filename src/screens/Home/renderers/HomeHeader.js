import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import {
  selectStoreDetails,
  selectStoreUrl,
} from '../../../redux/slices/store/selectors';
import ImageIcon from '../../../shared/components/ImageIcon';
import routes from '../../../shared/constants/routes';
import copyToClipboard from '../../../shared/utils/copyToClipboard';
import UseIcon from '../../../shared/utils/UseIcon';
import ShareItem from '../../storeFront/renderer/ShareItem';

export default function HomeHeader({
  setShowStoresModal,
  loading,
  storeImageUrl,
}) {
  const {navigate} = useNavigation();

  const [showShareModal, setShowShareModal] = useState(false);
  // const [showCta, setShowCta] = useState(false);
  // const link = 'moosbu.com/retail.store';
  const link = useSelector(selectStoreUrl);

  const store = useSelector(selectStoreDetails);
  // console.log('store from redux');
  // console.log(store);

  return (
    <>
      <View style={styles.topView}>
        <Pressable>
          <View style={styles.header}>
            <View style={styles.leftHeader}>
              <Pressable onPress={() => navigate(routes.PROFILE)}>
                <ImageIcon
                  size={verticalScale(20)}
                  style={styles.imageIcon}
                  // imageUrl={require('../../../assets/images/profile.png')}
                  imageUrl={storeImageUrl}
                />
              </Pressable>

              <Pressable
                style={styles.store}
                onPress={() => setShowStoresModal(true)}>
                {loading ? (
                  <ActivityIndicator size={'small'} color={COLORS.white} />
                ) : (
                  <>
                    <Text style={styles.storeName}>{store?.name || ''}</Text>
                    <UseIcon
                      type={'AntDesign'}
                      name="down"
                      color={COLORS.white}
                      size={verticalScale(11)}
                    />
                  </>
                )}
              </Pressable>

              <Pressable
                onPress={() => setShowShareModal(true)}
                style={styles.shareBtn}>
                <UseIcon
                  type={'FAIcon5'}
                  name={'share-square'}
                  color={COLORS.white}
                  size={verticalScale(11)}
                />
              </Pressable>
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

          {/* <View>
            <Text style={styles.link}>{link || ''}</Text>
            <Text style={styles.linkComment}>
              Link shared with customers can be visited and make orders
            </Text>
          </View> */}

          {/* <View style={styles.linkButtons}>
            <AppButton
              title={'Copy link'}
              onPress={() => copyToClipboard(link || '', 'Store Link copied')}
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
          </View> */}
        </Pressable>
      </View>

      <Modal visible={showShareModal} animationType="slide" transparent={true}>
        <ShareItem
          setShowShareModal={setShowShareModal}
          title={'store'}
          link={link || ''}
        />
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
    zIndex: 10,
    marginTop: SIZES.base,
    paddingBottom: SIZES.base,
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
  notifications: {
    padding: SIZES.base / 2,
  },
  shareBtn: {
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius / 4,
    borderColor: COLORS.white,
    marginLeft: SIZES.base,
  },
});
