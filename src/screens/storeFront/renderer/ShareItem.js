import Clipboard from '@react-native-community/clipboard';
import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';
import ImageIcon from '../../../shared/components/ImageIcon';
import UseIcon from '../../../shared/utils/UseIcon';
import notifyMessage from '../../../shared/hooks/notifyMessage';

// const storeName = 'oracle';

export default function ShareItem({
  setShowShareModal,
  title,
  subtitle,
  productId,
  storeName,
  link,
}) {
  const [copied, setCopied] = useState(false);
  const [media, setMedia] = useState('');

  const copyToClipboard = content => {
    Clipboard.setString(content);
    setCopied(true);
  };

  return (
    <SafeAreaView style={styles.shareModal}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginVertical: 15,
            }}>
            <View style={{width: '80%'}}>
              <Text style={styles.title}>
                {title ? `Share Your ${title} Link` : 'Share as'}
              </Text>
              <Text style={styles.subtitleText}>
                {subtitle ? subtitle : 'Share links on your social networks'}
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setShowShareModal(false);
                setMedia('');
              }}
              style={styles.closeBtn}>
              <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
            </Pressable>
          </View>

          {/* <View style={styles.flex}>
            <Pressable
              style={[
                styles.shareTypeView,
                {
                  borderColor:
                    media === 'facebook' ? COLORS.credit : COLORS.borderGray,
                },
              ]}
              onPress={() => setMedia('facebook')}>
              <Text style={styles.primaryText}>Facebook</Text>
              <UseIcon
                name="facebook"
                type={'MaterialIcons'}
                size={verticalScale(15)}
                color={'#1D9BF0'}
              />
            </Pressable>

            <Pressable
              style={[
                styles.shareTypeView,
                {
                  borderColor:
                    media === 'twitter' ? COLORS.credit : COLORS.borderGray,
                },
              ]}
              onPress={() => setMedia('twitter')}>
              <Text style={styles.primaryText}>Twitter</Text>
              <UseIcon
                name="twitter-square"
                type={'FaIcons'}
                size={verticalScale(15)}
                color={'#1D9BF0'}
              />
            </Pressable>

            <Pressable
              style={[
                styles.shareTypeView,
                {
                  borderColor:
                    media === 'instagram' ? COLORS.credit : COLORS.borderGray,
                },
              ]}
              onPress={() => setMedia('instagram')}>
              <Text style={styles.primaryText}>Instagram</Text>
             
              <ImageIcon
                imageUrl={require('../../../assets/images/insta.png')}
                size={verticalScale(12)}
                style={styles.imageIcon}
              />
            </Pressable>
          </View> */}

          <Text style={styles.linkText}>{title} Link</Text>
          <View style={[styles.flex, styles.copyView]}>
            <Text style={styles.link}>
              {link || title == 'store'
                ? link || `https://www.moosbu.store/${storeName}`
                : `https://www.moosbu.store/${storeName}/products/${productId}`}
            </Text>
            {/* <Pressable
              onPress={() =>
                copyToClipboard(
                  `https://www.moosbu.store/${storeName}/products/${productId}` ||
                    '',
                )
              }
              style={styles.copyBtn}>
              <UseIcon type={'AntDesign'} name="copy1" color={COLORS.white} />
              <Text style={styles.copyText}>{copied ? 'Copied' : 'Copy'}</Text>
            </Pressable> */}
          </View>

          <FormButton
            title={'Copy'}
            style={{backgroundColor: COLORS.primary}}
            // disabled={media ? false : true}
            onPress={() => {
              notifyMessage('Copied');
              copyToClipboard(
                `${
                  link || title == 'store'
                    ? link || `https://www.moosbu.store/${storeName}`
                    : `https://www.moosbu.store/${storeName}/products/${productId}`
                }`,
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    paddingHorizontal: SIZES.paddingHorizontal,
    backgroundColor: COLORS.white,
    paddingBottom: SIZES.base * 2,
  },
  copyView: {
    backgroundColor: COLORS.tabBg,
    borderRadius: SIZES.radius / 2,
    overflow: 'hidden',
    marginBottom: SIZES.base * 3,
    height: 50,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: SIZES.base * 1.3,
  },
  primaryText: {
    color: COLORS.textPrimary,
    marginTop: SIZES.base / 1.5,
    marginBottom: SIZES.base,
  },
  title: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
    marginTop: SIZES.base / 1.5,
  },
  subtitleText: {
    ...FONTS.medium,
    color: COLORS.grayText,
  },
  link: {
    ...FONTS.small,
    marginLeft: SIZES.base,
    // width: '60%',
  },
  shareTypeView: {
    alignSelf: 'flex-start',
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius / 2,
    height: verticalScale(80),
    width: '25%',
  },
  shareModal: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
  },
  imageIcon: {
    margin: 0,
  },
  copyBtn: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base * 2,
  },
  copyText: {
    color: COLORS.white,
    marginLeft: SIZES.base / 2,
    ...FONTS.small,
  },
  linkText: {
    marginTop: SIZES.base * 2,
  },
  closeBtn: {
    padding: SIZES.base,
  },
});
