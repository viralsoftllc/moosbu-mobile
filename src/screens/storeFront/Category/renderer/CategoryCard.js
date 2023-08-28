import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function CategoryCard({
  setShowShareModal,
  category,
  subtitle,
  handleEditItem,
  handleDeleteItem,
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

  return (
    <Pressable style={[styles.container, styles.flex]} onPress={closeCtaView}>
      <View style={styles.imageView}>
        {/* <Image
          source={require('../../../../assets/images/suit.png')}
          style={styles.image}
          resizeMode="cover"
        /> */}
        <UseIcon
          type={'MaterialIcons'}
          name="category"
          size={verticalScale(35)}
          color={COLORS.borderGray}
        />
      </View>

      <View style={styles.details}>
        <View style={[styles.flex, styles.nameWrapper]}>
          <Text style={styles.name}>{category?.name || ''}</Text>

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

              {/* <Pressable style={styles.cta}>
                <Text style={styles.ctaText}>Move to top</Text>
              </Pressable> */}

              <Pressable style={styles.cta} onPress={handleDeleteItem}>
                <Text style={[styles.ctaText, styles.deleteCta]}>
                  Delete category
                </Text>
              </Pressable>
            </View>
          ) : null}
        </View>

        <Text style={styles.stock}>{category?.description}</Text>

        {/* <View style={styles.flex}> */}
        <Pressable
          onPress={() => setShowShareModal(true)}
          style={[styles.flex, styles.shareIcon]}>
          <UseIcon
            type={'Ionicons'}
            name="share-social-outline"
            style={styles.icon}
            color={COLORS.textPrimary}
          />

          <Text style={styles.shareText}>Share category</Text>
        </Pressable>
        {/* </View> */}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.borderGray,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base * 1.5,
    backgroundColor: COLORS.tabBg,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base * 2,
  },
  cta: {},
  ctaText: {
    ...FONTS.medium,
    paddingVertical: SIZES.base / 2,
    color: COLORS.textPrimary,
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
  deleteCta: {
    color: COLORS.debit,
  },
  details: {
    flex: 1,
    marginLeft: SIZES.base,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image: {
    height: '100%',
    // width: '100%',
    borderRadius: SIZES.radius,
  },
  imageView: {
    height: verticalScale(80),
    width: verticalScale(80),
    overflow: 'hidden',
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  name: {
    color: COLORS.textPrimary,
    maxWidth: verticalScale(240),
  },
  nameWrapper: {
    position: 'relative',
  },
  price: {
    ...FONTS.h6,
    color: COLORS.textPrimary,
  },
  stock: {
    marginTop: SIZES.base / 5,
    marginBottom: SIZES.base * 2,
    color: COLORS.textSecondary,
    ...FONTS.medium,
  },
  shareText: {
    color: COLORS.grayText,
    ...FONTS.tiny,
    fontWeight: '200',
    marginLeft: SIZES.base,
  },
  shareIcon: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 2,
    borderRadius: SIZES.radius / 2,
    zIndex: -1,
    alignSelf: 'flex-start',
  },
});
