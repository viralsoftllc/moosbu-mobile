import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import ImageIcon from '../../../../shared/components/ImageIcon';
import icons from '../../../../shared/constants/icons';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function EmailCard({
  setShowShareModal,
  title,
  date,
  time,
  status,
  handleEditItem,
  imageUrl,
}) {
  const [showCta, setShowCta] = useState(false);

  function toggleCtaView() {
    setShowCta(!showCta);
  }

  function closeCtaView() {
    if (showCta) {
      setShowCta(false);
    }
  }

  function getColor() {
    if (status?.toLowerCase() === 'completed') {
      return COLORS.primary;
    }
    if (status?.toLowerCase() === 'in progress') {
      return COLORS.pending;
    }
  }

  function getSource() {
    if (typeof imageUrl === 'number') {
      return imageUrl;
    }

    if (imageUrl) {
      return {uri: imageUrl};
    }

    return icons.avatar;
  }

  return (
    <Pressable style={styles.container} onPress={closeCtaView}>
      <View style={[styles.imageBox]}>
        <Image
          source={getSource()}
          resizeMode={'contain'}
          style={styles.image}
        />
      </View>

      <View style={styles.details}>
        <View style={[styles.flex, styles.nameWrapper]}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>

          <Pressable onPress={toggleCtaView}>
            <UseIcon
              type={'Ionicons'}
              name="ellipsis-vertical"
              style={styles.icon}
              color={COLORS.textPrimary}
            />
          </Pressable>

          {showCta ? (
            <View style={styles.ctaView}>
              <Pressable style={styles.cta} onPress={handleEditItem}>
                <Text style={styles.ctaText}>Edit</Text>
              </Pressable>
              <Pressable
                style={styles.cta}
                onPress={() => setShowShareModal(true)}>
                <Text style={styles.ctaText}>Share</Text>
              </Pressable>
              <Pressable style={styles.cta}>
                <Text style={[styles.ctaText, styles.deleteCta]}>Delete</Text>
              </Pressable>
            </View>
          ) : null}
        </View>

        <View style={[styles.flex, styles.datetimeView]}>
          <Text style={styles.datetimeText}>{date}</Text>
          <Text style={styles.datetimeText}>{time}</Text>
        </View>

        <View style={[styles.flex, styles.imagesView]}>
          <View style={styles.images}>
            <ImageIcon size={18} rounded margin={0} />
            <ImageIcon
              size={18}
              rounded
              margin={0}
              style={styles.centerImage}
            />
            <ImageIcon size={18} rounded margin={0} style={styles.rightImage} />
            <Text style={styles.peopleCount}>+42</Text>
          </View>

          <Text style={[styles.status, {color: getColor()}]}>{status}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.borderGray,
    backgroundColor: COLORS.tabBg,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaText: {
    ...FONTS.medium,
    paddingVertical: SIZES.base / 2,
    color: COLORS.textPrimary,
    paddingHorizontal: SIZES.base,
  },
  ctaView: {
    paddingHorizontal: SIZES.base,
    position: 'absolute',
    right: 0,
    top: SIZES.base * 2,
    zIndex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius / 2,
  },
  details: {
    paddingVertical: SIZES.base,
    flex: 1,
  },
  datetimeView: {
    width: '70%',
    marginTop: SIZES.base,
    marginBottom: SIZES.base * 2,
  },
  datetimeText: {
    ...FONTS.tiny,
    color: COLORS.grayText,
  },
  deleteCta: {
    color: COLORS.debit,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  name: {
    color: COLORS.textPrimary,
    maxWidth: verticalScale(240),
  },
  nameWrapper: {
    position: 'relative',
  },
  images: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imagesView: {
    marginTop: SIZES.base,
  },
  status: {
    ...FONTS.tiny,
    flex: 1,
    textAlign: 'center',
  },
  peopleCount: {
    ...FONTS.tiny,
    color: COLORS.grayText,
    marginLeft: SIZES.base / 2,
  },
  centerImage: {
    marginLeft: -5,
  },
  rightImage: {
    marginLeft: -7,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageBox: {
    overflow: 'hidden',
    borderColor: COLORS.grey2,
    width: verticalScale(56),
    height: verticalScale(82),
    marginHorizontal: SIZES.base,
  },
});
