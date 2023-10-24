import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, Modal, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';

import ShareItem from '../../renderer/ShareItem';
import DeleteItem from '../../../../shared/components/DeleteItem';
import handleApiError from '../../../../shared/components/handleApiError';
import client from '../../../../shared/api/client';

export default function CategoryCard({
  // setShowShareModal,
  category,
  subtitle,
  handleEditItem,
  handleDeleteItem,
  catId,
  store,
}) {
  const [showCta, setShowCta] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function toggleCtaView() {
    setShowCta(!showCta);
  }

  function closeCtaView() {
    if (showCta) {
      setShowCta(false);
    }
  }

  async function deleteCategory() {
    setDeleting(true);

    try {
      const {data} = await client.delete(`/api/product_category/${catId}`);

      console.log('delete response');
      console.log(data);
      setDeleting(false);
      setShowDeleteModal(false);
      getAllCategories();
    } catch (error) {
      setDeleting(false);
      handleApiError(error);
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
              <Pressable
                style={styles.cta}
                onPress={() => {
                  closeCtaView();
                  handleEditItem(category);
                }}>
                <Text style={styles.ctaText}>Edit</Text>
              </Pressable>

              {/* <Pressable style={styles.cta}>
                <Text style={styles.ctaText}>Move to top</Text>
              </Pressable> */}

              <Pressable
                style={styles.cta}
                onPress={() => {
                  closeCtaView();
                  setShowDeleteModal(true);
                }}>
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

      <Modal visible={showShareModal} animationType="slide" transparent={true}>
        <ShareItem
          setShowShareModal={setShowShareModal}
          title={'Product category'}
          categoryId={catId}
          storeName={store}
          link={`https://www.moosbu.store/${store}?category=${catId}`}
        />
      </Modal>

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <DeleteItem
          setShowDeleteModal={setShowDeleteModal}
          title={'category'}
          onDelete={deleteCategory}
          loading={deleting}
        />
      </Modal>
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
