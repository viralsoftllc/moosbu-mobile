import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, SIZES, FONTS} from '../../../../assets/themes';
import ImageIcon from '../../../../shared/components/ImageIcon';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function ContactCard({
  title,
  setShowShareModal,
  handleEditItem,
  number,
  email,
  address,
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
    <Pressable style={styles.container} onPress={closeCtaView}>
      <ImageIcon size={56} />

      <View style={styles.details}>
        <View style={[styles.flex, styles.nameWrapper]}>
          <View>
            <Text style={styles.name}>{title}</Text>
            <Text style={styles.address}>{address}</Text>
          </View>

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

              <Pressable style={styles.cta} onPress={handleDeleteItem}>
                <Text style={[styles.ctaText, styles.deleteCta]}>Delete</Text>
              </Pressable>
            </View>
          ) : null}
        </View>

        <View style={styles.flex}>
          <Text style={styles.contact}>{number}</Text>
          <Text style={styles.contact}>{email}</Text>
        </View>

        <View style={styles.links}>
          <Pressable style={[styles.linkBtn, styles.linkPhone]}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="phone"
              color={COLORS.white}
            />
            <Text style={[styles.linkText, styles.phoneLinkText]}>Phone</Text>
          </Pressable>

          <Pressable style={[styles.linkBtn, styles.linkWhatsapp]}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="whatsapp"
              color="rgba(40, 40, 40, 0.5)"
            />
            <Text style={styles.linkText}>Whatsapp</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  address: {
    color: COLORS.grayText,
    ...FONTS.medium,
    fontWeight: '300',
    marginTop: SIZES.base / 3,
  },
  container: {
    backgroundColor: COLORS.tabBg,
    marginBottom: SIZES.base,
    borderRadius: SIZES.radius,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contact: {
    color: COLORS.textPrimary,
    ...FONTS.medium,
    marginVertical: SIZES.base,
  },
  details: {
    flex: 1,
    paddingRight: SIZES.base,
    paddingVertical: SIZES.base,
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
  deleteCta: {
    color: COLORS.debit,
  },
  links: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.base,
  },
  linkBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 2,
    borderWidth: 1,
  },
  linkPhone: {
    backgroundColor: COLORS.credit,
    borderColor: COLORS.credit,
    marginRight: SIZES.base,
  },
  linkWhatsapp: {
    borderColor: 'rgba(39, 41, 64, 0.2)',
  },
  linkText: {
    ...FONTS.tiny,
    fontWeight: '300',
    marginLeft: SIZES.base / 2,
  },
  phoneLinkText: {
    color: COLORS.white,
  },
});
