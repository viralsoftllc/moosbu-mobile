import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

import {COLORS, SIZES, FONTS} from '../../../../assets/themes';
import ImageIcon from '../../../../shared/components/ImageIcon';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function ContactCard({
  setShowShareModal,
  handleEditItem,
  handleDeleteItem,
  contact,
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

  function getNumberLength(numbers) {
    if (!numbers) {
      return [];
    }

    const split = numbers?.split(',');
    return split?.length || 0;
  }

  return (
    <Pressable style={styles.container} onPress={closeCtaView}>
      <ImageIcon size={scale(40)} />

      <View style={styles.details}>
        <View style={[styles.flex, styles.nameWrapper]}>
          <View>
            <Text style={styles.name}>{contact?.name}</Text>
            <Text style={styles.address}>{contact?.address}</Text>
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

              {/* <Pressable
                style={styles.cta}
                // onPress={() => setShowShareModal(true)}
              >
                <Text style={styles.ctaText}>View Contacts</Text>
              </Pressable> */}

              <Pressable style={styles.cta} onPress={handleDeleteItem}>
                <Text style={[styles.ctaText, styles.deleteCta]}>Delete</Text>
              </Pressable>
            </View>
          ) : null}
        </View>

        {/* <View style={styles.flex}>
          <Text style={styles.email}>{email}</Text>
        </View> */}
        <Text style={styles.contact}>
          No. of Contacts: {getNumberLength(contact?.number)}
        </Text>

        {/* <View style={styles.links}>
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
        </View> */}
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  address: {
    color: COLORS.grayText,
    ...FONTS.medium,
    marginTop: SIZES.base / 3,
  },
  container: {
    backgroundColor: COLORS.tabBg,
    marginBottom: SIZES.base,
    borderRadius: SIZES.radius,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  contact: {
    color: COLORS.textPrimary,
    ...FONTS.medium,
    // marginVertical: SIZES.base,
  },
  email: {
    color: COLORS.textPrimary,
    ...FONTS.medium,
    marginVertical: SIZES.base / 2,
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
    ...FONTS.medium,
    fontFamily: 'Lato-Bold',
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
